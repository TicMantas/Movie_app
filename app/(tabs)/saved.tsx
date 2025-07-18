import { View, Text, FlatList, ScrollView, Image } from "react-native";
import React from "react";
import { useSavedMovies } from "../store/store";
import MovieCard from "../../components/MovieCard";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

export default function Saved() {
  const { saved } = useSavedMovies();

  return (
    <View className="flex-1 bg-primary px-0 pt-0">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5 mt-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
        }}
      >
          <View className="w-full flex-row justify-center mt-20 items-center">
                  <Image source={icons.logo} className="w-15 h-15" />
                </View>
        {saved.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-lg">No saved movies</Text>
          </View>
        ) : (
          <>
            <Text className="text-white text-3xl font-bold text-center mt-5 mb-10">
              Saved Movies
            </Text>
            <FlatList
              data={saved}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <MovieCard
                  adult={false}
                  backdrop_path={""}
                  genre_ids={[]}
                  original_language={""}
                  original_title={""}
                  overview={""}
                  popularity={0}
                  video={false}
                  vote_count={0}
                  {...item}
                  vote_average={item.vote_average ?? 0}
                  release_date={item.release_date ?? ""}
                />
              )}
              contentContainerStyle={{ gap: 12, flexGrow: 1 }}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}
