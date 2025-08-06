import { useComments } from "../contexts/CommentsContext";
import Button from "./buttons/Button";

const Form = ({ type = "comment", userId, action }) => {
  const { addComments, currentUser } = useComments();
  const img = (
    <img src={currentUser.image.webp} alt="User avatar" className="w-8 h-8" />
  );

  const handleAddComments = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get("comment"); //validar q tenga datos
    addComments(type, content, userId);
    e.target.reset();
    action(false);
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 md:flex ">
      <div className="hidden md:block">{img}</div>
      <form
        onSubmit={handleAddComments}
        className="w-full inline-flex flex-col md:flex-row gap-4"
      >
        <textarea
          name="comment"
          id=""
          rows={4}
          className="py-2 px-5 border-2 rounded-md border-grey-50 cursor-pointer md:flex-1"
          placeholder="Add a comment..."
        ></textarea>
        <footer className="mt-2 inline-flex justify-between md:block">
          <div className="md:hidden">{img}</div>
          <Button
            text="SEND"
            alt="Send button"
            classProps="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-200"
            spanProps="text-md"
            type="submit"
          />
        </footer>
      </form>
    </div>
  );
};

export default Form;
