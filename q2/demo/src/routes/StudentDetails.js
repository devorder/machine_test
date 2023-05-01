import { useLoaderData, Link, redirect } from "react-router-dom";

import Modal from "../components/Modal";
import classes from "./StudentDetails.module.css";
import { MdEdit, MdRestoreFromTrash, MdCancel } from "react-icons/md";
import { useState } from "react";
import StudentEditForm from "../components/StudentEditForm";
import { useNavigate } from "react-router-dom";

function StudentDetails({reloadPage}) {
  const navigate = useNavigate();
  const student = useLoaderData();
  const [studentData, setStudentData] = useState(useLoaderData());
  const [isEditing, setIsEditing] = useState(false);

  if (!student) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find student</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to="/" className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }

  function submiteHandler(ev) {
    ev.preventDefault();
    const data = {
      name: ev.target.name.value,
      roll_number: ev.target.rno.value,
      email: ev.target.email.value,
      phone_number: ev.target.phone.value,
      standard: ev.target.grade.value,
      father_name: ev.target.father_name.value,
      mother_name: ev.target.mother_name.value,
      address: ev.target.address.value,
    };
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(
      `http://127.0.0.1:8000/students/${ev.target.rno.value}/`,
      requestOptions
    )
      .then((response) =>
        response.status == 200 ? alert("User updated successfully.") : ""
      )
      .then((result) => setStudentData((p) => data))
      .then((result) => setIsEditing((p) => false))
      .catch((error) => console.log("error", error));
  }

  function deleteStudent() {
    const sureToDelete = window.confirm(
      "Are you sure want to delete the student."
    );
    if (sureToDelete) {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      var requestOptions = {
        method: "DELETE",
        headers: headers,
        redirect: "follow",
      };

      fetch(
        `http://127.0.0.1:8000/students/${studentData.roll_number}/`,
        requestOptions
      ).then((response) =>{
        if((response.status >= 200) && (response.status <= 300)) {
          alert("User deleted successfully.");
          window.location = "/";
        }else{
          response.json().then(rs => {
            let errors = "";
            Object.entries(rs).map(([key, val]) => {
              errors += `${val}\n`
            });
            alert(errors);
          });
        }
      });
    }
  }


  return (
    <Modal>
      <main className={classes.details}>
        <div className="row">
          <div className="col-9">
            <h1 className="h4">Student Details</h1>
          </div>

          <div className="col-3">
            <button
              className="btn btn btn-outline-primary mx-1"
              onClick={() => {
                setIsEditing((p) => !isEditing);
              }}
            >
              {isEditing && <MdCancel />}
              {!isEditing && <MdEdit />}
            </button>
            <button
              className="btn btn btn-outline-danger"
              onClick={deleteStudent}
            >
              <MdRestoreFromTrash />
            </button>
          </div>
        </div>
        <hr />
        {!isEditing && (
          <div className="card">
            <img
              className="card-img-top img-responsive"
              src="https://picsum.photos/600"
              alt="Card image cap"
              style={{ height: "300px" }}
            />
            <div className="card-body">
              <h4 className="card-title">{studentData.name}</h4>
              <div className="card-text">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <th>Mother's Name</th>
                      <td>{studentData.mother_name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Father's Name</th>
                      <td>{studentData.father_name}</td>
                    </tr>
                    <tr>
                      <th>Roll Number</th>
                      <td>{studentData.roll_number}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{studentData.email}</td>
                    </tr>
                    <tr>
                      <th>Phone Number</th>
                      <td>{studentData.phone_number}</td>
                    </tr>
                    <tr>
                      <th>Grade</th>
                      <td>{studentData.standard}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>{studentData.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {isEditing && (
          <StudentEditForm
            student={studentData}
            submiteHandler={submiteHandler}
            isUpdate={true}
          />
        )}
      </main>
    </Modal>
  );
}

export default StudentDetails;

export async function loader({ params }) {
  const response = await fetch(
    "http://127.0.0.1:8000/students/" + params.roll_number
  );
  const resData = await response.json();
  return resData;
}
