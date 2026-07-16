'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Shield, Landmark, Ship, Heart, Leaf, Car, Radar,
  Cpu, Brain, Eye, Database, Wifi, Globe, Zap,
  TrendingUp, Users, Droplets, Sun, Wind, Mountain,
  Anchor, MapPin, ChevronRight, ArrowUpRight, Activity,
  BarChart3, Bell, Satellite, Lock, FileCheck, Coins,
  Building2, GraduationCap, Stethoscope, HomeIcon, Recycle,
  Truck, Plane, ShieldCheck, Server, ChevronDown, Sparkles,
  Waves, Star, Target, Clock, CheckCircle2, AlertTriangle,
  Handshake, Scale, Lightbulb, BookOpen, Rocket
} from 'lucide-react'

// ===== ANIMATION UTILITIES =====
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

// ===== DATA =====
const sevenPillars = [
  {
    id: 1, name: 'Smart Governance', icon: Landmark, color: '#0ea5e9',
    tagline: 'Tata Kelola APBD Berdaulat',
    description: 'Reformasi APBD berbasis Zero Based Budgeting + Kinerja (PBK), Blockchain APBD & Anti-Korupsi AI, SPBE & Open Data Real-Time Dashboard.',
    kpis: ['Skor SPBE 4.2', 'Opini BPK WTP', 'Open Data Index ≥85%'],
    details: ['Blockchain APBD 5-node validator', 'AI Cross-Check Engine', 'Pesisir Citizenship Digital ID', 'AI Mayor & Virtual Sekda', 'Inspektorat Digital & IT Audit Forensik']
  },
  {
    id: 2, name: 'Smart Economy', icon: TrendingUp, color: '#10b981',
    tagline: 'Ekonomi Biru Berkeadilan',
    description: 'Ekonomi biru berbasis maritim, BUMD Digital, Koperasi Nelayan KMN Berdikari, PAD Digital, Smart Wakaf & Green Sukuk.',
    kpis: ['PAD Digital ≥Rp 50M', '100K UMKM on-platform', 'Bankable ratio 65%'],
    details: ['BUMD Digital & Koperasi Nelayan', 'Pajak Data & Digital Service Tax', 'Smart Wakaf & Green Sukuk', 'Sovereign Data Trust', 'Ekosistem UMKM Digital Pesisir']
  },
  {
    id: 3, name: 'Smart Maritime', icon: Anchor, color: '#6366f1',
    tagline: 'Pelabuhan Pintar & Logistik Kepulauan',
    description: 'Smart Port Pesisir Selatan, Jalan Tol Laut, Drone Logistik, Armada Nelayan Digital, BTS Solar-Powered, Data Center Edge Maritim.',
    kpis: ['Smart Port 3 lokasi', '47 BTS solar', 'DC Edge maritim'],
    details: ['Smart Port otomatis', 'Jalan Tol Laut & Drone Logistik', 'Armada Nelayan Digital', 'BTS Solar-Powered 47 titik', 'Pesisir Space & Satellite Layer']
  },
  {
    id: 4, name: 'Smart Living', icon: Heart, color: '#f43f5e',
    tagline: 'Kesejahteraan Inklusif',
    description: 'Telemedisin Kepulauan, Smart Clinic, Pendidikan Digital, Sekolah Polymath Pesisir, Smart Housing, Layanan Dasar Inklusif.',
    kpis: ['Telemedisin 100% pulau', 'SPM 90%', 'IKD 70'],
    details: ['Telemedisin Kepulauan & Smart Clinic', 'Pendidikan Digital & Sekolah Polymath', 'Smart Housing & Permukiman Tangguh', 'Layanan Dasar Inklusif', 'Pesisir Cultural Digital Archive']
  },
  {
    id: 5, name: 'Smart Environment', icon: Leaf, color: '#22c55e',
    tagline: 'Ekologi Hijau Berkelanjutan',
    description: 'Smart Energy Grid surya & angin, IoT Banjir & Tsunami Early Warning, Pengelolaan Sampah Laut, Mangrove Digital, Blue Carbon Farming.',
    kpis: ['Emisi −30%', '1.000 ha mangrove restorasi', 'Sampah laut −60%'],
    details: ['Smart Energy Grid berbasis Surya & Angin', 'IoT Banjir, Abrasi & Tsunami Early Warning', 'Pengelolaan Sampah Laut', 'Mangrove Digital Monitoring', 'Smart Agriculture & Blue Carbon Farming']
  },
  {
    id: 6, name: 'Smart Mobility', icon: Car, color: '#f59e0b',
    tagline: 'Mobilitas Berlayar Cerdas',
    description: 'Transportasi Laut Terintegrasi, EV Chain Pesisir, Drone Logistik & Air Taxi Maritim, Smart Road & Traffic AI.',
    kpis: ['Ferry smart 5 rute', '50 EV charging', '3 drone corridor'],
    details: ['Transportasi Laut Terintegrasi', 'EV Chain Motor Listrik Nelayan', 'Drone Logistik & Air Taxi Maritim', 'Smart Road & Traffic AI', 'Integrated Mobility Platform']
  },
  {
    id: 7, name: 'Smart Defense', icon: Shield, color: '#8b5cf6',
    tagline: 'Pertahanan Sipil Digital',
    description: 'Keamanan Siber Daerah & SOC, Citra Satelit & Geospasial Intelligence, Sistem Darurat Bencana, KMN Pertahanan Ekonomi.',
    kpis: ['SOC Daerah 24/7', '2 citra satelit/hari', 'EOC Digital terpadu'],
    details: ['Keamanan Siber Daerah & SOC', 'Citra Satelit & Geospasial Intelligence', 'Sistem Darurat Bencana Terintegrasi', 'KMN Berdikari Pertahanan Ekonomi', 'Perlindungan Data Strategis & UU PDP']
  }
]

const nineValues = [
  { name: 'Amanah', icon: ShieldCheck, meaning: 'Kepercayaan & integritas total', indicator: '0% fraud audited' },
  { name: 'Keadilan', icon: Scale, meaning: 'Distribusi merata ke 11 kecamatan', indicator: 'Gini ratio ≤ 0.32' },
  { name: 'Transparansi', icon: Eye, meaning: 'APBD real-time open data & blockchain', indicator: 'Open Data Index ≥ 85%' },
  { name: 'Kemaslahatan', icon: Handshake, meaning: 'Manfaat nyata bagi warga paling tepi', indicator: 'SPM Kinerja ≥ 90%' },
  { name: 'Kesederhanaan', icon: Lightbulb, meaning: 'Birokrasi digital-first, no-paper', indicator: 'Paperless ratio ≥ 95%' },
  { name: 'Kebersamaan', icon: Users, meaning: 'KMN Berdikari koperasi multipihak', indicator: '100K+ members aktif' },
  { name: 'Kelestarian', icon: Recycle, meaning: 'Mangrove, energi terbarukan, sirkular', indicator: 'Emisi −30%' },
  { name: 'Kedaulatan', icon: Lock, meaning: 'Sovereign Data Trust, cloud daerah', indicator: 'On-prem DC 100%' },
  { name: 'Keilmuan', icon: BookOpen, meaning: 'Riset BRIN/PT, akademi polymath', indicator: 'R&D ratio ≥ 3% APBD' }
]

const superIdeas = [
  { id: 1, title: 'Dana Kluster Inovasi Digital 3% APBD', desc: 'Minimal 3% belanja non-gaji APBD dialokasikan untuk Kluster Inovasi Digital — dikelola KMN Berdikari, diawasi Inspektorat Digital, terekam blockchain APBD.', icon: Coins, color: '#f59e0b' },
  { id: 2, title: 'Three-Layer Sovereign Architecture', desc: 'Setiap inisiatif smart city harus memiliki jejak di 3 lapisan: Infrastruktur (fisik & jaringan), Platform (aplikasi & data), dan Tata Kelola (kelembagaan & nilai).', icon: Building2, color: '#0ea5e9' },
  { id: 3, title: 'KMN Berdikari sebagai Governance Layer', desc: 'Koperasi Korporasi Multipihak Nusa Berdikari sebagai lapisan tata kelola ekonomi yang beroperasi di atas APBD dan di bawah kerangka regulasi nasional.', icon: Landmark, color: '#10b981' },
  { id: 4, title: 'AI Cross-Check Auto-Block', desc: 'Sistem AI yang mendeteksi duplikasi anggaran, anomali harga, dan pola kroni secara real-time dalam 60 detik — otomatis memblokir transaksi mencurigakan.', icon: Brain, color: '#8b5cf6' },
  { id: 5, title: 'Blockchain APBD 5-Node Validator', desc: 'Hyperledger Fabric dengan 5 node validator independen: Inspektorat, BPK, KPK, KMN Berdikari, dan node publik akademisi. Konsensus PBFT.', icon: Database, color: '#6366f1' },
  { id: 6, title: 'Pesisir Digital Twin', desc: 'Replika digital 3D seluruh kabupaten dengan topografi, batimetri, sensor IoT real-time, dan model ML untuk simulasi kebijakan dan mitigasi bencana.', icon: Globe, color: '#0ea5e9' },
  { id: 7, title: 'Sovereign Data Trust', desc: 'Warga pemilik data. Cloud daerah berdaulat. Data strategis disimpan on-premise. Kepemilikan data dikembalikan ke tangan rakyat.', icon: Lock, color: '#f43f5e' },
  { id: 8, title: 'AI Mayor & Virtual Sekda', desc: 'Asisten LLM untuk pimpinan daerah yang mampu menganalisis data APBD, memprediksi dampak kebijakan, dan memberikan rekomendasi berbasis bukti 24/7.', icon: Cpu, color: '#22c55e' }
]

const roadmapData = [
  { phase: 'Fase 1', year: '2026-2027', title: 'Fondasi Regulasi & Pilot', items: ['Pembentukan Tim SatuData Pesisir', 'Pilot PBK di 3 OPD prioritas', 'Pembangunan Data Center Edge', '47 BTS Solar-Powered', 'Perda Smart City & KMN Berdikari', 'Akademi Polymath Pesisir launch'], color: '#0ea5e9' },
  { phase: 'Fase 2', year: '2028-2029', title: 'Akselerasi & Integrasi', items: ['PBK ke seluruh OPD', 'Blockchain APBD live', 'Smart Port 3 lokasi operasional', 'Digital Twin Live Layer', '5G pilot Painan', 'Telemedisin 100% pulau'], color: '#10b981' },
  { phase: 'Fase 3', year: '2030', title: 'Kematangan & Ekspor Model', items: ['Role Model ASEAN Smart Maritime', 'Simulation Layer Digital Twin', 'ASCN membership', '5G full coverage', 'Emisi −45% achieved', 'Ekspor model ke kabupaten lain'], color: '#f59e0b' }
]

const investmentData = [
  { sector: 'Marina & Yacht Club', value: 1200, pct: 15 },
  { sector: 'Waterfront & Commercial', value: 1000, pct: 12.5 },
  { sector: 'Smart Port & Logistik', value: 900, pct: 11.3 },
  { sector: 'Jalan & Infrastruktur', value: 850, pct: 10.6 },
  { sector: 'Smart Government & DC', value: 700, pct: 8.8 },
  { sector: 'Pendidikan', value: 800, pct: 10 },
  { sector: 'Perumahan & Resort', value: 1100, pct: 13.8 },
  { sector: 'Pertanian & Cold Storage', value: 450, pct: 5.6 },
  { sector: 'Perikanan & Agroindustri', value: 300, pct: 3.8 },
  { sector: 'Kesehatan', value: 200, pct: 2.5 },
  { sector: 'Lingkungan & Energi Hijau', value: 200, pct: 2.5 }
]

const kpiDashboard = [
  { label: 'Layanan Publik Digital', current: 45, target: 100, unit: '%', icon: FileCheck },
  { label: 'Cakupan Internet 4G', current: 62, target: 100, unit: '%', icon: Wifi },
  { label: 'Skor SPBE', current: 2.6, target: 4.5, unit: '', icon: BarChart3 },
  { label: 'Energi Terbarukan', current: 15, target: 80, unit: '%', icon: Sun },
  { label: 'Indeks Kepuasan Warga', current: 55, target: 85, unit: '%', icon: Users },
  { label: 'UMKM Go Digital', current: 5000, target: 10000, unit: '', icon: TrendingUp }
]

const strategicProfile = [
  { dim: 'Penduduk', current: '~600.000', target2029: '620.000', target2030: '640.000' },
  { dim: 'IPM', current: '71,2', target2029: '76,5', target2030: '79,5' },
  { dim: 'PDRB (Miliar Rp)', current: '~12.500', target2029: '22.000', target2030: '32.000' },
  { dim: 'Cakupan 4G', current: '62%', target2029: '100%', target2030: '100% + 5G' },
  { dim: 'Skor SPBE', current: '2,6 (Cukup)', target2029: '4,2 (Sangat Baik)', target2030: '4,5 (Excellent)' },
  { dim: 'Opini BPK', current: 'WDP', target2029: 'WTP', target2030: 'WTP Berkelanjutan' },
  { dim: 'Emisi GRK', current: 'Baseline 2024', target2029: '−30%', target2030: '−45%' }
]

// ===== INTERNATIONAL SMART CITY BENCHMARKS =====
const worldSmartCities = [
  {
    city: 'Virtual Singapore',
    country: 'Singapura',
    flag: '🇸🇬',
    specialty: 'Digital Twin Nasional',
    desc: 'Singapura membangun Virtual Singapore — replika 3D seluruh kota yang digunakan untuk simulasi kebijakan, perencanaan kota, dan analisis dampak lingkungan. Pesisir Selatan mengadaptasi konsep ini menjadi Pesisir Digital Twin dengan karakteristik maritim-kepulauan.',
    keyTech: ['3D City Model', 'Urban Simulation', 'Solar Analysis', 'Emergency Planning'],
    color: '#0ea5e9',
    learned: 'Digital Twin untuk simulasi kebijakan APBD dan mitigasi bencana'
  },
  {
    city: 'Helsinki',
    country: 'Finlandia',
    flag: '🇫🇮',
    specialty: 'Open Data & Citizen Engagement',
    desc: 'Helsinki membuka 1.200+ dataset publik secara real-time dan membangun platform MyCity yang memungkinkan warga berpartisipasi langsung dalam perencanaan kota. Model ini menjadi inspirasi Open Data Real-Time Dashboard Pesisir Selatan.',
    keyTech: ['Open Data Portal', 'Citizen Participation', 'Real-time APIs', 'AI Assistant'],
    color: '#10b981',
    learned: 'Open Data Dashboard dengan delay ≤24 jam dan API publik untuk akademisi'
  },
  {
    city: 'Barcelona CityOS',
    country: 'Spanyol',
    flag: '🇪🇸',
    specialty: 'IoT Terintegrasi',
    desc: 'Barcelona membangun CityOS — sistem operasi kota yang mengintegrasikan 19.500 sensor IoT untuk manajemen lalu lintas, pencahayaan jalan, pengelolaan sampah, dan irigasi taman. Pesisir Selatan mengadaptasi dengan jaringan 1.200 sensor IoT maritim.',
    keyTech: ['CityOS Platform', 'Smart Lighting', 'Waste Management', 'Traffic AI'],
    color: '#f59e0b',
    learned: 'IoT Sensor Network terintegrasi untuk 1.200 titik pemantauan maritim'
  },
  {
    city: 'Copenhagen',
    country: 'Denmark',
    flag: '🇩🇰',
    specialty: 'Carbon Neutral 2025',
    desc: 'Copenhagen menargetkan kota bebas karbon pertama di dunia. Dengan smart energy grid, jalur sepeda elektrik, dan district heating system, kota ini mengurangi emisi 42% sejak 2005. Pesisir Selatan mengadaptasi dengan target emisi −45% pada 2030.',
    keyTech: ['Carbon Neutral', 'Smart Grid', 'Green Mobility', 'District Heating'],
    color: '#22c55e',
    learned: 'Smart Energy Grid berbasis surya & angin untuk target emisi −45%'
  },
  {
    city: 'Dubai',
    country: 'UAE',
    flag: '🇦🇪',
    specialty: 'AI-First Government',
    desc: 'Dubai meluncurkan strategi AI-First Government yang menjadikan kecerdasan buatan sebagai fondasi setiap layanan publik. Virtual assistant, autonomous transport, dan AI-powered policing. Pesisir Selatan mengadaptasi dengan AI Mayor & Virtual Sekda.',
    keyTech: ['AI Strategy', 'Autonomous Transport', 'Virtual Assistant', 'Smart Police'],
    color: '#8b5cf6',
    learned: 'AI Mayor & Virtual Sekda sebagai pengganda kapasitas pimpinan daerah'
  },
  {
    city: 'Seoul',
    country: 'Korea Selatan',
    flag: '🇰🇷',
    specialty: 'Digital Democracy & Metaverse',
    desc: 'Seoul membangun Metaverse Seoul — platform virtual di mana warga dapat mengakses layanan publik, menghadiri rapat, dan berpartisipasi dalam demokrasi digital. Pesisir Selatan mengadaptasi dengan Citizenship Digital ID dan e-voting pilot.',
    keyTech: ['Metaverse Seoul', 'Digital Democracy', 'E-Voting', 'Smart Transport'],
    color: '#f43f5e',
    learned: 'Citizenship Digital ID dan e-voting untuk demokrasi digital maritim'
  }
]

// ===== BRILLIANT FUTURE SUPER IDEAS =====
const brilliantFutureIdeas = [
  {
    id: 1,
    title: 'Pesisir Metaverse — Virtual Civilization',
    desc: 'Platform metaverse maritim di mana warga dapat mengakses layanan publik, menghadiri musyawarah nagari virtual, mengunjungi destinasi wisata digital, dan berdagang UMKM di marketplace 3D. Integrasi dengan Digital Twin untuk simulasi kebijakan bersama warga.',
    icon: Globe,
    color: '#8b5cf6',
    tag: 'WEB3 + DIGITAL TWIN'
  },
  {
    id: 2,
    title: 'Ocean Thermal Energy Conversion (OTEC)',
    desc: 'Pembangkit listrik tenaga osean termal yang memanfaatkan perbedaan suhu permukaan laut hangat dan laut dalam dingin. Pilot 100 kW di perairan Pesisir Selatan — energi terbarukan 24/7 yang tidak bergantung pada cuaca, cocok untuk kepulauan.',
    icon: Waves,
    color: '#0ea5e9',
    tag: 'ENERGI LAUT'
  },
  {
    id: 3,
    title: 'Pesisir Quantum-Safe Blockchain',
    desc: 'Blockchain APBD generasi berikutnya yang tahan terhadap serangan komputer kuantum. Menggunakan algoritma lattice-based cryptography (NIST PQC standar) untuk memastikan keamanan data anggaran hingga 50 tahun ke depan.',
    icon: Lock,
    color: '#f43f5e',
    tag: 'QUANTUM SECURITY'
  },
  {
    id: 4,
    title: 'Autonomous Maritime Drone Swarm',
    desc: 'Armada drone otonom untuk patroli laut anti-IUU fishing, monitoring mangrove, search & rescue, dan pengiriman logistik ke pulau terpencil. Swarm intelligence memungkinkan 50+ drone berkoordinasi tanpa manusia.',
    icon: Radar,
    color: '#10b981',
    tag: 'DRONE AI'
  },
  {
    id: 5,
    title: 'Carbon Negative Mangrove Economy',
    desc: 'Pesisir Selatan sebagai kabupaten karbon-negatif pertama di Indonesia. Restorasi 1.000 ha mangrove menghasilkan 500.000+ karbon kredit/tahun yang diperdagangkan di pasar karbon internasional. Pendapatan karbon mengalir langsung ke warga via Sovereign Data Trust.',
    icon: Leaf,
    color: '#22c55e',
    tag: 'CARBON ECONOMY'
  },
  {
    id: 6,
    title: 'Neural Interface Fishing Intelligence',
    desc: 'Sistem AI yang memprediksi migrasi ikan dengan akurasi 90%+ menggunakan data satelit, suhu permukaan laut, arus oseanografik, dan data historis tangkapan. Informasi dikirim langsung ke smartphone nelayan — mengurangi bahan bakar 40% dan meningkatkan tangkapan 60%.',
    icon: Brain,
    color: '#f59e0b',
    tag: 'AI MARITIME'
  },
  {
    id: 7,
    title: 'Holographic Nagari — Digital Adat Council',
    desc: 'Musyawarah nagari digital di mana ninik mamak, alim ulama, dan cerdik pandai dapat berpartisipasi dari mana saja melalui hologram real-time. Keputusan adat terekam di blockchain dan terintegrasi dengan SPBE — menyatukan tradisi Minangkabau dengan teknologi terkini.',
    icon: Users,
    color: '#6366f1',
    tag: 'ADAT + DIGITAL'
  },
  {
    id: 8,
    title: 'Bioluminescent Smart Coastline',
    desc: 'Integrasi ecologi alami dengan smart monitoring. Fitoplankton bioluminescent sebagai indikator kualitas air alami — saat air bersih, pantai bercahaya biru; saat tercemar, cahaya meredup. Sensor IoT memvalidasi data bioluminescent secara real-time.',
    icon: Sparkles,
    color: '#06b6d4',
    tag: 'BIO-TECH'
  },
  {
    id: 9,
    title: 'Pesisir Sovereign AI — LLM Daerah',
    desc: 'Large Language Model yang dilatih khusus dengan 100.000+ dokumen Pesisir Selatan — peraturan daerah, data APBD, sejarah adat, kearifan lokal. Berjalan di on-premise GPU server, bukan cloud publik. Kedaulatan AI sejati: model yang memahami budaya dan kebutuhan daerahnya sendiri.',
    icon: Cpu,
    color: '#0ea5e9',
    tag: 'SOVEREIGN AI'
  },
  {
    id: 10,
    title: 'Tidal Highway — Smart Sea Corridor',
    desc: 'Koridor laut pintar yang menghubungkan seluruh kecamatan dengan autonomous electric ferry, real-time tide prediction, dan AI traffic management. Setiap dermaga dilengkapi wireless charging untuk ferry listrik. Koridor ini menjadi "jalan tol laut" pertama di Indonesia yang 100% elektrik dan otonom.',
    icon: Anchor,
    color: '#10b981',
    tag: 'AUTONOMOUS MARITIME'
  }
]

// ===== COMPONENTS =====

function AnimatedCounter({ target, duration = 2, suffix = '' }: { target: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function SectionTitle({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="text-center mb-12 md:mb-16"
    >
      <motion.h2
        variants={fadeInUp}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-foreground'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeInUp} className={`text-lg md:text-xl max-w-3xl mx-auto ${light ? 'text-white/80' : 'text-muted-foreground'}`}>
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={scaleIn}
        className="mt-4 mx-auto w-24 h-1 rounded-full"
        style={{ background: 'linear-gradient(90deg, #0ea5e9, #10b981, #f59e0b)' }}
      />
    </motion.div>
  )
}

// ---- HERO SECTION ----
function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => { setMounted(true) }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ position: 'relative' }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0c1445 0%, #0a1628 30%, #0d2137 60%, #071a2c 100%)' }} />
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)' }}
        />
        {/* Particle system */}
        {mounted && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: 'easeInOut' }}
          />
        ))}
        {/* Ocean waves at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full" preserveAspectRatio="none">
            <motion.path
              d="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z"
              fill="rgba(14,165,233,0.1)"
              animate={{ d: [
                'M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z',
                'M0,120 C240,70 480,130 720,80 C960,130 1200,70 1440,120 L1440,200 L0,200 Z',
                'M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z'
              ] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M0,130 C300,170 600,90 900,130 C1100,160 1300,100 1440,130 L1440,200 L0,200 Z"
              fill="rgba(16,185,129,0.08)"
              animate={{ d: [
                'M0,130 C300,170 600,90 900,130 C1100,160 1300,100 1440,130 L1440,200 L0,200 Z',
                'M0,140 C300,100 600,160 900,120 C1100,150 1300,110 1440,140 L1440,200 L0,200 Z',
                'M0,130 C300,170 600,90 900,130 C1100,160 1300,100 1440,130 L1440,200 L0,200 Z'
              ] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm text-white/80">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            PGA-166 · Edisi Berdaulat 2026 · KMN Berdikari Governance Layer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 leading-tight"
        >
          <span className="block" style={{ background: 'linear-gradient(135deg, #0ea5e9, #22d3ee, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            PESISIR SELATAN
          </span>
          <span className="block mt-2" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SMART CIVILIZATION
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto mb-4"
        >
          Atlas 7 Pilar Peradaban Maritim Digital
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-8 italic"
        >
          &ldquo;Sebuah peradaban tidak diukur dari tinggi puncak menaranya, melainkan dari sejauh mana teknologi terdalamnya menyentuh nelayan terpencil dan petani paling tepi.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {['GOVERNANCE', 'ECONOMY', 'MARITIME', 'LIVING', 'ENVIRONMENT', 'MOBILITY', 'DEFENSE'].map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, type: 'spring', stiffness: 200 }}
              className="px-3 py-1 rounded-full text-xs md:text-sm font-semibold border backdrop-blur-sm"
              style={{
                borderColor: `${sevenPillars[i].color}40`,
                color: sevenPillars[i].color,
                backgroundColor: `${sevenPillars[i].color}15`
              }}
            >
              {p}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#pillars" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)' }}>
            Jelajahi 7 Pilar <ChevronRight className="w-5 h-5" />
          </a>
          <a href="#dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg border-2 border-white/30 hover:bg-white/10 transition-all hover:scale-105">
            Dashboard KPI <Activity className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-8 h-8 text-white/40 mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ---- VISION SECTION ----
function VisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #071a2c 0%, #0c2d48 50%, #0a1628 100%)' }}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle light title="Visi 2030" subtitle="Peradaban Maritim Digital yang Berdaulat, Berkeadilan, dan Berkelanjutan" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {[
            { title: 'Berdaulat', desc: 'Data warga adalah milik warga, infrastruktur kritikal dimiliki daerah, dan kebijakan tidak diiktisarkan oleh kepentingan asing.', icon: Shield, color: '#0ea5e9' },
            { title: 'Berkeadilan', desc: 'Teknologi harus lebih dahulu menyentuh nelayan terpencil, bukan hanya kelas menengah perkotaan.', icon: Scale, color: '#10b981' },
            { title: 'Berkelanjutan', desc: 'Setiap investasi harus memperhitungkan generasi ke-7 ke depan, bukan hanya periode anggaran lima tahun.', icon: Leaf, color: '#f59e0b' }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="relative group">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ background: `radial-gradient(circle, ${item.color}30, transparent)` }} />
              <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:scale-[1.02]">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: `${item.color}20` }}>
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <p className="text-center text-white/80 text-lg md:text-xl italic max-w-4xl mx-auto">
            &ldquo;Pesisir Selatan 2030 — Peradaban Maritim Digital yang Berdaulat, Berkeadilan, dan Berkelanjutan,
            sebagai <span className="font-bold" style={{ color: '#f59e0b' }}>Role Model ASEAN Smart Maritime Civilization</span>.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ---- NINE VALUES SECTION ----
function NineValuesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="9 Pilar Nilai Peradaban"
          subtitle="Fondasi etis yang membedakan peradaban Pesisir Selatan dari sekadar proyek smart city konvensional"
        />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {nineValues.map((v, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative p-6 rounded-xl border border-border bg-card hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground">{v.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{v.meaning}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    <Target className="w-3 h-3" />
                    {v.indicator}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- 7 PILLARS SECTION ----
function PillarsSection() {
  const [activePillar, setActivePillar] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pillars" ref={ref} className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 50%, #f0fdf4 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Arsitektur 7 Pilar"
          subtitle="Tujuh pilar Smart City Pesisir Selatan yang lebih sesuai dengan karakter maritim dan kepulauan"
        />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {sevenPillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              onClick={() => setActivePillar(activePillar === i ? null : i)}
              className="cursor-pointer group relative"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${pillar.color}25, transparent 70%)` }} />
              <div className="relative p-6 rounded-2xl border bg-white hover:shadow-2xl transition-all duration-500 h-full"
                style={{ borderColor: activePillar === i ? pillar.color : 'transparent' }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${pillar.color}20, ${pillar.color}40)` }}>
                  <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: pillar.color }}>
                    {pillar.id}
                  </span>
                  <h3 className="font-bold text-lg text-foreground">{pillar.name}</h3>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: pillar.color }}>{pillar.tagline}</p>
                <p className="text-sm text-muted-foreground mb-4">{pillar.description}</p>

                <AnimatePresence>
                  {activePillar === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">KPI Target 2029</p>
                        {pillar.kpis.map((kpi, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: pillar.color }} />
                            <span className="text-sm text-foreground">{kpi}</span>
                          </div>
                        ))}
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-2">Program Utama</p>
                        {pillar.details.map((d, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <ArrowUpRight className="w-3 h-3 shrink-0" style={{ color: pillar.color }} />
                            <span className="text-xs text-muted-foreground">{d}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex items-center gap-1 text-xs" style={{ color: pillar.color }}>
                  {activePillar === i ? 'Tutup detail' : 'Klik untuk detail'}
                  <ChevronDown className={`w-3 h-3 transition-transform ${activePillar === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Three-Layer Architecture Card */}
          <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="group relative">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.2), transparent 70%)' }} />
            <div className="relative p-6 rounded-2xl border border-dashed border-primary/30 bg-white/80 h-full flex flex-col items-center justify-center text-center">
              <Building2 className="w-12 h-12 text-primary/40 mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Three-Layer Sovereign Architecture</h3>
              <div className="space-y-2 w-full">
                {[
                  { layer: 'Infrastruktur', desc: 'Fisik & Jaringan', color: '#0ea5e9' },
                  { layer: 'Platform', desc: 'Aplikasi & Data', color: '#10b981' },
                  { layer: 'Tata Kelola', desc: 'Kelembagaan & Nilai', color: '#f59e0b' }
                ].map((l, j) => (
                  <div key={j} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: `${l.color}10` }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="text-sm font-medium" style={{ color: l.color }}>{l.layer}</span>
                    <span className="text-xs text-muted-foreground">— {l.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ---- SUPER IDEAS SECTION ----
function SuperIdeasSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c2d48 50%, #071a2c 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle light title="8 Super Idea Terobosan" subtitle="Inovasi revolusioner yang membedakan Atlas PGA-166 dari konvensi smart city biasa" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {superIdeas.map((idea, i) => (
            <motion.div
              key={idea.id}
              variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${idea.color}20, transparent 60%)` }} />
              <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${idea.color}20` }}>
                    <idea.icon className="w-6 h-6" style={{ color: idea.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: idea.color }}>
                        SUPER IDEA #{idea.id}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg text-white mb-2">{idea.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{idea.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- ROADMAP SECTION ----
function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Roadmap 2026-2030" subtitle="Implementasi bertahap menuju Role Model ASEAN Smart Maritime Civilization" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-8"
        >
          {roadmapData.map((phase, i) => (
            <motion.div key={i} variants={fadeInUp} className="relative">
              <div className="flex items-start gap-4 md:gap-8">
                <div className="flex flex-col items-center shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}80)` }}
                  >
                    <span className="text-white font-bold text-sm">{phase.phase}</span>
                  </motion.div>
                  {i < roadmapData.length - 1 && (
                    <div className="w-0.5 h-16 mt-2" style={{ backgroundColor: `${phase.color}30` }} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: phase.color }}>
                      {phase.year}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    {phase.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + j * 0.1, duration: 0.5 }}
                        className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:shadow-md transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: phase.color }} />
                        <span className="text-sm text-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- INVESTMENT SECTION ----
function InvestmentSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle title="Estimasi Investasi" subtitle="Total investasi Rp 8.000 Miliar untuk transformasi Smart City Pesisir Selatan 2026-2028" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Investment Bars */}
          <motion.div variants={fadeInLeft} className="space-y-3">
            {investmentData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{item.sector}</span>
                  <span className="text-sm font-bold text-primary">Rp {item.value} M</span>
                </div>
                <div className="h-8 rounded-lg bg-primary/10 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${item.pct * (100 / 15)}%` } : { width: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-lg relative overflow-hidden"
                    style={{ background: `linear-gradient(90deg, #0ea5e9, #10b981)` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))' }} />
                    <span className="absolute inset-0 flex items-center px-3 text-xs font-bold text-white">{item.pct}%</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={fadeInRight} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total Investasi', numTarget: 8000, suffix: ' Miliar', icon: Coins, color: '#0ea5e9' },
                { label: 'Lapangan Kerja Baru', numTarget: 25000, suffix: '+', icon: Users, color: '#10b981' },
                { label: 'Wisatawan/Tahun', numTarget: 25, suffix: '', display: '2,5 Juta', icon: Globe, color: '#f59e0b' },
                { label: 'PAD per Tahun', numTarget: 850, suffix: ' M+', icon: TrendingUp, color: '#8b5cf6' },
                { label: 'UMKM Go Digital', numTarget: 10000, suffix: '+', icon: Cpu, color: '#f43f5e' },
                { label: 'Nilai Ekspor', numTarget: 12, suffix: '', display: '1,2 Triliun+', icon: Ship, color: '#22c55e' }
              ].map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="p-5 rounded-xl bg-white border border-border shadow-sm hover:shadow-lg transition-all"
                >
                  <m.icon className="w-8 h-8 mb-3" style={{ color: m.color }} />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    {m.display ? m.display : <><AnimatedCounter target={m.numTarget} />{m.suffix}</>}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="p-5 rounded-xl bg-white border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground">Break Even Point</span>
              </div>
              <p className="text-3xl font-bold" style={{ color: '#10b981' }}>6-7 Tahun</p>
              <p className="text-sm text-muted-foreground">Total Net Cashflow Tahunan: Rp 1.150 – 1.300 Miliar</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ---- KPI DASHBOARD SECTION ----
function KPIDashboardSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [liveData, setLiveData] = useState<number[]>(kpiDashboard.map(() => 0))

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setLiveData(prev => prev.map((val, i) => {
        const target = kpiDashboard[i].current
        const increment = target / 40
        return val + increment >= target ? target : val + increment
      }))
    }, 50)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section id="dashboard" ref={ref} className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #071a2c 0%, #0c2d48 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle light title="Dashboard KPI Smart City" subtitle="Monitoring real-time pencapaian Smart City Pesisir Selatan menuju 2030" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {kpiDashboard.map((kpi, i) => {
            const progress = kpi.unit === '%' ? (kpi.current / kpi.target) * 100 : (kpi.current / kpi.target) * 100
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.2)' }}>
                    <kpi.icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>
                    {progress.toFixed(0)}% tercapai
                  </span>
                </div>
                <h4 className="font-semibold text-white mb-2">{kpi.label}</h4>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl font-bold text-white">
                    {kpi.unit === '%' ? Math.round(liveData[i]) : Math.round(liveData[i]).toLocaleString()}
                  </span>
                  <span className="text-sm text-white/50 mb-1">/ {kpi.target}{kpi.unit} {kpi.unit}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${Math.min(progress, 100)}%` } : { width: 0 }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 1.5, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #0ea5e9, #10b981)' }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ---- STRATEGIC PROFILE SECTION ----
function StrategicProfileSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Profil Strategis 2024-2030" subtitle="Transformasi Pesisir Selatan dalam angka menuju Role Model ASEAN" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold text-foreground">Dimensi</th>
                <th className="text-center p-4 font-semibold text-muted-foreground">2024</th>
                <th className="text-center p-4 font-semibold" style={{ color: '#0ea5e9' }}>Target 2029</th>
                <th className="text-center p-4 font-semibold" style={{ color: '#10b981' }}>Target 2030</th>
              </tr>
            </thead>
            <tbody>
              {strategicProfile.map((row, i) => (
                <motion.tr
                  key={i}
                  variants={fadeInUp}
                  className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                >
                  <td className="p-4 font-medium text-foreground">{row.dim}</td>
                  <td className="p-4 text-center text-muted-foreground">{row.current}</td>
                  <td className="p-4 text-center font-semibold" style={{ color: '#0ea5e9' }}>{row.target2029}</td>
                  <td className="p-4 text-center font-semibold" style={{ color: '#10b981' }}>{row.target2030}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

// ---- DIGITAL TWIN SECTION ----
function DigitalTwinSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1445 0%, #1a1a3e 50%, #0a1628 100%)' }}>
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionTitle light title="Pesisir Digital Twin" subtitle="Replika digital 3D seluruh kabupaten untuk simulasi kebijakan dan mitigasi bencana" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: 'Base Layer', desc: 'Citra satelit resolusi tinggi (BRIN/RISAT), LiDAR topografi resolusi 1 meter, batimetri multi-beam perairan dangkal.', icon: Satellite, color: '#0ea5e9' },
            { title: 'Live Layer', desc: 'Feed real-time dari 1.200 sensor IoT — cuaca, pasang surut, kualitas air, kepadatan ikan, banjir, abrasi — dan data transaksional APBD.', icon: Activity, color: '#10b981' },
            { title: 'Simulation Layer', desc: 'Model machine learning untuk prediksi banjir, abrasi pantai, dan dampak ekonomi kebijakan. Simulasi 1.000 hari ke depan.', icon: Brain, color: '#f59e0b' }
          ].map((layer, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${layer.color}30, transparent 60%)` }} />
              <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-center">
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${layer.color}30, ${layer.color}50)` }}
                >
                  <layer.icon className="w-10 h-10" style={{ color: layer.color }} />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{layer.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{layer.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Investasi 5 Tahun', value: 'Rp 42 M', icon: Coins },
            { label: 'Sensor IoT', value: '1.200+', icon: Wifi },
            { label: 'Model ML Prioritas', value: '5', icon: Brain },
            { label: 'Sumber Dana', value: 'DAK + Green Sukuk + BRIN', icon: FileCheck }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
              <item.icon className="w-6 h-6 text-sky-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{item.value}</p>
              <p className="text-xs text-white/50 mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- GAP ANALYSIS SECTION ----
function GapAnalysisSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="GAP Analysis" subtitle="Enam kesenjangan struktural yang harus dijembatani oleh Atlas PGA-166" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-4"
        >
          {[
            { gap: 'Kesenjangan Digital', baseline: '4G 62% wilayah', target: '4G 100% + 5G pilot', instrument: 'Solar BTS 47 titik, DC Edge 3 lokasi, kepulauan Wi-Fi mesh', icon: Wifi, color: '#0ea5e9' },
            { gap: 'Refocusing APBD', baseline: 'IT CAPEX < 1,5%', target: 'IT CAPEX ≥ 3%', instrument: 'PBK + Dana Kluster Inovasi Digital 3%', icon: Coins, color: '#f59e0b' },
            { gap: 'Integrasi Data Vertikal', baseline: 'Silo data 12 OPD', target: 'SatuData Pesisir terpadu', instrument: 'SIPD, OneData Indonesia, Sovereign Data Trust', icon: Database, color: '#10b981' },
            { gap: 'SDM Digital', baseline: 'IKD 38/100', target: 'IKD 70/100', instrument: 'Akademi Polymath Pesisir, sandi kompetensi 5K warga', icon: GraduationCap, color: '#8b5cf6' },
            { gap: 'Tata Kelola & Anti-Korupsi', baseline: 'Audit manual, Opini WDP', target: 'Audit blockchain, Opini WTP', instrument: 'Blockchain APBD, AI Cross-Check, APIP Digital', icon: Shield, color: '#f43f5e' },
            { gap: 'Akses Pembiayaan Nelayan', baseline: 'Bankable ratio 18%', target: 'Bankable ratio 65%', instrument: 'KMN Berdikari, Green Sukuk Daerah, Smart Wakaf', icon: Handshake, color: '#22c55e' }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ x: 5 }}
              className="p-5 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4 md:w-1/4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}15` }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="font-bold text-foreground">{item.gap}</span>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
                    <p className="text-xs text-muted-foreground mb-1">Baseline 2024</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">{item.baseline}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                    <p className="text-xs text-muted-foreground mb-1">Target 2029</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">{item.target}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: `${item.color}10` }}>
                    <p className="text-xs text-muted-foreground mb-1">Instrumen</p>
                    <p className="font-medium text-foreground text-xs">{item.instrument}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- FINANCING SECTION ----
function FinancingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #f0f9ff 0%, #f8fafc 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Skema Pembiayaan" subtitle="Empat pilar pembiayaan dengan prinsip transparan, akuntabel, berkelanjutan, dan berkeadilan" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {[
            { title: 'KPBUI', desc: 'Kerjasama Pemerintah & Badan Usaha untuk infrastruktur strategis dan layanan publik.', icon: Building2, color: '#0ea5e9' },
            { title: 'Sukuk Daerah / Green Sukuk', desc: 'Pembiayaan berbasis syariah dan lingkungan untuk proyek berkelanjutan.', icon: Coins, color: '#10b981' },
            { title: 'Investor Swasta & Global', desc: 'Investasi langsung pada sektor potensial maritim, pariwisata, dan teknologi.', icon: Globe, color: '#f59e0b' },
            { title: 'Multilateral / Development Bank', desc: 'Pendanaan proyek berkelanjutan dari lembaga multilateral internasional.', icon: Landmark, color: '#8b5cf6' }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.03, y: -5 }}
              className="p-6 rounded-2xl border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}15` }}>
                <item.icon className="w-7 h-7" style={{ color: item.color }} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- 100 HARI PERTAMA SECTION ----
function First100DaysSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c2d48 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle light title="Rencana Aksi 100 Hari Pertama" subtitle="Langkah cepat dan terukur untuk sinyal kepemimpinan transformasi digital" />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { phase: 'Hari 1-25', title: 'Sinyal Kepemimpinan', items: ['Pelantikan Tim SatuData Pesisir', 'Penandatanganan Perda Smart City', 'Launching Akademi Polymath', 'Pengumuman Open Data Policy'], color: '#0ea5e9', icon: Zap },
            { phase: 'Hari 26-50', title: 'Konsolidasi Kelembagaan', items: ['Pembentukan Inspektorat Digital', 'Pengadaan Data Center Edge', 'MoU dengan BRIN untuk Digital Twin', 'Perda KMN Berdikari'], color: '#10b981', icon: Building2 },
            { phase: 'Hari 51-75', title: 'Quick Wins', items: ['Pilot PBK di 3 OPD', 'Smart Clinic di 3 pulau', 'Blockchain APBD testnet', '47 BTS Solar groundbreaking'], color: '#f59e0b', icon: Star },
            { phase: 'Hari 76-100', title: 'Skala & Legitimasi', items: ['Pilot Digital Twin Base Layer', 'SPBE integration 20 modul', 'KPBUI framework launch', 'ASCN membership application'], color: '#8b5cf6', icon: Rocket }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}20` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: item.color }}>{item.phase}</span>
                  <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
                </div>
              </div>
              <div className="space-y-2">
                {item.items.map((it, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                    <span className="text-sm text-white/70">{it}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- VISION IMAGE SECTION ----
function VisionImageSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle title="Visi Smart City Pesisir Selatan 2028" subtitle="Proyek Strategis Visi MESITA 2030 — True Paradise in the World" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="/smart-city-vision.png"
            alt="Visi Smart City Pesisir Selatan 2028"
            className="w-full h-auto object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="text-white font-bold text-lg md:text-xl">PEMERINTAH KABUPATEN PESISIR SELATAN</p>
            <p className="text-white/70 text-sm">PT. Medina Kapital Investment · Dasar Hukum: PP No. 77 Tahun 2021</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---- ENHANCED VISION 2028 SECTION ----
function EnhancedVisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1445 0%, #0a1628 50%, #0c2d48 100%)' }}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2306b6d4\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M40 0l10 20H30zM0 40l20-10v20zM80 40L60 30v20zM40 80L30 60h20z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle light title="Visi Smart City Pesisir Selatan 2028" subtitle="Proyek Strategis Visi MESITA 2030 — True Paradise in the World" />

        {/* Hero Image with Enhanced Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
        >
          <img
            src="/smart-city-hero-v2.png"
            alt="Visi Smart City Pesisir Selatan 2028 - Futuristic Maritime City"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {['Smart Marina', 'Digital Twin', 'IoT Network', 'Green Energy', 'Smart Port', 'Telemedisin'].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-white font-bold text-2xl md:text-3xl mb-2">PESISIR SELATAN 2028</p>
            <p className="text-white/70 text-sm md:text-base max-w-3xl">
              Transformasi kabupaten pesisir menjadi smart city terintegrasi, destinasi wisata bahari kelas dunia,
              berdaya saing global, masyarakat sejahtera, dan berkelanjutan.
            </p>
          </div>
        </motion.div>

        {/* Detailed Vision Description Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[
            { title: 'Smart Marina & Waterfront', desc: 'Marina internasional dengan yacht club, promenade, dan waterfront lifestyle. Pelabuhan pintu gerbang maritim ASEAN dengan smart port, logistik efisien, dan pengangkutan ekspor terintegrasi.', icon: Anchor, color: '#0ea5e9' },
            { title: 'Smart Tourism Paradise', desc: 'Destinasi wisata bahari kelas dunia — Boros Batu, Pantai Carocok, Mandeh Tourism Region. Peningkatan destinasi, promosi digital, dan smart tourism apps untuk 2,5 juta wisatawan/tahun.', icon: Globe, color: '#10b981' },
            { title: 'Digital Government Excellence', desc: 'Tata kelola digital, SPBE, dan layanan publik terintegrasi 100%. Command center smart city untuk real-time city monitoring, keamanan, transportasi, kesehatan, dan pendidikan.', icon: Landmark, color: '#f59e0b' },
            { title: 'Blue Economy Powerhouse', desc: 'Perikanan modern dengan cold storage, traceability, dan ekspor. Pertanian presisi berbasis IoT dan supply chain modern. Ekonomi biru berkontribusi 50% PDRB pada 2030.', icon: TrendingUp, color: '#22c55e' },
            { title: 'Resilient & Green Environment', desc: 'Smart disaster management dengan early warning system dan command center. Energi terbarukan 80% dari kapasitas. Restorasi 1.000 ha mangrove. Sampah laut berkurang 60%.', icon: Leaf, color: '#06b6d4' },
            { title: 'Inclusive Smart Living', desc: 'Telemedicine 100% pulau, smart school dan rumah belajar di setiap kecamatan. Smart housing tangguh bencana. Layanan dasar inklusif — air, sanitasi, energi untuk seluruh warga.', icon: Heart, color: '#f43f5e' }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/20">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}20, transparent 60%)` }} />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}20` }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Transformation Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="/transformation-vision.png"
            alt="Transformasi Desa Nelayan menuju Smart City"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          <div className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-red-500/80 backdrop-blur-sm text-white text-sm font-bold">
            BEFORE — Desa Nelayan Tradisional
          </div>
          <div className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-emerald-500/80 backdrop-blur-sm text-white text-sm font-bold">
            AFTER — Smart Maritime City
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---- INTERNATIONAL SMART CITY BENCHMARK SECTION ----
function WorldBenchmarkSection() {
  const [activeCity, setActiveCity] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Studi Banding Smart City Terbaik Dunia"
          subtitle="Inspirasi dari 6 kota pintar terdepan yang diadaptasi untuk konteks maritim-kepulauan Pesisir Selatan"
        />
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {worldSmartCities.map((city, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setActiveCity(activeCity === i ? null : i)}
              className="cursor-pointer group"
            >
              <div className="relative p-6 rounded-2xl border border-border bg-card hover:shadow-2xl transition-all duration-500 h-full"
                style={{ borderColor: activeCity === i ? city.color : undefined }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${city.color}15, transparent 60%)` }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{city.flag}</span>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{city.city}</h3>
                      <p className="text-xs text-muted-foreground">{city.country}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3" style={{ background: `${city.color}15` }}>
                    <Star className="w-3 h-3" style={{ color: city.color }} />
                    <span className="text-xs font-semibold" style={{ color: city.color }}>{city.specialty}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{city.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {city.keyTech.map((tech, j) => (
                      <span key={j} className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Adaptasi Pesisir Selatan</p>
                    <p className="text-sm font-medium" style={{ color: city.color }}>{city.learned}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- COMMAND CENTER SIMULATION SECTION ----
function CommandCenterSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeScreen, setActiveScreen] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen(prev => (prev + 1) % 6)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const screens = [
    { label: 'Layanan Publik', icon: FileCheck, status: 'Online', metric: '47 modul aktif', color: '#0ea5e9' },
    { label: 'Real-time Monitoring', icon: Activity, status: 'Live', metric: '1.200 sensor IoT', color: '#10b981' },
    { label: 'Keamanan & Ketertiban', icon: Shield, status: 'Secure', metric: '0 insiden 24 jam', color: '#f59e0b' },
    { label: 'Transportasi Pintar', icon: Car, status: 'Active', metric: '5 rute ferry smart', color: '#8b5cf6' },
    { label: 'Kesehatan & Pendidikan', icon: Heart, status: 'Connected', metric: '100% telemedisin', color: '#f43f5e' },
    { label: 'Pariwisata & Ekonomi', icon: TrendingUp, status: 'Growing', metric: 'Rp 850M+ PAD', color: '#22c55e' }
  ]

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050d18 0%, #0a1628 50%, #0c1445 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle light title="Command Center Smart City" subtitle="Pusat kendali digital terintegrasi untuk monitoring real-time seluruh operasi kota" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="/command-center.png"
              alt="Smart City Command Center Pesisir Selatan"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-red-500"
                />
                <span className="text-white font-bold text-sm uppercase tracking-wider">LIVE — Command Center Pesisir Selatan</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/60">Screen: <span className="text-white font-semibold">{screens[activeScreen].label}</span></span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${screens[activeScreen].color}20`, color: screens[activeScreen].color }}>
                  {screens[activeScreen].status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Status Panels */}
          <div className="lg:col-span-2 space-y-3">
            {screens.map((screen, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: -3 }}
                onClick={() => setActiveScreen(i)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                  activeScreen === i ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${screen.color}20` }}>
                    <screen.icon className="w-5 h-5" style={{ color: screen.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{screen.label}</span>
                      {activeScreen === i && (
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 rounded-full" style={{ backgroundColor: screen.color }}
                        />
                      )}
                    </div>
                    <span className="text-xs text-white/40">{screen.metric}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${screen.color}20`, color: screen.color }}>
                    {screen.status}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Aggregate Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              {[
                { label: 'Kamera CCTV', value: '240+', color: '#0ea5e9' },
                { label: 'IoT Sensors', value: '1.200+', color: '#10b981' },
                { label: 'Uptime', value: '99.9%', color: '#f59e0b' },
                { label: 'Response Time', value: '<3 detik', color: '#8b5cf6' }
              ].map((stat, i) => (
                <div key={i} className="p-3 rounded-lg border border-white/10 bg-white/5 text-center">
                  <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- BRILLIANT FUTURE SUPER IDEAS SECTION ----
function BrilliantFutureSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #1a0a2e 50%, #0a1628 100%)' }}>
      <div className="absolute inset-0">
        {/* Neural network pattern - static SVG, no Math.random to avoid hydration mismatch */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 400">
          {[
            {cx:120,cy:80},{cx:350,cy:200},{cx:600,cy:50},{cx:200,cy:350},{cx:500,cy:300},
            {cx:700,cy:150},{cx:50,cy:250},{cx:450,cy:100},{cx:650,cy:380},{cx:300,cy:50},
            {cx:150,cy:200},{cx:550,cy:250},{cx:750,cy:80},{cx:80,cy:380},{cx:400,cy:350},
            {cx:250,cy:150},{cx:680,cy:280},{cx:100,cy:30},{cx:500,cy:50},{cx:350,cy:380}
          ].map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={2}
              fill="#8b5cf6"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: (i % 5) * 0.5 }}
            />
          ))}
          {[
            {x1:120,y1:80,x2:350,y2:200},{x1:350,y1:200,x2:600,y2:50},{x1:200,y1:350,x2:500,y2:300},
            {x1:500,y1:300,x2:700,y2:150},{x1:50,y1:250,x2:450,y2:100},{x1:450,y1:100,x2:650,y2:380},
            {x1:300,y1:50,x2:150,y2:200},{x1:550,y1:250,x2:750,y2:80},{x1:80,y1:380,x2:400,y2:350},
            {x1:250,y1:150,x2:680,y2:280},{x1:100,y1:30,x2:500,y2:50},{x1:350,y1:380,x2:700,y2:150},
            {x1:600,y1:50,x2:200,y2:350},{x1:650,y1:380,x2:300,y2:50},{x1:120,y1:80,x2:550,y2:250}
          ].map((l, i) => (
            <motion.line
              key={`l${i}`}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="#8b5cf6"
              strokeWidth={0.5}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i % 4) * 0.7 }}
            />
          ))}
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">BRILLIANT THE FUTURE</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">
            10 Super Idea <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Masa Depan</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/60 max-w-3xl mx-auto">
            Konsep revolusioner yang melampaui smart city konvensional — menuju peradaban maritim digital yang belum pernah ada di dunia
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {brilliantFutureIdeas.map((idea, i) => (
            <motion.div
              key={idea.id}
              variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${idea.color}20, transparent 60%)` }} />
              <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-all duration-300 hover:border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${idea.color}20` }}>
                    <idea.icon className="w-6 h-6" style={{ color: idea.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: idea.color }}>
                        #{idea.id}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${idea.color}40`, color: idea.color }}>
                        {idea.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg text-white mb-2">{idea.title}</h4>
                    <p className="text-sm text-white/55 leading-relaxed">{idea.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- FOOTER ----
function Footer() {
  return (
    <footer className="relative py-12" style={{ background: 'linear-gradient(180deg, #0a1628, #050d18)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4" style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              PESISIR SELATAN SMART CIVILIZATION
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Atlas peradaban yang menyatukan tujuh pilar Smart City, delapan Super Idea terobosan, dan kerangka tata kelola APBD berbasis blockchain kepatuhan.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">7 Pilar Smart City</h4>
            <div className="space-y-2">
              {sevenPillars.map(p => (
                <div key={p.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-sm text-white/50">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Dokumen</h4>
            <div className="space-y-2 text-sm text-white/50">
              <p>PGA-166 · Versi 1.0 · 2026</p>
              <p>Disusun oleh Dewan 46 Master Polymath</p>
              <p>KMN Berdikari Governance Layer</p>
              <p>Edisi Berdaulat 2026</p>
            </div>
            <h4 className="font-bold text-white mt-6 mb-2">Dipersembahkan untuk</h4>
            <p className="text-sm text-white/40">Gugun Gunara · M. Lutfi Azmi · Prabu Danling · Santri Angon</p>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/30">
            &copy; 2026 Kabupaten Pesisir Selatan, Sumatera Barat — Smart Civilization Atlas PGA-166
          </p>
          <p className="text-xs text-white/20 mt-2 italic">
            &ldquo;Pesisir Selatan akan membuktikan bahwa kecerdasan digital dapat dibangun di atas laut, bukan hanya di atas beton.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  )
}

// ===== MAIN PAGE =====
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)' }}>
              <Waves className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-sm md:text-base">PESISIR SELATAN <span className="text-sky-400">SMART CITY</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <a href="#pillars" className="hover:text-white transition-colors">7 Pilar</a>
            <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)' }}>
              PGA-166
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <HeroSection />
        <VisionSection />
        <EnhancedVisionSection />
        <NineValuesSection />
        <PillarsSection />
        <SuperIdeasSection />
        <CommandCenterSection />
        <DigitalTwinSection />
        <WorldBenchmarkSection />
        <BrilliantFutureSection />
        <GapAnalysisSection />
        <RoadmapSection />
        <InvestmentSection />
        <KPIDashboardSection />
        <StrategicProfileSection />
        <FinancingSection />
        <First100DaysSection />
        <VisionImageSection />
      </main>

      <Footer />
    </div>
  )
}
