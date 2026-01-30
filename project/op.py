from scripts.gemini_agent import UnifiedLLMModel
import os

# You can now use any supported LLM provider:
# - Gemini: "gemini/gemini-1.5-flash", "gemini/gemini-1.5-pro"
# - OpenAI: "gpt-4", "gpt-3.5-turbo", "gpt-4-turbo"
# - Claude: "claude-3-opus-20240229", "claude-3-sonnet-20240229"
# - Azure: "azure/<deployment_name>"
model_name = "gemini/gemini-2.0-flash"

gen_ai_model = UnifiedLLMModel(model_name)

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
prompt_path = os.path.join(script_dir, "prompt", "base_prompt_v1.txt")
prompt = open(prompt_path).read()
