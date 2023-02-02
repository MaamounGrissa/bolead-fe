import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import ressourceSlice from "./ressources/ressourceSlice";
import clientSlice from "./clients/clientSlice";
import projetSlice from "./projets/projetSlice";

export const store = configureStore({
    reducer: {
        ressources: ressourceSlice,
        clients: clientSlice,
        projets: projetSlice,
    }
})

export const useAppDispatch:() => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;