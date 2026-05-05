import { useState, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

const defaultNotes: Note[] = [
  { id: "1", title: "Computer Fundamentals Key Points", content: "• CPU = ALU + CU + Registers\n• 1 KB = 1024 Bytes\n• Cache Memory is fastest\n• ROM is non-volatile\n• RAM is volatile\n• 3rd Gen = IC (Integrated Circuits)\n• 4th Gen = Microprocessor\n• Binary = Base 2, Octal = Base 8, Hex = Base 16", category: "Computer", createdAt: new Date().toISOString() },
  { id: "2", title: "Important Keyboard Shortcuts", content: "• Ctrl+C = Copy\n• Ctrl+V = Paste\n• Ctrl+Z = Undo\n• Ctrl+Y = Redo\n• Ctrl+S = Save\n• Ctrl+P = Print\n• Ctrl+A = Select All\n• F5 = Slide Show (PPT)\n• F7 = Spell Check (Word)\n• Ctrl+; = Current Date (Excel)", category: "Shortcuts", createdAt: new Date().toISOString() },
  { id: "3", title: "Excel Functions", content: "• =SUM(A1:A10)\n• =AVERAGE(A1:A10)\n• =COUNT(A1:A10)\n• =MAX(A1:A10)\n• =MIN(A1:A10)\n• =IF(condition, true, false)\n• =VLOOKUP(value, range, col, FALSE)\n• =CONCATENATE(A1, B1)\n• =TODAY()\n• =NOW()", category: "Excel", createdAt: new Date().toISOString() },
  { id: "4", title: "Nepal IT Laws Summary", content: "• Electronic Transaction Act, 2063 BS\n• ICT Policy, 2072 BS\n• NITC = National Information Technology Center\n• NTA = Nepal Telecommunications Authority\n• DoIT = Department of Information Technology\n• Digital Signature = ETA 2063\n• Cyber Crime punishable under ETA", category: "Legislation", createdAt: new Date().toISOString() },
];

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("loksewa-notes");
    return saved ? JSON.parse(saved) : defaultNotes;
  });
  const [editing, setEditing] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("loksewa-notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!title.trim()) return;
    if (editing) {
      setNotes(notes.map(n => n.id === editing.id ? { ...n, title, content, category } : n));
    } else {
      setNotes([{ id: Date.now().toString(), title, content, category, createdAt: new Date().toISOString() }, ...notes]);
    }
    setTitle(""); setContent(""); setCategory("General"); setEditing(null);
  };

  const deleteNote = (id: string) => setNotes(notes.filter(n => n.id !== id));

  const editNote = (note: Note) => {
    setEditing(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl font-heading font-bold mb-2">📒 Notes</h1>
      <p className="text-muted-foreground mb-6">आफ्ना नोट्स राख्नुहोस् र अध्ययन गर्नुहोस्।</p>

      {/* Add/Edit */}
      <div className="bg-card rounded-2xl shadow-md p-6 mb-6">
        <h2 className="font-heading font-bold mb-3">{editing ? "✏️ Edit Note" : "➕ Add New Note"}</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title..." className="w-full p-3 rounded-xl border bg-background mb-3 text-sm" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your notes here..." className="w-full p-3 rounded-xl border bg-background mb-3 text-sm resize-none h-32" />
        <div className="flex gap-3">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded-xl border bg-background text-sm">
            {["General", "Computer", "Networking", "Excel", "Word", "Shortcuts", "Legislation", "GK", "OS"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button onClick={saveNote} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            {editing ? "Update" : "Save"}
          </button>
          {editing && <button onClick={() => { setEditing(null); setTitle(""); setContent(""); }} className="bg-muted px-4 py-2 rounded-xl">Cancel</button>}
        </div>
      </div>

      {/* Search */}
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search notes..." className="w-full p-3 rounded-xl border bg-card mb-6 text-sm" />

      {/* Notes List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((note) => (
          <div key={note.id} className="bg-card rounded-2xl shadow-md p-5 card-hover">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">{note.category}</span>
              <div className="flex gap-1">
                <button onClick={() => editNote(note)} className="text-xs text-muted-foreground hover:text-primary">✏️</button>
                <button onClick={() => deleteNote(note.id)} className="text-xs text-muted-foreground hover:text-destructive">🗑️</button>
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-2">{note.title}</h3>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-body">{note.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
