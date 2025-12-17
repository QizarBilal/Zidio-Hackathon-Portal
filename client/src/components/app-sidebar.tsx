import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  LogOut,
  Zap,
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

  const userRole = "participant"; // This would come from user profile in real app

  const getNavItems = () => {
    const items: { label: string; items: NavItem[] }[] = [
      { label: "Discover", items: publicNavItems },
    ];

    if (isAuthenticated) {
      items.push({ label: "Participant", items: participantNavItems });

      if (userRole === "judge" || userRole === "admin") {
        items.push({ label: "Judging", items: judgeNavItems });
      }
      if (userRole === "mentor" || userRole === "admin") {
        items.push({ label: "Mentoring", items: mentorNavItems });
      }
      if (userRole === "recruiter" || userRole === "admin") {
        items.push({ label: "Recruiting", items: recruiterNavItems });
      }
      if (userRole === "university" || userRole === "admin") {
        items.push({ label: "University", items: universityNavItems });
      }
      if (userRole === "admin") {
        items.push({ label: "Administration", items: adminNavItems });
      }
    }

    return items;
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Zidio</span>
            <span className="text-xs text-muted-foreground">Hackathon Platform</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {getNavItems().map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                    >
                      <Link href={item.url} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.profileImageUrl || undefined} />
              <AvatarFallback>
                {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
            <a href="/api/logout" data-testid="button-logout">
              <LogOut className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        ) : (
          <a
            href="/api/login"
            className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            data-testid="button-login"
          >
            Sign In
          </a>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
