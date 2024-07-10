import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutingsforApp from './RoutingsforApp';
import { useEffect, useState } from 'react';
import AdminNavBar from './admin/AdminNavBar';
import StudentNavBar from './student/NavBars/StudentNavBar';
import FacultyNavBar from './faculty/NavBars/FacultyNavBar';
import Loader from './Loader';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const studentLoggedIn = localStorage.getItem('isStudentLoggedIn') === 'true';
    const facultyLoggedIn = localStorage.getItem('isFacultyLoggedIn') === 'true';

    setIsAdminLoggedIn(adminLoggedIn);
    setIsStudentLoggedIn(studentLoggedIn);
    setIsFacultyLoggedIn(facultyLoggedIn);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const handleBeforeUnload = (event) => {
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('isStudentLoggedIn');
      localStorage.removeItem('isFacultyLoggedIn');
      event.returnValue = ''; // Standard for most browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(loadingTimeout);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  const onStudentLogin = () => {
    localStorage.setItem('isStudentLoggedIn', 'true');
    setIsStudentLoggedIn(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  const onFacultyLogin = () => {
    localStorage.setItem('isFacultyLoggedIn', 'true');
    setIsFacultyLoggedIn(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  return (
    <Router>
      {isLoading && <Loader />}
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
