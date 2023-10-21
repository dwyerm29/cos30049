import { React, useState } from "react";

import { Link } from "react-router-dom";

export const Register = () => {
  const [formInput, setRegInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const regInput = (name, value) => {
    setRegInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateForm = (event) => {
    event.preventDefault();
    let inputError = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confPassword: "",
    };

    if (formInput.confPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confPassword: "Passwords do not match!",
      });
      return;
    } else {
      setIsSuccessful(true);
    }

    setFormError(inputError);
  };
  return (
    /* Form for registration to check that passwords are matching*/

    <div className="flex min-h-full flex-col justify-center px-4 py-10 lg:px-6">
      <h2 className="text-center text-3xl font-bold mt-20 text-green-400">
        Register Here
      </h2>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6 bg-gray-700 p-6 rounded-2xl"
          onSubmit={validateForm}
        >
          <div>
            <label className="py-2 leading-6 text-xl">First Name</label>
            <input
              name="firstName"
              type="text"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
            />
          </div>

          <div>
            <label className="py-2 leading-6 text-xl">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
            />
          </div>

          <div>
            <label className="py-2 leading-6 text-xl">Email</label>
            <input
              name="email"
              type="text"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
            />
          </div>

          <div>
            <label className="py-2 leading-6 text-xl">Password</label>
            <input
              value={formInput.password}
              onChange={({ target }) => {
                regInput(target.name, target.value);
              }}
              name="password"
              type="password"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
            />
          </div>

          <div>
            <label className="py-2 leading-6 text-xl">Confirm Password</label>
            <input
              value={formInput.confPassword}
              onChange={({ target }) => {
                regInput(target.name, target.value);
              }}
              name="confPassword"
              type="password"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
            />
          </div>
          <p>{formError.confPassword}</p>
          <div>
            <p>
              Already have an Account?{" "}
              <Link to="/login" className="underline">
                Sign In Here
              </Link>
            </p>
          </div>
          <div>
            <input
              type="submit"
              className="rounded-md justify-center bg-gray-800 p-2"
              value="Register"
            />
          </div>
          {isSuccessful && <p>Registration Successful</p>}
        </form>
      </div>
    </div>
  );
};
