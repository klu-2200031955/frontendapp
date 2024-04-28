import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutingsforApp from './RoutingsforApp';
import AdminNavBar from './admin/AdminNavBar';
import StudentNavBar from './student/NavBars/StudentNavBar';
import FacultyNavBar from './faculty/NavBars/FacultyNavBar';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const studentLoggedIn = localStorage.getItem('isStudentLoggedIn') === 'true';
    const facultyLoggedIn = localStorage.getItem('isFacultyLoggedIn') === 'true';

    setIsAdminLoggedIn(adminLoggedIn);
    setIsStudentLoggedIn(studentLoggedIn);
    setIsFacultyLoggedIn(facultyLoggedIn);

    // Clear local storage when the window is closed
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    localStorage.clear();
  };

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onStudentLogin = () => {
    localStorage.setItem('isStudentLoggedIn', 'true');
    setIsStudentLoggedIn(true);
  };

  const onFacultyLogin = () => {
    localStorage.setItem('isFacultyLoggedIn', 'true');
    setIsFacultyLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isStudentLoggedIn ? (
          <StudentNavBar />
        ) : isFacultyLoggedIn ? (
          <FacultyNavBar />
        ) : (
          <RoutingsforApp
            onAdminLogin={onAdminLogin}
            onStudentLogin={onStudentLogin}
            onFacultyLogin={onFacultyLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
