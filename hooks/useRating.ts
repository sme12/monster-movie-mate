import { useQuery } from '@tanstack/react-query';
import fetchRating from '../app/fetchRating';

export default function useRating(imdbId?: string) {
    return useQuery({
        queryKey: ['rating', imdbId],
        queryFn: () => fetchRating(imdbId ?? ''),
        refetchOnWindowFocus: false,
        enabled: !!imdbId,
    });
}
