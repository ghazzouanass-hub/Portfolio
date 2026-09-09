import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let app: any = null;
let db: any = null;

try {
  if (firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  }
} catch (err) {
  console.warn('Firebase initialization note (offline mode fallback active):', err);
}

export { app, db };

/**
 * Saves an image/media record to Cloud Firestore collection 'portfolio_media'
 */
export async function saveToCloudStorage(key: string, dataUrl: string): Promise<boolean> {
  if (!db) return false;
  try {
    const docRef = doc(db, 'portfolio_media', key);
    await setDoc(docRef, {
      key,
      dataUrl,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('Cloud Firestore sync note:', err);
    return false;
  }
}

/**
 * Retrieves an image/media record from Cloud Firestore collection 'portfolio_media'
 */
export async function getFromCloudStorage(key: string): Promise<string | null> {
  if (!db) return null;
  try {
    const docRef = doc(db, 'portfolio_media', key);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data().dataUrl || null;
    }
  } catch (err) {
    console.warn('Cloud Firestore fetch note:', err);
  }
  return null;
}

/**
 * Retrieves all saved media documents from Cloud Firestore collection 'portfolio_media'
 */
export async function getAllCloudStorage(): Promise<Record<string, string>> {
  if (!db) return {};
  try {
    const colRef = collection(db, 'portfolio_media');
    const snap = await getDocs(colRef);
    const result: Record<string, string> = {};
    snap.forEach((d) => {
      const data = d.data();
      if (data && data.key && data.dataUrl) {
        result[data.key] = data.dataUrl;
      }
    });
    return result;
  } catch (err) {
    console.warn('Cloud Firestore getAll note:', err);
  }
  return {};
}
