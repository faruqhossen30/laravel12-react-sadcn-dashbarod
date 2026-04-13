import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Plus, Trash2 } from 'lucide-react';
import ReactSelect from 'react-select';

interface Props {
    race: any;
    countries: any[];
    qualifiers: any[];
    enums: {
        terrain: any[];
        format: any[];
        course_type: any[];
        difficulty: any[];
    };
}

export default function Edit({ race, countries, qualifiers, enums }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'patch',
        title: race.title || '',
        description: race.description || '',
        country_id: race.country_id || '',
        start_date: race.start_date || '',
        end_date: race.end_date || '',
        terrain: race.terrain || '',
        format: race.format || '',
        course_type: race.course_type || '',
        image: null as File | null,
        is_featured: !!race.is_featured,
        qualifiers: race.qualifiers.map((q: any) => q.id) as number[],
        distances: race.distances.map((d: any) => ({
            id: d.id,
            distance_value: d.distance_value || '',
            distance_unit: d.distance_unit || 'km',
            elevation_gain: d.elevation_gain || '',
            difficulty: d.difficulty || '',
            duration_hhmm: d.duration_hhmm || '',
            price: d.price || '',
            currency: d.currency || 'USD',
        }))
    });

    const countryOptions = countries.map(c => ({ value: c.id, label: c.name }));
    const qualifierOptions = qualifiers.map(q => ({ value: q.id, label: q.name }));
    const selectedCountry = countryOptions.find(o => o.value === data.country_id);
    const selectedQualifiers = qualifierOptions.filter(o => data.qualifiers.includes(o.value));

    const addDistance = () => {
        setData('distances', [
            ...data.distances,
            {
                distance_value: '',
                distance_unit: 'km',
                elevation_gain: '',
                difficulty: '',
                duration_hhmm: '',
                price: '',
                currency: 'USD',
            }
        ]);
    };

    const removeDistance = (index: number) => {
        const nextDistances = data.distances.filter((_, i) => i !== index);
        setData('distances', nextDistances);
    };

    const handleDistanceChange = (index: number, field: string, value: any) => {
        const nextDistances = [...data.distances];
        (nextDistances[index] as any)[field] = value;
        setData('distances', nextDistances);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.races.update', race.id));
    };

    return (
        <AdminLayout header="Edit Race">
            <Head title={`Edit Race - ${race.title}`} />
            
            <div className="flex justify-start mb-4">
                <Link href={route('admin.races.index')}>
                    <Button variant="outline">Back to List</Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Race Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="e.g. Ultra Trail Mont-Blanc"
                                    />
                                    {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter race details..."
                                        rows={5}
                                    />
                                    {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                        />
                                        {errors.start_date && <p className="text-destructive text-sm">{errors.start_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="end_date">End Date (Optional)</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                        />
                                        {errors.end_date && <p className="text-destructive text-sm">{errors.end_date}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Distances / Events */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Events / Distances</CardTitle>
                                <Button type="button" variant="outline" size="sm" onClick={addDistance}>
                                    <Plus className="h-4 w-4 mr-1" /> Add Distance
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {data.distances.map((distance, index) => (
                                    <div key={index} className="p-4 border rounded-lg space-y-4 relative bg-muted/30">
                                        <div className="absolute top-2 right-2">
                                            {data.distances.length > 1 && (
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-destructive"
                                                    onClick={() => removeDistance(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label>Distance Value</Label>
                                                <Input
                                                    value={distance.distance_value}
                                                    onChange={(e) => handleDistanceChange(index, 'distance_value', e.target.value)}
                                                    placeholder="e.g. 50"
                                                />
                                                {errors[`distances.${index}.distance_value` as keyof typeof errors] && <p className="text-destructive text-sm">{errors[`distances.${index}.distance_value` as keyof typeof errors]}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Unit</Label>
                                                <Select 
                                                    value={distance.distance_unit} 
                                                    onValueChange={(val) => handleDistanceChange(index, 'distance_unit', val)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="km">KM</SelectItem>
                                                        <SelectItem value="mi">Miles</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Elevation Gain (m)</Label>
                                                <Input
                                                    type="number"
                                                    value={distance.elevation_gain}
                                                    onChange={(e) => handleDistanceChange(index, 'elevation_gain', e.target.value)}
                                                    placeholder="e.g. 2500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label>Difficulty</Label>
                                                <Select 
                                                    value={distance.difficulty} 
                                                    onValueChange={(val) => handleDistanceChange(index, 'difficulty', val)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {enums.difficulty.map((d: any) => (
                                                            <SelectItem key={d.name} value={d.value}>{d.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Duration (HH:MM)</Label>
                                                <Input
                                                    value={distance.duration_hhmm}
                                                    onChange={(e) => handleDistanceChange(index, 'duration_hhmm', e.target.value)}
                                                    placeholder="e.g. 12:00"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Price</Label>
                                                <Input
                                                    type="number"
                                                    value={distance.price}
                                                    onChange={(e) => handleDistanceChange(index, 'price', e.target.value)}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {errors.distances && <p className="text-destructive text-sm">{errors.distances}</p>}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Categorization</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Country</Label>
                                    <ReactSelect
                                        options={countryOptions}
                                        value={selectedCountry}
                                        onChange={(opt: any) => setData('country_id', opt.value)}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder="Select Country..."
                                    />
                                    {errors.country_id && <p className="text-destructive text-sm">{errors.country_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Terrain</Label>
                                    <Select value={data.terrain} onValueChange={(val) => setData('terrain', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Terrain" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.terrain.map((t: any) => (
                                                <SelectItem key={t.name} value={t.value}>{t.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.terrain && <p className="text-destructive text-sm">{errors.terrain}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Format</Label>
                                    <Select value={data.format} onValueChange={(val) => setData('format', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.format.map((f: any) => (
                                                <SelectItem key={f.name} value={f.value}>{f.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.format && <p className="text-destructive text-sm">{errors.format}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Course Type</Label>
                                    <Select value={data.course_type} onValueChange={(val) => setData('course_type', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Course Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.course_type.map((c: any) => (
                                                <SelectItem key={c.name} value={c.value}>{c.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.course_type && <p className="text-destructive text-sm">{errors.course_type}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Qualifiers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ReactSelect
                                    isMulti
                                    options={qualifierOptions}
                                    value={selectedQualifiers}
                                    onChange={(opts: any) => setData('qualifiers', opts ? opts.map((o: any) => o.value) : [])}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Select Qualifiers..."
                                />
                                {errors.qualifiers && <p className="text-destructive text-sm">{errors.qualifiers}</p>}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Race Image</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {race.image_path && !data.image && (
                                    <div className="mb-4">
                                        <img 
                                            src={`/storage/${race.image_path}`} 
                                            alt="Current" 
                                            className="w-full h-32 object-cover rounded border"
                                        />
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                    accept="image/*"
                                />
                                {errors.image && <p className="text-destructive text-sm">{errors.image}</p>}
                                
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="is_featured" 
                                        checked={data.is_featured} 
                                        onCheckedChange={(val) => setData('is_featured', val as boolean)} 
                                    />
                                    <Label htmlFor="is_featured" className="cursor-pointer">Featured Race</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <Button type="submit" className="w-full" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Race'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
