import Select from "react-select";
import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { timeStamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
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
  const [formError, setFormError] = useState(null);

  const { user } = useAuthContext();
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
    setFormError(null); //initially we need to reset the form so that it won't give error after submitting the form'
    // checking form erros
    if (!category) {
      setFormError("Please select a category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least one user");
      return;
    }
    /** Creating project object so that we can save it to database as project document */
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName, ////why we taking u.value because assignedUsers is an array of object containing value and label so we only need to extract the value property from it
        id: u.value.id,
        photoURL: u.value.photoURL,
      };
    });

    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
      photoURL: user.photoURL,
    };

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timeStamp.fromDate(new Date(dueDate)),
      assignedUsersList,
      createdBy,
      comments: [],
    };
    console.log(project);
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
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
