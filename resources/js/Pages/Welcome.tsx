import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Search, ChevronDown, MoveRight, ChevronLeft, ChevronRight, Plus, Minus, ArrowRight, HelpCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Welcome() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(1);
    const [activeContinent, setActiveContinent] = useState<string>('North America');

    const faqs = [
        { q: "What is Ultra Sprint Calendar?", a: "Ultra Sprint Calendar features a comprehensive database of races around the world..." },
        { q: "How do I find a race near me?", a: "Ultra Sprint Calendar features a comprehensive database of races from various categories and distances. Use our advanced filtering options to find the perfect event matching your location and ability." },
        { q: "How do I filter races by month?", a: "You can use the 'Filter by Month' dropdown in our advanced search..." },
        { q: "Is the race information updated regularly?", a: "Yes, our team constantly monitors and updates the race statuses..." },
        { q: "Can I filter races by distance?", a: "Absolutely! Distance filtering is available on the main search page." },
        { q: "How do I get my event listed on the calendar?", a: "Click on 'Post a Trip' or 'Organizer Login' at the top to submit an event." }
    ];

    return (
        <div className="min-h-screen bg-white font-sans relative selection:bg-[#FD4621]/10">
            <Head title="Ultra Sprint Calender" />

            {/* Floating Navbar */}
            <nav className="absolute top-4 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 w-full items-center justify-between rounded-full bg-white px-6 shadow-lg">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-[#FD4621] text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
                            </svg>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[15px] font-bold text-slate-900 tracking-tight">Ultra Sprint</span>
                            <span className="text-[13px] text-slate-500 font-medium">Calender</span>
                        </div>
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        <button className="flex items-center gap-1 text-[15px] font-semibold text-slate-900 hover:text-[#FD4621] transition-colors">
                            Race <ChevronDown className="h-4 w-4 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-1 text-[15px] font-semibold text-slate-900 hover:text-[#FD4621] transition-colors">
                            ULTRABoard <ChevronDown className="h-4 w-4 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-1 text-[15px] font-semibold text-slate-900 hover:text-[#FD4621] transition-colors">
                            News <ChevronDown className="h-4 w-4 text-slate-400" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden lg:block">
                            <input 
                                type="text"
                                placeholder="Find a race"
                                className="h-10 w-64 rounded-full border border-slate-200 bg-white pl-4 pr-10 text-[14px] text-slate-900 outline-none transition-all focus:border-[#FD4621] focus:ring-1 focus:ring-[#FD4621]"
                            />
                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                        <Link 
                            href={route('login')}
                            className="flex h-10 items-center justify-center rounded-full bg-[#FD4621] px-6 text-[15px] font-bold text-white transition-all hover:bg-[#E13E1D]"
                        >
                            Log in
                        </Link>
                        <button 
                            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute top-0 left-0 w-full rounded-3xl bg-white p-6 shadow-2xl md:hidden flex flex-col gap-6 ring-1 ring-slate-100/50 transform origin-top transition-all">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-[#FD4621] text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[15px] font-bold text-slate-900 tracking-tight">Ultra Sprint</span>
                                    <span className="text-[13px] text-slate-500 font-medium">Calender</span>
                                </div>
                            </Link>
                            <button 
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 font-bold text-slate-900 hover:bg-slate-100 transition-colors">
                                Race <ChevronDown className="h-5 w-5 text-slate-400" />
                            </button>
                            <button className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 font-bold text-slate-900 hover:bg-slate-100 transition-colors">
                                ULTRABoard <ChevronDown className="h-5 w-5 text-slate-400" />
                            </button>
                            <button className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 font-bold text-slate-900 hover:bg-slate-100 transition-colors">
                                News <ChevronDown className="h-5 w-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text"
                                    placeholder="Find a race"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-[15px] text-slate-900 outline-none focus:border-[#FD4621] focus:ring-1 focus:ring-[#FD4621]"
                                />
                            </div>
                            <Link 
                                href={route('login')}
                                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#FD4621] text-[15px] font-bold text-white transition-all hover:bg-[#E13E1D] shadow-md shadow-[#FD4621]/20"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative h-screen min-h-[600px] w-full">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000&auto=format&fit=crop" 
                        alt="Trail Runner" 
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                    <h1 className="mt-16 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-[80px] leading-tight">
                        Your Next Big Run<br />Starts Here.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl font-medium">
                        Step into races that demand more, offering unforgettable endurance<br className="hidden sm:block" />
                        experiences across extreme distances worldwide
                    </p>
                    <button className="mt-8 flex h-14 items-center justify-center gap-2 rounded-full bg-[#FD4621] px-8 text-lg font-bold text-white transition-all hover:bg-[#E13E1D] hover:scale-105 active:scale-95 shadow-lg">
                        Find races <MoveRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                {/* Races by Distance */}
                <section className="mb-32">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <p className="text-[11px] font-bold tracking-widest text-[#FD4621] uppercase mb-2">CHOOSE BY DISTANCE</p>
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Races by distance</h2>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FD4621] text-white hover:bg-[#E13E1D] transition-colors shadow-md shadow-[#FD4621]/30">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 50k Card */}
                        <div className="group relative h-[380px] w-full overflow-hidden rounded-[20px] bg-slate-900 flex flex-col justify-between p-6">
                            <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105" alt="50k" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            <div className="relative z-10 mt-auto mb-4">
                                <h3 className="text-4xl font-black text-white">50k</h3>
                                <p className="text-sm text-slate-300">3,430 races available</p>
                            </div>
                            <button className="relative z-10 flex h-12 w-full items-center justify-between rounded-full bg-white/10 backdrop-blur-md px-6 text-sm font-semibold text-white border border-white/20 transition-all hover:bg-white/20">
                                Explore <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* 12hr Card */}
                        <div className="group relative h-[380px] w-full overflow-hidden rounded-[20px] bg-slate-900 flex flex-col justify-between p-6 shadow-xl shadow-[#FD4621]/10 transform -translate-y-2">
                            <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105" alt="12hr" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-[#FD4621]/30 to-transparent"></div>
                            <div className="relative z-10 mt-auto mb-4">
                                <h3 className="text-4xl font-black text-white">12hr</h3>
                                <p className="text-sm text-white/80">300 races available</p>
                            </div>
                            <button className="relative z-10 flex h-12 w-full items-center justify-between rounded-full bg-[#FD4621] px-6 text-sm font-bold text-white transition-all hover:bg-[#E13E1D] shadow-lg">
                                Explore <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* 20mi Card */}
                        <div className="group relative h-[380px] w-full overflow-hidden rounded-[20px] bg-slate-900 flex flex-col justify-between p-6">
                            <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105" alt="20mi" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            <div className="relative z-10 mt-auto mb-4">
                                <h3 className="text-4xl font-black text-white">20mi</h3>
                                <p className="text-sm text-slate-300">453 races available</p>
                            </div>
                            <button className="relative z-10 flex h-12 w-full items-center justify-between rounded-full bg-white/10 backdrop-blur-md px-6 text-sm font-semibold text-white border border-white/20 transition-all hover:bg-white/20">
                                Explore <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* 80k Card */}
                        <div className="group relative h-[380px] w-full overflow-hidden rounded-[20px] bg-slate-900 flex flex-col justify-between p-6">
                            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105" alt="80k" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            <div className="relative z-10 mt-auto mb-4">
                                <h3 className="text-4xl font-black text-white">80k</h3>
                                <p className="text-sm text-slate-300">324 races available</p>
                            </div>
                            <button className="relative z-10 flex h-12 w-full items-center justify-between rounded-full bg-white/10 backdrop-blur-md px-6 text-sm font-semibold text-white border border-white/20 transition-all hover:bg-white/20">
                                Explore <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Simple Pagination Dots */}
                    <div className="mt-8 flex justify-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
                        <div className="h-1.5 w-4 rounded-full bg-[#FD4621]"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
                    </div>
                </section>

                <div className="h-px w-full bg-slate-100 my-16"></div>

                {/* Races by Type */}
                <section className="mb-32">
                    <p className="text-[11px] font-bold tracking-widest text-[#FD4621] uppercase mb-2">CHOOSE BY TYPE</p>
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Races by type</h2>
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="w-full lg:w-64 flex flex-col gap-2 p-6 bg-slate-50 rounded-2xl h-fit">
                            <button className="flex items-center justify-between px-6 py-4 rounded-xl bg-[#FD4621] text-white font-bold shadow-md shadow-[#FD4621]/20 transition-all">
                                Trail <ChevronRight className="h-4 w-4" />
                            </button>
                            <button className="flex items-center justify-between px-6 py-4 rounded-xl bg-white text-slate-600 font-semibold hover:bg-slate-100 transition-all">
                                Road <ChevronRight className="h-4 w-4 text-slate-300" />
                            </button>
                            <button className="flex items-center justify-between px-6 py-4 rounded-xl bg-white text-slate-600 font-semibold hover:bg-slate-100 transition-all">
                                Ultra <ChevronRight className="h-4 w-4 text-slate-300" />
                            </button>
                            <button className="flex items-center justify-between px-6 py-4 rounded-xl bg-white text-slate-600 font-semibold hover:bg-slate-100 transition-all">
                                Stage <ChevronRight className="h-4 w-4 text-slate-300" />
                            </button>
                            <button className="flex items-center justify-between px-6 py-4 rounded-xl bg-white text-slate-600 font-semibold hover:bg-slate-100 transition-all">
                                Backyard <ChevronRight className="h-4 w-4 text-slate-300" />
                            </button>
                            <button className="flex items-center justify-between px-6 py-4 rounded-xl bg-white text-slate-600 font-semibold hover:bg-slate-100 transition-all">
                                Track <ChevronRight className="h-4 w-4 text-slate-300" />
                            </button>
                        </div>

                        {/* Images grid */}
                        <div className="flex-1 flex flex-col gap-4">
                            {/* Main Active Image */}
                            <div className="relative h-[280px] w-full rounded-2xl overflow-hidden group">
                                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Trail" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                                <div className="absolute left-8 top-8 bottom-8 flex flex-col justify-between text-white">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4 drop-shadow-md">Trail</h3>
                                        <ul className="space-y-2 opacity-90 text-sm font-medium">
                                            <li className="flex items-center gap-2 before:content-[''] before:block before:h-1.5 before:w-1.5 before:bg-white before:rounded-full">Ultra Marathon</li>
                                            <li className="flex items-center gap-2 before:content-[''] before:block before:h-1.5 before:w-1.5 before:bg-white before:rounded-full">Skyrunning</li>
                                            <li className="flex items-center gap-2 before:content-[''] before:block before:h-1.5 before:w-1.5 before:bg-white before:rounded-full">FKTs</li>
                                        </ul>
                                    </div>
                                    <button className="flex w-fit items-center gap-2 rounded-full bg-[#FD4621] px-6 py-3 text-sm font-bold shadow-md hover:bg-[#E13E1D] transition-colors">
                                        Explore 24,000+ races <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Sub Images */}
                            <div className="flex gap-4 h-[180px]">
                                <div className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer">
                                    <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Road" />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-xl font-bold">Road</h3>
                                        <p className="text-xs text-white/80">340 races available</p>
                                    </div>
                                    <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                                <div className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer">
                                    <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Ultra" />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-xl font-bold">Ultra</h3>
                                        <p className="text-xs text-white/80">24 races available</p>
                                    </div>
                                    <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px w-full bg-slate-100 my-16"></div>

                {/* Races by Country */}
                <section className="mb-32">
                    <p className="text-[11px] font-bold tracking-widest text-[#FD4621] uppercase mb-2">CHOOSE BY COUNTRY</p>
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Races by country</h2>
                    
                    <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-2">
                        {/* North America - Expanded */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <button 
                                onClick={() => setActiveContinent(activeContinent === 'North America' ? '' : 'North America')}
                                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
                            >
                                <span className="font-bold text-slate-900">North America</span>
                                <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${activeContinent === 'North America' ? 'bg-[#FD4621] text-white' : 'bg-[#FD4621] text-white'}`}>
                                    {activeContinent === 'North America' ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                </div>
                            </button>
                            {activeContinent === 'North America' && (
                                <div className="px-6 pb-6 pt-2">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {/* Fake Country Cards */}
                                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#FD4621]/30 cursor-pointer transition-colors bg-white">
                                            <div className="h-8 w-8 rounded bg-slate-200 overflow-hidden flex items-center justify-center text-xl">🇺🇸</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">USA</p>
                                                <p className="text-[11px] text-slate-500">24 races</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#FD4621]/30 cursor-pointer transition-colors bg-white">
                                            <div className="h-8 w-8 rounded bg-slate-200 overflow-hidden flex items-center justify-center text-xl">🇨🇦</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">Canada</p>
                                                <p className="text-[11px] text-slate-500">12 races</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#FD4621]/30 cursor-pointer transition-colors bg-white">
                                            <div className="h-8 w-8 rounded bg-slate-200 overflow-hidden flex items-center justify-center text-xl">🇲🇽</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">Mexico</p>
                                                <p className="text-[11px] text-slate-500">8 races</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#FD4621]/30 cursor-pointer transition-colors bg-white">
                                            <div className="h-8 w-8 rounded bg-slate-200 overflow-hidden flex items-center justify-center text-xl">🇬🇱</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">Greenland</p>
                                                <p className="text-[11px] text-slate-500">2 races</p>
                                            </div>
                                        </div>
                                        {/* More... */}
                                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#FD4621]/30 cursor-pointer transition-colors bg-white">
                                            <div className="h-8 w-8 rounded bg-slate-200 overflow-hidden flex items-center justify-center text-xl">🇵🇷</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">Puerto Rico</p>
                                                <p className="text-[11px] text-slate-500">5 races</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#FD4621]/30 cursor-pointer transition-colors bg-white">
                                            <div className="h-8 w-8 rounded bg-slate-200 overflow-hidden flex items-center justify-center text-xl">🇨🇷</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">Costa Rica</p>
                                                <p className="text-[11px] text-slate-500">4 races</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Collapsed Continents */}
                        {['South America', 'Europe', 'Asia', 'Africa', 'Oceania'].map(continent => (
                            <div key={continent} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <button 
                                    onClick={() => setActiveContinent(activeContinent === continent ? '' : continent)}
                                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
                                >
                                    <span className="font-bold text-slate-900">{continent}</span>
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FD4621] text-white">
                                        <Plus className="h-4 w-4" />
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="h-px w-full bg-slate-100 my-16"></div>

                {/* Races by Season */}
                <section className="mb-32">
                    <p className="text-[11px] font-bold tracking-widest text-[#FD4621] uppercase mb-2">CHOOSE BY SEASON</p>
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Races by season</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="group relative h-[250px] w-full rounded-2xl overflow-hidden cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1512591290618-904e04936827?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" alt="Fall" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
                            <div className="absolute top-6 left-6 text-white pr-6">
                                <h3 className="text-3xl font-bold">Fall</h3>
                                <p className="text-sm">3,240 races available</p>
                            </div>
                            <div className="absolute bottom-6 right-6 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors group-hover:bg-[#FD4621]">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="group relative h-[250px] w-full rounded-2xl overflow-hidden cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1517527653896-e2a22be1b8aa?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" alt="Winter" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
                            <div className="absolute top-6 left-6 text-white pr-6">
                                <h3 className="text-3xl font-bold">Winter</h3>
                                <p className="text-sm">842 races available</p>
                            </div>
                            <div className="absolute bottom-6 right-6 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors group-hover:bg-[#FD4621]">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="group relative h-[250px] w-full rounded-2xl overflow-hidden cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1455333167123-3db5a882d28f?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" alt="Spring" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
                            <div className="absolute top-6 left-6 text-white pr-6">
                                <h3 className="text-3xl font-bold">Spring</h3>
                                <p className="text-sm">1,540 races available</p>
                            </div>
                            <div className="absolute bottom-6 right-6 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors group-hover:bg-[#FD4621]">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px w-full bg-slate-100 my-16"></div>

                {/* FAQ Section */}
                <section className="mb-10 flex flex-col lg:flex-row gap-16">
                    <div className="w-full lg:w-1/3">
                        <p className="text-[11px] font-bold tracking-widest text-[#FD4621] uppercase mb-2">FAQS</p>
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-8">Frequently Asked<br/>Questions</h2>
                        
                        <div className="bg-[#fcfafa] p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
                            <div className="h-16 w-16 bg-[#FD4621]/10 rounded-full flex items-center justify-center mb-6">
                                <HelpCircle className="h-8 w-8 text-[#FD4621] stroke-[1.5]" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Have different questions?</h3>
                            <p className="text-sm text-slate-500 mb-6">At Ultra Sprint Calendar we try to reply to all queries within 24hrs.</p>
                            <button className="bg-[#FD4621] hover:bg-[#E13E1D] text-white px-8 py-3 rounded-full font-bold shadow-md shadow-[#FD4621]/20 transition-all">
                                Contact us
                            </button>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-2/3 flex flex-col gap-4 pt-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-slate-100 pb-4">
                                <button 
                                    className="flex w-full items-center justify-between text-left py-2 outline-none group"
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                >
                                    <span className="text-lg font-bold text-slate-900 group-hover:text-[#FD4621] transition-colors">{faq.q}</span>
                                    <ChevronDown className={`h-5 w-5 text-[#FD4621] transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${activeFaq === index ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-slate-500 leading-relaxed pr-8">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Newsletter Section */}
            <div className="relative w-full mt-32 h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 z-0 bg-[#1A1A1A]">
                    <img 
                        src="https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&q=80&w=2000" 
                        alt="Night runner" 
                        className="h-full w-full object-cover opacity-40 mix-blend-overlay grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-3xl">
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">Subscribe Newsletter</h2>
                    <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto font-medium">
                        Stay up to date with new races, early bird discounts, and endurance tips. We drop a newsletter once a week.
                    </p>
                    
                    <div className="relative max-w-md mx-auto flex h-14 w-full bg-white rounded-full p-1.5 focus-within:ring-2 focus-within:ring-[#FD4621] transition-all">
                        <input 
                            type="email" 
                            placeholder="Email address"
                            className="flex-1 rounded-l-full bg-transparent pl-6 pr-4 outline-none text-slate-900 placeholder:text-slate-400"
                        />
                        <button className="bg-[#FD4621] hover:bg-[#E13E1D] text-white px-8 rounded-full font-bold transition-all shadow-md">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black pt-20 pb-10 border-t border-white/10 z-20 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-16 mb-20">
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center gap-2 mb-6">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FD4621] text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[14px] font-bold text-white tracking-tight">Ultra Sprint</span>
                                    <span className="text-[11px] text-slate-400 font-medium">Calender</span>
                                </div>
                            </Link>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                The number one most trusted platform and catalog for finding running and endurance events worldwide.
                            </p>
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FD4621] transition-colors cursor-pointer"><span className="text-xs">fb</span></div>
                                <div className="h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FD4621] transition-colors cursor-pointer"><span className="text-xs">tw</span></div>
                                <div className="h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FD4621] transition-colors cursor-pointer"><span className="text-xs">ig</span></div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Ultraboards</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white transition-colors cursor-pointer text-[#FD4621] font-medium">Post a race</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Login as organizer</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Pricing (Stripe)</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                                <li className="hover:text-white transition-colors cursor-pointer">API docs</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Races by Distance</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white transition-colors cursor-pointer">Half marathon</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Marathon</li>
                                <li className="hover:text-white transition-colors cursor-pointer">50k / 50 mile</li>
                                <li className="hover:text-white transition-colors cursor-pointer">100k / 100 mile</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Stage race</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Races by Country</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white transition-colors cursor-pointer">United States</li>
                                <li className="hover:text-white transition-colors cursor-pointer">United Kingdom</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Australia</li>
                                <li className="hover:text-white transition-colors cursor-pointer">France</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Sweden</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Races by Terrain</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white transition-colors cursor-pointer">Road Races</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Trail Races</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Track Races</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Mud Runs</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Obstacle Course</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-slate-500">
                        <div className="flex gap-6 mb-4 md:mb-0">
                            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                            <span>|</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                        </div>
                        <p>© 2026 Ultra Sprint Calendar. All rights reserved.</p>
                        <div className="hidden flex items-center gap-1">
                            {/* Empty space for alignment */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
