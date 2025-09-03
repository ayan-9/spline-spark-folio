# EmailJS Contact Form Setup Guide

## Overview
This project includes a React contact form component with EmailJS integration that allows users to send emails directly from your portfolio website without requiring a backend server.

## Files Created
- `src/components/ContactForm.tsx` - The main contact form component with EmailJS integration

## Features
✅ **Form Validation**: Uses your existing validation logic with proper error handling  
✅ **EmailJS Integration**: Sends emails directly from the frontend  
✅ **useRef Implementation**: Uses React useRef to capture form data as requested  
✅ **Success/Error Messages**: Shows toast notifications for user feedback  
✅ **Form Reset**: Automatically clears form after successful submission  
✅ **Styling Consistency**: Maintains your existing UI design and styling  
✅ **Country Code Support**: Includes phone number with country code selection  
✅ **Character Limits**: Enforces field length limits with live counters  

## EmailJS Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. **Copy the Service ID** - you'll need this later

### Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio contact form.

Name: {{from_name}}
Email: {{from_email}}
Contact Number: {{contact_number}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. **Copy the Template ID** - you'll need this later

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** in the API Keys section
3. **Copy the Public Key** - you'll need this later

### Step 5: Update Your Component
Open `src/components/ContactForm.tsx` and replace the placeholder values:

```typescript
// Replace these with your actual EmailJS values
const EMAIL_CONFIG: EmailConfig = {
  SERVICE_ID: 'your_actual_service_id',     // From Step 2
  TEMPLATE_ID: 'your_actual_template_id',   // From Step 3
  PUBLIC_KEY: 'your_actual_public_key'      // From Step 4
};
```

### Step 6: Test Your Form
1. Start your development server: `npm run dev`
2. Navigate to your contact form
3. Fill out and submit a test message
4. Check your email for the test message
5. Check browser console for any errors

## Usage Example

```tsx
import ContactForm from "@/components/ContactForm";

function App() {
  return (
    <div>
      {/* Your other components */}
      <ContactForm />
    </div>
  );
}
```

## Environment Variables (Optional)
For better security, you can store your EmailJS configuration in environment variables:

1. Create a `.env.local` file in your project root:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Update your component to use environment variables:
```typescript
const EMAIL_CONFIG: EmailConfig = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};
```

## Form Fields
- **Name**: Required, 2-100 characters, letters/spaces/hyphens/apostrophes only
- **Email**: Required, valid email format, max 320 characters
- **Contact Number**: Optional, with country code selector (+92 default)
- **Message**: Required, 10-2000 characters

## Error Handling
The form includes comprehensive error handling:
- Client-side validation before submission
- EmailJS service error handling
- User-friendly error messages via toast notifications
- Form state management during submission

## Troubleshooting

### Common Issues
1. **"Invalid public key" error**: Double-check your public key
2. **Template not found**: Verify template ID and template structure
3. **Service unavailable**: Check service ID and email service connection
4. **CORS errors**: EmailJS handles CORS automatically, but ensure you're using the correct domain

### Debug Mode
Enable debug mode by adding console.log statements or checking the browser's Network tab for EmailJS requests.

## EmailJS Free Tier Limits
- 200 emails per month
- Email templates limited
- No custom branding removal

For higher volumes, consider upgrading to a paid plan.

## Support
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

## Security Notes
- Your EmailJS public key is safe to expose in frontend code
- Never expose your private key in frontend code
- Consider implementing rate limiting for production use
- EmailJS provides built-in spam protection