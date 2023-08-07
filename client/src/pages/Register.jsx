import React, { useEffect, useState } from "react";
import FormRow from "../componenets/FormRow";
import { useNavigate } from "react-router-dom";
import Alert from "../componenets/Alert";
import { useAppContext } from "../Context/appContext";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });
  const navigate = useNavigate();
  const {
    isLoading,
    showAlert,
    displayAlert,
    loginUser,
    registerUser,
    user,
    isVerified,
  } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (values.isMember) {
      loginUser(currentUser);
      setValues({ email: "", password: "", isMember: true });
    } else {
      registerUser(currentUser);
      setValues({ name: "", email: "", password: "", isMember: false });
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [user, navigate]);
  const toggleUser = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  return (
    <main className="register-container">
      <form className="form">
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            value={values.name}
            name="name"
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          value={values.email}
          name="email"
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-block"
          onClick={handleSubmit}
          disabled={isLoading}
          style={{ "marginBottom": "0.5rem" }}
        >
          {values.isMember ? "Login" : "Register"}
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            disabled={isLoading}
            onClick={toggleUser}
            className="member-btn"
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </main>
  );
};

export default Register;
