import { Mail, MapPin, Phone, ExternalLink, Calendar, MessageSquare } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "University Email",
      value: "sujit.biswas@city.ac.uk",
      link: "mailto:sujit.biswas@city.ac.uk"
    },
    {
      icon: Mail,
      label: "Professional Email",
      value: "sujitbiswas@ieee.org",
      link: "mailto:sujitbiswas@ieee.org"
    },
    {
      icon: Phone,
      label: "Office Phone",
      value: "+44 (0)20 7040 5060",
      link: "tel:+442070405060"
    },
    {
      icon: MapPin,
      label: "Office Address",
      value: "City-St. George's, University of London, Northampton Square, London EC1V 0HB, UK",
      link: "https://maps.google.com/?q=City+University+London+Northampton+Square"
    },
    {
      icon: Calendar,
      label: "Office Hours",
      value: "Tuesday & Thursday, 2:00 PM - 4:00 PM (By appointment)",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      name: "Google Scholar",
      url: "https://scholar.google.com/citations?user=eTiiXkYAAAAJ",
      description: "Academic publications and citations"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sujitedu/",
      description: "Professional network and updates"
    },
    {
      name: "UCL Blockchain Centre",
      url: "https://www.ucl.ac.uk/blockchain/",
      description: "Research Associate (Honorary)"
    },
    {
      name: "City University Profile",
      url: "https://www.citystgeorges.ac.uk/about/people/academics/sujit-biswas",
      description: "Official university profile"
    },
    {
      name: "Personal Website",
      url: "https://sujitbiswas.info/",
      description: "Professional portfolio and CV"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Contact Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch for research collaborations, academic inquiries, or potential opportunities. 
            I welcome discussions about cybersecurity research, student supervision, and industry partnerships.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{info.label}</h4>
                      {info.link !== "#" ? (
                        <a 
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target={info.link.startsWith('http') ? '_blank' : '_self'}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Profiles */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Academic & Professional Profiles</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted hover:border-primary transition-all duration-300 group"
                  >
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                    <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-card rounded-xl shadow-card p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <MessageSquare className="mr-3" size={24} />
              Send an Inquiry
            </h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Select inquiry type</option>
                  <option value="research">Research Collaboration</option>
                  <option value="student">Student Supervision</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="consulting">Consulting Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical"
                  placeholder="Please provide details about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-primary text-white py-3 px-6 rounded-lg font-medium hover:shadow-elevated transition-all duration-300"
              >
                Send Message
              </button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Response Time:</strong> I typically respond to inquiries within 2-3 business days. 
                For urgent matters, please call my office directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;