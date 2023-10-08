// hooks/useCheckSession.ts

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestSessionData, fetchSession } from "../store/slice";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { APIGeneralResponseType } from "../axiosConfig";
import axios from "axios";


export function useCheckSession() {
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
    const fetchData = async () => {
      try {
        const response: APIGeneralResponseType = await axios.get(
          "/api/user/check-session"
        );
        console.log(response);
        if (!response.pass) {
          console.log("useEffect to fetch session works");
          navigate("/");
          return;
        }
        dispatch(fetchSession( { username:response.data } ))
        return response;
      } catch (error) {
        //また、throwを使用するかどうかについては、createAsyncThunk内でエラーをキャッチしてReduxのrejectedアクションをディスパッチするために必要です。インターセプターでエラー処理を完結させる場合、createAsyncThunkでのthrowは必要ありません。 だそうです。
        throw error; // これが、fetchLatestSessionData.rejectedを働かせる。
      }

    };

    fetchData();
  }, [user.isSessionActive]); // ← ステートの変更を検知するために依存配列に追加
}
