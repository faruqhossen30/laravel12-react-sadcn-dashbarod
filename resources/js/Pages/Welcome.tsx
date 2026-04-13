import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { PageProps } from '@/types';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Calendar, 
    ChevronRight, 
    MapPin, 
    Search, 
    Zap,
    Compass,
    Mountain,
    Waves,
    Palmtree,
    Camera
} from 'lucide-react';
import { useState } from 'react';

export default function Welcome() {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { name: 'Hiking', icon: Mountain, count: 124, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800' },
        { name: 'Beach', icon: Palmtree, count: 86, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
        { name: 'Adventure', icon: Zap, count: 53, image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=800' },
        { name: 'City Breaks', icon: Compass, count: 95, image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=800' },
        { name: 'Photography', icon: Camera, count: 42, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800' },
        { name: 'Surfing', icon: Waves, count: 31, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800' },
    ];

    const featuredTrips = [
        {
            id: 1,
            title: 'Majestic Peaks Expedition',
            location: 'Swiss Alps',
            duration: '7 Days',
            price: '$1,299',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
            type: 'Hiking'
        },
        {
            id: 2,
            title: 'Island Paradise Getaway',
            location: 'Maldives',
            duration: '5 Days',
            price: '$2,450',
            image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
            type: 'Beach'
        },
        {
            id: 3,
            title: 'Kyoto Cultural Journey',
            location: 'Japan',
            duration: '10 Days',
            price: '$3,100',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
            type: 'City'
        }
    ];

    return (
        <FrontendLayout>
            <Head title="Your Next Adventure Starts Here" />

            {/* Hero Section */}
            <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
                        className="h-full w-full object-cover brightness-[0.6] grayscale-[0.2]"
                        alt="Hero background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-50"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Your next <span className="text-emerald-400">adventure</span> starts here
                    </h1>
                    <p className="mt-6 text-lg text-slate-100 sm:text-xl md:mx-auto md:max-w-2xl">
                        Explore thousand of curated trips, mountain expeditions, and tropical getaways tailored for your wanderlust.
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <Input 
                                type="text"
                                placeholder="Search by destination or activity..."
                                className="h-14 w-full rounded-full border-none bg-white/95 pl-12 pr-4 text-lg shadow-xl outline-none focus:ring-2 focus:ring-emerald-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="h-14 rounded-full bg-emerald-500 px-8 text-lg font-bold text-white shadow-xl hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95 leading-none">
                            Find a Trip
                        </Button>
                    </div>
                </div>
            </section>

            {/* Activities Section */}
            <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Trips by activity</h2>
                        <p className="mt-2 text-slate-500">Pick your passion and explorer our favorite destinations.</p>
                    </div>
                    <Button variant="outline" className="hidden border-slate-200 hover:bg-white sm:flex rounded-full">Explore all <ChevronRight className="ml-1 h-4 w-4" /></Button>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                    {categories.map((cat) => (
                        <Link key={cat.name} href="#" className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                            <img src={cat.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt={cat.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 backdrop-blur-md text-emerald-400">
                                    <cat.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                                <p className="text-xs text-slate-300 font-medium">{cat.count} Trips</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Popular Trips Grid */}
            <section className="bg-white py-24 shadow-sm border-y border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-slate-900">Featured Expeditions</h2>
                        <p className="mt-2 text-slate-500">Hand-picked adventures for the modern traveler.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredTrips.map((trip) => (
                            <Card key={trip.id} className="group overflow-hidden border-none shadow-none ring-1 ring-slate-100 hover:ring-emerald-200 transition-all">
                                <Link href="#" className="block aspect-[16/10] overflow-hidden">
                                    <img src={trip.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt={trip.title} />
                                </Link>
                                <CardContent className="p-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">{trip.type}</span>
                                        <span className="text-lg font-black text-emerald-600">{trip.price}</span>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-emerald-600">{trip.title}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-emerald-500" /> {trip.location}</div>
                                        <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-emerald-500" /> {trip.duration}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 sm:px-16 sm:py-24">
                    <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-emerald-600/20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl"></div>
                    
                    <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
                        <div className="max-w-xl text-center lg:text-left">
                            <h2 className="text-3xl font-black text-white sm:text-5xl">A world of travel in your inbox.</h2>
                            <p className="mt-4 text-lg text-slate-400">Get weekly destination inspiration and exclusive deals delivered straight to your email.</p>
                        </div>
                        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                            <Input placeholder="Enter your email" className="h-14 rounded-full border-none bg-white/10 px-6 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500" />
                            <Button className="h-14 rounded-full bg-emerald-500 px-8 font-bold text-white transition-all hover:bg-emerald-600">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
