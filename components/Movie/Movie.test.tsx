import { render } from '@testing-library/react';
import Movie, { MovieProps } from './Movie';
import '@testing-library/jest-dom';

const props: MovieProps = {
    movie: {
        id: 1,
        title: 'Test title',
        tagline: 'Test tagline',
        overview: 'Test overview',
        releaseDate: '2021-01-01',
        posterPath: 'test.jpg',
        backdropPath: 'test.jpg',
        imdbId: 'test',
        voteAverage: 10,
        keywords: [],
    },
    isLoading: false,
    isError: false,
};

describe('Movie', () => {
    it('should have correct headline', () => {
        const { getByTestId } = render(<Movie {...props} />);
        const headline = getByTestId('headline');
        expect(headline).toHaveTextContent('Test title (2021)');
    });
    it('should display loader', () => {
        const { getByTestId } = render(<Movie {...props} isLoading={true} />);
        const loader = getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });
    it('should display error message', () => {
        const { getByTestId } = render(
            <Movie {...props} movie={undefined} isError={true} />,
        );
        const error = getByTestId('error');
        expect(error).toBeInTheDocument();
    });
    it('should display backdrop image', () => {
        const { getByTestId } = render(<Movie {...props} />);
        const backdrop = getByTestId('image-backdrop');
        expect(backdrop).toBeInTheDocument();
    });
    it('should display backdrop video', () => {
        const { getByTestId } = render(
            <Movie
                {...props}
                movie={props.movie && { ...props.movie, videoKey: 'test' }}
            />,
        );
        const video = getByTestId('video-backdrop');
        expect(video).toBeInTheDocument();
    });
});
