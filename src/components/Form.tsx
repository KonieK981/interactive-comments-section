import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import Button from "./buttons/Button";
import type { FormProps } from "../types";
import { CommentsContext } from "../contexts/CommentsContext";

const Form = ({ commentData, id, action }: FormProps) => {
  const { addComments, editComments, currentUser } =
    useContext(CommentsContext);
  const [formData, setFormData] = useState({ commentText: "" });

  const type = commentData ? "edit" : "comment";

  const img = (
    <img src={currentUser.image.webp} alt="User avatar" className="w-8 h-8" />
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, commentText: e.target.value });
  };

  const handleAddComments = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComments(formData.commentText, id);
    setFormData({ commentText: "" });
    if (action) action(false);
  };

  const handleEditComments = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editComments(id, formData.commentText);
    (e.target as HTMLFormElement).reset();
    if (action) action(false);
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 md:flex ">
      <div className="hidden md:block">{img}</div>
      <form
        onSubmit={type !== "edit" ? handleAddComments : handleEditComments}
        className="w-full inline-flex flex-col md:flex-row gap-4 md:ml-4"
      >
        <textarea
          name="comment"
          id=""
          rows={4}
          value={formData.commentText}
          onChange={handleChange}
          className="py-2 px-5 border-2 rounded-md border-grey-50 cursor-pointer md:flex-1"
          placeholder="Add a comment..."
        ></textarea>
        <footer className="mt-2 inline-flex justify-between md:block">
          <div className="md:hidden">{img}</div>
          <Button
            text={type === "comment" ? "SEND" : "Update"}
            alt="Send button"
            classProps="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-200"
            spanProps="text-md"
            type="submit"
            disabled={formData.commentText.trim() === ""}
          />
        </footer>
      </form>
    </div>
  );
};

export default Form;
