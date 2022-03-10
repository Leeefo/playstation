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


class PlayStateService {


    addState = (newState) => {
        return addDoc(playStateCollectionRef, newState);
    }

    updateState = (id, updatedState) => {
        const stateDoc = doc(db, "playState", id);
        return updateDoc(stateDoc, updatedState)
    }

    deleteState = (id) => {
        const stateDoc = doc(db, "playState", id);
        return deleteDoc(id)
    };


    getState = (id) => {
        return getDoc(doc(db, "playState", id));
    }

}

export default new PlayStateService();