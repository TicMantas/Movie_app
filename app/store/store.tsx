import {create} from 'zustand';

type Movie ={
    id: number
    poster_path: string
    title: string
    vote_average?: number;
    release_date?: string;
}

type SavedMoviesStore = {
    saved: Movie[];
    toggle: (movie: Movie) => void;
    isSaved: (id: number) => boolean; 
};

export const useSavedMovies = create<SavedMoviesStore>((set, get) => ({
    saved: [],
    toggle: (movie) =>
        set((state) => 
            state.saved.find((m) => m.id === movie.id)
                ? { saved: state.saved.filter((m) => m.id !== movie.id) }
                : { saved: [...state.saved, movie] }
        ),
    isSaved: (id) => !!get().saved.find((m) => m.id === id)
}));
