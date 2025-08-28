import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API keys
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# Check if API keys are available
def is_openai_available():
    return OPENAI_API_KEY != ""

def is_claude_available():
    return ANTHROPIC_API_KEY != ""

# Configuration
DEFAULT_OPENAI_MODEL = "gpt-4o"
DEFAULT_CLAUDE_MODEL = "claude-3-5-haiku-20241022"
DEFAULT_SYSTEM_PROMPT = "You are a helpful assistant."

# Server settings
DEBUG = os.environ.get("DEBUG", "True").lower() == "true"
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8000"))
