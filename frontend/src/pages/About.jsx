import React from "react";
import { Sparkles, Heart, Shield, Users } from "lucide-react";

const About = () => {
    const values = [
        { title: "Innovation First", text: "We constantly scout for next-generation technology to bring you tools that empower your work and creative projects.", icon: <Sparkles className="text-pink-600" size={24} />, bg: "bg-pink-50" },
        { title: "Customer Passion", text: "Your satisfaction drives us. We back every product with 24/7 technical support and hassle-free returns.", icon: <Heart className="text-rose-600" size={24} />, bg: "bg-rose-50" },
        { title: "Uncompromising Quality", text: "Every device in our catalog undergoes testing to guarantee performance, authenticity, and longevity.", icon: <Shield className="text-blue-600" size={24} />, bg: "bg-blue-50" }
    ];

    const team = [
        { name: "Julian Sterling", role: "Founder & CEO", avatar: "JS", desc: "A tech visionary with 12+ years of leadership in consumer hardware scaling." },
        { name: "Amara Okeke", role: "Chief Tech Architect", avatar: "AO", desc: "Coordinates product curation, quality compliance, and infrastructure." },
        { name: "Leo Sterling", role: "Creative Director", avatar: "LS", desc: "Drives visual aesthetics, product designs, and user interactions." }
    ];

    return (
        <div className="pt-28 pb-16 bg-slate-50/50 min-h-screen">
            <div className="max-w-5xl mx-auto px-6 space-y-16">
                
                {/* Hero / Vision Statement */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-600">Who We Are</span>
                    <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                        Powering Your <br />
                        Digital Workspace Since 2026
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        At Aura, we believe that the tools you use define the quality of your output. We curate high-end laptops, phones, smart devices, and accessories designed to help creators, engineers, and professionals reach their peak performance.
                    </p>
                </div>

                {/* Company Values Grid */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-slate-900 text-center">Our Core Pillars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs hover:shadow-xs transition-shadow space-y-4">
                                <div className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center`}>
                                    {v.icon}
                                </div>
                                <h3 className="font-bold text-slate-800 text-base">{v.title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brand Story (Divided Section) */}
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-3xs">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">The Story of Aura</h2>
                        <p className="text-slate-600 text-xs leading-relaxed">
                            Aura was born out of frustration with complex, cluttered tech shopping. We wanted to build a MERN-powered e-commerce portal that prioritizes visual clarity, fast responsiveness, and curated electronics.
                        </p>
                        <p className="text-slate-600 text-xs leading-relaxed">
                            From a small workspace setup, we have expanded to support thousands of customers across the globe. Today, we partner directly with certified manufacturers to offer unbeatable rates, fast dispatch timelines, and an authentic product portfolio.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=80"
                            alt="Tech workspace"
                            className="rounded-2xl w-full h-56 object-cover border border-slate-150"
                        />
                    </div>
                </div>

                {/* Team Grid */}
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900">Meet the Team</h2>
                        <p className="text-xs text-slate-500">The minds behind Aura's product curation and technology stack</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {team.map((t) => (
                            <div key={t.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs text-center flex flex-col items-center hover:scale-[1.01] transition-transform">
                                <div className="w-14 h-14 rounded-full bg-slate-900 text-white font-extrabold flex items-center justify-center mb-4">
                                    {t.avatar}
                                </div>
                                <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                                <span className="text-xs text-pink-600 font-bold mb-3">{t.role}</span>
                                <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                                    {t.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
