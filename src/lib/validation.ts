import DOMPurify from 'dompurify';

// Input validation constants
export const VALIDATION_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 320, // RFC 5321 limit
  PHONE_MAX: 15, // E.164 format limit
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 2000,
} as const;

// Email validation regex (basic but secure)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex (digits, spaces, +, -, parentheses only)
const PHONE_REGEX = /^[\d\s+()-]+$/;

// Name validation regex (letters, spaces, hyphens, apostrophes only)
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove any HTML tags and sanitize using DOMPurify
  const sanitized = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
  
  // Trim whitespace and normalize
  return sanitized.trim().replace(/\s+/g, ' ');
}

export function validateName(name: string): ValidationResult {
  const errors: string[] = [];
  const sanitizedName = sanitizeInput(name);
  
  if (!sanitizedName) {
    errors.push('Name is required');
  } else {
    if (sanitizedName.length < VALIDATION_LIMITS.NAME_MIN) {
      errors.push(`Name must be at least ${VALIDATION_LIMITS.NAME_MIN} characters`);
    }
    if (sanitizedName.length > VALIDATION_LIMITS.NAME_MAX) {
      errors.push(`Name must not exceed ${VALIDATION_LIMITS.NAME_MAX} characters`);
    }
    if (!NAME_REGEX.test(sanitizedName)) {
      errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  const sanitizedEmail = sanitizeInput(email).toLowerCase();
  
  if (!sanitizedEmail) {
    errors.push('Email is required');
  } else {
    if (sanitizedEmail.length > VALIDATION_LIMITS.EMAIL_MAX) {
      errors.push(`Email must not exceed ${VALIDATION_LIMITS.EMAIL_MAX} characters`);
    }
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      errors.push('Please enter a valid email address');
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  const sanitizedPhone = sanitizeInput(phone);
  
  if (sanitizedPhone) {
    // Remove all non-digit characters for length validation
    const digitsOnly = sanitizedPhone.replace(/\D/g, '');
    
    if (digitsOnly.length > VALIDATION_LIMITS.PHONE_MAX) {
      errors.push(`Phone number is too long`);
    }
    if (!PHONE_REGEX.test(sanitizedPhone)) {
      errors.push('Phone number contains invalid characters');
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

export function validateMessage(message: string): ValidationResult {
  const errors: string[] = [];
  const sanitizedMessage = sanitizeInput(message);
  
  if (!sanitizedMessage) {
    errors.push('Message is required');
  } else {
    if (sanitizedMessage.length < VALIDATION_LIMITS.MESSAGE_MIN) {
      errors.push(`Message must be at least ${VALIDATION_LIMITS.MESSAGE_MIN} characters`);
    }
    if (sanitizedMessage.length > VALIDATION_LIMITS.MESSAGE_MAX) {
      errors.push(`Message must not exceed ${VALIDATION_LIMITS.MESSAGE_MAX} characters`);
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: string[] = [];
  
  const nameValidation = validateName(data.name);
  const emailValidation = validateEmail(data.email);
  const phoneValidation = validatePhone(data.phone || '');
  const messageValidation = validateMessage(data.message);
  
  errors.push(...nameValidation.errors);
  errors.push(...emailValidation.errors);
  errors.push(...phoneValidation.errors);
  errors.push(...messageValidation.errors);
  
  return { isValid: errors.length === 0, errors };
}

export function sanitizeContactForm(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email).toLowerCase(),
    phone: data.phone ? sanitizeInput(data.phone) : undefined,
    message: sanitizeInput(data.message),
  };
}