import { createSlice } from '@reduxjs/toolkit';

function getEmptyuserForm() {
  return {
    name: '',
    age: '',
    gender: 'Male',
    status: 'Consult',
    time: '',
    date: '',
    phone: '',
    doctor: ''
  }
}

const initialState = {
  users: [],
  userForm: getEmptyuserForm(),
  currUserFormConfig: { index: -1, buttonType: 'Book' },
  status: 'idle',
};

// slice of state
export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    editUser: (state, action) => {
      state.userForm = { ...state.users[action.payload] };
      state.currUserFormConfig = { index: action.payload.index, id: action.payload.id, buttonType: 'Update' };
    },
    deleteUser: (state, action) => {
      state.users.splice(action.payload.index, 1);
      fetch(`http://localhost:3001/api/users/${action.payload.id}`, {
        method: 'DELETE'
      });
    },
    formSubmit: (state, action) => {
      if (action.payload === 'Book') {
        state.users.push(state.userForm);
        fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state.userForm)
        });
      } else { // update appointment
        state.users[state.currUserFormConfig.index] = state.userForm;
        fetch(`http://localhost:3001/api/users/${state.currUserFormConfig.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state.userForm)
        });
      }
      state.userForm = getEmptyuserForm();
      state.currUserFormConfig = { index: -1, id: -1, buttonType: 'Book' };
    },
    formChange: (state, action) => {
      state.userForm[action.payload.name] = action.payload.value;
    },
  },
});

export const { getUsers, deleteUser, editUser, formSubmit, formChange } = appointmentSlice.actions;

// selectors
export const showUsers = (state) => state.appointment.users;
export const showUserFormConfig = (state) => state.appointment.currUserFormConfig;
export const showUserForm = (state) => state.appointment.userForm;

export default appointmentSlice.reducer;
