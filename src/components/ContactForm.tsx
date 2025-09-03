import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { validateContactForm, VALIDATION_LIMITS } from "@/lib/validation";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface EmailConfig {
  SERVICE_ID: string;
  TEMPLATE_ID: string;
  PUBLIC_KEY: string;
}

const ContactForm: React.FC = () => {
  // Form state using refs as requested
  const nameRef = useRef<string>('');
  const emailRef = useRef<string>('');
  const phoneRef = useRef<string>('');
  const messageRef = useRef<string>('');
  
  // UI state for displaying current values and validation
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [countryCode, setCountryCode] = useState<string>('+92');
  const [phoneExample, setPhoneExample] = useState<string>('300 1234567');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const { toast } = useToast();

  // EmailJS configuration placeholders
  const EMAIL_CONFIG: EmailConfig = {
    SERVICE_ID: 'YOUR_SERVICE_ID',
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Apply field-specific length limits
    let limitedValue = value;
    if (name === 'name' && value.length > VALIDATION_LIMITS.NAME_MAX) {
      limitedValue = value.slice(0, VALIDATION_LIMITS.NAME_MAX);
    } else if (name === 'email' && value.length > VALIDATION_LIMITS.EMAIL_MAX) {
      limitedValue = value.slice(0, VALIDATION_LIMITS.EMAIL_MAX);
    } else if (name === 'phone' && value.length > VALIDATION_LIMITS.PHONE_MAX) {
      limitedValue = value.slice(0, VALIDATION_LIMITS.PHONE_MAX);
    } else if (name === 'message' && value.length > VALIDATION_LIMITS.MESSAGE_MAX) {
      limitedValue = value.slice(0, VALIDATION_LIMITS.MESSAGE_MAX);
    }
    
    // Update refs with the current values
    if (name === 'name') nameRef.current = limitedValue;
    if (name === 'email') emailRef.current = limitedValue;
    if (name === 'phone') phoneRef.current = limitedValue;
    if (name === 'message') messageRef.current = limitedValue;
    
    // Update display state
    setFormValues(prev => ({
      ...prev,
      [name]: limitedValue
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateForm = () => {
    // Get current values from refs
    const formData = {
      name: nameRef.current,
      email: emailRef.current,
      phone: phoneRef.current ? `${countryCode} ${phoneRef.current}` : '',
      message: messageRef.current
    };

    // Check required fields first
    if (!formData.name.trim()) {
      return { isValid: false, errors: ['Name is required'] };
    }
    if (!formData.email.trim()) {
      return { isValid: false, errors: ['Email is required'] };
    }
    if (!formData.message.trim()) {
      return { isValid: false, errors: ['Message is required'] };
    }
    if (formData.message.trim().length < 10) {
      return { isValid: false, errors: ['Message must be at least 10 characters'] };
    }

    // Use existing validation function
    return validateContactForm(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);

    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast({
        title: "Validation Error",
        description: validation.errors[0],
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: nameRef.current,
        from_email: emailRef.current,
        contact_number: phoneRef.current ? `${countryCode} ${phoneRef.current}` : 'Not provided',
        message: messageRef.current,
        to_name: 'Ayan', // Replace with your name
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);

      // Show success message
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      // Clear form after successful submission
      nameRef.current = '';
      emailRef.current = '';
      phoneRef.current = '';
      messageRef.current = '';
      setFormValues({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setCountryCode('+92');

    } catch (error: any) {
      console.error('EmailJS Error:', error);
      
      // Show error message
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassCard variant="contact" className="animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="text-primary" size={24} />
          <h3 className="text-2xl font-semibold text-foreground">Send a Message</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Name ({formValues.name.length}/{VALIDATION_LIMITS.NAME_MAX})
            </Label>
            <Input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              minLength={VALIDATION_LIMITS.NAME_MIN}
              maxLength={VALIDATION_LIMITS.NAME_MAX}
              className="bg-input/50 border-card-border text-foreground placeholder:text-muted-foreground"
              placeholder="Your name"
              aria-describedby="name-help"
            />
            <p id="name-help" className="text-xs text-muted-foreground">
              Letters, spaces, hyphens, and apostrophes only
            </p>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email ({formValues.email.length}/{VALIDATION_LIMITS.EMAIL_MAX})
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
              maxLength={VALIDATION_LIMITS.EMAIL_MAX}
              className="bg-input/50 border-card-border text-foreground placeholder:text-muted-foreground"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">
              Contact Number (Optional)
            </Label>
            <div className="flex gap-2">
              <CountryCodeSelect
                value={countryCode}
                onValueChange={setCountryCode}
                onExampleChange={setPhoneExample}
              />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleInputChange}
                maxLength={VALIDATION_LIMITS.PHONE_MAX}
                className="flex-1 bg-input/50 border-card-border text-foreground placeholder:text-muted-foreground"
                placeholder={phoneExample}
                aria-describedby="phone-help"
              />
            </div>
            <p id="phone-help" className="text-xs text-muted-foreground">
              Numbers, spaces, and common symbols only
            </p>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Message ({formValues.message.length}/{VALIDATION_LIMITS.MESSAGE_MAX})
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleInputChange}
              required
              minLength={VALIDATION_LIMITS.MESSAGE_MIN}
              maxLength={VALIDATION_LIMITS.MESSAGE_MAX}
              rows={4}
              className="bg-input/50 border-card-border text-foreground placeholder:text-muted-foreground resize-none"
              placeholder="Tell me about your project..."
            />
            <p className="text-xs text-muted-foreground">
              Minimum {VALIDATION_LIMITS.MESSAGE_MIN} characters
            </p>
          </div>

          {/* Submit Button */}
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
  );
};

export default ContactForm;