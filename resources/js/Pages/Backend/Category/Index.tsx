import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Paginate } from '@/Components/Paginate';
import { useState, useEffect } from 'react';

export default function Index({ categories }: { categories: any }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    // Create Form
    const createForm = useForm({
        name: '',
        slug: '',
    });

    // Edit Form
    const editForm = useForm({
        name: '',
        slug: '',
    });

    // Slug generation logic
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    // Auto-slug for Create
    useEffect(() => {
        createForm.setData('slug', generateSlug(createForm.data.name));
    }, [createForm.data.name]);

    // Auto-slug for Edit
    useEffect(() => {
        if (selectedCategory) {
            editForm.setData('slug', generateSlug(editForm.data.name));
        }
    }, [editForm.data.name]);

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(route('admin.categories.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const handleEditClick = (category: any) => {
        setSelectedCategory(category);
        editForm.setData({
            name: category.name,
            slug: category.slug,
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        editForm.patch(route('admin.categories.update', selectedCategory.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
                setSelectedCategory(null);
            },
        });
    };

    const handleDelete = (id: number) => {
        router.delete(route('admin.categories.destroy', id));
    };

    return (
        <AdminLayout header="Categories">
            <Head title="Categories" />
            
            <div className="flex justify-end mb-4">
                <Button onClick={() => setIsCreateModalOpen(true)}>Create Category</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Category List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>S.N</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data.map((category: any, index: number) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{(categories.current_page - 1) * categories.per_page + index + 1}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleEditClick(category)}
                                            >
                                                Edit
                                            </Button>
                                            
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">Delete</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the category.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(category.id)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {categories.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                                            No categories found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4">
                        <Paginate paginator={categories} />
                    </div>
                </CardContent>
            </Card>

            {/* Create Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Category</DialogTitle>
                        <DialogDescription>
                            Add a new category with a unique name and slug.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="create-name">Name</Label>
                            <Input
                                id="create-name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="e.g. Technology"
                            />
                            {createForm.errors.name && <p className="text-destructive text-sm">{createForm.errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="create-slug">Slug</Label>
                            <Input
                                id="create-slug"
                                value={createForm.data.slug}
                                onChange={(e) => createForm.setData('slug', e.target.value)}
                                placeholder="technology"
                            />
                            {createForm.errors.slug && <p className="text-destructive text-sm">{createForm.errors.slug}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={createForm.processing}>
                                {createForm.processing ? 'Creating...' : 'Create Category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Update the category details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                placeholder="e.g. Technology"
                            />
                            {editForm.errors.name && <p className="text-destructive text-sm">{editForm.errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-slug">Slug</Label>
                            <Input
                                id="edit-slug"
                                value={editForm.data.slug}
                                onChange={(e) => editForm.setData('slug', e.target.value)}
                                placeholder="technology"
                            />
                            {editForm.errors.slug && <p className="text-destructive text-sm">{editForm.errors.slug}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing ? 'Updating...' : 'Update Category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
