# API Changes Documentation

## ⚠️ IMPORTANT CHANGES

The API now requires users to provide their own API keys in the request payload. **No environment variables are needed** for production deployment.

## 🔑 New Request Format

### Required Fields Added

```json
{
  "api_key": "your-actual-api-key-here",
  "model_name": "gemini/gemini-2.0-flash",
  // ... rest of the form fields
}
```

## 📝 Full Request Example

### Using cURL

```bash
curl -X POST http://localhost:8000/process-form \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "model_name": "gemini/gemini-2.0-flash",
    "full_name": "John Doe",
    "university": "MIT",
    "gpa": "3.8",
    "relevant_coursework": "Machine Learning, Deep Learning",
    "programming_skills": ["Python", "TensorFlow"],
    "significant_project": "Built a sentiment analysis model",
    "technical_areas": ["Machine Learning"],
    "ai_ml_domains": ["NLP"],
    "project_type": "Research",
    "implementation_preference": "Cloud-based",
    "hardware_requirements": "GPU Required",
    "target_industry": "Healthcare",
    "data_types": "Text",
    "problem_description": "AI system for medical reports"
  }'
```

### Using PowerShell

```powershell
$body = @{
    api_key = "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    model_name = "gemini/gemini-2.0-flash"
    full_name = "John Doe"
    university = "MIT"
    gpa = "3.8"
    relevant_coursework = "Machine Learning, Deep Learning"
    programming_skills = @("Python", "TensorFlow")
    significant_project = "Built a sentiment analysis model"
    technical_areas = @("Machine Learning")
    ai_ml_domains = @("NLP")
    project_type = "Research"
    implementation_preference = "Cloud-based"
    hardware_requirements = "GPU Required"
    target_industry = "Healthcare"
    data_types = "Text"
    problem_description = "AI system for medical reports"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:8000/process-form -Method POST -Body $body -ContentType "application/json"
```

## 🎯 Supported Models

Users can specify any LiteLLM-supported model:

### Google Gemini
```json
{
  "model_name": "gemini/gemini-2.0-flash",
  "api_key": "AIzaSy..."
}
```
```json
{
  "model_name": "gemini/gemini-1.5-pro",
  "api_key": "AIzaSy..."
}
```

### OpenAI GPT
```json
{
  "model_name": "gpt-4",
  "api_key": "sk-..."
}
```
```json
{
  "model_name": "gpt-3.5-turbo",
  "api_key": "sk-..."
}
```

### Anthropic Claude
```json
{
  "model_name": "claude-3-opus-20240229",
  "api_key": "sk-ant-..."
}
```
```json
{
  "model_name": "claude-3-sonnet-20240229",
  "api_key": "sk-ant-..."
}
```

### Azure OpenAI
```json
{
  "model_name": "azure/your-deployment-name",
  "api_key": "your-azure-key"
}
```

## 📋 Request Schema

```typescript
interface FormData {
  // Required: LLM Configuration
  api_key: string;              // User's API key
  model_name?: string;          // Default: "gemini/gemini-2.0-flash"
  
  // Student Profile
  full_name?: string;
  university?: string;
  gpa?: string;
  relevant_coursework?: string;
  programming_skills?: string[];
  
  // Technical Background
  significant_project?: string;
  technical_areas?: string[];
  
  // Project Preferences
  ai_ml_domains?: string[];
  project_type?: string;
  implementation_preference?: string;
  hardware_requirements?: string;
  
  // Domain Interest
  target_industry?: string;
  data_types?: string;
  problem_description?: string;
}
```

## ✅ Response Format

### Success Response
```json
{
  "success": true,
  "data": "Generated project suggestion text..."
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🔒 Security Notes

1. **API keys are NOT logged** - The backend excludes API keys from logs
2. **API keys are NOT stored** - Each request creates a new model instance
3. **HTTPS recommended** - Always use HTTPS in production to protect API keys in transit
4. **Rate limiting recommended** - Implement rate limiting to prevent abuse

## 🚀 Testing

### Using the Test Script

```bash
# Set your API key for testing
export GOOGLE_API_KEY="your-api-key-here"

# Run tests
python test_form_ui.py
```

The test script will:
1. Check for API key in environment
2. Include it in all test requests
3. Support different models via interactive mode

### Interactive Testing

```bash
python test_form_ui.py
# Select option 2 for interactive mode
# Enter your API key when prompted
# Choose your model (or use default)
```

## 🐳 Docker Deployment

### No Environment Variables Needed!

```bash
# Build and run - no .env file required
docker-compose -f docker-compose.unified.yml up --build
```

The container runs without any API key configuration. Users provide keys in their requests.

## 📊 Migration Guide

### Old API Call (Environment-based)
```javascript
// Server had API key in environment
fetch('/process-form', {
  method: 'POST',
  body: JSON.stringify({
    full_name: "John Doe",
    university: "MIT",
    // ... other fields
  })
})
```

### New API Call (User-provided)
```javascript
// User provides API key
fetch('/process-form', {
  method: 'POST',
  body: JSON.stringify({
    api_key: userApiKey,              // NEW: Required
    model_name: "gemini/gemini-2.0-flash",  // NEW: Optional
    full_name: "John Doe",
    university: "MIT",
    // ... other fields
  })
})
```

## ⚡ Benefits of This Approach

1. ✅ **No server-side API keys needed** - More secure
2. ✅ **Users control their own costs** - Each user uses their quota
3. ✅ **Multi-provider support** - Users can choose any LLM
4. ✅ **Easier deployment** - No environment configuration
5. ✅ **Scalable** - No shared rate limits

## 🔧 Frontend Integration Example

```javascript
// React component example
const handleSubmit = async (formData) => {
  const response = await fetch('http://localhost:8000/process-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: userApiKey,  // From user input/settings
      model_name: selectedModel,  // From dropdown
      ...formData  // All other form fields
    })
  });
  
  const result = await response.json();
  if (result.success) {
    console.log(result.data);
  } else {
    console.error(result.error);
  }
};
```

## 🛠️ Troubleshooting

### "API key is required" error
- Ensure `api_key` field is included in request
- Verify the key is not empty

### "Error generating content" error
- Check if the API key is valid
- Verify the model name is correct
- Ensure you have credits/quota with the provider

### Model not found
- Use correct model name format:
  - Gemini: `"gemini/gemini-2.0-flash"`
  - OpenAI: `"gpt-4"`
  - Claude: `"claude-3-sonnet-20240229"`
