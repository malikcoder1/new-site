/**
 * Simulates uploading a file to a cloud storage service like AWS S3 or Google Cloud Storage.
 * In this mock version, it converts the file to a base64 data URL, which acts as a
 * permanent, self-contained "URL" for the image. This makes it storable in localStorage
 * and removes the 5-10MB browser storage limit for the application's code and metadata,
 * while still keeping the app self-contained without a real backend.
 *
 * This approach makes the application scalable and easy to upgrade to a real cloud
 * provider in the future by only changing the logic in this file.
 *
 * @param file The file to "upload".
 * @returns A promise that resolves with the data URL representing the permanent link to the image.
 */
export const uploadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("Failed to read file for upload."));
      }
    };
    reader.onerror = (error) => {
        reject(error);
    };
    reader.readAsDataURL(file);
  });
};
