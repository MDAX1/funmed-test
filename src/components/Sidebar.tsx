import {
  FolderOpen,
  Image,
  FileText,
  Video,
  Star,
  Trash,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex flex-col border-gray-200 bg-gray-50 border-r w-64 h-screen">
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          <button className="flex items-center bg-gray-200 px-3 py-2 rounded-lg w-full text-gray-900">
            <FolderOpen className="mr-3 w-5 h-5" />
            All Files
          </button>
          <button className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg w-full text-gray-700">
            <Image className="mr-3 w-5 h-5" />
            Images
          </button>
          <button className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg w-full text-gray-700">
            <FileText className="mr-3 w-5 h-5" />
            Documents
          </button>
          <button className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg w-full text-gray-700">
            <Video className="mr-3 w-5 h-5" />
            Videos
          </button>
        </div>

        <div className="mt-8">
          <h3 className="px-3 font-medium text-gray-500 text-sm">Labels</h3>
          <div className="space-y-1 mt-2">
            <button className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg w-full text-gray-700">
              <Star className="mr-3 w-5 h-5" />
              Favorites
            </button>
            <button className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg w-full text-gray-700">
              <Trash className="mr-3 w-5 h-5" />
              Trash
            </button>
          </div>
        </div>
      </nav>

      <div className="border-gray-200 p-4 border-t">
        <button className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg w-full text-gray-700">
          <Settings className="mr-3 w-5 h-5" />
          Settings
        </button>
      </div>
    </aside>
  );
}
