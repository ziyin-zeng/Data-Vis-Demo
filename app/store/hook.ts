// Redux
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// In-Project
import type { RootState, AppDispatch } from "./store";

// instead of use original [useDispatch] & [useSelector], we create our own (to pass the type check of TS)
// Type of [useAppDispatch] is a function, which returns [AppDispatch]
export const useAppDispatch: () => AppDispatch = useDispatch;
// Type of [useAppSelector] is based on [RootState]
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;