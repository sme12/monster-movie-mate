import { RatingModel } from '@/models/RatingModel';

export default function mapRatingModel(data: any): RatingModel[] {
    return (
        data?.Ratings?.map((rating: any) => ({
            source: rating.Source,
            value: rating.Value,
        })) ?? []
    );
}
