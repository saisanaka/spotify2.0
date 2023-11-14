import Sidebar from '../components/Sidebar';
import Center from '../components/Center';
// import connectToSpotify from '../lib/connectToSpotify';

export default function Home() {
  
  return (
    <main className='bg-black h-screen flex overflow-hidden'>
      {/* Sidebar Menu */}
      <Sidebar />
      <Center />
      {/* Main page  */}
      
     </main>
     
  )
}
