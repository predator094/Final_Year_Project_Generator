import google.generativeai as genai
import os


class GeminiModel:
    def __init__(self, model_name, api_key=os.getenv("GOOGLE_API_KEY")):
        # Configure the API with the provided key

        genai.configure(api_key=api_key)

        # Default configuration settings; can be customized further if needed
        generation_config = {
            "temperature": 0,
            "top_p": 1,
            "top_k": 1,
            "max_output_tokens": 30720,
        }

        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_ONLY_HIGH"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_ONLY_HIGH"},
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_ONLY_HIGH",
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_ONLY_HIGH",
            },
        ]

        # Set up the model with the provided model name
        self.model = genai.GenerativeModel(
            model_name=model_name,
            generation_config=generation_config,
            safety_settings=safety_settings,
        )

    def generate_content(self, prompts):
        """
        Generate content using the Gemini model.

        :param prompts: A list of prompts or a single prompt string to generate content from.
        :param stream: Boolean indicating whether to stream responses incrementally.
        :return: A generator for streamed output or a complete response string.
        """
        if not isinstance(prompts, list):
            prompts = [prompts]

        response = self.model.generate_content(prompts, stream=False)

        # Return the complete response directly
        return response

    def generate_content_with_stream(self, prompt):
        """
        Generate content using the Gemini model.

        :param prompts: A list of prompts or a single prompt string to generate content from.
        :param stream: Boolean indicating whether to stream responses incrementally.
        :return: A generator for streamed output or a complete response string.
        """
        if not isinstance(prompt, list):
            prompt = [prompt]

        response = self.model.generate_content(prompt, stream=True)
        return response


# Example usage:
if __name__ == "__main__":

    model_name = "gemini-1.5-flash"

    gen_ai_model = GeminiModel(model_name, "AIzaSyBXN8hQbOA-_FawhsrpEIro3EF6Q6Bzu1U")
    prompts = "dank joke "

    print("\n--- Non-streaming output ---")
    response_text = gen_ai_model.generate_content(prompts)
    print(response_text.text)

    # print("\n--- Streaming output ---")
    # for streamed_response in gen_ai_model.generate_content_with_stream(prompts):
    #     print(streamed_response)
