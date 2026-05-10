import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../lib/data';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message = formData.get('message') as string;
    
    // Construct mailto link
    const subject = encodeURIComponent('Inquiry from Portfolio');
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    setStatus('sent');
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-0!">
      <span className="section-label">Contact</span>
      <div className="ink-border p-4 bg-brand-text/[0.02]">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-muted mb-4">
          Send a direct message
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            name="message"
            required
            placeholder="Type your message here..."
            className="w-full bg-transparent border border-brand-text/10 p-3 text-sm font-body outline-none focus:border-brand-accent transition-colors min-h-[100px] resize-none"
          />
          
          <button
            type="submit"
            className="flex items-center justify-center gap-2 py-3 bg-brand-accent text-brand-bg font-mono text-[10px] uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-[0.98]"
          >
            {status === 'sent' ? (
              <>
                <CheckCircle2 size={14} /> Message Prepared
              </>
            ) : (
              <>
                <Send size={14} /> Open Mail Client
              </>
            )}
          </button>
        </form>
        
        <p className="mt-4 text-[9px] font-mono text-brand-muted leading-relaxed uppercase tracking-widest">
          This will open your default email client with your message pre-populated.
        </p>
      </div>
    </section>
  );
}
