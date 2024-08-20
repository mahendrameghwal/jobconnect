import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  CandidateData: {
    avtar: "",
    fullname: "",
    gender: "",
    noticeperiod: "",
    empstatus: "",
    email: "",
    phone: "",
    social: [
      {
        name: "",
        link: "",
      },
    ],
    city: "",
    state: "",
    country: "",
    education: [
      {
        institute: "",
        degree: "",
        fieldofstudy: "",
        startdate: "",
        enddate: "",
        percentage: "",
        qualification: "",
      },
    ],
    resume: "",
    currentempstatus: "",
    summary: "",
    skills: [
      {
        skilltype: "",
        name: "",
      },
    ],
    employment:[
      {
        position: "",
        orgname: "",
        emptype: "",
        emplevel: "",
        empcategory: "",
        startdate: "",
        enddate: "",
        workskills: [
          {
            category: "",
            name: "",
          },
        ],
      }
    ],
    project: [
      {
        title: "",
        status: "",
        description: "",
        startdate: "",
        enddate: "",
        sourcelink:"",
        livelink:"",
        projectskill: [
          {
            category: "",
            name: "",
          },
        ],
      },
    ],
  },
};

const CreateCandidateSlice = createSlice({
  name: "createcandidate",
  initialState,
  reducers: {
    // getting candidate data
    SetCandidatedata(state, action) {
      state.CandidateData = { ...state.CandidateData, ...action.payload };
    },
    // candidate past status
    CandidateStatus(state, action) {
      state.CandidateData.empstatus = action.payload;
    },
    SetCountry(state, action) {
      state.CandidateData.country = action.payload;
    },
    setState(state, action) {
      state.CandidateData.state = action.payload;
    },
     setCity(state, action) {
      state.CandidateData.city = action.payload;
    },
    // candidate current status
    CurrentCandidateStatus(state, action) {
      state.CandidateData.currentempstatus = action.payload;
    },
    //add multiple education field
    AddMoreEducation(state) {
      if (state.CandidateData.education.length < 3) {
        state.CandidateData.education = [
          ...state.CandidateData.education,
          {
            institute: "",
            degree: "",
            fieldofstudy: "",
            startdate: "",
            enddate: "",
            percentage: "",
            qualification: "",
          },
        ];
        toast.success(
          `education ${state.CandidateData.education.length} added success `
        );
      } else {
        toast.error("maxmium 3 education can add");
      }
    },
    // update  education field
    updateEducationField(state, action) {
      const { index, name, value } = action.payload;
      const updatedEducation = [...state.CandidateData.education];
      updatedEducation[index][name] = value;
      state.CandidateData.education = updatedEducation;
    },
    // delete  education field
    updateDeleteEducation(state, action) {
      if (state.CandidateData.education.length > 1) {
        const UpdatedEducation = state.CandidateData.education.filter(
          (x, i) => i !== action.payload
        );
        state.CandidateData.education = UpdatedEducation;
        UpdatedEducation && toast.success("Successfully Deleted ");
      } else {
        toast.error("at least One Education Field Required");
      }
    },
    //add mutiple exprience field
    AddMoreEmployment(state) {
      if (state.CandidateData.employment.length < 3) {
        state.CandidateData.employment = [
          ...state.CandidateData.employment,
          {
            position: "",
            orgname: "",
            emptype: "",
            emplevel: "",
            empcategory: "",
            startdate: "",
            enddate: "",
            workskills: [
              {
                category: "",
                name: "",
              },
            ],
          },
        ];
        toast.success(
          `exprience ${state.CandidateData.employment.length} added success `
        );
      } else {
        toast.error("maxmium 3 exprienece can add");
      }
    },
    //add mutiple exprience data
    updateEmployment(state, action) {
      const { index, name, value } = action.payload;
      const UpdateEmployment = [...state.CandidateData.employment];
      UpdateEmployment[index][name] = value;
      state.CandidateData.employment = UpdateEmployment;
    },
    //delete mutiple exprience
    UpdateDeleteEmployment(state, action) {
      if (state.CandidateData.employment.length > 1) {
        const UpdateEmployment = state.CandidateData.employment.filter(
          (x, i) => i !== action.payload
        );
        state.CandidateData.employment = UpdateEmployment;
        UpdateEmployment && toast.success("Successfully Deleted ");
      } else {
        toast.error("At least One exprience Field Required");
      }
    },
    //add exprience skills
    AddEmploymentSkills: (state, action) => {
      const { index, category, name } = action.payload;
      const FilteredSkill = state.CandidateData.employment[
        index
      ].workskills.filter(
        ({ category, name }) => category !== "" && name !== ""
      );
      if (FilteredSkill.length < 20) {
        state.CandidateData.employment[index].workskills = [
          ...FilteredSkill,
          { category, name },
        ];
      } else {
        toast.error(" maximum  20 skills can add.");
      }
    },
    //delete exprience skills
    DeleteEmploymentSkills: (state, action) => {
      const { ind, index } = action.payload;
      const empIndex = ind;
      const skillIndex = index;

      if (state.CandidateData.employment[empIndex].workskills.length > 0) {
        const updatedWorkskills = state.CandidateData.employment[
          empIndex
        ].workskills.filter((_, idx) => idx !== skillIndex);
        state.CandidateData.employment[empIndex].workskills = updatedWorkskills;
        toast.success("Skill deleted Successfully");
        if (state.CandidateData.employment[empIndex].workskills.length === 0) {
          state.CandidateData.employment[empIndex].workskills = [
            {
              category: "",
              name: "",
            },
          ];
        }
      } else {
        toast.error("Invalid skill");
      }
    },
 /*Project ssection */
  AddProject:(state)=>{
    if (state.CandidateData.project.length < 2) {
      state.CandidateData.project = [...state.CandidateData.project, {
        title: "",
        status: "",
        description: "",
        startdate: "",
        enddate: "",
        sourcelink:"",
        livelink:"",
        projectskill: [
          {
            category: "",
            name: "",
          },
        ],
      },];
      toast.success(
        `Project ${state.CandidateData.project.length} added `
      );
    } else {
      toast.error("maxmium 2 Projects can add");
    }
  },
  UpdateProject(state, action) {
    const { index, name, value } = action.payload;
    const Updateproject = [...state.CandidateData.project];
    Updateproject[index][name] = value;
    state.CandidateData.project = Updateproject;
  },
  UpdateDeleteproject(state, action) {
    if (state.CandidateData.project.length > 1) {
      const filteredPorjecct = state.CandidateData.project.filter(
        (x, i) => i !== action.payload
      );
      state.CandidateData.project = filteredPorjecct;
      filteredPorjecct && toast.success("Successfully Deleted ");
    } else {
      toast.error("At least One One Field Required");
    }
  },

  AddProjectSkills: (state, action) => {
    const { index, category, name } = action.payload;
    const FilteredSkill = state.CandidateData.project[
      index
    ].projectskill.filter(
      ({ category, name }) => category !== "" && name !== ""
    );
    if (FilteredSkill.length < 20) {
      state.CandidateData.project[index].projectskill = [
        ...FilteredSkill,
        { category, name },
      ];
    } else {
      toast.error(" maximum  20 skills can add.");
    }
  }
  ,

  DeleteProjectSkills: (state, action) => {
    const { index,skillindex } = action.payload;
    const empIndex = index;
    const skillIndex = skillindex;

    if (state.CandidateData.project[empIndex].projectskill.length > 0) {
      const updatedProjectskills = state.CandidateData.project[
        empIndex
      ].projectskill.filter((_, idx) => idx !== skillIndex);
      state.CandidateData.project[empIndex].projectskill = updatedProjectskills;
      toast.success("Skill deleted Successfully");
      if (state.CandidateData.project[empIndex].projectskill.length === 0) {
        state.CandidateData.project[empIndex].projectskill = [
          {
            category: "",
            name: "",
          },
        ];
      }
    } else {
      toast.error("Invalid skill");
    }
  },

    //add social field
    AddSocial: (state, action) => {
      const { name, link } = action.payload;

      const SocialLink = state.CandidateData.social.filter(
        item => item.name !== "" && item.link !== ""
      );

      if (SocialLink.length < 7) {
        const existingSocial = SocialLink.find(item => item.name === name);
        if (!existingSocial) {
          state.CandidateData.social = [...SocialLink, { name, link }];
          toast.success("Link added Successfully");
        } else {
          toast.error("This social network link already exists.");
        }
      } else {
        toast.error("You can add a maximum of 7 social network links.");
      }
    },
    //Delete social field
    DeleteSocial: (state, action) => {
      const myindex = action.payload;
      const UpdatedSocial = state.CandidateData.social.filter(
        (x, i) => i !== myindex
      );
      if (UpdatedSocial.length === 0) {
        state.CandidateData.social = initialState.CandidateData.social;
      } else {
        state.CandidateData.social = UpdatedSocial;
        UpdatedSocial && toast.success("Link deleted Successfully");
      }
    },
    //add multiple skills
    AddInfoSkills: (state, action) => {
      const { skilltype, name } = action.payload;
      const FilteredSkill = state.CandidateData.skills.filter(
        ({ skilltype, name }) => skilltype !== "" && name !== ""
      );

      if (FilteredSkill.length < 20) {
        state.CandidateData.skills = [...FilteredSkill, { skilltype, name }];
      } else {
        toast.error(" maximum  20 skills can add.");
      }
    },
    //delete multiple skills
    DeleteSkill: (state, action) => {
      const myindex = action.payload;
      const UpdatedSkills = state.CandidateData.skills.filter(
        (x, i) => i !== myindex
      );
      if (UpdatedSkills.length === 0) {
        state.CandidateData.skills = initialState.CandidateData.skills;
      } else {
        state.CandidateData.skills = UpdatedSkills;
        UpdatedSkills && toast.success("skills deleted Successfully");
      }
    },
    // for reset data in form
    resetCandidateForm() {
      return initialState;
    },
  },
});

export const {
  SetCandidatedata,
  HandleSubmitForm,
  CandidateStatus,
  CurrentCandidateStatus,
  AddMoreEducation,
  updateEducationField,
  updateDeleteEducation,
  AddProject,
  UpdateProject,
  UpdateDeleteproject,
  AddSocial,
  DeleteSocial,
  AddInfoSkills,
  DeleteSkill,
  AddMoreEmployment,
  updateEmployment,
  UpdateDeleteEmployment,
  AddEmploymentSkills,
  DeleteEmploymentSkills,
  AddProjectSkills,
  DeleteProjectSkills,
  SetCountry,setCity,setState,
  resetCandidateForm
} = CreateCandidateSlice.actions;

export default CreateCandidateSlice.reducer;
