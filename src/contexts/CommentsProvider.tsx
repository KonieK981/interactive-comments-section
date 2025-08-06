import type { ReactNode } from "react";
import { CommentsContext } from "./CommentsContext";
import { useComments } from "../hooks/useComments";

export function CommentsProvider({ children }: { children: ReactNode }) {
  const {
    comments,
    currentUser,
    isModalOpen,
    setIsModalOpen,
    deleteModalData,
    setDeleteModalData,
    handleScore,
    addComments,
    editComments,
    removeComments,
  } = useComments();

  return (
    <CommentsContext.Provider
      value={{
        comments,
        currentUser,
        isModalOpen,
        setIsModalOpen,
        deleteModalData,
        setDeleteModalData,
        handleScore,
        addComments,
        editComments,
        removeComments,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
