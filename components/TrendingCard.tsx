import { TouchableOpacity, Image, View, Text } from "react-native";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import React from "react";
import MarkedView from "@react-native-masked-view/masked-view";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
  <TouchableOpacity className="w-32 relative pl-5">
  <View className="w-full aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden">
    <Image
      source={{ uri: poster_url }}
      className="w-full h-52 rounded-lg"
      resizeMode="cover"
    />
  </View>
        <View className="absolute bottom-9 -left-0.25">
          <MarkedView
            maskElement={
              <Text className="text-white text-6xl font-bold" numberOfLines={1}>
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MarkedView>
        </View>

        <Text className="text-white text-sm mt-2" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};
export default TrendingCard;
