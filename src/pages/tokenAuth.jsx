import { useState, useEffect } from "react";
import axios from "axios";

const TokenAuth = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const test = async () => {
        const authToken = "Bearer " + token;
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/test`, {
            headers: {
              Authorization: authToken,
            },
          });

          if (res.data.success) {
            setAuthenticated(true);
          }
        } catch (err) {
          localStorage.removeItem('token')
          console.log(err);
        }
      };
      test()
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setAuthenticated(true);
        localStorage.setItem("token", res.data.token);
      }
    } catch (err) {
      console.log("something went wrong:", err.response.data.msg);
    }
  };

  const testAuth = async () => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/test`, {
        headers: {
          Authorization: token,
        },
      });

      console.log(res);
    } catch (err) {
      console.log("something went wrong:", err.response.data.msg);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <div>
      <h1>JWT Authentication:</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          placeholder="enter your email here"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          id="password"
          placeholder="enter your password here"
          onChange={handleChange}
        />
        <br />
        <input type="submit" />
      </form>
      <br />
      {authenticated ? <button onClick={testAuth}>test Auth</button> : ""}
      <br />
      {authenticated ? <button onClick={logout}>Logout</button> : ""}
    </div>
  );
};

export default TokenAuth;
