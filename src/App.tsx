/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Parallax effect for the hero section
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '환영합니다', href: '#welcome' },
    { name: '예배 안내', href: '#schedule' },
    { name: '오시는 길', href: '#location' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Navigation Bar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#050505]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/10 py-4' : 'bg-gradient-to-b from-[#050505] to-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3">
             <div className="w-8 h-8 flex-shrink-0 border border-white flex items-center justify-center rotate-45">
               <div className="w-1 h-1 bg-white -rotate-45"></div>
             </div>
             <span className="text-xl font-bold tracking-tighter text-white">
               ARK CHURCH <span className="font-light opacity-50 ml-1 text-sm hidden sm:inline">| 방주교회</span>
             </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.2em] opacity-80 hover:opacity-100 transition-all text-white border-b border-transparent hover:border-white pb-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button className="hidden md:block px-6 py-2 border border-white/20 rounded-full text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
            Online Giving
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[70px] left-0 w-full bg-[#0A0A0A] shadow-[0_20px_30px_rgba(0,0,0,0.5)] border-b border-white/10 z-40 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-[0.2em] uppercase text-white/90 pb-4 border-b border-white/10"
                >
                  {link.name}
                </a>
              ))}
              <button className="self-start px-6 py-3 border border-white/20 text-white text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all w-full">
                Online Giving
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <div className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">
        <motion.div
          style={{ y: heroY, opacity }}
          className="absolute inset-0 z-0"
        >
          {/* Abstract Theme Elements */}
          <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-[#1E3A8A] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[400px] bg-blue-900 rounded-full blur-[150px] opacity-30 z-10 pointer-events-none"></div>
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[300px] bg-indigo-900 rounded-full blur-[120px] opacity-20 z-10 pointer-events-none"></div>
          <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] opacity-40 z-10 pointer-events-none" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
             <path d="M50 350 L750 350 L700 250 L100 250 Z" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M400 50 L400 250" stroke="white" strokeWidth="0.5" />
             <path d="M350 150 L450 150" stroke="white" strokeWidth="0.5" />
          </svg>
          <div className="absolute inset-0 bg-[#050505]/70 mix-blend-multiply z-10" />
          <img
            src="https://images.unsplash.com/photo-1437604470275-eb2f4f210d79?auto=format&fit=crop&q=80&w=2600"
            alt="Church Background"
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity"
          />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-12 h-full flex flex-col justify-center items-start text-left mt-12 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
          >
            은혜와 진리가 충만한
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-[100px] font-serif font-light text-white mb-8 leading-[1.1] md:leading-[0.9]"
          >
            인생의 폭풍 속에서<br/>
            <span className="italic font-medium text-blue-100">안식의 방주</span>로
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-white/60 font-light max-w-lg leading-relaxed mb-10 border-l border-blue-500 pl-6"
          >
            세상의 풍랑 속에서 생명을 살리고 회복시키는<br className="hidden md:block" /> 구원의 방주가 되겠습니다.<br/>
            당신의 자리를 준비했습니다.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1 }}
             className="flex flex-col sm:flex-row gap-4"
          >
             <button className="bg-white text-black px-10 py-4 font-bold text-sm uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all">
                예배 안내 받기
             </button>
             <button className="border border-white/30 px-10 py-4 font-bold text-sm text-white uppercase tracking-wider backdrop-blur-sm hover:border-white transition-all">
                교회 소개
             </button>
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1.2 }}
             className="absolute bottom-12 left-12 right-12 z-20 flex justify-between items-end border-t border-white/10 pt-8 max-md:hidden"
          >
             <div className="flex space-x-16">
               <div>
                 <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3">Sunday Worship</p>
                 <div className="space-y-1">
                   <p className="text-sm font-medium">1부: 09:00 AM</p>
                   <p className="text-sm font-medium">2부: 11:30 AM <span className="text-blue-400 text-[10px] ml-2">LIVE</span></p>
                 </div>
               </div>
               <div>
                 <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3">Quick Contact</p>
                 <p className="text-sm font-medium">02-123-4567</p>
                 <p className="text-sm font-medium opacity-60">info@arkchurch.kr</p>
               </div>
             </div>

             <div className="text-right">
               <div className="flex justify-end space-x-4 mb-4">
                 <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-xs opacity-50 hover:bg-white hover:text-black hover:opacity-100 transition-all cursor-pointer">IG</div>
                 <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-xs opacity-50 hover:bg-white hover:text-black hover:opacity-100 transition-all cursor-pointer">YT</div>
               </div>
               <p className="text-[10px] text-white/30 font-light">서울특별시 서초구 방주대로 102</p>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Welcome Section */}
      <section id="welcome" className="py-24 md:py-40 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden shrink-0 scroll-mt-20">
        <div className="absolute top-0 right-[-100px] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-6">Welcome to the Sanctuary</h2>
            <p className="text-4xl md:text-6xl font-serif font-light text-white leading-[1.2] mb-10">
              "수고하고 무거운 짐 진 자들아<br className="hidden md:block"/> 다 내게로 오라"
            </p>
            <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-10" />
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
              방주교회는 모든 영혼을 품는 따뜻한 신앙 공동체입니다.
              <br />상처받은 영혼들이 치유를 경험하고, 진리 안에서 참된 자유를 누리며,
              <br className="hidden md:block"/>세상을 향해 사랑을 흘려보내는 아름다운 교회로 여러분을 초대합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Worship Schedule Section */}
      <section id="schedule" className="py-24 md:py-36 px-6 bg-[#0B0B0B] border-t border-white/5 scroll-mt-20 relative">
        <div className="absolute bottom-0 left-[-100px] w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-20"
          >
            <h2 className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Worship Schedule</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-light text-white">예배 안내</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {scheduleData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-[#050505] p-10 rounded-sm border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="w-12 h-12 border border-white/20 text-white/50 rounded-full flex items-center justify-center mb-8 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-serif font-light tracking-wide text-white mb-8">{item.title}</h4>
                <div className="space-y-4">
                  {item.times.map((time, i) => (
                    <div key={i} className="flex items-center justify-between text-white/60 font-light border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="tracking-wide">{time.name}</span>
                      <span className="text-white/80">{time.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 md:py-36 px-6 bg-[#050505] border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Location & Contact</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-light text-white mb-12">오시는 길</h3>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-white/20 text-white/60 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-light text-white text-xl tracking-wide mb-3">교회 주소</h4>
                  <p className="text-white/50 font-light leading-relaxed">
                    서울특별시 서초구 방주대로 102 (성락타워 15층)<br />
                    방주교회 본당
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-white/20 text-white/60 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-light text-white text-xl tracking-wide mb-3">연락처</h4>
                  <p className="text-white/50 font-light leading-relaxed">02-123-4567<br />info@arkchurch.kr</p>
                </div>
              </div>
            </div>

            <button className="mt-14 px-10 py-4 border border-white/30 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all inline-flex items-center gap-3 group">
              길찾기 안내
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] md:h-[600px] bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden relative group"
          >
            {/* Map Placeholder Image */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" 
              alt="Map Location" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-50 grayscale mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-[#050505]/70 backdrop-blur-md p-6 lg:p-8 border border-white/10 flex items-center justify-between">
               <p className="text-sm md:text-base font-light tracking-wide flex items-center gap-3 text-white">
                  <MapPin className="w-5 h-5 text-blue-400" /> 방주교회 대예배당
               </p>
               <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] hidden sm:block border-b border-white/20 pb-1">Sanctuary</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] text-white py-20 px-6 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <h2 className="text-3xl font-serif font-light tracking-widest mb-6 text-white">ARK CHURCH <span className="text-sm opacity-50 ml-2 font-sans tracking-normal hidden md:inline">| 방주교회</span></h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light">
              대한예수교장로회 방주교회<br />
              담임목사: 김요한<br /><br />
              <span className="opacity-70">Copyright {new Date().getFullYear()} Ark Church. All rights reserved.</span>
            </p>
          </div>
          <div className="flex gap-4">
            {['IG', 'YT', 'FB'].map((sns) => (
              <a key={sns} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all">
                <span className="text-[10px] uppercase font-medium tracking-widest">{sns}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

const scheduleData = [
  {
    title: '주일 예배',
    times: [
      { name: '1부 예배', time: '07:30 AM' },
      { name: '2부 예배', time: '09:30 AM' },
      { name: '3부 예배 (청년부)', time: '11:45 AM' },
      { name: '4부 오후예배', time: '14:00 PM' },
    ]
  },
  {
    title: '주중 예배',
    times: [
      { name: '새벽 기도회 (월~금)', time: '05:00 AM' },
      { name: '수요 예배', time: '19:30 PM' },
      { name: '금요 성령집회', time: '20:30 PM' },
    ]
  },
  {
    title: '교회학교 예배',
    times: [
      { name: '유치부 (주일)', time: '09:30 AM' },
      { name: '유초등부 (주일)', time: '09:30 AM' },
      { name: '중고등부 (주일)', time: '09:30 AM' },
    ]
  }
];

