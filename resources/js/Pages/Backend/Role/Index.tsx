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

export default function Index({ roles }: { roles: any }) {
    return (
        <AdminLayout header="Roles">
            <Head title="Roles" />
            <div className="flex justify-end mb-4">
                <Link href={route('admin.roles.create')}>
                    <Button>Create Role</Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Role List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>S.N</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Permissions</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.data.map((role: any, index: number) => (
                                    <TableRow key={role.id}>
                                        <TableCell>{(roles.current_page - 1) * roles.per_page + index + 1}</TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell>
                                            {role.permissions?.map((p: any) => p.name).join(', ')}
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link href={route('admin.roles.edit', role.id)}>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </Link>
                                            {role.name !== 'super-admin' && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm">Delete</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the role.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => router.delete(route('admin.roles.destroy', role.id))}>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {roles.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                                            No roles found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4">
                        <Paginate paginator={roles} />
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
