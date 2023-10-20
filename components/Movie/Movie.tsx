'use client';
import { MovieModel } from '@/models/MovieModel';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useMedia from '@/hooks/useMedia';
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
            <div className="md:flex-row flex flex-col gap-6 pb-[116px]">
                <div className="mx-auto flex flex-shrink-0">
                    <a
                        className="block bg-white p-2"
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
                <div className="flex flex-col gap-2 pb-5">
                    <h2
                        className="md:text-left mb-2 text-center text-4xl font-bold"
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
    const isMd = useMedia('md');

    return (
        <>
            <div className="">
                <div className="absolute z-10 h-full w-full bg-black opacity-60"></div>
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
