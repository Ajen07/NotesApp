import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../Context/appContext";
import Alert from "../componenets/Alert";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
  const { isLoading, verifyUserEmail, showAlert } = useAppContext();
  const query = useQuery();
  console.log({
    verificationToken: query.get("token"),
    email: query.get("email"),
  });
  useEffect(() => {
    if (!isLoading) {
      verifyUserEmail({
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    }
  }, []);
  if (isLoading) {
    return <div>Loading Please wait .....</div>;
  }
  if (showAlert) {
    return <div>{showAlert && <Alert />}</div>;
  }
  return (
    <main className="verify-container">
      <div>Verification Successfull ..!!</div>
      <Link to="/register" className="link">
        Login
      </Link>
    </main>
  );
};

export default VerifyEmail;
