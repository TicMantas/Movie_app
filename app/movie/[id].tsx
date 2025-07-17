import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-white font-normal text-base mt-1">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(Number(id))
  );
  return (
    <>
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-2xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-1 mt-2">
            <Text className="text-light-200 text-sm font-bold uppercase">
              {movie?.release_date
                ? new Date(movie.release_date).getFullYear()
                : "Unknown Year"}
            </Text>
            <Text className="text-light-200 ml-6 text-sm font-bold uppercase">
              {movie?.runtime
                ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                : "Unknown Runtime"}
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-200 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-6" />
            <Text className="text-light-200 text-sm font-bold uppercase">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-xs font-medium">
              ({movie?.vote_count ?? 0} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview ?? null} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre) => genre.name).join(" - ") ?? null
            }
          />
          <View className="flex flex-row justify-between w-1/2 mt-5">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget !== undefined && movie?.budget !== null
                  ? `$${movie.budget / 1_000_000} million`
                  : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000}`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ?? null
            }
          />
          <MovieInfo label="Status" value={movie?.status ?? null} />
          <MovieInfo
            label="Language"
            value={movie?.original_language?.toUpperCase() ?? null}
          />
        </View>
      </ScrollView>
    </View>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-0"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-6 mr-2 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-bold">Go back</Text>
      </TouchableOpacity>
    </>
    
  );
};

export default MovieDetails;
