import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCUMB-QR1U0Ffz1PZ9YX-uJ1eGge5_Tfhc",
    authDomain: "crwn-db-18b87.firebaseapp.com",
    projectId: "crwn-db-18b87",
    storageBucket: "crwn-db-18b87.appspot.com",
    messagingSenderId: "6420210521",
    appId: "1:6420210521:web:ca01c6b902e68159e3a248",
    measurementId: "G-0KGEBE2EP6"


};

export const createUserProfileDocument = async ( userAuth , additionalData ) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName,email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch(error){
            console.log('error creating user' , error.message);
        }
    }

    return userRef;
}




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


