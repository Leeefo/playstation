import { db } from '../firebase';

import {
    doc,
    collection,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

export const playStateCollectionRef = collection(db, "playState")

const stateID = "BLfLoVudoY8eP8lIiJ7b";
class PlayStateService {


    addState = (newState) => {
        return addDoc(playStateCollectionRef, newState);
    }

    updateState = (updatedState) => {
        const stateDoc = doc(db, "playState", stateID);
        return updateDoc(stateDoc, updatedState)
    }

    deleteState = () => {
        const stateDoc = doc(db, "playState", stateID);
        return deleteDoc(stateID)
    };


    getState = () => {
        return getDoc(doc(db, "playState", stateID));
    }

}

export default new PlayStateService();