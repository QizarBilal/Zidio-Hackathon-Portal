import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, UserCheck, Database, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 19, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b bg-gradient-to-br from-primary/5 via-background to-background py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4" variant="secondary">
              <Shield className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Lock className="h-6 w-6 text-primary" />
                    Introduction
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    At ZidioHacks ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our hackathon platform and related services.
                  </p>
                  <p className="text-muted-foreground">
                    Please read this privacy policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by this privacy policy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Database className="h-6 w-6 text-primary" />
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">1. Personal Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                      <li>Name, email address, phone number</li>
                      <li>Educational institution and degree details</li>
                      <li>Date of birth and government ID (for verification)</li>
                      <li>Profile photo and portfolio links</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">2. Usage Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                      <li>IP address, browser type, and device information</li>
                      <li>Pages visited, time spent, and navigation patterns</li>
                      <li>Hackathon registrations, submissions, and interactions</li>
                      <li>Team formations and collaboration activities</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">3. Technical Data</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                      <li>Cookies and similar tracking technologies</li>
                      <li>Log files and server data</li>
                      <li>API usage and integration data</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-primary" />
                  How We Use Your Information
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Platform Operations:</span> To provide, maintain, and improve our hackathon platform services</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Account Management:</span> To create and manage your user account and profile</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Communications:</span> To send hackathon updates, notifications, and marketing communications</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Team Matching:</span> To facilitate team formation and collaboration among participants</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Analytics:</span> To analyze usage patterns and improve user experience</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Security:</span> To detect, prevent, and address fraud or security issues</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Legal Compliance:</span> To comply with applicable laws and regulations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing and Disclosure */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <UserCheck className="h-6 w-6 text-primary" />
                  Data Sharing and Disclosure
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">We may share your information with:</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                      <li><span className="font-semibold text-foreground">Hackathon Organizers:</span> Your profile and submission details with organizations hosting hackathons you participate in</li>
                      <li><span className="font-semibold text-foreground">Service Providers:</span> Third-party vendors who help us operate our platform (payment processors, cloud hosting, analytics)</li>
                      <li><span className="font-semibold text-foreground">Educational Institutions:</span> Your participation and achievement records with your affiliated institution (with consent)</li>
                      <li><span className="font-semibold text-foreground">Recruiters:</span> Your portfolio and skills data with companies you've authorized</li>
                      <li><span className="font-semibold text-foreground">Legal Authorities:</span> When required by law or to protect our rights and safety</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We do not sell your personal information to third parties for their marketing purposes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Data Security
                </h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational measures to protect your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                  <li>End-to-end encryption for sensitive data transmission</li>
                  <li>Secure data storage with industry-standard encryption</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Access:</span> Request a copy of your personal data we hold</p>
                  <p><span className="font-semibold text-foreground">Correction:</span> Update or correct inaccurate information</p>
                  <p><span className="font-semibold text-foreground">Deletion:</span> Request deletion of your account and data (subject to legal obligations)</p>
                  <p><span className="font-semibold text-foreground">Portability:</span> Receive your data in a structured, machine-readable format</p>
                  <p><span className="font-semibold text-foreground">Opt-Out:</span> Unsubscribe from marketing communications at any time</p>
                  <p><span className="font-semibold text-foreground">Restriction:</span> Request limitation of processing in certain circumstances</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  To exercise these rights, contact us at privacy@zidiohacks.com
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  Cookies and Tracking
                </h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. For detailed information, see our Cookie Policy.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in countries other than India. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy and applicable laws.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. We will notify you of significant changes by email or through a prominent notice on our platform. Your continued use of our services after such modifications constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions or concerns about this privacy policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Email:</span> privacy@zidiohacks.com</p>
                  <p><span className="font-semibold">Phone:</span> +91 123 456 7890</p>
                  <p><span className="font-semibold">Address:</span> Zidio Development, Bangalore, Karnataka, India - 560001</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
