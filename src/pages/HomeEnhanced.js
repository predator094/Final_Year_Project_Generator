import React, { useState, useEffect, useRef } from "react";
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Stepper, 
  Step, 
  StepLabel,
  CircularProgress
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import anime from 'animejs';
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";
import RadioGroup from "../components/form/RadioGroup";
import TextAreaField from "../components/form/TextAreaField";
import ChecklistGroup from "../components/form/CheckListGroup";
import AnimatedBackground from "../components/common/AnimatedBackground";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a',
      light: '#3b82f6',
      dark: '#1e40af',
    },
    secondary: {
      main: '#0ea5e9',
    },
    background: {
      default: '#001f3f',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#ffffff',
    },
    h6: {
      fontWeight: 600,
      color: '#1e3a8a',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 28px',
        },
      },
    },
  },
});

const steps = [
  'Personal Information',
  'Technical Skills',
  'AI/ML Questions',
  'Career Aspirations',
  'Project Preferences',
  'Psychological Assessment',
  'Interdisciplinary Interests',
];

const HomeEnhanced = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    key: "", name: "", year: "", university: "", gpa: "", internships: "",
    interestAreas: "", specializedCourses: "", python: "", java: "", webdev: "",
    ml: "", proficiency: "", challengingProject: "", openSource: "", methodologies: "",
    aiMlTechniques: "", bigDataTech: "", testing: "", aiMlInterest: [],
    aiMlProjects: "", mlAlgorithms: "", deepLearning: "", researchInterest: "",
    challenges: "", competitions: "", toolsPlatforms: "", postGradRole: "",
    companiesIndustries: "", furtherStudies: "", careerVision: "", aiMlExcitement: "",
    projectSize: "", teamOrIndividual: "", startupInterest: "", projectFocus: "",
    projectIndustry: "", dataType: "", hardwareSoftware: "", publicationImportance: "",
    problemSolving: "", challengingTasks: "", learningMethod: "", comfortAmbiguity: "",
    goalPreference: "", setbacks: "", thinkingStyle: "", workLifeBalance: "",
    otherFields: "", globalIssues: "", hobbies: "", interdisciplinaryProjects: "",
    inspiringCourses: "", emergingTech: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const savedData = Cookies.get("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    // Animate title with anime.js
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
      });
    }

    // Animate form card
    if (formRef.current) {
      anime({
        targets: formRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 800,
        delay: 300,
        easing: 'easeOutQuad',
      });
    }
  }, []);

  useEffect(() => {
    // Animate page transitions
    anime({
      targets: '.form-content',
      translateX: [30, 0],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutCubic',
    });
  }, [currentPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateCurrentPage = () => {
    const requiredFieldsByPage = {
      1: ['key', 'name', 'year', 'university', 'gpa', 'interestAreas', 'specializedCourses'],
      2: ['python', 'java', 'webdev', 'ml', 'proficiency', 'challengingProject'],
      3: ['aiMlInterest', 'aiMlProjects', 'mlAlgorithms', 'deepLearning', 'researchInterest', 'challenges'],
      4: ['postGradRole', 'companiesIndustries', 'furtherStudies', 'careerVision', 'aiMlExcitement'],
      5: ['projectSize', 'teamOrIndividual', 'startupInterest', 'projectFocus', 'projectIndustry', 'dataType'],
      6: ['problemSolving', 'challengingTasks', 'learningMethod', 'comfortAmbiguity', 'goalPreference', 'setbacks', 'thinkingStyle', 'workLifeBalance'],
      7: ['otherFields', 'globalIssues', 'hobbies', 'interdisciplinaryProjects']
    };

    const requiredFields = requiredFieldsByPage[currentPage] || [];
    const missingFields = [];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        missingFields.push(field);
      }
    });

    return { isValid: missingFields.length === 0, missingFields };
  };

  const handleNext = () => {
    const validation = validateCurrentPage();
    
    if (!validation.isValid) {
      toast.error(`Please fill in all required fields before proceeding (${validation.missingFields.length} field(s) missing)`, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    
    setCurrentPage((prev) => Math.min(prev + 1, 7));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    toast.info("Submitting your form...", { autoClose: 2000 });
    
    try {
      const response = await fetch("http://localhost:5000/process-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      Cookies.set("formData", JSON.stringify(formData));
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const result = await response.json();
      toast.success("Form submitted successfully!");
      
      setTimeout(() => {
        navigate("/result", { state: { result } });
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
      navigate("/result", { state: { error } });
    }
  };

  const renderPageContent = () => {
    const commonProps = { formData, handleInputChange, handleTextChange, handleSelectChange, setFormData };
    
    switch (currentPage) {
      case 1:
        return (
          <Box className="form-content">
            <Typography variant="h6" gutterBottom sx={{ color: '#1e3a8a', mb: 3 }}>
              🔑 Gemini API Key
            </Typography>
            <InputField label="API Key:" type="text" id="key" name="key" 
              placeholder="Enter your API key" value={formData.key} 
              onChange={handleInputChange} required={true} />
            
            <Typography variant="h6" gutterBottom sx={{ color: '#1e3a8a', mt: 4, mb: 3 }}>
              👤 Personal Information
            </Typography>
            <InputField label="Full Name:" type="text" id="name" name="name"
              placeholder="Enter your full name" value={formData.name}
              onChange={handleInputChange} required />
            <SelectField label="Current Year of Study:" id="year" name="year"
              options={[
                { value: "1", label: "1st Year" },
                { value: "2", label: "2nd Year" },
                { value: "3", label: "3rd Year" },
                { value: "4", label: "4th Year" },
              ]}
              value={formData.year} onChange={handleSelectChange} required />
            <InputField label="University:" type="text" id="university" name="university"
              placeholder="Enter your university name" value={formData.university}
              onChange={handleInputChange} required />
            <InputField label="Current GPA or Academic Standing:" type="text" id="gpa" name="gpa"
              placeholder="Enter your current GPA or standing" value={formData.gpa}
              onChange={handleInputChange} required />
            <TextAreaField label="Relevant Internships or Work Experiences:" 
              id="internships" name="internships" rows="3" value={formData.internships}
              onChange={handleTextChange} />
            <InputField label="Primary Areas of Interest within Computer Science:" 
              type="text" id="interestAreas" name="interestAreas"
              placeholder="Enter your areas of interest" value={formData.interestAreas}
              required onChange={handleInputChange} />
            <InputField label="Specialized Courses in AI, ML, or Data Science:" 
              type="text" id="specializedCourses" name="specializedCourses"
              placeholder="Enter courses you've taken" value={formData.specializedCourses}
              onChange={handleInputChange} required />
          </Box>
        );
      case 2:
        return (
          <Box className="form-content">
            <Typography variant="h6" gutterBottom sx={{ color: '#1e3a8a', mb: 3 }}>
              💻 Technical Skills
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              <RadioGroup label="Python:" name="python"
                options={[
                  { value: "1", label: "Beginner" },
                  { value: "2", label: "Intermediate" },
                  { value: "3", label: "Advanced" },
                ]}
                value={formData.python} onChange={handleSelectChange} required />
              <RadioGroup label="Java:" name="java"
                options={[
                  { value: "1", label: "Beginner" },
                  { value: "2", label: "Intermediate" },
                  { value: "3", label: "Advanced" },
                ]}
                value={formData.java} onChange={handleSelectChange} required />
              <RadioGroup label="Web Development:" name="webdev"
                options={[
                  { value: "1", label: "Beginner" },
                  { value: "2", label: "Intermediate" },
                  { value: "3", label: "Advanced" },
                ]}
                value={formData.webdev} onChange={handleSelectChange} required />
              <RadioGroup label="Machine Learning:" name="ml"
                options={[
                  { value: "1", label: "Beginner" },
                  { value: "2", label: "Intermediate" },
                  { value: "3", label: "Advanced" },
                ]}
                value={formData.ml} onChange={handleSelectChange} required />
            </Box>
            <InputField label="Rate Your Proficiency (1-5):" type="number" 
              id="proficiency" name="proficiency" placeholder="Rate 1-5"
              value={formData.proficiency} onChange={handleInputChange} required />
            <TextAreaField label="Describe a Challenging Technical Project:" 
              id="challengingProject" name="challengingProject" rows="3"
              placeholder="Describe a challenging project" value={formData.challengingProject}
              onChange={handleTextChange} required />
            <InputField label="Open-Source Contributions:" type="text" 
              id="openSource" name="openSource"
              placeholder="Enter details of open-source contributions"
              value={formData.openSource} onChange={handleInputChange} />
            <InputField label="Familiar Development Methodologies:" type="text" 
              id="methodologies" name="methodologies" placeholder="Enter methodologies"
              value={formData.methodologies} onChange={handleInputChange} />
            <InputField label="Experience with AI/ML Techniques:" type="text" 
              id="aiMlTechniques" name="aiMlTechniques" placeholder="Enter AI/ML techniques"
              value={formData.aiMlTechniques} onChange={handleInputChange} />
            <InputField label="Experience with Big Data Technologies:" type="text" 
              id="bigDataTech" name="bigDataTech" placeholder="Enter big data technologies"
              value={formData.bigDataTech} onChange={handleInputChange} />
            <InputField label="Experience with Software Testing and QA:" type="text" 
              id="testing" name="testing" placeholder="Enter experience with testing and QA"
              value={formData.testing} onChange={handleInputChange} />
          </Box>
        );
      case 3:
        return (
          <Box className="form-content">
            <Typography variant="h6" gutterBottom sx={{ color: '#1e3a8a', mb: 3 }}>
              🤖 AI/ML Specific Questions
            </Typography>
            <ChecklistGroup label="Areas of AI/ML of Interest:" name="aiMlInterest"
              options={[
                { value: "computerVision", label: "Computer Vision" },
                { value: "nlp", label: "Natural Language Processing" },
                { value: "reinforcementLearning", label: "Reinforcement Learning" },
                { value: "generativeAi", label: "Generative AI" },
                { value: "robotics", label: "Robotics" },
                { value: "expertSystems", label: "Expert Systems" },
                { value: "evolutionaryComputation", label: "Evolutionary Computation" },
                { value: "aiEthics", label: "AI Ethics and Fairness" },
                { value: "explainableAi", label: "Explainable AI" },
                { value: "other", label: "Other" },
              ]}
              formData={formData} setFormData={setFormData} value={formData.aiMlInterest} required />
            <TextAreaField label="Significant AI/ML Projects:" id="aiMlProjects" name="aiMlProjects"
              rows="3" value={formData.aiMlProjects} onChange={handleTextChange} required />
            <InputField label="Familiar Machine Learning Algorithms:" type="text" id="mlAlgorithms"
              name="mlAlgorithms" placeholder="Enter familiar algorithms" value={formData.mlAlgorithms}
              onChange={handleInputChange} required />
            <TextAreaField label="Experience with Deep Learning Architectures:" id="deepLearning"
              name="deepLearning" rows="3" value={formData.deepLearning} onChange={handleTextChange} required />
            <RadioGroup label="Interest in Theoretical vs Practical AI/ML Research:" name="researchInterest"
              options={[
                { value: "theoretical", label: "Theoretical Research" },
                { value: "practical", label: "Practical Applications" },
              ]}
              value={formData.researchInterest} onChange={handleSelectChange} required />
            <TextAreaField label="Biggest Challenges in AI/ML:" id="challenges" name="challenges"
              rows="3" value={formData.challenges} onChange={handleTextChange} required />
            <TextAreaField label="AI/ML Competitions Experience:" id="competitions" name="competitions"
              rows="3" value={formData.competitions} onChange={handleTextChange} />
            <InputField label="Specific AI/ML Tools or Platforms of Interest:" type="text"
              id="toolsPlatforms" name="toolsPlatforms" placeholder="Enter tools or platforms"
              value={formData.toolsPlatforms} onChange={handleInputChange} />
          </Box>
        );
      case 4:
        return (
          <Box className="form-content">
            <Typography variant="h6" gutterBottom sx={{ color: '#1e3a8a', mb: 3 }}>
              🎯 Career Aspirations
            </Typography>
            <SelectField label="Post-Graduation Role:" id="postGradRole" name="postGradRole"
              options={[
                { value: "dataScientist", label: "Data Scientist" },
                { value: "mlEngineer", label: "Machine Learning Engineer" },
                { value: "aiResearcher", label: "AI Researcher" },
                { value: "fullStackDeveloper", label: "Full-stack Developer with AI focus" },
                { value: "cloudAiArchitect", label: "Cloud AI Architect" },
                { value: "aiProductManager", label: "AI Product Manager" },
                { value: "other", label: "Other" },
              ]}
              value={formData.postGradRole} onChange={handleSelectChange} required />
            <InputField label="Specific Companies or Industries of Interest:" type="text"
              id="companiesIndustries" name="companiesIndustries" placeholder="Enter companies or industries"
              value={formData.companiesIndustries} onChange={handleInputChange} required />
            <RadioGroup label="Considering Further Studies in AI/ML or Related Field:" name="furtherStudies"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.furtherStudies} onChange={handleSelectChange} required />
            <InputField label="Career Vision in 5 Years:" type="text" id="careerVision" name="careerVision"
              placeholder="Describe your career vision in 5 years" value={formData.careerVision}
              onChange={handleInputChange} required />
            <TextAreaField label="Aspects of AI/ML That Excite You:" id="aiMlExcitement" name="aiMlExcitement"
              rows="3" value={formData.aiMlExcitement} onChange={handleTextChange} required />
          </Box>
        );
      case 5:
        return (
          <Box className="form-content">
            <Typography variant="h6" gutterBottom sx={{ color: '#1e3a8a', mb: 3 }}>
              📋 Project Preferences
            </Typography>
            <InputField label="Preferred Project Size and Scope:" type="text" id="projectSize"
              name="projectSize" placeholder="Enter your preferred project size and scope"
              value={formData.projectSize} onChange={handleInputChange} required />
            <RadioGroup label="Interest in Team-based vs Individual Projects:" name="teamOrIndividual"
              options={[
                { value: "team", label: "Team-based" },
                { value: "individual", label: "Individual" },
              ]}
              value={formData.teamOrIndividual} onChange={handleSelectChange} required />
            <RadioGroup label="Interest in Startup Potential:" name="startupInterest"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.startupInterest} onChange={handleSelectChange} required />
            <RadioGroup label="Project Focus:" name="projectFocus"
              options={[
                { value: "realWorld", label: "Real-world Problem" },
                { value: "theoretical", label: "Theoretical/Research" },
              ]}
              value={formData.projectFocus} onChange={handleSelectChange} required />
            <InputField label="Specific Industries for Project Focus:" type="text" id="projectIndustry"
              name="projectIndustry" placeholder="Enter specific industries" value={formData.projectIndustry}
              onChange={handleInputChange} required />
            <InputField label="Preferred Data Type for Project:" type="text" id="dataType" name="dataType"
              placeholder="Enter preferred data types" value={formData.dataType} onChange={handleInputChange} required />
            <RadioGroup label="Interest in Hardware or Software-based Projects:" name="hardwareSoftware"
              options={[
                { value: "hardware", label: "Hardware Components" },
                { value: "software", label: "Software-based" },
              ]}
              value={formData.hardwareSoftware} onChange={handleSelectChange} />
            <InputField label="Importance of Publication or Patenting:" type="text" id="publicationImportance"
              name="publicationImportance" placeholder="Describe importance of publication or patenting"
              value={formData.publicationImportance} onChange={handleInputChange} />
          </Box>
        );
      case 6:
        return (
          <Box className="form-content">
            <Typography variant="h6" gutterBottom sx={{ color: '#1e3a8a', mb: 3 }}>
              🧠 Psychological Assessment
            </Typography>
            <RadioGroup label="Approach to Problem-Solving:" name="problemSolving"
              options={[
                { value: "detailedPlanning", label: "Plan everything in detail" },
                { value: "adaptable", label: "Dive in and figure out as I go" },
                { value: "balanced", label: "Balance planning and adaptability" },
              ]}
              value={formData.problemSolving} onChange={handleSelectChange} required />
            <RadioGroup label="Preferred Approach to Challenging Tasks:" name="challengingTasks"
              options={[
                { value: "Break it into smaller parts", label: "Break it into smaller parts" },
                { value: "Tackle the most difficult aspect first", label: "Tackle the most difficult aspect first" },
              ]}
              value={formData.challengingTasks} onChange={handleSelectChange} required />
            <RadioGroup label="Preferred Learning Method:" name="learningMethod"
              options={[
                { value: "Hands-on experimentation", label: "Hands-on experimentation" },
                { value: "Study theory first", label: "Study theory first" },
                { value: "Discussion and collaboration", label: "Discussion and collaboration" },
              ]}
              value={formData.learningMethod} onChange={handleSelectChange} required />
            <InputField label="Comfort Level with Ambiguity (1-5):" type="number" id="comfortAmbiguity"
              name="comfortAmbiguity" placeholder="Rate 1-5" value={formData.comfortAmbiguity}
              onChange={handleInputChange} required />
            <RadioGroup label="Preference for Defined Goals vs. Open-ended Exploration:" name="goalPreference"
              options={[
                { value: "defined", label: "Clear, defined goals" },
                { value: "openEnded", label: "Open-ended exploration" },
              ]}
              value={formData.goalPreference} onChange={handleSelectChange} required />
            <TextAreaField label="Handling Setbacks or Failures:" id="setbacks" name="setbacks"
              rows="3" value={formData.setbacks} onChange={handleTextChange} required />
            <RadioGroup label="Big-Picture vs. Detail-Oriented:" name="thinkingStyle"
              options={[
                { value: "bigPicture", label: "Big-picture thinker" },
                { value: "detailOriented", label: "Detail-oriented" },
              ]}
              value={formData.thinkingStyle} onChange={handleSelectChange} required />
            <RadioGroup label="Importance of Work-Life Balance:" name="workLifeBalance"
              options={[
                { value: "important", label: "Important" },
                { value: "notImportant", label: "Not Important" },
              ]}
              value={formData.workLifeBalance} onChange={handleSelectChange} required />
          </Box>
        );
      case 7:
        return (
          <Box className="form-content">
            <Typography variant="h6" gutterBottom sx={{ color: '#1e3a8a', mb: 3 }}>
              🌐 Interdisciplinary Interests
            </Typography>
            <InputField label="Other Academic Fields of Interest:" type="text" id="otherFields"
              name="otherFields" placeholder="Enter other academic fields" value={formData.otherFields}
              onChange={handleInputChange} required />
            <InputField label="Global Issues or Causes You're Passionate About:" type="text"
              id="globalIssues" name="globalIssues" placeholder="Enter global issues or causes"
              value={formData.globalIssues} onChange={handleInputChange} required />
            <InputField label="Hobbies or Skills Outside Computer Science:" type="text" id="hobbies"
              name="hobbies" placeholder="Enter hobbies or skills" value={formData.hobbies}
              onChange={handleInputChange} required />
            <InputField label="Interest in AI/ML Projects with Other Disciplines:" type="text"
              id="interdisciplinaryProjects" name="interdisciplinaryProjects" placeholder="Enter interdisciplinary interests"
              value={formData.interdisciplinaryProjects} onChange={handleInputChange} required />
            <InputField label="Inspiring Non-CS Courses:" type="text" id="inspiringCourses"
              name="inspiringCourses" placeholder="Enter non-CS courses" value={formData.inspiringCourses}
              onChange={handleInputChange} />
            <InputField label="Emerging Technologies Exciting to You:" type="text" id="emergingTech"
              name="emergingTech" placeholder="Enter emerging technologies" value={formData.emergingTech}
              onChange={handleInputChange} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        width: '100%',
        background: 'linear-gradient(135deg, #001f3f 0%, #003366 50%, #001f3f 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientMove 15s ease infinite',
        paddingTop: '20px',
        paddingBottom: '40px',
        position: 'relative',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}>
        <AnimatedBackground />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            ref={titleRef}
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 3, 
              mt: 2,
              color: 'white',
              textShadow: '2px 4px 10px rgba(0,0,0,0.3)',
              fontWeight: 800 
            }}
          >
            🎓 Project Assessment Form
          </Typography>

          <Paper 
            ref={formRef}
            elevation={24} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              maxWidth: '100%',
              overflow: 'hidden',
            }}
          >
              <Stepper activeStep={currentPage - 1} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box component="form" onSubmit={handleSubmit}>
                {renderPageContent()}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: '2px solid #e5e7eb' }}>
                  {currentPage > 1 && (
                    <Button 
                      variant="contained" 
                      onClick={handlePrevious}
                      sx={{ 
                        bgcolor: '#6b7280',
                        '&:hover': { bgcolor: '#4b5563' }
                      }}
                    >
                      ← Previous
                    </Button>
                  )}
                  {currentPage < 7 ? (
                    <Button 
                      variant="contained" 
                      onClick={handleNext}
                      sx={{ marginLeft: currentPage === 1 ? 'auto' : 0 }}
                    >
                      Next →
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{ 
                        marginLeft: 'auto',
                        bgcolor: '#10b981',
                        '&:hover': { bgcolor: '#059669' }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                          Submitting...
                        </>
                      ) : (
                        '✓ Submit Form'
                      )}
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HomeEnhanced;
