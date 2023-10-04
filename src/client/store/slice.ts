import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userInitialState = {
    username:'',
    isSessionActive:false,
}

// Sliceはaction.jsとreducer.jsを統合したもの的なやつ
const userSlice = createSlice({
    name:'userSlice',
    initialState:userInitialState,
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

const optionInitialState = {
    headerHeight:0,
}

const optionSlice = createSlice({
    name:'optionSlice',
    initialState:optionInitialState,
    reducers: {
        getHeaderHeight: (state, action: PayloadAction<{ headerHeight:number} >) => {
            state.headerHeight = action.payload.headerHeight;
        }
    }
})

export const { loginAction, logoutAction } = userSlice.actions;
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
