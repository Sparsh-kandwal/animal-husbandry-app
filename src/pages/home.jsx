import React from 'react';
import { 
  Tractor,
  Activity, 
  BarChart3, 
  Calendar, 
  ClipboardList, 
  Bell, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle,
  Play
} from 'lucide-react';

// ==========================================
// HERO SECTION
// ==========================================
const HeroSection = () => {
  return (
    <div className="relative bg-slate-900 min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient & Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2"></span>
              The Future of Farming
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Smart Animal Husbandry <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Management
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              VitalHeard helps livestock owners track health, productivity, breeding cycles, and farm insights with ease. Elevate your farm's efficiency today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-sm flex items-center justify-center">
                <Play className="mr-2 h-5 w-5 fill-current" />
                Watch Demo
              </button>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map((i) => (
                   <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs text-white overflow-hidden">
                      <img src={`https://randomuser.me/api/portraits/men/${20+i}.jpg`} alt="User" />
                   </div>
                 ))}
              </div>
              <div className="text-sm text-slate-400">
                Trusted by <span className="text-white font-bold">1,500+</span> farmers worldwide
              </div>
            </div>
          </div>

          {/* Right Side Illustration/Image */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop" 
                alt="Dashboard Preview" 
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// ==========================================
// FEATURES SECTION
// ==========================================
const FeaturesSection = () => {
  const features = [
    {
      icon: Activity,
      title: "Smart Health Tracking",
      desc: "Monitor vital signs and vaccination schedules automatically.",
      color: "bg-blue-500"
    },
    {
      icon: Calendar,
      title: "Breeding & Cycle",
      desc: "Track insemination, pregnancy, and calving intervals precisely.",
      color: "bg-pink-500"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      desc: "Gain actionable insights into milk yield and herd performance.",
      color: "bg-emerald-500"
    },
    {
      icon: ClipboardList,
      title: "Feed & Nutrition",
      desc: "Optimize feed rations and costs based on growth stages.",
      color: "bg-amber-500"
    },
    {
      icon: ShieldCheck,
      title: "Inventory & Expense",
      desc: "Manage stock levels and track farm expenses in one place.",
      color: "bg-purple-500"
    },
    {
      icon: Bell,
      title: "Alerts & Notifications",
      desc: "Get instant alerts for health issues or low inventory.",
      color: "bg-red-500"
    }
  ];

  return (
    <div id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-3">Powerful Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Everything You Need to Manage Your Herd</h3>
          <p className="text-slate-600 text-lg">
            From health records to financial analytics, VitalHeard provides a comprehensive suite of tools designed for the modern farmer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-6 text-white shadow-md group-hover:scale-110 transition-transform`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// STATISTICS SECTION
// ==========================================
const StatsSection = () => {
  return (
    <div id="stats" className="bg-emerald-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800/50">
          <div className="p-6">
            <div className="text-5xl font-bold text-white mb-2">10,000+</div>
            <div className="text-emerald-200 font-medium uppercase tracking-wider">Animals Tracked</div>
          </div>
          <div className="p-6">
            <div className="text-5xl font-bold text-white mb-2">5 Years</div>
            <div className="text-emerald-200 font-medium uppercase tracking-wider">Of Analytics Data</div>
          </div>
          <div className="p-6">
            <div className="text-5xl font-bold text-white mb-2">1,500+</div>
            <div className="text-emerald-200 font-medium uppercase tracking-wider">Happy Farmers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// WHY CHOOSE SECTION
// ==========================================
const WhyChooseSection = () => {
  const benefits = [
    {
      title: "Accurate Livestock Insights",
      desc: "Make data-driven decisions with real-time analytics on breeding and milk production."
    },
    {
      title: "Real-time Monitoring",
      desc: "Monitor your farm from anywhere. Our cloud-based platform keeps you connected 24/7."
    },
    {
      title: "Secure Data Storage",
      desc: "Your farm data is encrypted and backed up daily, ensuring it's safe and always accessible."
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1974&auto=format&fit=crop" 
              alt="Farmer using tablet" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-3">Why VitalHeard?</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Modernizing Agriculture, <br/>Simplifying Lives.</h3>
            
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button className="text-emerald-700 font-bold flex items-center hover:text-emerald-800 transition-colors">
                Explore all benefits <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// FOOTER SECTION
// ==========================================
const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-600 p-2 rounded-lg mr-2">
                <Tractor className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">VitalHeard</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Empowering farmers with smart technology for a sustainable and profitable future.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-emerald-600">Features</a></li>
              <li><a href="#" className="hover:text-emerald-600">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-600">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-emerald-600">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-600">Contact</a></li>
              <li><a href="#" className="hover:text-emerald-600">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} VitalHeard. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-slate-800">Twitter</a>
             <a href="#" className="hover:text-slate-800">LinkedIn</a>
             <a href="#" className="hover:text-slate-800">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN HOME PAGE COMPONENT
// ==========================================
const Home = () => {
  return (
    <div className="font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <WhyChooseSection />
      <Footer />
    </div>
  );
};

export default Home;