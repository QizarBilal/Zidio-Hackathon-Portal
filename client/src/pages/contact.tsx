import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Instagram,
  Clock,
  HelpCircle,
  FileText,
  Users,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b bg-gradient-to-br from-primary/5 via-background to-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get in Touch with Us
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Have questions or feedback? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll respond within 24 hours.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="How can we help you?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:support@zidiohacks.com" className="text-sm text-muted-foreground hover:text-primary">
                          support@zidiohacks.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+911234567890" className="text-sm text-muted-foreground hover:text-primary">
                          +91 123 456 7890
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          Zidio Development<br />
                          Bangalore, Karnataka<br />
                          India - 560001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                          Saturday: 10:00 AM - 4:00 PM IST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Connect with Us
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-3">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-lg border hover:bg-primary/10 hover:border-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-lg border hover:bg-primary/10 hover:border-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-lg border hover:bg-primary/10 hover:border-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-lg border hover:bg-primary/10 hover:border-primary transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-lg border hover:bg-primary/10 hover:border-primary transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:support@zidiohacks.com"
                      className="flex items-center justify-center p-3 rounded-lg border hover:bg-primary/10 hover:border-primary transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="border-t bg-card py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Quick Help & Resources
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions or explore our resources
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">FAQs</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse frequently asked questions about hackathons, registration, and more.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View FAQs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access comprehensive guides and documentation for participants and organizers.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Read Docs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join our vibrant community of innovators, builders, and problem solvers.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-12 sm:py-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Your Hackathon Journey?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of innovators building the future through hackathons
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="gap-2">
                <Users className="h-4 w-4" />
                Sign Up Now
              </Button>
              <Button variant="outline" size="lg">
                Explore Hackathons
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
