import React, { useState,useEffect } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import styles from '../../template.module.css';
import FacultyNavBar from './FacultyNavBar';
import Dashboard from '../Home/Dashboard';
import MyAchievements from '../Home/MyAchievements';
import Loader from '../../Loader';
import ChangePassword from '../Home/ChangePassword';

export default function FacultyHomeNav() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();


  useEffect(() => {
    setIsLoading(true); 
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);

    return () => clearTimeout(loadingTimeout); 
  }, [location.pathname]); 

  return (
    <div>
      {isLoading && <Loader />}
      <FacultyNavBar />
      <div className={styles['frame22']}>
        <Link className={styles['text17']} to="/facultyhome/facultydashboard">Dashboard</Link>
        <Link className={styles['text19']} to="/facultyhome/facultymyachievements">My Achievements</Link>
        <Link className={styles['text21']} to="/facultyhome/facultychangepassword">Change Password</Link>
      </div>
      <Routes>
        <Route path="/facultydashboard/*" element={<Dashboard />} exact />
        <Route path="/facultymyachievements/*" element={<MyAchievements />} exact />
        <Route path="/facultychangepassword/*" element={<ChangePassword/>} exact />
      </Routes>
    </div>
  );
}
