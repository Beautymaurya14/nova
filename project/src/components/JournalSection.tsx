import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  completed: string;
  learned: string;
  notes: string;
}

interface JournalSectionProps {
  onClose: () => void;
}

export const JournalSection = ({ onClose }: JournalSectionProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({
    completed: '',
    learned: '',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (!newEntry.completed && !newEntry.learned && !newEntry.notes) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      completed: newEntry.completed,
      learned: newEntry.learned,
      notes: newEntry.notes
    };

    setEntries([entry, ...entries]);
    setNewEntry({ completed: '', learned: '', notes: '' });
    setIsAdding(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-slate-700 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Daily Journal</h2>
                  <p className="text-slate-400">Track your daily progress and learnings</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Journal Entry
              </button>
            </div>

            {isAdding && (
              <div className="bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Today's Entry</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      What did you complete today?
                    </label>
                    <textarea
                      value={newEntry.completed}
                      onChange={(e) => setNewEntry({ ...newEntry, completed: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      rows={3}
                      placeholder="List tasks, goals, or milestones you completed..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      What did you learn?
                    </label>
                    <textarea
                      value={newEntry.learned}
                      onChange={(e) => setNewEntry({ ...newEntry, learned: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      rows={3}
                      placeholder="New concepts, skills, or insights gained..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      rows={3}
                      placeholder="Challenges faced, resources used, thoughts..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddEntry}
                      className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-semibold"
                    >
                      Save Entry
                    </button>
                    <button
                      onClick={() => setIsAdding(false)}
                      className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {entries.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500">No journal entries yet. Start documenting your journey!</p>
                </div>
              ) : (
                entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                        <span className="text-slate-400 text-sm">{formatDate(entry.date)}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {entry.completed && (
                      <div className="mb-4">
                        <h4 className="text-emerald-400 font-semibold mb-2">Completed</h4>
                        <p className="text-slate-300 whitespace-pre-wrap">{entry.completed}</p>
                      </div>
                    )}

                    {entry.learned && (
                      <div className="mb-4">
                        <h4 className="text-blue-400 font-semibold mb-2">Learned</h4>
                        <p className="text-slate-300 whitespace-pre-wrap">{entry.learned}</p>
                      </div>
                    )}

                    {entry.notes && (
                      <div>
                        <h4 className="text-purple-400 font-semibold mb-2">Notes</h4>
                        <p className="text-slate-300 whitespace-pre-wrap">{entry.notes}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
