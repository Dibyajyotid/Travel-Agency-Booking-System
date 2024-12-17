"use client";

import { useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { AdminNavbar } from "@/components/AdminNavbar";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const handleLogin = async () => {
    const credentials = btoa(`${username}:${password}`);
    try {
      await axiosInstance.get("/admin", {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
      setIsLoggedIn(true);

      localStorage.setItem("authHeader", `Basic ${credentials}`);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      alert("Invalid credentials");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login With Admin Details</h1>
            <p className="py-6">
              This is a hardcoded authentication, use the admin credentials below
              <br />Username: <span><b>admin</b></span>
              <br />Password: <span><b>password123</b></span>
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <button onClick={handleLogin} className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
        <AdminNavbar />
        <div className="m-20 rounded-lg bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5">
            <div className="hero bg-base-200 min-h-screen">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="/avatar.png" className="max-w-sm rounded-lg shadow-2xl"/>
                <div>
                  <h1 className="text-5xl font-bold">Admin Details</h1>
                  <p className="py-6">
                    <br/>Admin Username: <span><b>Admin</b></span>
                    <br/>Admin Password: <span><b>password123</b></span>
                    <br/>This admin details is hardcoded and verified with the credentials using the basicAuth
                  </p>
                </div>
              </div>
            </div>
        </div>
        
    </div>
  );
};

export default AdminPage;

