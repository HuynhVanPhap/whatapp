import { updateProfile } from 'firebase/auth';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { storage } from "@/config/firebase";

const useUploadToFirebase = ({ fileName, fileUpload, response }) => {
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, fileUpload);

    const doUploadToFirebase = () => {
        /**
         * Register three observers:
         * 1. 'state_changed' observer, called any time the state changes
         * 2. Error observer, called on failure
         * 3. Completion observer, called on successful completion
         */
        uploadTask.on('state_changed', (snapshot) => {
                /**
                 * Observe state change events such as progress, pause, and resume
                 * Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                 */
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
                console.log('Upload is ' + progress + '% done');
    
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('Something went wrong...!');
                        break;
                }
            },
            (error) => {},
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(response.user, {
                        displayName: fileName,
                        photoURL: downloadURL
                    });
                });
            }
        );
    }

    return [doUploadToFirebase];
}

export default useUploadToFirebase;