import { Search, Upload, Sun, Moon } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";
import { useTheme } from "../contexts/ThemeContext";
import { Tooltip } from "./Tooltip";

export default function Header() {
  const { 
    searchQuery, 
    setSearchQuery,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder
  } = useSearch();
  
  // Import theme context to manage dark/light mode
  const { theme, toggleTheme } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <header className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 border-b">
      <div className="flex justify-between items-center">
        <div className="flex flex-1 items-center">
          <h1 className="mr-8 font-bold text-2xl text-gray-900 dark:text-white">Assets</h1>
          <div className="w-full max-w-lg">
            <div className="relative">
              <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search assets..."
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                         dark:text-white py-2 pr-4 pl-10 border focus:border-transparent 
                         rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none
                         dark:placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex ml-4 space-x-2">
            {(['name', 'date', 'size'] as const).map((field) => (
              <button
                key={field}
                onClick={() => setSortField(field)}
                className={`px-3 py-1 rounded ${
                  sortField === field 
                    ? 'bg-gray-200 dark:bg-gray-700' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } dark:text-gray-200`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 
                     rounded-lg text-white transition-colors"
          >
            <Upload className="mr-2 w-5 h-5" />
            Upload
          </button>
          
          {/* Theme toggle button with tooltip */}
          <Tooltip content={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            <button
              onClick={toggleTheme}
              className="relative hover:bg-gray-100 dark:hover:bg-gray-700 p-2 
                       rounded-full text-gray-600 dark:text-gray-300 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}