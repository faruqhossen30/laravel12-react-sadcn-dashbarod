import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

export default function Edit({ tenant }: { tenant: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: tenant.data?.name || '',
        domain: tenant.domains?.[0]?.domain?.replace('.localhost', '') || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.tenants.update', tenant.id));
    };

    return (
        <AdminLayout header="Edit Tenant">
            <Head title="Edit Tenant" />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Edit Tenant</CardTitle>
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

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
