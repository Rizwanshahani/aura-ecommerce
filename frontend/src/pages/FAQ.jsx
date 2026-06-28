import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
    const faqData = [
        {
            q: "What is your typical shipping timeline?",
            a: "Orders placed on Aura are processed and dispatched within 24 hours. Domestic shipping takes 3-5 business days, while international shipping ranges between 7-14 business days."
        },
        {
            q: "How can I update my shipping address after an order is placed?",
            a: "If you need to change your address, please update it immediately in your User Profile under settings, and contact support@aura.com with your Order ID before the status updates to 'Shipped'."
        },
        {
            q: "What payment methods are accepted?",
            a: "We currently support mock card payments (Visa, Mastercard, AMEX) in our sandbox environment for testing. Actual transaction gateways can be configured in production settings."
        },
        {
            q: "What is your refund and return policy?",
            a: "We offer a 30-day return policy on all electronics. If the item is defective or isn't to your liking, keep the original packaging and contact our sales desk for a pre-paid return shipping label."
        },
        {
            q: "How can I trace my order status?",
            a: "Once logged in, go to your Profile and check the 'My Orders' tab. Click 'View Details' on any order to view the live progress step tracker (Pending, Processing, Shipped, Delivered)."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (idx) => {
        setActiveIndex(activeIndex === idx ? null : idx);
    };

    return (
        <div className="pt-28 pb-16 bg-slate-50/50 min-h-screen">
            <div className="max-w-3xl mx-auto px-6 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-2">
                        <HelpCircle size={24} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Find answers to common queries about order placements, shipping speeds, returns, and support.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqData.map((faq, idx) => {
                        const isOpen = activeIndex === idx;

                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl border border-slate-100 shadow-3xs overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleFAQ(idx)}
                                    className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                                >
                                    <span className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                                        {faq.q}
                                    </span>
                                    <span className="text-slate-400 flex-shrink-0">
                                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 md:px-6 md:pb-6 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-50 pt-4 animate-fade-in">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer Help Alert */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 text-center space-y-3 shadow-3xs">
                    <h3 className="font-bold text-slate-900 text-sm md:text-base">Still have questions?</h3>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                        Can't find the answer you're looking for? Reach out directly to our customer support desk.
                    </p>
                    <div className="pt-2">
                        <a href="/contact" className="inline-block text-xs font-bold text-white bg-pink-650 hover:bg-pink-700 px-5 py-2.5 rounded-xl shadow-xs transition-colors">
                            Contact Support
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FAQ;
