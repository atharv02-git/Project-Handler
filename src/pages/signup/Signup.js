import { useState } from "react";
import { useSignup } from "../../hooks/useSignup"

// styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const fileChangeHandler = (e) => {
    setThumbnail(null);
    let avatarSelected = e.target.files[0];
    console.log(avatarSelected);
    //if to check if thumbail not selected
    if (!avatarSelected) {
      setThumbnailError("Please select a file");
      return;
    }
    // if statement to check if selected avatar type does not include image
    if (!avatarSelected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (avatarSelected.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(avatarSelected);
    console.log("thumbnail updated");
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input required type="file" onChange={fileChangeHandler} />
      </label>
      {thumbnailError && <div className="error">{thumbnailError}</div>}
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
