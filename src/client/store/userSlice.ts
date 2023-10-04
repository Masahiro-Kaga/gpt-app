import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    username:'',
    isSessionActive:false,
}

// Sliceはaction.jsとreducer.jsを統合したもの的なやつ
const userSlice = createSlice({
    name:'userSliceName',
    initialState,
    reducers: {
        // PayloadActionはactionのジェネリック型だってさ。
        loginAction: (state,action: PayloadAction<{username:string}>) => {
            state.username = action.payload.username;
            state.isSessionActive = true;
        },
        logoutAction: state => {
            state.username = '';
            state.isSessionActive = false;            
        }
    }
})
// loginとかlogoutがaction。

export const { loginAction, logoutAction } = userSlice.actions;
// reducerとactionをエクスポート。
export default userSlice.reducer;



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
