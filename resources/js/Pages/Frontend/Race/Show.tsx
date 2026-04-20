import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Calendar, 
    MapPin, 
    Mountain, 
    Navigation, 
    Award,
    Clock,
    User,
    ArrowLeft,
    Share2,
    Heart,
    Zap,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { Separator } from '@/Components/ui/separator';

interface Race {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date?: string;
    country: { name: string };
    terrain: string;
    format: string;
    course_type: string;
    image_path?: string;
    distances: any[];
    qualifiers: any[];
    user: { name: string };
}

export default function Show({ race }: { race: Race }) {
    const formattedStartDate = new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    }).format(new Date(race.start_date));
    
    return (
        <FrontendLayout title={race.title}>
            <Head title={`${race.title} - Ultra Race Calendar`} />
            
            {/* Hero Detail Section */}
            <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-slate-900">
                <img 
                    src={race.image_path || '/placeholder-race-large.jpg'} 
                    alt={race.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full pb-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Link 
                            href={route('races.index')} 
                            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 font-bold text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Calendar
                        </Link>
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none py-1 px-3">
                                        {race.terrain.toUpperCase()}
                                    </Badge>
                                    <Badge variant="outline" className="border-white/30 text-white backdrop-blur-sm py-1 px-3">
                                        {race.format.toUpperCase()}
                                    </Badge>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter max-w-4xl leading-tight">
                                    {race.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-slate-200 text-lg font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-emerald-400" />
                                        <span>{formattedStartDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-emerald-400" />
                                        <span>{race.country.name}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 font-bold shadow-lg shadow-emerald-600/20">
                                    Official Website
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="outline" className="rounded-full border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Navigation className="h-6 w-6 text-emerald-600" />
                                    Race Description
                                </h2>
                                <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed">
                                    {race.description}
                                </div>
                            </div>

                            <Separator />

                            {/* Distances Detail */}
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <Award className="h-6 w-6 text-emerald-600" />
                                    Available Courses
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {race.distances.map((dist) => (
                                        <Card key={dist.id} className="border-none bg-slate-50 overflow-hidden group hover:bg-white hover:shadow-xl hover:shadow-emerald-100/30 transition-all duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                                                        <Zap className="h-6 w-6 fill-current" />
                                                    </div>
                                                    <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-300 border-none font-bold">
                                                        {dist.difficulty.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-900 mb-2">
                                                    {dist.distance_value}{dist.distance_unit}
                                                </h3>
                                                <div className="space-y-3 mt-6">
                                                    <div className="flex items-center justify-between text-sm font-bold">
                                                        <span className="text-slate-500 uppercase flex items-center gap-2">
                                                            <Mountain className="h-4 w-4 text-emerald-600" /> Elevation
                                                        </span>
                                                        <span className="text-slate-900">{dist.elevation_gain || 0}m+</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm font-bold">
                                                        <span className="text-slate-500 uppercase flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-emerald-600" /> Time Limit
                                                        </span>
                                                        <span className="text-slate-900">{dist.duration_hhmm || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <Button className="w-full mt-8 bg-white border border-slate-200 text-slate-900 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white font-bold rounded-xl transition-all">
                                                    Sign Up Now
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8">
                            <Card className="border-none bg-emerald-600 text-white overflow-hidden shadow-2xl shadow-emerald-200">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-black mb-6">Race Details</h3>
                                    <ul className="space-y-6">
                                        <li className="flex flex-col gap-1">
                                            <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Course Type</span>
                                            <span className="text-lg font-bold">{race.course_type.replace(/_/g, ' ')}</span>
                                        </li>
                                        <li className="flex flex-col gap-1">
                                            <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Organizer</span>
                                            <span className="text-lg font-bold flex items-center gap-2">
                                                <User className="h-5 w-5 opacity-50" />
                                                {race.user.name}
                                            </span>
                                        </li>
                                        {race.qualifiers.length > 0 && (
                                            <li className="flex flex-col gap-1">
                                                <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Qualifiers</span>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {race.qualifiers.map(q => (
                                                        <Badge key={q.id} className="bg-white/20 backdrop-blur-md text-white border-none">
                                                            {q.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                    <Button className="w-full mt-10 bg-white text-emerald-600 hover:bg-white/90 font-black py-6 rounded-2xl shadow-xl">
                                        REGISTER INTEREST
                                    </Button>
                                </CardContent>
                            </Card>

                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <Share2 className="h-5 w-5 text-emerald-600" />
                                    Share this race
                                </h4>
                                <div className="flex gap-4">
                                    {['twitter', 'facebook', 'instagram'].map(platform => (
                                        <Button key={platform} variant="outline" className="flex-1 rounded-xl h-12 bg-white border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-600">
                                            {platform.charAt(0).toUpperCase()}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
