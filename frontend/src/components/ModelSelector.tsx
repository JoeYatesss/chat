import { useState, useEffect } from 'react';
import { getModels } from '@/services/api';

interface Model {
  id: string;
}

interface ModelSelectorProps {
  provider: string;
  setProvider: (provider: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  onModelChange: () => void;
}

export default function ModelSelector({
  provider,
  setProvider,
  selectedModel,
  setSelectedModel,
  onModelChange
}: ModelSelectorProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  // Fetch models when provider changes
  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      setError(null);
      try {
        const modelList = await getModels(provider);
        setModels(modelList);
        
        // Set a default model if none is selected or provider changed
        if (!selectedModel || (!selectedModel.includes('claude') && provider === 'claude') || 
            (!selectedModel.includes('gpt') && provider === 'openai')) {
          const defaultModel = provider === 'claude' 
            ? 'claude-3-haiku-20240307' 
            : 'gpt-3.5-turbo';
          setSelectedModel(defaultModel);
        }
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Failed to load models');
      } finally {
        setLoading(false);
      }
    };
    
    fetchModels();
  }, [provider]);

  const handleProviderChange = (newProvider: string) => {
    setProvider(newProvider);
    setShowModelDropdown(false);
    onModelChange();
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setShowModelDropdown(false);
    onModelChange();
  };

  // Helper function to get a display name for the model
  const getModelDisplayName = (modelId: string) => {
    // Handle OpenAI models
    if (modelId.includes('gpt-4o')) {
      return 'GPT-4o';
    } else if (modelId.includes('gpt-4')) {
      return 'GPT-4';
    } else if (modelId.includes('gpt-3.5')) {
      return 'GPT-3.5';
    }
    
    // Handle Claude models
    if (modelId.includes('opus')) {
      return 'Claude 3 Opus';
    } else if (modelId.includes('sonnet')) {
      return 'Claude 3 Sonnet';
    } else if (modelId.includes('haiku')) {
      return 'Claude 3 Haiku';
    }
    
    // Default: return the ID
    return modelId;
  };

  return (
    <div className="relative mb-4 flex flex-col items-center">
      {/* Provider selector */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-full flex text-sm font-medium">
        <button 
          onClick={() => handleProviderChange("claude")} 
          className={`px-4 py-2 rounded-full transition-all ${provider === "claude" ? 
            "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg" : 
            "text-gray-400 hover:text-gray-200"}`}
        >
          Claude
        </button>
        <button 
          onClick={() => handleProviderChange("openai")} 
          className={`px-4 py-2 rounded-full transition-all ${provider === "openai" ? 
            "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg" : 
            "text-gray-400 hover:text-gray-200"}`}
        >
          OpenAI
        </button>
      </div>

      {/* Model selector dropdown */}
      <div className="mt-3 relative">
        <button 
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/70 text-white text-sm hover:bg-gray-700/70"
          onClick={() => setShowModelDropdown(!showModelDropdown)}
        >
          <span>{getModelDisplayName(selectedModel)}</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showModelDropdown && (
          <div className="absolute mt-2 py-1 w-48 bg-gray-800 rounded-lg shadow-xl z-10">
            {loading ? (
              <div className="text-center py-2 text-gray-400 text-sm">Loading models...</div>
            ) : error ? (
              <div className="text-center py-2 text-red-400 text-sm">{error}</div>
            ) : (
              models.map((model) => (
                <button
                  key={model.id}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                    model.id === selectedModel ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => handleModelSelect(model.id)}
                >
                  {getModelDisplayName(model.id)}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
