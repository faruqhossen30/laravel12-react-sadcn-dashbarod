import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Checkbox } from '@/Components/ui/checkbox';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { 
    Collapsible, 
    CollapsibleContent, 
    CollapsibleTrigger 
} from '@/Components/ui/collapsible';
import { useDebounce } from '@/hooks/useDebounce'; // Assuming we have or need one

interface Option {
    name: string;
    id?: number;
    value?: string;
}

interface FilterSidebarProps {
    filters: any;
    options: {
        terrains: string[];
        formats: string[];
        courseTypes: string[];
        difficulties: string[];
        countries: Option[];
        years: number[];
    };
}

export default function FilterSidebar({ filters, options }: FilterSidebarProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTerrain, setSelectedTerrain] = useState<string[]>(filters.terrain || []);
    const [selectedCountry, setSelectedCountry] = useState<number[]>(filters.country || []);
    const [selectedCourseType, setSelectedCourseType] = useState<string[]>(filters.course_type || []);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>(filters.difficulty || []);

    // Debounced search
    useEffect(() => {
        const handler = setTimeout(() => {
            if (search !== (filters.search || '')) {
                updateFilters({ search });
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    const updateFilters = (newFilters: any) => {
        router.get(route('races.index'), {
            ...filters,
            ...newFilters,
            page: 1, // Reset to first page on filter change
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleCheckboxChange = (type: string, value: any, checked: boolean) => {
        let current: any[] = [];
        if (type === 'terrain') current = [...selectedTerrain];
        if (type === 'country') current = [...selectedCountry];
        if (type === 'course_type') current = [...selectedCourseType];
        if (type === 'difficulty') current = [...selectedDifficulty];

        if (checked) {
            current.push(value);
        } else {
            current = current.filter(item => item !== value);
        }

        if (type === 'terrain') { setSelectedTerrain(current); updateFilters({ terrain: current }); }
        if (type === 'country') { setSelectedCountry(current); updateFilters({ country: current }); }
        if (type === 'course_type') { setSelectedCourseType(current); updateFilters({ course_type: current }); }
        if (type === 'difficulty') { setSelectedDifficulty(current); updateFilters({ difficulty: current }); }
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedTerrain([]);
        setSelectedCountry([]);
        setSelectedCourseType([]);
        setSelectedDifficulty([]);
        router.get(route('races.index'), {});
    };

    return (
        <aside className="space-y-8">
            {/* Search */}
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <Input 
                    type="text" 
                    placeholder="Search races..." 
                    className="pl-10 h-11 bg-white border-slate-200 focus-visible:ring-emerald-500 rounded-xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button 
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Filters</h2>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-auto p-0 text-emerald-600 hover:text-emerald-700 hover:bg-transparent font-bold text-xs underline underline-offset-4"
                >
                    Clear all
                </Button>
            </div>

            {/* Filter Groups */}
            <div className="space-y-6">
                <FilterGroup 
                    title="Terrain" 
                    options={options.terrains} 
                    selected={selectedTerrain}
                    onChange={(val, chk) => handleCheckboxChange('terrain', val, chk)}
                />
                
                <FilterGroup 
                    title="Race Type" 
                    options={options.courseTypes.map(t => ({ label: t.replace(/_/g, ' '), value: t }))} 
                    selected={selectedCourseType}
                    onChange={(val, chk) => handleCheckboxChange('course_type', val, chk)}
                />

                <FilterGroup 
                    title="Difficulty" 
                    options={options.difficulties} 
                    selected={selectedDifficulty}
                    onChange={(val, chk) => handleCheckboxChange('difficulty', val, chk)}
                />

                <FilterGroup 
                    title="Country" 
                    options={options.countries.map(c => ({ label: c.name, value: c.id }))} 
                    selected={selectedCountry}
                    onChange={(val, chk) => handleCheckboxChange('country', val, chk)}
                />
            </div>
        </aside>
    );
}

function FilterGroup({ title, options, selected, onChange }: { title: string, options: any[], selected: any[], onChange: (val: any, chk: boolean) => void }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-3">
            <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
                {title}
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-1">
                {options.map((option) => {
                    const label = typeof option === 'string' ? option.charAt(0).toUpperCase() + option.slice(1) : option.label;
                    const value = typeof option === 'string' ? option : option.value;
                    const id = `filter-${title}-${value}`;
                    
                    return (
                        <div key={value} className="flex items-center gap-3">
                            <Checkbox 
                                id={id} 
                                checked={selected.includes(value)}
                                onCheckedChange={(checked) => onChange(value, checked === true)}
                                className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 rounded"
                            />
                            <Label 
                                htmlFor={id} 
                                className="text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                            >
                                {label}
                            </Label>
                        </div>
                    );
                })}
            </CollapsibleContent>
        </Collapsible>
    );
}
