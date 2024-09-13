import React, { useCallback, useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';

export default function ViewStudents({ closePopup, fmapid }) {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    if (fmapid) {
      fetchStudents(fmapid);
    }
  }, [fmapid]);

  const fetchStudents = async (fmapid) => {
    try {
      const response = await axios.get(`${config.url}/getmappedstudents/${fmapid}`);
      setStudent(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClose = useCallback(() => {
    closePopup();
  }, [closePopup]);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [handleClose]);

  return (
    <div>
      <div className="popup active">
        <div className="popup-content">
          <span className="close-btn" onClick={handleClose}>
            &times;
          </span>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(student) && student.length > 0 ? (
                student.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student.studentid}</td>
                    <td>{student.fullname}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Data Not Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
