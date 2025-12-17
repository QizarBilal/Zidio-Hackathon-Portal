import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  Download,
  Share2,
  ExternalLink,
  Calendar,
  Trophy,
  Medal,
  Star,
  CheckCircle2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Certificate } from "@shared/schema";

const mockCertificates: (Certificate & { hackathonTitle: string; teamName?: string; organizerName: string })[] = [
  {
    id: "cert-1",
    hackathonId: "prev-1",
    hackathonTitle: "Smart India Hackathon 2024",
    userId: "user-1",
    teamId: "team-1",
    teamName: "Tech Titans",
    type: "winner",
    rank: 1,
    templateUrl: null,
    certificateUrl: "https://example.com/cert/winner-1.pdf",
    verificationCode: "SIH24-WIN-001",
    issuedAt: new Date("2024-03-15"),
    organizerName: "Ministry of Education",
  },
  {
    id: "cert-2",
    hackathonId: "prev-2",
    hackathonTitle: "FinTech Innovation Sprint 2024",
    userId: "user-1",
    teamId: "team-2",
    teamName: "Digital Dynamos",
    type: "runner_up",
    rank: 2,
    templateUrl: null,
    certificateUrl: "https://example.com/cert/runner-2.pdf",
    verificationCode: "FIS24-RUN-042",
    issuedAt: new Date("2024-02-20"),
    organizerName: "HDFC Bank",
  },
  {
    id: "cert-3",
    hackathonId: "prev-3",
    hackathonTitle: "GreenTech Challenge 2024",
    userId: "user-1",
    teamId: "team-3",
    teamName: "Green Warriors",
    type: "special_mention",
    rank: null,
    templateUrl: null,
    certificateUrl: "https://example.com/cert/special-3.pdf",
    verificationCode: "GTC24-SPL-018",
    issuedAt: new Date("2024-01-10"),
    organizerName: "Tata Trust",
  },
  {
    id: "cert-4",
    hackathonId: "prev-4",
    hackathonTitle: "Web3 Builders 2023",
    userId: "user-1",
    teamId: "team-4",
    teamName: "Blockchain Brigade",
    type: "participation",
    rank: null,
    templateUrl: null,
    certificateUrl: "https://example.com/cert/part-4.pdf",
    verificationCode: "W3B23-PAR-156",
    issuedAt: new Date("2023-11-25"),
    organizerName: "Polygon Labs",
  },
  {
    id: "cert-5",
    hackathonId: "prev-5",
    hackathonTitle: "AI/ML Hackathon 2023",
    userId: "user-1",
    teamId: null,
    teamName: undefined,
    type: "mentor",
    rank: null,
    templateUrl: null,
    certificateUrl: "https://example.com/cert/mentor-5.pdf",
    verificationCode: "AIML23-MNT-007",
    issuedAt: new Date("2023-10-15"),
    organizerName: "IIT Delhi",
  },
];

function getCertificateIcon(type: string) {
  switch (type) {
    case "winner":
      return <Trophy className="h-8 w-8 text-yellow-500" />;
    case "runner_up":
      return <Medal className="h-8 w-8 text-gray-400" />;
    case "special_mention":
      return <Star className="h-8 w-8 text-orange-400" />;
    case "judge":
      return <Award className="h-8 w-8 text-purple-500" />;
    case "mentor":
      return <Award className="h-8 w-8 text-blue-500" />;
    default:
      return <CheckCircle2 className="h-8 w-8 text-green-500" />;
  }
}

function getCertificateLabel(type: string, rank?: number | null): string {
  switch (type) {
    case "winner":
      return rank === 1 ? "Grand Prize Winner" : `${rank}${rank === 2 ? "nd" : rank === 3 ? "rd" : "th"} Place Winner`;
    case "runner_up":
      return "Runner Up";
    case "special_mention":
      return "Special Mention";
    case "judge":
      return "Judge Certificate";
    case "mentor":
      return "Mentor Certificate";
    default:
      return "Participation Certificate";
  }
}

function getCertificateBadgeStyle(type: string): string {
  switch (type) {
    case "winner":
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
    case "runner_up":
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    case "special_mention":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
    case "judge":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
    case "mentor":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    default:
      return "bg-green-500/10 text-green-600 dark:text-green-400";
  }
}

export default function CertificatesPage() {
  const { data: certificates, isLoading } = useQuery({
    queryKey: ["/api/certificates"],
    queryFn: () => Promise.resolve(mockCertificates),
  });

  const stats = {
    total: certificates?.length || 0,
    winners: certificates?.filter((c) => c.type === "winner" || c.type === "runner_up").length || 0,
    special: certificates?.filter((c) => c.type === "special_mention").length || 0,
    participation: certificates?.filter((c) => c.type === "participation").length || 0,
  };

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6 p-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-certificates-title">
            My Certificates
          </h1>
          <p className="text-muted-foreground">
            View and download your hackathon achievements
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Certificates</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Winning Positions</p>
                <p className="text-2xl font-bold">{stats.winners}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                <Star className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Special Mentions</p>
                <p className="text-2xl font-bold">{stats.special}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Participation</p>
                <p className="text-2xl font-bold">{stats.participation}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Grid */}
        {certificates && certificates.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden" data-testid={`card-certificate-${cert.id}`}>
                <div className="relative bg-gradient-to-br from-primary/5 via-transparent to-primary/10 p-6">
                  <div className="absolute right-4 top-4">
                    {getCertificateIcon(cert.type)}
                  </div>
                  <Badge className={getCertificateBadgeStyle(cert.type)}>
                    {getCertificateLabel(cert.type, cert.rank)}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-1 font-semibold">{cert.hackathonTitle}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{cert.organizerName}</p>
                  
                  {cert.teamName && (
                    <p className="mb-2 text-sm">
                      Team: <span className="font-medium">{cert.teamName}</span>
                    </p>
                  )}

                  <div className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Issued on {formatDate(cert.issuedAt)}</span>
                  </div>

                  <div className="mb-4 rounded-md bg-muted p-2">
                    <p className="text-xs text-muted-foreground">Verification Code</p>
                    <p className="font-mono text-sm font-medium">{cert.verificationCode}</p>
                  </div>

                  <div className="flex gap-2">
                    {cert.certificateUrl && (
                      <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </Button>
                      </a>
                    )}
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center py-12">
              <Award className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No Certificates Yet</h3>
              <p className="mb-4 text-center text-muted-foreground">
                Participate in hackathons to earn certificates and recognition
              </p>
              <Button asChild>
                <a href="/explore">Explore Hackathons</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
