from fastapi import FastAPI, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Optional, List
from pathlib import Path
import os
# from ui import demo
# import gradio as gr

# Load prompt template
script_dir = os.path.dirname(os.path.abspath(__file__))
prompt_path = os.path.join(script_dir, "prompt", "base_prompt_v1.txt")
prompt = open(prompt_path).read()

# Disable API docs in production (set to False to hide /docs and /redoc)
SHOW_API_DOCS = os.getenv("SHOW_API_DOCS", "false").lower() == "true"

app = FastAPI(
    title="Final Year Project Generator",
    docs_url="/docs" if SHOW_API_DOCS else None,
    redoc_url="/redoc" if SHOW_API_DOCS else None,
    openapi_url="/openapi.json" if SHOW_API_DOCS else None
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from typing import List


# Define request model
class FormData(BaseModel):
    # LLM Configuration (Required)
    api_key: str  # User's API key for LLM provider
    model_name: str = "gemini/gemini-2.0-flash"  # Model to use
    
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

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Final Year Project Generator"}

# API Routes
@app.post("/process-form")
async def process_form(data: FormData):
    print("Received data:", data.dict(exclude={'api_key'}))  # Don't log API key
    try:
        # Import here to avoid circular imports
        from scripts.gemini_agent import UnifiedLLMModel
        
        # Validate API key is provided
        if not data.api_key or data.api_key.strip() == "":
            return {"success": False, "error": "API key is required"}
        
        # Create LLM model instance with user's API key
        print(f"Initializing {data.model_name} with provided API key...")
        user_model = UnifiedLLMModel(
            model_name=data.model_name,
            api_key=data.api_key
        )
        
        # Generate content using user's model
        print("Generating content...")
        output = user_model.generate_content(
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
        return {"success": False, "error": str(e)}
    

# Mount static files (React build) if they exist
static_dir = Path(__file__).parent / "static"
if static_dir.exists():
    print(f"✓ Serving React frontend from: {static_dir}")
    
    # Serve static files (JS, CSS, images, etc.)
    app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")
    
    # Serve index.html for all other routes (SPA support)
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Don't serve frontend for API routes
        if full_path.startswith("docs") or full_path.startswith("openapi.json") or full_path.startswith("redoc"):
            return {"error": "Not found"}
        
        # If path is to a file with extension, try to serve it
        file_path = static_dir / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        
        # Otherwise serve index.html for SPA routing
        index_path = static_dir / "index.html"
        if index_path.exists():
            return FileResponse(index_path)
        return {"error": "Frontend not found"}
else:
    print("⚠️  Static directory not found. Running in API-only mode.")
    print(f"   Expected location: {static_dir}")
    
    @app.get("/")
    async def root():
        return {
            "message": "Final Year Project Generator API",
            "status": "running",
            "docs": "/docs",
            "note": "Frontend static files not found. Running in API-only mode."
        }

# Gradio UI (optional - uncomment if needed)
# app = gr.mount_gradio_app(
#     app,
#     demo,
#     path="/gradio",
# )


if __name__ == "__main__":
    uvicorn.run(app, port=port)
