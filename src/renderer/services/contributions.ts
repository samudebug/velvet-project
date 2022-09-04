import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FileStatus } from 'models/file';
import { db } from 'renderer/firebase';
import { Contribution } from 'renderer/models/contribution';
import { lockFile } from './translationFilesService';

const getContributions = async (): Promise<Contribution[]> => {
  return (
    await getDocs(
      query(collection(db, 'contributions'), where('ownerName', '==', 'Test'))
    )
  ).docs.map((el) => {
    const docData = el.data();
    return {
      id: el.id,
      createdDate: docData.createdDate.toDate(),
      lastUpdate: docData.lastUpdate.toDate(),
      title: docData.title,
      ownerName: docData.ownerName,
      status: docData.status,
      files: docData.files,
    };
  });
};

const getContribution = async (
  contributionId: string
): Promise<Contribution> => {
  const el = await getDoc(doc(collection(db, 'contributions'), contributionId));
  const docData = el.data();
  return {
    id: el.id,
    createdDate: docData?.createdDate.toDate(),
    lastUpdate: docData?.lastUpdate.toDate(),
    title: docData?.title,
    ownerName: docData?.ownerName,
    status: docData?.status,
    files: docData?.files,
  };
};

const createContribution = async (contribution: Contribution) => {
  contribution.files = await Promise.all(
    contribution.files.map(async (file) => {
      if (file.firestorePath) {
        await lockFile(file.firestorePath, contribution.ownerName);
      }
      return {
        ...file,
        status: FileStatus.LOCKED,
        lockerName: contribution.ownerName,
      };
    })
  );
  return addDoc(collection(db, 'contributions'), contribution);
};

const updateContribution = async (
  id: string,
  contribution: Partial<Contribution>
) => {
  await updateDoc(doc(collection(db, 'contributions'), id), {
    ...contribution,
  });
};

export { createContribution };
export { getContributions };
export { getContribution };
export { updateContribution };
