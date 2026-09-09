import JSZip from 'jszip';
import { exportAllMediaBackup, getPersistentItem } from './imageStorage';

/**
 * Converts a Data URL (base64) to a Uint8Array binary buffer
 */
function dataUrlToUint8Array(dataUrl: string): { data: Uint8Array; mimeType: string; extension: string } {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  
  let extension = 'jpg';
  if (mimeType.includes('png')) extension = 'png';
  else if (mimeType.includes('webp')) extension = 'webp';
  else if (mimeType.includes('svg')) extension = 'svg';

  const binaryString = atob(base64 || '');
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return { data: bytes, mimeType, extension };
}

/**
 * Dynamically bundles the complete portfolio source code, baking in all user-uploaded photos,
 * custom avatar, and state customizations directly into the downloaded ZIP file.
 */
export async function exportCustomizedPortfolioZip(onProgress?: (status: string) => void): Promise<boolean> {
  try {
    onProgress?.('Preparing source code files...');

    // 1. Fetch base portfolio source template archive
    const response = await fetch('/portfolio-source.zip');
    let zip: JSZip;

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      zip = await JSZip.loadAsync(arrayBuffer);
    } else {
      zip = new JSZip();
    }

    onProgress?.('Embedding uploaded photos and customizations...');

    // 2. Check for custom uploaded avatar in all storage tiers
    let customAvatar = await getPersistentItem('custom_anass_avatar');
    if (!customAvatar && typeof window !== 'undefined') {
      customAvatar = localStorage.getItem('custom_anass_avatar');
    }

    // 3. Collect all other custom media backups
    const allMedia = await exportAllMediaBackup();

    if (customAvatar && customAvatar.startsWith('data:')) {
      const { data, extension } = dataUrlToUint8Array(customAvatar);
      const filename = `avatar.${extension}`;
      
      // Save binary image file into public/ and src/assets/ inside the zip
      zip.file(`public/${filename}`, data);
      
      // Update src/data/portfolioData.ts inside the zip so it defaults to the user's uploaded avatar!
      const portfolioDataFile = zip.file('src/data/portfolioData.ts');
      if (portfolioDataFile) {
        let content = await portfolioDataFile.async('string');
        // Replace avatarUrl line with the local uploaded asset
        content = content.replace(
          /avatarUrl:\s*["'][^"']+["']/,
          `avatarUrl: "/${filename}"`
        );
        zip.file('src/data/portfolioData.ts', content);
      }
    }

    // Save all custom media backup into public/media-backup.json
    if (Object.keys(allMedia).length > 0) {
      zip.file('public/media-backup.json', JSON.stringify(allMedia, null, 2));
    }

    onProgress?.('Generating customized ZIP package...');

    // 4. Generate the customized ZIP blob
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    onProgress?.('Starting download...');

    // 5. Trigger browser download
    const downloadUrl = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'anass-ghazzou-portfolio.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);

    onProgress?.('Download ready!');
    return true;
  } catch (error) {
    console.error('Failed to generate customized portfolio ZIP:', error);
    // Fallback: direct download of default source zip
    const link = document.createElement('a');
    link.href = '/portfolio-source.zip';
    link.download = 'anass-ghazzou-portfolio.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }
}
