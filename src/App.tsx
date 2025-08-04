import "./App.css";
import data from "../data.json";
import CommentCard from "./components/CommentCard";
import Form from "./components/Form";

function App() {
  const comments = data.comments;

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <>
          <CommentCard
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            username={comment.user.username}
            userImg={comment.user.image.webp}
          />

          {comment.replies && (
            <div className="flex flex-col gap-4 border-l-2 border-grey-100 pl-4">
              {comment.replies.map((reply) => (
                <CommentCard
                  content={reply.content}
                  createdAt={reply.createdAt}
                  score={reply.score}
                  username={reply.user.username}
                  userImg={reply.user.image.webp}
                  replyingTo={reply.replyingTo}
                />
              ))}
            </div>
          )}
        </>
      ))}

      <Form />
    </div>
  );
}

export default App;
