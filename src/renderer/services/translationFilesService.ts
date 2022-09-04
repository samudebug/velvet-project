import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FileStatus, FileType } from 'models/file';
import { db } from '../firebase';

const getAllFiles = async (
  status = FileStatus.OPEN,
  path = 'original/',
  parent = ''
) => {
  const data = await getDocs(
    query(collection(db, path), where('status', '==', status))
  );
  return Promise.all(
    data.docs.map(async (el) => {
      const docData = el.data();
      const returnData: any = {
        fileName: docData.fileName,
        status: docData.status,
        storagePath: docData.storagePath,
        type: docData.type,
        firestorePath: el.ref.path,
        parent,
      };
      if (returnData.type === FileType.FOLDER) {
        returnData.files = await getAllFiles(
          status,
          `${path + docData.fileName}/files/`,
          docData.fileName
        );
      }
      return returnData;
    })
  );
};

const lockFile = async (path: string, lockerName: string) => {
  await updateDoc(doc(db, path), { status: FileStatus.LOCKED, lockerName });
};

export { getAllFiles };
export { lockFile };
