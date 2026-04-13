import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import LexicalEditor from '@/Components/LexicalEditor/LexicalEditor';
import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

export default function Create({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        image: null as File | null,
        categories: [] as number[],
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
    });

    const [keywordsOptions, setKeywordsOptions] = useState<any[]>([]);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    useEffect(() => {
        setData('slug', generateSlug(data.title));
    }, [data.title]);

    const handleCategoryToggle = (id: number) => {
        const nextCategories = data.categories.includes(id)
            ? data.categories.filter((c) => c !== id)
            : [...data.categories, id];
        setData('categories', nextCategories);
    };

    const handleKeywordsChange = (newValue: any) => {
        const keywords = newValue ? newValue.map((v: any) => v.value).join(',') : '';
        setData('meta_keywords', keywords);
        setKeywordsOptions(newValue || []);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.blogs.store'));
    };

    return (
        <AdminLayout header="Create Blog">
            <Head title="Create Blog" />
            
            <div className="flex justify-start mb-4">
                <Link href={route('admin.blogs.index')}>
                    <Button variant="outline">Back to List</Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter blog title"
                                    />
                                    {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="blog-title-slug"
                                    />
                                    {errors.slug && <p className="text-destructive text-sm">{errors.slug}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <LexicalEditor
                                        value={data.content}
                                        onChange={(val) => setData('content', val)}
                                    />
                                    {errors.content && <p className="text-destructive text-sm">{errors.content}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Meta Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        value={data.meta_title}
                                        onChange={(e) => setData('meta_title', e.target.value)}
                                        placeholder="SEO Title"
                                    />
                                    {errors.meta_title && <p className="text-destructive text-sm">{errors.meta_title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        value={data.meta_description}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                        placeholder="SEO Description"
                                    />
                                    {errors.meta_description && <p className="text-destructive text-sm">{errors.meta_description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Meta Keywords</Label>
                                    <CreatableSelect
                                        isMulti
                                        onChange={handleKeywordsChange}
                                        options={[]} // No predefined options, just allow creating new ones
                                        value={keywordsOptions}
                                        placeholder="Type and press enter to add tags..."
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                    />
                                    {errors.meta_keywords && <p className="text-destructive text-sm">{errors.meta_keywords}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Featured Image</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                        accept="image/*"
                                    />
                                    {errors.image && <p className="text-destructive text-sm">{errors.image}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <div key={category.id} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`cat-${category.id}`} 
                                                checked={data.categories.includes(category.id)}
                                                onCheckedChange={() => handleCategoryToggle(category.id)}
                                            />
                                            <Label htmlFor={`cat-${category.id}`} className="cursor-pointer">{category.name}</Label>
                                        </div>
                                    ))}
                                    {categories.length === 0 && <p className="text-sm text-muted-foreground">No categories available.</p>}
                                    {errors.categories && <p className="text-destructive text-sm">{errors.categories}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <Button type="submit" className="w-full" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Blog Post'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
