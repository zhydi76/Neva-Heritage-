import { motion } from "motion/react";
import { Scissors, MapPin, Phone, Clock, Instagram, Facebook, Twitter, Menu, X, ChevronRight, Star, Globe } from "lucide-react";
import React, { useState, useEffect } from "react";
import ChatBot from "./components/ChatBot";
import StyleExplorer from "./components/StyleExplorer";
import { translations, Language } from "./translations";

const galleryImages = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1592647420148-bfcc175e3f8d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1590540179852-211d6b45e390?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1634449507606-570493e73471?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512690196252-741d2fd3f305?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1501719539451-126fd9362434?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1622286332618-f2803b1950d4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800"
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [lang, setLang] = useState<Language>('ru');

  const t = translations[lang];
  const services = t.services.list;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-dark selection:bg-gold selection:text-white">
      {/* Success Toast */}
      {showBookingSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-10 right-10 z-[100] bg-dark text-white px-8 py-4 shadow-2xl border-l-4 border-gold flex items-center gap-4"
        >
          <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold">
            <Star size={18} fill="currentColor" />
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest text-xs text-gold">{t.contact.successTitle}</p>
            <p className="text-sm">{t.contact.successMsg}</p>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl py-4 border-b border-black/5" 
            : "bg-transparent py-10"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <Scissors className="text-gold w-8 h-8 transition-transform duration-500 group-hover:rotate-45" />
              <div className="absolute -inset-2 bg-gold/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
            <span className="text-2xl font-display tracking-[0.2em] uppercase text-dark">
              Neva <span className="text-gold">Heritage</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-bold">
            <a href="#about" className="text-dark/60 hover:text-gold transition-all duration-300 relative group">
              {t.nav.about}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#services" className="text-dark/60 hover:text-gold transition-all duration-300 relative group">
              {t.nav.services}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#style-explorer" className="text-dark/60 hover:text-gold transition-all duration-300 relative group">
              {t.nav.stylist}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#gallery" className="text-dark/60 hover:text-gold transition-all duration-300 relative group">
              {t.nav.gallery}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-dark/60 hover:text-gold transition-all duration-300 relative group">
              {t.nav.contact}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-4 border-l border-black/10 pl-8">
              {(['ru', 'en', 'ky'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`hover:text-gold transition-all duration-300 cursor-pointer ${lang === l ? 'text-gold' : 'text-dark/30'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button 
              onClick={handleBooking}
              className="group relative px-8 py-3 overflow-hidden rounded-full border border-gold text-gold transition-all duration-500 hover:text-white"
            >
              <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 group-hover:translate-y-0"></span>
              <span className="relative flex items-center gap-2">
                <Phone size={14} />
                {t.nav.book}
              </span>
            </button>
          </div>

          <button 
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center gap-10 text-2xl font-serif uppercase tracking-widest"
        >
          <button 
            className="absolute top-8 right-6 text-dark p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={40} />
          </button>
          
          {/* Mobile Language Switcher */}
          <div className="flex gap-6 mb-8">
            {(['ru', 'en', 'ky'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setIsMobileMenuOpen(false); }}
                className={`text-sm font-bold tracking-widest ${lang === l ? 'text-gold' : 'text-gray-400'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a href="#about" className="text-dark hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</a>
          <a href="#services" className="text-dark hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.services}</a>
          <a href="#style-explorer" className="text-dark hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.stylist}</a>
          <a href="#gallery" className="text-dark hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.gallery}</a>
          <a href="#contact" className="text-dark hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contact}</a>
          <button 
            onClick={(e) => { handleBooking(e); setIsMobileMenuOpen(false); }}
            className="bg-gold text-white px-12 py-5 font-bold mt-4 min-h-[60px] rounded-xl flex items-center gap-3"
          >
            <Phone size={24} />
            {t.nav.book}
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://porusski.me/wp-content/uploads/2016/04/barbershop-1.jpg" 
            alt="Professional Barbershop"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 luxury-grid opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(197,160,89,0.1)_0%,transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="inline-block mb-8"
              >
                <div className="flex items-center gap-4 text-gold">
                  <div className="h-px w-12 bg-gold/50"></div>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Est. 2015</span>
                  <div className="h-px w-12 bg-gold/50"></div>
                </div>
              </motion.div>
              
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-display mb-8 leading-[0.85] text-white uppercase tracking-tighter">
                {t.hero.title.split(' ').slice(0, -1).join(' ')} <br /> 
                <span className="text-gold italic font-serif lowercase tracking-normal block mt-4">
                  {t.hero.title.split(' ').slice(-1)}
                </span>
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="max-w-xl mx-auto text-lg text-white/60 mb-12 font-light leading-relaxed tracking-wide"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              >
                <button 
                  onClick={handleBooking}
                  className="group relative px-12 py-5 bg-gold text-white font-bold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] rounded-sm"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Phone size={16} />
                    {t.hero.cta}
                  </span>
                </button>
                
                <a 
                  href="#services"
                  className="group flex items-center gap-4 text-white/80 hover:text-gold transition-all duration-300 text-xs uppercase tracking-[0.3em] font-bold"
                >
                  <span className="h-px w-8 bg-white/20 group-hover:w-12 group-hover:bg-gold transition-all duration-300"></span>
                  {t.nav.services}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 bg-paper relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -top-20 -left-10 text-[12rem] font-display text-black/5 select-none pointer-events-none">01</div>
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-6 block font-bold">{t.about.subtitle}</span>
              <h2 className="text-6xl md:text-7xl font-display mb-10 leading-[1.1] text-dark lowercase">
                {t.about.title}
              </h2>
              <div className="space-y-8 text-dark/70 text-lg leading-relaxed font-light max-w-lg">
                <p className="first-letter:text-5xl first-letter:font-display first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                  {t.about.p1}
                </p>
                <p>
                  {t.about.p2}
                </p>
                <div className="flex gap-16 pt-12 border-t border-black/5">
                  <div>
                    <div className="text-dark text-5xl font-display mb-2">10<span className="text-gold">+</span></div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-dark/40">{t.about.stat1}</div>
                  </div>
                  <div>
                    <div className="text-dark text-5xl font-display mb-2">5<span className="text-gold">k+</span></div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-dark/40">{t.about.stat2}</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 aspect-[3/4] rounded-[100px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.1)]">
                <img 
                  src="https://images.unsplash.com/photo-1593702295094-272a6719511f?auto=format&fit=crop&q=80&w=800" 
                  alt="Barber at work"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Decorative Element */}
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white p-4 rounded-full shadow-2xl z-20 flex items-center justify-center text-center">
                <div className="border border-gold/20 w-full h-full rounded-full flex flex-col items-center justify-center p-6">
                  <span className="text-gold font-display text-4xl mb-1 italic">Heritage</span>
                  <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-dark/40">Craftsmanship</span>
                </div>
              </div>

              {/* Vertical Rail Text */}
              <div className="absolute top-1/2 -right-12 -translate-y-1/2 writing-mode-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.5em] font-bold text-dark/20">
                Neva Heritage Barbershop • St. Petersburg
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 luxury-grid opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 text-gold mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t.nav.services}</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-display text-white lowercase leading-[0.9]">{t.services.title}</h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm font-light leading-relaxed tracking-wide">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-12 bg-dark hover:bg-white/5 transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute top-12 right-12 text-white/5 text-6xl font-display group-hover:text-gold/10 transition-colors">0{index + 1}</div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-8">
                    <h3 className="text-3xl font-display text-white group-hover:text-gold transition-colors lowercase">{service.name}</h3>
                    <div className="h-px flex-1 mx-8 bg-white/10 group-hover:bg-gold/20 transition-all duration-700"></div>
                    <span className="text-2xl font-display text-gold">{service.price}</span>
                  </div>
                  
                  <p className="text-white/40 font-light mb-10 max-w-md leading-relaxed group-hover:text-white/60 transition-colors">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
                      <Clock size={12} className="text-gold" />
                      <span>{service.duration} {t.services.duration}</span>
                    </div>
                    <button 
                      onClick={handleBooking}
                      className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 flex items-center gap-2"
                    >
                      {t.nav.book} <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StyleExplorer lang={lang} />

      {/* Gallery Section */}
      <section id="gallery" className="py-40 bg-paper relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 text-gold mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t.gallery.subtitle}</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-display text-dark lowercase leading-[0.9]">{t.gallery.title}</h2>
            </div>
            <p className="text-dark/40 max-w-xs text-sm font-light leading-relaxed tracking-wide">
              {t.gallery.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {galleryImages.slice(0, 8).map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-sm ${
                  index % 3 === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[3/4]"
                }`}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                    <Star size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 luxury-grid opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-px bg-gold/30 mb-12"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-12 -left-12 text-9xl font-display text-gold/10 select-none">“</div>
                <p className="text-3xl md:text-5xl lg:text-6xl font-display italic text-white leading-tight mb-16 lowercase">
                  {t.testimonials.quote}
                </p>
              </motion.div>

              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-gold/30 p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" 
                    alt={t.testimonials.author}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-gold font-display text-xl mb-1">{t.testimonials.author}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">{t.testimonials.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32">
            <div>
              <div className="flex items-center gap-4 text-gold mb-8">
                <div className="h-px w-12 bg-gold"></div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t.contact.title}</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-display text-dark lowercase leading-[0.9] mb-16">
                {t.contact.subtitle.split(' ').slice(0, -1).join(' ')} <br />
                <span className="text-gold italic font-serif lowercase">{t.contact.subtitle.split(' ').slice(-1)}</span>
              </h2>
              
              <div className="space-y-16">
                <div className="group cursor-pointer">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-dark/30 mb-4 block">{t.contact.address}</span>
                  <p className="text-2xl font-display text-dark group-hover:text-gold transition-colors">{t.contact.addressValue}</p>
                </div>
                
                <div className="group cursor-pointer">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-dark/30 mb-4 block">{t.contact.phone}</span>
                  <p className="text-2xl font-display text-dark group-hover:text-gold transition-colors">+7 (812) 555-01-23</p>
                </div>

                <div className="group cursor-pointer">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-dark/30 mb-4 block">{t.contact.hours}</span>
                  <p className="text-2xl font-display text-dark group-hover:text-gold transition-colors">{t.contact.hoursValue}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-paper -z-10 rounded-[40px]"></div>
              <div className="p-12">
                <h3 className="text-4xl font-display mb-12 text-dark lowercase">{t.contact.formTitle}</h3>
                <form className="space-y-10" onSubmit={handleBooking}>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input required type="text" className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-all text-dark placeholder:text-dark/20" placeholder={t.contact.name} />
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-500 group-focus-within:w-full"></div>
                    </div>
                    <div className="relative group">
                      <input required type="tel" className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-all text-dark placeholder:text-dark/20" placeholder={t.contact.phoneLabel} />
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-500 group-focus-within:w-full"></div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <select className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-all text-dark appearance-none cursor-pointer">
                      <option value="" disabled selected>{t.contact.service}</option>
                      {t.services.list.map((s, i) => (
                        <option key={i} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-500 group-focus-within:w-full"></div>
                    <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 text-dark/20 rotate-90 pointer-events-none" size={16} />
                  </div>

                  <div className="relative group">
                    <textarea rows={4} className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-all text-dark placeholder:text-dark/20 resize-none" placeholder={t.contact.message}></textarea>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-500 group-focus-within:w-full"></div>
                  </div>

                  <button type="submit" className="group relative w-full py-6 bg-dark text-white font-bold uppercase tracking-[0.3em] text-xs overflow-hidden rounded-sm transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Phone size={16} className="text-gold" />
                      {t.contact.send}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[600px] relative grayscale contrast-125 hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.6037872533277!2d30.320894616096975!3d59.93428018187405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310fca145793%3A0x442a71b3c6c51e0!2z0J3QtdCy0YHQutC40Lkg0L_RgC4sIDE1LCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywgMTkxMTg2!5e0!3m2!1sru!2sru!4v1647856432100!5m2!1sru!2sru" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Neva Heritage Location"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none border-[40px] border-white"></div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 luxury-grid opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-16 items-center">
            <div className="flex items-center gap-4">
              <Scissors className="text-gold w-10 h-10" />
              <span className="text-3xl font-display tracking-[0.2em] uppercase">Neva <span className="text-gold">Heritage</span></span>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-8">
                <a href="#" className="text-white/40 hover:text-gold transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-white/40 hover:text-gold transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-white/40 hover:text-gold transition-colors"><Twitter size={20} /></a>
              </div>
              <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">© 2026 Neva Heritage Barbershop. {t.footer.rights}</p>
            </div>

            <div className="flex justify-end gap-12 text-[10px] uppercase tracking-[0.3em] font-bold">
              <a href="#" className="text-white/40 hover:text-gold transition-colors">{t.footer.privacy}</a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
      <ChatBot lang={lang} />
    </div>
  );
}
