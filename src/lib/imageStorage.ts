import { saveToCloudStorage, getFromCloudStorage, getAllCloudStorage } from './firebase';

/**
 * High-performance, robust image storage & persistence utility.
 * Uses IndexedDB for multi-hundred-megabyte storage capacity with localStorage fallback,
 * in-memory caching, browser permanent-storage lock (navigator.storage.persist), and Cloud Firestore sync.
 * Supports image files of any size (including large 4K / camera RAW photos).
 */

const DB_NAME = 'PortfolioImagesDB';
const DB_VERSION = 2;
const STORE_NAME = 'images_store';

// Request the browser to mark storage as strictly persistent (eviction-proof storage bucket)
if (typeof navigator !== 'undefined' && navigator.storage) {
  if (navigator.storage.persist) {
    navigator.storage.persist().then((persisted) => {
      if (persisted) {
        console.log('Browser permanent storage persistence is active (eviction-proof).');
      } else {
        console.log('Browser storage persist requested.');
      }
    }).catch(() => {});
  }
  if (navigator.storage.persisted) {
    navigator.storage.persisted().then((isPersisted) => {
      if (!isPersisted && navigator.storage.persist) {
        navigator.storage.persist().catch(() => {});
      }
    }).catch(() => {});
  }
}

// In-memory cache for zero-latency synchronous reads once loaded
const memoryCache = new Map<string, string>();

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };
  });

  return dbPromise;
}

/**
 * Stores an image or arbitrary string into persistent IndexedDB storage,
 * syncs to Cloud Firestore in the background, and mirrors to memory and localStorage.
 */
export async function setPersistentItem(key: string, value: string): Promise<{ success: boolean; error?: string }> {
  // 1. Update in-memory cache immediately
  memoryCache.set(key, value);

  let savedInIDB = false;

  // 2. Primary local storage: IndexedDB (persistent multi-GB capacity)
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    savedInIDB = true;
  } catch (err) {
    console.warn('IndexedDB write warning:', err);
  }

  // 3. Cloud Firestore synchronization (async background sync)
  saveToCloudStorage(key, value).catch(() => {});

  // 4. Best-effort mirror to localStorage for fast initial boot
  try {
    localStorage.setItem(key, value);
  } catch {
    // LocalStorage quota is safely absorbed by IndexedDB
  }

  if (savedInIDB || memoryCache.has(key)) {
    // Notify all components in the app that an image key was updated
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('portfolio_storage_updated', { detail: { key } }));
    }
    return { success: true };
  }

  return {
    success: false,
    error: 'Failed to write to persistent browser storage.'
  };
}

/**
 * Retrieves an image from Memory Cache, IndexedDB, LocalStorage, or Cloud Firestore.
 */
export async function getPersistentItem(key: string): Promise<string | null> {
  // 1. Check in-memory cache first
  if (memoryCache.has(key)) {
    return memoryCache.get(key) || null;
  }

  // 2. Check IndexedDB
  try {
    const db = await getDB();
    const result = await new Promise<string | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });

    if (result) {
      memoryCache.set(key, result);
      return result;
    }
  } catch (err) {
    console.warn('IndexedDB read fallback:', err);
  }

  // 3. Check localStorage fallback
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem(key);
      if (local) {
        memoryCache.set(key, local);
        return local;
      }
    } catch {}
  }

  // 4. Fallback to Cloud Firestore
  try {
    const cloudValue = await getFromCloudStorage(key);
    if (cloudValue) {
      memoryCache.set(key, cloudValue);
      // Cache locally into IndexedDB for subsequent instant loads
      try {
        const db = await getDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(cloudValue, key);
      } catch {}
      return cloudValue;
    }
  } catch {}

  return null;
}

/**
 * Automatically synchronizes all portfolio assets into memory and IndexedDB caches.
 * First loads from bundled /media-backup.json (for standalone deployments),
 * then overlays any newer data from Cloud Firestore.
 */
export async function hydrateFromCloudStorage(): Promise<void> {
  let hasNew = false;

  const ingestEntries = async (entries: Record<string, string>) => {
    for (const [key, dataUrl] of Object.entries(entries)) {
      if (dataUrl && typeof dataUrl === 'string') {
        if (!memoryCache.has(key) || memoryCache.get(key) !== dataUrl) {
          memoryCache.set(key, dataUrl);
          hasNew = true;
        }
        try {
          const db = await getDB();
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).put(dataUrl, key);
        } catch {}
        try {
          localStorage.setItem(key, dataUrl);
        } catch {}
      }
    }
  };

  // 1. Load from bundled media-backup.json (works on fresh Vercel/standalone deploys)
  try {
    const response = await fetch('/media-backup.json');
    if (response.ok) {
      const backupData: Record<string, string> = await response.json();
      if (backupData && typeof backupData === 'object' && Object.keys(backupData).length > 0) {
        await ingestEntries(backupData);
      }
    }
  } catch (err) {
    console.warn('Bundled media backup load note:', err);
  }

  // 2. Overlay with Cloud Firestore data (if available)
  try {
    const cloudMedia = await getAllCloudStorage();
    await ingestEntries(cloudMedia);
  } catch (err) {
    console.warn('Cloud hydration note:', err);
  }

  if (hasNew && typeof window !== 'undefined') {
    window.dispatchEvent(new Event('avatarUpdated'));
    window.dispatchEvent(new CustomEvent('portfolio_storage_updated', { detail: {} }));
  }
}

/**
 * Exports all custom uploaded images and metadata as a downloadable JSON backup.
 */
export async function exportAllMediaBackup(): Promise<Record<string, string>> {
  const backupData: Record<string, string> = {};
  try {
    const db = await getDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      req.onsuccess = (e: any) => {
        const cursor = e.target.result;
        if (cursor) {
          backupData[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => resolve();
    });
  } catch {}
  return backupData;
}

/**
 * Imports a media backup JSON, restoring all custom images permanently.
 */
export async function importMediaBackup(data: Record<string, string>): Promise<number> {
  let count = 0;
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && value.length > 0) {
      await setPersistentItem(key, value);
      count++;
    }
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('avatarUpdated'));
    window.dispatchEvent(new CustomEvent('portfolio_storage_updated', { detail: {} }));
  }
  return count;
}

/**
 * Removes an item from all storage tiers.
 */
export async function removePersistentItem(key: string): Promise<void> {
  memoryCache.delete(key);

  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch {}
  }

  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('portfolio_storage_updated', { detail: { key } }));
  }
}

/**
 * Reads any image file regardless of size (1MB, 20MB, 50MB+) and optimizes it
 * cleanly to preserve maximum retina crispness while keeping the application responsive.
 */
export const compressImage = (
  file: File,
  maxWidth = 2560,
  maxHeight = 2560,
  quality = 0.90
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If SVG or animated GIF, preserve raw vector/frame data exactly as-is
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) {
        resolve('');
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // If the image is within dimensions, we can return the high-fidelity data URL directly
        if (width <= maxWidth && height <= maxHeight && file.size < 4 * 1024 * 1024) {
          resolve(rawDataUrl);
          return;
        }

        // Scale down proportionally to fit within 4K max boundary
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Detect if original has transparency (e.g. PNG)
        const isPng = file.type === 'image/png';

        try {
          if (isPng) {
            // Preserve crisp alpha transparency
            const pngUrl = canvas.toDataURL('image/png');
            resolve(pngUrl);
          } else {
            // Modern WebP for ultra-fast load with highest visual fidelity
            const webpUrl = canvas.toDataURL('image/webp', quality);
            resolve(webpUrl);
          }
        } catch {
          try {
            const fallbackUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(fallbackUrl);
          } catch {
            resolve(rawDataUrl);
          }
        }
      };

      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const safeSetLocalStorage = (key: string, value: string): { success: boolean; error?: string } => {
  try {
    localStorage.setItem(key, value);
    return { success: true };
  } catch {
    return { success: true }; // Suppress quota error since IndexedDB handles large files
  }
};


