'use client';
import { MovieModel } from '@/models/MovieModel';
import { useState, useEffect, useMemo } from 'react';
import useMedia from '@/hooks/useMedia';
import Loader from '@/components/Loader/Loader';
import useRating from '@/hooks/useRating';
import { RatingModel, RatingSource } from '@/models/RatingModel';

export interface MovieProps {
    movie: MovieModel | undefined;
    isLoading: boolean;
    isError: boolean;
}

const RaitingIMDB: React.FC<{ value: string; imdbURL: string }> = ({
    value,
    imdbURL,
}) => {
    return (
        <a
            href={imdbURL}
            target="_blank"
            className="text-xl underline hover:no-underline"
        >
            <b>IMDb: </b>
            <span>{value}</span>
        </a>
    );
};

const Raitings: React.FC<{
    ratings?: RatingModel[];
    isLoading: boolean;
    isError: boolean;
    backupRating: number;
    imdbURL: string;
}> = ({ ratings, isLoading, isError, backupRating, imdbURL }) => {
    return isLoading ? (
        <p className="text-xl">Rating...</p>
    ) : isError ? (
        <p className="text-xl">Rating: {backupRating}</p>
    ) : (
        ratings &&
        ratings.map((rating) => {
            if (rating.source === RatingSource.IMDB) {
                return (
                    <RaitingIMDB
                        key={rating.source}
                        value={rating.value}
                        imdbURL={imdbURL}
                    />
                );
            }
        })
    );
};

const MovieData: React.FC<MovieProps> = ({ movie, isLoading, isError }) => {
    const [year, setYear] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (movie && movie.releaseDate) {
            setYear(new Date(movie.releaseDate).getFullYear());
        } else {
            setYear(undefined);
        }
    }, [movie]);

    const {
        isFetching: isRatingFetching,
        data: ratings,
        isError: isRatingError,
    } = useRating(movie?.imdbId);

    const imdbURL = useMemo(() => {
        return movie?.imdbId && `https://www.imdb.com/title/${movie.imdbId}`;
    }, [movie?.imdbId]);

    if (isLoading) {
        return <Loader />;
    } else if (movie) {
        return (
            <div className="md:flex-row md:pb-[calc(68px+2rem)] flex flex-col gap-6 pb-[calc(104px+2rem)]">
                <div className="mx-auto flex flex-shrink-0">
                    <a
                        className="block bg-white p-2"
                        target="_blank"
                        href={imdbURL}
                    >
                        {movie.posterPath && (
                            <picture>
                                <img
                                    srcSet={`https://image.tmdb.org/t/p/w300${movie.posterPath}, https://image.tmdb.org/t/p/w780${movie.posterPath} 2x`}
                                    alt={movie.title}
                                    width={250}
                                    height={400}
                                />
                            </picture>
                        )}
                    </a>
                </div>
                <div className="flex grow flex-col gap-3 pb-5">
                    <h2
                        className="md:text-left mb-2 text-center text-4xl font-bold"
                        data-testid="headline"
                    >
                        {movie.title} ({year})
                    </h2>
                    {movie.tagline && (
                        <p className="text-2xl">{movie.tagline}</p>
                    )}
                    <Raitings
                        ratings={ratings}
                        isLoading={isRatingFetching}
                        isError={isRatingError}
                        backupRating={movie?.voteAverage}
                        imdbURL={imdbURL ?? ''}
                    />
                    {movie.overview && (
                        <p className="text-lg text-slate-200">
                            {movie.overview}
                        </p>
                    )}
                    <div>
                        {movie.keywords && (
                            <div className="mt-3 flex flex-row flex-wrap gap-2">
                                {movie.keywords
                                    .map((keyword, i) => (
                                        <span
                                            key={keyword.id}
                                            className="rounded-md border border-slate-400 px-2 py-1 text-white"
                                        >
                                            {keyword.name}
                                        </span>
                                    ))
                                    .slice(0, 13)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } else if (isError) {
        return (
            <div className="text-red-500" data-testid="error">
                Something went wrong...
            </div>
        );
    }
    return null;
};

const VideoBackdrop: React.FC<{ videoKey: string }> = ({ videoKey }) => (
    <div
        className="absolute bottom-0 left-0 right-0 top-[-70px] z-[-1]"
        data-testid="video-backdrop"
    >
        <iframe
            className="h-full w-full"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&mute=1&playsinline=1&loop=1&disablekb=1&rel=0&playlist=${videoKey}`}
        ></iframe>
    </div>
);

const ImageBackdrop: React.FC<{ backdropPath: string }> = ({
    backdropPath,
}) => (
    <div className="h-full w-full" data-testid="image-backdrop">
        <picture>
            <img
                className="absolute left-0 top-0 h-full w-full object-cover object-center"
                src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdropPath}`}
                alt="Movie poster"
            />
        </picture>
    </div>
);

const Movie: React.FC<MovieProps> = ({ isLoading, movie, isError }) => {
    const isMd = useMedia('md');

    return (
        <>
            <div className="">
                <div className="absolute z-10 h-full w-full bg-slate-950 opacity-60"></div>
                {isLoading ? null : movie?.videoKey && isMd ? (
                    <VideoBackdrop videoKey={movie.videoKey} />
                ) : (
                    movie?.backdropPath && (
                        <ImageBackdrop backdropPath={movie.backdropPath} />
                    )
                )}
            </div>
            <div className="relative left-0 top-0 z-20 w-full pt-5">
                <div className="container mx-auto max-w-[1200px] px-5">
                    <MovieData
                        movie={movie}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>
            </div>
        </>
    );
};

export default Movie;
