import Navbar from "./Navbar.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoteCard from "./Note/NoteCard";
import NoteModal from "./Note/NoteModal";
import SearchBar from "./SearchBar";
import "./Note/notes.css";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState("");

  const token = useSelector((state) => state.auth.token);

  /* ---------- GET ALL NOTES ---------- */
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API}/notes/show-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) setNotes(data);
    } catch (err) {
      console.error("Fetch notes failed", err);
    }
  };

  /* ---------- SEARCH NOTES ---------- */
  const searchNotes = async (query) => {
    if (!query.trim()) {
      fetchNotes();
      return;
    }

    try {
      const res = await fetch(
        `${API}/notes/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) setNotes(data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  /* ---------- CRUD ---------- */
  const handleSave = async (title, content) => {
    const url = editingNote
      ? `${API}/notes/edit/${editingNote._id}`
      : `${API}/notes/add`;

    const method = editingNote ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    setShowModal(false);
    setEditingNote(null);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    await fetch(`${API}/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchNotes();
  };

  return (
    <>
      <Navbar />

      <div className="home">
        <div className="home-header">
          <h2>My Notes</h2>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Note
          </button>
        </div>

        {/* 🔍 Search Component */}
        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            searchNotes(val);
          }}
        />

        {notes.length === 0 ? (
          <p className="empty-text">
            {search ? "No matching notes found" : "No notes yet"}
          </p>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={() => {
                  setEditingNote(note);
                  setShowModal(true);
                }}
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
