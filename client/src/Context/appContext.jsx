import React from "react";
import { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  VERIFICATION_BEGINS,
  VERIFICATION_SUCCESS,
  VERIFICATION_ERROR,
  HANDLE_CHANGE,
  CREATE_NOTE_BEGINS,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR,
  GET_ALL_NOTES_BEGINS,
  GET_ALL_NOTES_SUCCESS,
  GET_ALL_NOTES_ERROR,
  DELETE_NOTE_BEGINS,
  DELETE_NOTE_SUCCESS,
  SET_EDIT_NOTE,
  EDIT_NOTE_BEGINS,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_ERROR,
  TOGGLE_SIDEBAR,
  CHANGE_PAGE,
  LOGOUT_USER,
  DELETE_NOTE_ERROR,
} from "./action";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  toggleMenu: false,
  alertText: "",
  alertType: "",
  isEdit: false,
  editId: "",
  title: "",
  body: "",
  notes: [],
  page: 1,
  totalNotes: 0,
  numofPages: 1,
  search: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children, setError }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const requestURL = "https://notes-app-bo24.onrender.com/api/v1";
  axios.defaults.headers["Authorization"] = `Bearer ${state.token}`;
  const addUserToLocalStoage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clerAlert();
  };
  const clerAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };
  const handleToggle = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  // Register user
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      await axios.post(`${requestURL}/auth/register`, currentUser);
      dispatch({ type: REGISTER_USER_SUCCESS });
      clerAlert();
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clerAlert();
    }
  };
  // login user
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `${requestURL}/auth/login`,
        currentUser
      );
      const { user, token } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStoage({ user, token });
      clerAlert();
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clerAlert();
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
    window.location.assign('https://notes-app-bo24.onrender.com')
  };
  //Verification of email
  const verifyUserEmail = async ({ verificationToken, email }) => {
    dispatch({ type: VERIFICATION_BEGINS });
    try {
      await axios.post(`${requestURL}/auth/verify-email`, {
        verificationToken,
        email,
      });
      dispatch({ type: VERIFICATION_SUCCESS });
    } catch (error) {
      dispatch({ type: VERIFICATION_ERROR });
    }
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  //Request for getting all notes
  const getAllNotes = async () => {
    const { search, page } = state;
    let url = `${requestURL}/notes?page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_ALL_NOTES_BEGINS });
    try {
      const { data } = await axios.get(url);
      const { notes, totalNotes, numofPages } = data;
      dispatch({
        type: GET_ALL_NOTES_SUCCESS,
        payload: { notes, totalNotes, numofPages },
      });
    } catch (error) {
      dispatch({ type: GET_ALL_NOTES_ERROR });
      clerAlert();
    }
  };
  // Creating a Note
  const createNote = async ({ title, body }) => {
    dispatch({ type: CREATE_NOTE_BEGINS });
    try {
      await axios.post(`${requestURL}/notes`, { title, body });
      dispatch({ type: CREATE_NOTE_SUCCESS });
      clerAlert();
    } catch (error) {
      dispatch({
        type: CREATE_NOTE_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clerAlert();
    }
  };
  const setEditNote = (id) => {
    dispatch({ type: SET_EDIT_NOTE, payload: { noteId: id } });
  };
  const editNote = async ({ title, body }) => {
    dispatch({ type: EDIT_NOTE_BEGINS });
    try {
      await axios.patch(`${requestURL}/notes/${state.editId}`, { title, body });
      dispatch({ type: EDIT_NOTE_SUCCESS });
      clerAlert();
    } catch (error) {
      dispatch({
        type: EDIT_NOTE_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clerAlert();
    }
  };
  //DELETE NOTE
  const deleteNote = async (id) => {
    dispatch({ type: DELETE_NOTE_BEGINS });
    try {
      await axios.delete(`${requestURL}/notes/${id}`);
      dispatch({ type: DELETE_NOTE_SUCCESS });
      getAllNotes();
      clerAlert();
    } catch (error) {
      dispatch({ type: DELETE_NOTE_ERROR });
    }
  };
  const changePage = (pageNumber) => {
    dispatch({ type: CHANGE_PAGE, payload: { pageNumber } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        displayAlert,
        verifyUserEmail,
        getAllNotes,
        handleChange,
        createNote,
        setEditNote,
        editNote,
        deleteNote,
        handleToggle,
        logoutUser,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useAppContext };
