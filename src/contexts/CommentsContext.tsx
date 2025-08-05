import { createContext, useContext, useState } from "react";
import data from "../../data.json";

const CommentsContext = createContext(null);

export function CommentsProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(data.currentUser);
  const [comments, setComments] = useState(data.comments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const handleScore = (id, action) => {
    const updateComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          score: comment.score + (action === "up" ? 1 : -1),
        };
      }

      const updatedReplies = comment.replies.map((reply) => {
        if (reply.id === id) {
          return {
            ...reply,
            score: reply.score + (action === "up" ? 1 : 1),
          };
        }
        return reply;
      });

      return { ...comment, replies: updatedReplies };
    });
    setComments(updateComments);
  };

  const addComments = () => {};

  const editComments = (id, value) => {};

  const removeComments = () => {
    if (deleteModalData) {
      const id = deleteModalData;
      const newComments = comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== id),
        }));

      setComments(newComments);
      setIsModalOpen(false);
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        currentUser,
        isModalOpen,
        setIsModalOpen,
        handleScore,
        removeComments,
        deleteModalData,
        setDeleteModalData,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export const useComments = () => useContext(CommentsContext);
