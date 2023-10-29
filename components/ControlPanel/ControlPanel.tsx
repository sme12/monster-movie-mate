import { useState } from 'react';
import Radio from '../Radio/Radio';
import Button from '@/components/Button/Button';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import { Filters } from '@/models/FiltersModel';
import { Rate, Period } from '@/models/FiltersModel';
import { useSearchParams } from 'next/navigation';

interface FiltersControlsProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

const FiltersControls: React.FC<FiltersControlsProps> = ({
    filters,
    setFilters,
}) => {
    return (
        <div className="flex flex-col gap-8 lg:justify-center xl:flex-row">
            <RadioGroup title="How old should it be?">
                <Radio
                    label="Any"
                    value={Period.Any}
                    checked={filters.period === Period.Any}
                    onChange={() =>
                        setFilters({
                            ...filters,
                            period: Period.Any,
                        })
                    }
                />
                <Radio
                    label="Very old"
                    value={Period.Old}
                    checked={filters.period === Period.Old}
                    onChange={() =>
                        setFilters({
                            ...filters,
                            period: Period.Old,
                        })
                    }
                />
                <Radio
                    label="Golden 80s"
                    value={Period.Eighties}
                    checked={filters.period === Period.Eighties}
                    onChange={() =>
                        setFilters({
                            ...filters,
                            period: Period.Eighties,
                        })
                    }
                />
                <Radio
                    label="Modern"
                    value={Period.Modern}
                    checked={filters.period === Period.Modern}
                    onChange={() =>
                        setFilters({
                            ...filters,
                            period: Period.Modern,
                        })
                    }
                />
            </RadioGroup>
            <RadioGroup title="How bad should it be?">
                <Radio
                    label="Any"
                    value={Rate.Any}
                    checked={filters.rate === Rate.Any}
                    onChange={() =>
                        setFilters({
                            ...filters,
                            rate: Rate.Any,
                        })
                    }
                />
                <Radio
                    label="Very bad"
                    value={Rate.VeryBad}
                    checked={filters.rate === Rate.VeryBad}
                    onChange={() =>
                        setFilters({
                            ...filters,
                            rate: Rate.VeryBad,
                        })
                    }
                />
                <Radio
                    label="OKeish"
                    value={Rate.OKeish}
                    checked={filters.rate === Rate.OKeish}
                    onChange={() =>
                        setFilters({
                            ...filters,
                            rate: Rate.OKeish,
                        })
                    }
                />
                <Radio
                    label="Masterpiece"
                    value={Rate.Masterpiece}
                    checked={filters.rate === Rate.Masterpiece}
                    onChange={() =>
                        setFilters({
                            ...filters,
                            rate: Rate.Masterpiece,
                        })
                    }
                />
            </RadioGroup>
        </div>
    );
};

interface ControlPanelProps {
    handleClick: (filters: Filters) => void;
    isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    isLoading,
    handleClick,
}) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const searchParams = useSearchParams();
    const [filters, setFilters] = useState({
        rate: Number(searchParams.get('rate') ?? Rate.Masterpiece),
        period: Number(searchParams.get('period') ?? Period.Any),
    });

    const handleButtonClick = (filters: Filters) => {
        handleClick(filters);
        if (isFiltersOpen) {
            setIsFiltersOpen(false);
        }
    };

    return (
        <aside
            className={`${
                isFiltersOpen
                    ? 'translate-y-0'
                    : 'translate-y-[calc(100%-104px-2rem)] md:translate-y-[calc(100%-68px-2rem)]'
            } fixed bottom-0 left-0 z-30 w-full bg-slate-950 pb-5 transition-transform md:py-5`}
        >
            <div className="container mx-auto max-w-[1200px] px-5">
                <div className="mb-3 flex flex-col items-center justify-center md:flex-row md:gap-3">
                    <Button
                        onClick={() => handleButtonClick(filters)}
                        text="Try again!"
                        pending={isLoading}
                        className="w-full md:w-auto"
                    ></Button>
                    <button
                        type="button"
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className="-order-1 w-full appearance-none py-4 text-white underline hover:no-underline md:order-1 md:w-[83px]"
                    >
                        {isFiltersOpen ? 'Hide filters' : 'Show filters'}
                    </button>
                </div>
                <FiltersControls filters={filters} setFilters={setFilters} />
            </div>
        </aside>
    );
};

export default ControlPanel;
