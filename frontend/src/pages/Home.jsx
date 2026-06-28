import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { toast } from "sonner";
import { Laptop, Smartphone, Headphones, Watch, Check, Star, ArrowRight, ShoppingCart, Percent, Flame, Clock } from "lucide-react";

const Home = () => {
    const dispatch = useDispatch();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Countdown Timer state for Deals section
    const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 42, seconds: 18 });

    const categories = [
        { name: "Laptops", icon: <Laptop size={22} />, count: "Premium Devices", bg: "from-blue-500/10 to-indigo-500/10", border: "hover:border-blue-500/30", text: "text-blue-600" },
        { name: "Smartphones", icon: <Smartphone size={22} />, count: "Next-Gen Mobile", bg: "from-pink-500/10 to-rose-500/10", border: "hover:border-pink-500/30", text: "text-pink-600" },
        { name: "Headphones", icon: <Headphones size={22} />, count: "Immersive Audio", bg: "from-purple-500/10 to-violet-500/10", border: "hover:border-purple-500/30", text: "text-purple-600" },
        { name: "Smartwatches", icon: <Watch size={22} />, count: "Wearable Tech", bg: "from-amber-500/10 to-orange-500/10", border: "hover:border-amber-500/30", text: "text-amber-600" }
    ];

    const testimonials = [
        { name: "Alice Henderson", role: "UI Designer", text: "The MacBook Pro M3 I bought is flawless. Shipping was incredibly fast, and customer support was super helpful throughout!", rating: 5, avatar: "AH", verified: true },
        { name: "Marcus Brody", role: "Software Engineer", text: "Sony WH-1000XM5 headphones are outstanding. Excellent noise cancelling and authentic product. Will buy again!", rating: 5, avatar: "MB", verified: true },
        { name: "Clara Vance", role: "Tech Blogger", text: "Best tech shopping experience. The layout is clean, checkout with mock card was seamless, and the product quality is top-notch.", rating: 4, avatar: "CV", verified: true }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    return { hours: 12, minutes: 0, seconds: 0 }; // Loop timer
                }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:8000/api/v1/product");
                if (res.data.success) {
                    setFeaturedProducts(res.data.products.slice(0, 8)); // fetch more for grids
                }
            } catch (error) {
                console.log("Failed to fetch featured products, using fallbacks");
                setFeaturedProducts([
                    { _id: "1", name: "MacBook Pro M3", price: 1599, category: "Laptops", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60", rating: 4.8, numReviews: 12, stock: 5 },
                    { _id: "2", name: "iPhone 15 Pro", price: 999, category: "Smartphones", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60", rating: 4.6, numReviews: 18, stock: 10 },
                    { _id: "3", name: "Sony WH-1000XM5", price: 349, category: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60", rating: 4.7, numReviews: 24, stock: 8 },
                    { _id: "4", name: "Apple Watch Series 9", price: 399, category: "Smartwatches", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60", rating: 4.5, numReviews: 6, stock: 4 }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProducts();
    }, []);

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        dispatch(
            addToCart({
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1,
                stock: product.stock
            })
        );
        toast.success(`${product.name} added to cart!`);
    };

    // Calculate deal products dynamically
    const dealProducts = featuredProducts.slice(0, 3).map((p, idx) => {
        const discountRates = [20, 15, 30]; // custom percentages
        const itemsLeft = [3, 6, 2];
        const totalClaimed = [75, 45, 85];
        return {
            ...p,
            discount: discountRates[idx % 3],
            originalPrice: Math.round(p.price / (1 - discountRates[idx % 3] / 100)),
            stockLeft: itemsLeft[idx % 3],
            claimedPercent: totalClaimed[idx % 3]
        };
    });

    return (
        <div className="pt-20 bg-slate-50/60 dark:bg-slate-950 min-h-screen">
            {/* 1. Hero Showcase */}
            <Hero />

            {/* 2. Visual Categories Section */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="text-center space-y-3 mb-14">
                    <span className="text-xs font-extrabold uppercase tracking-widest bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Curated Collections</span>
                    <h2 className="text-3.5xl font-black tracking-tight text-slate-900 dark:text-white">Shop by Category</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">Explore high-quality tech gear grouped by product category</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            to={`/products?category=${cat.name}`}
                            className={`group bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-3xs flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:scale-[1.03] ${cat.border}`}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.bg} flex items-center justify-center ${cat.text} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                {cat.icon}
                            </div>
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-pink-600 transition-colors">
                                {cat.name}
                            </h4>
                            <span className="text-xs text-slate-400 dark:text-slate-550 mt-1.5 font-medium">{cat.count}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. NEW: Deals of the Day Section */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                {/* Background Ambient Lights */}
                <div className="absolute top-0 left-[20%] w-[30%] h-[30%] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-[25%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header with Timer */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-slate-800 pb-8">
                        <div className="space-y-2 text-left">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                                <span className="text-xs font-black uppercase tracking-wider text-pink-500 flex items-center gap-1">
                                    <Flame size={14} className="fill-pink-500" /> Limited Offers
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Deals of the Day</h2>
                            <p className="text-slate-400 text-xs md:text-sm">Hurry! Offers are valid only for a limited time or until stock lasts.</p>
                        </div>

                        {/* Countdown Badge */}
                        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl px-5 py-3 backdrop-blur-xs">
                            <Clock size={16} className="text-pink-500 animate-spin-slow" />
                            <span className="text-xs font-bold text-slate-400 uppercase mr-1">Ends in:</span>
                            <div className="flex items-center gap-1 font-mono text-sm font-black text-white">
                                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-sm">
                                    {String(timeLeft.hours).padStart(2, "0")}
                                </span>
                                <span className="text-pink-500">:</span>
                                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-sm">
                                    {String(timeLeft.minutes).padStart(2, "0")}
                                </span>
                                <span className="text-pink-500">:</span>
                                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-sm text-pink-400 animate-pulse">
                                    {String(timeLeft.seconds).padStart(2, "0")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Deals Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-slate-800/50 border border-slate-800 rounded-2xl p-6 h-96"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {dealProducts.map((p) => (
                                <div 
                                    key={p._id}
                                    className="group bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-pink-500/40 shadow-lg hover:shadow-pink-500/5 transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* Image Container with Badges */}
                                    <div className="relative bg-slate-900 overflow-hidden h-52 flex items-center justify-center">
                                        <img 
                                            src={p.image} 
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        {/* Sale Percentage Badge */}
                                        <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                                            -{p.discount}% OFF
                                        </span>
                                        {p.stock === 0 && (
                                            <span className="absolute inset-0 bg-slate-950/70 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                                                Sold Out
                                            </span>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex flex-col flex-grow space-y-4">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-pink-500">
                                                {p.category}
                                            </span>
                                            <Link to={`/product/${p._id}`} className="hover:text-pink-500 transition-colors block">
                                                <h4 className="font-extrabold text-sm text-white truncate">
                                                    {p.name}
                                                </h4>
                                            </Link>
                                        </div>

                                        {/* Ratings */}
                                        <div className="flex items-center gap-1.5">
                                            <div className="flex text-amber-400">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star 
                                                        key={idx}
                                                        size={11}
                                                        className={idx < Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "text-slate-800"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-bold">({p.numReviews} Reviews)</span>
                                        </div>

                                        {/* Progress Bar for Stock */}
                                        <div className="space-y-2 pt-1">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span className="text-slate-400">Claimed: <strong className="text-white">{p.claimedPercent}%</strong></span>
                                                <span className="text-pink-500">Only {p.stockLeft} Left!</span>
                                            </div>
                                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-full rounded-full transition-all duration-500"
                                                    style={{ width: `${p.claimedPercent}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Pricing and Cart */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-900 mt-auto">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl font-black text-white">${p.price}</span>
                                                <span className="text-xs text-slate-500 line-through font-bold">${p.originalPrice}</span>
                                            </div>
                                            <Button
                                                disabled={p.stock === 0}
                                                onClick={(e) => handleAddToCart(p, e)}
                                                className="bg-pink-600 hover:bg-pink-700 text-white h-9 rounded-xl px-4 cursor-pointer text-xs gap-1.5 font-bold shadow-xs hover:scale-[1.03] transition-all"
                                            >
                                                <ShoppingCart size={13} /> Buy
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 4. Featured Products Section */}
            <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-14">
                        <div className="text-left space-y-3">
                            <span className="text-xs font-extrabold uppercase tracking-widest bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Trending Now</span>
                            <h2 className="text-3.5xl font-black tracking-tight text-slate-900 dark:text-white">Featured Tech</h2>
                        </div>
                        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-pink-650 hover:text-pink-700 transition-colors">
                            Explore All <ArrowRight size={15} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 h-96">
                                    <div className="bg-slate-200 dark:bg-slate-800 h-44 rounded-xl w-full mb-4"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-3/4 mb-2"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/2 mb-6"></div>
                                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-sm w-full mt-auto"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.slice(0, 4).map((p) => (
                                <div
                                    key={p._id}
                                    className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-3xs hover:shadow-md transition-all duration-300 flex flex-col h-full"
                                >
                                    <Link to={`/product/${p._id}`} className="relative block bg-slate-50 dark:bg-slate-950 overflow-hidden h-48">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {p.stock === 0 && (
                                            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                                                Sold Out
                                            </span>
                                        )}
                                    </Link>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-pink-650 mb-1">
                                            {p.category}
                                        </span>
                                        <Link to={`/product/${p._id}`} className="hover:text-pink-600 transition-colors">
                                            <h4 className="font-extrabold text-slate-850 dark:text-white text-sm truncate mb-1">
                                                {p.name}
                                            </h4>
                                        </Link>
                                        
                                        <div className="flex items-center gap-1 mb-3">
                                            <div className="flex text-amber-400">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star
                                                        key={idx}
                                                        size={11}
                                                        className={idx < Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-850"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-bold">({p.numReviews})</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                                            <span className="text-lg font-black text-slate-900 dark:text-white">${p.price}</span>
                                            <Button
                                                disabled={p.stock === 0}
                                                onClick={(e) => handleAddToCart(p, e)}
                                                className="bg-pink-600 hover:bg-pink-700 text-white h-8 rounded-lg px-3 cursor-pointer text-xs gap-1.5 font-semibold"
                                            >
                                                <ShoppingCart size={13} /> Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 5. Special Glassmorphic Promo Banner */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-10 md:p-14 shadow-xl border border-slate-900">
                    <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-pink-650/15 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center z-10 relative">
                        <div className="space-y-6 text-left">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
                                <Percent size={14} /> Flash Offer
                            </span>
                            <h2 className="text-3.5xl md:text-4xl font-extrabold leading-tight">
                                Unleash Next-Gen Power. <br />
                                Get Up To 40% Off Laptops!
                            </h2>
                            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                                Upgrade your workflow with our premium selection of MacBook Pro and Dell XPS. Limited time discount coupon code auto-applied at checkout.
                            </p>
                            <Link to="/products?category=Laptops" className="inline-block">
                                <Button className="bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold h-11 px-6 cursor-pointer">
                                    Claim discount
                                </Button>
                            </Link>
                        </div>

                        <div className="hidden md:flex justify-center">
                            <div className="relative p-1.5 bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-xs">
                                <img
                                    src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=80"
                                    alt="Promo laptop"
                                    className="w-80 h-52 object-cover rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Core Services Features (Shipping, Support, Guarantee) */}
            <Features />

            {/* 7. Testimonials Grid Section */}
            <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center space-y-2 mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Client Reviews</span>
                        <h2 className="text-3.5xl font-black text-slate-900 dark:text-white">What Our Buyers Say</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="bg-slate-50/40 dark:bg-slate-900/30 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between hover:shadow-sm hover:scale-[1.01] transition-all">
                                <div className="space-y-4 text-left">
                                    <div className="flex text-amber-400">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm italic leading-relaxed">
                                        "{t.text}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-3.5 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center text-pink-650 font-bold text-xs">
                                        {t.avatar}
                                    </div>
                                    <div className="text-left">
                                        <h5 className="font-extrabold text-slate-800 dark:text-white text-xs flex items-center gap-1">
                                            {t.name}
                                            {t.verified && <span className="inline-block bg-teal-500 text-white rounded-full p-0.5 text-[8px] scale-80 font-black"><Check size={8} /></span>}
                                        </h5>
                                        <span className="text-[10px] text-slate-450 dark:text-slate-500 font-medium">{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Beautiful Newsletter Subscription Banner */}
            <section className="py-24 max-w-4xl mx-auto px-6 text-center space-y-6">
                <h2 className="text-3.5xl font-black text-slate-900 dark:text-white tracking-tight">Stay Ahead of the Tech Curve</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Subscribe to our exclusive newsletter to receive early-bird deals, coupon codes, and tech reviews.
                </p>

                <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2.5 pt-4">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-pink-500 outline-none flex-grow text-slate-850 dark:text-white shadow-3xs"
                    />
                    <Button
                        onClick={() => toast.success("Thank you for subscribing to Aura!")}
                        className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold h-12 px-6 cursor-pointer hover:shadow-md transition-all shrink-0"
                    >
                        Subscribe
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
