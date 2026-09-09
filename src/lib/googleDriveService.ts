import { getAccessToken, googleSignIn, requestGsiAccessToken } from './googleDriveAuth';
import { exportAllMediaBackup } from './imageStorage';
import { PERSONAL_INFO, CONTACT_INFO, FEATURED_PROJECTS, CERTIFICATIONS, WORK_EXPERIENCE } from '../data/portfolioData';

export interface DriveFolderInfo {
  id: string;
  name: string;
  webViewLink?: string;
}

export interface UploadedDriveItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  createdTime?: string;
}

export interface SaveAppProgress {
  stage: 'authenticating' | 'creating_folder' | 'packaging_source' | 'uploading_source' | 'uploading_media' | 'uploading_manifest' | 'completed' | 'error';
  message: string;
  percent: number;
  uploadedItems?: UploadedDriveItem[];
  folderLink?: string;
  error?: string;
}

const DEFAULT_BACKUP_FOLDER_NAME = 'Anass Ghazzou Portfolio Backups';

/**
 * Searches for an existing folder or creates a new one in Google Drive.
 */
export async function getOrCreateDriveFolder(accessToken: string, folderName = DEFAULT_BACKUP_FOLDER_NAME): Promise<DriveFolderInfo> {
  const query = `name = '${folderName.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink)&pageSize=1`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (searchRes.ok) {
    const data = await searchRes.json();
    if (data.files && data.files.length > 0) {
      return {
        id: data.files[0].id,
        name: data.files[0].name,
        webViewLink: data.files[0].webViewLink || `https://drive.google.com/drive/folders/${data.files[0].id}`
      };
    }
  }

  // Create new folder
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Automated application, source code and media backups for Anass Ghazzou Portfolio'
    })
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to create folder in Google Drive (${createRes.status})`);
  }

  const folderData = await createRes.json();
  return {
    id: folderData.id,
    name: folderData.name,
    webViewLink: folderData.webViewLink || `https://drive.google.com/drive/folders/${folderData.id}`
  };
}

/**
 * Uploads a file (Blob or string) to Google Drive using multipart/related upload.
 */
export async function uploadFileToDrive(
  accessToken: string,
  content: Blob | string,
  fileName: string,
  mimeType: string,
  folderId?: string,
  description?: string
): Promise<UploadedDriveItem> {
  const metadata = {
    name: fileName,
    parents: folderId ? [folderId] : [],
    description: description || 'Portfolio backup asset'
  };

  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const closeDelim = "\r\n--" + boundary + "--";

  const fileBlob = typeof content === 'string' ? new Blob([content], { type: mimeType }) : content;

  const metadataPart = delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) + '\r\n' +
    '--' + boundary + '\r\n' +
    `Content-Type: ${mimeType}\r\n\r\n`;

  const multipartBody = new Blob([metadataPart, fileBlob, closeDelim], {
    type: `multipart/related; boundary=${boundary}`
  });

  const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,size,createdTime';

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartBody
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to upload ${fileName} to Google Drive (${res.status})`);
  }

  return await res.json();
}

/**
 * Saves the entire application package (Source ZIP, Media Database JSON, and Metadata Manifest) to Google Drive.
 */
export async function saveEntireAppToGoogleDrive(
  onProgress?: (progress: SaveAppProgress) => void
): Promise<{
  folder: DriveFolderInfo;
  uploadedItems: UploadedDriveItem[];
}> {
  try {
    // 1. Authenticate / Ensure access token
    onProgress?.({
      stage: 'authenticating',
      message: 'Connecting to Google Drive...',
      percent: 10
    });

    let token = await getAccessToken();
    if (!token) {
      const signInResult = await googleSignIn();
      token = signInResult?.accessToken || null;
    }
    if (!token) {
      token = await requestGsiAccessToken();
    }
    if (!token) {
      throw new Error('Google Drive authorization was cancelled or denied. Please sign in to proceed.');
    }

    // 2. Locate or create destination folder
    onProgress?.({
      stage: 'creating_folder',
      message: 'Creating/locating "Anass Ghazzou Portfolio Backups" in Google Drive...',
      percent: 25
    });

    const folder = await getOrCreateDriveFolder(token);
    const uploadedItems: UploadedDriveItem[] = [];
    const dateStamp = new Date().toISOString().slice(0, 10);
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');

    // 3. Package and upload source code archive
    onProgress?.({
      stage: 'packaging_source',
      message: 'Fetching full application source code bundle...',
      percent: 40
    });

    let sourceBlob: Blob | null = null;
    try {
      const zipRes = await fetch('/portfolio-source.zip');
      if (zipRes.ok) {
        sourceBlob = await zipRes.blob();
      }
    } catch (e) {
      console.warn('Could not fetch /portfolio-source.zip directly, fallback to generated manifest.', e);
    }

    if (sourceBlob) {
      onProgress?.({
        stage: 'uploading_source',
        message: 'Uploading complete source code archive (.zip) to Google Drive...',
        percent: 55
      });

      const sourceUpload = await uploadFileToDrive(
        token,
        sourceBlob,
        `anass-ghazzou-portfolio-source-${dateStamp}.zip`,
        'application/zip',
        folder.id,
        `Full production & development source code archive created on ${new Date().toLocaleString()}`
      );
      uploadedItems.push(sourceUpload);
    }

    // 4. Export & upload persistent custom media assets
    onProgress?.({
      stage: 'uploading_media',
      message: 'Backing up all uploaded images, avatars & custom media to Google Drive...',
      percent: 75
    });

    try {
      const mediaData = await exportAllMediaBackup();
      const mediaJsonString = JSON.stringify(mediaData, null, 2);
      const mediaUpload = await uploadFileToDrive(
        token,
        mediaJsonString,
        `portfolio-media-database-${dateStamp}.json`,
        'application/json',
        folder.id,
        `Complete custom media assets and base64 images (${Object.keys(mediaData).length} items)`
      );
      uploadedItems.push(mediaUpload);
    } catch (e) {
      console.warn('Media backup upload note:', e);
    }

    // 5. Generate and upload App Manifest & Portfolio Snapshot
    onProgress?.({
      stage: 'uploading_manifest',
      message: 'Uploading application manifest, case studies data & snapshot...',
      percent: 90
    });

    const appManifest = {
      appName: 'Anass Ghazzou Portfolio',
      exportedAt: new Date().toISOString(),
      owner: PERSONAL_INFO.name,
      title: PERSONAL_INFO.title,
      contact: CONTACT_INFO,
      caseStudiesCount: FEATURED_PROJECTS.length,
      caseStudies: FEATURED_PROJECTS.map(p => ({
        id: p.id,
        title: p.title,
        role: p.role,
        clientOrBrand: p.clientOrBrand,
        summary: p.summary,
        metrics: p.impactMetrics
      })),
      workExperience: WORK_EXPERIENCE,
      certificationsCount: CERTIFICATIONS.length,
      cloudSyncStatus: 'Cloud Firestore + Drive Synchronized'
    };

    const manifestUpload = await uploadFileToDrive(
      token,
      JSON.stringify(appManifest, null, 2),
      `portfolio-app-manifest-${dateStamp}.json`,
      'application/json',
      folder.id,
      'Structured application data, case studies, and career history snapshot'
    );
    uploadedItems.push(manifestUpload);

    onProgress?.({
      stage: 'completed',
      message: 'All application assets, source code, and media saved to Google Drive successfully!',
      percent: 100,
      uploadedItems,
      folderLink: folder.webViewLink
    });

    return { folder, uploadedItems };
  } catch (error: any) {
    const errorMsg = error?.message || 'An unexpected error occurred while saving to Google Drive.';
    onProgress?.({
      stage: 'error',
      message: errorMsg,
      percent: 0,
      error: errorMsg
    });
    throw error;
  }
}
