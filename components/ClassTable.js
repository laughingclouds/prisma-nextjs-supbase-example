export default function ClassTable({ students }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => {
              return (
                <tr key={student.email} className="hover">
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}