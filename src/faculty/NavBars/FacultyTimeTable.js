import React,{useState,useEffect} from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import styles from '../../template.module.css'
import FacultyNavBar from './FacultyNavBar'
import Classes from './../TimeTable/Classes';
import Loader from '../../Loader';

export default function FacultyTimeTable() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    return () => clearTimeout(loadingTimeout); 
  }, []);
  return (
    <div>
      {isLoading && <Loader />}
      <FacultyNavBar/>
      <div className={styles['frame22']}>
          <Link className={styles['text17']} to="/facultytimetable/facultyclasses">Classes</Link>
        </div>
      <Routes>
        <Route path='/facultyclasses/*' element={<Classes/>} exact/>
      </Routes>
    </div>
  )
}
