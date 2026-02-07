import { useEffect, useState } from "react";
import { useParams } from "react-router";

const API = import.meta.env.VITE_API_URL;

export default function PublicNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`${API}/notes/public/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Note not found");
        } else {
          setNote(data);
        }
      } catch {
        setError("Something went wrong");
      }
    };

    fetchNote();
  }, [id]);

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  if (!note) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h2>{note.title || "Untitled"}</h2>
      <p style={{ marginTop: 10, whiteSpace: "pre-wrap" }}>
        {note.content}
      </p>
      <p style={{ marginTop: 20, fontSize: 12, color: "#666" }}>
        Read-only shared note
      </p>
    </div>
  );
}
