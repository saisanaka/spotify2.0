import { useEffect } from "react";
import { signIn , useSession} from 'next-auth/react';
import spotifyApi from '../lib/spotify'

function useSpotify() {
    const {data : session , status} = useSession();

    useEffect(()=>{
        if(session){
            if(session.error === 'refreshAccessToken'){
                return signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    },[session]);
    return spotifyApi;
}

export default useSpotify;

// accessToken
// : 
// "BQAE_18HQ61RWn6B-Xq8kLwGXZn0kpwJUvliI1db5zNb1oLPaaBpLheo5Pv603MoabByeFRkZrGtGUfqHz5BrQKuoK8f18IgjmsaaUVFyhQaUmL111efj_lp_bFKMibXTjJrx7G9JpPycLqiEajd03qhb0Ah7nyRlnHJ6G-t3Ckl_XcSItZSRYWZTlZCaLH9v7KZVR50sbACvG_I_7J2fqLXeAqt0QqBackyyomjYCDcsMX9qyxuxRKfu2wCIDV-Z5HWBwSMoprDbj4"
// email
// : 
// "prasadsai14341@gmail.com"
// name
// : 
// "Prasad Sai"
// refreshToken
// : 
// "AQDCsmShToppaRCApNVgdvRecxxxkys-7druA38Bs22-swq3dK2ZNT0eugv4kK7if1onaDHgam8j1-jYVBV8nHJjXXjCoYTz3maUMzlpHwiSVea7U3D8bX-2muyFzSFOrrg"
// username
// : 
// "31u2rblsyb7f7yogbmy77roaigv4"
// user_id 31u2rblsyb7f7yogbmy77roaigv4