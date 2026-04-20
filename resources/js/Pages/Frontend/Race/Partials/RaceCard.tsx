import { Link } from '@inertiajs/react';
import { Calendar, MapPin, Clock, Mountain, ChevronRight, Zap } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';

interface RaceDistance {
    id: number;
    distance_value: number;
    distance_unit: string;
    elevation_gain?: number;
}

interface Race {
    id: number;
    title: string;
    slug: string;
    description: string;
    start_date: string;
    end_date?: string;
    country: {
        name: string;
    };
    image_path?: string;
    distances: RaceDistance[];
}

export default function RaceCard({ race }: { race: Race }) {
    const formattedDate = new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    }).format(new Date(race.start_date));
    
    return (
        <Card className="overflow-hidden border-none bg-white transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/50 group">
            <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="relative w-full md:w-80 h-52 md:h-auto overflow-hidden">
                    <img 
                        src={race.image_path || '/placeholder-race.jpg'} 
                        alt={race.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Featured/New Badge if needed */}
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-emerald-600/90 backdrop-blur-md text-white border-none">
                            Upcoming
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <CardContent className="flex flex-1 flex-col p-6">
                    <div className="flex flex-col h-full">
                        {/* Date & Location Row */}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-emerald-600" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4 text-emerald-600" />
                                <span>{race.country.name}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <Link 
                            href={route('races.show', race.slug)}
                            className="text-xl font-bold text-slate-900 hover:text-emerald-600 transition-colors mb-3 leading-tight"
                        >
                            {race.title}
                        </Link>

                        {/* Description */}
                        <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                            {race.description}
                        </p>

                        {/* Badges & Action */}
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex flex-wrap gap-2">
                                {race.distances.map((dist) => (
                                    <Badge 
                                        key={dist.id}
                                        variant="outline" 
                                        className="bg-slate-50 border-slate-200 text-slate-600 font-bold px-2.5 py-0.5 rounded-md hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors"
                                    >
                                        {dist.distance_value}{dist.distance_unit}
                                    </Badge>
                                ))}
                            </div>
                            
                            <Link href={route('races.show', race.slug)}>
                                <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-2 font-semibold">
                                    Details
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

// Internal Button component since we haven't imported it from UI if it's small, 
// but it's better to import it. Let me add the import.
import { Button } from '@/Components/ui/button';
