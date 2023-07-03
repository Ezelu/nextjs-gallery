import { UnsplashImage } from "@/app/models/unsplash-image";
import Image from "next/image";
import styles from './TopicPage.module.css';
import { Metadata } from "next";

interface PageProps {
  params: { topic: string },
  // searchParams: { [key: string]: string | string[] | undefined }
}


// This restricts the dynamic parameters to just the ones we have inthre arrary on the generateStaticParams()
// export const dynamicParams = false;
// This sets the seconds for page revalidation
// export const revalidate = 5


export function generateMetadata ({params: {topic}}: PageProps): Metadata {
  return {
    title: `${topic} - Nextjs Image Gallery`
  }
}


export async function generateStaticParams () {
  return ["health", "fitness", "coding"].map(topic => ({ topic }))
}



export default async function TOPICS ({params: {topic}}: PageProps) {
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=3&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
  const images: UnsplashImage[] = await response.json();


  return (
    <div>
      <p>
        This page uses <b> generateStaticParams </b> to render and cache static pages at build time, even though the URL has a  dynamic parameter. Pages that aer not included in the getStaticParams will be fetched & rendered on first access and then <b> cached for subsequent requests </b> (this can be disabled)
      </p>
      <h1>{ topic }</h1> 
      {
        images.map(image => (
          <Image 
            src={image.urls.raw}
            alt={image.description}
            width={250}
            height={250}
            key={image.urls.raw}
            className={styles.image}
          />
        ))
      }
    </div>
  );
}