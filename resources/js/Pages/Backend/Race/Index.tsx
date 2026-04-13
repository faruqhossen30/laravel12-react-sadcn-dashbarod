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
// import { format } from "date-fns"; // Removed to avoid extra dependency issues

export default function Index({ races }: { races: any }) {
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    const handleDelete = (id: number) => {
        router.delete(route('admin.races.destroy', id));
    };

    return (
        <AdminLayout header="Races">
            <Head title="Races" />
            
            <div className="flex justify-end mb-4">
                <Link href={route('admin.races.create')}>
                    <Button>Create Race</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Race List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>S.N</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Country</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>Distances</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {races.data.map((race: any, index: number) => (
                                    <TableRow key={race.id}>
                                        <TableCell>{(races.current_page - 1) * races.per_page + index + 1}</TableCell>
                                        <TableCell>
                                            {race.image_path ? (
                                                <img 
                                                    src={`/storage/${race.image_path}`} 
                                                    alt={race.title} 
                                                    className="h-10 w-10 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 bg-muted rounded flex items-center justify-center text-[10px]">No Img</div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{race.title}</TableCell>
                                        <TableCell>{race.country?.name || 'N/A'}</TableCell>
                                        <TableCell>{formatDate(race.start_date)}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {race.distances.map((dist: any) => (
                                                    <span key={dist.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                                                        {dist.distance_value}{dist.distance_unit}
                                                    </span>
                                                ))}
                                                {race.distances.length === 0 && <span className="text-muted-foreground text-xs">No Events</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link href={route('admin.races.edit', race.id)}>
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
                                                            This action cannot be undone. This will permanently delete the race and its events.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(race.id)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {races.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                                            No races found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4">
                        <Paginate paginator={races} />
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
