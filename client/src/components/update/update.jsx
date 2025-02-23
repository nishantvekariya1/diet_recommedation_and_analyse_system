import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateProfileForm from "./updateFrom";
import Navbar from "../Navbar/Navbar";
import './update.css';

export default function Update() {

  const navigate = useNavigate();
  
    useEffect(() => {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/");
      }
    }, [navigate]);


  return (
    <>
      <Navbar isLoggedIn="true"/>
      <div className="signupForm-cont">
        <UpdateProfileForm />
      </div>
    </>
  );
}