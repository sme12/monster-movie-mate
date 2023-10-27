import { render } from '@testing-library/react';
import Ratings from './Ratings';
import { RatingModel, RatingSource } from '@/models/RatingModel';
import '@testing-library/jest-dom';

// Mock the useRating hook module
jest.mock('../../hooks/useRating', () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

// Mock the implementation of useRating
const mockUseRating = (
    data: RatingModel[] = [],
    isFetching = false,
    isError = false,
) => {
    jest.requireMock('../../hooks/useRating').default.mockReturnValueOnce({
        data,
        isFetching,
        isError,
    });
};

describe('Ratings', () => {
    test('it renders the IMDb rating if available', async () => {
        mockUseRating([
            { source: RatingSource.IMDB, value: '7.5/10' },
            { source: RatingSource.RottenTomatoes, value: '32%' },
        ]);
        const { getByTestId } = render(
            <Ratings backupRating={8.0} imdbURL="/imdb-url" imdbId="tt12345" />,
        );

        const imdbRating = getByTestId('rating-imdb');
        expect(imdbRating).toBeInTheDocument();
    });

    test('it displays loading message while fetching data', async () => {
        mockUseRating([], true);
        const { getByTestId } = render(
            <Ratings backupRating={8.0} imdbURL="/imdb-url" imdbId="tt12345" />,
        );

        const loadingMessage = getByTestId('rating-loading');
        expect(loadingMessage).toBeInTheDocument();
    });

    test('it displays the backup rating if there is an error and a backup rating is provided', async () => {
        mockUseRating([], false, true);

        const { getByTestId } = render(
            <Ratings backupRating={8.0} imdbURL="/imdb-url" imdbId="tt12345" />,
        );

        const backupRatingMessage = getByTestId('rating-backup');
        expect(backupRatingMessage).toBeInTheDocument();
    });
});
