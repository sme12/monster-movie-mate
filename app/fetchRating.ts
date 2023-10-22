import axios from 'axios';
import { RatingModel } from '@/models/RatingModel';

export default async function fetchRating(
    imdbId: string,
): Promise<RatingModel[]> {
    try {
        const { data }: { data: RatingModel[] } = await axios.post(
            '/api/omdb',
            {
                imdbId,
            },
        );
        return Promise.resolve(data);
    } catch (error: any) {
        return Promise.reject(error?.message ?? 'Something went wrong');
    }
}
