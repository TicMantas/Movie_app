import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} className="w-[30%] mb-5">
      <TouchableOpacity className="relative">
       <View className="w-full aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden">
  <Image
    source={{
      uri: poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "https://via.placeholder.com/600x400/1a1a1a/ffffff.png",
    }}
    className="w-full h-full rounded-lg"
    resizeMode="cover"
  />
        </View>
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
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
