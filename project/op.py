from scripts.gemini_agent import GeminiModel
import os

model_name = "gemini-1.5-flash"

gen_ai_model = GeminiModel(model_name)

prompt = open(os.path.join("prompt", "base_prompt_v1.txt")).read()
