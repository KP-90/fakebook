import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        token: '',
        user: '',
        comments: '',
    },
    reducers: {
        changeToken: (state, action) => {state.token = action.payload},
        changeUser: (state, action) => {state.user = action.payload},
        changeComments: (state, action) => {state.comments = action.payload}
    }
})

export const { changeToken, changeUser, changeComments } = userSlice.actions

export default userSlice.reducer