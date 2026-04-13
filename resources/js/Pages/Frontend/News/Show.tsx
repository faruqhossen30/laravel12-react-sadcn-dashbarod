import FrontendLayout from '@/Layouts/FrontendLayout';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';
import { 
    Calendar, 
    Share2, 
    Bookmark, 
    ArrowLeft, 
    MessageSquare,
    Facebook,
    Twitter,
    Link as LinkIcon,
    ChevronRight,
    Search
} from 'lucide-react';
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
    blog: Blog;
    relatedPosts: Blog[];
}

export default function Show({ blog, relatedPosts }: Props) {
    return (
        <FrontendLayout title={`${blog.title} - Ultra Trip`}>
            {/* Post Header / Hero */}
            <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] overflow-hidden">
                <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 md:px-6 pb-20">
                        <div className="max-w-4xl space-y-6">
                            <div className="flex items-center gap-4">
                                <Link 
                                    href={route('news.index')}
                                    className="bg-white/10 backdrop-blur-md hover:bg-emerald-600 hover:text-white transition-all p-3 rounded-full text-white"
                                >
                                    <ArrowLeft size={20} />
                                </Link>
                                <Badge className="bg-emerald-600 text-white font-bold uppercase tracking-widest px-4 py-1">
                                    TRAIL RUNNING
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black font-outfit text-white tracking-tighter leading-tight uppercase italic drop-shadow-2xl">
                                {blog.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/80 font-bold uppercase tracking-widest text-xs md:text-sm">
                                <span className="flex items-center gap-2">
                                    <Calendar size={18} className="text-emerald-500" />
                                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: '2-digit',
                                        year: 'numeric',
                                    })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    8 MIN READ
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    BY ULTRA TEAM
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left Sidebar (Share & Info) */}
                    <div className="lg:col-span-1 hidden lg:block sticky top-32 h-fit space-y-8">
                        <div className="flex flex-col gap-4">
                            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"><Share2 size={20} /></button>
                            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"><Bookmark size={20} /></button>
                            <Separator className="my-4" />
                            <Link href="#" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"><LinkIcon size={20} /></Link>
                        </div>
                    </div>

                    {/* Main Article Content */}
                    <div className="lg:col-span-7 space-y-12">
                        <div 
                            className="prose prose-xl prose-zinc max-w-none 
                                selection:bg-emerald-100 selection:text-emerald-900
                                first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-emerald-600
                                prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-light
                                prose-strong:text-slate-900 prose-strong:font-bold
                                prose-blockquote:border-l-8 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:p-8 prose-blockquote:italic prose-blockquote:rounded-r-2xl"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Article Footer */}
                        <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">TAGS:</span>
                                <div className="flex gap-2">
                                    {['Training', 'Endurance', 'Mindset'].map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-slate-100 hover:bg-emerald-600 hover:text-white transition-colors">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button className="rounded-full bg-emerald-600 text-white font-bold uppercase tracking-widest px-8">Next Story <ChevronRight size={16} className="ml-1" /></Button>
                            </div>
                        </div>

                        {/* Newsletter Mini */}
                        <div className="bg-slate-900 p-10 rounded-3xl text-white relative overflow-hidden group">
                           <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-600/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                           <div className="relative z-10 space-y-6">
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase">Never miss a pulse</h3>
                                <p className="text-slate-400 font-light max-w-sm">Join 15,000+ ultra runners receiving weekly tips, race reports, and exclusive member discounts.</p>
                                <div className="flex gap-2">
                                    <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-lg px-6 flex-grow outline-none focus:border-emerald-500" />
                                    <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-8 uppercase">Join now</Button>
                                </div>
                           </div>
                        </div>
                    </div>

                    {/* Right Sidebar (Related Posts & Search) */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Search Box */}
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <h4 className="text-sm font-black uppercase tracking-widest mb-4">Search News</h4>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" placeholder="Type keywords..." className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-black transition-colors" />
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-widest border-b-4 border-emerald-500 w-fit pb-1">You Might Like</h4>
                            <div className="space-y-8">
                                {relatedPosts.map(post => (
                                    <Link key={post.id} href={route('news.show', post.slug)} className="group flex items-start gap-4">
                                        <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">TRENDING</span>
                                            <h5 className="font-bold text-sm leading-tight group-hover:text-emerald-600 transition-colors">{post.title}</h5>
                                            <span className="text-gray-400 text-[10px]">
                                                {new Date(post.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: '2-digit',
                                                })} • 5 min read
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Advertisement / Promo */}
                        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-zinc-900 group">
                            <img src="https://picsum.photos/seed/race_promo/800/1000" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <h4 className="text-2xl font-black uppercase italic leading-none mb-4 tracking-tighter">ULTRA TRIP <br /><span className="text-emerald-500">Official Gear</span></h4>
                                <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold w-full rounded-none tracking-widest uppercase">Shop Now</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
