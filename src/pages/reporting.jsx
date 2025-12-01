import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Syringe, 
  Users, 
  AlertTriangle, 
  Wheat, 
  FileText, 
  Download, 
  Filter, 
  Eye, 
  Flag, 
  MapPin, 
  TrendingDown, 
  CheckCircle2, 
  Search, 
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { 
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// ==========================================
// 1. REUSABLE UI COMPONENTS (Internal)
// ==========================================

const StatCard = ({ title, value, icon: Icon, trend, trendUp, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-semibold ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-slate-400 ml-2">vs last month</span>
      </div>
    )}
  </div>
);

const PageHeader = ({ title, subtitle, actions }) => (
  <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="text-slate-500 mt-1">{subtitle}</p>
    </div>
    <div className="flex gap-3">{actions}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Healthy: 'bg-emerald-100 text-emerald-700',
    Completed: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Overdue: 'bg-red-100 text-red-700',
    Critical: 'bg-red-100 text-red-700',
    Active: 'bg-blue-100 text-blue-700',
    Resolved: 'bg-slate-100 text-slate-600',
    Yes: 'bg-emerald-100 text-emerald-700',
    No: 'bg-red-100 text-red-700',
  };
  const badgeStyle = styles[status] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${badgeStyle}`}>
      {status}
    </span>
  );
};

const DataTable = ({ columns, data, renderRow }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item, idx) => renderRow(item, idx))}
        </tbody>
      </table>
    </div>
    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
      <span>Showing 1-{data.length} of {data.length} results</span>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-50">Prev</button>
        <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">Next</button>
      </div>
    </div>
  </div>
);

// ==========================================
// 2. REPORT SUB-PAGES
// ==========================================

// --- Dashboard View ---
const DashboardView = () => {
  const dataVaccination = [
    { month: 'Jan', completed: 400, pending: 240 },
    { month: 'Feb', completed: 300, pending: 139 },
    { month: 'Mar', completed: 200, pending: 980 },
    { month: 'Apr', completed: 278, pending: 390 },
    { month: 'May', completed: 189, pending: 480 },
    { month: 'Jun', completed: 239, pending: 380 },
  ];

  const dataSpecies = [
    { name: 'Cattle', value: 400, color: '#10b981' },
    { name: 'Buffalo', value: 300, color: '#3b82f6' },
    { name: 'Goats', value: 300, color: '#f59e0b' },
    { name: 'Poultry', value: 200, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Analytics Overview" 
        subtitle="Real-time insights across all registered farms."
        actions={
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Download className="h-4 w-4 mr-2" /> Export Summary
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Animals" value="12,450" icon={Users} trend="+12%" trendUp={true} color="bg-blue-500" />
        <StatCard title="Total Farmers" value="1,203" icon={LayoutDashboard} trend="+5%" trendUp={true} color="bg-emerald-500" />
        <StatCard title="Vaccinations" value="8,900" icon={Syringe} trend="+18%" trendUp={true} color="bg-purple-500" />
        <StatCard title="Active Alerts" value="23" icon={AlertTriangle} trend="-2%" trendUp={false} color="bg-red-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Vaccination Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataVaccination}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Species Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={dataSpecies} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                >
                  {dataSpecies.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Health View ---
const HealthView = () => {
  const mockData = [
    { id: 'C-1001', species: 'Cattle', age: '4Y', status: 'Healthy', lastCheck: '2023-10-15', doctor: 'Dr. A. Singh' },
    { id: 'B-2042', species: 'Buffalo', age: '2Y', status: 'Critical', lastCheck: '2023-10-14', doctor: 'Dr. P. Patel' },
    { id: 'G-3055', species: 'Goat', age: '1Y', status: 'Active', lastCheck: '2023-10-12', doctor: 'Dr. S. Rao' },
    { id: 'C-1005', species: 'Cattle', age: '5Y', status: 'Overdue', lastCheck: '2023-09-01', doctor: 'Dr. A. Singh' },
    { id: 'P-5001', species: 'Poultry', age: '3M', status: 'Healthy', lastCheck: '2023-10-10', doctor: 'Dr. M. Khan' },
  ];

  const columns = ['Animal ID', 'Species', 'Age', 'Health Status', 'Last Check-up', 'Assigned Doctor', 'Actions'];

  return (
    <div>
      <PageHeader 
        title="Animal Health Reports" 
        subtitle="Detailed health logs and veterinary check-up history."
        actions={
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2" /> Filter Records
          </button>
        }
      />
      <DataTable 
        columns={columns} 
        data={mockData} 
        renderRow={(item, idx) => (
          <tr key={idx} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-900">{item.id}</td>
            <td className="px-6 py-4">{item.species}</td>
            <td className="px-6 py-4">{item.age}</td>
            <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
            <td className="px-6 py-4">{item.lastCheck}</td>
            <td className="px-6 py-4">{item.doctor}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <button className="p-1 text-slate-400 hover:text-emerald-600"><Eye className="h-4 w-4" /></button>
                <button className="p-1 text-slate-400 hover:text-red-600"><Flag className="h-4 w-4" /></button>
              </div>
            </td>
          </tr>
        )} 
      />
    </div>
  );
};

// --- Vaccination View ---
const VaccinationView = () => {
  const chartData = [
    { name: 'FMD', target: 5000, achieved: 4200 },
    { name: 'Brucellosis', target: 3000, achieved: 1500 },
    { name: 'HS', target: 4500, achieved: 4400 },
    { name: 'BQ', target: 4000, achieved: 3200 },
  ];

  const tableData = [
    { disease: 'Foot & Mouth (FMD)', date: '2023-10-01', batch: 'VAC-2023-001', covered: 450, status: 'Completed' },
    { disease: 'Brucellosis', date: '2023-10-05', batch: 'VAC-2023-002', covered: 120, status: 'Pending' },
    { disease: 'Hemorrhagic Sep.', date: '2023-09-28', batch: 'VAC-2023-088', covered: 300, status: 'Completed' },
  ];

  const columns = ['Disease Name', 'Camp Date', 'Batch ID', 'Animals Covered', 'Status', 'Certificates'];

  return (
    <div className="space-y-8">
      <PageHeader title="Vaccination Campaigns" subtitle="Track immunization coverage against targets." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-md">
          <div className="text-emerald-100 text-sm font-semibold uppercase">Overall Coverage</div>
          <div className="text-4xl font-bold mt-2">78%</div>
          <div className="text-xs mt-2 text-emerald-200">Across all major diseases</div>
        </div>
        <StatCard title="Doses Administered" value="12,400" icon={CheckCircle2} color="bg-blue-500" />
        <StatCard title="Pending Targets" value="3,500" icon={CheckCircle2} color="bg-amber-500" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Target vs Achieved</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="target" fill="#e2e8f0" name="Target" radius={[4, 4, 0, 0]} />
              <Bar dataKey="achieved" fill="#10b981" name="Achieved" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={tableData} 
        renderRow={(item, idx) => (
          <tr key={idx} className="hover:bg-slate-50">
            <td className="px-6 py-4 font-semibold text-slate-800">{item.disease}</td>
            <td className="px-6 py-4">{item.date}</td>
            <td className="px-6 py-4 font-mono text-xs">{item.batch}</td>
            <td className="px-6 py-4">{item.covered}</td>
            <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
            <td className="px-6 py-4 text-emerald-600 cursor-pointer hover:underline">Download</td>
          </tr>
        )} 
      />
    </div>
  );
};

// --- Farmer View ---
const FarmerView = () => {
  const farmers = [
    { name: 'Ramesh Kumar', id: 'F-101', livestock: 45, village: 'Sonpur', compliant: 'Yes' },
    { name: 'Suresh Patel', id: 'F-102', livestock: 12, village: 'Rampur', compliant: 'No' },
    { name: 'Anita Devi', id: 'F-103', livestock: 28, village: 'Sonpur', compliant: 'Yes' },
  ];

  const columns = ['Farmer Name', 'ID', 'Livestock Count', 'Village', 'Compliance', 'Details'];

  return (
    <div>
      <PageHeader title="Registered Farmers" subtitle="Database of farm owners and herd statistics." />
      <DataTable 
        columns={columns} 
        data={farmers} 
        renderRow={(item, idx) => (
          <tr key={idx} className="hover:bg-slate-50">
            <td className="px-6 py-4 font-medium">{item.name}</td>
            <td className="px-6 py-4 font-mono text-xs text-slate-500">{item.id}</td>
            <td className="px-6 py-4">{item.livestock}</td>
            <td className="px-6 py-4">{item.village}</td>
            <td className="px-6 py-4"><StatusBadge status={item.compliant === 'Yes' ? 'Yes' : 'No'} /></td>
            <td className="px-6 py-4 text-emerald-600 font-medium cursor-pointer">View Profile</td>
          </tr>
        )} 
      />
    </div>
  );
};

// --- Disease View ---
const DiseaseView = () => {
  const outbreaks = [
    { area: 'Sector 4, North District', disease: 'Lumpy Skin Disease', cases: 12, reported: '2023-10-18', status: 'Active' },
    { area: 'Sector 1, East Valley', disease: 'Mastitis Outbreak', cases: 5, reported: '2023-10-15', status: 'Active' },
    { area: 'Sector 9, West Farms', disease: 'Foot & Mouth', cases: 45, reported: '2023-09-20', status: 'Resolved' },
  ];

  const columns = ['Affected Area', 'Disease Identified', 'Active Cases', 'Reported Date', 'Status', 'Map View'];

  return (
    <div className="space-y-6">
      <PageHeader title="Disease Surveillance" subtitle="Monitor active outbreaks and containment zones." />
      
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
        <div className="p-3 bg-red-100 rounded-lg text-red-600">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-red-800">Active High Alert</h3>
          <p className="text-red-700 mt-1">Lumpy Skin Disease detected in North District. Quarantine protocols initiated for 3 farms.</p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={outbreaks} 
        renderRow={(item, idx) => (
          <tr key={idx} className="hover:bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-900">{item.area}</td>
            <td className="px-6 py-4 text-red-600 font-medium">{item.disease}</td>
            <td className="px-6 py-4">{item.cases}</td>
            <td className="px-6 py-4">{item.reported}</td>
            <td className="px-6 py-4">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-green-100 text-green-700'}`}>
                {item.status}
              </span>
            </td>
            <td className="px-6 py-4 text-blue-600 cursor-pointer"><MapPin className="h-4 w-4" /></td>
          </tr>
        )} 
      />
    </div>
  );
};

// --- Feed View ---
const FeedView = () => {
  const data = [
    { day: 'Mon', consumption: 4000 },
    { day: 'Tue', consumption: 3000 },
    { day: 'Wed', consumption: 2000 },
    { day: 'Thu', consumption: 2780 },
    { day: 'Fri', consumption: 1890 },
    { day: 'Sat', consumption: 2390 },
    { day: 'Sun', consumption: 3490 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Feed & Nutrition" subtitle="Inventory management and consumption analytics." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Current Stock" value="45.2 Tons" icon={Wheat} color="bg-amber-500" />
        <StatCard title="Daily Avg. Usage" value="1.2 Tons" icon={TrendingDown} color="bg-blue-500" />
        <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex flex-col justify-center">
          <div className="text-red-800 font-bold text-lg">Stock Low Alert</div>
          <p className="text-red-600 text-sm mt-1">Concentrate feed below 10% threshold.</p>
          <button className="mt-3 bg-red-600 text-white text-xs py-2 px-4 rounded-lg self-start">Reorder Now</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Weekly Consumption Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorFeed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="consumption" stroke="#f59e0b" fillOpacity={1} fill="url(#colorFeed)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- Downloads View ---
const DownloadsView = () => {
  const files = [
    { name: 'Monthly Health Summary (Oct 2023)', type: 'PDF', size: '2.4 MB', date: '2023-11-01', color: 'text-red-500 bg-red-50' },
    { name: 'Vaccination Coverage Report Q3', type: 'Excel', size: '1.1 MB', date: '2023-10-15', color: 'text-green-500 bg-green-50' },
    { name: 'Farmer Registry Backup', type: 'CSV', size: '500 KB', date: '2023-11-05', color: 'text-blue-500 bg-blue-50' },
    { name: 'Disease Outbreak Analysis', type: 'PDF', size: '4.2 MB', date: '2023-09-30', color: 'text-red-500 bg-red-50' },
  ];

  return (
    <div>
      <PageHeader title="Download Center" subtitle="Access and export system generated reports." />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase">
          <div className="col-span-6">File Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Date Generated</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        
        <div className="divide-y divide-slate-50">
          {files.map((file, idx) => (
            <div key={idx} className="p-6 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors">
              <div className="col-span-6 flex items-center gap-4">
                <div className={`p-3 rounded-lg ${file.color}`}>
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{file.name}</h4>
                  <span className="text-xs text-slate-400">{file.size}</span>
                </div>
              </div>
              <div className="col-span-2 text-sm text-slate-600">{file.type}</div>
              <div className="col-span-2 text-sm text-slate-600">{file.date}</div>
              <div className="col-span-2 text-right">
                <button className="text-slate-400 hover:text-emerald-600 transition-colors p-2 hover:bg-emerald-50 rounded-full">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN REPORTING PORTAL CONTAINER
// ==========================================

const Reporting = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'health', name: 'Animal Health', icon: Stethoscope },
    { id: 'vaccinations', name: 'Vaccinations', icon: Syringe },
    { id: 'farmers', name: 'Farmers', icon: Users },
    { id: 'diseases', name: 'Disease Tracking', icon: AlertTriangle },
    { id: 'feed', name: 'Feed & Nutrition', icon: Wheat },
    { id: 'downloads', name: 'Downloads', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardView />;
      case 'health': return <HealthView />;
      case 'vaccinations': return <VaccinationView />;
      case 'farmers': return <FarmerView />;
      case 'diseases': return <DiseaseView />;
      case 'feed': return <FeedView />;
      case 'downloads': return <DownloadsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-50 pt-20">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col fixed top-20 bottom-0 h-[calc(100vh-80px)] overflow-y-auto z-10">
        <div className="p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Reporting Portal
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6 mt-auto border-t border-slate-100">
          <div className="bg-slate-900 rounded-xl p-4 text-white shadow-lg">
            <h4 className="font-bold text-sm">Need Help?</h4>
            <p className="text-xs text-slate-400 mt-1">Contact IT support for data discrepancies.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
export default Reporting;


 