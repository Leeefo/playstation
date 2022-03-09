import { db } from '../firebase';

import {
    doc,
    collection,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "firebase/firestore";

export const playRecordsCollectionRef = collection(db, "playRecords")

class PlayDataService {


    addRecord = (newRecord) => {
        return addDoc(playRecordsCollectionRef, newRecord);
    }

    updateRecord = (id, updatedRecord) => {
        const recordDoc = doc(db, "playRecords", id);
        return updateDoc(recordDoc, updatedRecord)
    }

    deleteRecord = (id) => {
        const recordDoc = doc(db, "playRecords", id);
        return deleteDoc(id)
    };

    getAllRecords = () => {
        let records = []
        onSnapshot(playRecordsCollectionRef,
            (snapshot) => {
                snapshot.docs.map((doc) => records.push({ id: doc.id, ...doc.data() }))
            })
        console.log(records)
        return records;
    }

    getRecord = (id) => {
        return getDoc(doc(db, "playRecords", id));
    }

}

export default new PlayDataService();