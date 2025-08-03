import "./App.css";
import data from "../data.json";
import CommentCard from "./components/CommentCard";

function App() {
  const comments = data.comments;

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentCard
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          username={comment.user.username}
          userImg={comment.user.image.webp}
        />
      ))}
    </div>
  );
}

export default App;
