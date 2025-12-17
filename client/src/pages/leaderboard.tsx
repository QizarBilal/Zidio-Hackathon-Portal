import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trophy,
  Medal,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Target,
  Crown,
} from "lucide-react";
import { getInitials, formatNumber } from "@/lib/utils";

const mockLeaderboard = [
  {
    rank: 1,
    previousRank: 1,
    teamId: "t1",
    teamName: "Code Crusaders",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    projectTitle: "AgriConnect - Farmer's Digital Assistant",
    members: ["Vikram Singh", "Aarti Sharma", "Rahul Kumar", "Pooja Verma"],
    totalScore: 456,
    innovationScore: 95,
    technicalScore: 92,
    presentationScore: 88,
    submissionCount: 3,
    category: "Agriculture",
  },
  {
    rank: 2,
    previousRank: 3,
    teamId: "t2",
    teamName: "Tech Titans",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    projectTitle: "TrafficFlow AI - Smart Traffic Management",
    members: ["Arjun Sharma", "Priya Patel", "Rohit Kumar", "Sneha Gupta"],
    totalScore: 442,
    innovationScore: 90,
    technicalScore: 94,
    presentationScore: 85,
    submissionCount: 2,
    category: "Smart Cities",
  },
  {
    rank: 3,
    previousRank: 2,
    teamId: "t3",
    teamName: "Innovation Hub",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    projectTitle: "HealthSync - Telemedicine Platform",
    members: ["Ananya Krishnan", "Siddharth Nair", "Meera Reddy"],
    totalScore: 438,
    innovationScore: 88,
    technicalScore: 91,
    presentationScore: 90,
    submissionCount: 2,
    category: "Healthcare",
  },
  {
    rank: 4,
    previousRank: 4,
    teamId: "t4",
    teamName: "Binary Brains",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    projectTitle: "EduLearn - Personalized Learning Platform",
    members: ["Karthik Raja", "Divya Joshi", "Amit Patel", "Neha Rao"],
    totalScore: 425,
    innovationScore: 86,
    technicalScore: 88,
    presentationScore: 87,
    submissionCount: 2,
    category: "Education",
  },
  {
    rank: 5,
    previousRank: 7,
    teamId: "t5",
    teamName: "Green Warriors",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    projectTitle: "EcoTrack - Carbon Footprint Monitor",
    members: ["Anjali Verma", "Rohan Gupta", "Priti Singh"],
    totalScore: 418,
    innovationScore: 92,
    technicalScore: 85,
    presentationScore: 82,
    submissionCount: 1,
    category: "CleanTech",
  },
  {
    rank: 6,
    previousRank: 5,
    teamId: "t6",
    teamName: "Cyber Squad",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    projectTitle: "SecureVault - Zero-Trust Security",
    members: ["Manish Thakur", "Kavya Menon", "Aditya Chopra", "Riya Shah"],
    totalScore: 412,
    innovationScore: 84,
    technicalScore: 90,
    presentationScore: 80,
    submissionCount: 2,
    category: "Cybersecurity",
  },
  {
    rank: 7,
    previousRank: 6,
    teamId: "t7",
    teamName: "Data Wizards",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    projectTitle: "InsightAI - Business Analytics",
    members: ["Vishal Kumar", "Simran Kaur", "Akash Bhatt"],
    totalScore: 405,
    innovationScore: 82,
    technicalScore: 86,
    presentationScore: 84,
    submissionCount: 1,
    category: "AI/ML",
  },
  {
    rank: 8,
    previousRank: 10,
    teamId: "t8",
    teamName: "Digital Dynamos",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    projectTitle: "PaySecure - UPI Fraud Detection",
    members: ["Nisha Agarwal", "Rajesh Iyer", "Pooja Sharma", "Arun Nair"],
    totalScore: 398,
    innovationScore: 80,
    technicalScore: 84,
    presentationScore: 86,
    submissionCount: 2,
    category: "FinTech",
  },
];

const hackathonOptions = [
  { id: "1", title: "Smart India Hackathon 2025" },
  { id: "2", title: "TechnoVerse AI Challenge" },
  { id: "3", title: "FinTech Innovation Sprint" },
];

const categoryOptions = [
  "All Categories",
  "Agriculture",
  "Smart Cities",
  "Healthcare",
  "Education",
  "CleanTech",
  "Cybersecurity",
  "AI/ML",
  "FinTech",
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-orange-400" />;
  return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
}

function getTrendIcon(current: number, previous: number) {
  if (current < previous) {
    return (
      <span className="flex items-center gap-0.5 text-xs text-green-600">
        <TrendingUp className="h-3 w-3" />
        {previous - current}
      </span>
    );
  }
  if (current > previous) {
    return (
      <span className="flex items-center gap-0.5 text-xs text-red-500">
        <TrendingDown className="h-3 w-3" />
        {current - previous}
      </span>
    );
  }
  return <Minus className="h-3 w-3 text-muted-foreground" />;
}

export default function LeaderboardPage() {
  const [selectedHackathon, setSelectedHackathon] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const { data: leaderboard } = useQuery({
    queryKey: ["/api/leaderboard", selectedHackathon],
    queryFn: () => Promise.resolve(mockLeaderboard),
  });

  const filteredLeaderboard = leaderboard?.filter((entry) => {
    if (selectedCategory === "All Categories") return true;
    return entry.category === selectedCategory;
  });

  const topThree = filteredLeaderboard?.slice(0, 3) || [];
  const restOfLeaderboard = filteredLeaderboard?.slice(3) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-leaderboard-title">
                Leaderboard
              </h1>
              <p className="text-muted-foreground">
                Real-time rankings of participating teams
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
                <SelectTrigger className="w-[240px]" data-testid="select-hackathon">
                  <SelectValue placeholder="Select hackathon" />
                </SelectTrigger>
                <SelectContent>
                  {hackathonOptions.map((h) => (
                    <SelectItem key={h.id} value={h.id}>
                      {h.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]" data-testid="select-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6">
        {/* Top 3 Podium */}
        {topThree.length >= 3 && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {/* 2nd Place */}
            <div className="order-1 sm:order-1">
              <Card className="h-full border-gray-400/30 bg-gradient-to-b from-gray-400/10 to-transparent">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Medal className="mb-2 h-10 w-10 text-gray-400" />
                  <span className="mb-2 text-2xl font-bold">2nd</span>
                  <div className="mb-2 flex -space-x-2">
                    {topThree[1].members.slice(0, 3).map((member, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs">{getInitials(member)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <h3 className="mb-1 font-semibold">{topThree[1].teamName}</h3>
                  <p className="mb-2 text-sm text-muted-foreground line-clamp-1">
                    {topThree[1].projectTitle}
                  </p>
                  <Badge variant="secondary">{topThree[1].category}</Badge>
                  <div className="mt-4 text-3xl font-bold">{topThree[1].totalScore}</div>
                  <p className="text-xs text-muted-foreground">points</p>
                </CardContent>
              </Card>
            </div>

            {/* 1st Place */}
            <div className="order-0 sm:order-0 sm:-mt-4">
              <Card className="h-full border-yellow-500/30 bg-gradient-to-b from-yellow-500/10 to-transparent">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Crown className="mb-2 h-12 w-12 text-yellow-500" />
                  <span className="mb-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">1st</span>
                  <div className="mb-2 flex -space-x-2">
                    {topThree[0].members.slice(0, 4).map((member, i) => (
                      <Avatar key={i} className="h-10 w-10 border-2 border-background">
                        <AvatarFallback className="text-xs">{getInitials(member)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{topThree[0].teamName}</h3>
                  <p className="mb-2 text-sm text-muted-foreground line-clamp-1">
                    {topThree[0].projectTitle}
                  </p>
                  <Badge variant="secondary">{topThree[0].category}</Badge>
                  <div className="mt-4 text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                    {topThree[0].totalScore}
                  </div>
                  <p className="text-xs text-muted-foreground">points</p>
                </CardContent>
              </Card>
            </div>

            {/* 3rd Place */}
            <div className="order-2 sm:order-2">
              <Card className="h-full border-orange-400/30 bg-gradient-to-b from-orange-400/10 to-transparent">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Medal className="mb-2 h-10 w-10 text-orange-400" />
                  <span className="mb-2 text-2xl font-bold">3rd</span>
                  <div className="mb-2 flex -space-x-2">
                    {topThree[2].members.slice(0, 3).map((member, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs">{getInitials(member)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <h3 className="mb-1 font-semibold">{topThree[2].teamName}</h3>
                  <p className="mb-2 text-sm text-muted-foreground line-clamp-1">
                    {topThree[2].projectTitle}
                  </p>
                  <Badge variant="secondary">{topThree[2].category}</Badge>
                  <div className="mt-4 text-3xl font-bold">{topThree[2].totalScore}</div>
                  <p className="text-xs text-muted-foreground">points</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Rank</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="hidden md:table-cell">Project</TableHead>
                    <TableHead className="hidden lg:table-cell">Category</TableHead>
                    <TableHead className="text-center">Innovation</TableHead>
                    <TableHead className="text-center">Technical</TableHead>
                    <TableHead className="text-center">Presentation</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaderboard?.map((entry) => (
                    <TableRow key={entry.teamId} data-testid={`row-team-${entry.teamId}`}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                          {getTrendIcon(entry.rank, entry.previousRank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-1">
                            {entry.members.slice(0, 2).map((member, i) => (
                              <Avatar key={i} className="h-6 w-6 border border-background">
                                <AvatarFallback className="text-xs">{getInitials(member)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <div>
                            <p className="font-medium">{entry.teamName}</p>
                            <p className="text-xs text-muted-foreground">
                              <Users className="mr-1 inline h-3 w-3" />
                              {entry.members.length} members
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden max-w-[200px] md:table-cell">
                        <p className="truncate text-sm">{entry.projectTitle}</p>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="secondary">{entry.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">{entry.innovationScore}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">{entry.technicalScore}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">{entry.presentationScore}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-lg font-bold">{entry.totalScore}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
