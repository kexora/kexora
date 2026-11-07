import React, { useState } from 'react';
import { Dropdown } from '../Dropdown';
import {
  FileCode,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Code,
  ShieldCheck,
  Info,
} from 'lucide-react';

export const SchemaBuilderTool: React.FC = () => {
  const [schemaType, setSchemaType] = useState<
    'Organization' | 'ProfessionalService' | 'WebSite'
  >('Organization');
  const [companyName, setCompanyName] = useState('Kexora');
  const [siteUrl, setSiteUrl] = useState('https://www.kexora.org');
  const [founderName, setFounderName] = useState('Rajan Singh');
  const [city, setCity] = useState('Siwan');
  const [state, setState] = useState('Bihar');
  const [postalCode, setPostalCode] = useState('841226');
  const [country, setCountry] = useState('IN');
  const [copiedCode, setCopiedCode] = useState(false);

  const generatedSchema = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: companyName,
      url: siteUrl,
      ...(schemaType !== 'WebSite' && {
        founder: {
          '@type': 'Person',
          name: founderName,
          jobTitle: 'CEO & Strategy Head',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: city,
          addressRegion: state,
          postalCode: postalCode,
          addressCountry: country,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          availableLanguage: ['English', 'Hindi'],
        },
      }),
      description:
        'High-performance custom web design, mobile app & game development, e-commerce, and AI-SEO engineering.',
    },
    null,
    2
  );

  const fullEmbedSnippet = `<script type="application/ld+json">\n${generatedSchema}\n</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullEmbedSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-950">
      {/* Top Header */}
      <div className="p-6 sm:p-8 border-b border-zinc-200 bg-zinc-50/60">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Google SERP Sitelinks Ready · Schema.org Validated</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-[Outfit]">
            Schema.org JSON-LD Structured Data Builder
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            Build clean, syntax-validated Schema.org JSON-LD snippets. Embed them in your site header to earn rich Google Sitelinks, Knowledge Graph cards, and AI Overview citations.
          </p>
        </div>
      </div>

      {/* Main Grid: Form Left, Code Right */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-4">
            <Dropdown
              id="schema-type-select"
              label="1. Schema Entity Type"
              value={schemaType}
              onChange={(val) => setSchemaType(val as any)}
              options={[
                {
                  value: 'Organization',
                  label: 'Organization',
                  sublabel: 'Brand & Corporate Identity',
                },
                {
                  value: 'ProfessionalService',
                  label: 'ProfessionalService',
                  sublabel: 'Agencies, Consultancies & Pricing',
                },
                {
                  value: 'WebSite',
                  label: 'WebSite',
                  sublabel: 'Google SERP Sitelinks & SearchBox',
                },
              ]}
            />

            <div>
              <label
                htmlFor="brand-name-input"
                className="text-xs font-bold text-zinc-800 block mb-1"
              >
                2. Brand / Legal Entity Name
              </label>
              <input
                id="brand-name-input"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Kexora Studio"
                className="w-full px-3.5 py-2.5 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="canonical-url-input"
                className="text-xs font-bold text-zinc-800 block mb-1"
              >
                3. Canonical Website URL
              </label>
              <input
                id="canonical-url-input"
                type="url"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                placeholder="https://www.yourdomain.com"
                className="w-full px-3.5 py-2.5 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors"
              />
            </div>

            {schemaType !== 'WebSite' && (
              <>
                <div>
                  <label
                    htmlFor="founder-name-input"
                    className="text-xs font-bold text-zinc-800 block mb-1"
                  >
                    4. Founder or Key Principal
                  </label>
                  <input
                    id="founder-name-input"
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="e.g. Rajan Singh"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="city-input"
                      className="text-xs font-bold text-zinc-800 block mb-1"
                    >
                      5. City
                    </label>
                    <input
                      id="city-input"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Siwan"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state-input"
                      className="text-xs font-bold text-zinc-800 block mb-1"
                    >
                      State / Postal
                    </label>
                    <input
                      id="state-input"
                      type="text"
                      value={`${state} · ${postalCode}`}
                      onChange={(e) => {
                        const parts = e.target.value.split('·');
                        setState(parts[0]?.trim() || '');
                        if (parts[1]) setPostalCode(parts[1].trim());
                      }}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-1.5">
            <div className="font-bold text-zinc-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-zinc-700" />
              <span>Where to embed this code?</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Paste this <code className="text-zinc-950 font-mono font-bold">&lt;script&gt;</code> block inside your HTML <code className="text-zinc-950 font-mono font-bold">&lt;head&gt;</code> section. Test with Google’s official Rich Results Test for instant verification.
            </p>
          </div>
        </div>

        {/* Live Code Preview */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="rounded-2xl bg-zinc-950 text-white border border-zinc-800 overflow-hidden shadow-lg flex-1 flex flex-col">
            <div className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/90 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-zinc-400 pl-2">
                  index.html &gt; &lt;head&gt;
                </span>
              </div>

              <button
                type="button"
                onClick={copyToClipboard}
                className="px-3.5 py-1.5 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Copy JSON-LD</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-5 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed flex-1 max-h-[380px] overscroll-contain">
              <code>{fullEmbedSnippet}</code>
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-zinc-500 px-1 gap-2">
            <span>Standard: Schema.org v26.0 · JSON-LD Spec</span>
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-zinc-950 hover:underline inline-flex items-center gap-1"
            >
              <span>Validate on Google Rich Results Test</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
