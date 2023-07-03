

"use client";
import { SearchPageImage, UnsplashImage } from '@/app/models/unsplash-image';
import Image from 'next/image';
import React, { useState, useEffect, FormEvent } from 'react'

export default function SearchPage() {

  const [searchResults, setsearchResults] = useState<UnsplashImage[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchLoadingIsError, setSearchLoadingIsError] = useState(false);
  const [queryData, setQueryData] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(queryData?.trim()?.length > 0) {
      try {
        setsearchResults(null);
        setSearchLoadingIsError(false);
        setSearchLoading(true);
        
        
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${queryData}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
        const images: SearchPageImage = await response.json();

        console.log(images.results)
        setsearchResults(images.results)
      } 
      catch (error) {
        console.error(error);
        setSearchLoadingIsError(true);
      } 
       finally {
        setSearchLoading(false)
      }
    }
  }
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const query = formData.get('query')?.toString()?.trim();

  //   if(query){
  //     console.log(query)
  //   }
  //   else {
  //     console.log('Nothing here to show')
  //   }
  // }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='query'
          value={queryData}
          onChange={(e) => setQueryData(e.target.value)}
          placeholder='E.g cats, dogs, ...'
        />
        <button type='submit' disabled={searchLoading}> Search </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center',}}>
        { searchLoading && <p> Loading .... </p> }
        { searchLoadingIsError && <p> Something went wrong, please try again </p> }
        { searchResults?.length == 0 && <p> Nothing found, try a different query </p> }
      </div>
 
      <div>
        {
          searchResults &&
          <div>
            {
              searchResults?.map(each => (
              <Image 
                src={each.urls.raw}
                alt={each.description}
                width={250}
                height={250}
                key={each.urls.raw}
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            ))
            }
          </div>
        }
      </div>
    </div>
  )
}
