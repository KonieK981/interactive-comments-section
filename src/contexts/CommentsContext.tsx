import { createContext, useContext, useState } from "react";
import data from "../../data.json";

const CommentsContext = createContext(null);

export function CommentsProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(data.currentUser);
  const [comments, setComments] = useState(data.comments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScore = (id, action) => {
    const newComments = comments.map((comment) => {
      const newComment = comment;
      if (comment.id === id) {
        newComment.score += action === "up" ? 1 : -1;
        return newComment;
      }

      const reply = comment.replies.find((el) => el.id === id);
      if (reply) {
        reply.score += action === "up" ? 1 : -1;
        return reply;
      }
      return newComment;
    });

    setComments(newComments);
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        currentUser,
        isModalOpen,
        setIsModalOpen,
        handleScore,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export const useComments = () => useContext(CommentsContext);
