import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, Eye, ShieldCheck } from "lucide-react";

export default function CookiePolicyPage() {
  const lastUpdated = "December 19, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b bg-gradient-to-br from-primary/5 via-background to-background py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4" variant="secondary">
              <Cookie className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Cookie Policy
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
                    <Cookie className="h-6 w-6 text-primary" />
                    What Are Cookies?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience. Cookies help us remember your preferences, understand how you use our platform, and improve our services.
                  </p>
                  <p className="text-muted-foreground">
                    This Cookie Policy explains what cookies are, how we use them on the ZidioHacks platform, what types of cookies we use, and how you can control them.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Cookies */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-primary" />
                  How We Use Cookies
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Authentication:</span> To keep you logged in as you navigate through different pages</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Preferences:</span> To remember your settings like language, theme (light/dark mode), and display preferences</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Analytics:</span> To understand how you interact with our platform and identify areas for improvement</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Security:</span> To detect and prevent fraudulent activity and protect your account</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground mt-1">•</span>
                    <p><span className="font-semibold text-foreground">Performance:</span> To optimize page loading times and improve overall platform performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
                
                {/* Strictly Necessary */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">1. Strictly Necessary Cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      These cookies are essential for the platform to function properly. They enable core functionality such as security, network management, and accessibility. Without these cookies, services you have requested cannot be provided.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs font-semibold mb-2">Examples:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• <span className="font-mono">auth_token</span> - Keeps you logged in (Duration: 7 days)</li>
                        <li>• <span className="font-mono">session_id</span> - Maintains your session (Duration: Session)</li>
                        <li>• <span className="font-mono">csrf_token</span> - Protects against security threats (Duration: Session)</li>
                        <li>• <span className="font-mono">cookie_consent</span> - Remembers your cookie preferences (Duration: 1 year)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Performance Cookies */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">2. Performance Cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      These cookies collect information about how you use our platform, such as which pages you visit most often and if you receive error messages. This helps us improve the performance and functionality of our services.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs font-semibold mb-2">Examples:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• <span className="font-mono">_ga</span> - Google Analytics (Duration: 2 years)</li>
                        <li>• <span className="font-mono">_gid</span> - Google Analytics (Duration: 24 hours)</li>
                        <li>• <span className="font-mono">_gat</span> - Google Analytics throttling (Duration: 1 minute)</li>
                        <li>• <span className="font-mono">performance_metrics</span> - Page load times (Duration: 30 days)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Cookie className="h-5 w-5 text-purple-500" />
                      <h3 className="font-semibold">3. Functional Cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      These cookies allow us to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs font-semibold mb-2">Examples:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• <span className="font-mono">theme_preference</span> - Light/dark mode setting (Duration: 1 year)</li>
                        <li>• <span className="font-mono">language</span> - Your language preference (Duration: 1 year)</li>
                        <li>• <span className="font-mono">sidebar_state</span> - Navigation panel state (Duration: 30 days)</li>
                        <li>• <span className="font-mono">timezone</span> - Your timezone setting (Duration: 1 year)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Targeting Cookies */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-orange-500" />
                      <h3 className="font-semibold">4. Targeting/Advertising Cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs font-semibold mb-2">Examples:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• <span className="font-mono">_fbp</span> - Facebook Pixel (Duration: 3 months)</li>
                        <li>• <span className="font-mono">_gcl_au</span> - Google Ads conversion (Duration: 3 months)</li>
                        <li>• <span className="font-mono">LinkedIn insights</span> - LinkedIn tracking (Duration: 2 years)</li>
                        <li>• <span className="font-mono">tracking_id</span> - Marketing campaigns (Duration: 90 days)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Cookies */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  We work with trusted third-party service providers who may also set cookies on your device when you use our platform. These include:
                </p>
                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold mb-1">Google Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Helps us understand user behavior and improve our platform. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold mb-1">Facebook Pixel</h3>
                    <p className="text-sm text-muted-foreground">
                      Measures advertising effectiveness and builds targeted audiences. <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold mb-1">LinkedIn Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Tracks conversions and provides analytics for our professional network. <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold mb-1">Payment Processors</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure payment processing for registration fees (Stripe, Razorpay)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Management */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="h-6 w-6 text-primary" />
                  How to Control Cookies
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Browser Settings</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Most web browsers allow you to control cookies through their settings preferences. However, if you disable cookies, some features of our platform may not function properly.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-semibold">Common browsers:</p>
                      <ul className="space-y-1 text-muted-foreground ml-4">
                        <li>• <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                        <li>• <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                        <li>• <a href="https://support.apple.com/en-in/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple Safari</a></li>
                        <li>• <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Cookie Preference Center</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      You can manage your cookie preferences directly on our platform. Click the button below to access the cookie settings and customize your choices.
                    </p>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Cookie Preferences
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Opt-Out of Targeted Advertising</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      To opt out of interest-based advertising, visit:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices</a> (EU)</li>
                      <li>• <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Network Advertising Initiative</a> (US)</li>
                      <li>• <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance</a> (US)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Mobile Devices</h3>
                    <p className="text-sm text-muted-foreground">
                      For mobile devices, you can reset your advertising identifier or opt out of personalized ads in your device settings:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                      <li>• iOS: Settings → Privacy → Advertising → Limit Ad Tracking</li>
                      <li>• Android: Settings → Google → Ads → Opt out of Ads Personalization</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Do Not Track */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Do Not Track Signals</h2>
                <p className="text-sm text-muted-foreground">
                  Some browsers have a "Do Not Track" feature that lets you tell websites you do not want to have your online activities tracked. Currently, our platform does not respond to Do Not Track signals, as there is no industry standard for how to handle them. We will continue to monitor developments in this area.
                </p>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
                <p className="text-sm text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of significant changes by posting a notice on our platform or by email. The "Last updated" date at the top of this page indicates when the policy was last revised.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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
