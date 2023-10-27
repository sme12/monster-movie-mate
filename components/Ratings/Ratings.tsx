import { RatingModel, RatingSource } from '@/models/RatingModel';
import useRating from '@/hooks/useRating';

const RatingIMDB: React.FC<{ value: string; imdbURL: string }> = ({
    value,
    imdbURL,
}) => {
    return (
        <a
            href={imdbURL}
            target="_blank"
            className="inline-flex rounded-lg border border-white bg-white px-4 py-2 text-lg font-bold text-gray-900 hover:bg-transparent hover:text-white"
        >
            <span>IMDb: {value}</span>
        </a>
    );
};

const Ratings: React.FC<{
    backupRating: number;
    imdbURL: string;
    imdbId: string;
}> = ({ backupRating, imdbURL, imdbId }) => {
    const { isFetching: isLoading, data: ratings, isError } = useRating(imdbId);

    return isLoading ? (
        <p className="text-xl">Rating...</p>
    ) : isError ? (
        backupRating ? (
            <p className="text-xl">Rating: {backupRating}</p>
        ) : null
    ) : (
        ratings &&
        ratings.map((rating) => {
            if (rating.source === RatingSource.IMDB) {
                return (
                    <RatingIMDB
                        key={rating.source}
                        value={rating.value}
                        imdbURL={imdbURL}
                    />
                );
            }
        })
    );
};

export default Ratings;
