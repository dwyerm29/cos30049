import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthData } from "../auth/AuthWrap";

//This page is where the user logs in. Authentication is handled by AuthWrap, and this form only accepts a username and password to send there.
export const Login = () => {
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
      <h2 className="text-center text-3xl font-bold mt-20 text-green-400">
        Login Here
      </h2>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <p>Username: john.smith@example.com </p>
          <p>Password: password</p>
        </div>
        <form className="space-y-6 bg-gray-700 p-6 rounded-2xl">
          <div>
            <label className="py-2 leading-6 text-xl">Username/Email</label>
            <input
              value={formData.username}
              onChange={(e) => setFormData({ username: e.target.value })}
              type="text"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
              required
            />
          </div>
          <div>
            <label className="py-2 leading-6 text-xl">Password</label>
            <input
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })}
              type="password"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
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
};
