import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { useMemo } from 'react';

export default function Create({ permissions }: { permissions: Record<string, any[]> }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as string[],
    });

    const allPermissionNames = useMemo(() => {
        return Object.values(permissions).flat().map((p: any) => p.name);
    }, [permissions]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.roles.store'));
    };

    const handlePermissionChange = (permissionName: string, checked: boolean) => {
        if (checked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData('permissions', data.permissions.filter((p) => p !== permissionName));
        }
    };

    const handleGroupChange = (groupPermissions: any[], checked: boolean) => {
        const groupPermissionNames = groupPermissions.map(p => p.name);
        let newPermissions = [...data.permissions];

        if (checked) {
            groupPermissionNames.forEach(name => {
                if (!newPermissions.includes(name)) {
                    newPermissions.push(name);
                }
            });
        } else {
            newPermissions = newPermissions.filter(name => !groupPermissionNames.includes(name));
        }
        setData('permissions', newPermissions);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setData('permissions', allPermissionNames);
        } else {
            setData('permissions', []);
        }
    };

    return (
        <AdminLayout header="Create Role">
            <Head title="Create Role" />
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Create New Role</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Role Name"
                            />
                            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Permissions</Label>
                            <div className="flex items-center space-x-2 mb-4 p-4 border rounded-md bg-muted/20">
                                <Checkbox
                                    id="select-all"
                                    checked={data.permissions.length === allPermissionNames.length && allPermissionNames.length > 0}
                                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                                />
                                <Label htmlFor="select-all" className="text-lg font-bold cursor-pointer">Select All Permissions</Label>
                            </div>
                            <div className="space-y-4">
                                {Object.entries(permissions).map(([group, groupPermissions]) => (
                                    <div key={group} className="border p-4 rounded-md">
                                        <div className="flex items-center space-x-2 mb-3 pb-2 border-b">
                                            <Checkbox
                                                id={`group-${group}`}
                                                checked={groupPermissions.every(p => data.permissions.includes(p.name))}
                                                onCheckedChange={(checked) => handleGroupChange(groupPermissions, checked as boolean)}
                                            />
                                            <Label htmlFor={`group-${group}`} className="text-lg font-semibold capitalize cursor-pointer">
                                                {group} Management
                                            </Label>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {groupPermissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`permission-${permission.id}`}
                                                        checked={data.permissions.includes(permission.name)}
                                                        onCheckedChange={(checked) => handlePermissionChange(permission.name, checked as boolean)}
                                                    />
                                                    <Label htmlFor={`permission-${permission.id}`} className="cursor-pointer">
                                                        {permission.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.permissions && <p className="text-destructive text-sm">{errors.permissions}</p>}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Role'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
