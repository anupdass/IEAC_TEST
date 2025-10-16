import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, CheckCircle, AlertTriangle } from "lucide-react";
import logo from '../assets/logo.png'

// Single-file React component for the IEAC single-page site.
// Assumes Tailwind CSS + Framer Motion + lucide-react are available in the project.

export default function IEACSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [showModal, setShowModal] = useState(false);
  const [selectedStream, setSelectedStream] = useState("food");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [subscribed, setSubscribed] = useState(false);
  const [kpisOpen, setKpisOpen] = useState(false);

  // Simple scrollspy
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const onScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const sec of sections) {
        if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
          setActive(sec.id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    // placeholder: simulate sending
    setShowModal(true);
    setContact({ name: "", email: "", message: "" });
  }

  // Sample interactive EAR card data
  const earLevels = [
    { id: "bronze", title: "Bronze", desc: "Baseline ethical assurances" },
    { id: "silver", title: "Silver", desc: "Improving practices" },
    { id: "gold", title: "Gold", desc: "Exemplar performance" },
    { id: "platinum", title: "Platinum", desc: "Global model" },
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-gradient-to-b from-white to-slate-50">

      {/* NAV */}
      <header className="fixed w-full z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className=" p-2 ">
              <img src={logo} alt="IEAC" className="h-8 w-auto" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">IEAC</h1>
              <p className="text-xs text-slate-500 bg-red-400">If you deny, consumer will deny.</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            {[
              ["home", "Home"],
              ["about", "Why IEAC"],
              ["model", "Operating Model"],
              ["streams", "Accreditation"],
              ["bridge", "Bridge Programme"],
              ["tech", "Tech & API"],
              ["kpis", "KPIs"],
              ["roadmap", "Roadmap"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className={`text-sm py-2 px-3 rounded-md ${active === id ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                {label}
              </button>
            ))}

            <button
              onClick={() => { setSelectedStream("food"); scrollToId("streams"); }}
              className="ml-3 inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-3 py-2 rounded-md shadow">
              Apply for EAR
            </button>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setMobileOpen((s) => !s)} className="p-2 rounded-md">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 border-t border-slate-200">
            <div className="px-5 py-4 flex flex-col gap-2">
              {[["home", "Home"], ["about", "Why IEAC"], ["model", "Operating Model"], ["streams", "Accreditation"], ["bridge", "Bridge Programme"], ["tech", "Tech & API"], ["kpis", "KPIs"], ["roadmap", "Roadmap"], ["contact", "Contact"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollToId(id)} className={`text-left py-2 ${active === id ? "font-semibold" : "text-slate-700"}`}>{label}</button>
              ))}
              <button onClick={() => { setSelectedStream("food"); scrollToId("streams") }} className="mt-2 bg-emerald-600 text-white px-4 py-2 rounded-md">Apply for EAR</button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        {/* HERO */}
        <section id="home" className="py-20">
          <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="inline-flex items-center gap-2 text-emerald-600 font-medium">Global · Edinburgh HQ · Non-Profit</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">International Ethical Accreditation Council (IEAC)</h2>
              <p className="mt-4 text-lg text-slate-700">We monitor, accredit, and remediate—making truth a competitive advantage for companies and a guardrail for consumers.</p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => scrollToId('about')} className="px-4 py-3 bg-slate-900 text-white rounded-md shadow">Why IEAC</button>
                <button onClick={() => { setSelectedStream('food'); scrollToId('streams') }} className="px-4 py-3 border rounded-md">Explore Accreditation</button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                <div className="p-4 bg-white rounded shadow-sm border">
                  <p className="font-semibold">CRRD Triage</p>
                  <p className="text-slate-500">48-hour triage SLA</p>
                </div>
                <div className="p-4 bg-white rounded shadow-sm border">
                  <p className="font-semibold">EAR Levels</p>
                  <p className="text-slate-500">Bronze → Platinum</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
              <div className="rounded-2xl bg-white shadow-xl p-6 border">
                <h3 className="text-lg font-semibold">Public Dashboard Preview</h3>
                <p className="text-sm text-slate-500 mt-2">Real-time heatmaps, complaint themes, and accredited entities.</p>
                <div className="mt-4 h-56 bg-gradient-to-br from-emerald-50 to-slate-50 rounded-md border-dashed border-2 border-slate-100 flex items-center justify-center">
                  <div className="text-center text-slate-400">(Interactive dashboard preview placeholder)</div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 text-sm py-2 border rounded-md">View Methods</button>
                  <button className="flex-1 text-sm py-2 bg-emerald-600 text-white rounded-md" onClick={() => { setShowModal(true) }}>Report an Issue</button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT / Executive Positioning */}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:flex-1">
                <h3 className="text-2xl font-bold">Why IEAC is the Pioneer</h3>
                <p className="mt-3 text-slate-600">IEAC is the first pro-consumer authority that monitors ethical business conduct in real time, accredits against a rigorous public standard, and remediates real harms quickly.</p>

                <ul className="mt-6 grid md:grid-cols-3 gap-4">
                  <li className="p-4 bg-slate-50 rounded shadow-sm border">
                    <div className="flex items-center gap-3">
                      <CheckCircle />
                      <div>
                        <div className="font-semibold">Monitor</div>
                        <div className="text-sm text-slate-500">Always-on surveillance & product integrity checks.</div>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 bg-slate-50 rounded shadow-sm border">
                    <div className="flex items-center gap-3">
                      <CheckCircle />
                      <div>
                        <div className="font-semibold">Accredit</div>
                        <div className="text-sm text-slate-500">EAR levels with disclosed criteria & renewal audits.</div>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 bg-slate-50 rounded shadow-sm border">
                    <div className="flex items-center gap-3">
                      <CheckCircle />
                      <div>
                        <div className="font-semibold">Remediate</div>
                        <div className="text-sm text-slate-500">Rapid outcomes-based resolution pipeline.</div>
                      </div>
                    </div>
                  </li>
                </ul>

              </div>

              <div className="md:w-80 mt-6 md:mt-0">
                <div className="p-5 rounded-lg border bg-gradient-to-br from-emerald-50 to-white shadow">
                  <h4 className="font-semibold">Vision & Mission</h4>
                  <p className="text-sm text-slate-600 mt-2"><strong>Vision:</strong> A marketplace where truth is standard, fairness is enforced, and consumers choose with confidence.</p>
                  <p className="text-sm text-slate-600 mt-2"><strong>Mission:</strong> Protect consumers worldwide by exposing deception, eliminating unfair terms, and accrediting transparent companies.</p>
                  <div className="mt-4">
                    <button className="text-sm px-3 py-2 bg-slate-900 text-white rounded-md">Read the Promise</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPERATING MODEL */}
        <section id="model" className="py-16">
          <div className="max-w-6xl mx-auto px-5">
            <h3 className="text-2xl font-bold">Operating Model — The IEAC Tri-Loop</h3>
            <p className="mt-2 text-slate-600">Monitor → Accredit → Remediate — integrated loops that feed each other.</p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-white rounded-lg border shadow-sm">
                <h4 className="font-semibold">Loop A: Monitor</h4>
                <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
                  <li>Global Ethics Watch (always-on packaging & pricing scans)</li>
                  <li>Unfair Terms Repository (searchable clauses)</li>
                  <li>Product Integrity Labs (sampling & testing)</li>
                </ul>
              </div>
              <div className="p-5 bg-white rounded-lg border shadow-sm">
                <h4 className="font-semibold">Loop B: Accredit</h4>
                <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
                  <li>EAR levels: Bronze → Platinum</li>
                  <li>Sector streams & disclosed criteria</li>
                  <li>Annual renewals + surprise checks</li>
                </ul>
              </div>
              <div className="p-5 bg-white rounded-lg border shadow-sm">
                <h4 className="font-semibold">Loop C: Remediate</h4>
                <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
                  <li>CRRD: 48-hour triage; 15-business-day resolution</li>
                  <li>Ethics Mediation Panel (public summaries)</li>
                  <li>Corrective Action Agreements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* STREAMS - interactive */}
        <section id="streams" className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5">
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold">Accreditation Streams & Criteria</h3>
                <p className="mt-2 text-slate-600">Start: Food & Service — sector-specific pillars and seals.</p>

                <div className="mt-4 grid gap-2">
                  <button className={`text-left p-3 rounded-md ${selectedStream === 'food' ? 'bg-white border shadow-sm' : 'bg-transparent'}`} onClick={() => setSelectedStream('food')}>Food Stream</button>
                  <button className={`text-left p-3 rounded-md ${selectedStream === 'service' ? 'bg-white border shadow-sm' : 'bg-transparent'}`} onClick={() => setSelectedStream('service')}>Service Stream</button>
                </div>

                <div className="mt-6">
                  <h6 className="text-sm text-slate-500">EAR levels</h6>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {earLevels.map(l => (
                      <div key={l.id} className="px-3 py-2 border rounded-md text-sm">{l.title}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:flex-1 mt-6 md:mt-0">
                {selectedStream === 'food' ? (
                  <div className="p-6 bg-white rounded-lg border shadow-sm">
                    <h4 className="font-semibold">Food Stream — From Farm/Factory to Fork</h4>
                    <ul className="mt-3 list-disc pl-5 text-slate-600 space-y-1">
                      <li>Lifecycle Transparency: full date disclosure and readable labels.</li>
                      <li>Freshness Integrity: disclosure for thawed or reprocessed stock.</li>
                      <li>Supply Chain Traceability: lot tracking & recall responsiveness &lt;48h.</li>
                      <li>Quality & Safety: lab testing and cold-chain audit trails.</li>
                      <li>Marketing Honesty: no misleading health claims.</li>
                    </ul>

                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded">
                        <strong>FreshChain™</strong>
                        <p className="text-sm text-slate-500">Verified lifecycle & date transparency</p>
                      </div>
                      <div className="p-4 border rounded">
                        <strong>CleanKitchen™</strong>
                        <p className="text-sm text-slate-500">Restaurant hygiene & menu honesty verified</p>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="p-6 bg-white rounded-lg border shadow-sm">
                    <h4 className="font-semibold">Service Stream — Contracts, Pricing & Data Dignity</h4>
                    <ul className="mt-3 list-disc pl-5 text-slate-600 space-y-1">
                      <li>Fair Contracts: plain-language summaries & no surprise auto-renewals.</li>
                      <li>Choice of Remedy: no forced arbitration traps; low-friction complaint portals.</li>
                      <li>Pricing Integrity: truthful discounts & no drip fees.</li>
                      <li>Data & Dark Patterns: opt-in default & ban on manipulative UX.</li>
                    </ul>

                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded">
                        <strong>FairTerms™</strong>
                        <p className="text-sm text-slate-500">Contract & renewal fairness verified</p>
                      </div>
                      <div className="p-4 border rounded">
                        <strong>ClearPrice™</strong>
                        <p className="text-sm text-slate-500">Transparent pricing verified</p>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* BRIDGE PROGRAMME */}
        <section id="bridge" className="py-16">
          <div className="max-w-6xl mx-auto px-5">
            <h3 className="text-2xl font-bold">The IEAC Bridge Programme</h3>
            <p className="mt-2 text-slate-600">We don't only sanction; we co-design fixes with companies and consumers.</p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-white rounded border shadow-sm">
                <h4 className="font-semibold">Co-Creation Clinics</h4>
                <p className="text-sm text-slate-500 mt-2">Consumer panels rewrite unfair clauses into fair alternatives.</p>
              </div>
              <div className="p-5 bg-white rounded border shadow-sm">
                <h4 className="font-semibold">Labeling Sprints</h4>
                <p className="text-sm text-slate-500 mt-2">Lifecycle labeling to show all dates legibly on packaging.</p>
              </div>
              <div className="p-5 bg-white rounded border shadow-sm">
                <h4 className="font-semibold">Menu Honesty Audits</h4>
                <p className="text-sm text-slate-500 mt-2">Align kitchen practice with menu truth and train staff.</p>
              </div>
            </div>

            <div className="mt-6">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-md" onClick={() => scrollToId('contact')}>Request a Bridge Report</button>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY & API */}
        <section id="tech" className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5 md:flex md:gap-8">
            <div className="md:flex-1">
              <h3 className="text-2xl font-bold">Technology & Data Architecture</h3>
              <p className="mt-2 text-slate-600">Signal Grid, Open Verification Ledger, Public Ratings API — built for transparency and integrability.</p>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded border shadow-sm">
                  <strong>Signal Grid</strong>
                  <p className="text-sm text-slate-500 mt-2">Multilingual intake & severity scoring for complaints and whistleblowing.</p>
                </div>
                <div className="p-4 bg-white rounded border shadow-sm">
                  <strong>Public Ratings API</strong>
                  <p className="text-sm text-slate-500 mt-2">Developers can show EAR status and seals in marketplaces and apps.</p>
                </div>
              </div>

              <div className="mt-4">
                <code className="block p-3 bg-slate-900 text-white rounded text-sm">GET /api/ratings?companyId=12345</code>
                <p className="text-xs text-slate-500 mt-2">(Example endpoint — returns EAR level, seal list, last audit date.)</p>
              </div>
            </div>

            <div className="md:w-96 mt-6 md:mt-0">
              <div className="p-4 bg-white rounded border shadow-sm">
                <h4 className="font-semibold">Anonymity & Safety</h4>
                <p className="text-sm text-slate-500 mt-2">Secure channels, legal shield procedures, and retaliation watch for whistleblowers.</p>

                <div className="mt-4">
                  <button className="w-full px-3 py-2 bg-slate-900 text-white rounded-md">Developer & Partner Docs</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section id="kpis" className="py-16">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Impact Metrics (KPIs)</h3>
              <button onClick={() => setKpisOpen(v => !v)} className="text-sm px-3 py-2 border rounded">Toggle details</button>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded border shadow-sm text-center">
                <div className="text-3xl font-bold">48h</div>
                <div className="text-sm text-slate-500">Time to Triage (target)</div>
              </div>
              <div className="p-6 bg-white rounded border shadow-sm text-center">
                <div className="text-3xl font-bold">15d</div>
                <div className="text-sm text-slate-500">Time to Resolution (target)</div>
              </div>
              <div className="p-6 bg-white rounded border shadow-sm text-center">
                <div className="text-3xl font-bold">60%</div>
                <div className="text-sm text-slate-500">Restitution Rate (target)</div>
              </div>
            </div>

            {kpisOpen && (
              <div className="mt-6 p-4 bg-slate-50 rounded border">
                <p className="text-sm text-slate-600">Additional KPIs: Repeat-Offender Reduction, Lifecycle Transparency Score, Contract Fairness Score, Accreditation Uptake, Global Equity Index.</p>
              </div>
            )}
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5">
            <h3 className="text-2xl font-bold">Launch Roadmap — First 180 Days</h3>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded border shadow-sm">
                <strong>Day 0–30</strong>
                <p className="text-sm text-slate-500 mt-2">Publish EAR v1.0, stand up CRRD, recruit pilot cohort.</p>
              </div>
              <div className="p-4 bg-white rounded border shadow-sm">
                <strong>Day 31–90</strong>
                <p className="text-sm text-slate-500 mt-2">Baseline audits, provisional EARs, launch flagship seals.</p>
              </div>
              <div className="p-4 bg-white rounded border shadow-sm">
                <strong>Day 91–180</strong>
                <p className="text-sm text-slate-500 mt-2">Publish Global Ethics Index, Edinburgh Summit, Year-2 expansion plans.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16">
          <div className="max-w-6xl mx-auto px-5 md:flex md:gap-8">
            <div className="md:flex-1">
              <h3 className="text-2xl font-bold">Contact & Report</h3>
              <p className="mt-2 text-slate-600">HQ: Edinburgh, UK · Regional hubs: Brussels, New York, Singapore, Dhaka, Dubai</p>

              <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="Your name" className="p-3 border rounded" required />
                  <input value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} type="email" placeholder="Email" className="p-3 border rounded" required />
                </div>
                <textarea value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} placeholder="Message / Report" className="w-full p-3 border rounded h-28" required />
                <div className="flex items-center gap-3">
                  <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">Send Report</button>
                  <button type="button" onClick={() => { setSubscribed(true) }} className="px-4 py-2 border rounded">Subscribe to updates</button>
                  {subscribed && <span className="text-sm text-emerald-600">Subscribed ✓</span>}
                </div>
              </form>

            </div>

            <div className="md:w-96 mt-6 md:mt-0">
              <div className="p-4 bg-white rounded border shadow-sm">
                <h4 className="font-semibold">Public Dashboard</h4>
                <p className="text-sm text-slate-500 mt-2">Live heatmaps, public case summaries, and ratings API for partners.</p>
                <div className="mt-4">
                  <button className="w-full px-3 py-2 bg-slate-900 text-white rounded">View Dashboard</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 bg-white border-t">
          <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-start justify-between gap-4">
            <div>
              <div className="font-semibold">International Ethical Accreditation Council (IEAC)</div>
              <div className="text-sm text-slate-500 mt-1">Headquarters: Edinburgh, United Kingdom · Non-Profit Regulatory NGO</div>
            </div>

            <div className="text-sm text-slate-500">© {new Date().getFullYear()} IEAC • Privacy • Terms • Transparency Playbook</div>
          </div>
        </footer>

      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 max-w-2xl">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold">Report / Quick Send</h4>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-md"><X /></button>
            </div>
            <p className="text-sm text-slate-600 mt-2">Thank you — your report helps our signal grid. The CRRD aims to triage within 48 hours.</p>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="p-3 border rounded">Example: FreshChain™ sample intake & chain-of-custody.</div>
              <div className="p-3 border rounded">Example: FairTerms™ clause submission and remediation plan.</div>
              <div className="p-3 border rounded">Example: Request a Bridge Clinic for suppliers.</div>
            </div>

            <div className="mt-4 text-right">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-900 text-white rounded">Close</button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
