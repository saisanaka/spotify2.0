import { useRouter } from 'next/router';

async function connectToSpotify(){
    const router = useRouter();
    try{
        const response = await fetch("http://localhost:8000/authorize");
        if(response.status === 200){
            const data = await response.json();
            router.push(data.spotifyAuthorizationUrl);
        }else{
            console.warn("Failed inside the success state");
        }
    }catch(error){
        console.warn("Failed to fetch");
        console.log(error);
    }
}

export default connectToSpotify;