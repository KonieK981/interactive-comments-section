import "./App.css";
import data from "../data.json";
import CommentCard from "./components/CommentCard";

function App() {
  return (
    <div className="flex flex-col">
      {data.comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </div>
  );
}

export default App;
