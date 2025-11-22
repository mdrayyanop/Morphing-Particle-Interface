import React, { useState } from 'react';
import { Award, Cpu, Globe, Zap, Layout, Smartphone, Database, TrendingUp, Video, ArrowRight, ExternalLink } from 'lucide-react';

// --- ABOUT SECTION ---
export const AboutView = () => (
  <div className="w-full max-w-4xl mx-auto h-full overflow-y-auto p-2 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
    <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
        <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <img src="rayyan.png" alt="Mohammed Rayyan" className="relative w-40 h-40 rounded-full border-2 border-white/20 object-cover bg-black" />
        </div>
        <div>
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-white mb-2">MOHAMMED RAYYAN</h2>
            <p className="font-['Share_Tech_Mono'] text-cyan-400 text-lg mb-4">WORLD RECORD HOLDER | AI INNOVATOR | FOUNDER</p>
            <p className="text-gray-300 leading-relaxed font-light">
                Based in Kurnool, I am an AI Student and the Founder of <strong className="text-white">CodexAI.shop</strong>. 
                I represent the next generation of creators who blend artificial intelligence, coding, automation, and design into one creative journey.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:bg-white/10 transition border-l-4 border-l-cyan-500">
            <Award className="text-cyan-400 mb-3" size={32} />
            <h3 className="font-['Orbitron'] text-sm font-bold text-white mb-2">WORLD RECORD</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
                Achieved at 13 years 11 months. "Youngest to Solve a Customised Indian-Flag 3×3 Rubik’s Cube in 1m 29s" (International Book of Records).
            </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:bg-white/10 transition border-l-4 border-l-purple-500">
            <Cpu className="text-purple-400 mb-3" size={32} />
            <h3 className="font-['Orbitron'] text-sm font-bold text-white mb-2">CODEXAI.SHOP</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
                Founder of an AI-powered learning platform. Creating interactive e-books and tools to make coding education simple and affordable.
            </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:bg-white/10 transition border-l-4 border-l-pink-500">
            <Globe className="text-pink-400 mb-3" size={32} />
            <h3 className="font-['Orbitron'] text-sm font-bold text-white mb-2">INNOVATION</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
                Creator of Vertex, an advanced AI assistant. Building next-gen tools at Dr. K.V. Subba Reddy Institute of Technology.
            </p>
        </div>
      </div>
    </div>
  </div>
);

// --- SKILLS SECTION ---
export const SkillsView = () => {
  const skills = [
    { name: "Web Development", icon: <Layout />, color: "text-cyan-400", desc: "HTML, CSS, JS, Tailwind, React, WordPress" },
    { name: "App Development", icon: <Smartphone />, color: "text-purple-400", desc: "Mobile/Web prototypes, Firebase Integration" },
    { name: "AI & API Integration", icon: <Database />, color: "text-red-400", desc: "OpenAI API, Prompt Engineering, Intelligent Agents" },
    { name: "Business & Marketing", icon: <TrendingUp />, color: "text-yellow-400", desc: "Strategy, E-book Sales, Affiliate Models" },
    { name: "Automation & Python", icon: <Cpu />, color: "text-blue-400", desc: "AI Assistants, FinTech, Trading Algorithms" },
    { name: "Content & Video", icon: <Video />, color: "text-green-400", desc: "Video Editing, Visual Design, Social Campaigns" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto h-full overflow-y-auto p-2 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, idx) => (
            <div key={idx} className="group relative bg-black/40 border border-white/10 p-6 rounded hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className={`mb-4 ${skill.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(skill.icon as React.ReactElement<any>, { size: 40 })}
                </div>
                <h3 className="font-['Orbitron'] text-white text-lg font-bold mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors font-light">
                    {skill.desc}
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
        ))}
      </div>
    </div>
  );
};

// --- PROJECTS SECTION ---
export const ProjectsView = () => {
    const projects = [
        {
          title: "CodexAI.shop",
          description: "Flagship AI-powered learning platform making coding education simple and affordable through interactive e-books and tools.",
          gradient: "from-blue-600 to-cyan-400",
          link: "https://codexai.shop"
        },
        {
          title: "Vertex AI Assistant",
          description: "Advanced voice-enabled AI assistant capable of talking, listening, and generating images directly from voice commands.",
          gradient: "from-purple-600 to-pink-500",
          link: "#"
        }
      ];

    return (
        <div className="w-full max-w-4xl mx-auto h-full overflow-y-auto p-2 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <a 
                        key={idx} 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group relative block h-80 perspective-1000"
                    >
                        <div className="relative h-full bg-black/50 border border-white/10 rounded-xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:border-cyan-500/40">
                            {/* Holographic Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            
                            <div className="absolute top-0 right-0 p-4 text-white/20 group-hover:text-cyan-400 transition-colors">
                                <ExternalLink size={24} />
                            </div>

                            <div className="h-full flex flex-col justify-end p-8 relative z-10">
                                <div className="mb-auto pt-8">
                                     <div className={`w-16 h-1 mb-6 bg-gradient-to-r ${project.gradient}`}></div>
                                </div>
                                <h3 className="font-['Orbitron'] text-2xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 font-light">
                                    {project.description}
                                </p>
                                <div className="flex items-center text-cyan-400 text-xs font-mono tracking-widest uppercase">
                                    <span>Initialize</span>
                                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

// --- GALLERY SECTION ---
export const GalleryView = () => {
    const images = [
        "achievement1.png", "achievement2.png", "achievement3.png", "achievement4.png"
    ];
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    return (
        <>
            <div className="w-full max-w-5xl mx-auto h-full overflow-y-auto p-2 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((src, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setSelectedImg(src)}
                            className="aspect-square bg-white/5 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 relative group"
                        >
                            <img src={src} alt={`Achievement ${idx + 1}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ))}
                </div>
                <p className="text-center text-gray-500 font-mono text-xs mt-8">
                    // SYSTEM RECORDS: WORLD RECORD & RECOGNITION
                </p>
            </div>

            {/* Lightbox Overlay */}
            {selectedImg && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelectedImg(null)}
                >
                    <img src={selectedImg} alt="Full size" className="max-w-full max-h-full rounded border border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-90 duration-300" />
                </div>
            )}
        </>
    );
};

// --- CONTACT SECTION ---
export const ContactView = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            setStatus('success');
            form.reset();
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto h-full overflow-y-auto p-2 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-black/60 border border-white/10 p-8 rounded-xl backdrop-blur-md">
                <h2 className="font-['Orbitron'] text-2xl text-white mb-6 flex items-center gap-3">
                    <Zap className="text-cyan-500" /> INITIATE CONTACT
                </h2>
                
                {status === 'success' ? (
                    <div className="text-center py-10 space-y-4">
                        <div className="text-green-400 text-5xl mb-4"><i className="fas fa-check-circle"></i></div>
                        <h3 className="text-xl text-white font-bold">TRANSMISSION RECEIVED</h3>
                        <p className="text-gray-400">I will respond to your frequency shortly.</p>
                        <button onClick={() => setStatus('idle')} className="text-cyan-500 hover:underline mt-4 text-sm">Send another message</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input type="hidden" name="access_key" value="eeb5250a-2f20-4cf2-939d-ce427a046265" />
                        
                        <div>
                            <label className="block text-xs font-mono text-cyan-500 mb-1 tracking-widest">IDENTIFIER // NAME</label>
                            <input 
                                type="text" 
                                name="name" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-mono text-cyan-500 mb-1 tracking-widest">COMM CHANNEL // EMAIL</label>
                            <input 
                                type="email" 
                                name="email" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-mono text-cyan-500 mb-1 tracking-widest">DATA PACKET // MESSAGE</label>
                            <textarea 
                                name="message" 
                                rows={4}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={status === 'sending'}
                            className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 py-3 rounded font-['Orbitron'] font-bold tracking-wider hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                            <ArrowRight size={16} />
                        </button>
                        
                        {status === 'error' && <p className="text-red-400 text-xs text-center mt-2">Transmission Failed. Check Network.</p>}
                    </form>
                )}
            </div>

            <div className="flex justify-center gap-8 mt-8 text-2xl">
                <a href="https://instagram.com/mdrayyanop" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-pink-500 hover:scale-110 transition-all"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/mdrayyanop/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-all"><i className="fab fa-linkedin"></i></a>
                <a href="https://www.youtube.com/@mr__titan7" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-red-500 hover:scale-110 transition-all"><i className="fab fa-youtube"></i></a>
                <a href="https://github.com/mdrayyanop" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white hover:scale-110 transition-all"><i className="fab fa-github"></i></a>
            </div>
        </div>
    );
};