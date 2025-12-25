import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  Upload,
  FileUp,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function Header() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [isDragging, setIsDragging] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const processFile = (file?: File) => {
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
      setUploadStatus("idle");
    } else if (file) {
      setUploadStatus("error");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("success");
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus("idle");
      }, 2000);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-x-4 gap-y-4 border-b border-white/5 bg-[#090a0b]/80 px-4 backdrop-blur-xl lg:h-20 lg:px-8">
      <div className="flex flex-1 items-center gap-4">
        {/* Global search */}
        <div className="group relative hidden w-full max-w-md items-center md:flex">
          <label htmlFor="global-search" className="sr-only">
            Search
          </label>
          <Search
            size={16}
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-[#bef264]"
          />
          <input
            id="global-search"
            type="text"
            placeholder="Search matches, teams, stats..."
            className="w-full rounded-xl border border-white/5 bg-[#020617] py-2 pl-10 pr-12 text-sm text-white placeholder-zinc-600 transition-all focus:border-[#bef264]/30 focus:outline-none focus:ring-1 focus:ring-[#bef264]/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* CSV Upload Button */}
        <div className="hidden md:block relative group">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-zinc-700 bg-white/[0.02] hover:bg-[#bef264]/5 hover:border-[#bef264]/40 transition-all">
            <Upload
              size={16}
              className="text-zinc-500 group-hover:text-[#bef264]"
            />
            <span className="text-xs font-medium text-zinc-400 group-hover:text-[#bef264]">
              Import Data
            </span>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-80 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all p-0">
            <div className="bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileUp size={16} className="text-[#bef264]" />
                    Data Import
                  </h3>
                  {selectedFile && (
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-zinc-500 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {uploadStatus === "success" ? (
                  <div className="py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle size={24} />
                    </div>
                    <p className="text-sm font-medium text-white">
                      Upload Complete
                    </p>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      isDragging
                        ? "border-[#bef264] bg-[#bef264]/5"
                        : "border-zinc-800 bg-black/20"
                    } ${
                      selectedFile ? "border-[#bef264]/30 bg-[#bef264]/5" : ""
                    }`}
                  >
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />

                    <div className="space-y-2 pointer-events-none">
                      <div
                        className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center transition-colors ${
                          selectedFile
                            ? "bg-[#bef264]/20 text-[#bef264]"
                            : "bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        <Upload size={20} />
                      </div>
                      {selectedFile ? (
                        <div>
                          <p className="text-sm font-medium text-white truncate max-w-[200px] mx-auto">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-zinc-300">Drag CSV here</p>
                          <p className="text-xs text-zinc-600">
                            or click to browse
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedFile && uploadStatus !== "success" && (
                  <button
                    onClick={handleUpload}
                    disabled={uploadStatus === "uploading"}
                    className="w-full mt-4 py-2 rounded-lg bg-[#bef264] hover:bg-[#aadd00] text-black text-xs font-bold uppercase tracking-wide transition-colors flex justify-center items-center gap-2"
                  >
                    {uploadStatus === "uploading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Process File"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Button */}
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-white/5 text-zinc-400 transition-all duration-200 hover:border-[#bef264]/20 hover:bg-[#bef264]/10 hover:text-[#bef264]"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-[#111] bg-[#bef264]"></span>
        </button>

        {/* User Menu */}
        <div className="relative group">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-white/5 text-zinc-400 transition-all duration-200 hover:border-[#bef264]/20 hover:bg-[#bef264]/10 hover:text-[#bef264]"
            aria-label="User Menu"
          >
            <Settings size={20} strokeWidth={1.5} />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="flex flex-col gap-1 p-2">
                <a
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Shield size={16} />
                  Admin Tools
                </a>
                <a
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <HelpCircle size={16} />
                  Support
                </a>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-rose-500 hover:text-rose-400 hover:bg-rose-500/5 transition-colors w-full text-left">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
