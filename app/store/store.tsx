import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Movie = {
  id: number;
  poster_path?: string;
  title: string;
  vote_average?: number;
  release_date?: string;
  // kiti laukai jei reikia
};

type SavedMoviesStore = {
  saved: Movie[];
  toggle: (movie: Movie) => void;
  isSaved: (id: number) => boolean;
};

export const useSavedMovies = create<SavedMoviesStore>()(
  persist(
    (set, get) => ({
      saved: [],
      toggle: (movie) =>
        set((state) =>
          state.saved.find((m) => m.id === movie.id)
            ? { saved: state.saved.filter((m) => m.id !== movie.id) }
            : { saved: [...state.saved, movie] }
        ),
      isSaved: (id) => !!get().saved.find((m) => m.id === id),
    }),
    {
      name: "saved-movies-storage", // storage key
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);