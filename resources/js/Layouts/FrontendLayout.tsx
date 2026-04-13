import { Link, Head, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';
import { 
    Menu, 
    X, 
    Search, 
    Facebook, 
    Twitter, 
    Instagram, 
    Zap,
    ChevronRight,
    Search as SearchIcon
} from 'lucide-react';
import { 
    Sheet, 
    SheetContent, 
    SheetTrigger,
    SheetHeader,
    SheetTitle
} from '@/Components/ui/sheet';
import { PageProps } from '@/types';

export default function FrontendLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    const [isScrolled, setIsScrolled] = useState(false);
    const { auth } = usePage<PageProps>().props;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Find a Trip', href: '#' },
        { name: 'Destinations', href: '#' },
        { name: 'Organizers', href: '#' },
        { name: 'News', href: route('news.index') },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
            <Head title={title ? `${title} - Ultra Trip` : 'Ultra Trip - Your Next Adventure Starts Here'} />
            
            {/* Header / Navigation */}
            <nav className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
                isScrolled 
                ? 'bg-white/80 backdrop-blur-md border-slate-200 py-3 shadow-sm' 
                : 'bg-transparent border-transparent py-5'
            }`}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200 transition-transform group-hover:scale-105">
                            <Zap className="h-6 w-6 fill-current" />
                        </div>
                        <span className={`text-xl font-black tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                            ULTRA<span className="text-emerald-600">TRIP</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden gap-8 md:flex">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className={`text-sm font-semibold transition-colors hover:text-emerald-500 ${isScrolled ? 'text-slate-600' : 'text-slate-100'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button variant="ghost" size="sm" className={isScrolled ? 'text-slate-600' : 'text-white hover:bg-white/10'}>Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        <Button variant="ghost" size="sm" className={isScrolled ? 'text-slate-600' : 'text-white hover:bg-white/10'}>Log in</Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md rounded-full px-6" size="sm">Post a Trip</Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Trigger */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className={`md:hidden ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] bg-white p-0">
                                <SheetHeader className="border-b p-6 text-left">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                                            <Zap className="h-6 w-6 fill-current" />
                                        </div>
                                        <span className="text-xl font-black tracking-tight text-slate-900">ULTRA<span className="text-emerald-600">TRIP</span></span>
                                    </div>
                                </SheetHeader>
                                <div className="flex flex-col gap-2 p-6">
                                    {navLinks.map((link) => (
                                        <Link 
                                            key={link.name} 
                                            href={link.href} 
                                            className="flex items-center justify-between rounded-lg p-3 text-lg font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                                        >
                                            {link.name}
                                            <ChevronRight className="h-5 w-5 text-slate-300" />
                                        </Link>
                                    ))}
                                    <Separator className="my-4" />
                                    {auth.user ? (
                                        <Link href={route('dashboard')}>
                                            <Button className="w-full bg-emerald-600 text-white py-6 text-lg font-bold">Go to Dashboard</Button>
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <Link href={route('login')} className="w-full">
                                                <Button variant="outline" className="w-full py-6 text-lg font-bold">Log in</Button>
                                            </Link>
                                            <Link href={route('register')} className="w-full">
                                                <Button className="w-full bg-emerald-600 text-white py-6 text-lg font-bold">Post a Trip</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 pt-24 pb-12 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="mb-6 flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                                    <Zap className="h-6 w-6 fill-current" />
                                </div>
                                <span className="text-xl font-black tracking-tight text-white uppercase">ULTRA<span className="text-emerald-600 text-xl font-bold">TRIP</span></span>
                            </div>
                            <p className="mb-8 max-w-xs text-slate-400 leading-relaxed">The world's first curated adventure travel classifieds for modern explorers.</p>
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon" className="group rounded-full border-slate-800 bg-transparent hover:bg-emerald-600 transition-all">
                                    <Facebook className="h-4 w-4 text-slate-400 group-hover:text-white" />
                                </Button>
                                <Button variant="outline" size="icon" className="group rounded-full border-slate-800 bg-transparent hover:bg-emerald-600 transition-all">
                                    <Instagram className="h-4 w-4 text-slate-400 group-hover:text-white" />
                                </Button>
                                <Button variant="outline" size="icon" className="group rounded-full border-slate-800 bg-transparent hover:bg-emerald-600 transition-all">
                                    <Twitter className="h-4 w-4 text-slate-400 group-hover:text-white" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-6 font-bold text-white">Explore</h3>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Popular Trips</Link></li>
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Destinations</Link></li>
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Organizers</Link></li>
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Reviews</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 font-bold text-white">Support</h3>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">FAQs</Link></li>
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 font-bold text-white">List Your trip</h3>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Create Account</Link></li>
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Guide Center</Link></li>
                                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Host Guidelines</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-20 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
                        <p>© 2026 Ultra Trip Calendar. All rights reserved. Designed for the adventurous.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
