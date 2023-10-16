
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestSessionData, fetchSession } from "../store/slice";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { APIGeneralResponseType } from "../axiosConfig";
import axios from "axios";

export function useCheckSession(pass: boolean | null) {
  const user = useSelector((state: RootState) => state.userKey);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

                      
                    
    
    useEffect(() => {
            if (pass === null) return;     if (!pass) {
      ;
      navigate("/");
    }
  }, [pass]);
}
