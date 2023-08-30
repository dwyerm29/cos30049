import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="flex min-h-full flex-col justify-center px-4 py-10 lg:px-6">
      <h2 className="text-center text-3xl font-bold mt-20">Login Here</h2>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 bg-green-400 p-6 rounded-2xl ">
          <div>
            <label className="p-2">Username/Email</label>
            <input type="text" />
          </div>
          <div>
            <label className="p-2">Password</label>
            <input type="password" />
          </div>
          <div>
            <p>Forgot Password</p>
            <p>
              Dont have an account? Register{" "}
              <Link
                to="/register"
                className="underline hover:underline-offset-4"
              >
                Here
              </Link>
            </p>
          </div>
          <Link to="/account">
            <button className="rounded-md justify-center bg-gray-800 p-2">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
