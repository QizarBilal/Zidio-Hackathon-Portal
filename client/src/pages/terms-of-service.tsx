import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, AlertCircle, ShieldCheck } from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "December 19, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b bg-gradient-to-br from-primary/5 via-background to-background py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4" variant="secondary">
              <FileText className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Terms of Service
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
            {/* Agreement */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Scale className="h-6 w-6 text-primary" />
                    Agreement to Terms
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    These Terms of Service ("Terms") constitute a legally binding agreement between you and Zidio Development ("ZidioHacks," "we," "us," or "our") governing your access to and use of the ZidioHacks platform, including our website, mobile applications, and related services (collectively, the "Services").
                  </p>
                  <p className="text-muted-foreground">
                    By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you do not have permission to access the Services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">1. User Accounts and Registration</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">1.1 Account Creation</h3>
                    <p className="text-sm text-muted-foreground">
                      To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">1.2 Account Security</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">1.3 Eligibility</h3>
                    <p className="text-sm text-muted-foreground">
                      You must be at least 13 years old to use our Services. Users under 18 must have parental or guardian consent. By using the Services, you represent that you meet these requirements.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">1.4 Account Termination</h3>
                    <p className="text-sm text-muted-foreground">
                      We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our discretion.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  2. Acceptable Use Policy
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">You agree NOT to:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                    <li>Use the Services for any illegal purpose or in violation of any laws</li>
                    <li>Impersonate any person or entity or falsely state your affiliation</li>
                    <li>Submit fraudulent hackathon entries or plagiarized content</li>
                    <li>Attempt to gain unauthorized access to any part of the Services</li>
                    <li>Upload viruses, malware, or any malicious code</li>
                    <li>Scrape, crawl, or harvest data from the Services without permission</li>
                    <li>Interfere with or disrupt the Services or servers</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Use automated systems (bots) without our express written consent</li>
                    <li>Reverse engineer or attempt to extract source code from our platform</li>
                    <li>Create multiple accounts to manipulate rankings or voting</li>
                    <li>Share or sell your account access to third parties</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Hackathon Participation */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">3. Hackathon Participation</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">3.1 Registration and Teams</h3>
                    <p className="text-sm text-muted-foreground">
                      When registering for a hackathon, you agree to comply with the specific rules and requirements set by the organizers. Team formations are binding once submitted.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">3.2 Original Work</h3>
                    <p className="text-sm text-muted-foreground">
                      All submissions must be your original work created during the hackathon period unless otherwise specified. Plagiarism or submission of pre-existing projects may result in disqualification and account suspension.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">3.3 Intellectual Property</h3>
                    <p className="text-sm text-muted-foreground">
                      You retain ownership of your hackathon submissions. However, by submitting, you grant ZidioHacks and the hackathon organizers a non-exclusive, worldwide license to display, distribute, and promote your work.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">3.4 Prizes and Awards</h3>
                    <p className="text-sm text-muted-foreground">
                      Prize distribution is subject to verification of eligibility and compliance with rules. Winners must provide required tax documentation. Prizes may be subject to applicable taxes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content and Submissions */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">4. User Content</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">4.1 Your Responsibility</h3>
                    <p className="text-sm text-muted-foreground">
                      You are solely responsible for all content you post, upload, or submit through the Services. You represent that you have all necessary rights to such content.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">4.2 Content License</h3>
                    <p className="text-sm text-muted-foreground">
                      By submitting content, you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, copy, modify, distribute, publish, and process your content for the purpose of operating and improving our Services.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">4.3 Content Moderation</h3>
                    <p className="text-sm text-muted-foreground">
                      We reserve the right (but not the obligation) to remove or disable access to any content that violates these Terms or that we find objectionable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">5. Intellectual Property Rights</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    The Services and all content provided by ZidioHacks, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the property of ZidioHacks or its licensors and are protected by Indian and international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                  <p>
                    The ZidioHacks name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Zidio Development. You may not use such marks without our prior written permission.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">6. Payment and Fees</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">6.1 Registration Fees</h3>
                    <p className="text-sm text-muted-foreground">
                      Some hackathons may require registration fees. All fees are non-refundable unless the event is cancelled by the organizers.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">6.2 Payment Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Payments are processed through third-party payment providers. You agree to their terms and conditions. We are not responsible for payment processing errors or disputes.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">6.3 Taxes</h3>
                    <p className="text-sm text-muted-foreground">
                      You are responsible for all applicable taxes associated with your use of the Services and any prizes received.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  7. Disclaimers
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">
                    THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                  </p>
                  <p>
                    We do not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components. We make no guarantees regarding the accuracy, reliability, or availability of the Services.
                  </p>
                  <p>
                    We are not responsible for the conduct of hackathon organizers, other users, or third parties. Any interactions you have with other users or organizers are solely between you and them.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZIDIOHACKS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                  </p>
                  <p>
                    OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRIOR TO THE CLAIM, OR ₹1,000, WHICHEVER IS GREATER.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Indemnification */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
                <p className="text-sm text-muted-foreground">
                  You agree to indemnify, defend, and hold harmless ZidioHacks, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with your access to or use of the Services, your violation of these Terms, or your violation of any rights of another party.
                </p>
              </CardContent>
            </Card>

            {/* Dispute Resolution */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">10. Dispute Resolution and Governing Law</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">10.1 Governing Law</h3>
                    <p className="text-sm text-muted-foreground">
                      These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">10.2 Jurisdiction</h3>
                    <p className="text-sm text-muted-foreground">
                      Any disputes arising from these Terms or the Services shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">10.3 Arbitration</h3>
                    <p className="text-sm text-muted-foreground">
                      For disputes exceeding ₹5,00,000, both parties agree to first attempt resolution through binding arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modifications */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">11. Modifications to Terms</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by email or through a prominent notice on the Services. Your continued use of the Services after such modifications constitutes your acceptance of the updated Terms.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you do not agree to the modified Terms, you must stop using the Services.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">12. Termination</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including breach of these Terms.
                </p>
                <p className="text-sm text-muted-foreground">
                  Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </CardContent>
            </Card>

            {/* General Provisions */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">13. General Provisions</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Entire Agreement:</span> These Terms constitute the entire agreement between you and ZidioHacks regarding the Services.</p>
                  <p><span className="font-semibold text-foreground">Severability:</span> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.</p>
                  <p><span className="font-semibold text-foreground">Waiver:</span> No waiver of any term shall be deemed a further or continuing waiver of such term or any other term.</p>
                  <p><span className="font-semibold text-foreground">Assignment:</span> You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations without restriction.</p>
                  <p><span className="font-semibold text-foreground">Force Majeure:</span> We shall not be liable for any failure to perform due to circumstances beyond our reasonable control.</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Email:</span> legal@zidiohacks.com</p>
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
