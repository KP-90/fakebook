import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        token: '',
        user: ''
    },
    reducers: {
        changeToken: (state, action) => {state.token = action.payload},
        changeUser: (state, action) => {state.user = action.payload}
    }
})

export const { changeToken, changeUser } = userSlice.actions

export default userSlice.reducer