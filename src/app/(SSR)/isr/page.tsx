import Image from "next/image";
import { UnsplashImage } from "../../models/unsplash-image";
import Link from "next/link";

export const metadata = {
  title: 'Incremental Static Regeneration - Nextjs Image Gallery',
}

// export const revalidate = 0;

export default async function Page () {
  const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`, {
    next: { revalidate: 15 }
  });
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
      This page <b> Fetches data dynamically, but revalidates after the given duration </b>, everytime you refresh the page, you get a new image from the unsplash API
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