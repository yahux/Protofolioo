import React, { useState } from 'react';
import { Project, SkillGroup } from '../types';
import { Shield, Sparkles, Database, Code, Cpu, ExternalLink, Mail, Send, CheckCircle, Github, Linkedin, Award, Languages, Phone } from 'lucide-react';
import { translations, Language } from '../translations';

interface PortfolioContentProps {
  onSendMessage: (sender: string, text: string) => void;
  language: Language;
}

export default function PortfolioContent({ onSendMessage, language }: PortfolioContentProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const t = translations[language];

  const projects = [
    {
      id: 'p1',
      title: t.p1Title,
      description: t.p1Desc,
      tech: ['React', 'Python', 'AWS', 'gRPC'],
      role: t.p1Role,
      stats: { linesOfCode: '12,500', efficiency: '99.2%', latency: '4.2ms' },
      github: 'https://github.com/yamen/network-analyzer',
      imageType: 'network'
    },
    {
      id: 'p2',
      title: t.p2Title,
      description: t.p2Desc,
      tech: ['Go', 'Redis', 'Docker', 'Protobuf'],
      role: t.p2Role,
      stats: { linesOfCode: '16,800', efficiency: '98.5%', latency: '0.8ms' },
      github: 'https://github.com/yamen/cache-manager',
      imageType: 'cache'
    },
    {
      id: 'p3',
      title: t.p3Title,
      description: t.p3Desc,
      tech: ['TypeScript', 'Rust', 'Kubernetes', 'OAuth2'],
      role: t.p3Role,
      stats: { linesOfCode: '19,100', efficiency: '97.9%', latency: '22ms' },
      github: 'https://github.com/yamen/crypto-gateway',
      imageType: 'security'
    },
    {
      id: 'p4',
      title: t.p4Title,
      description: t.p4Desc,
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
      role: t.p4Role,
      stats: { linesOfCode: '24,500', efficiency: '99.1%', latency: '12ms' },
      github: 'https://github.com/yamen/assalpay-store',
      link: 'https://www.assalpay.store/',
      imageType: 'assalpay'
    }
  ];

  const certifications = [
    {
      id: 'c1',
      title: t.cert1Title,
      issuer: t.cert1Issuer,
      idCode: 'ASSAL-PLG-04910'
    },
    {
      id: 'c2',
      title: t.cert2Title,
      issuer: t.cert2Issuer,
      idCode: 'ASSALPAY-SA-21849'
    }
  ];

  const renderProjectPlaceholder = (type: string) => {
    switch (type) {
      case 'network':
        return (
          <div className="w-full h-32 rounded-lg bg-zinc-950/60 border border-zinc-800/80 relative overflow-hidden flex items-center justify-center group-hover:border-sky-500/30 transition-colors">
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              <g stroke="#0ea5e9" strokeWidth="0.5" fill="none">
                <circle cx="40" cy="50" r="3" fill="#0ea5e9" className="animate-pulse" />
                <circle cx="100" cy="30" r="3" fill="#0ea5e9" />
                <circle cx="100" cy="70" r="3" fill="#0ea5e9" />
                <circle cx="160" cy="50" r="3" fill="#0ea5e9" className="animate-pulse" />
                <line x1="43" y1="50" x2="97" y2="30" />
                <line x1="43" y1="50" x2="97" y2="70" />
                <line x1="103" y1="30" x2="157" y2="50" />
                <line x1="103" y1="70" x2="157" y2="50" />
                <line x1="100" y1="33" x2="100" y2="67" />
              </g>
              <circle cx="40" cy="50" r="2" fill="#38bdf8">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 0 0 L 60 -20 L 60 20 L 120 0 Z" />
              </circle>
            </svg>
          </div>
        );
      case 'cache':
        return (
          <div className="w-full h-32 rounded-lg bg-zinc-950/60 border border-zinc-800/80 relative overflow-hidden flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              <g fill="none" stroke="#10b981" strokeWidth="0.5">
                <rect x="20" y="20" width="30" height="20" rx="2" className="fill-emerald-500/5" />
                <rect x="60" y="20" width="30" height="20" rx="2" className="fill-emerald-500/5" />
                <rect x="100" y="20" width="30" height="20" rx="2" className="fill-zinc-900" />
                <rect x="140" y="20" width="30" height="20" rx="2" className="fill-emerald-500/5" />
                
                <rect x="20" y="50" width="30" height="20" rx="2" className="fill-zinc-900" />
                <rect x="60" y="50" width="30" height="20" rx="2" className="fill-emerald-500/15 animate-pulse" />
                <rect x="100" y="50" width="30" height="20" rx="2" className="fill-emerald-500/5" />
                <rect x="140" y="50" width="30" height="20" rx="2" className="fill-zinc-900" />
                
                <path d="M 35 40 L 35 50 M 75 40 L 75 50 M 115 40 L 115 50 M 155 40 L 155 50" strokeWidth="1" strokeDasharray="2,2" />
              </g>
            </svg>
          </div>
        );
      case 'assalpay':
        return (
          <div className="w-full h-32 rounded-lg bg-zinc-950/60 border border-zinc-800/80 relative overflow-hidden flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-70">
              <g stroke="#f59e0b" strokeWidth="0.5" fill="none">
                <rect x="40" y="25" width="120" height="50" rx="4" stroke="#f59e0b" strokeWidth="0.75" className="fill-amber-500/5" />
                <line x1="40" y1="38" x2="160" y2="38" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.2" />
                <rect x="52" y="46" width="16" height="12" rx="1.5" stroke="#10b981" strokeWidth="0.75" className="fill-emerald-500/10" />
                <path d="M 140 45 A 6 6 0 0 1 140 55" stroke="#10b981" strokeWidth="0.75" className="animate-pulse" />
                <path d="M 144 41 A 12 12 0 0 1 144 59" stroke="#10b981" strokeWidth="0.75" strokeOpacity="0.7" />
                <path d="M 148 37 A 18 18 0 0 1 148 63" stroke="#f59e0b" strokeWidth="0.75" strokeOpacity="0.4" />
                <circle cx="112" cy="52" r="4" stroke="#10b981" strokeWidth="0.5" />
                <path d="M 110 52 L 112 54 L 115 49" stroke="#10b981" strokeWidth="0.75" />
              </g>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-full h-32 rounded-lg bg-zinc-950/60 border border-zinc-800/80 relative overflow-hidden flex items-center justify-center group-hover:border-fuchsia-500/30 transition-colors">
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              <g fill="none" stroke="#d946ef" strokeWidth="0.5">
                <circle cx="100" cy="50" r="35" strokeDasharray="3,3" className="animate-[spin_10s_linear_infinite]" />
                <circle cx="100" cy="50" r="25" />
                <path d="M 90 45 L 110 45 L 110 55 L 90 55 Z" strokeWidth="1" fill="#d946ef" fillOpacity="0.1" />
                <path d="M 95 45 L 95 38 A 5 5 0 0 1 105 38 L 105 45" strokeWidth="1" />
              </g>
            </svg>
          </div>
        );
    }
  };

  const skillGroups: SkillGroup[] = [
    {
      category: t.skillCatLanguages,
      skills: [
        { name: 'TypeScript / JavaScript', level: 95, icon: 'code' },
        { name: 'Python', level: 88, icon: 'cpu' },
        { name: 'C', level: 90, icon: 'shield' },
        { name: 'Linux OS & Shell', level: 85, icon: 'cpu' }
      ]
    },
    {
      category: t.skillCatFrameworks,
      skills: [
        { name: 'React / Next.js', level: 94, icon: 'code' },
        { name: 'Vite & GSAP Animations', level: 90, icon: 'sparkles' },
        { name: 'Express / Node.js', level: 92, icon: 'cpu' },
        { name: 'Tailwind CSS', level: 96, icon: 'shield' }
      ]
    },
    {
      category: t.skillCatDb,
      skills: [
        { name: 'PostgreSQL / Cloud SQL', level: 86, icon: 'database' },
        { name: '3cx / aws', level: 88, icon: 'shield' },
        { name: 'Cloudflare', level: 82, icon: 'cpu' },
        { name: 'API Pipelines', level: 80, icon: 'database' }
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate uplink
    setFormSubmitted(true);
    onSendMessage(formData.name, formData.message);
    
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 6000);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'code': return <Code className="w-4 h-4 text-cyan-400" />;
      case 'cpu': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'database': return <Database className="w-4 h-4 text-sky-400" />;
      case 'shield': return <Shield className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-fuchsia-400" />;
    }
  };

  return (
    <div id="scrolling-portfolio-content" className="relative w-full">
      {/* ------------------ ABOUT SECTION ------------------ */}
      <section
        id="about-section"
        className="min-h-[110vh] flex items-center py-20 px-4 sm:px-8 lg:px-16"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Bio Info */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-500 uppercase tracking-widest bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/20">
                {t.mod1Title}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white">
              {t.yamen}
            </h2>
            <p className="text-amber-500 font-mono text-sm leading-relaxed">
              {t.systemsIntegrator}
            </p>
            
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {language === 'ar' 
                ? 'أنا متخصص في تصميم وهندسة التطبيقات عالية الأداء وزمن الاستجابة المنخفض والتي تدمج بين الجمال البصري والكفاءة البرمجية. من خلال خبرتي في بنيات الكمبيوتر الهيكلية والآليات التفاعلية، أقوم بنشر واجهات جميلة متصلة بأنظمة قوية ومرنة.' 
                : 'I specialize in designing and engineering high-throughput, low-latency applications that marry visual polish with backend efficiency. With a background in structural computer architectures and interactive mechanics, I deploy beautiful interfaces wired into robust, resilient systems.'}
            </p>

            <div className="border-t border-zinc-800/60 pt-4 flex flex-col gap-3 font-mono text-xs text-zinc-500">
              <div className="flex justify-between">
                <span>{t.statusLabel}</span>
                <span className="text-emerald-400">{t.onlineStatus}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.sectorLabel}</span>
                <span className="text-zinc-300">{t.introduction}</span>
              </div>
            </div>
          </div>

          {/* Middle Column: Spacer for the fixed chip */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column: Bio Telemetry / Specs */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <h3 className="text-lg font-mono text-zinc-300 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-500" />
              <span>{t.coreSpecs}</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="bg-[#0c0c0e]/90 p-3 rounded-lg border border-zinc-800/40">
                <p className="text-zinc-500 text-[10px]">{t.currentRoleLabel}</p>
                <p className="text-zinc-300 font-semibold mt-1">{t.currentRoleValue}</p>
              </div>
              <div className="bg-[#0c0c0e]/90 p-3 rounded-lg border border-zinc-800/40">
                <p className="text-zinc-500 text-[10px]">{t.uptimeRatingLabel}</p>
                <p className="text-emerald-400 font-semibold mt-1">70%</p>
              </div>
              <div className="bg-[#0c0c0e]/90 p-3 rounded-lg border border-zinc-800/40">
                <p className="text-zinc-500 text-[10px]">{t.baseCoordsLabel}</p>
                <p className="text-zinc-300 font-semibold mt-1">{t.baseCoordsValue}</p>
              </div>
              <div className="bg-[#0c0c0e]/90 p-3 rounded-lg border border-zinc-800/40">
                <p className="text-zinc-500 text-[10px]">{t.computationalFocusLabel}</p>
                <p className="text-amber-400 font-semibold mt-1">{t.computationalFocusValue}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3 items-start">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200 block mb-1">{t.philosophyTitle}</strong>
                "{t.philosophyText}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ SKILLS SECTION ------------------ */}
      <section
        id="skills-section"
        className="min-h-[110vh] flex items-center py-20 px-4 sm:px-8 lg:px-16"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Stack Categories */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20">
                {t.mod2Title}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white capitalize">
              {t.skillsTitle}
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t.skillsIntro}
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {skillGroups.slice(0, 2).map((group, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {group.category}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {group.skills.map((skill, sj) => (
                      <div key={sj} className="flex flex-col gap-1">
                        <div className="flex justify-between font-mono text-xs text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            {renderIcon(skill.icon)}
                            {skill.name}
                          </span>
                          <span className="text-emerald-400">{skill.level}MHz</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Prompting Skill Breakdown */}
            <div className="border-t border-zinc-800/60 pt-4 flex flex-col gap-3.5">
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>{t.promptingSkillTitle}</span>
              </h3>
              
              <div className="flex flex-col gap-3">
                {[
                  { name: t.instructional, level: 90, label: t.advanced, color: 'bg-cyan-500/80' },
                  { name: t.contextual, level: 85, label: t.advanced, color: 'bg-emerald-500/80' },
                  { name: t.cot, level: 75, label: t.proficient, color: 'bg-sky-500/80' },
                  { name: t.roleBased, level: 70, label: t.proficient, color: 'bg-purple-500/80' },
                  { name: t.fewShot, level: 50, label: t.intermediate, color: 'bg-amber-500/80' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between font-mono text-xs text-zinc-400">
                      <span className="text-zinc-300">{item.name}</span>
                      <span className="text-zinc-400">{item.level}% <span className="text-[10px] text-zinc-500 font-semibold">({item.label})</span></span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: Spacer for the fixed chip */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column: Database & Cloud Specs + Human Languages */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Database & Cloud Specs */}
            <div className="flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl flex-1">
              <h3 className="text-lg font-mono text-zinc-300 border-b border-zinc-800 pb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>{t.infrastructureTitle}</span>
              </h3>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-2">
                {t.infrastructureText}
              </p>

              <div className="flex flex-col gap-3">
                {skillGroups[2].skills.map((skill, sj) => (
                  <div key={sj} className="flex flex-col gap-1">
                    <div className="flex justify-between font-mono text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        {renderIcon(skill.icon)}
                        {skill.name}
                      </span>
                      <span className="text-emerald-400">{skill.level}MHz</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-950/10 border border-emerald-500/15 p-4 rounded-xl flex gap-3 items-center mt-3">
                <Cpu className="w-8 h-8 text-emerald-400 shrink-0" />
                <div className="font-mono text-[10px] leading-relaxed text-zinc-400">
                  <span className="text-emerald-400 font-semibold block uppercase">{t.optimalReactionTitle}</span>
                  {t.optimalReactionText}
                </div>
              </div>
            </div>

            {/* Human Languages Card */}
            <div className="flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
              <h3 className="text-lg font-mono text-zinc-300 border-b border-zinc-800 pb-2 flex items-center gap-2">
                <Languages className="w-4 h-4 text-emerald-500" />
                <span className="capitalize text-zinc-100">{t.humanLanguagesTitle}</span>
              </h3>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-2">
                {t.humanLanguagesText}
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { name: t.arabic, level: t.motherTongue, percent: 100 },
                  { name: t.english, level: t.fluent, percent: 95 },
                  { name: t.turkish, level: t.intermediate, percent: 70 },
                  { name: t.french, level: t.beginner, percent: 40 },
                  { name: t.italian, level: t.beginner, percent: 30 }
                ].map((lang, sj) => (
                  <div key={sj} className="flex flex-col gap-1">
                    <div className="flex justify-between font-mono text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5 text-zinc-200">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {lang.name}
                      </span>
                      <span className="text-emerald-400">{lang.level}</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ PROJECTS SECTION ------------------ */}
      <section
        id="projects-section"
        className="min-h-[120vh] flex items-center py-20 px-4 sm:px-8 lg:px-16"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Projects Overview & First 2 Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-500 uppercase tracking-widest bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/20">
                  {t.mod3Title}
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white">
                {t.projectsTitle}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t.projectsIntro}
              </p>
            </div>

            {/* Project Card 1 */}
            <div className="group p-5 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 hover:border-sky-500/30 rounded-2xl flex flex-col gap-4 shadow-2xl transition-all duration-300">
              {renderProjectPlaceholder(projects[0].imageType)}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-white font-mono group-hover:text-sky-400 transition-colors">
                    {projects[0].title}
                  </h3>
                  <a href={projects[0].github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-sky-400 transition-colors pointer-events-auto">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {projects[0].description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {projects[0].tech.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono text-sky-400 bg-sky-500/5 border border-sky-500/10 px-2 py-0.5 rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t border-zinc-800/40 pt-2.5 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span>{t.role}: {projects[0].role}</span>
                <span className="text-sky-500 uppercase">{projects[0].stats.latency} {t.latency}</span>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="group p-5 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 hover:border-sky-500/30 rounded-2xl flex flex-col gap-4 shadow-2xl transition-all duration-300">
              {renderProjectPlaceholder(projects[1].imageType)}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-white font-mono group-hover:text-sky-400 transition-colors">
                    {projects[1].title}
                  </h3>
                  <a href={projects[1].github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-sky-400 transition-colors pointer-events-auto">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {projects[1].description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {projects[1].tech.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono text-sky-400 bg-sky-500/5 border border-sky-500/10 px-2 py-0.5 rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t border-zinc-800/40 pt-2.5 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span>{t.role}: {projects[1].role}</span>
                <span className="text-sky-500 uppercase">{projects[1].stats.latency} {t.latency}</span>
              </div>
            </div>
          </div>

          {/* Middle Column: Spacer for the fixed chip */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column: Third Project & Project Diagnostic Telemetry */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Project Card 3 */}
            <div className="group p-5 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 hover:border-sky-500/30 rounded-2xl flex flex-col gap-4 shadow-2xl transition-all duration-300">
              {renderProjectPlaceholder(projects[2].imageType)}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-white font-mono group-hover:text-sky-400 transition-colors">
                    {projects[2].title}
                  </h3>
                  <a href={projects[2].github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-sky-400 transition-colors pointer-events-auto">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {projects[2].description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {projects[2].tech.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono text-sky-400 bg-sky-500/5 border border-sky-500/10 px-2 py-0.5 rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t border-zinc-800/40 pt-2.5 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span>{t.role}: {projects[2].role}</span>
                <span className="text-sky-500 uppercase">{projects[2].stats.latency} {t.latency}</span>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="group p-5 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 hover:border-amber-500/30 rounded-2xl flex flex-col gap-4 shadow-2xl transition-all duration-300">
              {renderProjectPlaceholder(projects[3].imageType)}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-white font-mono group-hover:text-amber-400 transition-colors">
                    {projects[3].title}
                  </h3>
                  <div className="flex items-center gap-3 text-zinc-500 pointer-events-auto">
                    {projects[3].link && (
                      <a href={projects[3].link} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a href={projects[3].github} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {projects[3].description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {projects[3].tech.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono text-amber-400 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t border-zinc-800/40 pt-2.5 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span>{t.role}: {projects[3].role}</span>
                <span className="text-amber-500 uppercase">{projects[3].stats.latency} {t.latency}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ CERTIFICATES SECTION ------------------ */}
      <section
        id="certificates-section"
        className="min-h-[110vh] flex items-center py-20 px-4 sm:px-8 lg:px-16"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Certifications Title and 2 Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-purple-500 uppercase tracking-widest bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/20">
                {t.mod4Title}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white">
              {t.verifiedBadges}
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t.badgesText}
            </p>

            <div className="flex flex-col gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-800/50 hover:border-purple-500/30 rounded-xl transition-colors flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/5 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">{cert.issuer}</p>
                    <h4 className="text-sm font-semibold text-white mt-0.5">{cert.title}</h4>
                    <p className="text-[9px] font-mono text-purple-400 mt-1 uppercase">{t.verifiedId} // {cert.idCode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column: Spacer for the fixed chip */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column: Cryptographic Art */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <h3 className="text-lg font-mono text-zinc-300 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-500" />
              <span>{t.cryptographicArt}</span>
            </h3>

            <div className="flex flex-col gap-4">
              {/* Card 1: Yahux Hasher */}
              <div className="p-4 bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-800/50 hover:border-purple-500/30 rounded-xl transition-colors flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-purple-500/5 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <Code className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">{t.createdByYamen}</p>
                  <h4 className="text-sm font-semibold text-white mt-0.5">{t.hasherTitle}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{t.hasherDesc}</p>
                </div>
              </div>

              {/* Card 2: Custom Encryption Standard */}
              <div className="p-4 bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-800/50 hover:border-purple-500/30 rounded-xl transition-colors flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-purple-500/5 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">{t.proprietaryCipher}</p>
                  <h4 className="text-sm font-semibold text-white mt-0.5">{t.proprietaryTitle}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{t.proprietaryDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ CONTACT SECTION ------------------ */}
      <section
        id="contact-section"
        className="min-h-[75vh] flex items-center py-16 px-4 sm:px-8 lg:px-16"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Direct Signal Info */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-fuchsia-500 uppercase tracking-widest bg-fuchsia-500/5 px-2 py-0.5 rounded border border-fuchsia-500/20">
                {t.mod5Title}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white">
              {t.uplinkTitle}
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t.uplinkText}
            </p>

            <div className="flex flex-col gap-3 font-mono text-xs text-zinc-400 mt-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/30">
                <Mail className="w-4 h-4 text-fuchsia-400" />
                <div>
                  <p className="text-zinc-500 text-[9px]">{t.directBroadcast}</p>
                  <p className="text-zinc-300 font-semibold">yamenalhudhud@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/30">
                <Phone className="w-4 h-4 text-fuchsia-400" />
                <div>
                  <p className="text-zinc-500 text-[9px]">{t.phoneNumber}</p>
                  <p className="text-zinc-300 font-semibold">+962796104412</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Spacer for the fixed chip */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column: Terminal Contact Form */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0a0a0b]/85 backdrop-blur-md border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <h3 className="text-lg font-mono text-zinc-300 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Send className="w-4 h-4 text-fuchsia-500" />
              <span>{t.uplinkTerminal}</span>
            </h3>

            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center gap-4 text-center font-mono">
                <CheckCircle className="w-12 h-12 text-fuchsia-400 animate-pulse" />
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">{t.formSuccessTitle}</p>
                  <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed">
                    {t.formSuccessDesc}
                  </p>
                </div>
                <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-fuchsia-500 animate-[loading_6s_linear]" style={{ width: '100%' }} />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-xs">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name-input" className="text-zinc-500 text-[10px] uppercase">
                    {t.senderIdentity}
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t.placeholderName}
                    className="w-full bg-zinc-950/80 border border-zinc-800 hover:border-fuchsia-500/30 focus:border-fuchsia-500 p-3 rounded-lg text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-input" className="text-zinc-500 text-[10px] uppercase">
                    {t.returnEmail}
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.placeholderEmail}
                    className="w-full bg-zinc-950/80 border border-zinc-800 hover:border-fuchsia-500/30 focus:border-fuchsia-500 p-3 rounded-lg text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message-input" className="text-zinc-500 text-[10px] uppercase">
                    {t.payloadMessage}
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t.placeholderMsg}
                    className="w-full bg-zinc-950/80 border border-zinc-800 hover:border-fuchsia-500/30 focus:border-fuchsia-500 p-3 rounded-lg text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  id="submit-uplink-btn"
                  type="submit"
                  className="mt-2 w-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg border border-fuchsia-500/30 hover:border-fuchsia-400 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.transmitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
