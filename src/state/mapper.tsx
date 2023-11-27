import axios from "axios";
import { Movie, MovieDetails } from "./api.types";
import { ApiErrorType } from "./favmovie.types";

export function movieDetailsToMovie(details: MovieDetails): Movie {
  return {
    adult: details.adult!,
    backdrop_path: details.backdrop_path!,
    genre_ids: details.genres!.map((g) => g.id!),
    id: details.id!,
    original_language: details.original_language!,
    original_title: details.original_title!,
    overview: details.overview!,
    popularity: details.popularity!,
    poster_path: details.poster_path!,
    release_date: details.release_date!,
    title: details.title!,
    video: details.video!,
    vote_average: details.vote_average!,
    vote_count: details.vote_count!,
  };
}

export function errorToMessage(errorMessage?: ApiErrorType) {
  let message = "";
  if (axios.isAxiosError(errorMessage)) {
    console.error(errorMessage);
    message = errorMessage.status ? `${errorMessage.status}: ` : "" + errorMessage.response?.data?.status_message;
  } else if (errorMessage instanceof Error) {
    message = errorMessage.message;
  } else if (typeof errorMessage === "string") {
    message = errorMessage;
  }

  return message;
}

export function releaseDateToYear(releaseDate: string): string {
  return releaseDate.substring(0, 4);
}

export function releaseDatePretty(releaseDate: string): string {
  return new Date(releaseDate).toLocaleDateString();
}

export function voteFormatter(voteAvarege: number, precision = 1): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(voteAvarege * multiplier) / multiplier;
}