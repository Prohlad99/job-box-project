import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from './../../firebase/firebase.config';

const initialState = {
    user: {
        email: "",
        role: "",
    },

    isLoading: false,
    isError: false,
    error: "",
}

const provider = new GoogleAuthProvider();

export const createUserByEmailAndPassword = createAsyncThunk("auth/createUserByEmailAndPassword", async({email, password})=>{
    const result = await createUserWithEmailAndPassword(auth, email, password);

    return result.user.email;
})

export const signInByEmailAndPassword = createAsyncThunk("auth/signInByEmailAndPassword", async({email, password})=>{
    const result = await signInWithEmailAndPassword(auth, email, password)

    return result.user.email;
}) 

export const getUser = createAsyncThunk("auth/getUser", async(email)=>{
    const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`)
    const data = await res.json()

    if(data.status){
        return data
    }else{
        return email
    }

})

// SIGN IN BY GOOGLE
export const signInByPopup = createAsyncThunk("auth/signInByPopup", async()=>{
    const result = await signInWithPopup(auth, provider)

    return result.user.email
})


export const logOut = createAsyncThunk("/auth/logOut", async()=>{
    const result = await signOut(auth)
    return result
})



const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user.email = action.payload
            state.isLoading = false
        }
    },
    extraReducers:(build)=>{
        build.addCase(createUserByEmailAndPassword.pending, (state, action)=>{
            state.user.email = "";
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        })
        .addCase(createUserByEmailAndPassword.fulfilled, (state, action)=>{
            state.user.email = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = ""
        })
        .addCase(createUserByEmailAndPassword.rejected, (state, action)=>{
            state.user.email = "";
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(signInByEmailAndPassword.pending, (state, action)=>{
            state.user.email = "";
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        })
        .addCase(signInByEmailAndPassword.fulfilled, (state, action)=>{
            state.user.email = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = ""
        })
        .addCase(signInByEmailAndPassword.rejected, (state, action)=>{
            state.user.email = "";
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(logOut.pending, (state, action)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        })
        .addCase(logOut.fulfilled, (state, action)=>{
            state.user = {email:"", role:""};
            state.isLoading = false;
            state.isError = false;
            state.error = ""
        })
        .addCase(logOut.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(signInByPopup.pending, (state, action)=>{
            state.user.email = "";
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        })
        .addCase(signInByPopup.fulfilled, (state, action)=>{
            state.user.email = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = ""
        })
        .addCase(signInByPopup.rejected, (state, action)=>{
            state.user.email = "";
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(getUser.pending, (state, action)=>{
            state.user = {}
            state.isError = false;
            state.error = ""
        })
        .addCase(getUser.fulfilled, (state, action)=>{
            if(action.payload.status){
                state.user = action.payload.data;
            }else{
                state.user.email = action.payload
            }
            state.isLoading = false
            state.isError = false;
            state.error = ""
        })
        .addCase(getUser.rejected, (state, action)=>{
            state.isError = true;
            state.user.email = action.payload
            state.error = action.error.message
        })
    }
})


export const {setUser} = authSlice.actions
export default authSlice.reducer