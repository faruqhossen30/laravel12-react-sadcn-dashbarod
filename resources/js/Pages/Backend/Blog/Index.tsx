import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Paginate } from '@/Components/Paginate';

export default function Index({ blogs }: { blogs: any }) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.blogs.destroy', id));
    };

    return (
        <AdminLayout header="Blogs">
            <Head title="Blogs" />
            
            <div className="flex justify-end mb-4">
                <Link href={route('admin.blogs.create')}>
                    <Button>Create Blog</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Blog List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>S.N</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Categories</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.data.map((blog: any, index: number) => (
                                    <TableRow key={blog.id}>
                                        <TableCell>{(blogs.current_page - 1) * blogs.per_page + index + 1}</TableCell>
                                        <TableCell>
                                            {blog.image ? (
                                                <img 
                                                    src={`/storage/${blog.image}`} 
                                                    alt={blog.title} 
                                                    className="h-10 w-10 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 bg-muted rounded flex items-center justify-center text-[10px]">No Img</div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{blog.title}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {blog.categories.map((cat: any) => (
                                                    <span key={cat.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                                                        {cat.name}
                                                    </span>
                                                ))}
                                                {blog.categories.length === 0 && <span className="text-muted-foreground text-xs">Uncategorized</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link href={route('admin.blogs.edit', blog.id)}>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                            
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">Delete</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the blog post.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(blog.id)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {blogs.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No blogs found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4">
                        <Paginate paginator={blogs} />
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
