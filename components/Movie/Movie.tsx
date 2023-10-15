'use client';
import { MovieModel } from '@/models/MovieModel';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Loader from '@/components/Loader/Loader';

export interface MovieProps {
    movie: MovieModel | undefined;
    isLoading: boolean;
    isError: boolean;
}

const MovieData: React.FC<MovieProps> = ({ movie, isLoading, isError }) => {
    const [year, setYear] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (movie && movie.releaseDate) {
            setYear(new Date(movie.releaseDate).getFullYear());
        } else {
            setYear(undefined);
        }
    }, [movie]);

    if (isLoading) {
        return <Loader />;
    } else if (movie) {
        return (
            <div className="flex grow gap-6">
                <div className="flex-shrink-0">
                    <a
                        className="block p-2 bg-white"
                        target="_blank"
                        href={
                            movie.imdbId &&
                            `https://www.imdb.com/title/${movie.imdbId}`
                        }
                    >
                        {movie.posterPath && (
                            <Image
                                src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                                alt={movie.title}
                                width={250}
                                height={400}
                            />
                        )}
                    </a>
                </div>
                <div className="flex flex-col gap-2">
                    <h2
                        className="font-bold text-4xl mb-2"
                        data-testid="headline"
                    >
                        {movie.title} ({year})
                    </h2>
                    {movie.tagline && (
                        <p className="text-xl">{movie.tagline}</p>
                    )}
                    <p>
                        {/* TODO: IMBD raiting instead of TMDB */}
                        <b>Raiting:</b> {movie.voteAverage}
                    </p>
                    {movie.overview && (
                        <p className="text-slate-300">{movie.overview}</p>
                    )}
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
        className="absolute left-0 right-0"
        style={{
            top: '-70px',
            bottom: '-70px',
        }}
        data-testid="video-backdrop"
    >
        <iframe
            className="w-full h-full"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&mute=1&playsinline=1&loop=1&disablekb=1&rel=0&playlist=${videoKey}`}
        ></iframe>
    </div>
);

const ImageBackdrop: React.FC<{ backdropPath: string }> = ({
    backdropPath,
}) => (
    <div className="w-full h-full" data-testid="image-backdrop">
        <Image
            className="object-cover"
            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdropPath}`}
            alt="Movie poster"
            quality={100}
            fill
            sizes="100vw"
        />
    </div>
);

const Movie: React.FC<MovieProps> = ({ isLoading, movie, isError }) => {
    return (
        <div className="h-full relative w-full overflow-hidden">
            <div className="h-full w-full">
                <div className="absolute w-full h-full z-10 bg-black opacity-60"></div>
                {isLoading ? null : movie?.videoKey ? (
                    <VideoBackdrop videoKey={movie.videoKey} />
                ) : (
                    movie?.backdropPath && (
                        <ImageBackdrop backdropPath={movie.backdropPath} />
                    )
                )}
            </div>
            <div className="absolute top-0 left-0 py-10 z-20 w-full">
                <div className="container mx-auto">
                    <MovieData
                        movie={movie}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>
            </div>
        </div>
    );
};

export default Movie;
