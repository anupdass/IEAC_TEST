import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, CheckCircle, AlertTriangle } from "lucide-react";
import logo from '../assets/logo.png'

// IEAC single-page site with full content and always-on animated background
export default function IEACSite2() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState("home");
    const [showModal, setShowModal] = useState(false);
    const [selectedStream, setSelectedStream] = useState("food");
    const [contact, setContact] = useState({ name: "", email: "", message: "" });
    const [subscribed, setSubscribed] = useState(false);
    const [kpisOpen, setKpisOpen] = useState(false);

    // Scrollspy
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
        setShowModal(true);
        setContact({ name: "", email: "", message: "" });
    }

    const earLevels = [
        { id: "bronze", title: "Bronze", desc: "Baseline ethical assurances" },
        { id: "silver", title: "Silver", desc: "Improving practices" },
        { id: "gold", title: "Gold", desc: "Exemplar performance" },
        { id: "platinum", title: "Platinum", desc: "Global model" },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: index * 0.10,
                type: "spring",
                stiffness: 120,
                damping: 10,
            },
        }),
    };

    return (
        <div className="relative min-h-screen font-sans text-slate-800 overflow-x-hidden bg-gradient-to-br from-[#fde2e4] via-[#fdf6f0] to-[#dff6f6] bg-[radial-gradient(ellipse_at_top_right,_#a0e7e5_0%,_transparent_60%),_radial-gradient(ellipse_at_bottom_left,_#ffc8dd_0%,_transparent_60%)]">

            {/* Always-on animated gradient layer (subtle) */}
            <motion.div
                className="fixed inset-0 -z-10"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    background: "linear-gradient(135deg, #fde2e4, #fdf6f0, #dff6f6)",
                    backgroundSize: "200% 200%",
                    opacity: 0.4,
                }}
                aria-hidden
            />

            {/* Ambient animated blobs (always visible) */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed -z-10 top-[-10rem] right-[-10rem] h-[32rem] w-[32rem] rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side,#a0e7e5,transparent)" }}
                animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none fixed -z-10 bottom-[-12rem] left-[-12rem] h-[36rem] w-[36rem] rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side,#ffc8dd,transparent)" }}
                animate={{ x: [0, -50, 0], y: [0, 30, 0], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* NAV */}
            <header className="fixed w-full z-40 bg-white/70 backdrop-blur-md border-b border-white/40 shadow-sm">
                <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="p-2">
                            <img src={logo} alt="IEAC" className="h-8 w-auto" />
                        </div>
                    </div>

                    <nav className="hidden md:flex gap-2 items-center">
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
                                className={`text-sm py-2 px-2 rounded-md ${active === id ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                                {label}
                            </button>
                        ))}

                        <button
                            onClick={() => { setSelectedStream("food"); scrollToId("streams"); }}
                            className="ml-3 inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-3 py-2 rounded-md shadow transition-all hover:shadow-lg hover:scale-[1.03]">
                            Apply for EAR
                        </button>
                    </nav>

                    <div className="md:hidden">
                        <button onClick={() => setMobileOpen((s) => !s)} className="p-2 rounded-md">
                            {mobileOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur border-t border-white/40">
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
                                <button onClick={() => scrollToId('about')} className="px-4 py-3 bg-slate-900 text-white rounded-md shadow transition-all hover:shadow-lg hover:scale-[1.02]">Why IEAC</button>
                                <button onClick={() => { setSelectedStream('food'); scrollToId('streams') }} className="px-4 py-3 border rounded-md transition-all hover:shadow-md hover:scale-[1.02]">Explore Accreditation</button>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                                <div className="p-4 bg-white/70 backdrop-blur rounded shadow-sm border border-white/60">
                                    <p className="font-semibold">CRRD Triage</p>
                                    <p className="text-slate-500">48-hour triage SLA</p>
                                </div>
                                <div className="p-4 bg-white/70 backdrop-blur rounded shadow-sm border border-white/60">
                                    <p className="font-semibold">EAR Levels</p>
                                    <p className="text-slate-500">Bronze → Platinum</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
                            <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl p-6 border border-white/60">
                                <h3 className="text-lg font-semibold">Public Dashboard Preview</h3>
                                <p className="text-sm text-slate-500 mt-2">Real-time heatmaps, complaint themes, and accredited entities.</p>
                                <div className="mt-4 h-56 bg-gradient-to-br from-emerald-50 to-slate-50 rounded-md border-dashed border-2 border-slate-100 flex items-center justify-center">
                                    <div className="text-center text-slate-400">(Interactive dashboard preview placeholder)</div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 text-sm py-2 border rounded-md transition-all hover:shadow-md hover:scale-[1.02]">View Methods</button>
                                    <button className="flex-1 text-sm py-2 bg-emerald-600 text-white rounded-md transition-all hover:shadow-lg hover:scale-[1.02]" onClick={() => { setShowModal(true) }}>Report an Issue</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ABOUT */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    id="about" className="py-0"
                >
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-6 shadow-md">
                            <div className="md:flex md:items-start md:gap-8">
                                <div className="md:flex-1">
                                    <h3 className="text-2xl font-bold">Why IEAC is the Pioneer</h3>
                                    <p className="mt-3 text-slate-600">IEAC is the first pro-consumer authority that monitors ethical business conduct in real time, accredits against a rigorous public standard, and remediates real harms quickly.</p>

                                    <ul className="mt-6 grid md:grid-cols-3 gap-4">
                                        <li className="p-4 bg-white/70 backdrop-blur rounded shadow-sm border border-white/60">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle />
                                                <div>
                                                    <div className="font-semibold">Monitor</div>
                                                    <div className="text-sm text-slate-500">Always-on surveillance & product integrity checks.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="p-4 bg-white/70 backdrop-blur rounded shadow-sm border border-white/60">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle />
                                                <div>
                                                    <div className="font-semibold">Accredit</div>
                                                    <div className="text-sm text-slate-500">EAR levels with disclosed criteria & renewal audits.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="p-4 bg-white/70 backdrop-blur rounded shadow-sm border border-white/60">
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
                                    <div className="p-5 rounded-lg border bg-white/70 backdrop-blur border-white/60 shadow">
                                        <h4 className="font-semibold">Vision & Mission</h4>
                                        <p className="text-sm text-slate-600 mt-2"><strong>Vision:</strong> A marketplace where truth is standard, fairness is enforced, and consumers choose with confidence.</p>
                                        <p className="text-sm text-slate-600 mt-2"><strong>Mission:</strong> Protect consumers worldwide by exposing deception, eliminating unfair terms, and accrediting transparent companies.</p>
                                        <div className="mt-4">
                                            <button className="text-sm px-3 py-2 bg-slate-900 text-white rounded-md transition-all hover:shadow-lg hover:scale-[1.02]">Read the Promise</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* MODEL */}
                <motion.section
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    id="model" className="py-10"
                >
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-6 shadow-md">
                            <h3 className="text-2xl font-bold">Operating Model — The IEAC Tri-Loop</h3>
                            <p className="mt-2 text-slate-600">Monitor → Accredit → Remediate — integrated loops that feed each other.</p>

                            <div className="mt-6 grid md:grid-cols-3 gap-6">
                                <div className="p-5 bg-white/70 backdrop-blur rounded-lg border border-white/60 shadow-sm">
                                    <h4 className="font-semibold">Loop A: Monitor</h4>
                                    <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
                                        <li>Global Ethics Watch (always-on packaging & pricing scans)</li>
                                        <li>Unfair Terms Repository (searchable clauses)</li>
                                        <li>Product Integrity Labs (sampling & testing)</li>
                                    </ul>
                                </div>
                                <div className="p-5 bg-white/70 backdrop-blur rounded-lg border border-white/60 shadow-sm">
                                    <h4 className="font-semibold">Loop B: Accredit</h4>
                                    <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
                                        <li>EAR levels: Bronze → Platinum</li>
                                        <li>Sector streams & disclosed criteria</li>
                                        <li>Annual renewals + surprise checks</li>
                                    </ul>
                                </div>
                                <div className="p-5 bg-white/70 backdrop-blur rounded-lg border border-white/60 shadow-sm">
                                    <h4 className="font-semibold">Loop C: Remediate</h4>
                                    <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
                                        <li>CRRD: 48-hour triage; 15-business-day resolution</li>
                                        <li>Ethics Mediation Panel (public summaries)</li>
                                        <li>Corrective Action Agreements</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* STREAMS */}
                <motion.section
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    id="streams" className="py-10"
                >
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-6 shadow-md">
                            <div className="md:flex md:items-start md:gap-8">
                                <div className="md:w-1/3">
                                    <h3 className="text-2xl font-bold">Accreditation Streams & Criteria</h3>
                                    <p className="mt-2 text-slate-600">Start: Food & Service — sector-specific pillars and seals.</p>

                                    <div className="mt-4 grid gap-2">
                                        <button className={`text-left p-3 rounded-md ${selectedStream === 'food' ? 'bg-white/80 backdrop-blur border border-white/60 shadow-sm' : 'bg-transparent'}`} onClick={() => setSelectedStream('food')}>Food Stream</button>
                                        <button className={`text-left p-3 rounded-md ${selectedStream === 'service' ? 'bg-white/80 backdrop-blur border border-white/60 shadow-sm' : 'bg-transparent'}`} onClick={() => setSelectedStream('service')}>Service Stream</button>
                                    </div>

                                    <div className="mt-6">
                                        <h6 className="text-sm text-slate-500">EAR levels</h6>
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            {earLevels.map(l => (
                                                <div key={l.id} className="px-3 py-2 border rounded-md text-sm bg-white/70 backdrop-blur border-white/60">{l.title}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:flex-1 mt-6 md:mt-0">
                                    {selectedStream === 'food' ? (
                                        <div className="p-6 bg-white/70 backdrop-blur rounded-lg border border-white/60 shadow-sm">
                                            <h4 className="font-semibold">Food Stream — From Farm/Factory to Fork</h4>
                                            <ul className="mt-3 list-disc pl-5 text-slate-600 space-y-1">
                                                <li>Lifecycle Transparency: full date disclosure and readable labels.</li>
                                                <li>Freshness Integrity: disclosure for thawed or reprocessed stock.</li>
                                                <li>Supply Chain Traceability: lot tracking & recall responsiveness &lt;48h.</li>
                                                <li>Quality & Safety: lab testing and cold-chain audit trails.</li>
                                                <li>Marketing Honesty: no misleading health claims.</li>
                                            </ul>

                                            <div className="mt-4 grid md:grid-cols-2 gap-4">
                                                <div className="p-4 border rounded bg-white/70 backdrop-blur border-white/60">
                                                    <strong>FreshChain™</strong>
                                                    <p className="text-sm text-slate-500">Verified lifecycle & date transparency</p>
                                                </div>
                                                <div className="p-4 border rounded bg-white/70 backdrop-blur border-white/60">
                                                    <strong>CleanKitchen™</strong>
                                                    <p className="text-sm text-slate-500">Restaurant hygiene & menu honesty verified</p>
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        <div className="p-6 bg-white/70 backdrop-blur rounded-lg border border-white/60 shadow-sm">
                                            <h4 className="font-semibold">Service Stream — Contracts, Pricing & Data Dignity</h4>
                                            <ul className="mt-3 list-disc pl-5 text-slate-600 space-y-1">
                                                <li>Fair Contracts: plain-language summaries & no surprise auto-renewals.</li>
                                                <li>Choice of Remedy: no forced arbitration traps; low-friction complaint portals.</li>
                                                <li>Pricing Integrity: truthful discounts & no drip fees.</li>
                                                <li>Data & Dark Patterns: opt-in default & ban on manipulative UX.</li>
                                            </ul>

                                            <div className="mt-4 grid md:grid-cols-2 gap-4">
                                                <div className="p-4 border rounded bg-white/70 backdrop-blur border-white/60">
                                                    <strong>FairTerms™</strong>
                                                    <p className="text-sm text-slate-500">Contract & renewal fairness verified</p>
                                                </div>
                                                <div className="p-4 border rounded bg-white/70 backdrop-blur border-white/60">
                                                    <strong>ClearPrice™</strong>
                                                    <p className="text-sm text-slate-500">Transparent pricing verified</p>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* BRIDGE */}
                <motion.section
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    id="bridge" className="py-10"
                >
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-6 shadow-md">
                            <h3 className="text-2xl font-bold">The IEAC Bridge Programme</h3>
                            <p className="mt-2 text-slate-600">We don't only sanction; we co-design fixes with companies and consumers.</p>

                            <div className="mt-6 grid md:grid-cols-3 gap-6">
                                <div className="p-5 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                    <h4 className="font-semibold">Co-Creation Clinics</h4>
                                    <p className="text-sm text-slate-500 mt-2">Consumer panels rewrite unfair clauses into fair alternatives.</p>
                                </div>
                                <div className="p-5 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                    <h4 className="font-semibold">Labeling Sprints</h4>
                                    <p className="text-sm text-slate-500 mt-2">Lifecycle labeling to show all dates legibly on packaging.</p>
                                </div>
                                <div className="p-5 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                    <h4 className="font-semibold">Menu Honesty Audits</h4>
                                    <p className="text-sm text-slate-500 mt-2">Align kitchen practice with menu truth and train staff.</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button className="px-4 py-2 bg-emerald-600 text-white rounded-md transition-all hover:shadow-lg hover:scale-[1.02]" onClick={() => scrollToId('contact')}>Request a Bridge Report</button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* TECH */}
                <motion.section
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    id="tech" className="py-10"
                >
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-6 shadow-md md:flex md:gap-8">
                            <div className="md:flex-1">
                                <h3 className="text-2xl font-bold">Technology & Data Architecture</h3>
                                <p className="mt-2 text-slate-600">Signal Grid, Open Verification Ledger, Public Ratings API — built for transparency and integrability.</p>

                                <div className="mt-4 grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                        <strong>Signal Grid</strong>
                                        <p className="text-sm text-slate-500 mt-2">Multilingual intake & severity scoring for complaints and whistleblowing.</p>
                                    </div>
                                    <div className="p-4 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
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
                                <div className="p-4 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                    <h4 className="font-semibold">Anonymity & Safety</h4>
                                    <p className="text-sm text-slate-500 mt-2">Secure channels, legal shield procedures, and retaliation watch for whistleblowers.</p>

                                    <div className="mt-4">
                                        <button className="w-full px-3 py-2 bg-slate-900 text-white rounded-md transition-all hover:shadow-lg hover:scale-[1.02]">Developer & Partner Docs</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* KPIs */}
                <motion.section
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    id="kpis" className="py-10"
                >
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-6 shadow-md">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold">Impact Metrics (KPIs)</h3>
                                <button onClick={() => setKpisOpen(v => !v)} className="text-sm px-3 py-2 border rounded transition-all hover:shadow-md hover:scale-[1.02]">Toggle details</button>
                            </div>

                            <div className="mt-4 grid md:grid-cols-3 gap-4">
                                <div className="p-6 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm text-center">
                                    <div className="text-3xl font-bold">48h</div>
                                    <div className="text-sm text-slate-500">Time to Triage (target)</div>
                                </div>
                                <div className="p-6 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm text-center">
                                    <div className="text-3xl font-bold">15d</div>
                                    <div className="text-sm text-slate-500">Time to Resolution (target)</div>
                                </div>
                                <div className="p-6 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm text-center">
                                    <div className="text-3xl font-bold">60%</div>
                                    <div className="text-sm text-slate-500">Restitution Rate (target)</div>
                                </div>
                            </div>

                            {kpisOpen && (
                                <div className="mt-6 p-4 bg-white/70 backdrop-blur rounded border border-white/60">
                                    <p className="text-sm text-slate-600">Additional KPIs: Repeat-Offender Reduction, Lifecycle Transparency Score, Contract Fairness Score, Accreditation Uptake, Global Equity Index.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* ROADMAP */}
                <motion.section
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    id="roadmap" className="py-10"
                >
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-6 shadow-md">
                            <h3 className="text-2xl font-bold">Launch Roadmap — First 180 Days</h3>
                            <div className="mt-4 grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                    <strong>Day 0–30</strong>
                                    <p className="text-sm text-slate-500 mt-2">Publish EAR v1.0, stand up CRRD, recruit pilot cohort.</p>
                                </div>
                                <div className="p-4 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                    <strong>Day 31–90</strong>
                                    <p className="text-sm text-slate-500 mt-2">Baseline audits, provisional EARs, launch flagship seals.</p>
                                </div>
                                <div className="p-4 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                    <strong>Day 91–180</strong>
                                    <p className="text-sm text-slate-500 mt-2">Publish Global Ethics Index, Edinburgh Summit, Year-2 expansion plans.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* CONTACT */}
                <motion.section
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    id="contact" className="py-10"
                >
                    <div className="max-w-6xl mx-auto px-5 md:flex md:gap-8">
                        <div className="md:flex-1">
                            <div className="bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm p-6">
                                <h3 className="text-2xl font-bold">Contact & Report</h3>
                                <p className="mt-2 text-slate-600">HQ: Edinburgh, UK · Regional hubs: Brussels, New York, Singapore, Dhaka, Dubai</p>

                                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="Your name" className="p-3 border rounded" required />
                                        <input value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} type="email" placeholder="Email" className="p-3 border rounded" required />
                                    </div>
                                    <textarea value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} placeholder="Message / Report" className="w-full p-3 border rounded h-28" required />
                                    <div className="flex items-center gap-3">
                                        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded transition-all hover:shadow-lg hover:scale-[1.02]">Send Report</button>
                                        <button type="button" onClick={() => { setSubscribed(true) }} className="px-4 py-2 border rounded transition-all hover:shadow-md hover:scale-[1.02]">Subscribe to updates</button>
                                        {subscribed && <span className="text-sm text-emerald-600">Subscribed ✓</span>}
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="md:w-96 mt-6 md:mt-0">
                            <div className="p-4 bg-white/70 backdrop-blur rounded border border-white/60 shadow-sm">
                                <h4 className="font-semibold">Public Dashboard</h4>
                                <p className="text-sm text-slate-500 mt-2">Live heatmaps, public case summaries, and ratings API for partners.</p>
                                <div className="mt-4">
                                    <button className="w-full px-3 py-2 bg-slate-900 text-white rounded transition-all hover:shadow-lg hover:scale-[1.02]">View Dashboard</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* FOOTER */}
                <footer className="py-8 bg-white/70 backdrop-blur border-t border-white/60">
                    <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-start justify-between gap-4">
                        <div>
                            <div className="font-semibold">International Ethical Accreditation Council (IEAC)</div>
                            <div className="text-sm text-slate-500 mt-1">Headquarters: Edinburgh, United Kingdom · Non-Profit Regulatory NGO</div>
                        </div>
                        <div className="text-sm text-slate-500">© {new Date().getFullYear()} IEAC • Privacy • Terms • Transparency Playbook</div>
                    </div>
                </footer>
            </main>

            {/* MODAL */}
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