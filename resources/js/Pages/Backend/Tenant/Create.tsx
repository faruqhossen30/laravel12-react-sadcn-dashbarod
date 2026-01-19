import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        domain: '',
        user_name: '',
        user_email: '',
        user_password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.tenants.store'));
    };

    return (
        <AdminLayout header="Create Tenant">
            <Head title="Create Tenant" />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create New Tenant</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Tenant Name"
                            />
                            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="domain">Domain</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="domain"
                                    value={data.domain}
                                    onChange={(e) => setData('domain', e.target.value)}
                                    placeholder="subdomain"
                                    className="flex-1"
                                />
                                <span className="text-muted-foreground">.localhost</span>
                            </div>
                            {errors.domain && <p className="text-destructive text-sm">{errors.domain}</p>}
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="text-lg font-medium mb-4">Admin User</h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="user_name">Name</Label>
                                    <Input
                                        id="user_name"
                                        value={data.user_name}
                                        onChange={(e) => setData('user_name', e.target.value)}
                                        placeholder="Admin Name"
                                    />
                                    {errors.user_name && <p className="text-destructive text-sm">{errors.user_name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="user_email">Email</Label>
                                    <Input
                                        id="user_email"
                                        type="email"
                                        value={data.user_email}
                                        onChange={(e) => setData('user_email', e.target.value)}
                                        placeholder="admin@example.com"
                                    />
                                    {errors.user_email && <p className="text-destructive text-sm">{errors.user_email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="user_password">Password</Label>
                                    <Input
                                        id="user_password"
                                        type="password"
                                        value={data.user_password}
                                        onChange={(e) => setData('user_password', e.target.value)}
                                        placeholder="Password"
                                    />
                                    {errors.user_password && <p className="text-destructive text-sm">{errors.user_password}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Tenant'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
