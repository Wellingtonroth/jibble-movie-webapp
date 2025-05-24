export interface Movie {
  Title: string
  Year: number
  imdbID: string
}

export interface MovieResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Movie[]
} 