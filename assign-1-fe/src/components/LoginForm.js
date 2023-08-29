import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="text-center text-3xl font-bold mt-20">Login Here</h2>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 bg-green-400 p-8 rounded-2xl ">
          <div>
            <label>Username/Email</label>
            <input type="text" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" />
          </div>
          <div>
            <p>Forgot Password</p>
            <p>
              Dont have an account? Register <Link to="/register">Here</Link>
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
