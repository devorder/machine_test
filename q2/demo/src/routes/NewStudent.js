import { Link, Form, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./NewStudent.module.css";
import Modal from "../components/Modal";
import StudentEditForm from "../components/StudentEditForm";
import { useNavigate } from "react-router-dom";

async function getLastRollNumber() {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const resp = await fetch("http://127.0.0.1:8000/max_roll/", requestOptions);
  const respData = await resp.json();
  return respData.max_roll;
}

function NewStudent(props) {
  const navigate = useNavigate();
  const [rno, setRno] = useState(null);
  useEffect(() => {
    getLastRollNumber().then((data) => setRno((p) => data));
  }, []);

  function submiteHandler(ev) {
    ev.preventDefault();

    let shallWeContinue = true;
    const data = {
      name: ev.target.name.value || "",
      roll_number: ev.target.rno.value || "",
      email: ev.target.email.value || "",
      phone_number: ev.target.phone.value || "",
      standard: ev.target.grade.value || "",
      father_name: ev.target.father_name.value || "",
      mother_name: ev.target.mother_name.value || "",
      address: ev.target.address.value || "",
    };

    Object.entries(data).map(([key, value]) => {
      if (value == "") {
        alert(`Field '${key.replace("_", " ")}' can not be empty.`);
        shallWeContinue = false;
        return false;
      }
    });

    if (shallWeContinue) {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch("http://127.0.0.1:8000/students/", requestOptions)
        .then((response) =>{
          if((response.status >= 200) && (response.status <= 300)) {
            alert("User added successfully.");
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
    <Modal width={"50%"}>
      <div className="p-4">
        {rno == null ? (
          ""
        ) : (
          <StudentEditForm
            student={{ roll_number: Number(rno) + 1 }}
            submiteHandler={submiteHandler}
            isUpdate={false}
          />
        )}
      </div>
    </Modal>
  );
}

export default NewStudent;
