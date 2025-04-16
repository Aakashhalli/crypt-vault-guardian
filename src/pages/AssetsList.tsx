
import React, { useState, useEffect } from 'react';
import { Search, Shield, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AssetCard, { AssetType } from '@/components/AssetCard';

// Mock data for assets
const mockAssets = [
  {
    id: '1',
    type: 'image' as AssetType,
    name: 'Logo_Design_Final.png',
    hash: '0x7c29fb9a6baf961564d28e2dde64c7d11be6c55b6c',
    timestamp: '01/04/2025 14:32:11',
    previewUrl: 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    type: 'pdf' as AssetType,
    name: 'Research_Paper_v2.pdf',
    hash: '0x3a24e9c0e4b01d70a649307fcebad98035c2fde9f8',
    timestamp: '28/03/2025 09:15:43'
  },
  {
    id: '3',
    type: 'image' as AssetType,
    name: 'Product_Photography.jpg',
    hash: '0x8e76c4d59cfed4ef1df168e2c5c11f8b87bc2da521',
    timestamp: '25/03/2025 16:08:22',
    previewUrl: 'https://images.unsplash.com/photo-1618005198919-177e9dd3b6c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '4',
    type: 'audio' as AssetType,
    name: 'Original_Composition_128bpm.mp3',
    hash: '0x4f1c6d8e2b3a9c7f0d5e8b1a2c3d4e5f6a7b8c9d0e',
    timestamp: '22/03/2025 11:42:17'
  },
  {
    id: '5',
    type: 'image' as AssetType,
    name: 'Project_Mockup_Final.png',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    timestamp: '20/03/2025 15:27:36',
    previewUrl: 'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '6',
    type: 'pdf' as AssetType,
    name: 'Legal_Contract_Draft.pdf',
    hash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c',
    timestamp: '15/03/2025 10:12:49'
  }
];

const AssetsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<AssetType | 'all'>('all');
  const [visibleAssets, setVisibleAssets] = useState<string[]>([]);

  // Filter assets based on search query and type filter
  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.hash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || asset.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Animation effect for staggered card appearance
  useEffect(() => {
    setVisibleAssets([]);
    
    if (filteredAssets.length > 0) {
      const showWithDelay = async () => {
        for (let i = 0; i < filteredAssets.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setVisibleAssets(prev => [...prev, filteredAssets[i].id]);
        }
      };
      
      showWithDelay();
    }
  }, [filteredAssets]);

  return (
    <div className="min-h-screen bg-crypto-darker">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-gradient">Your Protected</span> Assets
            </h1>
            <p className="text-gray-400 max-w-2xl">
              All your digital creations secured on the blockchain with Cryptex Vault
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-crypto-dark/50 pl-10 pr-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-crypto-purple w-full glass-card"
              />
            </div>
            
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as AssetType | 'all')}
                className="bg-crypto-dark/50 pl-9 pr-4 py-2 rounded-r-lg border-l border-gray-700 focus:outline-none focus:ring-1 focus:ring-crypto-purple appearance-none glass-card"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="pdf">PDFs</option>
                <option value="audio">Audio</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <div 
                key={asset.id}
                className={`transform transition-all duration-500 ease-out ${
                  visibleAssets.includes(asset.id) 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                <AssetCard
                  type={asset.type}
                  name={asset.name}
                  hash={asset.hash}
                  timestamp={asset.timestamp}
                  previewUrl={asset.previewUrl}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-xl p-8 text-center">
            <div className="bg-crypto-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-crypto-purple" />
            </div>
            <h3 className="text-xl font-medium mb-2">No assets found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || filterType !== 'all' 
                ? "No assets match your search criteria. Try adjusting your filters."
                : "You haven't protected any assets yet. Upload your first asset to get started."}
            </p>
            <button
              onClick={() => window.location.href = '/upload'}
              className="crypto-button mx-auto"
            >
              Upload Your First Asset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsList;
