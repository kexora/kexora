import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, Search } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
}

export interface DropdownGroup {
  label: string;
  options: DropdownOption[];
}

export interface DropdownProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options?: DropdownOption[];
  groups?: DropdownGroup[];
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  value,
  onChange,
  options = [],
  groups = [],
  placeholder = 'Select an option',
  searchable = false,
  searchPlaceholder = 'Filter options...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize all options to find the currently selected item
  const allOptions = useMemo(() => {
    const flatFromGroups = groups.flatMap((g) => g.options);
    return [...options, ...flatFromGroups];
  }, [options, groups]);

  const selectedOption = useMemo(() => {
    return (
      allOptions.find((opt) => opt.value === value) || {
        value,
        label: value || placeholder,
      }
    );
  }, [allOptions, value, placeholder]);

  // Filter options/groups when searchable is enabled
  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        options: group.options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(q) ||
            (opt.sublabel && opt.sublabel.toLowerCase().includes(q)) ||
            group.label.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.options.length > 0);
  }, [groups, searchQuery]);

  const filteredFlatOptions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.sublabel && opt.sublabel.toLowerCase().includes(q))
    );
  }, [options, searchQuery]);

  // Smart viewport positioning: check if menu should open upward or downward
  const toggleDropdown = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpward(spaceBelow < 290 && rect.top > 300);
    }
    setIsOpen((prev) => !prev);
  };

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable) {
      window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 40);
    } else if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen, searchable]);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {label && (
        <label
          htmlFor={id}
          onClick={() => toggleDropdown()}
          className="text-xs font-bold text-zinc-800 block mb-1 cursor-pointer"
        >
          {label}
        </label>
      )}

      {/* Trigger Button — Sleek Smart-Size Pill/Rounded Control */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className={`w-full px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 flex items-center justify-between gap-2 border ${
          isOpen
            ? 'bg-white border-zinc-950 shadow-[0_0_0_3px_rgba(9,9,11,0.06)]'
            : 'bg-[#FAFAFB] border-zinc-300/90 hover:border-zinc-400 hover:bg-white'
        }`}
      >
        <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
          <span className="text-xs sm:text-[13px] font-semibold text-zinc-950 truncate">
            {selectedOption.label}
          </span>
          {selectedOption.sublabel && (
            <span className="text-[11px] font-mono text-zinc-500 tabular-nums shrink-0">
              {selectedOption.sublabel}
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'rotate-180 text-zinc-950' : ''
          }`}
        />
      </button>

      {/* iOS / macOS Frosted Glass Blur Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: openUpward ? 6 : -6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: openUpward ? 4 : -4,
            }}
            transition={{
              duration: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformOrigin: openUpward ? 'bottom center' : 'top center',
            }}
            className={`absolute left-0 right-0 z-50 ${
              openUpward ? 'bottom-full mb-2' : 'top-full mt-2'
            } rounded-2xl bg-white/82 backdrop-blur-2xl saturate-150 border border-zinc-200/85 ring-1 ring-black/[0.04] shadow-[0_22px_50px_-10px_rgba(0,0,0,0.16),0_6px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden`}
          >
            {/* Optional Compact Spotlight Search Bar inside Dropdown */}
            {searchable && (
              <div className="p-2 border-b border-zinc-200/70 bg-white/60">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full pl-8 pr-3 py-1.5 bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white rounded-lg text-xs text-zinc-950 placeholder-zinc-400 border border-transparent focus:border-zinc-300 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Smart-Size Scrollable Menu Body */}
            <div className="max-h-60 overflow-y-auto overscroll-contain p-1.5 space-y-1">
              {/* Flat Options */}
              {filteredFlatOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2.5 transition-all duration-150 ${
                      isSelected
                        ? 'bg-zinc-950 text-white font-semibold shadow-xs'
                        : 'text-zinc-800 hover:bg-zinc-950/[0.06] active:bg-zinc-950/[0.1]'
                    }`}
                  >
                    <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
                      <span className="text-xs truncate">{opt.label}</span>
                      {opt.sublabel && (
                        <span
                          className={`text-[11px] font-mono tabular-nums shrink-0 ${
                            isSelected ? 'text-zinc-300' : 'text-zinc-500'
                          }`}
                        >
                          {opt.sublabel}
                        </span>
                      )}
                    </div>
                    <span className="w-4 h-4 flex items-center justify-center shrink-0">
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                );
              })}

              {/* Grouped Options */}
              {filteredGroups.map((group, gIdx) => (
                <div
                  key={group.label}
                  className={
                    gIdx > 0 || filteredFlatOptions.length > 0
                      ? 'pt-1.5 mt-1 border-t border-zinc-200/60'
                      : ''
                  }
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {group.label}
                  </div>
                  <div className="space-y-0.5">
                    {group.options.map((opt) => {
                      const isSelected = opt.value === value;
                      return (
                        <button
                          key={`${group.label}-${opt.value}`}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelect(opt.value)}
                          className={`w-full px-3 py-1.5 rounded-xl text-left flex items-center justify-between gap-2.5 transition-all duration-150 ${
                            isSelected
                              ? 'bg-zinc-950 text-white font-semibold shadow-xs'
                              : 'text-zinc-800 hover:bg-zinc-950/[0.06] active:bg-zinc-950/[0.1]'
                          }`}
                        >
                          <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
                            <span className="text-xs truncate">{opt.label}</span>
                            {opt.sublabel && (
                              <span
                                className={`text-[11px] font-mono tabular-nums shrink-0 ${
                                  isSelected ? 'text-zinc-300' : 'text-zinc-500'
                                }`}
                              >
                                {opt.sublabel}
                              </span>
                            )}
                          </div>
                          <span className="w-4 h-4 flex items-center justify-center shrink-0">
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {filteredFlatOptions.length === 0 &&
                filteredGroups.length === 0 && (
                  <div className="py-6 text-center text-xs text-zinc-400">
                    No matching services found.
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
