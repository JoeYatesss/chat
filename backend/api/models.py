from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    role: str
    content: str

class Messages(BaseModel):
    messages: List[Message]

class Response(BaseModel):
    response: str

class Responses(BaseModel):
    responses: List[Response]

class Model(BaseModel):
    model: str

class Models(BaseModel):
    models: List[Model]

class SystemPrompt(BaseModel):
    system_prompt: str

class SystemPrompts(BaseModel):
    system_prompts: List[SystemPrompt]

