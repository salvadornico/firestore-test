import firebase from "firebase"
import "firebase/firestore"
import firebaseConfig from "./firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firestore = firebaseApp.firestore()
export const auth = firebaseApp.auth()
