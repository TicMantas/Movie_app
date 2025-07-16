import { Client, Databases, ID, Query } from "react-native-appwrite";

//track the searches made by a user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_MOVIE_ID!); // Appwrite Project ID

const database = new Databases(client);
// to count the search queries made by a user
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          searchCount: (existingMovie.searchCount || 0) + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query, // fixed typo from 'searhTerm'
        movie_id: movie.id,
        title: movie.title,
        count: 1, // fixed field name from 'count'
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update search count");
  }
};
// to get the trending searches made by a user
export const getTrendingMovies = async(): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
