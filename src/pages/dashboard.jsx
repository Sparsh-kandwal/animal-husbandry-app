import React, { useState } from 'react';
import { 
  Activity, 
  Droplets, 
  Wheat, 
  Dna, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart
} from 'recharts';

// --- MOCK DATA ---

const livestockData = [
  { name: 'Cattle', value: 450, color: '#059669' }, // Emerald 600
  { name: 'Buffalo', value: 300, color: '#0284c7' }, // Sky 600
  { name: 'Goats', value: 150, color: '#d97706' },  // Amber 600
  { name: 'Sheep', value: 100, color: '#8b5cf6' },  // Violet 500
  { name: 'Poultry', value: 1200, color: '#ef4444' }, // Red 500
];

const breedData = [
  { name: 'Holstein', Count: 120, Yield: 85 },
  { name: 'Jersey', Count: 98, Yield: 75 },
  { name: 'Angus', Count: 86, Yield: 40 },
  { name: 'Murrah', Count: 150, Yield: 60 },
  { name: 'Sahiwal', Count: 80, Yield: 55 },
];

const milkProductionData = [
  { day: 'Mon', Yield: 4200, Target: 4000 },
  { day: 'Tue', Yield: 4350, Target: 4000 },
  { day: 'Wed', Yield: 4100, Target: 4000 },
  { day: 'Thu', Yield: 4400, Target: 4000 },
  { day: 'Fri', Yield: 4500, Target: 4000 },
  { day: 'Sat', Yield: 4300, Target: 4000 },
  { day: 'Sun', Yield: 4600, Target: 4000 },
];

const milkQualityData = [
  { subject: 'Fat %', A: 4.2, fullMark: 5 },
  { subject: 'SNF', A: 8.8, fullMark: 10 },
  { subject: 'Protein', A: 3.4, fullMark: 4 },
  { subject: 'Density', A: 29, fullMark: 32 },
  { subject: 'Lactose', A: 4.8, fullMark: 6 },
  { subject: 'Minerals', A: 0.7, fullMark: 1 },
];

const healthStatusData = [
  { name: 'Healthy', value: 850, color: '#10b981' },
  { name: 'Observation', value: 45, color: '#f59e0b' },
  { name: 'Sick', value: 15, color: '#ef4444' },
];

const feedCostData = [
  { month: 'Jan', Cost: 12000, Yield: 45000 },
  { month: 'Feb', Cost: 11500, Yield: 46000 },
  { month: 'Mar', Cost: 13000, Yield: 44000 },
  { month: 'Apr', Cost: 12500, Yield: 47000 },
  { month: 'May', Cost: 11000, Yield: 48000 },
  { month: 'Jun', Cost: 11800, Yield: 49000 },
];

const financialData = [
  { name: 'Milk', value: 65, color: '#059669' },
  { name: 'Meat', value: 15, color: '#3b82f6' },
  { name: 'Manure', value: 10, color: '#d97706' },
  { name: 'Livestock Sales', value: 10, color: '#6366f1' },
];

const revenueExpenseData = [
  { month: 'Jan', Revenue: 50000, Expense: 30000 },
  { month: 'Feb', Revenue: 52000, Expense: 28000 },
  { month: 'Mar', Revenue: 48000, Expense: 32000 },
  { month: 'Apr', Revenue: 55000, Expense: 29000 },
  { month: 'May', Revenue: 58000, Expense: 31000 },
  { month: 'Jun', Revenue: 62000, Expense: 33000 },
];

// --- COMPONENTS ---


const StatCard = ({ title, value, subtext, trend, trendValue, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      {trend === 'up' ? (
        <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
      ) : (
        <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
      )}
      <span className={`font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
        {trendValue}
      </span>
      <span className="text-slate-400 ml-2">{subtext}</span>
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6 mt-8 flex justify-between items-end border-b border-slate-200 pb-2">
    <div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
    </div>
    <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
      View Report
    </button>
  </div>
);

// --- MAIN DASHBOARD ---

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-8 mt-16">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Analytics Overview</h2>
            <p className="text-slate-500 mt-1">Real-time farm performance metrics.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* 1. SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Livestock" 
            value="2,200" 
            subtext="vs last month"
            trend="up" 
            trendValue="12%" 
            icon={Dna} 
            colorClass="bg-blue-500" 
          />
          <StatCard 
            title="Daily Milk Yield" 
            value="4,500 L" 
            subtext="vs target"
            trend="up" 
            trendValue="5.2%" 
            icon={Droplets} 
            colorClass="bg-cyan-500" 
          />
          <StatCard 
            title="Monthly Revenue" 
            value="$58.2k" 
            subtext="vs last month"
            trend="up" 
            trendValue="8.4%" 
            icon={DollarSign} 
            colorClass="bg-emerald-500" 
          />
          <StatCard 
            title="Health Alerts" 
            value="15" 
            subtext="Critical cases"
            trend="down" 
            trendValue="3" 
            icon={Activity} 
            colorClass="bg-red-500" 
          />
        </div>

        {/* 2. LIVESTOCK & BREEDING SECTION */}
        <SectionHeader title="Livestock Demographics" subtitle="Distribution by species and breed performance" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Donut Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-slate-800 font-semibold mb-6">Herd Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={livestockData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {livestockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
            <h3 className="text-slate-800 font-semibold mb-6">Breed Composition & Yield</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Legend />
                  <Bar dataKey="Count" stackId="a" fill="#0ea5e9" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Yield" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. MILK PRODUCTION & QUALITY */}
        <SectionHeader title="Milk Production Analytics" subtitle="Yield trends and quality control metrics" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-800 font-semibold">Weekly Production Yield</h3>
              <select className="text-sm border-slate-200 rounded-md text-slate-500">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={milkProductionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <Tooltip />
                  <Area type="monotone" dataKey="Yield" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
                  <Line type="monotone" dataKey="Target" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-slate-800 font-semibold mb-2">Quality Radar</h3>
            <p className="text-xs text-slate-500 mb-4">Average composition vs Standard</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={milkQualityData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar
                    name="Current Batch"
                    dataKey="A"
                    stroke="#059669"
                    strokeWidth={2}
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 4. HEALTH & FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Health Status */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-800 font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-red-500" /> 
                Herd Health Status
              </h3>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={healthStatusData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {healthStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                {healthStatusData.map((item) => (
                  <div key={item.name} className="p-2 bg-slate-50 rounded-lg">
                      <div className="text-xl font-bold" style={{color: item.color}}>{item.value}</div>
                      <div className="text-xs text-slate-500">{item.name}</div>
                  </div>
                ))}
            </div>
          </div>

            {/* Feed vs Yield Cost */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-slate-800 font-semibold mb-6 flex items-center gap-2">
                <Wheat className="h-4 w-4 text-amber-500" />
                Feed Cost Efficiency
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={feedCostData}>
                  <CartesianGrid stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Cost" barSize={20} fill="#f59e0b" name="Feed Cost ($)" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="Yield" stroke="#10b981" strokeWidth={2} name="Yield Value ($)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

          {/* 5. FINANCIAL OVERVIEW */}
          <SectionHeader title="Financial Performance" subtitle="Revenue breakdown and expense tracking" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Financial Pie */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-800 font-semibold mb-4">Revenue Sources</h3>
              <div className="h-60 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={financialData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {financialData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-2xl font-bold text-slate-800">100%</div>
                    <div className="text-xs text-slate-500">Income</div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm mt-2">
                {financialData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: item.color}}></div>
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rev vs Expense Area */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
              <h3 className="text-slate-800 font-semibold mb-6">Revenue vs Expenses</h3>
              <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueExpenseData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="Expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
                </AreaChart>
              </ResponsiveContainer>
              </div>
            </div>

          </div>
          
          <div className="text-center text-slate-400 text-sm mt-12 pb-4">
            © 2025 VitalHerd Analytics System. Enterprise Version 2.4.0
          </div>
      </main>
    </div>
  );
};

export default Dashboard;