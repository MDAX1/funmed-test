interface AssetsProps {
    type?: 'image' | 'document' | 'video';
    favorite?: boolean;
    trash?: boolean;
  }
  
  export function Assets({ type, favorite, trash }: AssetsProps) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">
          {type ? `${type.charAt(0).toUpperCase() + type.slice(1)}s` : 
           favorite ? 'Favorites' : 
           trash ? 'Trash' : 'All Assets'}
        </h1>
      </div>
    );
  }
  