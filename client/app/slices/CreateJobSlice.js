import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  jobtype: "",
  category: "",
  jobLevel: "",
  country:"",
  state:"",
  NumberOfPost:'',
  city:"",
  salary: "",
  newSkills: "",
  skills: [],
  newResponsibility: "",
  responsibilities: [],
  shortdesc: "",
};
const createJobSlice = createSlice({
  name: "createjob",
  initialState,
  reducers: {
    setField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setNewSkills(state, action) {
      state.newSkills = action.payload;
    },
    setCountry(state, action) {
      state.country = action.payload;
    },
    setState(state, action) {
      state.state = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setSkills(state, action) {
      state.skills = action.payload;
    },
    addSkill(state, action) {
      const newSkill = state.newSkills;

      if (state.skills.includes(newSkill)) {
        alert("Skill already added");
      } else if (newSkill.trim() === "") {
        alert("Please add a skill");
      } else {
        state.skills.push(newSkill);
        state.newSkills = "";
      }
    },
    removeskills(state, action) {
      const index = action.payload;
      const FilteredSkills = state.skills.filter(
        skill => skill !== state.skills[index]
      );
      state.skills = FilteredSkills;
    },
    setNewResponsibility(state, action) {
      state.newResponsibility = action.payload;
    },
    setResponsibilities(state, action) {
      state.responsibilities = action.payload;
    },
    addResponsibility(state, action) {
      const newResponsibility = state.newResponsibility;
      if (state.responsibilities.includes(newResponsibility)) {
        alert("skill already added");
      } else if (newResponsibility.trim() !== "") {
        state.responsibilities.push(newResponsibility);
        state.newResponsibility = "";
      }
    },
    removeroles(state, action) {
      const index = action.payload;
      const FilterRoles = state.responsibilities.filter(
        role => role !== state.responsibilities[index]
      );
      state.responsibilities = FilterRoles;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  setField,
  setNewSkills,
  setSkills,
  addSkill,
  removeskills, setCity,setCountry,setState,
  setNewResponsibility,
  setResponsibilities,
  addResponsibility,
  removeroles,resetState
} = createJobSlice.actions;

export default createJobSlice.reducer;
