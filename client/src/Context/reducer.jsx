import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CLEAR_ALERT,
  DISPLAY_ALERT,
  HANDLE_CHANGE,
  VERIFICATION_BEGINS,
  VERIFICATION_ERROR,
  VERIFICATION_SUCCESS,
  CREATE_NOTE_BEGINS,
  CREATE_NOTE_ERROR,
  CREATE_NOTE_SUCCESS,
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
} from "./action";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: "Provide All the values",
      alertType: "danger",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Verification link send to registered email Id",
      alertType: "success",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successfull!!",
      user: action.payload.user,
      token: action.payload.token,
      isVerified: action.payload.isVerified,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === VERIFICATION_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === VERIFICATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === VERIFICATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Verfication failed , Please try again later",
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CREATE_NOTE_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_NOTE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Note created successfully",
      title: "",
      body: "",
    };
  }
  if (action.type === CREATE_NOTE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SET_EDIT_NOTE) {
    const noteId = action.payload.noteId;
    const note = state.notes.find((note) => note._id === noteId);
    return {
      ...state,
      isEdit: true,
      editId: noteId,
      title: note.title,
      body: note.body,
    };
  }
  if (action.type === EDIT_NOTE_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_NOTE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Note update successfully",
      title: "",
      body: "",
      isEdit: false,
      editId: "",
    };
  }
  if (action.type === EDIT_NOTE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_ALL_NOTES_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_ALL_NOTES_SUCCESS) {
    return {
      ...state,
      notes: [...action.payload.notes],
      totalNotes: action.payload.totalNotes,
      numofPages: action.payload.numofPages,
      isLoading: false,
    };
  }
  if (action.type === GET_ALL_NOTES_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "An error occured,Please refresh the page",
    };
  }
  if (action.type === DELETE_NOTE_BEGINS) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === DELETE_NOTE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Note deleted successfully",
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      toggleMenu: !state.toggleMenu,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.pageNumber,
    };
  }
  if (action.type == LOGOUT_USER) {
    return {
      user: null,
      token: null,
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
  }
};
export default reducer;
