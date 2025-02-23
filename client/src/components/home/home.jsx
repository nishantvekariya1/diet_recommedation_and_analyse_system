import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Navbar from "../Navbar/Navbar";
import Recommendation from "./recommendations";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar isLoggedIn={true} />
      <Recommendation />
    </>
  );
}
