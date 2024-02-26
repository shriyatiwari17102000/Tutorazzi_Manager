import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = Cookies.get("tutorazzi_academic");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateComponent;



// PrivateComponent.js
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";

// const PrivateComponent = () => {
//   const auth = Cookies.get("vedeshify_token");

//   if (!auth) {
//     // User is not authenticated, redirect to the login page
//     return <Navigate to="/user-signin" />;
//   }

//   return <Outlet />;
// };

// export default PrivateComponent;



// new

// PrivateComponent.js
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";

// const PrivateComponent = () => {
//   const auth = Cookies.get("vedeshify_token");

//   if (!auth) {
//     // User is not authenticated, redirect to the login page
//     return <Navigate to="/user-signin" />;
//   }

//   // If user is authenticated and tries to access the login page, redirect to the dashboard
//   const isTryingToAccessLogin = window.location.pathname.includes("/user-signin");
//   if (isTryingToAccessLogin) {
//     return <Navigate to="/" />;
//   }

//   return <Outlet />;
// };

// export default PrivateComponent;


