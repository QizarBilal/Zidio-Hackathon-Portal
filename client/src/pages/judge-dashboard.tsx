import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Trophy,
  Clock,
  CheckCircle2,
  Github,
  ExternalLink,
  Video,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bell,
  FileCheck,
  Award,
  Calendar,
} from "lucide-react";
import { formatDateTime, getInitials } from "@/lib/utils";

const judgeData = {
  profile: {
    name: "Prof. Anjali Mehta",
    role: "Technical Judge",
    organization: "IIT Delhi",
    expertise: ["AI/ML", "Computer Vision", "IoT", "Cloud Computing"],
    totalReviewed: 187,
    currentAssignments: 8,
    averageRating: 4.8,
  },
  stats: {
    assigned: 24,
    reviewed: 18,
    pending: 6,
    avgScore: 76.5,
  },
  assignedHackathons: [
    {
      id: "h1",
      name: "Smart India Hackathon 2025",
      organizer: "Ministry of Education, Govt. of India",
      phase: "Final Round - Evaluation",
      submissionsAssigned: 12,
      reviewed: 8,
      deadline: "Dec 25, 2025",
    },
    {
      id: "h2",
      name: "TechnoVerse AI Challenge",
      organizer: "Google Cloud India",
      phase: "Submission Review",
      submissionsAssigned: 8,
      reviewed: 6,
      deadline: "Dec 22, 2025",
    },
    {
      id: "h3",
      name: "FinTech Innovation Sprint",
      organizer: "NPCI & Razorpay",
      phase: "Pre-Screening",
      submissionsAssigned: 4,
      reviewed: 4,
      deadline: "Dec 20, 2025",
    },
  ],
  pendingSubmissions: [
    {
      id: "sub1",
      hackathonId: "h1",
      hackathonName: "Smart India Hackathon 2025",
      teamName: "Tech Innovators",
      projectTitle: "TrafficFlow AI - Smart Traffic Optimization",
      category: "Smart Cities",
      problemStatement: "Real-time Traffic Management System",
      submittedAt: "Dec 15, 2025, 2:30 PM",
      priority: "high",
      aiPreScore: 82,
    },
    {
      id: "sub2",
      hackathonId: "h1",
      hackathonName: "Smart India Hackathon 2025",
      teamName: "Code Warriors",
      projectTitle: "AgriConnect - Farmer Support Platform",
      category: "Agriculture Technology",
      problemStatement: "Digital Agriculture Solution",
      submittedAt: "Dec 15, 2025, 4:15 PM",
      priority: "medium",
      aiPreScore: 78,
    },
    {
      id: "sub3",
      hackathonId: "h2",
      hackathonName: "TechnoVerse AI Challenge",
      teamName: "AI Architects",
      projectTitle: "HealthBot - AI Medical Assistant",
      category: "Healthcare AI",
      problemStatement: "Accessible Healthcare via AI",
      submittedAt: "Dec 14, 2025, 11:20 AM",
      priority: "high",
      aiPreScore: 85,
    },
  ],
  currentSubmission: {
    id: "sub1",
    teamName: "Tech Innovators",
    teamMembers: ["Arjun Sharma", "Priya Patel", "Rohit Kumar", "Sneha Desai"],
    projectTitle: "TrafficFlow AI - Smart Traffic Optimization",
    description: "AI-powered traffic management system using computer vision and deep learning to optimize signal timings in real-time, reducing urban congestion by up to 40%.",
    problemStatement: "Real-time Traffic Management System",
    category: "Smart Cities",
    techStack: ["Python", "TensorFlow", "OpenCV", "React", "FastAPI", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/techinnovators/trafficflow-ai",
    liveUrl: "https://trafficflow-demo.vercel.app",
    videoUrl: "https://youtube.com/watch?v=demo-video",
    documentationUrl: "https://docs.trafficflow-ai.tech",
    submittedAt: "Dec 15, 2025, 2:30 PM",
    aiAnalysis: {
      qualityScore: 82,
      originalityScore: 95,
      feedback: "Strong technical implementation with innovative ML approach. The solution demonstrates excellent understanding of traffic optimization patterns and uses appropriate deep learning algorithms.",
      suggestedScores: {
        innovation: 85,
        technical: 88,
        feasibility: 80,
        impact: 86,
        presentation: 78,
      },
    },
  },
  recentlyReviewed: [
    {
      id: "rev1",
      projectTitle: "GreenEnergy Monitor",
      teamName: "EcoTech Solutions",
      hackathon: "FinTech Innovation Sprint",
      finalScore: 412,
      reviewedOn: "Dec 16, 2025",
    },
    {
      id: "rev2",
      projectTitle: "EduLearn Platform",
      teamName: "Learning Innovators",
      hackathon: "Smart India Hackathon 2025",
      finalScore: 388,
      reviewedOn: "Dec 15, 2025",
    },
  ],
  upcomingDeadlines: [
    {
      hackathon: "Smart India Hackathon 2025",
      pendingCount: 4,
      deadline: "Dec 25, 2025",
      daysLeft: 6,
    },
    {
      hackathon: "TechnoVerse AI Challenge",
      pendingCount: 2,
      deadline: "Dec 22, 2025",
      daysLeft: 3,
    },
  ],
};

export default function JudgeDashboard() {
  const [, setLocation] = useLocation();
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const [scores, setScores] = useState({
    innovation: 85,
    technical: 88,
    feasibility: 80,
    impact: 86,
    presentation: 78,
  });
  
  const [feedback, setFeedback] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const { data } = useQuery({
    queryKey: ["/api/judge/dashboard"],
    queryFn: () => Promise.resolve(judgeData),
  });

  if (!data) return null;

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleScoreChange = (criterion: keyof typeof scores, value: number[]) => {
    setScores((prev) => ({ ...prev, [criterion]: value[0] }));
  };

  const handleApplyAISuggestions = () => {
    if (data.currentSubmission.aiAnalysis.suggestedScores) {
      setScores(data.currentSubmission.aiAnalysis.suggestedScores);
      console.log("Applied AI suggested scores:", data.currentSubmission.aiAnalysis.suggestedScores);
    }
  };

  const handleStartReview = (submission: any) => {
    setSelectedSubmission(submission);
    setIsReviewDialogOpen(true);
    console.log("Starting review for:", submission.projectTitle);
  };

  const handleSubmitEvaluation = () => {
    if (!feedback.trim()) {
      alert("Please provide feedback before submitting evaluation.");
      return;
    }

    console.log("Submitting evaluation:", {
      submissionId: selectedSubmission?.id,
      scores,
      totalScore,
      feedback,
      strengths,
      improvements,
    });

    alert(`Evaluation submitted successfully!\nTotal Score: ${totalScore}/500\nProject: ${selectedSubmission?.projectTitle}`);
    
    setIsReviewDialogOpen(false);
    setFeedback("");
    setStrengths("");
    setImprovements("");
    setSelectedSubmission(null);
  };

  const handleSaveDraft = () => {
    console.log("Saving evaluation draft:", {
      submissionId: selectedSubmission?.id,
      scores,
      feedback,
      strengths,
      improvements,
    });
    alert("Draft saved successfully!");
  };

  const handleViewSubmission = (submissionId: string) => {
    console.log("Viewing submission details:", submissionId);
    alert(`Opening submission details for ID: ${submissionId}`);
  };

  const handleViewHackathon = (hackathonId: string) => {
    setLocation(`/hackathon/${hackathonId}`);
  };

  const handleNextSubmission = () => {
    if (currentSubmissionIndex < data.pendingSubmissions.length - 1) {
      setCurrentSubmissionIndex(currentSubmissionIndex + 1);
    }
  };

  const handlePreviousSubmission = () => {
    if (currentSubmissionIndex > 0) {
      setCurrentSubmissionIndex(currentSubmissionIndex - 1);
    }
  };

  const currentSubmission = data.pendingSubmissions[currentSubmissionIndex] || data.currentSubmission;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Judge Dashboard</h1>
              <p className="text-muted-foreground">Evaluate hackathon submissions and provide expert feedback</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assigned</p>
                  <p className="text-3xl font-bold mt-2">{data.stats.assigned}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reviewed</p>
                  <p className="text-3xl font-bold mt-2">{data.stats.reviewed}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold mt-2">{data.stats.pending}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Score</p>
                  <p className="text-3xl font-bold mt-2">{data.stats.avgScore}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Review Progress</span>
              <span className="text-sm font-bold">{Math.round((data.stats.reviewed / data.stats.assigned) * 100)}%</span>
            </div>
            <Progress value={(data.stats.reviewed / data.stats.assigned) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Hackathons & Pending */}
          <div className="space-y-6 lg:col-span-2">
            {/* Assigned Hackathons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assigned Hackathons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.assignedHackathons.map((hackathon) => (
                  <div key={hackathon.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{hackathon.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{hackathon.organizer}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">{hackathon.phase}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due {hackathon.deadline}
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{hackathon.reviewed}/{hackathon.submissionsAssigned}</span>
                          </div>
                          <Progress value={(hackathon.reviewed / hackathon.submissionsAssigned) * 100} className="h-1.5" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewHackathon(hackathon.id)}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Submissions Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Reviews ({data.pendingSubmissions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.pendingSubmissions.map((submission) => (
                  <div key={submission.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{submission.projectTitle}</h3>
                          <Badge variant={submission.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {submission.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{submission.teamName}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{submission.category}</Badge>
                          <span className="text-xs text-muted-foreground">{submission.submittedAt}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{submission.hackathonName}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">AI Pre-Score</p>
                          <p className="text-lg font-bold">{submission.aiPreScore}</p>
                        </div>
                        <Button size="sm" onClick={() => handleStartReview(submission)}>
                          Start Review
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile & Recent */}
          <div className="space-y-6">
            {/* Judge Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Judge Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{data.profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{data.profile.role}</p>
                  <p className="text-sm text-muted-foreground">{data.profile.organization}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Areas of Expertise</p>
                  <div className="flex flex-wrap gap-1">
                    {data.profile.expertise.map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold">{data.profile.totalReviewed}</p>
                    <p className="text-xs text-muted-foreground">Total Reviewed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{data.profile.averageRating}</p>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.upcomingDeadlines.map((deadline, idx) => (
                  <div key={idx} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{deadline.hackathon}</p>
                      <Badge variant={deadline.daysLeft <= 3 ? "destructive" : "secondary"}>
                        {deadline.daysLeft}d left
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{deadline.pendingCount} submissions pending</p>
                    <p className="text-xs text-muted-foreground mt-1">Due: {deadline.deadline}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recently Reviewed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recently Reviewed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.recentlyReviewed.map((review) => (
                  <div key={review.id} className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">{review.projectTitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">{review.teamName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">{review.hackathon}</Badge>
                      <span className="text-sm font-bold">{review.finalScore}/500</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{review.reviewedOn}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Dialog */}
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Submission</DialogTitle>
            </DialogHeader>
            {selectedSubmission && (
              <div className="space-y-6 py-4">
                {/* Submission Info */}
                <div>
                  <h3 className="text-xl font-semibold">{data.currentSubmission.projectTitle}</h3>
                  <p className="text-sm text-muted-foreground mt-1">by {data.currentSubmission.teamName}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>{data.currentSubmission.category}</Badge>
                    {data.currentSubmission.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                  <p className="text-sm mt-3">{data.currentSubmission.description}</p>
                </div>

                {/* Resource Links */}
                <div className="flex flex-wrap gap-2">
                  {data.currentSubmission.githubUrl && (
                    <a href={data.currentSubmission.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        Repository
                      </Button>
                    </a>
                  )}
                  {data.currentSubmission.liveUrl && (
                    <a href={data.currentSubmission.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {data.currentSubmission.videoUrl && (
                    <a href={data.currentSubmission.videoUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Video className="mr-2 h-4 w-4" />
                        Demo Video
                      </Button>
                    </a>
                  )}
                </div>

                {/* AI Analysis */}
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI Analysis</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Quality Score</p>
                      <p className="text-lg font-bold">{data.currentSubmission.aiAnalysis.qualityScore}/100</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Originality</p>
                      <p className="text-lg font-bold">{data.currentSubmission.aiAnalysis.originalityScore}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{data.currentSubmission.aiAnalysis.feedback}</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={handleApplyAISuggestions}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Apply AI Suggested Scores
                  </Button>
                </div>

                {/* Scoring Criteria */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Evaluation Criteria</h4>
                  {[
                    { key: "innovation", label: "Innovation & Creativity", weight: 20 },
                    { key: "technical", label: "Technical Implementation", weight: 20 },
                    { key: "feasibility", label: "Feasibility & Scalability", weight: 20 },
                    { key: "impact", label: "Social Impact & Value", weight: 20 },
                    { key: "presentation", label: "Presentation Quality", weight: 20 },
                  ].map((criterion) => (
                    <div key={criterion.key}>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">
                          {criterion.label}
                          <span className="ml-1 text-xs text-muted-foreground">({criterion.weight}%)</span>
                        </Label>
                        <span className="text-sm font-bold">{scores[criterion.key as keyof typeof scores]}/100</span>
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

                {/* Total Score Display */}
                <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-4 text-center border">
                  <p className="text-sm text-muted-foreground">Total Score</p>
                  <p className="text-4xl font-bold mt-1">{totalScore}</p>
                  <p className="text-xs text-muted-foreground mt-1">out of 500</p>
                </div>

                {/* Feedback Section */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="feedback" className="text-sm font-medium">Overall Feedback *</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Provide detailed, constructive feedback for the team..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="strengths" className="text-sm font-medium text-green-600">Key Strengths</Label>
                      <Textarea
                        id="strengths"
                        placeholder="What did they excel at?"
                        value={strengths}
                        onChange={(e) => setStrengths(e.target.value)}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="improvements" className="text-sm font-medium text-orange-600">Areas for Improvement</Label>
                      <Textarea
                        id="improvements"
                        placeholder="What could be enhanced?"
                        value={improvements}
                        onChange={(e) => setImprovements(e.target.value)}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button onClick={handleSubmitEvaluation} disabled={!feedback.trim()}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Submit Evaluation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notifications Sheet */}
        <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Submission Assigned</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You've been assigned to review "HealthBot AI" from TechnoVerse AI Challenge
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Review Deadline Approaching</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      4 submissions for Smart India Hackathon due in 6 days
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Award className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Evaluation Milestone</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Congratulations! You've successfully reviewed 100+ submissions
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
