import { createContext } from "react";
import type { CommentsContextType } from "../types";

export const CommentsContext = createContext<CommentsContextType>(
  {} as CommentsContextType
);
