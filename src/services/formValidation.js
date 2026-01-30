// Form validation service with detailed error messages

export const validateForm = (formData) => {
  const errors = [];
  const fieldLabels = {
    key: "API Key",
    name: "Full Name",
    year: "Current Year of Study",
    university: "University",
    gpa: "Current GPA or Academic Standing",
    internships: "Relevant Internships or Work Experiences",
    interestAreas: "Primary Areas of Interest within Computer Science",
    specializedCourses: "Specialized Courses in AI, ML, or Data Science",
    python: "Python Proficiency",
    java: "Java Proficiency",
    webdev: "Web Development Proficiency",
    ml: "Machine Learning Proficiency",
    proficiency: "Overall Proficiency Rating (1-5)",
    challengingProject: "Challenging Technical Project",
    openSource: "Open-Source Contributions",
    methodologies: "Familiar Development Methodologies",
    aiMlTechniques: "Experience with AI/ML Techniques",
    bigDataTech: "Experience with Big Data Technologies",
    testing: "Experience with Software Testing and QA",
    aiMlInterest: "Areas of AI/ML of Interest",
    aiMlProjects: "Significant AI/ML Projects",
    mlAlgorithms: "Familiar Machine Learning Algorithms",
    deepLearning: "Experience with Deep Learning Architectures",
    researchInterest: "Interest in Theoretical vs Practical AI/ML Research",
    challenges: "Biggest Challenges in AI/ML",
    competitions: "AI/ML Competitions Experience",
    toolsPlatforms: "Specific AI/ML Tools or Platforms of Interest",
    postGradRole: "Post-Graduation Role",
    companiesIndustries: "Specific Companies or Industries of Interest",
    furtherStudies: "Considering Further Studies in AI/ML or Related Field",
    careerVision: "Career Vision in 5 Years",
    aiMlExcitement: "Aspects of AI/ML That Excite You",
    projectSize: "Preferred Project Size and Scope",
    teamOrIndividual: "Interest in Team-based vs Individual Projects",
    startupInterest: "Interest in Startup Potential",
    projectFocus: "Project Focus",
    projectIndustry: "Specific Industries for Project Focus",
    dataType: "Preferred Data Type for Project",
    hardwareSoftware: "Interest in Hardware or Software-based Projects",
    publicationImportance: "Importance of Publication or Patenting",
    problemSolving: "Approach to Problem-Solving",
    challengingTasks: "Preferred Approach to Challenging Tasks",
    learningMethod: "Preferred Learning Method",
    comfortAmbiguity: "Comfort Level with Ambiguity (1-5)",
    goalPreference: "Preference for Defined Goals vs. Open-ended Exploration",
    setbacks: "Handling Setbacks or Failures",
    thinkingStyle: "Big-Picture vs. Detail-Oriented",
    workLifeBalance: "Importance of Work-Life Balance",
    otherFields: "Other Academic Fields of Interest",
    globalIssues: "Global Issues or Causes You're Passionate About",
    hobbies: "Hobbies or Skills Outside Computer Science",
    interdisciplinaryProjects: "Interest in AI/ML Projects with Other Disciplines",
    inspiringCourses: "Inspiring Non-CS Courses",
    emergingTech: "Emerging Technologies Exciting to You",
  };

  // Page mapping for navigation
  const fieldToPage = {
    key: 1, name: 1, year: 1, university: 1, gpa: 1, internships: 1, 
    interestAreas: 1, specializedCourses: 1,
    python: 2, java: 2, webdev: 2, ml: 2, proficiency: 2, 
    challengingProject: 2, openSource: 2, methodologies: 2, 
    aiMlTechniques: 2, bigDataTech: 2, testing: 2,
    aiMlInterest: 3, aiMlProjects: 3, mlAlgorithms: 3, 
    deepLearning: 3, researchInterest: 3, challenges: 3, 
    competitions: 3, toolsPlatforms: 3,
    postGradRole: 4, companiesIndustries: 4, furtherStudies: 4, 
    careerVision: 4, aiMlExcitement: 4,
    projectSize: 5, teamOrIndividual: 5, startupInterest: 5, 
    projectFocus: 5, projectIndustry: 5, dataType: 5, 
    hardwareSoftware: 5, publicationImportance: 5,
    problemSolving: 6, challengingTasks: 6, learningMethod: 6, 
    comfortAmbiguity: 6, goalPreference: 6, setbacks: 6, 
    thinkingStyle: 6, workLifeBalance: 6,
    otherFields: 7, globalIssues: 7, hobbies: 7, 
    interdisciplinaryProjects: 7, inspiringCourses: 7, emergingTech: 7,
  };

  Object.keys(formData).forEach((key) => {
    const value = formData[key];
    if (!value || (Array.isArray(value) && value.length === 0) || value === "") {
      errors.push({
        field: key,
        label: fieldLabels[key] || key,
        page: fieldToPage[key] || 1,
        message: `${fieldLabels[key] || key} is required`,
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors: errors,
    errorsByPage: errors.reduce((acc, error) => {
      if (!acc[error.page]) acc[error.page] = [];
      acc[error.page].push(error);
      return acc;
    }, {}),
  };
};

export const getPageFields = (page) => {
  const pageFieldsMap = {
    1: ["key", "name", "year", "university", "gpa", "internships", "interestAreas", "specializedCourses"],
    2: ["python", "java", "webdev", "ml", "proficiency", "challengingProject", "openSource", "methodologies", "aiMlTechniques", "bigDataTech", "testing"],
    3: ["aiMlInterest", "aiMlProjects", "mlAlgorithms", "deepLearning", "researchInterest", "challenges", "competitions", "toolsPlatforms"],
    4: ["postGradRole", "companiesIndustries", "furtherStudies", "careerVision", "aiMlExcitement"],
    5: ["projectSize", "teamOrIndividual", "startupInterest", "projectFocus", "projectIndustry", "dataType", "hardwareSoftware", "publicationImportance"],
    6: ["problemSolving", "challengingTasks", "learningMethod", "comfortAmbiguity", "goalPreference", "setbacks", "thinkingStyle", "workLifeBalance"],
    7: ["otherFields", "globalIssues", "hobbies", "interdisciplinaryProjects", "inspiringCourses", "emergingTech"],
  };
  return pageFieldsMap[page] || [];
};
