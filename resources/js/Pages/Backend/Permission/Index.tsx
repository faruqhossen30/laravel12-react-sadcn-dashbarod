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

export default function Index({ permissions }: { permissions: any }) {
    return (
        <AdminLayout header="Permissions">
            <Head title="Permissions" />
            <div className="flex justify-end mb-4">
                {/* Create Permission button disabled */}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Permission List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>S.N</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permissions.data.map((permission: any, index: number) => (
                                    <TableRow key={permission.id}>
                                        <TableCell>{(permissions.current_page - 1) * permissions.per_page + index + 1}</TableCell>
                                        <TableCell>{permission.name}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link href={route('admin.permissions.edit', permission.id)}>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">Delete</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the permission.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => router.delete(route('admin.permissions.destroy', permission.id))}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {permissions.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                            No permissions found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4">
                        <Paginate paginator={permissions} />
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
