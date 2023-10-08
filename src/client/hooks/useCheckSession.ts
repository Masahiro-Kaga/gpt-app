// hooks/useCheckSession.ts

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

  //   useEffect(() => {
  //     console.log("001user.isSessionActive???");
  //     console.log(user.isSessionActive);
  //     dispatch(fetchLatestSessionData());
  //     console.log("002user.isSessionActive???");
  //     console.log(user.isSessionActive);
  //     if (!user.isSessionActive) {
  //       console.log("useEffect to fetch session works");
  //       navigate("/");
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       console.log("001user.isSessionActive???", user.isSessionActive);
  //       await dispatch(fetchLatestSessionData());
  //       console.log("002user.isSessionActive???", user.isSessionActive);
  //       if (!user.isSessionActive) {
  //         console.log("useEffect to fetch session works");
  //         navigate("/");
  //       }
  //     };

  //     fetchData();
  //   }, [user.isSessionActive]); // ← ステートの変更を検知するために依存配列に追加

  useEffect(() => {
    if (pass === null) return; // APIの結果を待つ
    if (!pass) {
      console.log("useEffect to fetch session works");
      navigate("/");
    }
  }, [pass]);
}
