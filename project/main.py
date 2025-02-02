from fastapi import FastAPI, Form
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Optional, List
from ui import demo
import gradio as gr
from op import *

app = FastAPI()


from typing import List


# Define request model
class FormData(BaseModel):
    # Student Profile
    full_name: str = ""
    university: str = ""
    gpa: str = ""
    relevant_coursework: str = ""
    programming_skills: Optional[List[str]] = []

    # Technical Background
    significant_project: str = ""
    technical_areas: Optional[List[str]] = []

    # Project Preferences
    ai_ml_domains: Optional[List[str]] = []
    project_type: Optional[str] = None
    implementation_preference: Optional[str] = None
    hardware_requirements: Optional[str] = None

    # Domain Interest
    target_industry: str = ""
    data_types: str = ""
    problem_description: str = ""


port = 5000


@app.get("/")
async def read_root():
    return {"message": "Welcome to the AI Project Recommendation API!"}


@app.post("/process-form")
async def process_form(data: FormData):
    print("Received data:", data)
    try:

        # Process the data (e.g., save to database, perform analysis)
        # For simplicity, we'll just return the received data
        print("Generating content...")
        output = gen_ai_model.generate_content(
            prompt.format(
                **{
                    "full_name": data.full_name,
                    "university": data.university,
                    "gpa": data.gpa,
                    "relevant_coursework": data.relevant_coursework,
                    "programming_skills": data.programming_skills,
                    "significant_project": data.significant_project,
                    "technical_areas": data.technical_areas,
                    "ai_ml_domains": data.ai_ml_domains,
                    "project_type": data.project_type,
                    "implementation_preference": data.implementation_preference,
                    "hardware_requirements": data.hardware_requirements,
                    "target_industry": data.target_industry,
                    "data_types": data.data_types,
                    "problem_description": data.problem_description,
                }
            )
        )
        return {"success": True, "data": output.text}
    except Exception as e:
        print("Error:", str(e))
        return {"error": str(e)}


app = gr.mount_gradio_app(app, demo, path="/gradio")


if __name__ == "__main__":
    uvicorn.run(app, port=port)
