from fastapi import APIRouter, Depends, Body, HTTPException
from services.chat_service import ChatService
from api.models import SystemPrompt, Message
from typing import Optional

# Create a single instance of ChatService
chat_service = ChatService()

router = APIRouter()

@router.post("/chat")
async def send_message(
    message: str = Body(...), 
    model: Optional[str] = Body(None),
    system_prompt: Optional[str] = Body(None),
    provider: Optional[str] = Body(None)
):
    """Send a message to the AI and get a response"""
    try:
        return chat_service.send_message(message, model, system_prompt, provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.get("/messages")
async def get_messages():
    """Get conversation history"""
    return {"messages": chat_service.get_messages()}

@router.get("/models")
async def get_models(provider: Optional[str] = None):
    """Get available models for the specified provider"""
    if provider:
        chat_service.provider = provider
    return {"models": chat_service.get_models()}

@router.post("/reset")
async def reset_conversation():
    """Reset the conversation history"""
    chat_service.messages = []
    return {"status": "conversation reset", "messages": []}

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}
