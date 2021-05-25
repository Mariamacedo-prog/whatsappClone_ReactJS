import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import firebaseConfig from './firebaseConfig';

interface Listcontact {
  id: string;
  name: string;
  avatar: string;
}

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
  getContactList: async (userId: any) => {
    const list: Listcontact | any = [];

    const results = await db.collection('Users').get();
    results.forEach(result => {
      const data = result.data();
      if (result.id !== userId) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar,
        });
      }
    });

    return list;
  },
  addNewChat: async (user: any, user2: any) => {
    const newChat = await db.collection('chats').add({
      messages: [],
      users: [user.id, user2.id],
    });
    db.collection('Users')
      .doc(user.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          // adciona o item que tá aqui em um array que já tem nos "chats do usuario"
          chatId: newChat.id,
          title: user2.name,
          image: user2.avatar,
          with: user2.id,
        }),
      });

    db.collection('Users')
      .doc(user2.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          // adciona o item que tá aqui em um array que já tem nos "chats do usuario"
          chatId: newChat.id,
          title: user.name,
          image: user.avatar,
          with: user.id,
        }),
      });
  },
  onChatList: (userId: any, setChatList: any) => {
    return db
      .collection('Users')
      .doc(userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();
          if (data !== undefined) {
            if (data.chats) {
              setChatList(data.chats);
            }
          }
        }
      });
  },
};
