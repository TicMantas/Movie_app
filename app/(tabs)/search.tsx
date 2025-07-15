import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";



export default function Search() {
const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    error: moviesError,
    loading: moviesLoading,
    refetch: loadMovies,
    reset
  } = useFetch(() =>
    fetchMovies({
      query: searchQuery
    }), false
  );

  useEffect(() => {
    const search = setTimeout( async () => {
    if (searchQuery.trim()) {
      await loadMovies();
    }else {
      reset();
    }
  }, 500)
  return () => clearTimeout(search);
  },[loadMovies, reset, searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListHeaderComponent={
          <>
        <View className="w-full flex-row justify-center mt-20 items-center">
          <Image source={icons.logo} className="w-15 h-15" />
        </View>
        <View className="my-5">
          <SearchBar 
          placeholder="Search your favorite movie ..."
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
          />
        </View>
        {moviesLoading && (
          <View className="items-center justify-center my-5">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {moviesError && (
          <Text className="text-red-500 text-center mt-5">
            Error : {moviesError.message}
            </Text>
        )}

        {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
          <Text className='text-xl text-white font-bold'>
            Search Results for {'   '}
            <Text className='text-accent'>{searchQuery}</Text>
          </Text>
        )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View>
            <Text className="text-gray-500 text-center mt-5">
              {searchQuery.trim() ? "No results found" : "Search for movies to see results"}
            </Text>
            </View>
          ): null
        }
      />
        </View>
  );
}
