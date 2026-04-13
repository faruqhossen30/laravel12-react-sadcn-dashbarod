<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display a listing of the blogs.
     */
    public function index(): Response
    {
        $blogs = Blog::with('categories')->latest()->paginate(9);

        return Inertia::render('Frontend/News/Index', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Display the specified blog.
     */
    public function show(string $slug): Response
    {
        $blog = Blog::with('categories')
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedPosts = Blog::where('id', '!=', $blog->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Frontend/News/Show', [
            'blog' => $blog,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
