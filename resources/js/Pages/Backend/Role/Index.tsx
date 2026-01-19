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
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">Permissions</th>
                                    <th className="px-4 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.data.map((role: any) => (
                                    <tr key={role.id} className="border-t">
                                        <td className="px-4 py-3">{role.name}</td>
                                        <td className="px-4 py-3">
                                            {role.permissions?.map((p: any) => p.name).join(', ')}
                                        </td>
                                        <td className="px-4 py-3 flex gap-2">
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
                                        </td>
                                    </tr>
                                ))}
                                {roles.data.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-center text-muted-foreground">
                                            No roles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
