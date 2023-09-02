import React from "react";
import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthData } from "../auth/AuthWrap";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [formData, setFormData] = useReducer(
    (formData, newItem) => {
      return { ...formData, ...newItem };
    },
    { username: "", password: "" }
  );
  const [errMsg, setErrorMessage] = useState(null);

  const doLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate("/account");
    } catch (error) {
      setErrorMessage(error);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-4 py-10 lg:px-6">
      <h2 className="text-center text-3xl font-bold mt-20">Login Here</h2>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 bg-green-400 p-6 rounded-2xl">
          <div>
            <label className="p-2">Username/Email</label>
            <input
              value={formData.username}
              onChange={(e) => setFormData({ username: e.target.value })}
              type="text"
              className="text-black"
            />
          </div>
          <div>
            <label className="p-2">Password</label>
            <input
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })}
              type="password"
              className="text-black"
            />
          </div>
          <div>
            <p>
              Dont have an account?{" "}
              <Link to="/register" className="underline">
                Register Here
              </Link>
            </p>
          </div>
          <div>
            <button
              onClick={(e) => doLogin(e)}
              className="rounded-md justify-center bg-gray-800 p-2"
            >
              Login
            </button>
          </div>
        </form>
        {errMsg ? (
          <div className="">
            {errMsg}
            <button
              onClick={() => setErrorMessage(null)}
              className="rounded-md justify-center bg-red-500"
            >
              Dismiss
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
