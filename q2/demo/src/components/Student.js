import { Link } from "react-router-dom";
import { MdEmail, MdPhone, MdNumbers } from 'react-icons/md';

import classes from "./Student.module.css";

function Student({ student }) {
  return (
    <div className={`col-3 ${classes.post} my-2`}>
      <Link to={student.roll_number.toString()}>
        <div className="card" style={{textDecoration: "none"}}>
          <div className="card-body">
            <h5 className="card-title text-dark">{student.name}</h5>
            <p className="card-text">
              <span className="d-block text-secondary py-1"><MdNumbers/> {student.roll_number}</span>
              <span className="d-block text-secondary py-1"><MdEmail/> {student.email}</span>
              <span className="d-block text-secondary py-1"><MdPhone/> {student.phone_number}</span>
            </p>
            <button className="btn btn-secondary">Edit</button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Student;
