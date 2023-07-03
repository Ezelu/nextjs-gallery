export interface UnsplashImage {
  description: string,
  user: {
    username: string,
  },
  urls: {
    raw: string,
  },
  width: number,
  height: number,
}

export interface UnsplashSearchResponse {
  results: UnsplashImage,
}


export interface SearchPageImage {
  description: string,
  user: {
    username: string,
  },
  urls: {
    raw: string,
  },
  width: number,
  height: number,
  results: UnsplashImage[]
}