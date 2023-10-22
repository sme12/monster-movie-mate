import { Rate, Period } from '@/models/FiltersModel';
import mapMovieModel from './mapMovieModel';
import axios from 'axios';

const httpClient = axios.create({
    headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
});

async function getMovieById(id: string) {
    const details = await httpClient.get(
        `https://api.themoviedb.org/3/movie/${id}`,
    );
    const detailsData = details.data;

    const videos = await httpClient.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
    );
    const videosData = videos.data;

    const keywords = await httpClient.get(
        `https://api.themoviedb.org/3/movie/${id}/keywords`,
    );
    const keywordsData = keywords.data;

    // TODO: Add error response

    return new Response(
        JSON.stringify(
            mapMovieModel({ ...detailsData, ...videosData, ...keywordsData }),
        ),
        {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' },
        },
    );
}

export async function POST(req: Request) {
    const genreId = 27;

    const { filters, movieId } = await req.json();
    if (movieId) {
        return getMovieById(movieId);
    }

    const { rate, period } = filters;
    let voteInterval: [number, number] | [] = [];
    switch (rate) {
        case Rate.Any:
            voteInterval = [0, 10];
            break;
        case Rate.VeryBad:
            voteInterval = [0, 4.99];
            break;
        case Rate.OKeish:
            voteInterval = [5, 6.99];
            break;
        case Rate.Masterpiece:
            voteInterval = [7, 10];
            break;
    }

    let yearInterval: [string, string] | [] = [];
    switch (period) {
        case Period.Any:
            yearInterval = ['', ''];
            break;
        case Period.Old:
            yearInterval = ['', '1979-12-31'];
            break;
        case Period.Eighties:
            yearInterval = ['1980-01-01', '1989-12-31'];
            break;
        case Period.Modern:
            yearInterval = ['1990-01-01', ''];
            break;
    }

    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&vote_average.gte=${voteInterval[0]}&vote_average.lte=${voteInterval[1]}&primary_release_date.gte=${yearInterval[0]}&primary_release_date.lte=${yearInterval[1]}&vote_count.gte=20&include_adult=false`;
    const firstResp = await httpClient.get(url);
    let firstData = firstResp.data;
    const pages = await firstData.total_pages;
    const pagesToRandomize = pages > 500 ? 500 : pages;
    const randomPage = Math.floor(Math.random() * pagesToRandomize) + 1;
    const secondResp = await httpClient.get(`${url}&page=${randomPage}`);
    const moviesOnPage = secondResp.data;
    const randomItemIndex = Math.floor(
        Math.random() * moviesOnPage.results.length,
    );
    const randomMovie = moviesOnPage.results[randomItemIndex];

    return getMovieById(randomMovie.id);
}
