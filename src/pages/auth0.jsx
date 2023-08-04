import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Auth0 = () => {
  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
  } = useAuth0();


  useEffect(() => {
    if (isAuthenticated) {
      console.log("hello:", user);
    } else{
      console.log('not authed')
    }
  }, [isAuthenticated, user]);


  useEffect(() => {
    const getToken = async () => {

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUDIENCE,
            scope: "read:current_user",
          },
        });
        console.log('token:', token)
        localStorage.setItem("accessToken", token);
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, [getAccessTokenSilently, user?.sub]);

  const authTest = async () => {
    try {
      const token = "Bearer " + localStorage.getItem("accessToken");
      console.log("token", token);
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/test2`, {
        headers: {
          Authorization: token,
        },
      });

      console.log(res);
    } catch (err) {
      console.log("something went wrong:", err);
    }
  };
  return (
    <div>
      <h1>Auth0 Page:</h1>
      <br />
      <button onClick={() => loginWithRedirect()}>Log In</button>
      {isAuthenticated ? <h1>HELLO {user.name}</h1> : ""}
      <br />
      {isAuthenticated ? (
        <div>
          <button
            onClick={() =>
              logout({
                logoutParams: { returnTo: "http://localhost:3000/oauth" },
              })
            }
          >
            Logout
          </button>
          <br />
          <button onClick={authTest}>Auth Test</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Auth0;
