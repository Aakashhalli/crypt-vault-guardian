
import React from 'react';
import { File, FileImage, FileText, Music, Calendar, ExternalLink, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export type AssetType = 'image' | 'pdf' | 'audio';

interface AssetCardProps {
  type: AssetType;
  name: string;
  hash: string;
  timestamp: string;
  previewUrl?: string; // Optional preview URL for images
}

const AssetCard: React.FC<AssetCardProps> = ({
  type,
  name,
  hash,
  timestamp,
  previewUrl
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'image':
        return <FileImage className="w-6 h-6 text-crypto-purple" />;
      case 'pdf':
        return <FileText className="w-6 h-6 text-crypto-purple" />;
      case 'audio':
        return <Music className="w-6 h-6 text-crypto-purple" />;
      default:
        return <File className="w-6 h-6 text-crypto-purple" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
    });
  };

  const shortenHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Preview section for images */}
      {type === 'image' && previewUrl && (
        <div className="w-full h-40 bg-crypto-darker">
          <img 
            src={previewUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-crypto-purple/10 rounded-md mr-3">
            {getTypeIcon()}
          </div>
          <div>
            <h3 className="font-medium text-lg truncate max-w-[200px]">{name}</h3>
            <p className="text-xs text-gray-400 mt-1 capitalize">{type} Asset</p>
          </div>
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-center text-sm">
            <div className="w-24 text-gray-400">Asset Hash:</div>
            <div className="flex items-center">
              <span className="font-mono text-crypto-accent">{shortenHash(hash)}</span>
              <button 
                onClick={() => copyToClipboard(hash)}
                className="ml-2 text-gray-400 hover:text-crypto-purple transition-colors"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <div className="w-24 text-gray-400">Timestamp:</div>
            <div className="flex items-center">
              <Calendar size={14} className="text-crypto-purple mr-1" />
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-700 flex justify-between">
          <button 
            onClick={() => toast({ title: "View Details", description: "This would open asset details in a real implementation" })}
            className="text-crypto-purple text-sm hover:underline flex items-center"
          >
            <ExternalLink size={14} className="mr-1" />
            View Details
          </button>
          
          <button 
            onClick={() => toast({ title: "Verify Asset", description: "This would verify the asset in a real implementation" })}
            className="text-crypto-accent text-sm hover:underline"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
