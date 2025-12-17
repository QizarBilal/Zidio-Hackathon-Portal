import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClipboardCheck,
  FileText,
  Users,
  Trophy,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Video,
  Send,
  Lightbulb,
  Target,
  Sparkles,
} from "lucide-react";
import { formatDateTime, getInitials, getStatusColor, getStatusLabel } from "@/lib/utils";

const mockJudgeData = {
  stats: {
    assignedSubmissions: 24,
    reviewed: 18,
    pending: 6,
    averageScore: 76,
  },
  hackathons: [
    { id: "1", title: "Smart India Hackathon 2025", status: "judging" },
    { id: "2", title: "TechnoVerse AI Challenge", status: "judging" },
  ],
  pendingSubmissions: [
    {
      id: "sub-1",
      teamName: "Tech Titans",
      projectTitle: "TrafficFlow AI - Smart Traffic Management",
      hackathon: "Smart India Hackathon 2025",
      category: "Smart Cities",
      submittedAt: new Date("2024-12-15T14:30:00"),
      aiScore: 78,
    },
    {
      id: "sub-2",
      teamName: "Code Crusaders",
      projectTitle: "AgriConnect - Farmer's Digital Assistant",
      hackathon: "Smart India Hackathon 2025",
      category: "Agriculture",
      submittedAt: new Date("2024-12-15T16:20:00"),
      aiScore: 82,
    },
    {
      id: "sub-3",
      teamName: "Innovation Hub",
      projectTitle: "HealthSync - Telemedicine Platform",
      hackathon: "Smart India Hackathon 2025",
      category: "Healthcare",
      submittedAt: new Date("2024-12-14T10:45:00"),
      aiScore: 75,
    },
  ],
  currentSubmission: {
    id: "sub-1",
    teamName: "Tech Titans",
    teamMembers: ["Arjun Sharma", "Priya Patel", "Rohit Kumar", "Sneha Gupta"],
    projectTitle: "TrafficFlow AI - Smart Traffic Management",
    description: "An AI-powered traffic management system that uses computer vision and deep learning to optimize signal timings in real-time based on traffic density, reducing congestion by up to 35%.",
    hackathon: "Smart India Hackathon 2025",
    problemStatement: "Smart Traffic Management System",
    category: "Smart Cities",
    techStack: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/techtitans/trafficflow-ai",
    liveUrl: "https://trafficflow-ai.vercel.app",
    demoVideoUrl: "https://youtube.com/watch?v=example",
    submittedAt: new Date("2024-12-15T14:30:00"),
    aiQualityScore: 78,
    aiPlagiarismScore: 95,
    aiFeedback: "Strong technical implementation with innovative ML approach. The solution demonstrates good understanding of traffic patterns and uses appropriate algorithms for optimization.",
    aiSuggestedScores: {
      innovation: 82,
      feasibility: 78,
      technical: 85,
      uiux: 72,
      presentation: 75,
    },
  },
};

export default function JudgeDashboard() {
  const [selectedHackathon, setSelectedHackathon] = useState("1");
  const [activeTab, setActiveTab] = useState("review");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [scores, setScores] = useState({
    innovation: 80,
    feasibility: 75,
    technical: 82,
    uiux: 70,
    presentation: 75,
  });
  const [feedback, setFeedback] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");

  const { data: judgeData } = useQuery({
    queryKey: ["/api/judge/dashboard"],
    queryFn: () => Promise.resolve(mockJudgeData),
  });

  if (!judgeData) return null;

  const { stats, hackathons, pendingSubmissions, currentSubmission } = judgeData;
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleScoreChange = (criterion: keyof typeof scores, value: number[]) => {
    setScores((prev) => ({ ...prev, [criterion]: value[0] }));
  };

  const applyAISuggestions = () => {
    if (currentSubmission.aiSuggestedScores) {
      setScores(currentSubmission.aiSuggestedScores);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-judge-dashboard-title">
                Judge Dashboard
              </h1>
              <p className="text-muted-foreground">
                Review and score hackathon submissions
              </p>
            </div>
            <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select hackathon" />
              </SelectTrigger>
              <SelectContent>
                {hackathons.map((h) => (
                  <SelectItem key={h.id} value={h.id}>
                    {h.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assigned</p>
                <p className="text-2xl font-bold">{stats.assignedSubmissions}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reviewed</p>
                <p className="text-2xl font-bold">{stats.reviewed}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Trophy className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold">{stats.averageScore}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span>Review Progress</span>
              <span className="font-medium">{Math.round((stats.reviewed / stats.assignedSubmissions) * 100)}%</span>
            </div>
            <Progress value={(stats.reviewed / stats.assignedSubmissions) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="review" data-testid="tab-review">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Review Panel
            </TabsTrigger>
            <TabsTrigger value="queue" data-testid="tab-queue">
              <FileText className="mr-2 h-4 w-4" />
              Pending Queue ({stats.pending})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="review">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Submission Details */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Submission Details</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" disabled={currentIndex === 0}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {currentIndex + 1} / {pendingSubmissions.length}
                      </span>
                      <Button variant="outline" size="icon" disabled={currentIndex === pendingSubmissions.length - 1}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{currentSubmission.projectTitle}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{currentSubmission.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        by {currentSubmission.teamName}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">Problem Statement</p>
                    <p className="text-sm">{currentSubmission.problemStatement}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">Description</p>
                    <p className="text-sm text-muted-foreground">{currentSubmission.description}</p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Tech Stack</p>
                    <div className="flex flex-wrap gap-1">
                      {currentSubmission.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Team Members</p>
                    <div className="flex flex-wrap gap-2">
                      {currentSubmission.teamMembers.map((member) => (
                        <div key={member} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{getInitials(member)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentSubmission.githubUrl && (
                      <a href={currentSubmission.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Github className="mr-1 h-4 w-4" />
                          Repository
                        </Button>
                      </a>
                    )}
                    {currentSubmission.liveUrl && (
                      <a href={currentSubmission.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Live Demo
                        </Button>
                      </a>
                    )}
                    {currentSubmission.demoVideoUrl && (
                      <a href={currentSubmission.demoVideoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Video className="mr-1 h-4 w-4" />
                          Demo Video
                        </Button>
                      </a>
                    )}
                  </div>

                  {/* AI Analysis */}
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI Analysis</span>
                    </div>
                    <div className="mb-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Quality Score</p>
                        <p className="text-lg font-bold">{currentSubmission.aiQualityScore}/100</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Originality</p>
                        <p className="text-lg font-bold">{currentSubmission.aiPlagiarismScore}%</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{currentSubmission.aiFeedback}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Scoring Panel */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Scoring</CardTitle>
                    <Button variant="outline" size="sm" onClick={applyAISuggestions}>
                      <Lightbulb className="mr-1 h-4 w-4" />
                      Apply AI Suggestions
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score Sliders */}
                  <div className="space-y-4">
                    {[
                      { key: "innovation", label: "Innovation", weight: 25 },
                      { key: "feasibility", label: "Feasibility", weight: 20 },
                      { key: "technical", label: "Technical Depth", weight: 25 },
                      { key: "uiux", label: "UI/UX", weight: 15 },
                      { key: "presentation", label: "Presentation", weight: 15 },
                    ].map((criterion) => (
                      <div key={criterion.key}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {criterion.label}
                            <span className="ml-1 text-xs text-muted-foreground">({criterion.weight}%)</span>
                          </span>
                          <span className="font-bold">{scores[criterion.key as keyof typeof scores]}</span>
                        </div>
                        <Slider
                          value={[scores[criterion.key as keyof typeof scores]]}
                          onValueChange={(value) => handleScoreChange(criterion.key as keyof typeof scores, value)}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Total Score */}
                  <div className="rounded-lg bg-primary/10 p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Score</p>
                    <p className="text-3xl font-bold">{totalScore}</p>
                    <p className="text-xs text-muted-foreground">out of 500</p>
                  </div>

                  {/* Feedback */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Overall Feedback</label>
                      <Textarea
                        placeholder="Provide constructive feedback for the team..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={3}
                        data-testid="textarea-feedback"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-green-600">Strengths</label>
                        <Textarea
                          placeholder="What did they do well?"
                          value={strengths}
                          onChange={(e) => setStrengths(e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-orange-600">Areas for Improvement</label>
                        <Textarea
                          placeholder="What could be better?"
                          value={improvements}
                          onChange={(e) => setImprovements(e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Save Draft
                    </Button>
                    <Button className="flex-1" data-testid="button-submit-score">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Evaluation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="queue">
            <div className="space-y-4">
              {pendingSubmissions.map((submission) => (
                <Card key={submission.id} data-testid={`card-pending-${submission.id}`}>
                  <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{submission.projectTitle}</h3>
                        <Badge variant="secondary">{submission.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {submission.teamName} • {submission.hackathon}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Submitted {formatDateTime(submission.submittedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">AI Score</p>
                        <p className="text-lg font-bold">{submission.aiScore}</p>
                      </div>
                      <Button onClick={() => setActiveTab("review")}>
                        Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
