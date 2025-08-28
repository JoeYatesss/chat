# NeuraTalk AI Chat Application

A modern chat application that supports both OpenAI and Anthropic Claude models.

## Project Structure

The project consists of two main parts:

- **Backend**: FastAPI-based Python API that handles communication with AI providers
- **Frontend**: Next.js React application for the user interface

## Setup Instructions

### Prerequisites

- Python 3.8+ (for backend)
- Node.js 16+ (for frontend)
- OpenAI API key (for GPT models)
- Anthropic API key (for Claude models)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

5. Start the backend server:
   ```
   uvicorn main:app --reload
   ```

   The API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

## API Endpoints

- `POST /chat`: Send a message and get a response
- `GET /messages`: Get conversation history
- `GET /models`: Get available models for the specified provider
- `POST /reset`: Reset the conversation history
- `GET /health`: Health check endpoint

## Usage

1. Open the web application at `http://localhost:3000`
2. Select the AI provider (OpenAI or Claude)
3. Choose a model from the dropdown menu
4. Type your message and press Enter or click the send button
5. View the AI's response in the chat interface

## Environment Variables

### Backend

- `OPENAI_API_KEY`: Your OpenAI API key
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `DEBUG`: Enable debug mode (default: True)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)

## Troubleshooting

- **API Key Errors**: Ensure your API keys are correctly set in the `.env` file
- **CORS Errors**: If you encounter CORS issues, check that the frontend URL is listed in the `origins` array in `main.py`
- **Model Not Found**: Verify the model names in the code match the models available in your API account

## License

MIT