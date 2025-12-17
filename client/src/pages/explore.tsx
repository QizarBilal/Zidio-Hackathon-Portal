import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Trophy,
  Clock,
  Building2,
  GraduationCap,
  Globe,
  X,
} from "lucide-react";
import { formatDate, formatCurrency, getTimeRemaining, getStatusColor, getStatusLabel } from "@/lib/utils";

interface Hackathon {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  bannerImageUrl: string | null;
  organizerName: string;
  organizerLogoUrl: string | null;
  organizerType: string;
  category: string;
  mode: string;
  venue: string | null;
  city: string | null;
  state: string | null;
  country: string;
  level: string;
  prizePool: number | null;
  currency: string;
  maxTeamSize: number;
  minTeamSize: number;
  maxParticipants: number | null;
  registrationStartDate: Date;
  registrationEndDate: Date;
  hackathonStartDate: Date;
  hackathonEndDate: Date;
  submissionDeadline: Date;
  judgingStartDate: Date | null;
  judgingEndDate: Date | null;
  resultsDate: Date | null;
  status: string;
  tags: string[];
  eligibility: string[];
  isPaid: boolean;
  registrationFee: number | null;
  website: string | null;
  rulesUrl: string | null;
  faqUrl: string | null;
  supportEmail: string | null;
  discordUrl: string | null;
  slackUrl: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categories = [
  "All Categories",
  "AI/ML",
  "Web3",
  "FinTech",
  "HealthTech",
  "EdTech",
  "CleanTech",
  "IoT",
  "Cybersecurity",
  "Open Innovation",
];

const levels = [
  { value: "all", label: "All Levels" },
  { value: "national", label: "National" },
  { value: "state", label: "State" },
  { value: "university", label: "University" },
  { value: "corporate", label: "Corporate" },
];

const modes = [
  { value: "all", label: "All Modes" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "hybrid", label: "Hybrid" },
];

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "prize_high", label: "Prize: High to Low" },
  { value: "prize_low", label: "Prize: Low to High" },
  { value: "deadline", label: "Deadline" },
  { value: "newest", label: "Newest First" },
];

const mockHackathons: Hackathon[] = [
  {
    id: "1",
    title: "Smart India Hackathon 2025",
    slug: "smart-india-hackathon-2025",
    description: "India's largest open innovation model providing students a platform to solve pressing problems.",
    shortDescription: "National-level hackathon for students across India",
    bannerImageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60",
    organizerName: "Ministry of Education",
    organizerLogoUrl: null,
    organizerType: "government",
    category: "Open Innovation",
    mode: "hybrid",
    venue: "Multiple Centers",
    city: "Pan India",
    state: null,
    country: "India",
    level: "national",
    prizePool: 5000000,
    currency: "INR",
    maxTeamSize: 6,
    minTeamSize: 4,
    maxParticipants: 50000,
    registrationStartDate: new Date("2024-12-01"),
    registrationEndDate: new Date("2025-01-15"),
    hackathonStartDate: new Date("2025-02-20"),
    hackathonEndDate: new Date("2025-02-22"),
    submissionDeadline: new Date("2025-02-22"),
    judgingStartDate: new Date("2025-02-23"),
    judgingEndDate: new Date("2025-02-25"),
    resultsDate: new Date("2025-02-28"),
    status: "registration_open",
    isPaid: false,
    entryFee: 0,
    eligibility: "Indian students",
    rules: null,
    judgingCriteria: null,
    prizes: null,
    sponsors: null,
    partners: null,
    tags: ["innovation", "government", "national"],
    websiteUrl: null,
    contactEmail: null,
    isPublished: true,
    isFeatured: true,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "TechnoVerse AI Challenge",
    slug: "technoverse-ai-challenge",
    description: "Premier AI/ML hackathon focused on solving real-world problems using artificial intelligence.",
    shortDescription: "Build AI solutions for industry challenges",
    bannerImageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
    organizerName: "IIT Delhi",
    organizerLogoUrl: null,
    organizerType: "university",
    category: "AI/ML",
    mode: "online",
    venue: null,
    city: "Online",
    state: null,
    country: "India",
    level: "national",
    prizePool: 1500000,
    currency: "INR",
    maxTeamSize: 4,
    minTeamSize: 2,
    maxParticipants: 15000,
    registrationStartDate: new Date("2024-12-15"),
    registrationEndDate: new Date("2025-01-20"),
    hackathonStartDate: new Date("2025-02-01"),
    hackathonEndDate: new Date("2025-02-03"),
    submissionDeadline: new Date("2025-02-03"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-02-10"),
    status: "registration_open",
    isPaid: false,
    entryFee: 0,
    eligibility: null,
    rules: null,
    judgingCriteria: null,
    prizes: null,
    sponsors: null,
    partners: null,
    tags: ["ai", "ml", "deep-learning"],
    websiteUrl: null,
    contactEmail: null,
    isPublished: true,
    isFeatured: true,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "FinTech Innovation Sprint",
    slug: "fintech-innovation-sprint",
    description: "Create next-generation financial solutions with India's leading banks.",
    shortDescription: "Build the future of finance",
    bannerImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=60",
    organizerName: "HDFC Bank",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "FinTech",
    mode: "hybrid",
    venue: "HDFC House",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    level: "corporate",
    prizePool: 2000000,
    currency: "INR",
    maxTeamSize: 4,
    minTeamSize: 2,
    maxParticipants: 10000,
    registrationStartDate: new Date("2025-01-01"),
    registrationEndDate: new Date("2025-02-01"),
    hackathonStartDate: new Date("2025-02-15"),
    hackathonEndDate: new Date("2025-02-16"),
    submissionDeadline: new Date("2025-02-16"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-02-20"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: null,
    rules: null,
    judgingCriteria: null,
    prizes: null,
    sponsors: null,
    partners: null,
    tags: ["fintech", "banking", "payments"],
    websiteUrl: null,
    contactEmail: null,
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "GreenTech Sustainable Solutions",
    slug: "greentech-sustainable-solutions",
    description: "Develop sustainable technology solutions for environmental challenges.",
    shortDescription: "Technology for a greener tomorrow",
    bannerImageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop&q=60",
    organizerName: "Tata Trust",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "CleanTech",
    mode: "online",
    venue: null,
    city: "Online",
    state: null,
    country: "India",
    level: "national",
    prizePool: 1000000,
    currency: "INR",
    maxTeamSize: 5,
    minTeamSize: 2,
    maxParticipants: 8000,
    registrationStartDate: new Date("2025-01-10"),
    registrationEndDate: new Date("2025-02-10"),
    hackathonStartDate: new Date("2025-02-25"),
    hackathonEndDate: new Date("2025-02-27"),
    submissionDeadline: new Date("2025-02-27"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-03-05"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: null,
    rules: null,
    judgingCriteria: null,
    prizes: null,
    sponsors: null,
    partners: null,
    tags: ["sustainability", "cleantech", "environment"],
    websiteUrl: null,
    contactEmail: null,
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "HealthTech Revolution",
    slug: "healthtech-revolution",
    description: "Transform healthcare delivery with innovative technology solutions.",
    shortDescription: "Building the future of healthcare",
    bannerImageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
    organizerName: "AIIMS Delhi",
    organizerLogoUrl: null,
    organizerType: "government",
    category: "HealthTech",
    mode: "hybrid",
    venue: "AIIMS Campus",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    level: "national",
    prizePool: 1800000,
    currency: "INR",
    maxTeamSize: 5,
    minTeamSize: 3,
    maxParticipants: 12000,
    registrationStartDate: new Date("2025-01-05"),
    registrationEndDate: new Date("2025-02-05"),
    hackathonStartDate: new Date("2025-03-01"),
    hackathonEndDate: new Date("2025-03-03"),
    submissionDeadline: new Date("2025-03-03"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-03-10"),
    status: "registration_open",
    isPaid: false,
    entryFee: 0,
    eligibility: null,
    rules: null,
    judgingCriteria: null,
    prizes: null,
    sponsors: null,
    partners: null,
    tags: ["health", "medical", "telemedicine"],
    websiteUrl: null,
    contactEmail: null,
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "Web3 Builders Hackathon",
    slug: "web3-builders-hackathon",
    description: "Build decentralized applications on blockchain technology.",
    shortDescription: "Decentralize everything",
    bannerImageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
    organizerName: "Polygon Labs",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "Web3",
    mode: "online",
    venue: null,
    city: "Online",
    state: null,
    country: "India",
    level: "national",
    prizePool: 2500000,
    currency: "INR",
    maxTeamSize: 4,
    minTeamSize: 1,
    maxParticipants: 10000,
    registrationStartDate: new Date("2025-01-15"),
    registrationEndDate: new Date("2025-02-15"),
    hackathonStartDate: new Date("2025-03-10"),
    hackathonEndDate: new Date("2025-03-12"),
    submissionDeadline: new Date("2025-03-12"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-03-20"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: null,
    rules: null,
    judgingCriteria: null,
    prizes: null,
    sponsors: null,
    partners: null,
    tags: ["blockchain", "web3", "defi"],
    websiteUrl: null,
    contactEmail: null,
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const getOrganizerIcon = (type: string | null) => {
    switch (type) {
      case "government":
        return <Building2 className="h-3 w-3" />;
      case "university":
        return <GraduationCap className="h-3 w-3" />;
      case "corporate":
        return <Building2 className="h-3 w-3" />;
      default:
        return <Globe className="h-3 w-3" />;
    }
  };

  return (
    <Link href={`/hackathon/${hackathon.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover-elevate" data-testid={`card-hackathon-${hackathon.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={hackathon.bannerImageUrl || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60"}
            alt={hackathon.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute right-2 top-2 flex gap-1">
            {hackathon.isFeatured && (
              <Badge className="bg-yellow-500/90 text-white">Featured</Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {hackathon.category}
            </Badge>
            <Badge className={getStatusColor(hackathon.status || "draft")}>
              {getStatusLabel(hackathon.status || "draft")}
            </Badge>
            {hackathon.mode && (
              <Badge variant="outline" className="text-xs capitalize">
                {hackathon.mode}
              </Badge>
            )}
          </div>

          <h3 className="mb-1 font-semibold line-clamp-1" data-testid={`text-title-${hackathon.id}`}>
            {hackathon.title}
          </h3>

          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            {getOrganizerIcon(hackathon.organizerType)}
            <span>{hackathon.organizerName}</span>
          </div>

          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {hackathon.shortDescription || hackathon.description}
          </p>

          <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(hackathon.hackathonStartDate)}</span>
            </div>
            {hackathon.city && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{hackathon.city}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{hackathon.minTeamSize}-{hackathon.maxTeamSize} members</span>
            </div>
            {hackathon.registrationEndDate && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{getTimeRemaining(hackathon.registrationEndDate)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold text-primary">
                {formatCurrency(hackathon.prizePool || 0, hackathon.currency || "INR")}
              </span>
            </div>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function HackathonCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video" />
      <CardContent className="p-4">
        <div className="mb-2 flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="mb-1 h-5 w-3/4" />
        <Skeleton className="mb-3 h-4 w-1/2" />
        <Skeleton className="mb-3 h-8 w-full" />
        <div className="mb-3 grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex justify-between border-t pt-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [sortBy, setSortBy] = useState("trending");
  const [showFilters, setShowFilters] = useState(false);
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyOpen, setOnlyOpen] = useState(false);

  const hackathons = mockHackathons;
  const isLoading = false;

  const filteredHackathons = (hackathons || []).filter((h) => {
    if (searchQuery && !h.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== "All Categories" && h.category !== selectedCategory) {
      return false;
    }
    if (selectedLevel !== "all" && h.level !== selectedLevel) {
      return false;
    }
    if (selectedMode !== "all" && h.mode !== selectedMode) {
      return false;
    }
    if (onlyFree && h.isPaid) {
      return false;
    }
    if (onlyOpen && h.status !== "registration_open") {
      return false;
    }
    return true;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLevel("all");
    setSelectedMode("all");
    setOnlyFree(false);
    setOnlyOpen(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "All Categories" ||
    selectedLevel !== "all" ||
    selectedMode !== "all" ||
    onlyFree ||
    onlyOpen;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Explore Hackathons</h1>
          <p className="text-muted-foreground">
            Discover hackathons across categories, skill levels, and locations
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className={`w-full shrink-0 lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-4 space-y-6 rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="mr-1 h-3 w-3" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger data-testid="select-level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Mode</label>
                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger data-testid="select-mode">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {modes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="free-only"
                      checked={onlyFree}
                      onCheckedChange={(checked) => setOnlyFree(checked as boolean)}
                      data-testid="checkbox-free-only"
                    />
                    <label htmlFor="free-only" className="text-sm">
                      Free to participate
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="open-only"
                      checked={onlyOpen}
                      onCheckedChange={(checked) => setOnlyOpen(checked as boolean)}
                      data-testid="checkbox-open-only"
                    />
                    <label htmlFor="open-only" className="text-sm">
                      Open for registration
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search and Sort */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search hackathons..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search"
                />
              </div>
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-toggle-filters"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-4 w-32" />
              ) : (
                <span data-testid="text-results-count">
                  Showing {filteredHackathons.length} hackathon{filteredHackathons.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Hackathon Grid */}
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <HackathonCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredHackathons.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredHackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border bg-card p-12 text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No hackathons found</h3>
                <p className="mb-4 text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
