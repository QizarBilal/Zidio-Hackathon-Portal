import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Award,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Building2,
  ExternalLink,
  Calendar,
  Share2,
  Download,
  Edit2,
  Star,
  Target,
  Code2,
  Briefcase,
} from "lucide-react";
import { formatDate, getInitials, formatNumber } from "@/lib/utils";

const mockPortfolio = {
  user: {
    id: "user-1",
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    profileImage: null,
    bio: "Full-stack developer passionate about building innovative solutions. Currently pursuing B.Tech in Computer Science from IIT Delhi. Experienced in AI/ML, Web Development, and Cloud Technologies.",
    organization: "IIT Delhi",
    designation: "B.Tech Computer Science",
    city: "New Delhi",
    country: "India",
    linkedinUrl: "https://linkedin.com/in/arjunsharma",
    githubUrl: "https://github.com/arjunsharma",
    skills: ["React", "Node.js", "Python", "TensorFlow", "PostgreSQL", "AWS", "Docker", "TypeScript"],
  },
  stats: {
    hackathonsParticipated: 12,
    projectsSubmitted: 15,
    certificatesEarned: 8,
    winningPositions: 3,
  },
  achievements: [
    { id: "a1", title: "Grand Prize Winner", hackathon: "Smart India Hackathon 2024", date: new Date("2024-03-15") },
    { id: "a2", title: "2nd Runner Up", hackathon: "FinTech Innovation Sprint", date: new Date("2024-02-20") },
    { id: "a3", title: "Best Innovation Award", hackathon: "GreenTech Challenge", date: new Date("2024-01-10") },
  ],
  projects: [
    {
      id: "p1",
      title: "TrafficFlow AI",
      hackathon: "Smart India Hackathon 2024",
      description: "AI-powered traffic management system reducing congestion by 35%",
      techStack: ["Python", "TensorFlow", "React", "FastAPI"],
      githubUrl: "https://github.com/techtitans/trafficflow-ai",
      liveUrl: "https://trafficflow-ai.vercel.app",
      status: "winner",
      score: 456,
    },
    {
      id: "p2",
      title: "PaySecure",
      hackathon: "FinTech Innovation Sprint",
      description: "Real-time UPI fraud detection using ML algorithms",
      techStack: ["Python", "Scikit-learn", "Flask", "MongoDB"],
      githubUrl: "https://github.com/techtitans/paysecure",
      liveUrl: null,
      status: "runner_up",
      score: 398,
    },
    {
      id: "p3",
      title: "EcoTrack",
      hackathon: "GreenTech Challenge",
      description: "Personal carbon footprint monitoring and reduction app",
      techStack: ["React Native", "Node.js", "PostgreSQL"],
      githubUrl: "https://github.com/techtitans/ecotrack",
      liveUrl: "https://ecotrack.app",
      status: "special_mention",
      score: 385,
    },
  ],
  skillDistribution: [
    { skill: "Backend Development", level: 90 },
    { skill: "Frontend Development", level: 85 },
    { skill: "Machine Learning", level: 75 },
    { skill: "Cloud & DevOps", level: 70 },
    { skill: "Mobile Development", level: 60 },
  ],
};

export default function PortfolioPage() {
  const { user: authUser } = useAuth();

  const { data: portfolio } = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: () => Promise.resolve(mockPortfolio),
  });

  if (!portfolio) return null;

  const { user, stats, achievements, projects, skillDistribution } = portfolio;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="relative h-32 bg-gradient-to-r from-primary/80 to-primary sm:h-48">
        <div className="absolute -bottom-16 left-4 sm:left-8">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user.profileImage || undefined} />
            <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <Button variant="secondary" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
          <Button variant="secondary" size="sm">
            <Edit2 className="mr-1 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 sm:px-8">
        {/* Profile Info */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-portfolio-name">
            {user.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {user.organization && (
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {user.organization}
              </span>
            )}
            {user.city && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {user.city}, {user.country}
              </span>
            )}
          </div>
          <p className="mt-3 max-w-2xl text-muted-foreground">{user.bio}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {user.linkedinUrl && (
              <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Linkedin className="mr-1 h-4 w-4" />
                  LinkedIn
                </Button>
              </a>
            )}
            {user.githubUrl && (
              <a href={user.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Github className="mr-1 h-4 w-4" />
                  GitHub
                </Button>
              </a>
            )}
            <a href={`mailto:${user.email}`}>
              <Button variant="outline" size="sm">
                <Mail className="mr-1 h-4 w-4" />
                Contact
              </Button>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.hackathonsParticipated}</p>
                <p className="text-sm text-muted-foreground">Hackathons</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.projectsSubmitted}</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <Award className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.certificatesEarned}</p>
                <p className="text-sm text-muted-foreground">Certificates</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.winningPositions}</p>
                <p className="text-sm text-muted-foreground">Wins</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Skills & Achievements */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Code2 className="h-5 w-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-3">
                  {skillDistribution.map((item) => (
                    <div key={item.skill}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>{item.skill}</span>
                        <span className="text-muted-foreground">{item.level}%</span>
                      </div>
                      <Progress value={item.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-3 rounded-lg border p-3">
                      <Trophy className="mt-0.5 h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.hackathon}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(achievement.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="rounded-lg border p-4" data-testid={`card-project-${project.id}`}>
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        <Badge
                          className={
                            project.status === "winner"
                              ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                              : project.status === "runner_up"
                              ? "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                              : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                          }
                        >
                          {project.status === "winner"
                            ? "Winner"
                            : project.status === "runner_up"
                            ? "Runner Up"
                            : "Special Mention"}
                        </Badge>
                      </div>
                      <p className="mb-2 text-sm text-muted-foreground">{project.hackathon}</p>
                      <p className="mb-3 text-sm">{project.description}</p>
                      
                      <div className="mb-3 flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <Github className="mr-1 h-4 w-4" />
                                Code
                              </Button>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <ExternalLink className="mr-1 h-4 w-4" />
                                Demo
                              </Button>
                            </a>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{project.score}</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
