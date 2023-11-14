import {getProviders , signIn , signOut , useSession} from "next-auth/react";
import { useRouter } from "next/router";

function Login({providers}) {
  const {data : session , status} = useSession();
  console.log(session);
  // if(session){
  //   const router = useRouter();
  //   return router.push("/");
  // }
  return (
    <div className="flex flex-col items-center justify-center bg-black w-full min-h-screen">
      <img className="w-52 mb-5"
        src="https://links.papareact.com/9xl" alt=""
      />
      {Object.values(providers).map((provider)=>{
        return (<div key={provider.id}>
          <button className="bg-[#18D160] text-white p-5 rounded-full" onClick={()=> signIn(provider.id , {callbackUrl: "/"})}>
          Login with {provider.name}
          </button>
        </div>)
      })}     
    </div>
  )
}

export default Login;

export async function getServerSideProps(){
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  }
}
