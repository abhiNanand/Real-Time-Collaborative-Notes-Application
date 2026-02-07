import Navbar from "./Navbar.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoteCard from "./Note/NoteCard";
import NoteModal from "./Note/NoteModal";
import "./Note/notes.css";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const token = useSelector((state) => state.auth.token);

  
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API}/notes/show-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setNotes(data);
      }
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  useEffect(() => {
  if (token) fetchNotes();
}, [token]);



  const handleSave = async (title, content) => {
    try {
      const url = editingNote
        ? `${API}/notes/edit/${editingNote._id}`
        : `${API}/notes/add`;

      const method = editingNote ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        fetchNotes();
        setShowModal(false);
        setEditingNote(null);
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      const res = await fetch(`${API}/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ---------------- UI HELPERS ---------------- */
  const handleAdd = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  return (
    <>
      <Navbar />

      <div className="home">
        <div className="home-header">
          <h2>My Notes</h2>
          <button className="add-btn" onClick={handleAdd}>
            + Add Note
          </button>
        </div>

        {notes.length === 0 ? (
          <p className="empty-text">No notes yet</p>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDelete(note._id)}
              />
            ))}
          </div>
        )}

        {showModal && (
          <NoteModal
            note={editingNote}
            onSave={handleSave}
            onClose={() => {
              setShowModal(false);
              setEditingNote(null);
            }}
          />
        )}
      </div>
    </>
  );
}
