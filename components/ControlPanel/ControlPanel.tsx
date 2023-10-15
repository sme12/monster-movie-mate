import React, { useState } from 'react';
import Radio from '../Radio/Radio';
import Button from '@/components/Button/Button';
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
        <div className="flex gap-8 items-center justify-center">
            <fieldset>
                <legend className="mb-2">Choose the era</legend>
                <div className="flex gap-2">
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
                </div>
            </fieldset>
            <fieldset>
                <legend className="mb-2">How bad should it be?</legend>
                <div className="flex gap-2">
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
                </div>
            </fieldset>
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
        rate: Number(searchParams.get('rate')) ?? Rate.Any,
        period: Number(searchParams.get('period')) ?? Period.Any,
    });

    return (
        <div className="bg-black py-5">
            <div className="container mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <Button
                        onClick={() => handleClick(filters)}
                        text="Try again!"
                        pending={isLoading}
                    ></Button>
                    <button
                        type="button"
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className="appearance-none text-white underline hover:no-underline"
                    >
                        {isFiltersOpen ? 'Hide filters' : 'Show filters'}
                    </button>
                </div>
                <div className={isFiltersOpen ? 'block' : 'hidden'}>
                    <FiltersControls
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
