// API service for chat backend
const API_URL = 'http://localhost:8000';

export interface Message {
  role: string;
  content: string;
}

export interface ChatResponse {
  response: string;
  messages: Message[];
}

export interface Model {
  id: string;
}

export interface ModelsResponse {
  models: Model[];
}

/**
 * Send a message to the API
 */
export async function sendMessage(
  message: string, 
  model: string | null = null,
  systemPrompt: string | null = null,
  provider: string | null = null
): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        ...(model && { model }),
        ...(systemPrompt && { system_prompt: systemPrompt }),
        ...(provider && { provider }),
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

/**
 * Get message history
 */
export async function getMessages(): Promise<Message[]> {
  try {
    const response = await fetch(`${API_URL}/messages`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}

/**
 * Get available models for a provider
 */
export async function getModels(provider: string): Promise<Model[]> {
  try {
    const response = await fetch(`${API_URL}/models?provider=${provider}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.models;
  } catch (error) {
    console.error('Error getting models:', error);
    return [];
  }
}

/**
 * Reset conversation
 */
export async function resetConversation(): Promise<void> {
  try {
    await fetch(`${API_URL}/reset`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error resetting conversation:', error);
    throw error;
  }
}
