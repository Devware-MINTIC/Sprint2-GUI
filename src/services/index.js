import axios from "axios";
import { saveInfo } from "../utils";

export const requestToken = async (token, setUser, setError) => {
  try {
    const google = await axios.post(
      "http://localhost:8080/api/auth/google",
      { token },
      { "Content-Type": "application/json" }
      );
    if (google.status === 200) {
      setUser(google.data.userInfo);
      saveInfo(google.data.token, google.data.userInfo);
    }
  } catch (error) {
    setError(error.response.data.error);
  }
};
