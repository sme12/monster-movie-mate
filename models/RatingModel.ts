export enum RatingSource {
    IMDB = 'Internet Movie Database',
    RottenTomatoes = 'Rotten Tomatoes',
}

export interface RatingModel {
    source: RatingSource;
    value: string;
}
