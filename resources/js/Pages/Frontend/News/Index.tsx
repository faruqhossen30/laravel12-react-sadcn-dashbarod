import FrontendLayout from '@/Layouts/FrontendLayout';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
// Removed date-fns import and replaced with native Intl.DateTimeFormat below

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string;
    created_at: string;
    categories?: { name: string }[];
}

interface Props {
    blogs: {
        data: Blog[];
        links: any;
        current_page: number;
        last_page: number;
    };
}

export default function Index({ blogs }: Props) {
    const featuredBlog = blogs.data[0];
    const otherBlogs = blogs.data.slice(1);

    return (
        <FrontendLayout title="Latest News - Ultra Trip">
            <div className="container mx-auto px-4 md:px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-4">
                        <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-4 py-1 rounded-full flex items-center gap-2 w-fit">
                            <TrendingUp size={14} /> NEWS & STORIES
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-slate-900">
                            Fresh from <br />
                            <span className="text-emerald-600">
                                The Trails
                            </span>
                        </h1>
                    </div>
                    <div className="text-slate-500 max-w-sm text-lg font-light italic text-right hidden md:block border-r-4 border-emerald-500 pr-6">
                        "If you want to run, run a mile. If you want to experience a different life, run a marathon."
                    </div>
                </div>

                {/* Featured Post */}
                {featuredBlog && (
                    <div className="group relative overflow-hidden rounded-3xl mb-16 bg-black border border-white/10 shadow-2xl">
                        <Link href={route('news.show', featuredBlog.slug)} className="block">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative h-[300px] lg:h-[600px] overflow-hidden">
                                    <img 
                                        src={featuredBlog.image} 
                                        alt={featuredBlog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                                    <div className="absolute top-6 left-6">
                                        <Badge className="bg-emerald-600 text-white text-sm px-4 py-1 font-bold">FEATURED STORY</Badge>
                                    </div>
                                </div>
                                <div className="p-8 lg:p-16 flex flex-col justify-center space-y-8 bg-zinc-950">
                                    <div className="flex items-center gap-6 text-gray-400 text-sm font-bold tracking-widest uppercase">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={16} className="text-[#C5FF00]" />
                                            {new Date(featuredBlog.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </span>
                                        <span className="flex items-center gap-2 text-emerald-500">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            LATEST UPDATE
                                        </span>
                                    </div>
                                    <h2 className="text-4xl lg:text-6xl font-black font-outfit text-white tracking-tighter leading-tight group-hover:text-[#C5FF00] transition-colors">
                                        {featuredBlog.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg line-clamp-3 font-light leading-relaxed">
                                        {featuredBlog.content.replace(/<[^>]*>?/gm, '').substring(0, 300)}...
                                    </p>
                                    <div className="pt-4">
                                        <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold h-14 px-8 rounded-full tracking-widest uppercase group/btn">
                                            READ FULL ARTICLE 
                                            <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {otherBlogs.map((blog) => (
                        <Card key={blog.id} className="border-none shadow-none bg-transparent group flex flex-col h-full">
                            <Link href={route('news.show', blog.slug)} className="flex flex-col h-full">
                                <CardHeader className="p-0 mb-6 overflow-hidden rounded-2xl">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Badge className="bg-black text-[#C5FF00] font-bold">TECH & GEAR</Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4 flex-grow">
                                    <div className="flex items-center gap-4 text-gray-400 text-xs font-bold tracking-widest uppercase">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} />
                                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: '2-digit',
                                            })}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            5 MIN READ
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black font-outfit tracking-tight group-hover:text-[#C5FF00] transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed font-light italic">
                                        "{blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}..."
                                    </p>
                                </CardContent>
                                <CardFooter className="p-0 pt-6 mt-auto">
                                    <span className="flex items-center gap-2 text-sm font-black uppercase tracking-widest group-hover:text-emerald-600 group-hover:translate-x-2 transition-all duration-300">
                                        CONTINUE READING <ArrowRight size={16} className="text-emerald-500" />
                                    </span>
                                </CardFooter>
                            </Link>
                        </Card>
                    ))}
                </div>

                {/* Pagination Placeholder */}
                {blogs.last_page > 1 && (
                    <div className="mt-20 flex justify-center border-t border-gray-100 pt-10">
                        <div className="flex gap-2">
                            {Array.from({ length: blogs.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`w-12 h-12 flex items-center justify-center font-bold transition-all ${
                                        page === blogs.current_page 
                                        ? 'bg-black text-[#C5FF00] scale-110 shadow-lg' 
                                        : 'hover:bg-zinc-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </FrontendLayout>
    );
}
