import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Plus,
  Upload,
  Github,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit2,
  Video,
  Image,
  File,
  Figma,
} from "lucide-react";
import { formatDateTime, formatRelativeTime, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { Submission } from "@shared/schema";

const mockSubmissions: (Submission & { hackathonTitle: string; teamName: string; judgeFeedback?: string })[] = [
  {
    id: "sub-1",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    teamId: "team-1",
    teamName: "Tech Titans",
    problemStatementId: "ps-1",
    title: "TrafficFlow AI - Smart Traffic Management",
    description: "An AI-powered traffic management system that uses computer vision and deep learning to optimize signal timings in real-time based on traffic density, reducing congestion by up to 35%.",
    githubUrl: "https://github.com/techtitans/trafficflow-ai",
    figmaUrl: "https://figma.com/file/example",
    demoVideoUrl: "https://youtube.com/watch?v=example",
    liveUrl: "https://trafficflow-ai.vercel.app",
    presentationUrl: "https://slides.com/trafficflow",
    documentUrls: ["https://docs.google.com/document/trafficflow-whitepaper"],
    techStack: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Redis"],
    screenshots: [],
    status: "under_review",
    submittedAt: new Date("2024-12-15T14:30:00"),
    version: 2,
    aiQualityScore: 78,
    aiPlagiarismScore: 95,
    aiFeedback: "Strong technical implementation with innovative ML approach. Consider adding more documentation for the API endpoints.",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "sub-2",
    hackathonId: "3",
    hackathonTitle: "FinTech Innovation Sprint",
    teamId: "team-1",
    teamName: "Tech Titans",
    problemStatementId: "ps-fintech-1",
    title: "PaySecure - UPI Fraud Detection System",
    description: "A real-time fraud detection system for UPI transactions using machine learning algorithms to identify suspicious patterns and prevent financial fraud.",
    githubUrl: "https://github.com/techtitans/paysecure",
    figmaUrl: null,
    demoVideoUrl: "https://youtube.com/watch?v=paysecure-demo",
    liveUrl: null,
    presentationUrl: null,
    documentUrls: null,
    techStack: ["Python", "Scikit-learn", "Flask", "MongoDB"],
    screenshots: null,
    status: "scored",
    submittedAt: new Date("2024-11-20T16:45:00"),
    version: 1,
    aiQualityScore: 85,
    aiPlagiarismScore: 98,
    aiFeedback: null,
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-20"),
    judgeFeedback: "Excellent implementation of ML algorithms for fraud detection. The model shows promising accuracy rates.",
  },
];

const mockActiveHackathons = [
  {
    id: "1",
    title: "Smart India Hackathon 2025",
    deadline: new Date("2025-02-22T23:59:00"),
    teamId: "team-1",
    hasSubmission: true,
    submissionId: "sub-1",
  },
  {
    id: "2",
    title: "TechnoVerse AI Challenge",
    deadline: new Date("2025-02-03T23:59:00"),
    teamId: "team-2",
    hasSubmission: false,
    submissionId: null,
  },
];

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState("my-submissions");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<string | null>(null);

  const { data: submissions } = useQuery({
    queryKey: ["/api/submissions"],
    queryFn: () => Promise.resolve(mockSubmissions),
  });

  const { data: activeHackathons } = useQuery({
    queryKey: ["/api/hackathons/active"],
    queryFn: () => Promise.resolve(mockActiveHackathons),
  });

  const getTimeUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diff < 0) return "Deadline passed";
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-submissions-title">
                Submissions
              </h1>
              <p className="text-muted-foreground">
                Manage and track your hackathon submissions
              </p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-new-submission">
                  <Plus className="mr-2 h-4 w-4" />
                  New Submission
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Submission</DialogTitle>
                  <DialogDescription>
                    Submit your project for a hackathon
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] space-y-4 overflow-y-auto py-4">
                  <div className="space-y-2">
                    <Label>Select Hackathon</Label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={selectedHackathon || ""}
                      onChange={(e) => setSelectedHackathon(e.target.value)}
                      data-testid="select-hackathon"
                    >
                      <option value="">Select a hackathon</option>
                      {activeHackathons?.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input id="project-title" placeholder="Enter your project title" data-testid="input-project-title" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      placeholder="Describe your project, its features, and how it solves the problem..."
                      rows={4}
                      data-testid="input-project-description"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="github-url">
                        <Github className="mr-1 inline-block h-4 w-4" />
                        GitHub Repository
                      </Label>
                      <Input id="github-url" placeholder="https://github.com/..." data-testid="input-github-url" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="figma-url">
                        <Figma className="mr-1 inline-block h-4 w-4" />
                        Figma/Design Link
                      </Label>
                      <Input id="figma-url" placeholder="https://figma.com/..." data-testid="input-figma-url" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="demo-video">
                        <Video className="mr-1 inline-block h-4 w-4" />
                        Demo Video URL
                      </Label>
                      <Input id="demo-video" placeholder="https://youtube.com/..." data-testid="input-demo-video" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="live-url">
                        <ExternalLink className="mr-1 inline-block h-4 w-4" />
                        Live Demo URL
                      </Label>
                      <Input id="live-url" placeholder="https://..." data-testid="input-live-url" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tech-stack">Tech Stack (comma-separated)</Label>
                    <Input
                      id="tech-stack"
                      placeholder="React, Node.js, PostgreSQL, TensorFlow..."
                      data-testid="input-tech-stack"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Files</Label>
                    <div className="rounded-lg border-2 border-dashed p-6 text-center">
                      <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop files here, or click to browse
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Supports: PDF, Images, ZIP (Max 50MB)
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Save as Draft
                  </Button>
                  <Button data-testid="button-submit-project">
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="my-submissions" data-testid="tab-my-submissions">
              My Submissions
            </TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">
              Pending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-submissions" className="space-y-6">
            {submissions && submissions.length > 0 ? (
              submissions.map((submission) => (
                <Card key={submission.id} data-testid={`card-submission-${submission.id}`}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-lg">{submission.title}</CardTitle>
                          <Badge className={getStatusColor(submission.status || "draft")}>
                            {getStatusLabel(submission.status || "draft")}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {submission.hackathonTitle} • {submission.teamName}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Button>
                        {submission.status === "draft" && (
                          <Button variant="outline" size="sm">
                            <Edit2 className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{submission.description}</p>

                    {/* Tech Stack */}
                    {submission.techStack && submission.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {submission.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap gap-2">
                      {submission.githubUrl && (
                        <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Github className="mr-1 h-4 w-4" />
                            Repository
                          </Button>
                        </a>
                      )}
                      {submission.liveUrl && (
                        <a href={submission.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-1 h-4 w-4" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                      {submission.demoVideoUrl && (
                        <a href={submission.demoVideoUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Video className="mr-1 h-4 w-4" />
                            Demo Video
                          </Button>
                        </a>
                      )}
                      {submission.figmaUrl && (
                        <a href={submission.figmaUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Image className="mr-1 h-4 w-4" />
                            Design
                          </Button>
                        </a>
                      )}
                    </div>

                    {/* AI Scores */}
                    {(submission.aiQualityScore || submission.aiPlagiarismScore) && (
                      <div className="grid gap-4 rounded-lg bg-muted p-4 sm:grid-cols-2">
                        {submission.aiQualityScore && (
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>AI Quality Score</span>
                              <span className="font-medium">{submission.aiQualityScore}/100</span>
                            </div>
                            <Progress value={submission.aiQualityScore} className="h-2" />
                          </div>
                        )}
                        {submission.aiPlagiarismScore && (
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Originality Score</span>
                              <span className="font-medium">{submission.aiPlagiarismScore}%</span>
                            </div>
                            <Progress value={submission.aiPlagiarismScore} className="h-2" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* AI Feedback */}
                    {submission.aiFeedback && (
                      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                        <p className="mb-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                          AI Feedback
                        </p>
                        <p className="text-sm">{submission.aiFeedback}</p>
                      </div>
                    )}

                    {/* Judge Feedback */}
                    {submission.judgeFeedback && (
                      <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                        <p className="mb-1 text-xs font-medium text-green-600 dark:text-green-400">
                          Judge Feedback
                        </p>
                        <p className="text-sm">{submission.judgeFeedback}</p>
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      {submission.submittedAt && (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Submitted {formatRelativeTime(submission.submittedAt)}
                        </span>
                      )}
                      <span>Version {submission.version}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center py-12">
                  <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">No Submissions Yet</h3>
                  <p className="mb-4 text-center text-muted-foreground">
                    Start working on your hackathon project and submit it here
                  </p>
                  <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Submission
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <p className="mb-4 text-sm text-muted-foreground">
              Hackathons where you haven't submitted yet:
            </p>
            {activeHackathons?.filter((h) => !h.hasSubmission).map((hackathon) => (
              <Card key={hackathon.id} data-testid={`card-pending-${hackathon.id}`}>
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div>
                    <h3 className="font-semibold">{hackathon.title}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{getTimeUntilDeadline(hackathon.deadline)}</span>
                    </div>
                  </div>
                  <Button onClick={() => {
                    setSelectedHackathon(hackathon.id);
                    setCreateDialogOpen(true);
                  }}>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Now
                  </Button>
                </CardContent>
              </Card>
            ))}

            {!activeHackathons?.filter((h) => !h.hasSubmission).length && (
              <Card>
                <CardContent className="flex flex-col items-center py-12">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
                  <h3 className="mb-2 font-semibold">All Caught Up!</h3>
                  <p className="text-center text-muted-foreground">
                    You've submitted to all your active hackathons
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
