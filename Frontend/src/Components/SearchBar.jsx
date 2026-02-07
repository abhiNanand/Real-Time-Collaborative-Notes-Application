import "./Note/notes.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search notes by title or content..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
