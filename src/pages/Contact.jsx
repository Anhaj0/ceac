export default function Contact() {
  return (
    <section id="contact" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Send us a Message</h3>
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Your Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Your Email</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea id="message" name="message" rows="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300">Submit Message</button>
          </form>
        </div>
        {/* Details & QR Codes */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Details</h3>
          <div className="space-y-4 text-md sm:text-lg">
            <p className="flex items-start"><i data-lucide="map-pin" className="h-6 w-6 mr-3 text-brand-blue flex-shrink-0"></i>No: 36/3/1, IDH Road, Salamulla, Kolonnawa</p>
            <p className="flex items-center"><i data-lucide="phone" className="h-6 w-6 mr-3 text-brand-blue"></i>076 91 44 511</p>
            <p className="flex items-center"><i data-lucide="mail" className="h-6 w-6 mr-3 text-brand-blue"></i>contact@ceac.com (example)</p>
          </div>
          <hr className="my-8" />
          <h3 className="text-2xl font-bold mb-4">Connect with Us</h3>
          <div className="flex justify-around items-start text-center gap-2">
            <div>
              <img src="https://placehold.co/120x120/ffffff/000000?text=Facebook+QR" alt="Facebook QR Code" className="mx-auto rounded-lg shadow-sm" />
              <p className="mt-2 font-semibold">Facebook</p>
            </div>
            <div>
              <img src="https://placehold.co/120x120/ffffff/000000?text=Instagram+QR" alt="Instagram QR Code" className="mx-auto rounded-lg shadow-sm" />
              <p className="mt-2 font-semibold">Instagram</p>
            </div>
            <div>
              <img src="https://placehold.co/120x120/ffffff/000000?text=WhatsApp+QR" alt="WhatsApp QR Code" className="mx-auto rounded-lg shadow-sm" />
              <p className="mt-2 font-semibold">WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
