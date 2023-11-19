import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, storage, db } from '@/config/firebase';
import { useString } from '@/hook';

const useRegister = () => {
    const [err, setErr] = useState(false);
    const [upperName] = useString();
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        const storageRef = ref(storage, displayName);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await store({ file, displayName, response, storageRef });
        } catch(error) {
            console.log(error);
            setErr(true);
        }
    }

    const store = ({ file, displayName, response, storageRef }) => {
        /**
         * Register three observers:
         * 1. 'state_changed' observer, called any time the state changes
         * 2. Error observer, called on failure
         * 3. Completion observer, called on successful completion
         */
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {},
            (error) => {
                setErr(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // Update profile of user's authenticate account
                    await updateProfile(response.user, {
                        displayName: upperName(displayName),
                        photoURL: downloadURL
                    });

                    await setDoc(doc(db, 'users', response.user.uid), {
                        uid: response.user.uid,
                        displayName: upperName(response.user.displayName),
                        email: response.user.email,
                        photoURL: downloadURL
                    });

                    await setDoc(doc(db, 'userChats', response.user.uid), {});

                    navigate("/");
                });
            }
        );
    }

    return [
        err,
        register
    ];
}

export default useRegister;