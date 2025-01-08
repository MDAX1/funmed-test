import { Search, Upload, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="border-gray-200 bg-white px-6 py-4 border-b">
      <div className="flex justify-between items-center">
        <div className="flex flex-1 items-center">
          <h1 className="mr-8 font-bold text-2xl text-gray-900">Assets</h1>
          <div className="w-full max-w-lg">
            <div className="relative">
              <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search assets..."
                className="border-gray-300 py-2 pr-4 pl-10 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
            <Upload className="mr-2 w-5 h-5" />
            Upload
          </button>
          <button className="relative hover:bg-gray-100 p-2 rounded-full text-gray-600">
            <Bell className="w-6 h-6" />
            <span className="top-0 right-0 absolute bg-red-500 rounded-full w-2 h-2"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
