import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    HeartIcon
} from "@heroicons/react/outline";
import useSpotify from '../hooks/useSpotify';
import { signOut , signIn , useSession } from 'next-auth/react';
import { useEffect, useState } from "react";

function Sidebar() {
  const spotifyApi = useSpotify();
  const {data : session , status} = useSession();
  const [playlists , setPlaylists] = useState([]);
  const [playlistId , setPlaylistId] = useState("");

  useEffect(function(){
      try{
        if(spotifyApi?.getAccessToken()){
          spotifyApi.getUserPlaylists().then(playlist => {
            setPlaylists(playlist.body.items);
          })
          .catch(err => {
            console.log(err);
            signIn();
          })
          
        }
      }
      catch(err){
        console.error(err);
      }
    
  },[session , spotifyApi])

  return (
    <div className="text-gray-500 p-5  overflow-y-scroll scrollbar-hide space-y-4 sm:text-sm border-r border-gray-900">
      <button onClick={()=> signOut()} className="flex items-center space-x-2 hover:text-white">
        <HomeIcon className="h-5 w-5" />
        <p>Home</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <SearchIcon className="h-5 w-5" />
        <p>Search</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <LibraryIcon className="h-5 w-5" />
        <p>Your Library</p>
      </button>
      <hr className="border-t-[0.1px] border-gray-900" />
      
      <button onClick={()=> PlaylistPage} className="flex items-center space-x-2 hover:text-white">
        <PlusCircleIcon className="h-5 w-5" />
        <p>Create Playlist</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <HeartIcon className="h-5 w-5" />
        <p>Liked Songs</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <RssIcon className="h-5 w-5" />
        <p>Your Episodes</p>
      </button>
      <hr className="border-t-[0.1px] border-gray-900" />
      {playlists?.map(playlist => (
        <button key={playlist.id} className="flex flex-col hover:text-white" onClick={()=> setPlaylistId(playlist.id)}>
          <p>{playlist.name[0].toUpperCase() + playlist.name.slice(1,playlist.name.length)}</p>
        </button>
      ))}
    </div>
  )
}

export default Sidebar
