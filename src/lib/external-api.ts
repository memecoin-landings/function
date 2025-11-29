// Configuration for external API endpoints
export const EXTERNAL_API_CONFIG = {
  // Update these URLs when you deploy your Go/Node.js API
  contactForm: process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:8080/api/contact",
  
  // Add other external APIs here as needed
};

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  branding: string | null;
  services: string[];
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(EXTERNAL_API_CONFIG.contactForm, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      message: result.message || "Sent successfully! We will contact you as soon as possible!",
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    return {
      success: false,
      message: "Failed to send. Please try again, or contact us using other methods.",
    };
  }
}

// Fallback: If external API is not available, store in localStorage for later processing
export function storeContactFormLocally(data: ContactFormData): void {
  try {
    const stored = localStorage.getItem('pendingContactForms') || '[]';
    const pending = JSON.parse(stored);
    
    pending.push({
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    });
    
    localStorage.setItem('pendingContactForms', JSON.stringify(pending));
    
    console.log('Contact form stored locally for later submission');
  } catch (error) {
    console.error('Failed to store contact form locally:', error);
  }
}