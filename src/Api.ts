import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default {
  gMailPopup: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebaseApp.auth().signInWithPopup(provider);

    return result;
  },
  addUser: async (u: any) => {
    await db.collection('Users').doc(u.id).set(
      {
        name: u.name,
        avatar: u.avatar,
      },
      { merge: true },
    );
  },
};
