import axios from 'axios';
import mapRatingModel from './mapRaitingModel';

export async function POST(req: Request) {
    const { imdbId } = await req.json();
    if (!imdbId) {
        return new Response(
            JSON.stringify({ message: 'No movie id provided' }),
            {
                status: 400,
                statusText: 'Bad Request',
                headers: { 'Content-Type': 'application/json' },
            },
        );
    }
    const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`,
    );

    if (response.data.Error) {
        return new Response(JSON.stringify({ message: response.data.Error }), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const ratings = mapRatingModel(response.data);

    return new Response(JSON.stringify(ratings), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
    });
}
