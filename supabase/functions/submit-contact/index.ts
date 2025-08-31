import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Validation constants
const VALIDATION_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 320,
  PHONE_MAX: 15,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 2000,
} as const;

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove any potential HTML/script tags and normalize whitespace
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .replace(/\s+/g, ' '); // Normalize whitespace
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= VALIDATION_LIMITS.EMAIL_MAX;
}

function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name) && 
         name.length >= VALIDATION_LIMITS.NAME_MIN && 
         name.length <= VALIDATION_LIMITS.NAME_MAX;
}

function validatePhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s+()-]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length <= VALIDATION_LIMITS.PHONE_MAX;
}

function validateMessage(message: string): boolean {
  return message.length >= VALIDATION_LIMITS.MESSAGE_MIN && 
         message.length <= VALIDATION_LIMITS.MESSAGE_MAX;
}

function checkRateLimit(clientId: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 3; // Max 3 requests per minute
  
  const userLimit = rateLimitStore.get(clientId);
  
  if (!userLimit || now - userLimit.lastReset > windowMs) {
    rateLimitStore.set(clientId, { count: 1, lastReset: now });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  
  if (userLimit.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  
  userLimit.count++;
  rateLimitStore.set(clientId, userLimit);
  return { allowed: true, remaining: maxRequests - userLimit.count };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIp);
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: 60 
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '60'
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error. Please try again later.' 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { name, email, phone, message }: ContactFormData = await req.json();

    // Validate and sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedPhone = phone ? sanitizeInput(phone) : null;
    const sanitizedMessage = sanitizeInput(message);

    // Comprehensive validation
    const validationErrors: string[] = [];
    
    if (!sanitizedName) {
      validationErrors.push('Name is required');
    } else if (!validateName(sanitizedName)) {
      validationErrors.push('Invalid name format');
    }
    
    if (!sanitizedEmail) {
      validationErrors.push('Email is required');
    } else if (!validateEmail(sanitizedEmail)) {
      validationErrors.push('Invalid email format');
    }
    
    if (sanitizedPhone && !validatePhone(sanitizedPhone)) {
      validationErrors.push('Invalid phone number format');
    }
    
    if (!sanitizedMessage) {
      validationErrors.push('Message is required');
    } else if (!validateMessage(sanitizedMessage)) {
      validationErrors.push(`Message must be between ${VALIDATION_LIMITS.MESSAGE_MIN} and ${VALIDATION_LIMITS.MESSAGE_MAX} characters`);
    }

    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: validationErrors 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Insert the contact message into the database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          message: sanitizedMessage,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      
      // Don't expose internal database errors to the client
      return new Response(
        JSON.stringify({ 
          error: 'Unable to process your message at this time. Please try again later.' 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Log successful submission (without sensitive data)
    console.log('Contact message saved:', { 
      id: data.id, 
      timestamp: new Date().toISOString(),
      clientIp: clientIp.substring(0, 8) + '...' // Partial IP for privacy
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your message has been sent successfully!',
        id: data.id 
      }),
      {
        status: 200,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString()
        },
      }
    );

  } catch (error) {
    console.error('Error in submit-contact function:', error);
    
    // Determine if it's a client error or server error
    const isClientError = error instanceof SyntaxError || 
                          (error as any)?.name === 'ValidationError';
    
    return new Response(
      JSON.stringify({ 
        error: isClientError 
          ? 'Invalid request format' 
          : 'Service temporarily unavailable. Please try again later.' 
      }),
      {
        status: isClientError ? 400 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);