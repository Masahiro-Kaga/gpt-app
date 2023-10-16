import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckSession = (pass: boolean | null) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (pass === null) return;
    if (!pass) {
      navigate("/");
    }
  }, [pass, navigate]);
};

export default useCheckSession;