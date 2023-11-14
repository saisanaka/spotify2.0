import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token){
    console.log("Access token expired");
    try{

        console.log("Access token inside refreshAccessToken()\n",token.accessToken);
        console.log("refresh token inside refreshAccessToken()\n",token.refreshToken);
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.refreshAccessToken(token.refreshToken);

        const { body : refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("Checking refreshedToken\n",refreshedToken); 
        return{
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        }
    }catch(err){
        return {
            ...token,
            error: "refreshAccessToken"
        }
    }
}

export const authOptions = {
    providers: [
    SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        authorization: LOGIN_URL
    })
    ],
    secret: process.env.JWT_SECRET,
    pages:{
        signIn: '/Login',
    },
    callbacks: {
        async jwt({token , account , user}){
            // initial login
            console.log("Checking for initial login");
            if(user && account){
                console.log("Inside user && account \n",user);
                console.log("account\n",account);
                return {
                    ...token , 
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                }
            }

            console.log("Access Token expired or not\n",token.accessTokenExpires);
            // returning user with access token not expired
            if(Date.now() < token.accessTokenExpires){
                console.log("returning accessToken \n",token);
                return token;
            }
            
            console.log("Requesting refreshAccessToken");
            const rt =  await refreshAccessToken(token);
            console.log("Got the refresh Token\n",rt);
            return rt;
        },
        
        async session({session , token}){
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
    }
};

export default NextAuth(authOptions);