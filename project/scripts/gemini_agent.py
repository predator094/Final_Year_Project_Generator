from litellm import completion, acompletion
import os
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv
load_dotenv()


class UnifiedLLMModel:
    """
    Unified LLM Model class using LiteLLM to support multiple LLM providers.
    
    Supports: OpenAI, Anthropic, Google (Gemini), Azure, Cohere, Hugging Face, and more.
    
    Example model names:
    - OpenAI: "gpt-4", "gpt-3.5-turbo"
    - Anthropic: "claude-3-opus-20240229", "claude-3-sonnet-20240229"
    - Google: "gemini/gemini-1.5-flash", "gemini/gemini-1.5-pro"
    - Azure: "azure/<deployment_name>"
    """
    
    def __init__(
        self,
        model_name: str = "gemini/gemini-2.0-flash",
        api_key: Optional[str] = os.getenv("GOOGLE_API_KEY"),
        temperature: float = 0.0,
        max_tokens: int = 30720,
        top_p: float = 1.0,
        **kwargs
    ):
        """
        Initialize the Unified LLM Model.
        
        :param model_name: Name of the model to use (with provider prefix if needed)
        :param api_key: API key for the provider (falls back to environment variables)
        :param temperature: Temperature for generation (0-1)
        :param max_tokens: Maximum tokens to generate
        :param top_p: Top-p sampling parameter
        :param kwargs: Additional parameters to pass to the model
        """
        self.model_name = model_name
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.top_p = top_p
        self.additional_params = kwargs
        
        # Set API key if provided
        if api_key:
            # Determine provider from model name and set appropriate env var
            if "gemini" in model_name.lower():
                os.environ["GOOGLE_API_KEY"] = api_key
            elif "gpt" in model_name.lower() or "openai" in model_name.lower():
                os.environ["OPENAI_API_KEY"] = api_key
            elif "claude" in model_name.lower():
                os.environ["ANTHROPIC_API_KEY"] = api_key
            elif "azure" in model_name.lower():
                os.environ["AZURE_API_KEY"] = api_key
        
        self.api_key = api_key
    
    def _prepare_messages(self, prompts) -> List[Dict[str, str]]:
        """
        Convert prompts to messages format expected by LiteLLM.
        
        :param prompts: A string, list of strings, or list of message dicts
        :return: List of message dictionaries
        """
        if isinstance(prompts, str):
            return [{"role": "user", "content": prompts}]
        elif isinstance(prompts, list):
            if len(prompts) > 0 and isinstance(prompts[0], dict):
                # Already in message format
                return prompts
            else:
                # List of strings - join them
                return [{"role": "user", "content": " ".join(prompts)}]
        else:
            raise ValueError("prompts must be a string or list")
    
    def generate_content(self, prompts):
        """
        Generate content using the configured LLM.
        
        :param prompts: A string, list of strings, or list of message dicts
        :return: Response object with .text attribute for compatibility
        """
        messages = self._prepare_messages(prompts)
        
        try:
            response = completion(
                model=self.model_name,
                messages=messages,
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                top_p=self.top_p,
                **self.additional_params
            )
            
            # Create a response object with .text attribute for backward compatibility
            class Response:
                def __init__(self, content):
                    self.text = content
                    self.content = content
            
            return Response(response.choices[0].message.content)
        
        except Exception as e:
            raise Exception(f"Error generating content with {self.model_name}: {str(e)}")
    
    def generate_content_with_stream(self, prompt):
        """
        Generate content with streaming using the configured LLM.
        
        :param prompt: A string, list of strings, or list of message dicts
        :return: Generator yielding response chunks
        """
        messages = self._prepare_messages(prompt)
        
        try:
            response = completion(
                model=self.model_name,
                messages=messages,
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                top_p=self.top_p,
                stream=True,
                **self.additional_params
            )
            
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content
        
        except Exception as e:
            raise Exception(f"Error streaming content with {self.model_name}: {str(e)}")
    
    async def agenerate_content(self, prompts):
        """
        Async version of generate_content.
        
        :param prompts: A string, list of strings, or list of message dicts
        :return: Response object with .text attribute
        """
        messages = self._prepare_messages(prompts)
        
        try:
            response = await acompletion(
                model=self.model_name,
                messages=messages,
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                top_p=self.top_p,
                **self.additional_params
            )
            
            class Response:
                def __init__(self, content):
                    self.text = content
                    self.content = content
            
            return Response(response.choices[0].message.content)
        
        except Exception as e:
            raise Exception(f"Error generating content with {self.model_name}: {str(e)}")


# Alias for backward compatibility
GeminiModel = UnifiedLLMModel


# Example usage:
if __name__ == "__main__":
    # Example 1: Using Gemini (default)
    print("\n=== Example 1: Gemini ===")
    model_gemini = UnifiedLLMModel(
        model_name="gemini/gemini-1.5-flash",
        api_key=os.getenv("GOOGLE_API_KEY")
    )
    prompts = "Tell me a short joke about programming"
    response = model_gemini.generate_content(prompts)
    print(response.text)
    
    # Example 2: Using OpenAI GPT (uncomment if you have API key)
    # print("\n=== Example 2: OpenAI GPT ===")
    # model_gpt = UnifiedLLMModel(
    #     model_name="gpt-3.5-turbo",
    #     api_key=os.getenv("OPENAI_API_KEY")
    # )
    # response = model_gpt.generate_content("What is 2+2?")
    # print(response.text)
    
    # Example 3: Using Claude (uncomment if you have API key)
    # print("\n=== Example 3: Claude ===")
    # model_claude = UnifiedLLMModel(
    #     model_name="claude-3-sonnet-20240229",
    #     api_key=os.getenv("ANTHROPIC_API_KEY")
    # )
    # response = model_claude.generate_content("Hello Claude!")
    # print(response.text)
    
    # Example 4: Streaming output
    # print("\n=== Example 4: Streaming ===")
    # for chunk in model_gemini.generate_content_with_stream("Count from 1 to 5"):
    #     print(chunk, end="", flush=True)
    # print()

