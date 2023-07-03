import { UnsplashUser } from "@/app/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { username: string }
}


// Function that gets User data  
async function getUser (username: string): Promise<UnsplashUser> {
  const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);

  if(response.status === 404) notFound();
  return await response.json();
}

// Use cache if you're not using the traditional fetch but rather axions and the rest
// const getUserCached = cache(getUser);

// Generating Metadata Dynamically
export async function generateMetadata ({params:{ username }}: PageProps): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title: `${user.username} - Nextjs Gallery Project` 
  }   
}



export default async function User ({ params: { username }}: PageProps) {
  const user = await getUser(username);

  return(
    <div>
      <p>
        This profile page uses <b> generateMetadata </b> to set the <b> page title </b> dynamically from the API response
      </p>
      <h1> {user.username} </h1>
      <p> First name: {user.first_name} </p>
      <p> Last name: {user.last_name} </p>
      <a href={`https://unsplash.com/${user.username}`} target="_blank"> Unsplash Profile </a>
    </div>
  )
}