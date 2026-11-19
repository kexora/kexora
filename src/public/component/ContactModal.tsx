import React from 'react';
import { ContactForm } from './ContactForm';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: string;
  initialService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialDetails = '',
  initialService = 'Web Design & Custom Code',
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-950 my-8">
        <button
          type="button"
          aria-label="Close contact dialog"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <ContactForm
          initialService={initialService}
          initialDetails={initialDetails}
          variant="compact"
          onSuccessClose={onClose}
        />
      </div>
    </div>
  );
};
