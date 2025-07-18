import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import { Svg, Path } from "react-native-svg";
import { useSavedMovies } from "@/app/store/store";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const { toggle, isSaved } = useSavedMovies();
  const saved = isSaved(id);
  return (
    <Link href={`/movie/${id}`} asChild className="w-[30%] mb-5">
      <TouchableOpacity className="relative">
        <View className="w-full aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://via.placeholder.com/600x400/1a1a1a/ffffff.png",
            }}
            className="w-full h-full rounded-lg z-0"
            resizeMode="cover"
          />
          <TouchableOpacity
            className="absolute right-2 p-1 rounded-full"
            onPress={(e) => {
              e.stopPropagation();
              toggle({ id, poster_path, title, vote_average, release_date });
            }}
          >
            <Svg width={24} height={24}>
              <Path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={saved ? "red" : "none"}
                stroke="red"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center gap-1 mt-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-gray-400 font-medium mt-1">
            {new Date(release_date).getFullYear()}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
