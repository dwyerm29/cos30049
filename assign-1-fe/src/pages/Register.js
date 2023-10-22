import { React, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";
import { Alert } from "@mui/material";

//Registration page where new users can sign up to the website.
export const Register = () => {
  //used to store the inputs' data.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  //user to display success or error messages
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  //handles form submission.
  const submitForm = (event) => {
    event.preventDefault();

    //Checks whether both passwords given match, and exits early if not.
    if (password !== confirmationPassword) {
      setError("Passwords do not match!");
      return;
    } else {
      setError("");
    }
    //halts if any of the fields are empty
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmationPassword === ""
    ) {
      setError("You must fill in all fields to create a new user");
      return;
    }

    //api post call with the new user's information. Either displays a success or error message upon completion.
    axios
      .post("http://127.0.0.1:8000/post_new_user", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data !== null) setIsSuccessful(true);
        if (response.data.length !== 0) setError(response.data.error);
      })
      .catch((error) => {
        //console.log("error here: ", error);
      });

    //setFormError(inputError);
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
          onSubmit={submitForm}
        >
          <div>
            <label className="py-2 leading-6 text-xl">First Name</label>
            <input
              name="firstName"
              type="text"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                //console.log(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="py-2 leading-6 text-xl">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="py-2 leading-6 text-xl">Email</label>
            <input
              name="email"
              type="text"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="py-2 leading-6 text-xl">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
            />
          </div>

          <div>
            <label className="py-2 leading-6 text-xl">Confirm Password</label>
            <input
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              name="confirmationPassword"
              type="password"
              className="text-black block w-full py-1 ring-1 focus:ring-2"
            />
          </div>
          <p>{error}</p>
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
          {isSuccessful ? (
            <Alert severity="success">
              Registration Successful!{" "}
              <Link to="/login" className="underline">
                Login Here
              </Link>
            </Alert>
          ) : (
            <Alert severity="error">Registration not Successful</Alert>
          )}
        </form>
      </div>
    </div>
  );
};
