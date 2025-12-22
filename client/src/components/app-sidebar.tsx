import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Search,
  Users,
  Trophy,
  FileText,
  Award,
  User,
  Settings,
  LayoutDashboard,
  ClipboardCheck,
  MessageSquare,
  Building2,
  Briefcase,
  PlusCircle,
  BarChart3,
  Megaphone,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const publicNavItems: NavItem[] = [
  { title: "Home", url: "/", icon: Home },
  { title: "Explore Hackathons", url: "/explore", icon: Search },
];

const participantNavItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Teams", url: "/teams", icon: Users },
  { title: "Submissions", url: "/submissions", icon: FileText },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Certificates", url: "/certificates", icon: Award },
  { title: "My Portfolio", url: "/portfolio", icon: User },
];

const judgeNavItems: NavItem[] = [
  { title: "Judge Dashboard", url: "/judge", icon: ClipboardCheck },
  { title: "Review Submissions", url: "/judge/review", icon: FileText },
];

const mentorNavItems: NavItem[] = [
  { title: "Mentor Dashboard", url: "/mentor", icon: MessageSquare },
  { title: "My Teams", url: "/mentor/teams", icon: Users },
];

const recruiterNavItems: NavItem[] = [
  { title: "Recruiter Hub", url: "/recruiter", icon: Briefcase },
  { title: "Talent Pool", url: "/recruiter/talent", icon: Users },
];

const universityNavItems: NavItem[] = [
  { title: "University Hub", url: "/university", icon: GraduationCap },
  { title: "Host Hackathon", url: "/university/host", icon: PlusCircle },
];

const adminNavItems: NavItem[] = [
  { title: "Admin Panel", url: "/admin", icon: Settings },
  { title: "Manage Hackathons", url: "/admin/hackathons", icon: Building2 },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Announcements", url: "/admin/announcements", icon: Megaphone },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userRole = user?.role || "participant";

  const handleSignOut = () => {
    logout();
    window.location.href = '/';
  };

  const getNavItems = () => {
    const items: { label: string; items: NavItem[] }[] = [
      { label: "Discover", items: publicNavItems },
    ];

    if (isAuthenticated && user) {
      items.push({ label: "Participant", items: participantNavItems });

      if (userRole === "judge" || userRole === "admin") {
        items.push({ label: "Judging", items: judgeNavItems });
      }
      if (userRole === "admin") {
        items.push({ label: "Mentoring", items: mentorNavItems });
        items.push({ label: "Recruiting", items: recruiterNavItems });
        items.push({ label: "University", items: universityNavItems });
        items.push({ label: "Administration", items: adminNavItems });
      }
    }

    return items;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left Side - Logo */}
            <div className="flex items-center w-[180px] sm:w-[200px]">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="text-base sm:text-lg font-bold">ZidioHacks</span>
              </Link>
            </div>

            {/* Center - Navigation Links */}
            <div className="hidden md:flex items-center justify-center gap-1 flex-1">
              <button
                onClick={() => {
                  if (location === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.href = '/';
                  }
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Home
              </button>
              <Link href="/explore">
                <Button variant="ghost" className="font-medium">
                  Explore Hackathons
                </Button>
              </Link>
              <button
                onClick={() => {
                  const section = document.getElementById('why-zidiohacks');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#why-zidiohacks';
                  }
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Why ZidioHacks
              </button>
              <Link href="/contact">
                <Button variant="ghost" className="font-medium">
                  Contact
                </Button>
              </Link>
            </div>

            {/* Right Side - Auth & Theme Toggle */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 w-[180px] sm:w-[200px]">
              <ThemeToggle />
              {isAuthenticated && user ? (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium"
                >
                  Sign Out
                </Button>
              ) : (
                <Link href="/login">
                  <Button className="text-xs sm:text-sm">Login/Signup</Button>
                </Link>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t md:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      window.location.href = '/';
                    }
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent text-left"
                >
                  Home
                </button>
                <Link
                  href="/explore"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Explore Hackathons
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const section = document.getElementById('why-zidiohacks');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#why-zidiohacks';
                    }
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent text-left"
                >
                  Why ZidioHacks
                </button>
                <Link
                  href="/contact"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
