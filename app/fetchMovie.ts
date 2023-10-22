import axios from 'axios';
import { Filters } from '@/models/FiltersModel';
import { MovieModel } from '@/models/MovieModel';

export default async function fetchMovie(
    filters: Filters | null,
    movieId?: string | null,
    context?: any,
    signal?: AbortSignal,
): Promise<MovieModel> {
    try {
        const { data }: { data: MovieModel } = await axios.post(
            '/api/movies',
            {
                filters,
                movieId,
            },
            {
                signal,
            },
        );
        return Promise.resolve(data);
    } catch (error: any) {
        return Promise.reject(error?.message ?? 'Something went wrong');
    }
}
