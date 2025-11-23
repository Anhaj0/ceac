// src/pages/Contact.jsx
import { MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    
    // Construct the Subject and Body
    const subject = `New Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    // --- FORCE GMAIL ---
    // This URL format opens the Gmail "Compose" window directly in the browser.
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=cambridgenglishacademycolombo@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open in a new tab so they don't lose the website
    window.open(gmailLink, '_blank');
  };

  // --- URLs for the QR Codes ---
  const fbUrl = "https://www.facebook.com/share/1RKfHYGn8h/";
  const instaUrl = "https://www.instagram.com/cambridgeenglishacademycolombo?utm_source=qr&igsh=NTZmYXZ1MzV2OXNu";
  const waUrl = "https://wa.me/94769144511";

  // Using a free API to generate QR codes on the fly
  const qrApi = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=";

  return (
    <section id="contact" className="page-content">
       {/* Blue Header */}
      <h2 className="text-4xl font-bold text-center mb-10 text-brand-blue">Contact Us</h2>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-brand-blue">Send us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300">
              Submit via Gmail
            </button>
          </form>
        </div>
        
        {/* Details & QR Codes */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-brand-blue">Our Details</h3>
          <div className="space-y-4 text-md sm:text-lg">
            <p className="flex items-start">
              <MapPin className="h-6 w-6 mr-3 text-brand-blue flex-shrink-0" />
              No: 36/3/1, IDH Road, Salamulla, Kolonnawa
            </p>
            <p className="flex items-center">
              <Phone className="h-6 w-6 mr-3 text-brand-blue" />
              076 91 44 511
            </p>
            <p className="flex items-center">
              <Mail className="h-6 w-6 mr-3 text-brand-blue" />
              cambridgenglishacademycolombo@gmail.com
            </p>
          </div>
          <hr className="my-8" />
          <h3 className="text-2xl font-bold mb-4 text-brand-blue">Connect with Us</h3>
          <div className="flex justify-around items-start text-center gap-2">
            
            {/* Facebook QR */}
            <div>
              <img 
                src={`${qrApi}${encodeURIComponent(fbUrl)}`} 
                alt="Facebook QR Code" 
                className="mx-auto rounded-lg shadow-sm w-[120px] h-[120px]" 
              />
              <p className="mt-2 font-semibold">Facebook</p>
            </div>
            
            {/* Instagram QR */}
            <div>
              <img 
                src={`${qrApi}${encodeURIComponent(instaUrl)}`} 
                alt="Instagram QR Code" 
                className="mx-auto rounded-lg shadow-sm w-[120px] h-[120px]" 
              />
              <p className="mt-2 font-semibold">Instagram</p>
            </div>
            
            {/* WhatsApp QR */}
            <div>
              <img 
                src={`${qrApi}${encodeURIComponent(waUrl)}`} 
                alt="WhatsApp QR Code" 
                className="mx-auto rounded-lg shadow-sm w-[120px] h-[120px]" 
              />
              <p className="mt-2 font-semibold">WhatsApp</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}