import React, { useState } from 'react';
import { SAMPLE_WHATSAPP_EXPORT } from '../../../data/agencyData';
import {
  parseWhatsAppChat,
  filterWhatsAppMessages,
} from '../../../utils/kexoraTools';
import {
  MessageSquare,
  Search,
  Upload,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  FileText,
  User,
  Clock,
} from 'lucide-react';

export const WhatsAppReaderTool: React.FC = () => {
  const [rawWhatsAppText, setRawWhatsAppText] = useState(SAMPLE_WHATSAPP_EXPORT);
  const [senderFilter, setSenderFilter] = useState('all');
  const [chatSearch, setChatSearch] = useState('');
  const [showRawInput, setShowRawInput] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const parsedMessages = parseWhatsAppChat(rawWhatsAppText);
  const uniqueSenders = Array.from(new Set(parsedMessages.map((m) => m.sender)));
  const visibleMessages = filterWhatsAppMessages(
    parsedMessages,
    senderFilter,
    chatSearch
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result;
      if (typeof content === 'string') {
        setRawWhatsAppText(content);
        setSenderFilter('all');
        setShowRawInput(false);
      }
    };
    reader.readAsText(file);
  };

  const resetToSample = () => {
    setRawWhatsAppText(SAMPLE_WHATSAPP_EXPORT);
    setSenderFilter('all');
    setChatSearch('');
    setShowRawInput(false);
  };

  const copyFilteredChat = () => {
    const text = visibleMessages
      .map((m) => `[${m.date} ${m.time}] ${m.sender}: ${m.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-950">
      {/* Top Interactive Toolbar */}
      <div className="p-6 sm:p-8 border-b border-zinc-200 bg-zinc-50/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% In-Browser Memory · 0 Server Uploads</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-[Outfit]">
              WhatsApp Chat Log Parser &amp; Filter
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl">
              Inspect exported WhatsApp <code className="text-zinc-950 font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-zinc-200">.txt</code> conversation files in real-time. Isolate specific senders, query milestone agreements, and extract project briefs without data leakage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <label className="px-4 py-2.5 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-xl cursor-pointer flex items-center gap-2 transition-all shadow-xs whitespace-nowrap shrink-0">
              <Upload className="w-4 h-4 text-zinc-950" />
              <span>Upload .txt File</span>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => setShowRawInput(!showRawInput)}
              className="px-4 py-2.5 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showRawInput ? 'Close Text Editor' : 'Paste Raw Chat Log'}</span>
            </button>

            <button
              type="button"
              onClick={resetToSample}
              aria-label="Reset to sample chat"
              title="Reset to sample chat"
              className="p-2.5 text-zinc-600 hover:text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-xl transition-colors shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Raw Chat Textarea */}
        {showRawInput && (
          <div className="mt-6 pt-5 border-t border-zinc-200 space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="whatsapp-raw-textarea"
                className="text-xs font-bold text-zinc-900 block"
              >
                Paste Exported WhatsApp Text Lines:
              </label>
              <span className="text-[11px] font-mono text-zinc-500">
                Supports iOS &amp; Android standard export formats
              </span>
            </div>
            <textarea
              id="whatsapp-raw-textarea"
              rows={6}
              value={rawWhatsAppText}
              onChange={(e) => setRawWhatsAppText(e.target.value)}
              placeholder="Paste raw WhatsApp export lines here (e.g. 18/10/2026, 10:12 am - Name: Message)..."
              className="w-full p-4 rounded-xl bg-white border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10 leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search WhatsApp messages"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search quotes, terms, prices, dates..."
              className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 transition-colors"
            />
            {chatSearch && (
              <button
                type="button"
                onClick={() => setChatSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700"
              >
                Clear
              </button>
            )}
          </div>

          <div className="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1">
              <User className="w-3 h-3" />
              Filter Sender:
            </span>

            <button
              type="button"
              onClick={() => setSenderFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                senderFilter === 'all'
                  ? 'bg-zinc-950 text-white font-bold shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70 border border-zinc-200'
              }`}
            >
              All Senders ({parsedMessages.length})
            </button>

            {uniqueSenders.map((sender) => (
              <button
                key={sender}
                type="button"
                onClick={() => setSenderFilter(sender)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  senderFilter === sender
                    ? 'bg-zinc-950 text-white font-bold shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70 border border-zinc-200'
                }`}
              >
                {sender}
              </button>
            ))}
          </div>
        </div>

        {/* Message Feed Display */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 overflow-hidden">
          <div className="px-5 py-3 border-b border-zinc-200 bg-white flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-800">
                Displaying {visibleMessages.length} of {parsedMessages.length} Messages
              </span>
              {senderFilter !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">
                  Sender: {senderFilter}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={copyFilteredChat}
              disabled={visibleMessages.length === 0}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 disabled:opacity-40 transition-colors"
            >
              {copiedSnippet ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Copy Filtered Log</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 sm:p-6 max-h-[480px] overflow-y-auto space-y-3.5 overscroll-contain">
            {visibleMessages.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <MessageSquare className="w-8 h-8 text-zinc-300 mx-auto" />
                <div className="text-sm font-semibold text-zinc-700">No matching messages found</div>
                <div className="text-xs text-zinc-500">
                  Try clearing your search query or switching to all participants.
                </div>
              </div>
            ) : (
              visibleMessages.map((msg) => {
                const isKexora = msg.sender.toLowerCase().includes('kexora');
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isKexora ? 'items-start' : 'items-end'
                    }`}
                  >
                    <div
                      className={`max-w-xl sm:max-w-2xl p-4 rounded-2xl border shadow-xs transition-all ${
                        isKexora
                          ? 'bg-white border-zinc-200 text-zinc-900 rounded-tl-sm'
                          : 'bg-zinc-950 border-zinc-950 text-white rounded-tr-sm'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-between gap-4 text-[11px] pb-1.5 mb-1.5 border-b ${
                          isKexora
                            ? 'text-zinc-500 border-zinc-100'
                            : 'text-zinc-300 border-zinc-800'
                        }`}
                      >
                        <span className="font-bold tracking-tight">
                          {msg.sender}
                        </span>
                        <span className="font-mono tabular-nums flex items-center gap-1">
                          <Clock className="w-3 h-3 opacity-60" />
                          {msg.date} · {msg.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line font-normal">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
