import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV7jHnUNkbGFAy86sATGWUBWr5R3ft-d4",
  authDomain: "crwn-clothing-v2-c146c.firebaseapp.com",
  projectId: "crwn-clothing-v2-c146c",
  storageBucket: "crwn-clothing-v2-c146c.appspot.com",
  messagingSenderId: "878891419809",
  appId: "1:878891419809:web:d957eb4a77b426e2ab88e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup (auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        }
        catch(error){
            console.log("error");
        }
    }
    return userDocRef;
}