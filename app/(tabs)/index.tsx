import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import { useTranslation } from "react-i18next";

export default function Index() {
  const router = useRouter();
  const {t } = useTranslation();

  const {
    data: trendingMovies,
    error: trendingMoviesError,
    loading: trendingMoviesLoading,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    error: moviesError,
    loading: moviesLoading,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-16 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text>
            Error : {moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for movie"
            />

            {trendingMovies && (
              <View className="flex-1 mt-5">
                <Text className="text-white text-lg font-bold mb-3">
                  {t("trending")}
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-" />}
                  className="mb-5 mt-3"
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
              </View>
            )}

            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                {t("popularMovies")} </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard
                    id={item.id}
                    poster_path={item.poster_path}
                    title={item.title}
                    vote_average={item.vote_average}
                    release_date={item.release_date}
                    adult={false}
                    backdrop_path={""}
                    genre_ids={[]}
                    original_language={""}
                    original_title={""}
                    overview={""}
                    popularity={0}
                    video={false}
                    vote_count={0}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
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
          </View>
        )}
      </ScrollView>
    </View>
  );
}
