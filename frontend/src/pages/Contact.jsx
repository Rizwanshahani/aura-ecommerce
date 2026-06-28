import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Thank you for contacting Aura! We will respond within 24 hours.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1200);
    };

    return (
        <div className="pt-28 pb-16 bg-slate-50/50 min-h-screen">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-lg mx-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-600">Get in Touch</span>
                    <h1 className="text-3xl font-extrabold text-slate-900">How Can We Help You?</h1>
                    <p className="text-slate-500 text-sm">
                        Got a question about shipping speeds, bulk purchases, or order tracking? Drop us a note!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left: Contact Info Cards */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Email Us</h4>
                                <p className="text-xs text-slate-500 mt-0.5">support@aura.com</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Call Support</h4>
                                <p className="text-xs text-slate-500 mt-0.5">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Headquarters</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Tech Plaza, NY, 10001</p>
                            </div>
                        </div>

                        {/* Mock Interactive Map Placeholder */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-150 h-44 shadow-3xs group">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
                                alt="Map location placeholder"
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                                <span className="bg-white/95 text-slate-800 text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5">
                                    <ShieldCheck size={12} className="text-pink-650" /> View Map Location
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-3xs">
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Need help with my order checkout"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="Write your details or questions here..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none"
                                    required
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold h-11 rounded-xl cursor-pointer gap-2 mt-4"
                            >
                                <Send size={16} /> {loading ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
