import Select from "react-select";
import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
// styles
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  // here we have extracted document property from the useCollection hook from 'users' collection so that we can assign users to assignedUsers state
  const { document } = useCollection("users");
  const [users, setUsers] = useState([]); //in this array we are going to return an object just like categories array 

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  // this useEffect runs initially when the component mounts and then after every update in document
  useEffect(() => {
    if (document) {
      const options = document.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [document]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, details, dueDate, category, assignedUsers);
  };
  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category: </span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assigned to: </span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti //this property allows to select multiple options
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
