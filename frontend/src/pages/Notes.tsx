import { useEffect, useMemo, useState } from 'react';

interface NoteItem {
    id: string;
    title: string;
    content: string;
    date: string;
}

const LOCAL_KEY = 'lifetracker-notes';

const Notes = () => {
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_KEY);
        setNotes(saved ? JSON.parse(saved) : []);
    }, []);

    const saveNotes = (updated: NoteItem[]) => {
        setNotes(updated);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setEditingId(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const now = new Date();
        const note: NoteItem = {
            id: editingId || `${Date.now()}`,
            title: title.trim() || 'Untitled note',
            content: content.trim() || 'No content yet.',
            date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };

        const updated = editingId ? notes.map((item) => item.id === editingId ? note : item) : [note, ...notes];
        saveNotes(updated);
        resetForm();
    };

    const handleEdit = (note: NoteItem) => {
        setEditingId(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleDelete = (id: string) => {
        saveNotes(notes.filter((note) => note.id !== id));
    };

    const noteCount = notes.length;
    const latestNote = useMemo(() => notes[0], [notes]);

    return (
        <div className="page-shell animate-fade-in">
            <div className="mb-10">
                <span className="badge">Notes</span>
                <h1 className="page-title mt-4">Keep your ideas in one place</h1>
                <p className="section-subtitle">Write quick notes, edit them later, and keep your reminders close at hand.</p>
            </div>

            <div className="glass-card p-6 mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Notes</p>
                        <h2 className="text-2xl font-semibold text-white">{noteCount} saved note{noteCount === 1 ? '' : 's'}</h2>
                    </div>
                    {latestNote && (
                        <div className="text-right text-sm text-slate-400">
                            Latest: {latestNote.date}
                        </div>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-card p-6 mb-8">
                <label className="block mb-4">
                    <span className="field-label">Title</span>
                    <input value={title} onChange={(event) => setTitle(event.target.value)} className="input-field" placeholder="Note title" />
                </label>
                <label className="block mb-4">
                    <span className="field-label">Content</span>
                    <textarea value={content} onChange={(event) => setContent(event.target.value)} className="input-field min-h-[140px] resize-none" placeholder="Write something helpful..." />
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button type="submit" className="primary-btn w-full sm:w-auto">
                        {editingId ? 'Save changes' : 'Add note'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="tab-button bg-slate-800 text-white hover:bg-slate-700">
                            Cancel edit
                        </button>
                    )}
                </div>
            </form>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => (
                    <article key={note.id} className="note-card">
                        <div className="note-content">
                            <h3 className="note-title">{note.title}</h3>
                            <p className="note-text">{note.content}</p>
                            <p className="note-date">{note.date}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap mt-4">
                            <button type="button" onClick={() => handleEdit(note)} className="text-xs px-3 py-1.5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 transition">
                                Edit
                            </button>
                            <button type="button" onClick={() => handleDelete(note.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/30 bg-red-400/10 text-red-300 hover:bg-red-400/20 transition">
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </div>
            <button type="button" className="floating-add-button" onClick={() => setEditingId(null)}>
                +
            </button>
        </div>
    );
};

export default Notes;
