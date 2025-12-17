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
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userRole = user?.role || "participant";

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
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <span className="text-lg font-bold">Hackathon Portal</span>
              </Link>

              <div className="hidden items-center gap-1 lg:flex">
                {getNavItems().map((group) => (
                  <DropdownMenu key={group.label}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-1">
                        {group.label}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {group.items.map((item) => (
                        <DropdownMenuItem key={item.url} asChild>
                          <Link href={item.url} className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden md:inline">{user.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/portfolio">Portfolio</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => {}}>Sign In</Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t lg:hidden">
            <div className="container mx-auto px-4 py-4">
              {getNavItems().map((group) => (
                <div key={group.label} className="mb-4">
                  <div className="mb-2 text-sm font-semibold text-muted-foreground">{group.label}</div>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.url}
                        href={item.url}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
