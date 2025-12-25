import React, { useState } from 'react';
import { Menu, Bell, Settings, Palette, HelpCircle, LogOut, Activity, Shield, Clock, TrendingUp, Cpu, Zap, MessageSquare, BarChart3, Upload, FileUp, CheckCircle, X, Search, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../contexts/sidebarContext';
import NotificationDrawer from '../ui/NotificationDrawer';
import HeadlessMenu from '../ui/HeadlessMenu';
import HeadlessPopover from '../ui/HeadlessPopover';

const PageHeader = () => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [isDragging, setIsDragging] = useState(false);

  // --- STYLES ---
  const iconBtnStyle = `
    group relative w-10 h-10 rounded-xl flex items-center justify-center
    border border-transparent bg-white/5 text-zinc-400
    hover:bg-[#BEF264]/10 hover:text-[#BEF264] hover:border-[#BEF264]/20
    active:scale-95 transition-all duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BEF264]/50
  `;

  // --- DATA ---
  const adminMenuItems = [
    {
      section: 'System Ops',
      items: [
        { label: 'Admin Dashboard', icon: <Activity className="w-4 h-4" />, route: '/admin/dashboard' },
        { label: 'System Health', icon: <Shield className="w-4 h-4" />, route: '/admin/health' },
        { label: 'Job Scheduler', icon: <Clock className="w-4 h-4" />, route: '/admin/jobs' },
      ],
    },
    {
      section: 'Intelligence',
      items: [
        { label: 'Predictions Model', icon: <TrendingUp className="w-4 h-4" />, route: '/admin/predictions' },
        { label: 'Data Analyzer', icon: <BarChart3 className="w-4 h-4" />, route: '/admin/stats' },
        { label: 'Neural Networks', icon: <Cpu className="w-4 h-4" />, route: '/admin/models' },
      ],
    },
  ];

  const settingsMenuItems = [
    { label: 'Interface', icon: <Palette className="w-4 h-4" />, onClick: () => console.log('Appearance') },
    { label: 'Support', icon: <HelpCircle className="w-4 h-4" />, onClick: () => console.log('Help') },
    { label: 'Sign Out', icon: <LogOut className="w-4 h-4" />, onClick: () => console.log('Sign out'), danger: true },
  ];

  // --- HANDLERS ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => processFile(e.target.files?.[0]);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };
  const processFile = (file?: File) => {
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      setUploadStatus('idle');
    } else if (file) {
      setUploadStatus('error');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => { setSelectedFile(null); setUploadStatus('idle'); }, 2000);
    }, 1500);
  };

  return (
    <header className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-40 transition-all duration-300">

      {/* LEFT: Search & Mobile Toggle */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-white rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search Bar (Fake) */}
        <div className="hidden md:flex items-center w-full max-w-md relative group">
          <Search className="absolute left-3 w-4 h-4 text-zinc-500 group-focus-within:text-[#BEF264] transition-colors" />
          <input 
            type="text" 
            placeholder="Search matches, teams, stats..." 
            className="w-full bg-[#111] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#BEF264]/30 focus:ring-1 focus:ring-[#BEF264]/30 transition-all"
          />
          <div className="absolute right-3 flex items-center gap-1 pointer-events-none">
            <span className="text-[10px] text-zinc-600 border border-white/10 rounded px-1.5 py-0.5 bg-black/20 font-mono">⌘K</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3 lg:gap-4">

        {/* CSV Upload Popover */}
        <div className="hidden md:block">
          <HeadlessPopover
            button={
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-zinc-700 bg-white/[0.02] hover:bg-[#BEF264]/5 hover:border-[#BEF264]/40 transition-all group">
                <Upload className="w-4 h-4 text-zinc-500 group-hover:text-[#BEF264]" />
                <span className="text-xs font-medium text-zinc-400 group-hover:text-[#BEF264]">Import Data</span>
              </button>
            }
            align="right"
            className="w-96 glass-card border border-white/10 p-0 overflow-hidden shadow-2xl"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileUp className="w-4 h-4 text-[#BEF264]" /> 
                    Data Import
                 </h3>
                 {selectedFile && <button onClick={() => setSelectedFile(null)}><X className="w-4 h-4 text-zinc-500 hover:text-white" /></button>}
              </div>

              {uploadStatus === 'success' ? (
                <div className="py-6 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-white">Upload Complete</p>
                </div>
              ) : (
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={handleDrop}
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
                    ${isDragging ? 'border-[#BEF264] bg-[#BEF264]/5 scale-[0.98]' : 'border-zinc-800 bg-black/20 hover:border-zinc-600'}
                    ${selectedFile ? 'border-[#BEF264]/30 bg-[#BEF264]/5' : ''}
                  `}
                >
                    <input type="file" accept=".csv" onChange={handleFileSelect} className="absolute inset-0 opacity-0 cursor-pointer z-10" />

                    <div className="space-y-2 pointer-events-none">
                       <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center transition-colors ${selectedFile ? 'bg-[#BEF264]/20 text-[#BEF264]' : 'bg-zinc-800 text-zinc-500'}`}>
                          <Upload className="w-5 h-5" />
                       </div>
                       {selectedFile ? (
                         <div>
                            <p className="text-sm font-medium text-white truncate max-w-[200px] mx-auto">{selectedFile.name}</p>
                            <p className="text-xs text-zinc-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                         </div>
                       ) : (
                         <div>
                            <p className="text-sm text-zinc-300">Drag CSV here</p>
                            <p className="text-xs text-zinc-600">or click to browse</p>
                         </div>
                       )}
                    </div>
                </div>
              )}

              {selectedFile && uploadStatus !== 'success' && (
                <button 
                   onClick={handleUpload}
                   disabled={uploadStatus === 'uploading'}
                   className="w-full mt-4 py-2 rounded-lg bg-[#BEF264] hover:bg-[#aadd00] text-black text-xs font-bold uppercase tracking-wide transition-colors flex justify-center items-center gap-2"
                >
                   {uploadStatus === 'uploading' ? <Activity className="w-4 h-4 animate-spin" /> : 'Process File'}
                </button>
              )}
            </div>
          </HeadlessPopover>
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-white/10 hidden md:block" />

        {/* Admin Button */}
        <div className="hidden md:block">
           <HeadlessPopover
              button={
                 <button className={iconBtnStyle} aria-label="Admin Tools">
                    <Shield className="w-5 h-5" strokeWidth={1.5} />
                 </button>
              }
              align="right"
              className="w-72 glass-card-sm border border-white/10 p-2 shadow-xl"
           >
              <div className="space-y-4 p-2">
                 {adminMenuItems.map((section, idx) => (
                    <div key={idx}>
                       <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">{section.section}</h4>
                       <div className="space-y-0.5">
                          {section.items.map((item, i) => (
                             <button key={i} onClick={() => navigate(item.route)} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors group">
                                <span className="text-zinc-500 group-hover:text-[#BEF264] transition-colors">{item.icon}</span>
                                {item.label}
                             </button>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </HeadlessPopover>
        </div>

        {/* Notifications */}
        <button
            onClick={() => setIsNotificationsOpen(true)}
            className={`${iconBtnStyle} ${isNotificationsOpen ? 'text-[#BEF264] bg-[#BEF264]/10' : ''}`}
        >
            <Bell className="w-5 h-5" strokeWidth={1.5} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#BEF264] border-2 border-[#111]"></span>
        </button>

        {/* User Menu */}
        <HeadlessMenu
            button={
               <button className={iconBtnStyle}>
                  <Settings className="w-5 h-5" strokeWidth={1.5} />
               </button>
            }
            items={settingsMenuItems}
            align="right"
            menuClassName="glass-card-sm border border-white/10 w-56"
        />

      </div>

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </header>
  );
};

export default PageHeader;