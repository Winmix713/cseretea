import React, { useState, useEffect, useMemo, useCallback, useRef, forwardRef, memo } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Globe, Layers, BarChart2, History, Zap, Trophy,
  RotateCcw, Sparkles, ChevronDown, Check, Search, Loader2, AlertCircle, LucideIcon
} from 'lucide-react';

// =============================================================================
// UTILS (Inlined to remove external dependencies)
// =============================================================================

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// =============================================================================
// CONSTANTS & TYPES
// =============================================================================

type Language = 'en' | 'es' | 'hu';
type LeagueId = 'english' | 'spanish' | 'mixed';

interface Match {
  home: string | null;
  away: string | null;
}

interface NavItemConfig {
  icon: LucideIcon;
  label: string;
  path: string;
  disabled?: boolean;
}

interface LeagueOption {
  id: LeagueId;
  label: string;
  flag: string;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const NAV_ITEMS: NavItemConfig[] = [
  { icon: Layers, label: 'Mérkőzés Választó', path: '/' },
  { icon: BarChart2, label: 'Statisztikák', path: '/stats', disabled: true },
  { icon: History, label: 'Előzmények', path: '/history', disabled: true },
];

const LEAGUE_OPTIONS: readonly LeagueOption[] = [
  { id: 'english', label: 'Angol', flag: '🇬🇧' },
  { id: 'spanish', label: 'Spanyol', flag: '🇪🇸' },
  { id: 'mixed', label: 'Vegyes', flag: '🇬🇧🇪🇸' },
] as const;

const TEAM_LOGOS: Record<string, string> = {
  // English Premier League
  "Aston Lions": "https://resources.premierleague.com/premierleague/badges/50/t7.png",
  "Brentford": "https://resources.premierleague.com/premierleague/badges/50/t94.png",
  "Brighton": "https://resources.premierleague.com/premierleague/badges/50/t36.png",
  "Chelsea": "https://resources.premierleague.com/premierleague/badges/50/t8.png",
  "Crystal Palace": "https://resources.premierleague.com/premierleague/badges/50/t31.png",
  "Everton": "https://resources.premierleague.com/premierleague/badges/50/t11.png",
  "Fulham": "https://resources.premierleague.com/premierleague/badges/50/t54.png",
  "Liverpool": "https://resources.premierleague.com/premierleague/badges/50/t14.png",
  "London Gunners": "https://resources.premierleague.com/premierleague/badges/50/t3.png",
  "Manchester Blues": "https://resources.premierleague.com/premierleague/badges/50/t43.png",
  "Newcastle": "https://resources.premierleague.com/premierleague/badges/50/t4.png",
  "Nottingham": "https://resources.premierleague.com/premierleague/badges/50/t17.png",
  "Tottenham": "https://resources.premierleague.com/premierleague/badges/50/t6.png",
  "Red Devils": "https://resources.premierleague.com/premierleague/badges/50/t1.png",
  "West Ham": "https://resources.premierleague.com/premierleague/badges/50/t21.png",
  "Wolverhampton": "https://resources.premierleague.com/premierleague/badges/50/t39.png",
  // Spanish La Liga
  "Alaves": "https://assets.laliga.com/assets/2019/06/07/small/alaves.png",
  "Barcelona": "https://assets.laliga.com/assets/2019/06/07/small/barcelona.png",
  "Bilbao": "https://assets.laliga.com/assets/2019/06/07/small/athletic.png",
  "Elche": "https://assets.laliga.com/assets/2020/08/24/small/elche.png",
  "Getafe": "https://assets.laliga.com/assets/2019/06/07/small/getafe.png",
  "Girona": "https://assets.laliga.com/assets/2022/06/20/small/girona.png",
  "Real Madrid White": "https://assets.laliga.com/assets/2019/06/07/small/real-madrid.png",
  "Real Madrid Red": "https://assets.laliga.com/assets/2019/06/07/small/atletico.png",
  "Mallorca": "https://assets.laliga.com/assets/2019/06/07/small/mallorca.png",
  "Osasuna": "https://assets.laliga.com/assets/2019/06/07/small/osasuna.png",
  "San Sebastian": "https://assets.laliga.com/assets/2019/06/07/small/real-sociedad.png",
  "Sevilla Red": "https://assets.laliga.com/assets/2019/06/07/small/sevilla.png",
  "Sevilla Green": "https://assets.laliga.com/assets/2019/06/07/small/betis.png",
  "Valencia": "https://assets.laliga.com/assets/2019/06/07/small/valencia.png",
  "Vigo": "https://assets.laliga.com/assets/2019/06/07/small/celta.png",
  "Villarreal": "https://assets.laliga.com/assets/2019/06/07/small/villarreal.png",
};

const LEAGUES_DATA = {
  ENGLISH: [
    "Aston Lions", "Brentford", "Brighton", "Chelsea", "Crystal Palace",
    "Everton", "Fulham", "Liverpool", "London Gunners", "Manchester Blues",
    "Newcastle", "Nottingham", "Tottenham", "Red Devils", "West Ham", "Wolverhampton"
  ],
  SPANISH: [
    "Alaves", "Barcelona", "Bilbao", "Elche", "Getafe", "Girona",
    "Real Madrid White", "Real Madrid Red", "Mallorca", "Osasuna",
    "San Sebastian", "Sevilla Red", "Sevilla Green", "Valencia", "Vigo", "Villarreal"
  ],
};

const TEAMS_BY_LEAGUE: Record<LeagueId, string[]> = {
  english: LEAGUES_DATA.ENGLISH,
  spanish: LEAGUES_DATA.SPANISH,
  mixed: [...LEAGUES_DATA.ENGLISH.slice(0, 10), ...LEAGUES_DATA.SPANISH.slice(0, 10)],
};

const getTeamLogo = (teamName: string): string | null => TEAM_LOGOS[teamName] || null;

// =============================================================================
// PARTICLE CANVAS
// =============================================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
}

const ParticleCanvas = memo(({
  particleCount = 50,
  baseColor = "190, 242, 100",
  speed = 0.5,
  className
}: {
  particleCount?: number;
  baseColor?: string;
  speed?: number;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5,
          targetAlpha: Math.random() * 0.5,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
        if (Math.abs(p.targetAlpha - p.alpha) < 0.01) {
          p.targetAlpha = Math.random() * 0.5;
        }
        p.alpha += (p.targetAlpha - p.alpha) * 0.02;
        ctx.fillStyle = `rgba(${baseColor}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => initCanvas());
    resizeObserver.observe(container);
    initCanvas();
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [particleCount, baseColor, speed]);

  return (
    <div ref={containerRef} className={`fixed inset-0 -z-10 pointer-events-none ${className || ''}`}>
      <canvas ref={canvasRef} />
    </div>
  );
});
ParticleCanvas.displayName = 'ParticleCanvas';

// =============================================================================
// PROGRESS RING
// =============================================================================

const ProgressRing = memo(({
  current,
  total,
  size = 40,
  strokeWidth = 3,
  className,
  showLabel = true
}: {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
}) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  const isComplete = current === total;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {showLabel && (
        <div className="text-right hidden sm:block">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Kész</div>
          <div className="text-xs text-primary font-mono tabular-nums">
            <span className="font-bold">{current}</span>
            <span className="opacity-50">/</span>
            <span>{total}</span>
          </div>
        </div>
      )}
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90 transform">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-zinc-700/50" />
          <circle cx={center} cy={center} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="text-primary transition-all duration-700 ease-out" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("flex items-center justify-center w-full h-full rounded-full transition-all duration-300", isComplete ? "scale-100 opacity-100" : "scale-90 opacity-0")}>
            <Check className="w-3 h-3 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
          </div>
          <div className={cn("absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground transition-all duration-300", isComplete ? "scale-50 opacity-0" : "scale-100 opacity-100")}>
            {current > 0 ? current : 0}
          </div>
        </div>
      </div>
    </div>
  );
});
ProgressRing.displayName = 'ProgressRing';

// =============================================================================
// CONFIRMATION MODAL (Replaces shadcn AlertDialog)
// =============================================================================

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  title: string; 
  description: string; 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 10 }} 
            className="relative w-full max-w-md overflow-hidden rounded-xl bg-zinc-950 border border-white/10 shadow-2xl p-6"
          >
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground mb-2">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-foreground bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Mégse
              </button>
              <button 
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)]"
              >
                Váltás és Törlés
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// =============================================================================
// SIDEBAR
// =============================================================================

const NavItem = ({ item, isActive }: { item: NavItemConfig; isActive: boolean }) => {
  const Component = item.disabled ? 'div' : Link;
  return (
    <Component
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
        item.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white/5 cursor-pointer",
        isActive ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary),0.2)]" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />}
      <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
      <span className="text-sm font-medium">{item.label}</span>
      {item.disabled && <span className="ml-auto text-[9px] uppercase border border-white/10 px-1.5 py-0.5 rounded text-muted-foreground/50">WIP</span>}
    </Component>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="hidden md:flex flex-col w-72 lg:w-80 border-r border-white/5 bg-zinc-950/40 backdrop-blur-xl p-6 z-20 h-full">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-10 group cursor-default select-none">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:bg-primary/30 transition-colors" />
            <div className="relative w-full h-full rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 text-primary fill-primary/20" />
            </div>
          </div>
          <div>
            <h1 className="font-mono text-xl font-bold text-foreground tracking-tight leading-none">
              Neon<span className="text-primary">Select</span>
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 font-semibold">Pro Analytics</span>
          </div>
        </div>
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} isActive={currentPath === item.path} />
          ))}
        </nav>
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-primary text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary" />
            Hogyan működik?
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
            Válassz ki 8 mérkőzést. A <span className="text-foreground font-medium">Neon Engine™</span> optimalizálja a szelvényedet valós idejű adatok alapján.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono border-t border-white/5 pt-4">
        <span className="opacity-50 hover:opacity-100 transition-opacity">v2.4.0-stable</span>
        <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          System Online
        </span>
      </div>
    </aside>
  );
};

// =============================================================================
// LANGUAGE SELECTOR
// =============================================================================

const LanguageSelector = ({ current, onChange }: { current: Language; onChange: (lang: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-medium group"
      >
        <Globe className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />
        <span className="hidden sm:inline text-zinc-300">{LANGUAGES.find(l => l.code === current)?.label}</span>
        <span className="sm:hidden text-lg">{LANGUAGES.find(l => l.code === current)?.flag}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-40 p-1 rounded-xl bg-zinc-900 border border-white/10 shadow-xl backdrop-blur-xl overflow-hidden"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { onChange(lang.code); setIsOpen(false); }}
                className={cn(
                  "flex items-center w-full gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                  current === lang.code ? "bg-primary/10 text-primary" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                <span className="text-base">{lang.flag}</span>
                {lang.label}
                {current === lang.code && <motion.div layoutId="active-lang" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// =============================================================================
// LEAGUE SELECTOR
// =============================================================================

const LeagueSelector = ({ activeLeague, onLeagueChange }: { activeLeague: LeagueId; onLeagueChange: (league: LeagueId) => void }) => {
  return (
    <div className="bg-zinc-800/50 backdrop-blur-sm p-1.5 rounded-2xl border border-white/10 inline-flex items-center gap-1 shadow-inner" role="tablist">
      {LEAGUE_OPTIONS.map((league) => {
        const isActive = activeLeague === league.id;
        return (
          <button
            key={league.id}
            onClick={() => activeLeague !== league.id && onLeagueChange(league.id)}
            role="tab"
            aria-selected={isActive}
            className={cn(
              'relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
              isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-league-bg"
                className="absolute inset-0 bg-primary rounded-xl shadow-neon"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                initial={false}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg leading-none filter drop-shadow-sm">{league.flag}</span>
              <span>{league.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

// =============================================================================
// TEAM DROPDOWN
// =============================================================================

const useMergeRefs = <T,>(...refs: (React.Ref<T> | undefined)[]) => {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) return null;
    return (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') ref(node);
        else if (ref != null) (ref as React.MutableRefObject<T | null>).current = node;
      });
    };
  }, [refs]);
};

const DropdownItem = memo(({ team, isSelected, isHighlighted, onClick, onMouseEnter }: {
  team: string; isSelected: boolean; isHighlighted: boolean; onClick: () => void; onMouseEnter: () => void;
}) => {
  const [imgError, setImgError] = useState(false);
  const logo = getTeamLogo(team);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="option"
      aria-selected={isSelected}
      className={cn('w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors', isHighlighted ? 'bg-zinc-800' : 'bg-transparent', isSelected && 'text-primary')}
    >
      {!imgError && logo ? (
        <img src={logo} alt={`${team} logo`} className="w-4 h-4 object-contain opacity-80" onError={() => setImgError(true)} />
      ) : (
        <div className={cn("w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0", isSelected ? "bg-primary text-primary-foreground" : "bg-zinc-700 text-zinc-400")}>
          {team.charAt(0).toUpperCase()}
        </div>
      )}
      <span className={cn("text-sm truncate flex-1", isSelected ? "text-primary" : "text-zinc-300")}>{team}</span>
      {isSelected && <Check className="ml-auto w-3 h-3 text-primary shrink-0" />}
    </button>
  );
});
DropdownItem.displayName = "DropdownItem";

const TeamDropdown = forwardRef<HTMLDivElement, {
  teams: string[]; value: string | null; onChange: (team: string) => void; placeholder?: string;
  excludeTeam?: string | null; excludeTeams?: string[]; disabled?: boolean; isLoading?: boolean; className?: string;
}>(({ teams, value, onChange, placeholder = "Válassz csapatot...", excludeTeam, excludeTeams, disabled = false, isLoading = false, className }, forwardedRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRefs(containerRef, forwardedRef);

  const filteredTeams = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    const excluded = new Set([...(excludeTeams ?? []), ...(excludeTeam ? [excludeTeam] : [])]);
    return teams.filter((team) => team && team.toLowerCase().includes(normalizedSearch) && !excluded.has(team));
  }, [teams, search, excludeTeam, excludeTeams]);

  useEffect(() => setHighlightedIndex(0), [filteredTeams]);

  const updatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => { window.removeEventListener('scroll', updatePosition, true); window.removeEventListener('resize', updatePosition); };
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target) && dropdownRef.current && !dropdownRef.current.contains(target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) { const timer = setTimeout(() => setSearch(''), 200); return () => clearTimeout(timer); }
    else requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && listRef.current && filteredTeams.length > 0) {
      const activeElement = listRef.current.children[highlightedIndex] as HTMLElement;
      activeElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlightedIndex, isOpen, filteredTeams.length]);

  const handleSelect = (team: string) => { onChange(team); setIsOpen(false); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!isOpen) {
      if (['Enter', 'ArrowDown', ' ', 'Space'].includes(e.key)) { e.preventDefault(); setIsOpen(true); }
      return;
    }
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); if (filteredTeams.length > 0) setHighlightedIndex(prev => Math.min(prev + 1, filteredTeams.length - 1)); break;
      case 'ArrowUp': e.preventDefault(); if (filteredTeams.length > 0) setHighlightedIndex(prev => Math.max(prev - 1, 0)); break;
      case 'Enter': e.preventDefault(); if (filteredTeams.length > 0 && filteredTeams[highlightedIndex]) handleSelect(filteredTeams[highlightedIndex]); break;
      case 'Escape': e.preventDefault(); setIsOpen(false); containerRef.current?.focus(); break;
      case 'Tab': setIsOpen(false); break;
    }
  };

  const selectedLogo = value ? getTeamLogo(value) : null;
  const [selectedImgError, setSelectedImgError] = useState(false);

  return (
    <div ref={mergedRef} className={cn("relative w-full group", className)} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled || isLoading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'flex transition-all duration-200 hover:border-white/10 hover:bg-white/5 truncate dropdown-btn text-sm text-zinc-500 bg-zinc-950/50 w-full border-white/5 border rounded-lg pt-2.5 pr-3 pb-2.5 pl-3 items-center justify-between',
          isOpen && 'border-primary ring-1 ring-primary/20 shadow-lg shadow-primary/5',
          disabled && 'opacity-50 cursor-not-allowed grayscale',
          value && !isOpen && 'bg-zinc-800 border-zinc-600 text-white'
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {value && selectedLogo && !selectedImgError && <img src={selectedLogo} alt="" className="w-5 h-5 object-contain" onError={() => setSelectedImgError(true)} />}
          <span className={cn("truncate flex-1 text-left font-medium", !value && "text-zinc-500")}>{value || placeholder}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground ml-2">
          {isLoading && <Loader2 className="w-4 h-4 text-primary" />}
          <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180 text-primary')} />
        </div>
      </button>
      {createPortal(
        isOpen && !disabled && dropdownPosition && (
          <div ref={dropdownRef} style={{ position: 'fixed', top: dropdownPosition.top, left: dropdownPosition.left, width: dropdownPosition.width, zIndex: 9999 }} className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl min-w-[200px]">
            <div className="relative border-b border-zinc-800 p-2">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input ref={inputRef} type="text" placeholder="Keresés..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg bg-zinc-900 py-2 pl-9 pr-8 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors" onKeyDown={(e) => e.stopPropagation()} />
              {search && <button onClick={() => { setSearch(''); inputRef.current?.focus(); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1 rounded-md hover:bg-zinc-800"><X className="w-3 h-3" /></button>}
            </div>
            <div ref={listRef} role="listbox" className="max-h-56 overflow-y-auto p-1 custom-scrollbar">
              {filteredTeams.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-zinc-500"><AlertCircle className="h-8 w-8 mb-2 opacity-20" /><span className="text-xs">Nincs találat: "{search}"</span></div>
              ) : (
                filteredTeams.map((team, index) => <DropdownItem key={`${team}-${index}`} team={team} isSelected={team === value} isHighlighted={index === highlightedIndex} onClick={() => handleSelect(team)} onMouseEnter={() => setHighlightedIndex(index)} />)
              )}
            </div>
          </div>
        ),
        document.body
      )}
    </div>
  );
});
TeamDropdown.displayName = "TeamDropdown";

// =============================================================================
// MATCH CARD
// =============================================================================

const TeamSelection = ({ label, side, value, onChange, teams, exclude, excludeTeams }: {
  label: string; side: 'home' | 'away'; value: string | null; onChange: (team: string) => void; teams: string[]; exclude: string | null; excludeTeams?: string[];
}) => {
  const isHome = side === 'home';
  const activeColorClass = isHome ? "bg-emerald-500/50" : "bg-rose-500/50";

  return (
    <div className="flex-1 min-w-0 flex flex-col pt-4 md:pt-0">
      <label className={cn("text-[10px] uppercase tracking-widest font-semibold mb-2 block transition-all duration-300", value ? "text-foreground" : "text-muted-foreground/80")}>{label}</label>
      <div className="relative group/input">
        <TeamDropdown teams={teams} value={value} onChange={onChange} placeholder={isHome ? "Válassz hazait..." : "Válassz vendéget..."} excludeTeam={exclude} excludeTeams={excludeTeams} />
        <div className={cn("absolute top-1/2 -translate-y-1/2 w-1 h-6 rounded-full blur-[2px] transition-opacity duration-300", isHome ? "-left-3" : "-right-3", value ? activeColorClass : "bg-gray-500/20 opacity-0")} />
      </div>
    </div>
  );
};

const MatchCard = memo(({ index, homeTeam, awayTeam, teams, excludeTeams, onHomeChange, onAwayChange }: {
  index: number; homeTeam: string | null; awayTeam: string | null; teams: string[]; excludeTeams?: string[];
  onHomeChange: (team: string) => void; onAwayChange: (team: string) => void;
}) => {
  const hasHomeTeam = !!homeTeam;
  const hasAwayTeam = !!awayTeam;
  const isComplete = hasHomeTeam && hasAwayTeam;
  const isPartial = (hasHomeTeam || hasAwayTeam) && !isComplete;

  return (
    <div className={cn(
      "group hover:border-white/10 transition-all duration-300 flex bg-zinc-900/40 border border-white/5 rounded-xl pt-3 pr-3 pb-3 pl-3 relative gap-x-3 gap-y-3 items-center",
      "flex-col md:flex-row items-stretch md:items-center",
      isComplete && "border-primary/30",
      isPartial && "border-white/10"
    )}>
      {isComplete && <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }} />}
      <div className="absolute top-3 left-3 md:static md:top-auto md:left-auto shrink-0 z-10">
        <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary border font-mono text-sm font-bold transition-all duration-300", isComplete ? "border-primary shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)]" : "border-primary/20 shadow-[0_0_10px_-3px_rgba(var(--primary),0.3)]")}>{index + 1}</div>
      </div>
      <TeamSelection label="Hazai Csapat" side="home" value={homeTeam} onChange={onHomeChange} teams={teams} exclude={awayTeam} excludeTeams={excludeTeams} />
      <div className="flex items-center justify-center shrink-0 px-2 py-2 md:py-0 relative">
        <div className={cn("relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950 border z-10 transition-all duration-300", isComplete ? "border-primary/30" : "border-border/30")}>
          <span className={cn("text-[10px] font-black tracking-widest transition-colors duration-300", isComplete ? "text-primary" : "text-muted-foreground/50")}>VS</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center -z-0">
          <div className={cn("w-px h-full bg-gradient-to-b from-transparent to-transparent md:hidden transition-colors duration-300", isComplete ? "via-primary/30" : "via-white/5")} />
          <div className={cn("h-px w-full bg-gradient-to-r from-transparent to-transparent hidden md:block transition-colors duration-300", isComplete ? "via-primary/30" : "via-white/5")} />
        </div>
      </div>
      <TeamSelection label="Vendég Csapat" side="away" value={awayTeam} onChange={onAwayChange} teams={teams} exclude={homeTeam} excludeTeams={excludeTeams} />
    </div>
  );
});
MatchCard.displayName = 'MatchCard';

// =============================================================================
// MATCH MANAGER HOOK
// =============================================================================

const useMatchManager = (initialCount: number = 8) => {
  const [league, setLeague] = useState<LeagueId>('english');
  const [matches, setMatches] = useState<Match[]>(Array(initialCount).fill(null).map(() => ({ home: null, away: null })));
  const [pendingLeague, setPendingLeague] = useState<LeagueId | null>(null);

  const currentTeams = useMemo(() => TEAMS_BY_LEAGUE[league], [league]);
  const selectedCount = useMemo(() => matches.reduce((acc, m) => acc + (m.home ? 1 : 0) + (m.away ? 1 : 0), 0), [matches]);
  const isComplete = selectedCount === initialCount * 2;

  const updateMatch = useCallback((index: number, field: keyof Match, value: string) => {
    setMatches(prev => { const newMatches = [...prev]; newMatches[index] = { ...newMatches[index], [field]: value }; return newMatches; });
  }, []);

  const resetMatches = useCallback(() => setMatches(Array(initialCount).fill(null).map(() => ({ home: null, away: null }))), [initialCount]);

  const requestLeagueChange = (newLeague: LeagueId) => {
    if (newLeague === league) return;
    if (selectedCount > 0) setPendingLeague(newLeague);
    else setLeague(newLeague);
  };

  const confirmLeagueChange = () => {
    if (pendingLeague) { setLeague(pendingLeague); resetMatches(); setPendingLeague(null); }
  };

  return { league, matches, currentTeams, selectedCount, isComplete, pendingLeague, setPendingLeague, updateMatch, resetMatches, requestLeagueChange, confirmLeagueChange };
};

// =============================================================================
// MATCH SELECTOR
// =============================================================================

const MatchSelector = ({ 
  matches, 
  league, 
  currentTeams, 
  requestLeagueChange, 
  updateMatch, 
  selectedCount, 
  resetMatches, 
  isComplete 
}: {
  matches: Match[];
  league: LeagueId;
  currentTeams: string[];
  requestLeagueChange: (l: LeagueId) => void;
  updateMatch: (idx: number, f: keyof Match, v: string) => void;
  selectedCount: number;
  resetMatches: () => void;
  isComplete: boolean;
}) => {
  const TOTAL_MATCHES = 8;
  const TOTAL_TEAMS = TOTAL_MATCHES * 2;

  const excludeTeamsByMatch = useMemo(() => {
    const allSelected = matches.flatMap(m => [m.home, m.away]).filter(Boolean) as string[];
    return matches.map((m) => { const keep = new Set([m.home, m.away].filter(Boolean) as string[]); return allSelected.filter((t) => !keep.has(t)); });
  }, [matches]);

  return (
    <div className="flex-1 flex flex-col relative min-w-0 h-full">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0 custom-scrollbar pb-32">
        <div className="glass-panel rounded-2xl p-5 md:p-6 mb-6 border border-white/5 bg-zinc-900/40 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-inner">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Mérkőzések <span className="text-primary">Kiválasztása</span></h2>
                <p className="text-sm text-muted-foreground">Állítsd össze a forduló <span className="text-foreground font-medium">{TOTAL_MATCHES} mérkőzését</span>.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LeagueSelector activeLeague={league} onLeagueChange={requestLeagueChange} />
              <div className="hidden md:flex flex-col items-center justify-center bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-2 min-w-[80px]">
                <span className="text-2xl font-mono font-bold text-foreground">{matches.length}</span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Meccs</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {matches.map((match, index) => (
            <MatchCard key={`${league}-${index}`} index={index} homeTeam={match.home} awayTeam={match.away} teams={currentTeams} excludeTeams={excludeTeamsByMatch[index]} onHomeChange={(team) => updateMatch(index, 'home', team)} onAwayChange={(team) => updateMatch(index, 'away', team)} />
          ))}
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 right-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex flex-col">
              <div className="text-sm font-medium"><span className="text-primary font-mono text-lg">{selectedCount}</span><span className="text-muted-foreground mx-1">/</span><span className="text-muted-foreground">{TOTAL_TEAMS} csapat</span></div>
              <div className="w-full sm:w-48 h-1.5 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300" style={{ width: `${(selectedCount / TOTAL_TEAMS) * 100}%` }} />
              </div>
            </div>
            <button onClick={resetMatches} className="ml-auto sm:ml-4 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-red-400 transition-colors flex items-center gap-2 group bg-zinc-900/50 hover:bg-zinc-900 rounded-lg border border-transparent hover:border-red-500/20" title="Összes törlése">
              <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-180 transition-transform duration-500" />
              <span className="hidden sm:inline">Törlés</span>
            </button>
          </div>
          <button disabled={!isComplete} className={cn('w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5', isComplete ? 'bg-primary text-primary-foreground shadow-[0_0_20px_-5px_rgba(var(--primary),0.4)] hover:shadow-[0_0_25px_-5px_rgba(var(--primary),0.6)] hover:scale-[1.02] active:scale-[0.98]' : 'bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed')}>
            <Sparkles className={cn('w-4 h-4', isComplete && 'animate-pulse')} />
            <span>Predikciók futtatása</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

// =============================================================================
// HERO SECTION - MAIN EXPORT
// =============================================================================

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('hu');

  // Lifted state management
  const { 
    league, 
    matches, 
    currentTeams, 
    selectedCount, 
    isComplete, 
    pendingLeague, 
    setPendingLeague, 
    updateMatch, 
    resetMatches, 
    requestLeagueChange, 
    confirmLeagueChange 
  } = useMatchManager(8);

  const TOTAL_TEAMS = 16; // 8 matches * 2 teams

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-black text-zinc-100 font-sans selection:bg-primary/30 selection:text-primary-foreground overflow-hidden">
      {/* Background Layers */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black -z-20" />
      <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] -z-10" />
      <ParticleCanvas particleCount={40} speed={0.3} className="opacity-60" />

      {/* Main Layout */}
      <div className="flex items-center justify-center min-h-[100dvh] p-0 md:p-4 lg:p-8">
        <main className="w-full max-w-[1600px] h-[100dvh] md:h-[90vh] md:max-h-[1000px] flex flex-col md:flex-row bg-zinc-950/70 md:bg-zinc-950/40 md:backdrop-blur-2xl md:rounded-3xl border-0 md:border border-white/5 shadow-2xl relative overflow-hidden ring-1 ring-white/5">

          {/* Desktop Sidebar */}
          <div className="hidden md:block h-full relative z-20">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" />
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-[80%] max-w-[300px] z-50 md:hidden bg-zinc-950 border-r border-white/10">
                  <div className="p-4 flex justify-end">
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white"><X className="w-6 h-6" /></button>
                  </div>
                  <Sidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <section className="flex-1 flex flex-col relative min-w-0 bg-gradient-to-b from-transparent to-black/20">
            {/* Top Header */}
            <header className="h-16 md:h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-20 bg-zinc-950/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none sticky top-0 md:relative shrink-0">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-primary transition-colors active:scale-95">
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex flex-col">
                  <h2 className="text-sm md:text-lg font-bold text-foreground tracking-tight">Forduló <span className="text-primary/90">Kiválasztása</span></h2>
                  <span className="text-[10px] text-muted-foreground hidden md:block">{new Date().getFullYear()} • Szezon 24/25</span>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-6">
                <LanguageSelector current={currentLang} onChange={setCurrentLang} />
                <div className="h-8 w-px bg-white/10 hidden sm:block" />
                <ProgressRing current={selectedCount} total={TOTAL_TEAMS} size={42} className="scale-90 md:scale-100" />
              </div>
            </header>

            {/* Main Scrollable Content */}
            <div className="flex-1 overflow-hidden relative">
              <MatchSelector 
                matches={matches}
                league={league}
                currentTeams={currentTeams}
                requestLeagueChange={requestLeagueChange}
                updateMatch={updateMatch}
                selectedCount={selectedCount}
                resetMatches={resetMatches}
                isComplete={isComplete}
              />
            </div>
          </section>
        </main>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={!!pendingLeague} 
        onClose={() => setPendingLeague(null)}
        onConfirm={confirmLeagueChange}
        title="Liga Váltása"
        description="Másik ligára váltáskor a jelenlegi kiválasztásaid törlődnek. Biztosan folytatod?"
      />
    </div>
  );
}