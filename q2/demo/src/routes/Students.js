import { Outlet } from "react-router-dom";

import StudentList from "../components/StudentList";

function Students() {
  function reloadPage (){
    console.log("Works");
  }
  return (
    <>
      <Outlet reloadPage={reloadPage}/>
      <main>
        <StudentList />
      </main>
    </>
  );
}

export default Students;