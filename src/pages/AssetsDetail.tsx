import { useParams } from 'react-router-dom';

export function AssetDetail() {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Asset Details page</h1>
    </div>
  );
}