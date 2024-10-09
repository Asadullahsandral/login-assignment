import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Userinfo from "./components/Userinfo";
import Users from "./components/Users";
import Report from "./components/Report";
import StudentInfo from "./components/students/StudentInfo";

function App() {
  const userType = localStorage.getItem("userType");
  // console.log(userType);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {userType === "Admin" && (
            <>
              <Route path="/users" element={<Users />} />

              {/* <Route path="/report" element={<Report />} /> */}
            </>
          )}

          {userType === "Teacher" && (
            <>
              <Route path="/" element={<Userinfo />} />
              <Route path="/report" element={<Report />} />
            </>
          )}

          {userType === "Student" && (
            <>
              {/* <Route path="/" element={<StudentInfo />} /> */}
              {/* <Route path="/report" element={<Navigate to="/" />} /> */}
            </>
          )}

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Userinfo from "./components/Userinfo";
// import Users from "./components/Users";
// import Report from "./components/Report";

// function App() {
//   const userType = localStorage.getItem("userType");
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           {userType === "Teacher" ? (
//             <>
//               <Route exact path="/" element={<Userinfo />} />
//               <Route exact path="/login" element={<Login />} />
//               <Route exact path="/register" element={<Register />} />
//               <Route exact path="/users" element={<Users />} />
//               <Route exact path="/report" element={<Report />} />
//             </>
//           ) : userType === "Student" ? (
//             <>
//               <Route exact path="/" element={<Userinfo />} />
//               <Route exact path="/login" element={<Login />} />
//               <Route exact path="/register" element={<Register />} />
//               <Route exact path="/users" element={<Users />} />
//               <Route path="/report" element={<Navigate to="/" />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/login" />}></Route>
//           )}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./AuthContext";
// import { useAuth } from "./AuthContext";
// import Login from "./components/Login";
// import User from "./components/Users";
// import Userinfo from "./components/Userinfo";
// import Report from "./components/Report";
// import Register from "./components/Register";

// const ProtectedRoute = ({ element }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/users"
//             element={<ProtectedRoute element={<User />} />}
//           />
//           <Route path="/" element={<ProtectedRoute element={<Userinfo />} />} />
//           <Route
//             path="/report"
//             element={<ProtectedRoute element={<Report />} />}
//           />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
