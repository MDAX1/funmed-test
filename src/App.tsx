import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AssetGrid from "./components/AssetGrid";
import { Asset, ViewMode } from "./types";

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch("http://localhost:3001/assets");
      const data = await response.json();
      setAssets(data);
    };
    fetchAssets();
  }, []);

  return (
    <div className="flex bg-gray-50 h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <AssetGrid
          assets={assets}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
    </div>
  );
}

export default App;
