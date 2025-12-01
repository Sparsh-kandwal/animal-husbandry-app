import React, { useState, useMemo } from 'react';
import mapimg from '../img/mapimg.png';
import { 
  LayoutDashboard, 
  Search, 
  Filter, 
  Maximize, 
  Navigation, 
  ExternalLink, 
  Info,
  Satellite,
  Map as MapIcon,
  Layers,
  X,
  Users,
  AlertTriangle
} from 'lucide-react';

// ==================================================================================
// INTERNAL COMPONENT: GIS MAP (Simulated for Preview)
// In a real project, move this to 'src/components/GISMap.jsx'
// ==================================================================================

const SimulatedMap = ({ children }) => {
  return (
    <div className="w-full h-full relative bg-slate-900 overflow-hidden group">
      {/* PHOTO BACKGROUND: Replaced abstract grid with an actual image */}
      <img 
        src={mapimg}
        alt="Farm Aerial View" 
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      
      {/* Dark Overlay to make symbols pop */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      {/* Render Symbols/Markers on top */}
      {children}
      
      {/* Google Logo Placeholder */}
      <div className="absolute bottom-1 left-1 opacity-80 text-[10px] font-sans text-white font-medium select-none shadow-black drop-shadow-md">
        Google
      </div>
      <div className="absolute bottom-6 right-2 text-[10px] text-slate-600 bg-white/90 px-2 py-1 rounded shadow-sm border border-slate-200">
        Preview Mode: Simulated Map
      </div>
    </div>
  );
};

const SimulatedMarker = ({ lat, lng, color, onClick, children }) => {
  // Simple projection simulation
  const top = 100 - ((lat - 8) / (37 - 8)) * 100; 
  const left = ((lng - 68) / (97 - 68)) * 100;

  return (
    <div 
      className="absolute cursor-pointer transition-all duration-300 hover:scale-110 z-10 group"
      style={{ top: `${top}%`, left: `${left}%` }}
      onClick={onClick}
    >
      {/* Pin Body */}
      <div className="-translate-x-1/2 -translate-y-full drop-shadow-xl filter">
        <svg 
          width="32" 
          height="42" 
          viewBox="0 0 24 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          // Added drop shadow for better visibility on photo
          style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.5))' }}
        >
          <path 
            d="M12 0C5.37 0 0 5.37 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37 18.63 0 12 0Z" 
            fill={color} 
            stroke="white" 
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="3.5" fill="white"/>
        </svg>
      </div>
      {children}
    </div>
  );
};

const GISMap = ({ geoData, onSelectFeature }) => {
  // State for Filters
  const [filterType, setFilterType] = useState('All');
  const [minHerdSize, setMinHerdSize] = useState(0);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for UI
  const [showFilters, setShowFilters] = useState(true);
  const [activePopup, setActivePopup] = useState(null); 
  const [mapType, setMapType] = useState('satellite'); // Defaulted to satellite/photo

  // --- Filtering Logic ---
  const filteredFeatures = useMemo(() => {
    if (!geoData) return [];
    
    return geoData.features.filter(feature => {
      const p = feature.properties;
      const matchesType = filterType === 'All' || p.type === filterType;
      const matchesStatus = filterStatus === 'All' || p.healthStatus === filterStatus;
      const matchesSize = p.herdSize >= minHerdSize;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesStatus && matchesSize && matchesSearch;
    });
  }, [geoData, filterType, minHerdSize, filterStatus, searchQuery]);

  // --- Styles ---
  const getMarkerColor = (status) => {
    switch (status) {
      case 'Healthy': return '#10b981'; // Emerald
      case 'Observation': return '#f59e0b'; // Amber
      case 'Critical': return '#ef4444'; // Red
      default: return '#64748b';
    }
  };

  // --- Handlers ---
  const handleFeatureClick = (feature) => {
    setActivePopup(feature);
    if (onSelectFeature) onSelectFeature(feature);
  };

  const handleSearchSelect = (feature) => {
    setActivePopup(feature);
    setSearchQuery(feature.properties.name);
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-slate-50">
      
      <SimulatedMap>
        {filteredFeatures.map((feature) => {
          const [lng, lat] = feature.geometry.coordinates;
          const { id, name, type, herdSize, healthStatus, lastCheck } = feature.properties;
          
          return (
            <SimulatedMarker
              key={id}
              lat={lat}
              lng={lng}
              color={getMarkerColor(healthStatus)}
              onClick={() => handleFeatureClick(feature)}
            >
              {activePopup && activePopup.properties.id === id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-800 text-sm">{name}</h3>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActivePopup(null); }}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                       <span className={`text-[10px] px-2 py-0.5 rounded-full text-white font-medium ${
                        healthStatus === 'Healthy' ? 'bg-emerald-500' : 
                        healthStatus === 'Critical' ? 'bg-red-500' : 'bg-amber-500'
                      }`}>
                        {healthStatus}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded mb-3">
                      <div>
                        <span className="block text-slate-400 text-[9px] uppercase">Herd Size</span>
                        <span className="font-semibold">{herdSize}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 text-[9px] uppercase">Last Check</span>
                        <span className="font-semibold">{lastCheck}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 text-xs">
                      <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-1.5 rounded flex items-center justify-center gap-1 transition-colors">
                        <Navigation size={12} /> Directions
                      </button>
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded flex items-center justify-center gap-1 transition-colors">
                        <ExternalLink size={12} /> Profile
                      </button>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-white"></div>
                </div>
              )}
            </SimulatedMarker>
          );
        })}
      </SimulatedMap>

      {/* --- UI OVERLAYS --- */}

      {/* 1. Map Controls */}
      <div className="absolute top-4 left-4 z-[40] flex flex-col gap-2">
        <button 
          onClick={() => setMapType(prev => prev === 'roadmap' ? 'satellite' : 'roadmap')}
          className="bg-white p-2.5 rounded shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
          title="Switch Map Type"
        >
          {mapType === 'roadmap' ? <Satellite size={20} /> : <MapIcon size={20} />}
        </button>
        <button 
          className="bg-white p-2.5 rounded shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
          title="Fit Bounds"
        >
          <Maximize size={20} />
        </button>
      </div>

      {/* 2. Search & Filters */}
      <div className="absolute top-4 right-4 z-[40] w-80 flex flex-col gap-2 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Search Box */}
          <div className="bg-white rounded shadow-md p-2 flex items-center border border-slate-200">
            <Search className="text-slate-400 w-5 h-5 ml-2" />
            <input 
              type="text" 
              placeholder="Search farm..." 
              className="w-full px-3 py-1 outline-none text-sm text-slate-700 placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="absolute top-12 left-0 right-0 bg-white rounded shadow-xl border border-slate-200 max-h-48 overflow-y-auto">
                {filteredFeatures.slice(0, 5).map(f => (
                  <div 
                    key={f.properties.id}
                    onClick={() => handleSearchSelect(f)}
                    className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm border-b border-slate-100 last:border-0"
                  >
                    <div className="font-medium text-slate-800">{f.properties.name}</div>
                    <div className="text-xs text-slate-500">{f.properties.type} • ID: {f.properties.id}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-end mt-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white p-2 rounded shadow-md border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Filter size={16} /> Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white/95 backdrop-blur-sm rounded shadow-xl border border-slate-200 p-4 space-y-4 mt-2 animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block tracking-wider">Livestock Type</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Cattle', 'Buffalo', 'Goat', 'Poultry'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all border ${
                        filterType === type 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block tracking-wider">Health Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Healthy">Healthy (Green)</option>
                  <option value="Observation">Observation (Amber)</option>
                  <option value="Critical">Critical (Red)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Min Herd Size</label>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{minHerdSize}+</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  step="10"
                  value={minHerdSize}
                  onChange={(e) => setMinHerdSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-[40] bg-white/90 backdrop-blur rounded-lg shadow-md border-t lg:border border-slate-200 p-3">
        <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1">
          <Info size={12} /> Map Legend
        </h4>
        <div className="flex lg:block gap-4 lg:gap-0 lg:space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#10b981" /></svg> Healthy
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#f59e0b" /></svg> Observation
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#ef4444" /></svg> Critical
          </div>
        </div>
      </div>

    </div>
  );
};

// ==================================================================================
// DASHBOARD PAGE
// ==================================================================================

// --- Mock GeoJSON Generator for Testing ---
const generateMockFarms = (count) => {
  const types = ['Cattle', 'Buffalo', 'Goat', 'Poultry'];
  const statuses = ['Healthy', 'Healthy', 'Healthy', 'Observation', 'Critical']; // Weighted towards healthy
  
  const features = Array.from({ length: count }).map((_, i) => {
    // Random coords (Example: Central India)
    const lat = 20 + (Math.random() - 0.5) * 5;
    const lng = 78 + (Math.random() - 0.5) * 5;
    
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      },
      properties: {
        id: `FM-${1000 + i}`,
        name: `VitalFarm ${String.fromCharCode(65 + (i % 26))}-${i}`,
        type: types[Math.floor(Math.random() * types.length)],
        herdSize: Math.floor(Math.random() * 500) + 10,
        healthStatus: statuses[Math.floor(Math.random() * statuses.length)],
        lastCheck: new Date().toLocaleDateString(),
        contact: "+91-98765-43210"
      }
    };
  });

  return { type: "FeatureCollection", features };
};

const mockGeoData = generateMockFarms(50);

const Gis = () => {
  const handleFeatureSelect = (feature) => {
    console.log("Selected Farm:", feature.properties.name);
    // Add logic here to open a side panel or navigate
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 mt-20">
          <div className="bg-emerald-600 p-2 rounded-lg text-white">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Farm Intelligence Map</h1>
            <p className="text-slate-500 text-sm">Geospatial overview of herd distribution and health status.</p>
          </div>
        </div>

        {/* GIS Map Integration */}
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
          <GISMap 
            geoData={mockGeoData} 
            onSelectFeature={handleFeatureSelect} 
          />
        </div>

        {/* Quick Stats Below Map */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-500 uppercase">Total Active Farms</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">50</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
              <Users size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-500 uppercase">Critical Alerts</div>
              <div className="text-3xl font-bold text-red-600 mt-2">
                {mockGeoData.features.filter(f => f.properties.healthStatus === 'Critical').length}
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-red-600">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-500 uppercase">Total Headcount</div>
              <div className="text-3xl font-bold text-emerald-600 mt-2">
                {mockGeoData.features.reduce((acc, curr) => acc + curr.properties.herdSize, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
              <MapIcon size={24} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Gis;