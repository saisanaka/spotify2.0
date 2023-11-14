import Image from 'next/image';
import Download from './download.jpg'
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {shuffle} from 'lodash';

function Center() {
  const {data : session} = useSession();
  const [color , setColor] = useState(null);
  const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-oragne-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
    'from-violet-500',
    'from-red-500'
  ];

  useEffect(function (){
    setColor(shuffle(colors)[0]);
  },[])

  return (
    <div className='flex-grow'>
      <header className='absolute top-5 right-8'>
        <div className='flex opacity-90 hover:opacity-80 hover:cursor-pointer bg-red-300 rounded-full items-center space-x-3 p-1 pr-2'>
          <Image
              src={Download}
              alt='download image'
              className='w-10 h-10 rounded-full'
              priority={true}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>
      <section className={`flex items-end bg-gradient-to-b
        to-black ${color}  h-80 text-white p-8`}>
        {/* <Image
          src={Download}
          alt=''
        /> */}
      <h1>Hello</h1>
      </section>
    </div>
  )
}

export default Center;
