export default function StudentEditForm({
  student,
  submiteHandler,
  isUpdate,
}) {
  return (
    <form onSubmit={submiteHandler}>
      <div className="form-group">
        <label htmlFor="rno">Roll Number</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter Roll Number"
          id="rno"
          disabled
          defaultValue={student.roll_number || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter Name"
          disabled={isUpdate ? true : false}
          defaultValue={student.name || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          defaultValue={student.email || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          placeholder="Enter Phone Number"
          defaultValue={student.phone_number || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="Enter Address"
          defaultValue={student.address || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="father_name">Father's Name</label>
        <input
          type="text"
          className="form-control"
          id="father_name"
          placeholder="Enter Father Name"
          disabled={isUpdate ? true : false}
          defaultValue={student.father_name || ""}
        />
      </div>

      <div className="form-group">
        <label htmlFor="mother_name">Mother's Name</label>
        <input
          type="text"
          className="form-control"
          id="mother_name"
          placeholder="Enter Mother Name"
          disabled={isUpdate ? true : false}
          defaultValue={student.mother_name || ""}
        />
      </div>

      <div className="form-group">
        <label htmlFor="grade">Grade</label>
        <input
          type="number"
          className="form-control"
          id="grade"
          placeholder="Enter Grade"
          disabled={isUpdate ? true : false}
          defaultValue={student.standard || ""}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );
}
