import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';

import classes from './StudentList.module.css';
import Student from './Student';


async function loader() {
  const response = await fetch("http://127.0.0.1:8000/students/");
  const resData = await response.json();
  return resData;
}



function StudentList() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    loader().then(data => setStudents(p => data))
  }, []);
  return (
    <div className='container'>
      {students.length > 0 && (
        <div className="row">
          {students.map((student) => (
            <Student key={student.roll_number} student={student} />
          ))}
        </div>
      )}
      {students.length <= 0 && (
        <div style={{ textAlign: 'center', color: 'black' }}>
          <h2>There are no students yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </div>
  );
}

export default StudentList;
