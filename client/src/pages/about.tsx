import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MapPin,
  Calendar,
  Handshake,
  Building2,
  Code2,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              We're building where ideas meet execution
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Started in 2019 by three engineering students who couldn't find a single place to discover and participate in hackathons across India. What began as a weekend project is now used by students and professionals in 23 states.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">How we got here</h2>
            
            <div className="space-y-8 text-muted-foreground">
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  In September 2019, we were trying to find hackathons to participate in during our semester break. Information was scattered across college notice boards, WhatsApp groups, and random Facebook pages. Most events had already closed registrations by the time we found them.
                </p>
                <p className="text-lg leading-relaxed">
                  That frustration turned into ZidioHacks. We built the first version in three weeks – just a simple list of upcoming hackathons with registration links. Shared it in a few college groups, and within two months, 400 students were using it.
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-primary">
                <p className="text-base">
                  <span className="font-semibold text-foreground">"The real shift happened in 2021"</span> – when universities started reaching out to host their events on our platform. That's when we realized this could be more than just a listing site. It could be the entire ecosystem.
                </p>
                <p className="text-sm mt-3 text-muted-foreground">— Rahul, Co-founder</p>
              </div>

              <div>
                <p className="text-lg leading-relaxed">
                  Today, we're a team of 14 people working from Bangalore and Pune. We've facilitated over 380 hackathons, connected 47,000+ participants with opportunities, and helped organizations find talent they wouldn't have discovered otherwise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Stats */}
      <section className="py-12 sm:py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold mb-8 max-w-4xl mx-auto">Right now</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">47,200</div>
              <p className="text-muted-foreground">Students actively using the platform</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">142</div>
              <p className="text-muted-foreground">Partner institutions and companies</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">23</div>
              <p className="text-muted-foreground">States across India</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹8.4Cr</div>
              <p className="text-muted-foreground">In prizes distributed this year</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">What we actually do</h2>
            
            <div className="space-y-8">
              <Card className="border-2">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg mt-1">
                      <Calendar className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">For participants</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Find hackathons that match your interests and skill level. Get real-time updates on registrations, deadlines, and results. Track your submissions and see how you rank. Build a portfolio that actually showcases what you've built.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-500/10 rounded-lg mt-1">
                      <Building2 className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">For organizers</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Complete event management from registration to judging. Handle hundreds of submissions without spreadsheet chaos. Access quality participants who are genuinely interested in your problem statements. Get detailed analytics on engagement and outcomes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg mt-1">
                      <Handshake className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">For recruiters</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Skip the resume screening. See actual work from developers, designers, and problem solvers. Find candidates who can execute under pressure. Connect directly with talent that fits your needs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">The team</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We're 14 people spread across Bangalore and Pune. Engineers, designers, and community managers who've all participated in hackathons themselves. We know what works because we've been on the other side.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Engineering (6)</h3>
                <p className="text-sm text-muted-foreground">Building the platform and infrastructure</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Operations (5)</h3>
                <p className="text-sm text-muted-foreground">Working with organizers and participants</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Design (3)</h3>
                <p className="text-sm text-muted-foreground">Making everything work smoothly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Things we're proud of</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <p className="text-lg leading-relaxed mb-2">
                  In 2022, a first-year student from Nagpur won her first hackathon through our platform. She's now working at a Bangalore startup she connected with through that event.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <p className="text-lg leading-relaxed mb-2">
                  Last year, we helped IIT Madras run their annual hackathon with 2,400 participants across 18 cities. Zero technical issues during submission time.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <p className="text-lg leading-relaxed mb-2">
                  Three projects built during hackathons on our platform have turned into actual funded startups. One of them raised seed funding in August 2024.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <p className="text-lg leading-relaxed mb-2">
                  We've processed over 180,000 hackathon submissions. That's a lot of ideas, prototypes, and late-night coding sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working With */}
      <section className="py-12 sm:py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Working with</h2>
            
            <div className="grid sm:grid-cols-3 gap-6 text-muted-foreground">
              <div>
                <GraduationCap className="h-8 w-8 mb-3 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">73 Universities</h3>
                <p className="text-sm">IITs, NITs, private engineering colleges, and management schools across India</p>
              </div>
              
              <div>
                <Building2 className="h-8 w-8 mb-3 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">69 Companies</h3>
                <p className="text-sm">From startups to enterprises looking for talent and testing problem statements</p>
              </div>
              
              <div>
                <Sparkles className="h-8 w-8 mb-3 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">Independent Organizers</h3>
                <p className="text-sm">Student clubs, coding communities, and non-profits running their own events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-12 sm:py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Where we work</h2>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Bangalore</h3>
                    <p className="text-muted-foreground">Main office — Engineering, operations, and design</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Koramangala, near Sony Signal. Small office above a coffee shop. Come say hi if you're around.
                </p>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Pune</h3>
                    <p className="text-muted-foreground">Remote team — Community and partnerships</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Working with universities and event organizers in Maharashtra and Gujarat region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 border-t bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Want to work with us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Check open positions or reach out if you're organizing a hackathon
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/careers">
                <Button size="lg">View Open Positions</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
