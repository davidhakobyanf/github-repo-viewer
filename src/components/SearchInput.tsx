import { useState, useRef, useEffect } from 'react';
import { SearchInputProps } from '../types/index.ts';

const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  loading, 
  placeholder = "Enter GitHub username..." 
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !loading) {
      onSearch(trimmedValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400 dark:text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={loading}
            className="input-field pl-10 pr-12"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                className="btn-primary text-sm py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search
              </button>
            )}
          </div>
        </div>
      </form>
      
      {inputValue && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Press Enter or click Search to find "{inputValue}"
        </div>
      )}
    </div>
  );
};

export default SearchInput;
