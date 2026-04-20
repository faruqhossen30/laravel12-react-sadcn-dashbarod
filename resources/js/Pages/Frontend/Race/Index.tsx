import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import RaceCard from './Partials/RaceCard';
import FilterSidebar from './Partials/FilterSidebar';
import { Button } from '@/Components/ui/button';
import { 
    ChevronLeft, 
    ChevronRight, 
    Calendar,
    SearchX,
    SlidersHorizontal
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";

interface Props {
    races: {
        data: any[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: any;
    options: any;
}

export default function Index({ races, filters, options }: Props) {
    return (
        <FrontendLayout title="Races">
            <Head title="Browse Premium Ultra Races" />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533310266094-8898a03807dd?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900 to-slate-50" />
                
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight"><span className="text-emerald-500">Races</span></h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Explore the world's most epic ultra-marathons, trail races, and multi-stage adventures.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Desktop Sidebar (hidden on mobile) */}
                    <div className="hidden lg:block w-72 flex-shrink-0 animate-in fade-in slide-in-from-left duration-700">
                        <div className="sticky top-24">
                            <FilterSidebar filters={filters} options={options} />
                        </div>
                    </div>

                    {/* Race List */}
                    <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
                        {/* Summary Header & Mobile Filter Trigger */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                            <div className="flex items-center justify-between w-full sm:w-auto">
                                <p className="text-sm font-bold text-slate-500">
                                    Showing <span className="text-slate-900">{races.total}</span> races
                                </p>
                                
                                {/* Mobile Filter Trigger */}
                                <div className="lg:hidden">
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" size="sm" className="bg-white border-slate-200 rounded-xl gap-2 font-bold shadow-sm">
                                                <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                                                Filters
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left" className="w-[300px] overflow-y-auto pt-10">
                                            <SheetHeader className="mb-6">
                                                <SheetTitle className="text-2xl font-black text-slate-900">RACE FILTERS</SheetTitle>
                                            </SheetHeader>
                                            <FilterSidebar filters={filters} options={options} />
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 text-xs font-bold text-slate-400">
                                <span>SORT BY:</span>
                                <button className="text-slate-900 hover:text-emerald-600 transition-colors">DATE</button>
                                <span className="px-1 text-slate-300">|</span>
                                <button className="hover:text-emerald-600 transition-colors">DISTANCE</button>
                            </div>
                        </div>

                        {/* Races Grid/List */}
                        {races.data.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                {races.data.map((race) => (
                                    <RaceCard key={race.id} race={race} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
                                <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                    <SearchX className="h-10 w-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No races found</h3>
                                <p className="text-slate-500 max-w-xs mx-auto">
                                    Try adjusting your filters or search keywords to find what you're looking for.
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {races.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-12 pb-20">
                                <Link 
                                    href={races.links[0].url || '#'} 
                                    className={`p-2 rounded-xl transition-all ${!races.links[0].url ? 'text-slate-300 cursor-not-allowed' : 'text-slate-900 hover:bg-white hover:shadow-md'}`}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Link>
                                
                                {races.links.slice(1, -1).map((link, i) => (
                                    <Link 
                                        key={i}
                                        href={link.url || '#'}
                                        className={`min-w-[44px] h-11 flex items-center justify-center rounded-xl text-sm font-black transition-all ${
                                            link.active 
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                                            : link.url 
                                                ? 'hover:bg-white hover:shadow-md text-slate-600' 
                                                : 'text-slate-300 pointer-events-none'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}

                                <Link 
                                    href={races.links[races.links.length - 1].url || '#'} 
                                    className={`p-2 rounded-xl transition-all ${!races.links[races.links.length - 1].url ? 'text-slate-300 cursor-not-allowed' : 'text-slate-900 hover:bg-white hover:shadow-md'}`}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
