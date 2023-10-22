'use client';
import Movie from '@/components/Movie/Movie';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useSearchParams } from 'next/navigation';
import { Filters, Rate, Period } from '@/models/FiltersModel';
import ControlPanel from '@/components/ControlPanel/ControlPanel';
import useMovie from '@/hooks/useMovie';
import useUpdateQuery from '@/hooks/useUpdateQuery';

const queryClient = new QueryClient();

function Main() {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState({
        rate: Number(searchParams.get('rate') ?? Rate.Masterpiece),
        period: Number(searchParams.get('period') ?? Period.Any),
    });
    const [isNewSearch, setIsNewSearch] = useState(false);

    const { isFetching, data, isError } = useMovie(filters, isNewSearch);

    useUpdateQuery(filters, data);

    const handleClick = (filters: Filters) => {
        queryClient.invalidateQueries({ queryKey: ['movie'] }); // Force invalidation to make sure data will refetch
        setIsNewSearch(true);
        setFilters({ ...filters });
    };

    return (
        <>
            <header
                className="font-creepster flex items-center justify-center bg-slate-950 px-1 py-5 text-center text-4xl font-bold uppercase tracking-wider text-orange-600"
                data-testid="header"
            >
                {isFetching ? 'Let me think...' : 'My recommendation for you'}
            </header>
            <main className="relative h-full">
                <Movie movie={data} isLoading={isFetching} isError={isError} />
            </main>
            <aside className="fixed bottom-0 left-0 z-30 w-full">
                <ControlPanel
                    handleClick={handleClick}
                    isLoading={isFetching}
                />
            </aside>
        </>
    );
}

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <Main />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
