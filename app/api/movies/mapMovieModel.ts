import { MovieModel } from '@/models/MovieModel';

export default function mapMovieModel(data: any): MovieModel {
    return {
        id: data.id,
        title: data.title,
        overview: data.overview,
        posterPath: data.poster_path,
        backdropPath: data.backdrop_path,
        voteAverage: data.vote_average,
        imdbId: data.imdb_id,
        releaseDate: data.release_date,
        tagline: data.tagline,
        videoKey: data.results?.find(
            (video: any) =>
                video.site === 'YouTube' &&
                video.type === 'Trailer' &&
                video.official,
        )?.key,
        keywords: data.keywords,
    };
}
