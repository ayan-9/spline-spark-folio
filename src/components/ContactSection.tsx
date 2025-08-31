import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Send, Github, Linkedin, Facebook, Phone, Instagram } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CountryCodeSelect from "@/components/CountryCodeSelect";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [countryCode, setCountryCode] = useState('+92');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: {
          ...formData,
          phone: formData.phone ? `${countryCode} ${formData.phone}` : ''
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/ayan-9",
      color: "hover:text-primary"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/muhammadayananwer/",
      color: "hover:text-primary"
    },
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      url: "https://www.facebook.com/ayan.anwer.54",
      color: "hover:text-primary"
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "https://www.instagram.com/final_boss.01/",
      color: "hover:text-secondary"
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard variant="contact" className="animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="text-primary" size={24} />
                <h3 className="text-2xl font-semibold text-foreground">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-input/50 border-card-border text-foreground placeholder:text-muted-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-input/50 border-card-border text-foreground placeholder:text-muted-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Contact Number</Label>
                  <div className="flex gap-2">
                    <CountryCodeSelect
                      value={countryCode}
                      onValueChange={setCountryCode}
                    />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 bg-input/50 border-card-border text-foreground placeholder:text-muted-foreground"
                      placeholder="300 1234567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-input/50 border-card-border text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </form>
            </div>
          </GlassCard>

          <GlassCard variant="contact" className="animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="text-secondary" size={24} />
                <h3 className="text-2xl font-semibold text-foreground">Get in Touch</h3>
              </div>

              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  I'm always open to discussing new opportunities, creative projects, 
                  and innovative ideas. Whether you're a startup looking to build 
                  something amazing or an established company seeking to innovate, 
                  let's explore how we can work together. If you want to connect or 
                  collaborate on a project, feel free to reach out via email or WhatsApp.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Mail size={16} className="text-primary" />
                    <span>muhammadayananwer5@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Phone size={16} className="text-secondary" />
                    <span>+92 345 2284536</span>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.name}
                        variant="outline"
                        size="icon"
                        asChild
                        className={`${link.color} transition-colors`}
                      >
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={link.name}
                        >
                          {link.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-card-border">
                  <p className="text-sm text-muted-foreground">
                    Typically responds within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;