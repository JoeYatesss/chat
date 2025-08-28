from openai import OpenAI
import openai
import os
import time
import random
from typing import List, Dict, Optional, Any, Callable, Tuple
from api.models import SystemPrompt, Message
import anthropic
from core.config import (
    OPENAI_API_KEY, 
    ANTHROPIC_API_KEY, 
    DEFAULT_OPENAI_MODEL,
    DEFAULT_CLAUDE_MODEL,
    DEFAULT_SYSTEM_PROMPT,
    is_openai_available, 
    is_claude_available
)

class ChatService:
    def __init__(self, model: str = DEFAULT_OPENAI_MODEL, system_prompt: str = DEFAULT_SYSTEM_PROMPT, provider: str = "openai"):
        self.messages: List[Dict[str, str]] = []
        self.model: str = model
        self.system_prompt: str = system_prompt
        self.provider: str = provider
        
        # Initialize OpenAI client
        if is_openai_available():
            self.openai_client = OpenAI(api_key=OPENAI_API_KEY)
        else:
            self.openai_client = None
            
        # Initialize Anthropic client for Claude
        if is_claude_available():
            self.claude_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        else:
            self.claude_client = None
    
    def get_messages(self) -> List[Dict[str, str]]:
        """Return conversation history."""
        return self.messages
    
    def send_message(self, message: str, model: Optional[str] = None, system_prompt: Optional[str] = None, provider: Optional[str] = None):
        """Send a message and get a response from the selected AI provider."""
        # Update settings if provided
        if model:
            self.model = model
        if system_prompt:
            self.system_prompt = system_prompt
        if provider:
            self.provider = provider
            
        # Add user message to history
        self.messages.append({"role": "user", "content": message})
        
        # Get response based on provider
        if self.provider.lower() == "claude":
            response_text = self._get_claude_response(message)
        else:
            response_text = self._get_openai_response(message)
            
        # Add assistant response to history
        self.messages.append({"role": "assistant", "content": response_text})
        
        return {"response": response_text, "messages": self.messages}
        
    def _get_openai_response(self, message: str):
        """Get a response from OpenAI."""
        if not self.openai_client:
            return "Error: OpenAI API key not configured"
            
        try:
            # Prepare messages including system prompt and history
            api_messages = [{"role": "system", "content": self.system_prompt}]
            for msg in self.messages:
                api_messages.append({"role": msg["role"], "content": msg["content"]})
                
            response = self.openai_client.chat.completions.create(
                model=self.model,
                messages=api_messages
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error calling OpenAI API: {str(e)}"
 
    def _get_claude_response(self, message: str):
        """Get a response from Anthropic's Claude."""
        if not self.claude_client:
            return "Error: Claude API key not configured"
            
        try:
            # Claude has a different conversation format
            messages = []
            for msg in self.messages:
                if msg["role"] == "user":
                    messages.append({"role": "user", "content": msg["content"]})
                elif msg["role"] == "assistant":
                    messages.append({"role": "assistant", "content": msg["content"]})
            
            # Use the model specified or fall back to default
            claude_model = self.model if "claude" in self.model else DEFAULT_CLAUDE_MODEL
            
            response = self.claude_client.messages.create(
                model=claude_model,
                system=self.system_prompt,
                messages=messages
            )
            return response.content[0].text
        except Exception as e:
            return f"Error calling Claude API: {str(e)}"
    
    def get_models(self):
        """Get available models based on the current provider."""
        try:
            if self.provider.lower() == "claude":
                if self.claude_client:
                    # Claude doesn't have a list models endpoint, return hardcoded list
                    return [
                        {"id": "claude-3-opus-20240229"},
                        {"id": "claude-3-sonnet-20240229"},
                        {"id": "claude-3-haiku-20240307"}
                    ]
                else:
                    return {"error": "Claude API key not configured"}
            else:
                # OpenAI models
                if self.openai_client:
                    try:
                        models = self.openai_client.models.list()
                        # Filter to only chat models
                        chat_models = [model for model in models.data if "gpt" in model.id.lower()]
                        return chat_models
                    except Exception as e:
                        # If there's an error listing models, return common ones
                        return [
                            {"id": "gpt-4o"},
                            {"id": "gpt-4-turbo"},
                            {"id": "gpt-3.5-turbo"}
                        ]
                else:
                    return {"error": "OpenAI API key not configured"}
        except Exception as e:
            return {"error": str(e)}