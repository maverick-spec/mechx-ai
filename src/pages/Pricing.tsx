
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Pricing = () => {
  const { toast } = useToast();
  const [yearlyBilling, setYearlyBilling] = useState(false);

  const pricingPlans = [
    {
      name: "Basic",
      description: "Essential tools for beginners and hobbyists",
      monthlyPrice: "₹1,499",
      yearlyPrice: "₹14,999",
      features: [
        "Access to 10+ basic projects",
        "Community forum access",
        "Standard documentation",
        "Email support (24h response)",
        "1 project download per month"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Advanced",
      description: "Perfect for serious enthusiasts and small teams",
      monthlyPrice: "₹2,999",
      yearlyPrice: "₹29,999",
      features: [
        "Access to all basic + 20 advanced projects",
        "Priority forum support",
        "Detailed project documentation",
        "Email support (12h response)",
        "5 project downloads per month",
        "Custom project modifications",
        "Monthly webinar access"
      ],
      cta: "Upgrade Now",
      highlight: true
    },
    {
      name: "Pro",
      description: "Complete solution for professionals and businesses",
      monthlyPrice: "₹5,999",
      yearlyPrice: "₹59,999",
      features: [
        "Access to all projects (basic + advanced + pro)",
        "Dedicated support channel",
        "Complete documentation with source files",
        "Priority email & phone support (4h response)",
        "Unlimited project downloads",
        "Custom project development assistance",
        "Weekly webinar access",
        "1-on-1 consultation sessions"
      ],
      cta: "Go Pro",
      highlight: false
    }
  ];

  const handlePurchase = (plan) => {
    toast({
      title: `${plan} Plan Selected`,
      description: "You'll be redirected to complete your purchase.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-12">
          <SectionHeading
            title="Simple, Transparent Pricing"
            subtitle="Choose the perfect plan for your engineering journey"
          />

          {/* Billing Toggle */}
          <div className="flex justify-center items-center space-x-3 mb-8">
            <span className={`text-sm ${!yearlyBilling ? 'font-medium' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setYearlyBilling(!yearlyBilling)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                className={`${
                  yearlyBilling ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 rounded-full bg-white transition-transform`}
              />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${yearlyBilling ? 'font-medium' : 'text-muted-foreground'}`}>
              Yearly
              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${
                  plan.highlight 
                    ? 'border-mechatronix-600 dark:border-mechatronix-400 shadow-lg' 
                    : 'border-border'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-mechatronix-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{yearlyBilling ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="text-muted-foreground ml-1">/{yearlyBilling ? 'year' : 'month'}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handlePurchase(plan.name)}
                    className={`w-full ${
                      plan.highlight 
                        ? 'bg-mechatronix-600 hover:bg-mechatronix-700' 
                        : ''
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-2">Frequently Asked Questions</h3>
            <p className="text-muted-foreground mb-6">
              Have more questions? Visit our <a href="/faqs" className="text-mechatronix-600 hover:underline">FAQs page</a> or <a href="/contact" className="text-mechatronix-600 hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
