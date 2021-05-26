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
              const chat = [...data.chats];

              chat.sort((a: any, b: any) => {
                if (a.lastMessageDate === undefined) {
                  return -1;
                }
                if (b.lastMessageDate === undefined) {
                  return -1;
                }
                if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                  return 1;
                } else {
                  return -1;
                }
              });

              setChatList(chat);
            }
          }
        }
      });
  },

  onChatContent: (chatId: any, setList: any, setUsers: any) => {
    return db
      .collection('chats')
      .doc(chatId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();
          if (data !== undefined) {
            setList(data.messages);
            setUsers(data.users);
          }
        }
      });
  },

  sendMessage: async (
    chatData: any,
    userId: any,
    type: any,
    body: any,
    users: any,
  ) => {
    const now = new Date();

    db.collection('chats')
      .doc(chatData.chatId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          type,
          author: userId,
          body,
          date: now,
        }),
      });

    for (const i in users) {
      const u = await db.collection('Users').doc(users[i]).get();
      const uData = u.data();
      if (uData !== undefined) {
        if (uData.chats) {
          const chats = [...uData.chats];

          for (const e in chats) {
            if (chats[e].chatId === chatData.chatId) {
              chats[e].lastMessage = body;
              chats[e].lastMessageDate = now;
            }
          }

          await db.collection('Users').doc(users[i]).update({
            chats,
          });
        }
      }
    }
  },
};
