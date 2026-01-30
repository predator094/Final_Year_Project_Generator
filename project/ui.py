import gradio as gr
import json
import requests
from dataclasses import dataclass, asdict
from typing import List, Dict


@dataclass
class FormData:
    # Student Profile
    full_name: str = ""
    university: str = ""
    gpa: str = ""
    relevant_coursework: str = ""
    programming_skills: List[str] = None

    # Technical Background
    significant_project: str = ""
    technical_areas: List[str] = None

    # Project Preferences
    ai_ml_domains: List[str] = None
    project_type: str = None
    implementation_preference: str = None
    hardware_requirements: str = None

    # Domain Interest
    target_industry: str = ""
    data_types: str = ""
    problem_description: str = ""


def make_api_call(form_data):
    """
    Make API call to get project recommendations
    """

    try:
        # Replace with your actual API endpoint
        API_URL = "http://localhost:5000/process-form"
        headers = {"Content-Type": "application/json"}

        # Make POST request to API
        response = requests.post(API_URL, json=form_data, headers=headers)
        response.raise_for_status()

        return {
            "success": True,
            "data": response.json(),
            "message": "Successfully retrieved recommendations",
        }
    except requests.exceptions.RequestException as e:
        return {"success": False, "data": None, "message": f"API Error: {str(e)}"}


def create_ui():
    with gr.Blocks() as app:
        # Initialize browser state with default value
        form_state = gr.BrowserState(
            default_value=FormData().__dict__, storage_key="form_state"
        )

        gr.Markdown("# Final Year Project Assessment Form")

        # Student Profile Section
        with gr.Tab("Student Profile"):
            name = gr.Textbox(label="Full Name", value="")
            university = gr.Textbox(label="University", value="")
            gpa = gr.Textbox(label="GPA", value="")
            coursework = gr.TextArea(label="Relevant Coursework in AI/ML", value="")

            programming = gr.CheckboxGroup(
                choices=["Python", "Java", "C++", "JavaScript", "Other"],
                label="Programming Languages",
                value=[],
            )

        # Technical Background Section
        with gr.Tab("Technical Background"):
            project = gr.TextArea(label="Most Significant Technical Project", value="")
            tech_areas = gr.CheckboxGroup(
                choices=[
                    "Web Development",
                    "Machine Learning",
                    "Computer Vision",
                    "NLP",
                    "Cloud Computing",
                    "Database Systems",
                ],
                label="Areas of Experience",
                value=[],
            )

        # Project Preferences Section
        with gr.Tab("Project Preferences"):
            domains = gr.CheckboxGroup(
                choices=[
                    "Computer Vision",
                    "Natural Language Processing",
                    "Reinforcement Learning",
                    "Generative AI",
                    "AI Ethics",
                ],
                label="Preferred AI/ML Domains",
                value=[],
            )

            proj_type = gr.Radio(
                value="Research",
                choices=["Research", "Industry Application", "Product Development"],
                label="Project Type",
            )

            implementation = gr.Radio(
                choices=["Individual", "Team-based"], label="Implementation Preference"
            )

            hardware = gr.Radio(
                choices=["Software-only", "Hardware components needed"],
                label="Hardware Requirements",
            )

        # Domain Interest Section
        with gr.Tab("Domain Interest"):
            industry = gr.Textbox(label="Target Industry/Field", value="")
            data_types = gr.Textbox(label="Preferred Data Types", value="")
            problem = gr.TextArea(label="Real-world Problem to Solve", value="")

        # Results Section
        with gr.Tab("Results"):
            submit_btn = gr.Button("Submit Form", variant="primary")

            # Results display components
            with gr.Column():

                status_message = gr.Markdown(
                    "### Results will appear here after submission",
                )

            #     with gr.Accordion("Recommended Projects", open=False):
            #         projects_json = gr.JSON(label="Project Recommendations")

            #     with gr.Accordion("Technical Match Analysis", open=False):
            #         skills_match = gr.Label(label="Skills Match")
            #         domain_match = gr.Label(label="Domain Match")

            #     with gr.Accordion("Additional Recommendations", open=False):
            #         recommendations = gr.Markdown()

        def save_form_state(form_state, *args):
            # Update form state with current values
            form_data = FormData(
                full_name=args[0],
                university=args[1],
                gpa=args[2],
                relevant_coursework=args[3],
                programming_skills=args[4],
                significant_project=args[5],
                technical_areas=args[6],
                ai_ml_domains=args[7],
                project_type=args[8],
                implementation_preference=args[9],
                hardware_requirements=args[10],
                target_industry=args[11],
                data_types=args[12],
                problem_description=args[13],
            )
            # Store in localStorage using JavaScript
            return form_data.__dict__

        def load_form_state(form_state):
            # Load values from form state
            if not form_state:
                print("No saved state found")
                return [None] * 14  # Return empty values if no state exists

            data = FormData(**form_state)
            return [
                data.full_name,
                data.university,
                data.gpa,
                data.relevant_coursework,
                data.programming_skills or [],
                data.significant_project,
                data.technical_areas or [],
                data.ai_ml_domains or [],
                data.project_type,
                data.implementation_preference,
                data.hardware_requirements,
                data.target_industry,
                data.data_types,
                data.problem_description,
            ]

        def submit_form(form_state):
            # Make API call with form data
            for item in list(form_state.values()):
                if item == "" or item == [] or item == None:
                    return "### ❌ Error: Please fill out all fields"

            api_response = make_api_call(form_state)

            if api_response["success"]:
                # data = api_response["data"]

                # # Update UI components with results
                # status = "### ✅ Successfully retrieved project recommendations"
                # projects = data.get("recommended_projects", [])

                # skills = data.get(
                #     "skills_match",
                #     {"label": "Skills Match", "confidences": [("Strong", 0.85)]},
                # )

                # domain = data.get(
                #     "domain_match",
                #     {"label": "Domain Match", "confidences": [("Good", 0.75)]},
                # )

                # rec_text = "### Additional Recommendations\n\n"
                # for rec in data.get("additional_recommendations", []):
                #     rec_text += f"- {rec}\n"

                # return [status, projects, skills, domain, rec_text]

                return api_response["data"]["data"]
            else:
                return [
                    f"### ❌ Error: {api_response['message']}",
                    None,
                    None,
                    None,
                    "No recommendations available",
                ]

        # Auto-save on any change
        input_components = [
            name,
            university,
            gpa,
            coursework,
            programming,
            project,
            tech_areas,
            domains,
            proj_type,
            implementation,
            hardware,
            industry,
            data_types,
            problem,
        ]

        # Add change event handlers for each input
        for component in input_components:
            component.change(
                fn=save_form_state,
                inputs=[form_state] + input_components,
                outputs=form_state,
            )

        # Submit button handler
        submit_btn.click(
            fn=submit_form,
            inputs=[form_state],
            outputs=[status_message],
        )

        # Load saved state on page load
        app.load(fn=load_form_state, inputs=[form_state], outputs=input_components)

    return app


demo = create_ui()
if __name__ == "__main__":
    app = create_ui()
    app.launch(pwa=True)
