import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-modify-playback-state",
    "user-follow-read"
].join(",");

const params = {
    scope: scopes,
}

const searchQuery = new URLSearchParams(params);

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + searchQuery.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export default spotifyApi;
export {LOGIN_URL};