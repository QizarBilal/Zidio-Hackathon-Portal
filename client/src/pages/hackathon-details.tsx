import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Globe,
  Mail,
  Building2,
  GraduationCap,
  Target,
  CheckCircle2,
  ArrowLeft,
  Share2,
  ExternalLink,
  FileText,
  Lightbulb,
  Award,
  AlertCircle,
} from "lucide-react";
import { formatDate, formatDateTime, formatCurrency, getTimeRemaining, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { Hackathon, ProblemStatement } from "@shared/schema";

const mockHackathons: Hackathon[] = [
  {
    id: "1",
    title: "Smart India Hackathon 2025",
    slug: "smart-india-hackathon-2025",
    description: `Smart India Hackathon (SIH) is India's biggest innovation marathon. It is a nationwide initiative to provide students a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem-solving.

The first edition SIH2017 was organized by AICTE, i4c, MHRD and NASSCOM. The 2025 edition continues this legacy with even bigger challenges and opportunities.

This year, we're focusing on:
- Smart Cities & Infrastructure
- Healthcare & Wellness
- Agriculture & Rural Development
- Clean & Green Technology
- Smart Vehicles
- Miscellaneous`,
    shortDescription: "India's largest open innovation model providing students a platform to solve pressing problems.",
    bannerImageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&auto=format&fit=crop&q=80",
    organizerName: "Ministry of Education, Government of India",
    organizerLogoUrl: null,
    organizerType: "government",
    category: "Open Innovation",
    mode: "hybrid",
    venue: "Grand Finals at multiple nodal centers",
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
    eligibility: "Open to all students enrolled in recognized institutions across India",
    rules: `1. Team must consist of 4-6 members from the same institution
2. At least one team member should be female (encouraged but not mandatory)
3. Each team can submit solution for only one problem statement
4. Use of AI assistance tools is allowed with proper disclosure
5. All submissions must be original work
6. Previous SIH winners are not allowed to participate`,
    judgingCriteria: {
      innovation: 25,
      feasibility: 20,
      technical: 25,
      presentation: 15,
      impact: 15,
    },
    prizes: {
      first: { amount: 100000, title: "Grand Prize Winner" },
      second: { amount: 75000, title: "First Runner Up" },
      third: { amount: 50000, title: "Second Runner Up" },
      special: [
        { amount: 25000, title: "Best Women-Led Team" },
        { amount: 25000, title: "Most Innovative Solution" },
      ],
    },
    sponsors: ["AICTE", "NASSCOM", "MeitY"],
    partners: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIIT Hyderabad"],
    tags: ["innovation", "government", "national", "technology"],
    websiteUrl: "https://sih.gov.in",
    contactEmail: "support@sih.gov.in",
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
    description: `TechnoVerse AI Challenge is a premier AI/ML hackathon focused on solving real-world problems using artificial intelligence. This competition brings together the brightest minds to innovate in areas like computer vision, natural language processing, and predictive analytics.

Join us to:
- Build cutting-edge AI models
- Solve industry-relevant challenges
- Learn from AI experts and mentors
- Win exciting prizes and internship opportunities

Whether you're working on image recognition, chatbots, or recommendation systems, this is your platform to shine.`,
    shortDescription: "Build AI solutions for industry challenges",
    bannerImageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&auto=format&fit=crop&q=80",
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
    eligibility: "Open to all students and professionals with AI/ML interest",
    rules: `1. Teams of 2-4 members allowed
2. Use any programming language or framework
3. Pre-trained models allowed with proper citation
4. Code must be submitted via GitHub
5. Solutions must be reproducible`,
    judgingCriteria: {
      innovation: 30,
      feasibility: 15,
      technical: 30,
      presentation: 15,
      impact: 10,
    },
    prizes: {
      first: { amount: 75000, title: "Winner" },
      second: { amount: 50000, title: "Runner Up" },
      third: { amount: 25000, title: "Third Place" },
    },
    sponsors: ["NVIDIA", "Google Cloud"],
    partners: ["IIT Delhi", "AI Institute"],
    tags: ["ai", "ml", "deep-learning"],
    websiteUrl: null,
    contactEmail: "aiml@iitd.ac.in",
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
    description: `Create next-generation financial solutions with India's leading banks. The FinTech Innovation Sprint challenges you to reimagine banking and financial services for the digital age.

Focus areas include:
- Digital Payment Solutions
- Blockchain in Banking
- AI-powered Financial Advisory
- Fraud Detection Systems
- Customer Experience Enhancement
- Open Banking APIs

Collaborate with industry experts and build solutions that could shape the future of finance in India.`,
    shortDescription: "Build the future of finance",
    bannerImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1600&auto=format&fit=crop&q=80",
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
    eligibility: "Open to students and professionals",
    rules: `1. Teams of 2-4 members
2. Solution must be innovative and scalable
3. Security and compliance are critical
4. APIs will be provided for integration`,
    judgingCriteria: {
      innovation: 25,
      feasibility: 25,
      technical: 20,
      presentation: 15,
      impact: 15,
    },
    prizes: {
      first: { amount: 100000, title: "Winner" },
      second: { amount: 60000, title: "Runner Up" },
      third: { amount: 40000, title: "Third Place" },
    },
    sponsors: ["HDFC Bank", "Razorpay"],
    partners: ["NPCI", "RBI"],
    tags: ["fintech", "banking", "payments"],
    websiteUrl: null,
    contactEmail: "hackathon@hdfcbank.com",
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
    description: `Develop sustainable technology solutions for environmental challenges. Join us in building a greener tomorrow through innovation.

Challenge areas:
- Renewable Energy Management
- Waste Management Systems
- Carbon Footprint Tracking
- Water Conservation Technology
- Air Quality Monitoring
- Sustainable Agriculture

Make a real impact on our planet while showcasing your technical skills. Winners get mentorship and potential funding for implementation.`,
    shortDescription: "Technology for a greener tomorrow",
    bannerImageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1600&auto=format&fit=crop&q=80",
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
    eligibility: "Open to all innovators passionate about sustainability",
    rules: `1. Teams of 2-5 members
2. Solution must address environmental challenges
3. Prototype or working demo required
4. Impact assessment needed`,
    judgingCriteria: {
      innovation: 20,
      feasibility: 25,
      technical: 20,
      presentation: 15,
      impact: 20,
    },
    prizes: {
      first: { amount: 50000, title: "Winner" },
      second: { amount: 30000, title: "Runner Up" },
      third: { amount: 20000, title: "Third Place" },
    },
    sponsors: ["Tata Trust", "UN Environment"],
    partners: ["TERI", "Green India"],
    tags: ["sustainability", "cleantech", "environment"],
    websiteUrl: null,
    contactEmail: "greentech@tatatrust.org",
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
    description: `Transform healthcare delivery with innovative technology solutions. Build systems that can save lives and improve patient care.

Key focus areas:
- Telemedicine Platforms
- AI Diagnosis Systems
- Patient Management Software
- Medical IoT Devices
- Health Data Analytics
- Mental Health Apps

Work with healthcare professionals and build solutions that address real challenges in the Indian healthcare system.`,
    shortDescription: "Building the future of healthcare",
    bannerImageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop&q=80",
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
    eligibility: "Open to healthcare professionals, students, and technologists",
    rules: `1. Teams must include at least one member with healthcare background
2. Solutions must comply with medical data regulations
3. Patient privacy is paramount
4. Working prototype required`,
    judgingCriteria: {
      innovation: 25,
      feasibility: 25,
      technical: 20,
      presentation: 15,
      impact: 15,
    },
    prizes: {
      first: { amount: 90000, title: "Winner" },
      second: { amount: 60000, title: "Runner Up" },
      third: { amount: 30000, title: "Third Place" },
    },
    sponsors: ["AIIMS", "Ministry of Health"],
    partners: ["Apollo Hospitals", "Fortis"],
    tags: ["health", "medical", "telemedicine"],
    websiteUrl: null,
    contactEmail: "healthtech@aiims.edu",
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
    description: `Build decentralized applications on blockchain technology. Join the Web3 revolution and create the future of the internet.

Build solutions for:
- DeFi Applications
- NFT Marketplaces
- DAO Tools
- Blockchain Gaming
- Supply Chain on Blockchain
- Web3 Social Networks

Get access to latest blockchain tools, mentorship from Web3 experts, and potential funding opportunities.`,
    shortDescription: "Decentralize everything",
    bannerImageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&auto=format&fit=crop&q=80",
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
    eligibility: "Open to all blockchain enthusiasts",
    rules: `1. Solo or team participation (max 4)
2. Must deploy on Polygon network
3. Smart contracts must be verified
4. Open source submission required`,
    judgingCriteria: {
      innovation: 30,
      feasibility: 15,
      technical: 30,
      presentation: 10,
      impact: 15,
    },
    prizes: {
      first: { amount: 125000, title: "Winner" },
      second: { amount: 75000, title: "Runner Up" },
      third: { amount: 50000, title: "Third Place" },
    },
    sponsors: ["Polygon", "Ethereum Foundation"],
    partners: ["Alchemy", "QuickNode"],
    tags: ["blockchain", "web3", "defi"],
    websiteUrl: null,
    contactEmail: "builders@polygon.technology",
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    title: "EdTech Innovation Challenge",
    slug: "edtech-innovation-challenge",
    description: `Revolutionize learning experiences with cutting-edge educational technology. Transform how students learn and teachers teach.

Innovation areas:
- Adaptive Learning Platforms
- Gamified Education
- Virtual Labs
- Assessment Tools
- Learning Analytics
- Accessibility in Education

Create solutions that make quality education accessible to everyone, everywhere.`,
    shortDescription: "Transform education through technology",
    bannerImageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&auto=format&fit=crop&q=80",
    organizerName: "BYJU'S",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "EdTech",
    mode: "hybrid",
    venue: "Think & Learn Campus",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    level: "national",
    prizePool: 1200000,
    currency: "INR",
    maxTeamSize: 4,
    minTeamSize: 2,
    maxParticipants: 9000,
    registrationStartDate: new Date("2025-01-20"),
    registrationEndDate: new Date("2025-02-20"),
    hackathonStartDate: new Date("2025-03-15"),
    hackathonEndDate: new Date("2025-03-17"),
    submissionDeadline: new Date("2025-03-17"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-03-25"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to educators, students, and technologists",
    rules: `1. Teams of 2-4 members
2. Solution must enhance learning outcomes
3. User testing with students required
4. Must be mobile-friendly`,
    judgingCriteria: {
      innovation: 25,
      feasibility: 20,
      technical: 20,
      presentation: 15,
      impact: 20,
    },
    prizes: {
      first: { amount: 60000, title: "Winner" },
      second: { amount: 40000, title: "Runner Up" },
      third: { amount: 20000, title: "Third Place" },
    },
    sponsors: ["BYJU'S", "Unacademy"],
    partners: ["NCERT", "CBSE"],
    tags: ["education", "learning", "gamification"],
    websiteUrl: null,
    contactEmail: "innovation@byjus.com",
    isPublished: true,
    isFeatured: true,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    title: "Cybersecurity Defense Hackathon",
    slug: "cybersecurity-defense-hackathon",
    description: `Build robust security solutions to protect digital infrastructure. Defend against evolving cyber threats.

Challenge categories:
- Network Security Tools
- Encryption Systems
- Vulnerability Scanners
- Incident Response Automation
- Threat Intelligence
- Security Analytics

Work on real-world security challenges and help make cyberspace safer for everyone.`,
    shortDescription: "Defend the digital frontier",
    bannerImageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&auto=format&fit=crop&q=80",
    organizerName: "CERT-In",
    organizerLogoUrl: null,
    organizerType: "government",
    category: "Cybersecurity",
    mode: "offline",
    venue: "DRDO Campus",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    level: "national",
    prizePool: 3000000,
    currency: "INR",
    maxTeamSize: 3,
    minTeamSize: 2,
    maxParticipants: 5000,
    registrationStartDate: new Date("2025-01-25"),
    registrationEndDate: new Date("2025-02-25"),
    hackathonStartDate: new Date("2025-03-20"),
    hackathonEndDate: new Date("2025-03-22"),
    submissionDeadline: new Date("2025-03-22"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-03-28"),
    status: "registration_open",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to cybersecurity students and professionals",
    rules: `1. Teams of 2-3 members
2. Ethical hacking principles must be followed
3. No actual attacks on live systems
4. Detailed documentation required`,
    judgingCriteria: {
      innovation: 20,
      feasibility: 25,
      technical: 30,
      presentation: 10,
      impact: 15,
    },
    prizes: {
      first: { amount: 150000, title: "Winner" },
      second: { amount: 100000, title: "Runner Up" },
      third: { amount: 50000, title: "Third Place" },
    },
    sponsors: ["CERT-In", "DRDO"],
    partners: ["Cyber Security Council", "NIC"],
    tags: ["security", "encryption", "pentesting"],
    websiteUrl: null,
    contactEmail: "security@cert-in.org.in",
    isPublished: true,
    isFeatured: true,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "9",
    title: "IoT Smart City Challenge",
    slug: "iot-smart-city-challenge",
    description: `Design IoT solutions to make cities smarter and more sustainable. Build connected systems for urban challenges.

Focus areas:
- Smart Traffic Systems
- Energy Management
- Waste Management
- Public Safety
- Smart Parking
- Air Quality Monitoring

Transform urban living through innovative IoT solutions that improve quality of life.`,
    shortDescription: "Connected cities, better living",
    bannerImageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1600&auto=format&fit=crop&q=80",
    organizerName: "Smart Cities Mission",
    organizerLogoUrl: null,
    organizerType: "government",
    category: "IoT",
    mode: "hybrid",
    venue: "India Habitat Centre",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    level: "national",
    prizePool: 2200000,
    currency: "INR",
    maxTeamSize: 5,
    minTeamSize: 3,
    maxParticipants: 11000,
    registrationStartDate: new Date("2025-02-01"),
    registrationEndDate: new Date("2025-03-01"),
    hackathonStartDate: new Date("2025-03-25"),
    hackathonEndDate: new Date("2025-03-27"),
    submissionDeadline: new Date("2025-03-27"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-04-05"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to all IoT enthusiasts",
    rules: `1. Teams of 3-5 members
2. Working IoT prototype required
3. Must use standard IoT protocols
4. Scalability is important`,
    judgingCriteria: {
      innovation: 25,
      feasibility: 25,
      technical: 20,
      presentation: 10,
      impact: 20,
    },
    prizes: {
      first: { amount: 110000, title: "Winner" },
      second: { amount: 70000, title: "Runner Up" },
      third: { amount: 40000, title: "Third Place" },
    },
    sponsors: ["Smart Cities Mission", "NIUA"],
    partners: ["Cisco", "Intel"],
    tags: ["iot", "smart-city", "sensors"],
    websiteUrl: null,
    contactEmail: "iot@smartcities.gov.in",
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "10",
    title: "Gaming & XR Innovation Jam",
    slug: "gaming-xr-innovation-jam",
    description: `Create immersive gaming experiences using AR/VR/MR technologies. Build the metaverse and next-gen gaming.

Create in these categories:
- VR Games
- AR Applications
- Mixed Reality Experiences
- Game AI
- Multiplayer Systems
- Immersive Storytelling

Push the boundaries of interactive entertainment and virtual worlds.`,
    shortDescription: "Build the metaverse",
    bannerImageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1600&auto=format&fit=crop&q=80",
    organizerName: "Unity Technologies",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "Open Innovation",
    mode: "online",
    venue: null,
    city: "Online",
    state: null,
    country: "India",
    level: "national",
    prizePool: 1700000,
    currency: "INR",
    maxTeamSize: 4,
    minTeamSize: 1,
    maxParticipants: 13000,
    registrationStartDate: new Date("2025-02-05"),
    registrationEndDate: new Date("2025-03-05"),
    hackathonStartDate: new Date("2025-04-01"),
    hackathonEndDate: new Date("2025-04-03"),
    submissionDeadline: new Date("2025-04-03"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-04-10"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to game developers and XR enthusiasts",
    rules: `1. Solo or teams up to 4
2. Must use Unity or Unreal Engine
3. Playable demo required
4. Original assets preferred`,
    judgingCriteria: {
      innovation: 30,
      feasibility: 10,
      technical: 25,
      presentation: 20,
      impact: 15,
    },
    prizes: {
      first: { amount: 85000, title: "Winner" },
      second: { amount: 55000, title: "Runner Up" },
      third: { amount: 30000, title: "Third Place" },
    },
    sponsors: ["Unity", "Oculus"],
    partners: ["Epic Games", "Steam"],
    tags: ["gaming", "vr", "ar", "metaverse"],
    websiteUrl: null,
    contactEmail: "create@unity.com",
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "11",
    title: "AgriTech Solutions Hackathon",
    slug: "agritech-solutions-hackathon",
    description: `Innovate agriculture with technology to improve farmer productivity and rural livelihoods.

Solution areas:
- Precision Farming
- Crop Disease Detection
- Market Linkage Platforms
- Weather Prediction
- Irrigation Automation
- Farm Management Software

Help modernize Indian agriculture and empower farmers with technology.`,
    shortDescription: "Tech-enabled farming revolution",
    bannerImageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&auto=format&fit=crop&q=80",
    organizerName: "ICAR",
    organizerLogoUrl: null,
    organizerType: "government",
    category: "Open Innovation",
    mode: "hybrid",
    venue: "IARI Campus",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    level: "national",
    prizePool: 1600000,
    currency: "INR",
    maxTeamSize: 5,
    minTeamSize: 2,
    maxParticipants: 7000,
    registrationStartDate: new Date("2025-02-10"),
    registrationEndDate: new Date("2025-03-10"),
    hackathonStartDate: new Date("2025-04-05"),
    hackathonEndDate: new Date("2025-04-07"),
    submissionDeadline: new Date("2025-04-07"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-04-15"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to agricultural students and technologists",
    rules: `1. Teams of 2-5 members
2. Solution must be farmer-friendly
3. Low-cost solutions preferred
4. Field testing encouraged`,
    judgingCriteria: {
      innovation: 20,
      feasibility: 30,
      technical: 15,
      presentation: 15,
      impact: 20,
    },
    prizes: {
      first: { amount: 80000, title: "Winner" },
      second: { amount: 50000, title: "Runner Up" },
      third: { amount: 30000, title: "Third Place" },
    },
    sponsors: ["ICAR", "Ministry of Agriculture"],
    partners: ["Krishi Vigyan Kendra", "NABARD"],
    tags: ["agriculture", "farming", "rural-tech"],
    websiteUrl: null,
    contactEmail: "agritech@icar.gov.in",
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "12",
    title: "Cloud Computing Innovators",
    slug: "cloud-computing-innovators",
    description: `Build scalable cloud-native applications and services. Leverage the power of cloud computing.

Build solutions using:
- Serverless Architecture
- Containerization
- Microservices
- Cloud Security
- DevOps Automation
- Multi-Cloud Management

Showcase your cloud expertise and win exciting prizes and AWS credits.`,
    shortDescription: "Innovate on the cloud",
    bannerImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
    organizerName: "Amazon Web Services",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "Open Innovation",
    mode: "online",
    venue: null,
    city: "Online",
    state: null,
    country: "India",
    level: "corporate",
    prizePool: 2800000,
    currency: "INR",
    maxTeamSize: 4,
    minTeamSize: 2,
    maxParticipants: 18000,
    registrationStartDate: new Date("2025-02-15"),
    registrationEndDate: new Date("2025-03-15"),
    hackathonStartDate: new Date("2025-04-10"),
    hackathonEndDate: new Date("2025-04-12"),
    submissionDeadline: new Date("2025-04-12"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-04-20"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to all cloud enthusiasts",
    rules: `1. Teams of 2-4 members
2. Must deploy on AWS
3. Cost optimization is key
4. Architecture diagram required`,
    judgingCriteria: {
      innovation: 25,
      feasibility: 20,
      technical: 25,
      presentation: 15,
      impact: 15,
    },
    prizes: {
      first: { amount: 140000, title: "Winner" },
      second: { amount: 90000, title: "Runner Up" },
      third: { amount: 50000, title: "Third Place" },
    },
    sponsors: ["AWS", "Amazon"],
    partners: ["Cloud Academy", "AWS India"],
    tags: ["cloud", "aws", "serverless"],
    websiteUrl: null,
    contactEmail: "hackathon@aws.amazon.com",
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "13",
    title: "Mobile App Development Sprint",
    slug: "mobile-app-development-sprint",
    description: `Create innovative mobile applications for Android and iOS platforms. Build apps that change lives.

App categories:
- Productivity Tools
- Social Networking
- E-commerce
- Entertainment
- Utility Apps
- Mobile Games

Build native or cross-platform apps that solve real problems and delight users.`,
    shortDescription: "Apps that change lives",
    bannerImageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&auto=format&fit=crop&q=80",
    organizerName: "Google Developers",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "Open Innovation",
    mode: "online",
    venue: null,
    city: "Online",
    state: null,
    country: "India",
    level: "national",
    prizePool: 2100000,
    currency: "INR",
    maxTeamSize: 3,
    minTeamSize: 1,
    maxParticipants: 20000,
    registrationStartDate: new Date("2025-02-20"),
    registrationEndDate: new Date("2025-03-20"),
    hackathonStartDate: new Date("2025-04-15"),
    hackathonEndDate: new Date("2025-04-17"),
    submissionDeadline: new Date("2025-04-17"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-04-25"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to all mobile developers",
    rules: `1. Solo or teams up to 3
2. Android or iOS or cross-platform
3. Working app demo required
4. Must follow platform guidelines`,
    judgingCriteria: {
      innovation: 25,
      feasibility: 20,
      technical: 20,
      presentation: 20,
      impact: 15,
    },
    prizes: {
      first: { amount: 105000, title: "Winner" },
      second: { amount: 70000, title: "Runner Up" },
      third: { amount: 35000, title: "Third Place" },
    },
    sponsors: ["Google", "Flutter"],
    partners: ["Android Dev Community", "Play Store"],
    tags: ["mobile", "android", "ios", "flutter"],
    websiteUrl: null,
    contactEmail: "developers@google.com",
    isPublished: true,
    isFeatured: true,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "14",
    title: "Data Science & Analytics Challenge",
    slug: "data-science-analytics-challenge",
    description: `Extract meaningful insights from complex datasets using data science. Turn data into decisions.

Challenge areas:
- Predictive Analytics
- Data Visualization
- Machine Learning Models
- Statistical Analysis
- Big Data Processing
- Business Intelligence

Solve real business problems with data-driven solutions.`,
    shortDescription: "Turn data into decisions",
    bannerImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80",
    organizerName: "IIT Bombay",
    organizerLogoUrl: null,
    organizerType: "university",
    category: "AI/ML",
    mode: "hybrid",
    venue: "IIT Bombay Campus",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    level: "university",
    prizePool: 1300000,
    currency: "INR",
    maxTeamSize: 4,
    minTeamSize: 2,
    maxParticipants: 14000,
    registrationStartDate: new Date("2025-02-25"),
    registrationEndDate: new Date("2025-03-25"),
    hackathonStartDate: new Date("2025-04-20"),
    hackathonEndDate: new Date("2025-04-22"),
    submissionDeadline: new Date("2025-04-22"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-04-30"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to data science enthusiasts",
    rules: `1. Teams of 2-4 members
2. Dataset will be provided
3. Jupyter notebooks preferred
4. Visualizations required`,
    judgingCriteria: {
      innovation: 20,
      feasibility: 20,
      technical: 30,
      presentation: 15,
      impact: 15,
    },
    prizes: {
      first: { amount: 65000, title: "Winner" },
      second: { amount: 45000, title: "Runner Up" },
      third: { amount: 20000, title: "Third Place" },
    },
    sponsors: ["IIT Bombay", "Analytics India"],
    partners: ["Kaggle", "DataCamp"],
    tags: ["data-science", "analytics", "visualization"],
    websiteUrl: null,
    contactEmail: "datascience@iitb.ac.in",
    isPublished: true,
    isFeatured: false,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "15",
    title: "Quantum Computing Explorers",
    slug: "quantum-computing-explorers",
    description: `Explore quantum algorithms and solve complex computational problems. Enter the quantum realm.

Explore areas:
- Quantum Algorithms
- Quantum Simulation
- Quantum Cryptography
- Quantum Machine Learning
- Optimization Problems
- Quantum Chemistry

Push the boundaries of computation with quantum technology.`,
    shortDescription: "Enter the quantum realm",
    bannerImageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&auto=format&fit=crop&q=80",
    organizerName: "IBM Quantum",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "AI/ML",
    mode: "online",
    venue: null,
    city: "Online",
    state: null,
    country: "India",
    level: "national",
    prizePool: 3500000,
    currency: "INR",
    maxTeamSize: 3,
    minTeamSize: 1,
    maxParticipants: 6000,
    registrationStartDate: new Date("2025-03-01"),
    registrationEndDate: new Date("2025-04-01"),
    hackathonStartDate: new Date("2025-04-25"),
    hackathonEndDate: new Date("2025-04-27"),
    submissionDeadline: new Date("2025-04-27"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-05-05"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to quantum computing enthusiasts",
    rules: `1. Solo or teams up to 3
2. Use IBM Quantum or Qiskit
3. Working quantum circuit required
4. Documentation essential`,
    judgingCriteria: {
      innovation: 30,
      feasibility: 15,
      technical: 35,
      presentation: 10,
      impact: 10,
    },
    prizes: {
      first: { amount: 175000, title: "Winner" },
      second: { amount: 115000, title: "Runner Up" },
      third: { amount: 60000, title: "Third Place" },
    },
    sponsors: ["IBM", "IBM Quantum"],
    partners: ["Qiskit Community", "Quantum Alliance"],
    tags: ["quantum", "algorithms", "computing"],
    websiteUrl: null,
    contactEmail: "quantum@ibm.com",
    isPublished: true,
    isFeatured: true,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "16",
    title: "Social Impact Tech Challenge",
    slug: "social-impact-tech-challenge",
    description: `Develop technology solutions addressing critical social challenges. Tech for social good.

Impact areas:
- Education for All
- Healthcare Access
- Financial Inclusion
- Women Empowerment
- Rural Development
- Accessibility Solutions

Build technology that creates positive social impact and transforms lives.`,
    shortDescription: "Tech for social good",
    bannerImageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&auto=format&fit=crop&q=80",
    organizerName: "Bill & Melinda Gates Foundation",
    organizerLogoUrl: null,
    organizerType: "corporate",
    category: "Open Innovation",
    mode: "hybrid",
    venue: "Multiple Cities",
    city: "Pan India",
    state: null,
    country: "India",
    level: "national",
    prizePool: 4000000,
    currency: "INR",
    maxTeamSize: 6,
    minTeamSize: 3,
    maxParticipants: 16000,
    registrationStartDate: new Date("2025-03-05"),
    registrationEndDate: new Date("2025-04-05"),
    hackathonStartDate: new Date("2025-05-01"),
    hackathonEndDate: new Date("2025-05-03"),
    submissionDeadline: new Date("2025-05-03"),
    judgingStartDate: null,
    judgingEndDate: null,
    resultsDate: new Date("2025-05-10"),
    status: "upcoming",
    isPaid: false,
    entryFee: 0,
    eligibility: "Open to all social innovators",
    rules: `1. Teams of 3-6 members
2. Solution must address social challenges
3. Community validation required
4. Sustainability plan needed`,
    judgingCriteria: {
      innovation: 20,
      feasibility: 25,
      technical: 15,
      presentation: 15,
      impact: 25,
    },
    prizes: {
      first: { amount: 200000, title: "Winner" },
      second: { amount: 130000, title: "Runner Up" },
      third: { amount: 70000, title: "Third Place" },
    },
    sponsors: ["Gates Foundation", "UN India"],
    partners: ["NGO Alliance", "Social Alpha"],
    tags: ["social-impact", "ngo", "development"],
    websiteUrl: null,
    contactEmail: "india@gatesfoundation.org",
    isPublished: true,
    isFeatured: true,
    createdById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockProblemStatements: ProblemStatement[] = [
  {
    id: "ps-1",
    hackathonId: "1",
    title: "Smart Traffic Management System",
    description: "Develop an AI-powered traffic management system that can optimize signal timings based on real-time traffic density.",
    category: "Smart Cities",
    difficulty: "hard",
    expectedOutcome: "A working prototype with 30% improvement in traffic flow",
    resources: null,
    datasetUrl: null,
    maxSubmissions: 100,
    sponsorName: "Ministry of Road Transport",
    sponsorLogoUrl: null,
    prizeAmount: 100000,
    order: 1,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "ps-2",
    hackathonId: "1",
    title: "Healthcare Appointment Optimization",
    description: "Create a platform that reduces patient waiting times and optimizes doctor schedules in government hospitals.",
    category: "Healthcare",
    difficulty: "medium",
    expectedOutcome: "Reduce average waiting time by 50%",
    resources: null,
    datasetUrl: null,
    maxSubmissions: 150,
    sponsorName: "Ministry of Health",
    sponsorLogoUrl: null,
    prizeAmount: 75000,
    order: 2,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "ps-3",
    hackathonId: "1",
    title: "Agricultural Yield Prediction",
    description: "Build a machine learning model to predict crop yields based on weather, soil, and historical data.",
    category: "Agriculture",
    difficulty: "hard",
    expectedOutcome: "Accuracy of 85% or above in yield prediction",
    resources: null,
    datasetUrl: "https://data.gov.in/agriculture",
    maxSubmissions: 120,
    sponsorName: "Ministry of Agriculture",
    sponsorLogoUrl: null,
    prizeAmount: 100000,
    order: 3,
    isActive: true,
    createdAt: new Date(),
  },
];

const timelineStages = [
  { id: "registration", label: "Registration", icon: Users, status: "completed" },
  { id: "problems", label: "Problem Release", icon: FileText, status: "completed" },
  { id: "hackathon", label: "Hackathon", icon: Target, status: "active" },
  { id: "judging", label: "Judging", icon: Lightbulb, status: "pending" },
  { id: "results", label: "Results", icon: Trophy, status: "pending" },
  { id: "certificates", label: "Certificates", icon: Award, status: "pending" },
];

export default function HackathonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: hackathon, isLoading } = useQuery<Hackathon>({
    queryKey: ["/api/hackathons", id],
    queryFn: () => {
      const foundHackathon = mockHackathons.find(h => h.id === id);
      return Promise.resolve(foundHackathon || mockHackathons[0]);
    },
  });

  const { data: problemStatements } = useQuery<ProblemStatement[]>({
    queryKey: ["/api/hackathons", id, "problems"],
    queryFn: () => Promise.resolve(mockProblemStatements),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="h-64 w-full" />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-4 h-8 w-96" />
          <Skeleton className="mb-8 h-4 w-64" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-64" />
              <Skeleton className="h-48" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Hackathon Not Found</h2>
          <p className="mb-4 text-muted-foreground">The hackathon you're looking for doesn't exist.</p>
          <Link href="/explore">
            <Button>Browse Hackathons</Button>
          </Link>
        </div>
      </div>
    );
  }

  const judgingCriteria = hackathon.judgingCriteria as Record<string, number> | null;
  const prizes = hackathon.prizes as { first?: { amount: number; title: string }; second?: { amount: number; title: string }; third?: { amount: number; title: string }; special?: { amount: number; title: string }[] } | null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-r from-primary/80 to-primary sm:h-80">
        {hackathon.bannerImageUrl && (
          <img
            src={hackathon.bannerImageUrl}
            alt={hackathon.title}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container relative mx-auto flex h-full flex-col justify-end px-4 pb-6">
          <Link href="/explore" className="mb-4 inline-flex items-center text-sm text-white/80 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Explore
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getStatusColor(hackathon.status || "draft")}>
              {getStatusLabel(hackathon.status || "draft")}
            </Badge>
            <Badge variant="secondary">{hackathon.category}</Badge>
            <Badge variant="outline" className="border-white/30 text-white capitalize">
              {hackathon.mode}
            </Badge>
            {hackathon.level && (
              <Badge variant="outline" className="border-white/30 text-white capitalize">
                {hackathon.level}
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl" data-testid="text-hackathon-title">
            {hackathon.title}
          </h1>
          <div className="mt-2 flex items-center gap-1 text-white/80">
            {hackathon.organizerType === "government" ? (
              <Building2 className="h-4 w-4" />
            ) : hackathon.organizerType === "university" ? (
              <GraduationCap className="h-4 w-4" />
            ) : (
              <Building2 className="h-4 w-4" />
            )}
            <span>{hackathon.organizerName}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {timelineStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className={`flex flex-col items-center ${stage.status === "active" ? "text-primary" : stage.status === "completed" ? "text-green-500" : "text-muted-foreground"}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${stage.status === "active" ? "border-primary bg-primary/10" : stage.status === "completed" ? "border-green-500 bg-green-500/10" : "border-muted"}`}>
                    <stage.icon className="h-4 w-4" />
                  </div>
                  <span className="mt-1 whitespace-nowrap text-xs font-medium">{stage.label}</span>
                </div>
                {index < timelineStages.length - 1 && (
                  <div className={`mx-2 h-0.5 w-8 sm:w-16 ${stage.status === "completed" ? "bg-green-500" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                <TabsTrigger value="problems" data-testid="tab-problems">Problem Statements</TabsTrigger>
                <TabsTrigger value="rules" data-testid="tab-rules">Rules & Eligibility</TabsTrigger>
                <TabsTrigger value="prizes" data-testid="tab-prizes">Prizes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About the Hackathon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {hackathon.description.split('\n\n').map((para, i) => (
                        <p key={i} className="text-muted-foreground">{para}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {judgingCriteria && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Judging Criteria</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(judgingCriteria).map(([key, value]) => (
                        <div key={key}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="capitalize">{key}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Important Dates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Registration Opens</span>
                        <span className="font-medium">{formatDate(hackathon.registrationStartDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Registration Closes</span>
                        <span className="font-medium">{formatDate(hackathon.registrationEndDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Hackathon Starts</span>
                        <span className="font-medium">{formatDateTime(hackathon.hackathonStartDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Submission Deadline</span>
                        <span className="font-medium">{formatDateTime(hackathon.submissionDeadline)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Results Announcement</span>
                        <span className="font-medium">{formatDate(hackathon.resultsDate)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="problems" className="space-y-4">
                {problemStatements && problemStatements.length > 0 ? (
                  problemStatements.map((ps) => (
                    <Card key={ps.id} data-testid={`card-problem-${ps.id}`}>
                      <CardContent className="p-4">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{ps.category}</Badge>
                          <Badge variant="outline" className="capitalize">{ps.difficulty}</Badge>
                          {ps.prizeAmount && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                              <Trophy className="mr-1 h-3 w-3" />
                              {formatCurrency(ps.prizeAmount)}
                            </Badge>
                          )}
                        </div>
                        <h3 className="mb-2 font-semibold">{ps.title}</h3>
                        <p className="mb-3 text-sm text-muted-foreground">{ps.description}</p>
                        {ps.expectedOutcome && (
                          <div className="flex items-start gap-2 rounded-md bg-muted p-3">
                            <Target className="mt-0.5 h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs font-medium">Expected Outcome</p>
                              <p className="text-sm text-muted-foreground">{ps.expectedOutcome}</p>
                            </div>
                          </div>
                        )}
                        {ps.sponsorName && (
                          <p className="mt-3 text-xs text-muted-foreground">
                            Sponsored by: {ps.sponsorName}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center py-12">
                      <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 font-semibold">Problem Statements Coming Soon</h3>
                      <p className="text-center text-sm text-muted-foreground">
                        Problem statements will be released before the hackathon begins.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="rules" className="space-y-6">
                {hackathon.eligibility && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Eligibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{hackathon.eligibility}</p>
                    </CardContent>
                  </Card>
                )}

                {hackathon.rules && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Rules</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {hackathon.rules.split('\n').map((rule, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Team Size: {hackathon.minTeamSize} - {hackathon.maxTeamSize} members</span>
                      </div>
                      {hackathon.isPaid && (
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span>Entry Fee: {formatCurrency(hackathon.entryFee || 0)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prizes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Total Prize Pool: {formatCurrency(hackathon.prizePool || 0)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {prizes && (
                      <div className="grid gap-4 sm:grid-cols-3">
                        {prizes.first && (
                          <div className="rounded-lg border bg-gradient-to-b from-yellow-500/10 to-transparent p-3 sm:p-4 text-center">
                            <div className="mb-2 text-2xl sm:text-3xl">1st</div>
                            <div className="text-lg sm:text-xl font-bold">{formatCurrency(prizes.first.amount)}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">{prizes.first.title}</div>
                          </div>
                        )}
                        {prizes.second && (
                          <div className="rounded-lg border bg-gradient-to-b from-gray-400/10 to-transparent p-3 sm:p-4 text-center">
                            <div className="mb-2 text-2xl sm:text-3xl">2nd</div>
                            <div className="text-lg sm:text-xl font-bold">{formatCurrency(prizes.second.amount)}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">{prizes.second.title}</div>
                          </div>
                        )}
                        {prizes.third && (
                          <div className="rounded-lg border bg-gradient-to-b from-orange-500/10 to-transparent p-3 sm:p-4 text-center">
                            <div className="mb-2 text-2xl sm:text-3xl">3rd</div>
                            <div className="text-lg sm:text-xl font-bold">{formatCurrency(prizes.third.amount)}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">{prizes.third.title}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {prizes?.special && prizes.special.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Special Awards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {prizes.special.map((award, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                            <Award className="h-8 w-8 text-primary" />
                            <div>
                              <div className="font-semibold">{award.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatCurrency(award.amount)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="text-xl font-bold">
                        {formatCurrency(hackathon.prizePool || 0)}
                      </span>
                    </div>
                    {!hackathon.isPaid && (
                      <Badge variant="secondary">Free Entry</Badge>
                    )}
                  </div>

                  <div className="mb-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(hackathon.hackathonStartDate)} - {formatDate(hackathon.hackathonEndDate)}</span>
                    </div>
                    {hackathon.city && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{hackathon.city}, {hackathon.country}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{hackathon.minTeamSize}-{hackathon.maxTeamSize} members per team</span>
                    </div>
                    {hackathon.registrationEndDate && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{getTimeRemaining(hackathon.registrationEndDate)}</span>
                      </div>
                    )}
                  </div>

                  {isAuthenticated ? (
                    <Link href={`/hackathon/${id}/register`}>
                      <Button className="w-full" size="lg" data-testid="button-register">
                        Register Now
                      </Button>
                    </Link>
                  ) : (
                    <a href="/api/login">
                      <Button className="w-full" size="lg" data-testid="button-login-to-register">
                        Login to Register
                      </Button>
                    </a>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" data-testid="button-share">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                    {hackathon.websiteUrl && (
                      <a href={hackathon.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Website
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-3 font-semibold">Contact Organizers</h3>
                  <div className="space-y-2 text-sm">
                    {hackathon.contactEmail && (
                      <a
                        href={`mailto:${hackathon.contactEmail}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{hackathon.contactEmail}</span>
                      </a>
                    )}
                    {hackathon.websiteUrl && (
                      <a
                        href={hackathon.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Official Website</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
