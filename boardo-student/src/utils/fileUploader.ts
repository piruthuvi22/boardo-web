import { storage } from "config/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
import { RcFile } from "rc-upload/lib/interface";

export type FileUploadResult = {
  url: string;
  fileRef: string;
};
export const uploadFile = async (
  file: RcFile,
  path: string
): Promise<FileUploadResult> => {
  try {
    // Create a child reference
    const imageRef = ref(storage, `${path}`);
    console.log("imageRef", imageRef);

    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("Uploaded URL = ", url);
    return {
      url,
      fileRef: imageRef.fullPath,
    }; // Return the URL from this function
  } catch (error) {
    console.error("Error uploading file", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
