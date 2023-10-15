import { useQuery } from '@tanstack/react-query';
import { Filters } from '@/models/FiltersModel';
import fetchMovie from '../app/fetchMovie';
import { useSearchParams } from 'next/navigation';

export default function useMovie(filters: Filters, isNewSearch?: boolean) {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: ['movie', filters, isNewSearch],
        queryFn: () =>
            fetchMovie(
                filters,
                !isNewSearch ? searchParams.get('id') : undefined,
            ),
        refetchOnWindowFocus: false,
    });
}
