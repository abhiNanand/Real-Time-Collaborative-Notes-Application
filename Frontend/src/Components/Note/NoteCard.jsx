import { toast } from "react-toastify";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title || "Untitled"}</h3>
        <div className="note-actions">
          <button onClick={onEdit}>✏️</button>
          <button onClick={onDelete}>🗑</button>
          <button
  onClick={() => {
    const link = `${window.location.origin}/note/${note._id}`;
    navigator.clipboard.writeText(link);
    toast.success("link copied to clipboard!");
  }}
>
  🔗 Share
</button>


        </div>
      </div>

      <p>{note.content || "No content"}</p>

      <div className="note-footer">
        <span>Updated: {note.updatedAt}</span>
      </div>
    </div>
  );
}
