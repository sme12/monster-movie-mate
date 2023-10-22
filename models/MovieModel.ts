export interface MovieModel {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    voteAverage: number;
    imdbId: string;
    releaseDate: string;
    tagline: string;
    videoKey?: string;
    keywords: {
        id: number;
        name: string;
    }[];
}
