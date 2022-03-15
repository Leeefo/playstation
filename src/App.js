
import Navbar from './components/Navbar';
import MainSection from './components/MainSection';
import Records from './components/Records';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { limit, onSnapshot, query, orderBy } from 'firebase/firestore';
import { playRecordsCollectionRef } from './services/playRecords.services';
import { useDispatch } from 'react-redux';
import { dailyIdSetter, fetchData, stateSetter } from './features/time/timeSlice';
import { useEffect } from 'react';
import playStateServices from './services/playState.services';

function App() {

  const q = query(playRecordsCollectionRef, orderBy("createdAt", 'desc'), limit(1))
  const dispatch = useDispatch()


  useEffect(() =>
    onSnapshot(q, (snapshot) =>
      dispatch(dailyIdSetter(snapshot.docs[0].data().dailyId))
    )
    , [])

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainSection />} />
        <Route path='/records' element={<Records />} />
      </Routes>
    </Router>

  );
}


export default App;
