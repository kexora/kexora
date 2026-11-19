import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  Search,
  Plus,
  Users,
  Gift,
  CheckCircle,
  FileSpreadsheet,
  Share2,
} from 'lucide-react';

interface SagunEntry {
  id: string;
  guestName: string;
  relation: string;
  village: string;
  amount: number;
  giftItem?: string;
  date: string;
}

const SAMPLE_ENTRIES: SagunEntry[] = [
  {
    id: '1',
    guestName: 'Pandit Rameshwar Jha',
    relation: 'Family Priest / Guru',
    village: 'Pachrukhi, Siwan',
    amount: 2100,
    giftItem: 'Silver Coin + Shawl',
    date: '06 Nov 2026',
  },
  {
    id: '2',
    guestName: 'Choudhary Brajesh Singh',
    relation: 'Maternal Uncle (Mama Ji)',
    village: 'Maharajganj, Siwan',
    amount: 5100,
    giftItem: 'Gold Chain (10g)',
    date: '06 Nov 2026',
  },
  {
    id: '3',
    guestName: 'Dr. Anand Kumar Verma',
    relation: 'Close Family Friend',
    village: 'Chapra, Saran',
    amount: 1100,
    giftItem: 'Sweets Box',
    date: '06 Nov 2026',
  },
  {
    id: '4',
    guestName: 'Mukhiya Sunita Devi',
    relation: 'Village Head / Neighbor',
    village: 'Barharia, Siwan',
    amount: 1500,
    giftItem: 'Brass Utensil Set',
    date: '06 Nov 2026',
  },
];

export const DigiSagunTool: React.FC = () => {
  const [entries, setEntries] = useState<SagunEntry[]>(SAMPLE_ENTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newVillage, setNewVillage] = useState('');
  const [newAmount, setNewAmount] = useState('1100');

  const filteredEntries = entries.filter(
    (e) =>
      e.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.relation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAmount = entries.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const newEntry: SagunEntry = {
      id: String(Date.now()),
      guestName: newGuestName.trim(),
      relation: newRelation.trim() || 'Guest',
      village: newVillage.trim() || 'Siwan',
      amount: parseInt(newAmount, 10) || 500,
      date: 'Today',
    };

    setEntries([newEntry, ...entries]);
    setNewGuestName('');
    setNewRelation('');
    setNewVillage('');
    setNewAmount('1100');
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-950">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 border-b border-zinc-200 bg-zinc-50/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
              <Smartphone className="w-3.5 h-3.5 text-amber-700" />
              <span>Kexora Flagship PWA · Offline-First Cultural Ledger</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-[Outfit]">
              Digi Sagun — Wedding &amp; Event Gift Ledger PWA Simulator
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl">
              Traditional wedding diary (Sagun Bahi) digitized into a high-speed Progressive Web App. Works offline without internet, stores records in local browser IndexedDB, and generates instant PDF receipts.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2.5 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Cancel Form' : 'Record New Sagun'}</span>
            </button>
          </div>
        </div>

        {/* Add Entry Form Modal/Inline */}
        {showAddForm && (
          <form
            onSubmit={handleAddEntry}
            className="mt-6 pt-5 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >
            <input
              type="text"
              required
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              placeholder="Guest Full Name *"
              className="px-3.5 py-2 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950"
            />
            <input
              type="text"
              value={newRelation}
              onChange={(e) => setNewRelation(e.target.value)}
              placeholder="Relationship (e.g. Mama, Friend)"
              className="px-3.5 py-2 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950"
            />
            <input
              type="text"
              value={newVillage}
              onChange={(e) => setNewVillage(e.target.value)}
              placeholder="Village / City (e.g. Siwan)"
              className="px-3.5 py-2 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950"
            />
            <input
              type="number"
              min="1"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Amount (₹)"
              className="px-3.5 py-2 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Save Entry</span>
            </button>
          </form>
        )}
      </div>

      {/* Main Ledger Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Ledger KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="text-xs uppercase font-bold tracking-wider text-zinc-400">
              Total Sagun Collected
            </div>
            <div className="text-3xl font-extrabold text-zinc-950 tabular-nums mt-1">
              <span className="currency-symbol">₹</span>
              <span className="price-num">{totalAmount.toLocaleString()}</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              {entries.length} Verified Ledger Entries
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="text-xs uppercase font-bold tracking-wider text-zinc-400">
              Offline Capability
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 font-[Outfit] mt-1 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <span>100% Offline</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Zero network dependency
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="text-xs uppercase font-bold tracking-wider text-zinc-400">
              PWA Platform Standard
            </div>
            <div className="text-3xl font-extrabold text-zinc-950 font-[Outfit] mt-1">
              IndexedDB
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Instant PDF &amp; WhatsApp Receipt export
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by guest name, relation, or village..."
            className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors"
          />
        </div>

        {/* Ledger Table */}
        <div className="rounded-2xl border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-100/80 text-zinc-700 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-200">
                <tr>
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Relation</th>
                  <th className="py-3 px-4">Village / Town</th>
                  <th className="py-3 px-4">Gift / Token</th>
                  <th className="py-3 px-4 text-right">Cash Sagun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white">
                {filteredEntries.map((row) => (
                  <tr key={row.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-zinc-950">
                      {row.guestName}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600">{row.relation}</td>
                    <td className="py-3.5 px-4 text-zinc-600">{row.village}</td>
                    <td className="py-3.5 px-4 text-zinc-500 italic">
                      {row.giftItem || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-zinc-950 tabular-nums">
                      <span className="currency-symbol">₹</span>
                      <span className="price-num">{row.amount.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
