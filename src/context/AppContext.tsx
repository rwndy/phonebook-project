import { createContext, useContext, useState, ReactNode } from "react";
import { FavoriteContact } from "../Models/favourite_contact";
import { contact } from '../Models/get_contact_list'

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  isModalOpen: boolean;
  closeModal: () => void;
  setUserId: (id: number) => void;
  userId: number;
  setIsModalOpen: (val: boolean) => void;
  addFavorites: (contact: contact) => void;
  deleteFavorites: (id: number) => void;
  favorites: FavoriteContact[];
  setFavorites: (val: any) => void;
}


const AppContext = createContext({} as AppContextProps);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: AppProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<FavoriteContact[]>(() => {
    if (typeof window !== "undefined") {
      const saveFavorites = localStorage.getItem("favorites");
      return saveFavorites ? JSON.parse(saveFavorites) : [];
    }
    return [];
  });

  const [userId, setUserId] = useState<number>(0)

  const closeModal = () => {
    setIsModalOpen(false)
    setUserId(0)
  }

  const addFavorites = (contact: contact) => {
  
    const favoriteContact: FavoriteContact = {
      first_name: contact.first_name,  
      last_name: contact.last_name,
      id: contact.id,
      phone: contact.phones[0].number
    };

   const newFavorites = [...favorites, favoriteContact];

   setFavorites(newFavorites);

    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    setIsModalOpen(false)
    setUserId(0)
  }

  const deleteFavorites = (id: number) => {
    const removed = favorites.filter((favorite) => favorite.id !== id)
    setFavorites(removed)

    localStorage.setItem('favorites', JSON.stringify(removed));
    setIsModalOpen(false)
    setUserId(0)
  }

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        closeModal,
        userId,
        setUserId,
        setIsModalOpen,
        addFavorites,
        deleteFavorites,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
