import { NextResponse } from 'next/server'

const pillars = [
  {
    id: 1, name: 'Smart Governance', color: '#0ea5e9',
    tagline: 'Tata Kelola APBD Berdaulat',
    kpis: [
      { label: 'Skor SPBE', current: 2.6, target: 4.5, unit: '' },
      { label: 'Open Data Index', current: 35, target: 85, unit: '%' },
      { label: 'Blockchain Coverage', current: 0, target: 100, unit: '%' }
    ],
    programs: ['Reformasi APBD berbasis PBK', 'Blockchain APBD 5-Node Validator', 'AI Cross-Check Engine', 'Pesisir Citizenship Digital ID', 'AI Mayor & Virtual Sekda', 'Inspektorat Digital & IT Audit Forensik']
  },
  {
    id: 2, name: 'Smart Economy', color: '#10b981',
    tagline: 'Ekonomi Biru Berkeadilan',
    kpis: [
      { label: 'PAD Digital', current: 5, target: 50, unit: 'M' },
      { label: 'UMKM on-platform', current: 5000, target: 100000, unit: '' },
      { label: 'Bankable ratio', current: 18, target: 65, unit: '%' }
    ],
    programs: ['Ekonomi Biru Pesisir Selatan', 'BUMD Digital & Koperasi Nelayan', 'Pajak Data & Digital Service Tax', 'Smart Wakaf & Green Sukuk', 'Sovereign Data Trust', 'Ekosistem UMKM Digital Pesisir']
  },
  {
    id: 3, name: 'Smart Maritime', color: '#6366f1',
    tagline: 'Pelabuhan Pintar & Logistik Kepulauan',
    kpis: [
      { label: 'Smart Port', current: 0, target: 3, unit: 'lokasi' },
      { label: 'BTS Solar', current: 0, target: 47, unit: 'titik' },
      { label: '4G Coverage', current: 62, target: 100, unit: '%' }
    ],
    programs: ['Smart Port Pesisir Selatan', 'Jalan Tol Laut & Drone Logistik', 'Armada Nelayan Digital', 'BTS Solar-Powered 47 titik', 'Data Center Edge Maritim', 'Pesisir Space & Satellite Layer']
  },
  {
    id: 4, name: 'Smart Living', color: '#f43f5e',
    tagline: 'Kesejahteraan Inklusif',
    kpis: [
      { label: 'Telemedisin Coverage', current: 20, target: 100, unit: '%' },
      { label: 'SPM Kinerja', current: 55, target: 90, unit: '%' },
      { label: 'IKD', current: 38, target: 70, unit: '/100' }
    ],
    programs: ['Telemedisin Kepulauan & Smart Clinic', 'Pendidikan Digital & Sekolah Polymath', 'Smart Housing & Permukiman Tangguh Bencana', 'Layanan Dasar Inklusif', 'Pesisir Cultural Digital Archive']
  },
  {
    id: 5, name: 'Smart Environment', color: '#22c55e',
    tagline: 'Ekologi Hijau Berkelanjutan',
    kpis: [
      { label: 'Emisi Reduction', current: 0, target: 30, unit: '%' },
      { label: 'Mangrove Restorasi', current: 200, target: 1000, unit: 'ha' },
      { label: 'Sampah Laut Reduction', current: 0, target: 60, unit: '%' }
    ],
    programs: ['Smart Energy Grid berbasis Surya & Angin', 'IoT Banjir, Abrasi & Tsunami Early Warning', 'Pengelolaan Sampah Laut', 'Mangrove Digital Monitoring', 'Smart Agriculture & Blue Carbon Farming']
  },
  {
    id: 6, name: 'Smart Mobility', color: '#f59e0b',
    tagline: 'Mobilitas Berlayar Cerdas',
    kpis: [
      { label: 'Ferry Smart Routes', current: 0, target: 5, unit: 'rute' },
      { label: 'EV Charging Stations', current: 2, target: 50, unit: '' },
      { label: 'Drone Corridor', current: 0, target: 3, unit: 'koridor' }
    ],
    programs: ['Transportasi Laut Terintegrasi', 'EV Chain Motor Listrik Nelayan', 'Drone Logistik & Air Taxi Maritim', 'Smart Road & Traffic AI', 'Integrated Mobility Platform']
  },
  {
    id: 7, name: 'Smart Defense', color: '#8b5cf6',
    tagline: 'Pertahanan Sipil Digital',
    kpis: [
      { label: 'SOC Uptime', current: 0, target: 100, unit: '%' },
      { label: 'Satelit Images/day', current: 0, target: 2, unit: '' },
      { label: 'EOC Integration', current: 10, target: 100, unit: '%' }
    ],
    programs: ['Keamanan Siber Daerah & SOC', 'Citra Satelit & Geospasial Intelligence', 'Sistem Darurat Bencana Terintegrasi', 'KMN Berdikari Pertahanan Ekonomi', 'Perlindungan Data Strategis & UU PDP']
  }
]

const strategicProfile = {
  population: { current: '600.000', target2029: '620.000', target2030: '640.000' },
  hdi: { current: '71,2', target2029: '76,5', target2030: '79,5' },
  gdp: { current: '12.500', target2029: '22.000', target2030: '32.000' },
  internet4g: { current: '62%', target2029: '100%', target2030: '100% + 5G' },
  spbe: { current: '2,6 (Cukup)', target2029: '4,2 (Sangat Baik)', target2030: '4,5 (Excellent)' },
  bpkOpinion: { current: 'WDP', target2029: 'WTP', target2030: 'WTP Berkelanjutan' },
  emissions: { current: 'Baseline 2024', target2029: '-30%', target2030: '-45%' }
}

const investments = [
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

const roadmap = [
  { phase: 'Fase 1', year: '2026-2027', title: 'Fondasi Regulasi & Pilot', items: ['Pembentukan Tim SatuData Pesisir', 'Pilot PBK di 3 OPD prioritas', 'Pembangunan Data Center Edge', '47 BTS Solar-Powered', 'Perda Smart City & KMN Berdikari', 'Akademi Polymath Pesisir launch'], color: '#0ea5e9' },
  { phase: 'Fase 2', year: '2028-2029', title: 'Akselerasi & Integrasi', items: ['PBK ke seluruh OPD', 'Blockchain APBD live', 'Smart Port 3 lokasi operasional', 'Digital Twin Live Layer', '5G pilot Painan', 'Telemedisin 100% pulau'], color: '#10b981' },
  { phase: 'Fase 3', year: '2030', title: 'Kematangan & Ekspor Model', items: ['Role Model ASEAN Smart Maritime', 'Simulation Layer Digital Twin', 'ASCN membership', '5G full coverage', 'Emisi -45% achieved', 'Ekspor model ke kabupaten lain'], color: '#f59e0b' }
]

export async function GET() {
  return NextResponse.json({
    pillars,
    strategicProfile,
    investments,
    roadmap,
    totalInvestment: 8000,
    vision: 'Pesisir Selatan 2030 — Peradaban Maritim Digital yang Berdaulat, Berkeadilan, dan Berkelanjutan, sebagai Role Model ASEAN Smart Maritime Civilization.',
    documentInfo: {
      code: 'PGA-166',
      version: '1.0',
      year: 2026,
      author: 'Dewan 46 Master Polymath',
      governanceLayer: 'KMN Berdikari'
    }
  })
}
