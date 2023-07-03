import Image from "next/image";
import { UnsplashImage } from "../../models/unsplash-image";
import Link from "next/link";

export const metadata = {
  title: 'Static Fetching - Nextjs Image Gallery',
}

export default async function Page () {
  const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,);
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}>

      <p> 
        This page <b> Fetches and caches data at build time. </b> Even though the unsplash API always returns a new image, we see the same image after refreshing the page until we compile the project again
      </p>


      <Image 
        src={image.urls.raw}
        alt={image.description}
        width={width}
        height={height}
      />

      by <Link href={`/users/${image.user.username}`}> {image.user.username} </Link>
    </div>
  )
}