import { useEffect, useState } from "react";
import axios from "axios";

export default function Recommendation() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!email) {
        console.error("No email found in localStorage");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/get-user-info",
          { email }
        );
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "Something went wrong");
      }
    };

    fetchUserInfo();
  }, [email]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
