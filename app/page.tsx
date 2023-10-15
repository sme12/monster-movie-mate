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
        rate: Number(searchParams.get('rate')) ?? Rate.Any,
        period: Number(searchParams.get('period')) ?? Period.Any,
    });
    const [isNewSearch, setIsNewSearch] = useState(false);

    const { isFetching, data, isError } = useMovie(filters, isNewSearch);

    useUpdateQuery(filters, data);

    const handleClick = (filters: Filters) => {
        queryClient.invalidateQueries(); // Force invalidation to make sure data will refetch
        setIsNewSearch(true);
        setFilters({ ...filters });
    };

    return (
        <>
            <header
                className="flex justify-center items-center h-16 bg-black text-orange-600 text-3xl font-bold uppercase"
                data-testid="header"
            >
                {isFetching ? 'Let me think...' : 'My recommendation for you'}
            </header>
            <main className="h-screen" style={{ paddingBottom: '132px' }}>
                <section className="flex h-full">
                    <Movie
                        movie={data}
                        isLoading={isFetching}
                        isError={isError}
                    />
                </section>
            </main>
            <aside className="fixed z-30 bottom-0 left-0 w-full">
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
