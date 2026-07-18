import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = () => {

  axios.post("https://student-management-backend-32ae.onrender.com/login", {
    username,
    password
  })
  .then((res) => {

    alert(res.data.message);

    setIsLoggedIn(true);

  })
  .catch((err) => {

    alert("Invalid Username or Password");

  });

};
  return (
    <div>
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

  <button onClick={handleLogin}>
  Login
</button>
    </div>
  );
}

export default Login;