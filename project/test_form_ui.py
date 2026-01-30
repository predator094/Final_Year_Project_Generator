"""
Automated UI Test Script for Final Year Project Generator
Fills the form with random values and tests the API endpoint
"""

import requests
import random
import time
import os
from faker import Faker
from typing import List, Dict, Any

# Initialize Faker for generating realistic data
fake = Faker()

# API Configuration
API_URL = "http://localhost:8000/process-form"

# Default API Key and Model (for testing - user should provide their own)
DEFAULT_API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyB_hsDorSXw8UBmP5heq1QV5pMt18e8k7E")  # Get from env or empty
DEFAULT_MODEL = "gemini/gemini-2.0-flash"

# Test Data Options
UNIVERSITIES = [
    "MIT", "Stanford", "Harvard", "Berkeley", "CMU", "Oxford", "Cambridge",
    "ETH Zurich", "Imperial College", "NUS", "IIT Delhi", "Georgia Tech"
]

PROGRAMMING_SKILLS = [
    "Python", "TensorFlow", "PyTorch", "Java", "C++", "JavaScript", "R",
    "SQL", "Scikit-learn", "Keras", "OpenCV", "NumPy", "Pandas", "Docker",
    "AWS", "Azure", "React", "Node.js", "MongoDB", "PostgreSQL"
]

TECHNICAL_AREAS = [
    "Machine Learning", "Deep Learning", "Natural Language Processing",
    "Computer Vision", "Reinforcement Learning", "Data Science",
    "Cloud Computing", "DevOps", "Web Development", "Mobile Development",
    "Cybersecurity", "Blockchain", "IoT", "Edge Computing"
]

AI_ML_DOMAINS = [
    "NLP", "Computer Vision", "Recommender Systems", "Time Series Analysis",
    "Generative AI", "Speech Recognition", "Robotics", "Anomaly Detection",
    "Predictive Analytics", "Neural Architecture Search"
]

PROJECT_TYPES = [
    "Research", "Application Development", "Data Analysis",
    "System Design", "Product Development", "Proof of Concept"
]

IMPLEMENTATION_PREFERENCES = [
    "Cloud-based", "On-premise", "Hybrid", "Edge Computing",
    "Serverless", "Containerized"
]

HARDWARE_REQUIREMENTS = [
    "GPU Required", "CPU Only", "TPU Preferred", "High Memory",
    "Standard Hardware", "Distributed Computing"
]

TARGET_INDUSTRIES = [
    "Healthcare", "Finance", "E-commerce", "Education", "Agriculture",
    "Manufacturing", "Transportation", "Entertainment", "Social Media",
    "Gaming", "Energy", "Real Estate", "Telecommunications"
]

DATA_TYPES = [
    "Text", "Images", "Video", "Audio", "Tabular Data",
    "Time Series", "Graph Data", "Sensor Data", "Mixed Media"
]


def generate_random_form_data() -> Dict[str, Any]:
    """Generate random form data for testing"""
    
    gpa = round(random.uniform(2.5, 4.0), 2)
    
    # Generate relevant coursework
    courses = [
        "Machine Learning", "Deep Learning", "Data Structures", "Algorithms",
        "Artificial Intelligence", "Computer Vision", "NLP", "Statistics",
        "Linear Algebra", "Probability Theory", "Database Systems",
        "Software Engineering", "Cloud Computing", "Big Data"
    ]
    
    selected_courses = random.sample(courses, random.randint(3, 6))
    
    # Generate project description
    problem_templates = [
        f"Developing an AI system to predict {fake.bs()} in {random.choice(TARGET_INDUSTRIES).lower()}",
        f"Building a {fake.catch_phrase()} platform using {random.choice(AI_ML_DOMAINS)}",
        f"Creating an automated system for {fake.bs()} with machine learning",
        f"Implementing a {random.choice(AI_ML_DOMAINS)} solution for {fake.company()}",
        f"Designing a predictive model to optimize {fake.bs()}",
    ]
    
    form_data = {
        # LLM Configuration
        "api_key": DEFAULT_API_KEY,
        "model_name": DEFAULT_MODEL,
        
        # Student Profile
        "full_name": fake.name(),
        "university": random.choice(UNIVERSITIES),
        "gpa": str(gpa),
        "relevant_coursework": ", ".join(selected_courses),
        "programming_skills": random.sample(PROGRAMMING_SKILLS, random.randint(3, 8)),
        "significant_project": f"Built a {fake.catch_phrase()} using {random.choice(PROGRAMMING_SKILLS[:5])}",
        "technical_areas": random.sample(TECHNICAL_AREAS, random.randint(2, 5)),
        "ai_ml_domains": random.sample(AI_ML_DOMAINS, random.randint(1, 4)),
        "project_type": random.choice(PROJECT_TYPES),
        "implementation_preference": random.choice(IMPLEMENTATION_PREFERENCES),
        "hardware_requirements": random.choice(HARDWARE_REQUIREMENTS),
        "target_industry": random.choice(TARGET_INDUSTRIES),
        "data_types": ", ".join(random.sample(DATA_TYPES, random.randint(1, 3))),
        "problem_description": random.choice(problem_templates)
    }
    
    return form_data


def test_form_submission(test_number: int, data: Dict[str, Any]) -> bool:
    """Submit form data to API and check response"""
    
    print(f"\n{'='*80}")
    print(f"Test #{test_number}")
    print(f"{'='*80}")
    print(f"Student: {data['full_name']}")
    print(f"University: {data['university']} (GPA: {data['gpa']})")
    print(f"Programming Skills: {', '.join(data['programming_skills'][:3])}...")
    print(f"AI/ML Domains: {', '.join(data['ai_ml_domains'])}")
    print(f"Project Type: {data['project_type']}")
    print(f"\nSubmitting request to {API_URL}...")
    
    try:
        start_time = time.time()
        response = requests.post(
            API_URL,
            json=data,
            headers={"Content-Type": "application/json"},
            timeout=120  # 2 minute timeout for LLM response
        )
        end_time = time.time()
        
        response_time = end_time - start_time
        
        print(f"\n✓ Status Code: {response.status_code}")
        print(f"✓ Response Time: {response_time:.2f} seconds")
        
        if response.status_code == 200:
            result = response.json()
            
            if "success" in result and result["success"]:
                print(f"\n✓ SUCCESS! Generated response:")
                print(f"{'='*80}")
                # Print first 500 characters of the response
                response_text = result.get("data", "No data")
                print(response_text[:500] + "..." if len(response_text) > 500 else response_text)
                print(f"{'='*80}")
                return True
            else:
                print(f"\n✗ ERROR: {result.get('error', 'Unknown error')}")
                return False
        else:
            print(f"\n✗ HTTP Error: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("\n✗ CONNECTION ERROR: Cannot connect to the server.")
        print("Make sure the server is running on http://localhost:8000")
        return False
    except requests.exceptions.Timeout:
        print(f"\n✗ TIMEOUT: Request took longer than 120 seconds")
        return False
    except Exception as e:
        print(f"\n✗ EXCEPTION: {type(e).__name__}: {str(e)}")
        return False


def run_tests(num_tests: int = 5, delay: int = 2):
    """Run multiple test submissions"""
    
    print("\n" + "="*80)
    print("FINAL YEAR PROJECT GENERATOR - AUTOMATED UI TEST")
    print("="*80)
    print(f"\nRunning {num_tests} automated tests...")
    print(f"Delay between tests: {delay} seconds")
    
    results = []
    
    for i in range(1, num_tests + 1):
        # Generate random form data
        test_data = generate_random_form_data()
        
        # Submit and test
        success = test_form_submission(i, test_data)
        results.append(success)
        
        # Delay between tests (except for the last one)
        if i < num_tests:
            print(f"\nWaiting {delay} seconds before next test...", end="")
            time.sleep(delay)
            print(" ✓")
    
    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"Total Tests: {num_tests}")
    print(f"Passed: {sum(results)} ✓")
    print(f"Failed: {num_tests - sum(results)} ✗")
    print(f"Success Rate: {(sum(results)/num_tests)*100:.1f}%")
    print("="*80 + "\n")


def interactive_test():
    """Run a single interactive test with custom or random data"""
    
    print("\n" + "="*80)
    print("INTERACTIVE TEST MODE")
    print("="*80)
    
    use_random = input("\nUse random data? (y/n): ").strip().lower()
    
    if use_random == 'y':
        data = generate_random_form_data()
        print("\n✓ Random data generated!")
    else:
        print("\nPlease enter form details (press Enter for random):")
        data = {
            "full_name": input("Full Name: ") or fake.name(),
            "university": input("University: ") or random.choice(UNIVERSITIES),
            "gpa": input("GPA: ") or str(round(random.uniform(3.0, 4.0), 2)),
            "relevant_coursework": input("Relevant Coursework: ") or "Machine Learning, Deep Learning",
            "programming_skills": input("Programming Skills (comma-separated): ").split(",") or random.sample(PROGRAMMING_SKILLS, 5),
            "significant_project": input("Significant Project: ") or "Built a machine learning model",
            "technical_areas": input("Technical Areas (comma-separated): ").split(",") or random.sample(TECHNICAL_AREAS, 3),
            "ai_ml_domains": input("AI/ML Domains (comma-separated): ").split(",") or random.sample(AI_ML_DOMAINS, 2),
            "project_type": input("Project Type: ") or random.choice(PROJECT_TYPES),
            "implementation_preference": input("Implementation Preference: ") or random.choice(IMPLEMENTATION_PREFERENCES),
            "hardware_requirements": input("Hardware Requirements: ") or random.choice(HARDWARE_REQUIREMENTS),
            "target_industry": input("Target Industry: ") or random.choice(TARGET_INDUSTRIES),
            "data_types": input("Data Types: ") or random.choice(DATA_TYPES),
            "problem_description": input("Problem Description: ") or "Testing the AI system"
        }
    
    test_form_submission(1, data)


if __name__ == "__main__":
    import sys
    
    print("\n" + "="*80)
    print("FINAL YEAR PROJECT GENERATOR - TEST SUITE")
    print("="*80)
    print("\nOptions:")
    print("1. Run automated batch tests (default: 5 tests)")
    print("2. Run interactive single test")
    print("3. Quick test (1 submission)")
    
    choice = input("\nSelect option (1-3): ").strip()
    
    if choice == "2":
        interactive_test()
    elif choice == "3":
        data = generate_random_form_data()
        test_form_submission(1, data)
    else:
        num_tests = input("\nNumber of tests to run (default 5): ").strip()
        num_tests = int(num_tests) if num_tests.isdigit() else 5
        
        delay = input("Delay between tests in seconds (default 2): ").strip()
        delay = int(delay) if delay.isdigit() else 2
        
        run_tests(num_tests, delay)
