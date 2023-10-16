import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { APIGeneralResponseType } from "../axiosConfig";
import axios from "axios";

const userInitialState = {
  username: "",
  isSessionActive: false,
};

// user/fetchLatestSessionDataはアクションの名前らしい。でもtool使っている以上はswitchとか使ってaction別にしなくていいから、デバッグの時にログで出てくるくらいの役割らしい。
export const fetchLatestSessionData = createAsyncThunk(
  "user/fetchLatestSessionData",
  async (): Promise<APIGeneralResponseType> => {
    try {
      const response: APIGeneralResponseType = await axios.get("/api/user/check-session");
      
      return response;  
    } catch (error) {
    //また、throwを使用するかどうかについては、createAsyncThunk内でエラーをキャッチしてReduxのrejectedアクションをディスパッチするために必要です。インターセプターでエラー処理を完結させる場合、createAsyncThunkでのthrowは必要ありません。 だそうです。
      throw error // これが、fetchLatestSessionData.rejectedを働かせる。
    }
  }
);

// Sliceはaction.jsとreducer.jsを統合したもの的なやつ
const userSlice = createSlice({
  name: "userSlice",
  initialState: userInitialState,
  reducers: {
    // PayloadActionはactionのジェネリック型だってさ。
    fetchSession: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
      state.isSessionActive = true;
    },
    deleteSession: (state) => {
      state.username = "";
      state.isSessionActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatestSessionData.fulfilled, (state,action) => {
      // 
      // このコンソールみたら、ちょっと仕組みがわかる、かも？
      // 
      if(action.payload.pass){
        state.isSessionActive = true;
        state.username = action.payload.data;
      }
    });
    builder.addCase(fetchLatestSessionData.rejected, (state, action) => {
      console.error(action); 
      state.isSessionActive = false;
    });
  },
});
// loginとかlogoutがaction。

const optionInitialState = {
  headerHeight: 0,
};

const optionSlice = createSlice({
  name: "optionSlice",
  initialState: optionInitialState,
  reducers: {
    getHeaderHeight: (
      state,
      action: PayloadAction<{ headerHeight: number }>
    ) => {
      state.headerHeight = action.payload.headerHeight;
    },
  },
});

export const { fetchSession, deleteSession } = userSlice.actions;
export const { getHeaderHeight } = optionSlice.actions;

// reducerとactionをエクスポート。
export const userReducer = userSlice.reducer;
export const optionReducer = optionSlice.reducer;

// アクションは、そのアクションの名前（タイプ）と、ペイロードが必要ならそれの定義をするだけ。

// src/client/store/actions.js
// import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';

// export function loginSuccess(username) {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: { username },
//   };
// }

// export function logout() {
//   return {
//     type: LOGOUT,
//   };
// }

//　リデューサーは、該当アクションタイプが渡された時の、ステート・変数をどう料理するかというもの。

// src/client/store/reducer.js
// import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';

// const initialState = {
//   username: '',
//   isSessionActive: false
// };

// export default function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         username: action.payload.username,
//         isSessionActive: true,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         username: '',
//         isSessionActive: false,
//       };
//     default:
//       return state;
//   }
// }
