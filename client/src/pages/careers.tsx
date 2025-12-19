import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Heart,
  Zap,
  Coffee,
  Laptop,
  Award,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "4-6 years",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["Product Strategy", "User Research", "Agile", "Data Analysis"],
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Bangalore, India / Remote",
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform"],
    },
    {
      title: "Community Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2-3 years",
      skills: ["Community Building", "Content Creation", "Social Media", "Events"],
    },
    {
      title: "Business Development Executive",
      department: "Sales",
      location: "Bangalore / Mumbai / Delhi",
      type: "Full-time",
      experience: "1-3 years",
      skills: ["B2B Sales", "Partnership Development", "CRM", "Negotiation"],
    },
  ];

  const benefits = [
    {
      icon: Laptop,
      title: "Remote-First Culture",
      description: "Work from anywhere in India with flexible hours",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance for you and your family",
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "₹50,000 annual learning budget and conference passes",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Unlimited leaves and 4-day work weeks during summer",
    },
    {
      icon: Award,
      title: "Stock Options",
      description: "ESOP program for all employees after 6 months",
    },
    {
      icon: Users,
      title: "Team Events",
      description: "Quarterly offsites and annual hackathons",
    },
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We encourage experimentation and celebrate creative problem-solving.",
    },
    {
      title: "Ownership Mindset",
      description: "Take full ownership of your work and drive meaningful impact.",
    },
    {
      title: "Collaborative Spirit",
      description: "Work together, learn together, and grow together as one team.",
    },
    {
      title: "Customer Obsession",
      description: "Every decision we make puts our users and partners first.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b bg-gradient-to-br from-primary/10 via-background to-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">Join Our Team</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Build the Future of Hackathons with Us
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Join a mission-driven team that's empowering India's next generation of innovators. We're looking for passionate individuals who want to make a real impact.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="gap-2" onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}>
                <Briefcase className="h-4 w-4" />
                View Open Positions
              </Button>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Why ZidioHacks?
            </h2>
            <p className="text-muted-foreground">
              More than just a job, it's an opportunity to shape the future
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-12 sm:py-16 lg:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Open Positions
            </h2>
            <p className="text-muted-foreground">
              Join one of our growing teams and make an impact from day one
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{position.title}</h3>
                        <Badge variant="secondary">{position.department}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{position.experience}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {position.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Link href="/contact">
                        <Button className="w-full sm:w-auto">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              Don't see a role that fits? We're always looking for exceptional talent.
            </p>
            <Link href="/contact">
              <Button variant="outline">
                Send Your Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Our Hiring Process
            </h2>
            <p className="text-muted-foreground">
              Simple, transparent, and designed to get to know you better
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Application", description: "Submit your resume and cover letter" },
              { step: "2", title: "Screening", description: "Initial call with our talent team" },
              { step: "3", title: "Interviews", description: "Technical and cultural fit discussions" },
              { step: "4", title: "Offer", description: "Welcome to the ZidioHacks family!" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-12 sm:py-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join us in building India's largest hackathon ecosystem
            </p>
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
