import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";
import RadioGroup from "../components/form/RadioGroup";
import TextAreaField from "../components/form/TextAreaField";
import ChecklistGroup from "../components/form/CheckListGroup";
import ProgressBar from "../components/form/ProgressBar";
import AnimatedBackground from "../components/common/AnimatedBackground";
import ErrorToast from "../components/common/ErrorToast";
import { validateForm } from "../services/formValidation";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css";

const Home = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [formData, setFormData] = useState({
		key: "",
		name: "",
		year: "",
		university: "",
		gpa: "",
		internships: "",
		interestAreas: "",
		specializedCourses: "",
		python: "",
		java: "",
		webdev: "",
		ml: "",
		proficiency: "",
		challengingProject: "",
		openSource: "",
		methodologies: "",
		aiMlTechniques: "",
		bigDataTech: "",
		testing: "",
		aiMlInterest: [],
		aiMlProjects: "",
		mlAlgorithms: "",
		deepLearning: "",
		researchInterest: "",
		challenges: "",
		competitions: "",
		toolsPlatforms: "",
		postGradRole: "",
		companiesIndustries: "",
		furtherStudies: "",
		careerVision: "",
		aiMlExcitement: "",
		projectSize: "",
		teamOrIndividual: "",
		startupInterest: "",
		projectFocus: "",
		projectIndustry: "",
		dataType: "",
		hardwareSoftware: "",
		publicationImportance: "",
		problemSolving: "",
		challengingTasks: "",
		learningMethod: "",
		comfortAmbiguity: "",
		goalPreference: "",
		setbacks: "",
		thinkingStyle: "",
		workLifeBalance: "",
		otherFields: "",
		globalIssues: "",
		hobbies: "",
		interdisciplinaryProjects: "",
		inspiringCourses: "",
		emergingTech: "",
	});
	const formDataKeys = Object.keys(formData);
	const navigate = useNavigate();
	const totalPages = 7;
	const [validationErrors, setValidationErrors] = useState([]);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const formData = Cookies.get("formData");
		if (formData) {
			setFormData(JSON.parse(formData));
		}
	}, []);
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleTextChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSelectChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleNext = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
		window.scrollTo(0, 0);
	};

	const handlePrevious = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
		window.scrollTo(0, 0);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		// Validate form
		const validation = validateForm(formData);
		
		if (!validation.isValid) {
			setValidationErrors(validation.errors);
			setShowErrorModal(true);
			toast.error(`Please fill in ${validation.errors.length} missing field(s)`, {
				position: "top-right",
				autoClose: 3000,
			});
			return;
		}
		
		setIsSubmitting(true);
		toast.info("Submitting your form...", { autoClose: 2000 });
		
		try {
			const response = await fetch("http://localhost:5000/process-form", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			Cookies.set("formData", JSON.stringify(formData));
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			console.log("Success:", result);
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

	const handleNavigateToPage = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	const renderPage = () => {
		const pageVariants = {
			initial: { opacity: 0, x: 50 },
			animate: { opacity: 1, x: 0 },
			exit: { opacity: 0, x: -50 }
		};

		switch (currentPage) {
			case 1:
				return (
					<motion.div 
						className="space-y-4"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-xl font-semibold mb-4 text-left section-title">
							Gemini API key
						</h2>
						<InputField
							label="API Key:"
							type="text"
							id="key"
							name="key"
							placeholder="Enter your API key"
							value={formData.key}
							onChange={handleInputChange}
							required={true}
						/>
						<h2 className="text-xl font-semibold mb-4 text-left">
							Personal Information
						</h2>
						<InputField
							label="Full Name:"
							type="text"
							id="name"
							name="name"
							placeholder="Enter your full name"
							value={formData.name}
							onChange={handleInputChange}
							required
						/>
						<SelectField
							label="Current Year of Study:"
							id="year"
							name="year"
							options={[
								{ value: "1", label: "1st Year" },
								{ value: "2", label: "2nd Year" },
								{ value: "3", label: "3rd Year" },
								{ value: "4", label: "4th Year" },
							]}
							value={formData.year}
							onChange={handleSelectChange}
							required
						/>
						<InputField
							label="University:"
							type="text"
							id="university"
							name="university"
							placeholder="Enter your university name"
							value={formData.university}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Current GPA or Academic Standing:"
							type="text"
							id="gpa"
							name="gpa"
							placeholder="Enter your current GPA or standing"
							value={formData.gpa}
							onChange={handleInputChange}
							required
						/>
						<TextAreaField
							label="Relevant Internships or Work Experiences:"
							id="internships"
							name="internships"
							rows="3"
							value={formData.internships}
							required
							onChange={handleTextChange}
						/>
						<InputField
							label="Primary Areas of Interest within Computer Science:"
							type="text"
							id="interestAreas"
							name="interestAreas"
							placeholder="Enter your areas of interest"
							value={formData.interestAreas}
							required
							onChange={handleInputChange}
						/>
						<InputField
							label="Specialized Courses in AI, ML, or Data Science:"
							type="text"
							id="specializedCourses"
							name="specializedCourses"
							placeholder="Enter courses you've taken"
							value={formData.specializedCourses}
							required
							onChange={handleInputChange}
						/>
					</motion.div>
				);
			case 2:
				return (
					<motion.div 
						className="space-y-4"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-xl font-semibold mb-4 text-left section-title">
							Technical Skills
						</h2>
						<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
							<RadioGroup
								label="Python:"
								name="python"
								options={[
									{ value: "1", label: "Beginner" },
									{ value: "2", label: "Intermediate" },
									{ value: "3", label: "Advanced" },
								]}
								value={formData.python}
								onChange={handleSelectChange}
								required
							/>
							<RadioGroup
								label="Java:"
								name="java"
								options={[
									{ value: "1", label: "Beginner" },
									{ value: "2", label: "Intermediate" },
									{ value: "3", label: "Advanced" },
								]}
								value={formData.java}
								onChange={handleSelectChange}
								required
							/>
							<RadioGroup
								label="Web Development:"
								name="webdev"
								options={[
									{ value: "1", label: "Beginner" },
									{ value: "2", label: "Intermediate" },
									{ value: "3", label: "Advanced" },
								]}
								value={formData.webdev}
								onChange={handleSelectChange}
								required
							/>
							<RadioGroup
								label="Machine Learning:"
								name="ml"
								options={[
									{ value: "1", label: "Beginner" },
									{ value: "2", label: "Intermediate" },
									{ value: "3", label: "Advanced" },
								]}
								value={formData.ml}
								onChange={handleSelectChange}
								required
							/>
						</div>
						<InputField
							label="Rate Your Proficiency (1-5):"
							type="number"
							id="proficiency"
							name="proficiency"
							placeholder="Rate 1-5"
							value={formData.proficiency}
							onChange={handleInputChange}
							required
						/>
						<TextAreaField
							label="Describe a Challenging Technical Project:"
							id="challengingProject"
							name="challengingProject"
							rows="3"
							placeholder="Describe a challenging project"
							value={formData.challengingProject}
							onChange={handleTextChange}
							required
						/>
						<InputField
							label="Open-Source Contributions:"
							type="text"
							id="openSource"
							name="openSource"
							placeholder="Enter details of open-source contributions"
							value={formData.openSource}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Familiar Development Methodologies:"
							type="text"
							id="methodologies"
							name="methodologies"
							placeholder="Enter methodologies"
							value={formData.methodologies}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Experience with AI/ML Techniques:"
							type="text"
							id="aiMlTechniques"
							name="aiMlTechniques"
							placeholder="Enter AI/ML techniques"
							value={formData.aiMlTechniques}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Experience with Big Data Technologies:"
							type="text"
							id="bigDataTech"
							name="bigDataTech"
							placeholder="Enter big data technologies"
							value={formData.bigDataTech}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Experience with Software Testing and QA:"
							type="text"
							id="testing"
							name="testing"
							placeholder="Enter experience with testing and QA"
							value={formData.testing}
							onChange={handleInputChange}
							required
						/>
					</motion.div>
				);
			case 3:
				return (
					<motion.div 
						className="space-y-4"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-xl font-semibold mb-4 text-left section-title">
							AI/ML Specific Questions
						</h2>
						<ChecklistGroup
							label="Areas of AI/ML of Interest:"
							name="aiMlInterest"
							options={[
								{ value: "computerVision", label: "Computer Vision" },
								{ value: "nlp", label: "Natural Language Processing" },
								{
									value: "reinforcementLearning",
									label: "Reinforcement Learning",
								},
								{ value: "generativeAi", label: "Generative AI" },
								{ value: "robotics", label: "Robotics" },
								{ value: "expertSystems", label: "Expert Systems" },
								{
									value: "evolutionaryComputation",
									label: "Evolutionary Computation",
								},
								{ value: "aiEthics", label: "AI Ethics and Fairness" },
								{ value: "explainableAi", label: "Explainable AI" },
								{ value: "other", label: "Other" },
							]}
							formData={formData}
							setFormData={setFormData}
							value={formData.aiMlInterest}
							required
						/>
						<TextAreaField
							label="Significant AI/ML Projects:"
							id="aiMlProjects"
							name="aiMlProjects"
							rows="3"
							value={formData.aiMlProjects}
							onChange={handleTextChange}
							required
						/>
						<InputField
							label="Familiar Machine Learning Algorithms:"
							type="text"
							id="mlAlgorithms"
							name="mlAlgorithms"
							placeholder="Enter familiar algorithms"
							value={formData.mlAlgorithms}
							onChange={handleInputChange}
							required
						/>
						<TextAreaField
							label="Experience with Deep Learning Architectures:"
							id="deepLearning"
							name="deepLearning"
							rows="3"
							value={formData.deepLearning}
							onChange={handleTextChange}
							required
						/>
						<RadioGroup
							label="Interest in Theoretical vs Practical AI/ML Research:"
							name="researchInterest"
							options={[
								{ value: "theoretical", label: "Theoretical Research" },
								{ value: "practical", label: "Practical Applications" },
							]}
							value={formData.researchInterest}
							onChange={handleSelectChange}
							required
						/>
						<TextAreaField
							label="Biggest Challenges in AI/ML:"
							id="challenges"
							name="challenges"
							rows="3"
							value={formData.challenges}
							onChange={handleTextChange}
							required
						/>
						<TextAreaField
							label="AI/ML Competitions Experience:"
							id="competitions"
							name="competitions"
							rows="3"
							value={formData.competitions}
							onChange={handleTextChange}
							required
						/>
						<InputField
							label="Specific AI/ML Tools or Platforms of Interest:"
							type="text"
							id="toolsPlatforms"
							name="toolsPlatforms"
							placeholder="Enter tools or platforms"
							value={formData.toolsPlatforms}
							onChange={handleInputChange}
							required
						/>
					</motion.div>
				);
			case 4:
				return (
					<motion.div 
						className="space-y-4"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-xl font-semibold mb-4 text-left section-title">
							Career Aspirations
						</h2>
						<SelectField
							label="Post-Graduation Role:"
							id="postGradRole"
							name="postGradRole"
							options={[
								{ value: "dataScientist", label: "Data Scientist" },
								{ value: "mlEngineer", label: "Machine Learning Engineer" },
								{ value: "aiResearcher", label: "AI Researcher" },
								{
									value: "fullStackDeveloper",
									label: "Full-stack Developer with AI focus",
								},
								{ value: "cloudAiArchitect", label: "Cloud AI Architect" },
								{ value: "aiProductManager", label: "AI Product Manager" },
								{ value: "other", label: "Other" },
							]}
							value={formData.postGradRole}
							onChange={handleSelectChange}
							required
						/>
						<InputField
							label="Specific Companies or Industries of Interest:"
							type="text"
							id="companiesIndustries"
							name="companiesIndustries"
							placeholder="Enter companies or industries"
							value={formData.companiesIndustries}
							onChange={handleInputChange}
							required
						/>
						<RadioGroup
							label="Considering Further Studies in AI/ML or Related Field:"
							name="furtherStudies"
							options={[
								{ value: "yes", label: "Yes" },
								{ value: "no", label: "No" },
							]}
							value={formData.furtherStudies}
							onChange={handleSelectChange}
							required
						/>
						<InputField
							label="Career Vision in 5 Years:"
							type="text"
							id="careerVision"
							name="careerVision"
							placeholder="Describe your career vision in 5 years"
							value={formData.careerVision}
							onChange={handleInputChange}
							required
						/>
						<TextAreaField
							label="Aspects of AI/ML That Excite You:"
							id="aiMlExcitement"
							name="aiMlExcitement"
							rows="3"
							value={formData.aiMlExcitement}
							onChange={handleTextChange}
							required
						/>
					</motion.div>
				);
			case 5:
				return (
					<motion.div 
						className="space-y-4"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-xl font-semibold mb-4 text-left section-title">
							Project Preferences
						</h2>
						<InputField
							label="Preferred Project Size and Scope:"
							type="text"
							id="projectSize"
							name="projectSize"
							placeholder="Enter your preferred project size and scope"
							value={formData.projectSize}
							onChange={handleInputChange}
							required
						/>
						<RadioGroup
							label="Interest in Team-based vs Individual Projects:"
							name="teamOrIndividual"
							options={[
								{ value: "team", label: "Team-based" },
								{ value: "individual", label: "Individual" },
							]}
							value={formData.teamOrIndividual}
							onChange={handleSelectChange}
							required
						/>
						<RadioGroup
							label="Interest in Startup Potential:"
							name="startupInterest"
							options={[
								{ value: "yes", label: "Yes" },
								{ value: "no", label: "No" },
							]}
							value={formData.startupInterest}
							onChange={handleSelectChange}
							required
						/>
						<RadioGroup
							label="Project Focus:"
							name="projectFocus"
							options={[
								{ value: "realWorld", label: "Real-world Problem" },
								{ value: "theoretical", label: "Theoretical/Research" },
							]}
							value={formData.projectFocus}
							onChange={handleSelectChange}
							required
						/>
						<InputField
							label="Specific Industries for Project Focus:"
							type="text"
							id="projectIndustry"
							name="projectIndustry"
							placeholder="Enter specific industries"
							value={formData.projectIndustry}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Preferred Data Type for Project:"
							type="text"
							id="dataType"
							name="dataType"
							placeholder="Enter preferred data types"
							value={formData.dataType}
							onChange={handleInputChange}
							required
						/>
						<RadioGroup
							label="Interest in Hardware or Software-based Projects:"
							name="hardwareSoftware"
							options={[
								{ value: "hardware", label: "Hardware Components" },
								{ value: "software", label: "Software-based" },
							]}
							value={formData.hardwareSoftware}
							onChange={handleSelectChange}
							required
						/>
						<InputField
							label="Importance of Publication or Patenting:"
							type="text"
							id="publicationImportance"
							name="publicationImportance"
							placeholder="Describe importance of publication or patenting"
							value={formData.publicationImportance}
							onChange={handleInputChange}
							required
						/>
					</motion.div>
				);
			case 6:
				return (
					<motion.div 
						className="space-y-4"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-xl font-semibold mb-4 text-left section-title">
							Psychological Assessment
						</h2>
						<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
							<RadioGroup
								label="Approach to Problem-Solving:"
								name="problemSolving"
								options={[
									{
										value: "detailedPlanning",
										label: "Plan everything in detail",
									},
									{
										value: "adaptable",
										label: "Dive in and figure out as I go",
									},
									{
										value: "balanced",
										label: "Balance planning and adaptability",
									},
								]}
								value={formData.problemSolving}
								onChange={handleSelectChange}
								required
							/>
							<RadioGroup
								label="Preferred Approach to Challenging Tasks:"
								name="challengingTasks"
								options={[
									{
										value: "Break it into smaller parts",
										label: "Break it into smaller parts",
									},
									{
										value: "Tackle the most difficult aspect first",
										label: "Tackle the most difficult aspect first",
									},
									{
										value: "Tackle the most difficult aspect first",
										label: "Tackle the most difficult aspect first",
									},
								]}
								value={formData.challengingTasks}
								onChange={handleSelectChange}
								required
							/>
							<RadioGroup
								label="Preferred Learning Method:"
								name="learningMethod"
								options={[
									{
										value: "Hands-on experimentation",
										label: "Hands-on experimentation",
									},
									{ value: "Study theory first", label: "Study theory first" },
									{
										value: "Discussion and collaboration",
										label: "Discussion and collaboration",
									},
								]}
								value={formData.learningMethod}
								onChange={handleSelectChange}
								required
							/>
						</div>
						<InputField
							label="Comfort Level with Ambiguity (1-5):"
							type="number"
							id="comfortAmbiguity"
							name="comfortAmbiguity"
							placeholder="Rate 1-5"
							value={formData.comfortAmbiguity}
							onChange={handleInputChange}
							required
						/>
						<RadioGroup
							label="Preference for Defined Goals vs. Open-ended Exploration:"
							name="goalPreference"
							options={[
								{ value: "defined", label: "Clear, defined goals" },
								{ value: "openEnded", label: "Open-ended exploration" },
							]}
							value={formData.goalPreference}
							onChange={handleSelectChange}
							required
						/>
						<TextAreaField
							label="Handling Setbacks or Failures:"
							id="setbacks"
							name="setbacks"
							rows="3"
							value={formData.setbacks}
							onChange={handleTextChange}
							required
						/>
						<RadioGroup
							label="Big-Picture vs. Detail-Oriented:"
							name="thinkingStyle"
							options={[
								{ value: "bigPicture", label: "Big-picture thinker" },
								{ value: "detailOriented", label: "Detail-oriented" },
							]}
							value={formData.thinkingStyle}
							onChange={handleSelectChange}
							required
						/>
						<RadioGroup
							label="Importance of Work-Life Balance:"
							name="workLifeBalance"
							options={[
								{ value: "important", label: "Important" },
								{ value: "notImportant", label: "Not Important" },
							]}
							value={formData.workLifeBalance}
							onChange={handleSelectChange}
							required
						/>
					</motion.div>
				);
			case 7:
				return (
					<motion.div 
						className="space-y-4"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-xl font-semibold mb-4 text-left section-title">
							Interdisciplinary Interests
						</h2>
						<InputField
							label="Other Academic Fields of Interest:"
							type="text"
							id="otherFields"
							name="otherFields"
							placeholder="Enter other academic fields"
							value={formData.otherFields}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Global Issues or Causes You’re Passionate About:"
							type="text"
							id="globalIssues"
							name="globalIssues"
							placeholder="Enter global issues or causes"
							value={formData.globalIssues}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Hobbies or Skills Outside Computer Science:"
							type="text"
							id="hobbies"
							name="hobbies"
							placeholder="Enter hobbies or skills"
							value={formData.hobbies}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Interest in AI/ML Projects with Other Disciplines:"
							type="text"
							id="interdisciplinaryProjects"
							name="interdisciplinaryProjects"
							placeholder="Enter interdisciplinary interests"
							value={formData.interdisciplinaryProjects}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Inspiring Non-CS Courses:"
							type="text"
							id="inspiringCourses"
							name="inspiringCourses"
							placeholder="Enter non-CS courses"
							value={formData.inspiringCourses}
							onChange={handleInputChange}
							required
						/>
						<InputField
							label="Emerging Technologies Exciting to You:"
							type="text"
							id="emergingTech"
							name="emergingTech"
							placeholder="Enter emerging technologies"
							value={formData.emergingTech}
							onChange={handleInputChange}
							required
						/>
					</motion.div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="home-container">
			<AnimatedBackground />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<ErrorToast
				errors={validationErrors}
				onClose={() => setShowErrorModal(false)}
				onNavigateToPage={handleNavigateToPage}
			/>
			<div className="home-content">
				<motion.h1 
					className="page-title"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
				>
					🎓 Project Assessment Form
				</motion.h1>
				<motion.form 
					className="form-card"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<ProgressBar currentPage={currentPage} totalPages={totalPages} />
					{renderPage()}

					<div className="navigation-buttons">
						{currentPage > 1 && (
							<motion.button
								type="button"
								onClick={handlePrevious}
								className="btn btn-previous"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<span>← Previous</span>
							</motion.button>
						)}
						{currentPage < 7 ? (
							<motion.button
								type="button"
								onClick={handleNext}
								className="btn btn-next"
								style={{ marginLeft: currentPage === 1 ? 'auto' : '0' }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<span>Next →</span>
							</motion.button>
						) : (
							<motion.button
								type="submit"
								onClick={handleSubmit}
								disabled={isSubmitting}
								className={`btn btn-submit ${isSubmitting ? 'submitting' : ''}`}
								style={{ marginLeft: 'auto' }}
								whileHover={!isSubmitting ? { scale: 1.05 } : {}}
								whileTap={!isSubmitting ? { scale: 0.95 } : {}}
							>
								{isSubmitting ? (
									<span>
										<span className="spinner"></span>
										Submitting...
									</span>
								) : (
									<span>✓ Submit Form</span>
								)}
							</motion.button>
						)}
					</div>
				</motion.form>
			</div>
		</div>
	);
};

export default Home;
