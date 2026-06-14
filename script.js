
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, collection,
  getDocs, deleteDoc, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ─── FIREBASE CONFIG ────────────────────────────────────────────────────────
// REEMPLAZAR CON TU CONFIGURACION DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBDM4FV9zo9qy9n9JlnY-wcHqyxzx-SHkM",
  authDomain: "prode-mundial-6e9aa.firebaseapp.com",
  projectId: "prode-mundial-6e9aa",
  storageBucket: "prode-mundial-6e9aa.firebasestorage.app",
  messagingSenderId: "199969391294",
  appId: "1:199969391294:web:a4660f539579de9cc7d4ef"
};
// ────────────────────────────────────────────────────────────────────────────

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── FLAGS ──────────────────────────────────────────────────────────────────
// BASE: reemplazá con la URL base de tu repositorio GitHub
// Ejemplo: https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/flags/
// Cada imagen debe llamarse igual que la clave (ej: argentina.png, brasil.png)
const FLAG_BASE = 'https://github.com/LucasN01/Prode_Mundial_2026/blob/main/img/flags/';

const FLAG = {
  'México': FLAG_BASE + 'mexico.png' + '?raw=true',
  'Sudáfrica': FLAG_BASE + 'sudafrica.png' + '?raw=true',
  'Corea del Sur': FLAG_BASE + 'corea-del-sur.png' + '?raw=true',
  'República Checa': FLAG_BASE + 'republica-checa.png' + '?raw=true',
  'Canadá': FLAG_BASE + 'canada.png' + '?raw=true',
  'Bosnia': FLAG_BASE + 'bosnia.png' + '?raw=true',
  'Qatar': FLAG_BASE + 'qatar.png' + '?raw=true',
  'Suiza': FLAG_BASE + 'suiza.png' + '?raw=true',
  'Brasil': FLAG_BASE + 'brasil.webp' + '?raw=true',
  'Marruecos': FLAG_BASE + 'marruecos.png' + '?raw=true',
  'Haití': FLAG_BASE + 'haiti.png' + '?raw=true',
  'Escocia': FLAG_BASE + 'escocia.png' + '?raw=true',
  'EEUU': FLAG_BASE + 'eeuu.png' + '?raw=true',
  'Paraguay': FLAG_BASE + 'paraguay.png' + '?raw=true',
  'Australia': FLAG_BASE + 'australia.png' + '?raw=true',
  'Turquía': FLAG_BASE + 'turquia.png' + '?raw=true',
  'Alemania': FLAG_BASE + 'alemania.png' + '?raw=true',
  'Curazao': FLAG_BASE + 'curazao.png' + '?raw=true',
  'Costa de Marfil': FLAG_BASE + 'costa-de-marfil.png' + '?raw=true',
  'Ecuador': FLAG_BASE + 'ecuador.png' + '?raw=true',
  'Países Bajos': FLAG_BASE + 'paises-bajos.png' + '?raw=true',
  'Japón': FLAG_BASE + 'japon.png' + '?raw=true',
  'Suecia': FLAG_BASE + 'suecia.png' + '?raw=true',
  'Túnez': FLAG_BASE + 'tunez.png' + '?raw=true',
  'Bélgica': FLAG_BASE + 'belgica.png' + '?raw=true',
  'Egipto': FLAG_BASE + 'egipto.png' + '?raw=true',
  'Irán': FLAG_BASE + 'iran.png' + '?raw=true',
  'Nueva Zelanda': FLAG_BASE + 'nueva-zelanda.png' + '?raw=true',
  'España': FLAG_BASE + 'espana.png' + '?raw=true',
  'Cabo Verde': FLAG_BASE + 'cabo-verde.png' + '?raw=true',
  'Arabia Saudita': FLAG_BASE + 'arabia-saudita.png' + '?raw=true',
  'Uruguay': FLAG_BASE + 'uruguay.png' + '?raw=true',
  'Francia': FLAG_BASE + 'francia.png' + '?raw=true',
  'Senegal': FLAG_BASE + 'senegal.png' + '?raw=true',
  'Irak': FLAG_BASE + 'irak.png' + '?raw=true',
  'Noruega': FLAG_BASE + 'noruega.png' + '?raw=true',
  'Argentina': FLAG_BASE + 'argentina.png' + '?raw=true',
  'Argelia': FLAG_BASE + 'argelia.png' + '?raw=true',
  'Austria': FLAG_BASE + 'austria.png' + '?raw=true',
  'Jordania': FLAG_BASE + 'jordania.png' + '?raw=true',
  'Portugal': FLAG_BASE + 'portugal.png' + '?raw=true',
  'R. D. del Congo': FLAG_BASE + 'rd-del-congo.png' + '?raw=true',
  'Uzbekistán': FLAG_BASE + 'uzbekistan.png' + '?raw=true',
  'Colombia': FLAG_BASE + 'colombia.png' + '?raw=true',
  'Inglaterra': FLAG_BASE + 'inglaterra.png' + '?raw=true',
  'Ghana': FLAG_BASE + 'ghana.png' + '?raw=true',
  'Panamá': FLAG_BASE + 'panama.png' + '?raw=true',
  'Croacia': FLAG_BASE + 'croacia.png' + '?raw=true',
};

function flagImg(country) {
  const src = FLAG[country];
  if (!src) return `<span class="flag-fallback" title="${country}">🏳</span>`;
  return `<img class="flag-img" src="${src}" alt="${country}" onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<span class=\\'flag-fallback\\' title=\\'${country}\\'>🏳</span>')" />`;
}

// ─── PARTIDOS DATA ───────────────────────────────────────────────────────────
const MATCHES = [
  {id:"m0",group:"GRUPO A",date:"2026-06-11",jornada:"J1",home:"México",away:"Sudáfrica"},
  {id:"m1",group:"GRUPO A",date:"2026-06-11",jornada:"J1",home:"Corea del Sur",away:"República Checa"},
  {id:"m2",group:"GRUPO A",date:"2026-06-18",jornada:"J2",home:"República Checa",away:"Sudáfrica"},
  {id:"m3",group:"GRUPO A",date:"2026-06-18",jornada:"J2",home:"México",away:"Corea del Sur"},
  {id:"m4",group:"GRUPO A",date:"2026-06-24",jornada:"J3",home:"República Checa",away:"México"},
  {id:"m5",group:"GRUPO A",date:"2026-06-24",jornada:"J3",home:"Sudáfrica",away:"Corea del Sur"},
  {id:"m6",group:"GRUPO B",date:"2026-06-12",jornada:"J1",home:"Canadá",away:"Bosnia"},
  {id:"m7",group:"GRUPO B",date:"2026-06-12",jornada:"J1",home:"Qatar",away:"Suiza"},
  {id:"m8",group:"GRUPO B",date:"2026-06-18",jornada:"J2",home:"Suiza",away:"Bosnia"},
  {id:"m9",group:"GRUPO B",date:"2026-06-18",jornada:"J2",home:"Canadá",away:"Qatar"},
  {id:"m10",group:"GRUPO B",date:"2026-06-24",jornada:"J3",home:"Suiza",away:"Canadá"},
  {id:"m11",group:"GRUPO B",date:"2026-06-24",jornada:"J3",home:"Bosnia",away:"Qatar"},
  {id:"m12",group:"GRUPO C",date:"2026-06-13",jornada:"J1",home:"Brasil",away:"Marruecos"},
  {id:"m13",group:"GRUPO C",date:"2026-06-13",jornada:"J1",home:"Haití",away:"Escocia"},
  {id:"m14",group:"GRUPO C",date:"2026-06-19",jornada:"J2",home:"Brasil",away:"Haití"},
  {id:"m15",group:"GRUPO C",date:"2026-06-19",jornada:"J2",home:"Escocia",away:"Marruecos"},
  {id:"m16",group:"GRUPO C",date:"2026-06-24",jornada:"J3",home:"Escocia",away:"Brasil"},
  {id:"m17",group:"GRUPO C",date:"2026-06-24",jornada:"J3",home:"Marruecos",away:"Haití"},
  {id:"m18",group:"GRUPO D",date:"2026-06-12",jornada:"J1",home:"EEUU",away:"Paraguay"},
  {id:"m19",group:"GRUPO D",date:"2026-06-13",jornada:"J1",home:"Australia",away:"Turquía"},
  {id:"m20",group:"GRUPO D",date:"2026-06-19",jornada:"J2",home:"Turquía",away:"Paraguay"},
  {id:"m21",group:"GRUPO D",date:"2026-06-19",jornada:"J2",home:"EEUU",away:"Australia"},
  {id:"m22",group:"GRUPO D",date:"2026-06-25",jornada:"J3",home:"Turquía",away:"EEUU"},
  {id:"m23",group:"GRUPO D",date:"2026-06-25",jornada:"J3",home:"Paraguay",away:"Australia"},
  {id:"m24",group:"GRUPO E",date:"2026-06-14",jornada:"J1",home:"Alemania",away:"Curazao"},
  {id:"m25",group:"GRUPO E",date:"2026-06-14",jornada:"J1",home:"Costa de Marfil",away:"Ecuador"},
  {id:"m26",group:"GRUPO E",date:"2026-06-20",jornada:"J2",home:"Alemania",away:"Costa de Marfil"},
  {id:"m27",group:"GRUPO E",date:"2026-06-20",jornada:"J2",home:"Ecuador",away:"Curazao"},
  {id:"m28",group:"GRUPO E",date:"2026-06-25",jornada:"J3",home:"Ecuador",away:"Alemania"},
  {id:"m29",group:"GRUPO E",date:"2026-06-25",jornada:"J3",home:"Curazao",away:"Costa de Marfil"},
  {id:"m30",group:"GRUPO F",date:"2026-06-14",jornada:"J1",home:"Países Bajos",away:"Japón"},
  {id:"m31",group:"GRUPO F",date:"2026-06-14",jornada:"J1",home:"Suecia",away:"Túnez"},
  {id:"m32",group:"GRUPO F",date:"2026-06-20",jornada:"J2",home:"Países Bajos",away:"Suecia"},
  {id:"m33",group:"GRUPO F",date:"2026-06-20",jornada:"J2",home:"Túnez",away:"Japón"},
  {id:"m34",group:"GRUPO F",date:"2026-06-25",jornada:"J3",home:"Túnez",away:"Países Bajos"},
  {id:"m35",group:"GRUPO F",date:"2026-06-25",jornada:"J3",home:"Japón",away:"Suecia"},
  {id:"m36",group:"GRUPO G",date:"2026-06-15",jornada:"J1",home:"Bélgica",away:"Egipto"},
  {id:"m37",group:"GRUPO G",date:"2026-06-15",jornada:"J1",home:"Irán",away:"Nueva Zelanda"},
  {id:"m38",group:"GRUPO G",date:"2026-06-21",jornada:"J2",home:"Bélgica",away:"Irán"},
  {id:"m39",group:"GRUPO G",date:"2026-06-21",jornada:"J2",home:"Nueva Zelanda",away:"Egipto"},
  {id:"m40",group:"GRUPO G",date:"2026-06-26",jornada:"J3",home:"Nueva Zelanda",away:"Bélgica"},
  {id:"m41",group:"GRUPO G",date:"2026-06-26",jornada:"J3",home:"Egipto",away:"Irán"},
  {id:"m42",group:"GRUPO H",date:"2026-06-15",jornada:"J1",home:"España",away:"Cabo Verde"},
  {id:"m43",group:"GRUPO H",date:"2026-06-15",jornada:"J1",home:"Arabia Saudita",away:"Uruguay"},
  {id:"m44",group:"GRUPO H",date:"2026-06-21",jornada:"J2",home:"España",away:"Arabia Saudita"},
  {id:"m45",group:"GRUPO H",date:"2026-06-21",jornada:"J2",home:"Uruguay",away:"Cabo Verde"},
  {id:"m46",group:"GRUPO H",date:"2026-06-26",jornada:"J3",home:"Uruguay",away:"España"},
  {id:"m47",group:"GRUPO H",date:"2026-06-26",jornada:"J3",home:"Cabo Verde",away:"Arabia Saudita"},
  {id:"m48",group:"GRUPO I",date:"2026-06-16",jornada:"J1",home:"Francia",away:"Senegal"},
  {id:"m49",group:"GRUPO I",date:"2026-06-16",jornada:"J1",home:"Irak",away:"Noruega"},
  {id:"m50",group:"GRUPO I",date:"2026-06-22",jornada:"J2",home:"Francia",away:"Irak"},
  {id:"m51",group:"GRUPO I",date:"2026-06-22",jornada:"J2",home:"Noruega",away:"Senegal"},
  {id:"m52",group:"GRUPO I",date:"2026-06-26",jornada:"J3",home:"Noruega",away:"Francia"},
  {id:"m53",group:"GRUPO I",date:"2026-06-26",jornada:"J3",home:"Senegal",away:"Irak"},
  {id:"m54",group:"GRUPO J",date:"2026-06-16",jornada:"J1",home:"Argentina",away:"Argelia"},
  {id:"m55",group:"GRUPO J",date:"2026-06-16",jornada:"J1",home:"Austria",away:"Jordania"},
  {id:"m56",group:"GRUPO J",date:"2026-06-22",jornada:"J2",home:"Argentina",away:"Austria"},
  {id:"m57",group:"GRUPO J",date:"2026-06-22",jornada:"J2",home:"Jordania",away:"Argelia"},
  {id:"m58",group:"GRUPO J",date:"2026-06-27",jornada:"J3",home:"Jordania",away:"Argentina"},
  {id:"m59",group:"GRUPO J",date:"2026-06-27",jornada:"J3",home:"Argelia",away:"Austria"},
  {id:"m60",group:"GRUPO K",date:"2026-06-17",jornada:"J1",home:"Portugal",away:"R. D. del Congo"},
  {id:"m61",group:"GRUPO K",date:"2026-06-17",jornada:"J1",home:"Uzbekistán",away:"Colombia"},
  {id:"m62",group:"GRUPO K",date:"2026-06-23",jornada:"J2",home:"Portugal",away:"Uzbekistán"},
  {id:"m63",group:"GRUPO K",date:"2026-06-23",jornada:"J2",home:"Colombia",away:"R. D. del Congo"},
  {id:"m64",group:"GRUPO K",date:"2026-06-27",jornada:"J3",home:"Colombia",away:"Portugal"},
  {id:"m65",group:"GRUPO K",date:"2026-06-27",jornada:"J3",home:"R. D. del Congo",away:"Uzbekistán"},
  {id:"m66",group:"GRUPO L",date:"2026-06-17",jornada:"J1",home:"Inglaterra",away:"Croacia"},
  {id:"m67",group:"GRUPO L",date:"2026-06-17",jornada:"J1",home:"Ghana",away:"Panamá"},
  {id:"m68",group:"GRUPO L",date:"2026-06-23",jornada:"J2",home:"Inglaterra",away:"Ghana"},
  {id:"m69",group:"GRUPO L",date:"2026-06-23",jornada:"J2",home:"Panamá",away:"Croacia"},
  {id:"m70",group:"GRUPO L",date:"2026-06-27",jornada:"J3",home:"Panamá",away:"Inglaterra"},
  {id:"m71",group:"GRUPO L",date:"2026-06-27",jornada:"J3",home:"Croacia",away:"Ghana"}
];



// ─── SCHEDULE (horarios ARG = UTC-3) ─────────────────────────────────────────
// Cada entrada tiene el id del partido (igual que MATCHES) y el kickoff en hora Argentina.
const SCHEDULE = [
  {id:"m0",  date:"2026-06-11", kickoff:"16:00"},
  {id:"m1",  date:"2026-06-11", kickoff:"23:00"},
  {id:"m6",  date:"2026-06-12", kickoff:"16:00"},
  {id:"m18", date:"2026-06-12", kickoff:"22:00"},
  {id:"m7",  date:"2026-06-13", kickoff:"16:00"},
  {id:"m12", date:"2026-06-13", kickoff:"19:00"},
  {id:"m13", date:"2026-06-13", kickoff:"22:00"},
  {id:"m19", date:"2026-06-14", kickoff:"01:00"},
  {id:"m24", date:"2026-06-14", kickoff:"14:00"},
  {id:"m30", date:"2026-06-14", kickoff:"17:00"},
  {id:"m25", date:"2026-06-14", kickoff:"20:00"},
  {id:"m31", date:"2026-06-14", kickoff:"23:00"},
  {id:"m42", date:"2026-06-15", kickoff:"13:00"},
  {id:"m36", date:"2026-06-15", kickoff:"16:00"},
  {id:"m43", date:"2026-06-15", kickoff:"19:00"},
  {id:"m37", date:"2026-06-15", kickoff:"22:00"},
  {id:"m48", date:"2026-06-16", kickoff:"16:00"},
  {id:"m49", date:"2026-06-16", kickoff:"19:00"},
  {id:"m54", date:"2026-06-16", kickoff:"22:00"},
  {id:"m55", date:"2026-06-17", kickoff:"01:00"},
  {id:"m60", date:"2026-06-17", kickoff:"14:00"},
  {id:"m66", date:"2026-06-17", kickoff:"17:00"},
  {id:"m67", date:"2026-06-17", kickoff:"20:00"},
  {id:"m61", date:"2026-06-17", kickoff:"23:00"},
  {id:"m2",  date:"2026-06-18", kickoff:"13:00"},
  {id:"m8",  date:"2026-06-18", kickoff:"16:00"},
  {id:"m9",  date:"2026-06-18", kickoff:"19:00"},
  {id:"m3",  date:"2026-06-18", kickoff:"22:00"},
  {id:"m21", date:"2026-06-19", kickoff:"16:00"},
  {id:"m15", date:"2026-06-19", kickoff:"19:00"},
  {id:"m14", date:"2026-06-19", kickoff:"21:30"},
  {id:"m20", date:"2026-06-20", kickoff:"00:00"},
  {id:"m32", date:"2026-06-20", kickoff:"14:00"},
  {id:"m26", date:"2026-06-20", kickoff:"17:00"},
  {id:"m27", date:"2026-06-20", kickoff:"21:00"},
  {id:"m33", date:"2026-06-21", kickoff:"01:00"},
  {id:"m44", date:"2026-06-21", kickoff:"13:00"},
  {id:"m38", date:"2026-06-21", kickoff:"16:00"},
  {id:"m45", date:"2026-06-21", kickoff:"19:00"},
  {id:"m39", date:"2026-06-21", kickoff:"22:00"},
  {id:"m56", date:"2026-06-22", kickoff:"14:00"},
  {id:"m50", date:"2026-06-22", kickoff:"18:00"},
  {id:"m51", date:"2026-06-22", kickoff:"21:00"},
  {id:"m57", date:"2026-06-23", kickoff:"00:00"},
  {id:"m62", date:"2026-06-23", kickoff:"14:00"},
  {id:"m68", date:"2026-06-23", kickoff:"17:00"},
  {id:"m69", date:"2026-06-23", kickoff:"20:00"},
  {id:"m63", date:"2026-06-23", kickoff:"23:00"},
  {id:"m10", date:"2026-06-24", kickoff:"16:00"},
  {id:"m11", date:"2026-06-24", kickoff:"16:00"},
  {id:"m16", date:"2026-06-24", kickoff:"19:00"},
  {id:"m17", date:"2026-06-24", kickoff:"19:00"},
  {id:"m4",  date:"2026-06-24", kickoff:"22:00"},
  {id:"m5",  date:"2026-06-24", kickoff:"22:00"},
  {id:"m28", date:"2026-06-25", kickoff:"17:00"},
  {id:"m29", date:"2026-06-25", kickoff:"17:00"},
  {id:"m35", date:"2026-06-25", kickoff:"20:00"},
  {id:"m34", date:"2026-06-25", kickoff:"20:00"},
  {id:"m22", date:"2026-06-25", kickoff:"23:00"},
  {id:"m23", date:"2026-06-25", kickoff:"23:00"},
  {id:"m52", date:"2026-06-26", kickoff:"16:00"},
  {id:"m53", date:"2026-06-26", kickoff:"16:00"},
  {id:"m46", date:"2026-06-26", kickoff:"21:00"},
  {id:"m47", date:"2026-06-26", kickoff:"21:00"},
  {id:"m40", date:"2026-06-27", kickoff:"00:00"},
  {id:"m41", date:"2026-06-27", kickoff:"00:00"},
  {id:"m70", date:"2026-06-27", kickoff:"18:00"},
  {id:"m71", date:"2026-06-27", kickoff:"18:00"},
  {id:"m64", date:"2026-06-27", kickoff:"20:30"},
  {id:"m65", date:"2026-06-27", kickoff:"20:30"},
  {id:"m58", date:"2026-06-27", kickoff:"23:00"},
  {id:"m59", date:"2026-06-27", kickoff:"23:00"},
];

// ─── LIVE MATCH HELPERS ───────────────────────────────────────────────────────
const LIVE_MARGIN_MS = 2 * 60 * 1000;   // 2 minutos en ms
const MATCH_DURATION = 130 * 60 * 1000;  // 2 horas y 10 minutos en ms

// Convierte una entrada del SCHEDULE a timestamp UTC en ms,
// interpretando date + kickoff como hora Argentina (UTC-3).
function scheduleToUTC(entry) {
  const [hh, mm] = entry.kickoff.split(':').map(Number);
  // Armamos un Date en UTC que corresponde a esa hora en ARG (UTC-3 = +3 horas en UTC)
  const [y, mo, d] = entry.date.split('-').map(Number);
  return Date.UTC(y, mo - 1, d, hh + 3, mm, 0);
}

// Retorna los partidos que están "en ventana" respecto a la hora del dispositivo.
function getLiveMatches() {
  const now = Date.now();
  const espnHasData = Object.keys(liveScores).length > 0 || finishedByESPN.size > 0;

  return SCHEDULE.filter(entry => {
    const kick = scheduleToUTC(entry);
    if (now < (kick - LIVE_MARGIN_MS)) return false;
    if (now > (kick + MATCH_DURATION)) return false;

    const match = MATCHES.find(m => m.id === entry.id);
    if (!match) return false;

    const espnKey = `${match.home}|${match.away}`;

    // Si ESPN tiene datos y lo marca como terminado → cerrar tarjeta
    if (espnHasData && finishedByESPN.has(espnKey)) return false;

    return true;
  }).map(entry => MATCHES.find(m => m.id === entry.id)).filter(Boolean);
}


// ─── ESPN NAME MAP ────────────────────────────────────────────────────────────
// Mapea los nombres que devuelve la API de ESPN al nombre que usás en MATCHES
const ESPN_NAME_MAP = {
  'Mexico': 'México',
  'South Korea': 'Corea del Sur',
  'Czechia': 'República Checa',
  'Canada': 'Canadá',
  'Bosnia-Herzegovina': 'Bosnia',
  'Switzerland': 'Suiza',
  'Brazil': 'Brasil',
  'Morocco': 'Marruecos',
  'Haiti': 'Haití',
  'Scotland': 'Escocia',
  'USA': 'EEUU',
  'United States': 'EEUU',
  'Türkiye': 'Turquía',
  'Germany': 'Alemania',
  'Curaçao': 'Curazao',
  'Ivory Coast': 'Costa de Marfil',
  'Netherlands': 'Países Bajos',
  'Japan': 'Japón',
  'Sweden': 'Suecia',
  'Tunisia': 'Túnez',
  'Belgium': 'Bélgica',
  'Egypt': 'Egipto',
  'Iran': 'Irán',
  'New Zealand': 'Nueva Zelanda',
  'Spain': 'España',
  'Cape Verde': 'Cabo Verde',
  'Saudi Arabia': 'Arabia Saudita',
  'Uruguay': 'Uruguay',
  'France': 'Francia',
  'Senegal': 'Senegal',
  'Iraq': 'Irak',
  'Norway': 'Noruega',
  'Argentina': 'Argentina',
  'Algeria': 'Argelia',
  'Austria': 'Austria',
  'Jordan': 'Jordania',
  'Portugal': 'Portugal',
  'Congo DR': 'R. D. del Congo',
  'Uzbekistan': 'Uzbekistán',
  'Colombia': 'Colombia',
  'England': 'Inglaterra',
  'Ghana': 'Ghana',
  'Panama': 'Panamá',
  'Croatia': 'Croacia',
  'South Africa': 'Sudáfrica',
  'Qatar': 'Qatar',
  'Paraguay': 'Paraguay',
  'Australia': 'Australia',
  'Ecuador': 'Ecuador',
};

// Cache de resultados en vivo de ESPN
let liveScores = {}; // { "Home|Away": { home: N, away: N, clock: "45'", status: "in" } }
let finishedByESPN = new Set();

async function fetchLiveScores() {
  try {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=200&dates=20260611-20260719&_=${Date.now()}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    const fresh = {};
    const finished = new Set(); // partidos que ESPN dice que terminaron

    for (const event of (data.events || [])) {
      const comp = event.competitions?.[0];
      if (!comp) continue;

      const statusType = comp.status?.type?.name ?? '';
      const competitors = comp.competitors ?? [];
      const homeComp = competitors.find(c => c.homeAway === 'home');
      const awayComp = competitors.find(c => c.homeAway === 'away');
      if (!homeComp || !awayComp) continue;

      const rawHome = homeComp.team?.displayName ?? '';
      const rawAway = awayComp.team?.displayName ?? '';
      const homeName = ESPN_NAME_MAP[rawHome] ?? rawHome;
      const awayName = ESPN_NAME_MAP[rawAway] ?? rawAway;
      const espnKey = `${homeName}|${awayName}`;

      const isHalfTime = statusType === 'STATUS_HALFTIME';
      const clock = isHalfTime ? 'ET' : (comp.status?.displayClock ?? '');

      const isLive = ['STATUS_IN_PROGRESS','STATUS_HALFTIME',
                      'STATUS_FIRST_HALF','STATUS_SECOND_HALF',
                      'STATUS_EXTRA_TIME','STATUS_SHOOTOUT'].includes(statusType);

      const isFinished = statusType === 'STATUS_FULL_TIME'
                      || statusType === 'STATUS_FINAL';

      if (isLive) {
        fresh[espnKey] = {
          home: parseInt(homeComp.score ?? 0),
          away: parseInt(awayComp.score ?? 0),
          clock,
        };
      }

      if (isFinished) {
        // Marcar como terminado para que getLiveMatches lo cierre
        finished.add(espnKey);

        // Auto-save en Firestore
        const match = MATCHES.find(m => m.home === homeName && m.away === awayName);
        if (!match) continue;

        const homeGoals = parseInt(homeComp.score ?? 0);
        const awayGoals = parseInt(awayComp.score ?? 0);
        if (isNaN(homeGoals) || isNaN(awayGoals)) continue;

        // Guardar si no hay resultado O si el resultado guardado es diferente
        const existing = results[match.id];
        const alreadySaved = existing
          && parseInt(existing.homeGoals) === homeGoals
          && parseInt(existing.awayGoals) === awayGoals;

        if (!alreadySaved) {
          console.log(`[ESPN AUTO-SAVE] ${homeName} ${homeGoals}-${awayGoals} ${awayName}`);
          results[match.id] = { homeGoals, awayGoals };
          await saveResults();
        }
      }
    }

    liveScores = fresh;
    finishedByESPN = finished; // guardamos los terminados globalmente
  } catch (e) {
    console.warn('ESPN fetch error:', e);
  }
}







// ─── RENDER LIVE SECTION ──────────────────────────────────────────────────────
function renderLiveSection() {
  const live = getLiveMatches();
  if (live.length === 0) return '';

  const cards = live.map(m => {
    const predRows = participants.map(p => {
      const pred = p.predictions?.[m.id];
      const hasPred = pred && pred.homeGoals !== undefined && pred.homeGoals !== '';
      return `
        <div class="live-pred-row">
          <span class="live-pred-name">${p.name}</span>
          <span class="live-pred-score">${hasPred ? `${pred.homeGoals} – ${pred.awayGoals}` : '— – —'}</span>
        </div>`;
    }).join('');

    // ── NUEVO: marcador ESPN en vivo ──
    const espnKey = `${m.home}|${m.away}`;
    const espn = liveScores[espnKey];
    const liveScoreHtml = espn
      ? `<div class="live-current-score">
           <span class="live-score-num">${espn.home}</span>
           <span class="live-score-sep">–</span>
           <span class="live-score-num">${espn.away}</span>
           <span class="live-clock">${espn.clock}</span>
         </div>`
      : '';

    return `
      <div class="live-match-card">
        <div class="live-match-header">
          <span class="live-badge">🔴 EN JUEGO</span>
        </div>
        <div class="live-match-teams">
          <span class="live-team home">
            ${flagImg(m.home)}
            <span class="live-team-name">${m.home}</span>
          </span>
          <span class="live-vs">VS</span>
          <span class="live-team away">
            <span class="live-team-name">${m.away}</span>
            ${flagImg(m.away)}
          </span>
        </div>
        ${liveScoreHtml}
        <div class="live-preds-title">Pronósticos</div>
        <div class="live-preds-list">
          ${predRows || '<p class="live-no-preds">Sin pronósticos cargados</p>'}
        </div>
      </div>`;
  }).join('');

  return `
    <section class="live-section">
      <h2 class="section-title">⚽ Partido en curso</h2>
      ${cards}
    </section>`;
}



// ─── STATE ───────────────────────────────────────────────────────────────────
let isAdmin = false;
let participants = [];
let results = {}; // { matchId: { homeGoals, awayGoals } }
let selectedParticipant = null;
let currentView = 'standings'; // 'standings' | 'participant' | 'admin'

// ─── ADMIN PASSWORD ──────────────────────────────────────────────────────────
const ADMIN_PASS = "lucasmundial2026";

// ─── FIRESTORE HELPERS ───────────────────────────────────────────────────────
async function loadResults() {
  const snap = await getDoc(doc(db, "config", "results"));
  results = snap.exists() ? (snap.data().matches || {}) : {};
}

async function saveResults() {
  await setDoc(doc(db, "config", "results"), { matches: results, updatedAt: serverTimestamp() });
}

async function loadParticipants() {
  const snap = await getDocs(collection(db, "participants"));
  participants = [];
  snap.forEach(d => participants.push({ id: d.id, ...d.data() }));
  participants.sort((a, b) => a.name.localeCompare(b.name));
}

async function saveParticipant(p) {
  await setDoc(doc(db, "participants", p.id), {
    name: p.name,
    predictions: p.predictions || {},
    updatedAt: serverTimestamp()
  });
}

async function deleteParticipant(id) {
  await deleteDoc(doc(db, "participants", id));
}

// ─── SCORING ─────────────────────────────────────────────────────────────────
function calcScore(predictions) {
  let pts = 0, exact = 0, partial = 0;
  MATCHES.forEach(m => {
    const res = results[m.id];
    const pred = predictions?.[m.id];
    const hasResult = res && res.homeGoals !== undefined && res.awayGoals !== undefined;
    const hasPred   = pred && pred.homeGoals !== undefined && pred.awayGoals !== undefined;

    if (hasResult && hasPred) {
      // Resultado real disponible: calcular automáticamente
      const rh = parseInt(res.homeGoals), ra = parseInt(res.awayGoals);
      const ph = parseInt(pred.homeGoals), pa = parseInt(pred.awayGoals);
      if (isNaN(rh)||isNaN(ra)||isNaN(ph)||isNaN(pa)) return;
      const rSign = Math.sign(rh - ra), pSign = Math.sign(ph - pa);
      if (rh === ph && ra === pa) { pts += 3; exact++; }
      else if (rSign === pSign) { pts += 1; partial++; }
    } else if (!hasResult && pred?.manualPts !== undefined) {
      // Sin resultado real: usar puntos manuales cargados
      const mp = parseInt(pred.manualPts);
      if (!isNaN(mp)) {
        pts += mp;
        if (mp === 3) exact++;
        if (mp === 1) partial++;
      }
    }
  });
  return { pts, exact, partial };
}

function getMatchPoints(predictions, matchId) {
  const res = results[matchId];
  const pred = predictions?.[matchId];
  if (!res || res.homeGoals === undefined || !pred || pred.homeGoals === undefined) return null;
  const rh = parseInt(res.homeGoals), ra = parseInt(res.awayGoals);
  const ph = parseInt(pred.homeGoals), pa = parseInt(pred.awayGoals);
  if (isNaN(rh)||isNaN(ra)||isNaN(ph)||isNaN(pa)) return null;
  const rSign = Math.sign(rh - ra), pSign = Math.sign(ph - pa);
  if (rh === ph && ra === pa) return 3;
  if (rSign === pSign) return 1;
  return 0;
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  if (currentView === 'admin') {
    app.innerHTML = renderAdmin();
  } else if (currentView === 'participant' && selectedParticipant) {
    app.innerHTML = renderParticipant();
  } else {
    app.innerHTML = renderStandings();
  }
  attachEvents();
}

function renderHeader() {
  return `
    <header class="site-header">
      <div class="header-inner">
        <div class="logo-block">
          <img class="logo-copa" src="https://github.com/LucasN01/Prode_Mundial_2026/blob/main/img/copa.webp?raw=true" alt="Copa del Mundo" />
          <span class="logo-year">2026</span>
          <div class="logo-title">
            <span class="logo-prode">PRODE</span>
            <span class="logo-mundial">MUNDIAL</span>
          </div>
        </div>
        <nav class="header-nav">
          ${currentView !== 'standings' ? `<button class="nav-btn" id="btn-home">⬅ Inicio</button>` : ''}
          ${isAdmin
            ? `<span class="admin-badge">👑 ADMIN</span>${currentView !== 'admin' ? `<button class="nav-btn accent" id="btn-go-admin">⚙️ Panel</button>` : ""}<button class="nav-btn danger" id="btn-logout">Salir</button>`
            : `<button class="nav-btn accent" id="btn-admin-mode">🔐 Admin</button>`
          }
        </nav>
      </div>
    </header>`;
}

// ─── RENDER TODAY'S MATCHES ──────────────────────────────────────────────────
function renderTodayMatches() {
  const now = Date.now();

  const argNow = new Date(now - 3 * 60 * 60 * 1000);
  const todayStr = argNow.toISOString().slice(0, 10);

  // Todos los partidos de hoy, ocultando solo los que terminaron hace más de 30 min
  const todaySchedule = SCHEDULE.filter(entry => {
    if (entry.date !== todayStr) return false;
    const kick = scheduleToUTC(entry);
    return now < kick + MATCH_DURATION + (30 * 60 * 1000); // 30 min de gracia post-partido
  });

  if (todaySchedule.length === 0) return '';

  const [y, m, d] = todayStr.split('-');
  const months = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio',
                  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const dateLabel = `${parseInt(d)} de ${months[parseInt(m)]}`;

  const cards = todaySchedule.map(entry => {
    const match = MATCHES.find(mx => mx.id === entry.id);
    if (!match) return '';

    const kick = scheduleToUTC(entry);
    const isLive = now >= kick - LIVE_MARGIN_MS && now < kick + MATCH_DURATION;
    const isFinished = finishedByESPN.has(`${match.home}|${match.away}`);
    const notStarted = now < kick;

    const espnKey = `${match.home}|${match.away}`;
    const espn = liveScores[espnKey];

    // Centro: qué mostrar
    let centerHtml = '';
    if (isFinished) {
      // Mostrar resultado final desde Firestore
      const res = results[match.id];
      centerHtml = res
        ? `<span class="td-score td-score--final">${res.homeGoals} <span class="td-score-sep">–</span> ${res.awayGoals}</span>
           <span class="td-finished-label">Final</span>`
        : `<span class="td-time">FT</span>`;
    } else if (isLive && espn) {
      centerHtml = `
        <span class="td-score">${espn.home} <span class="td-score-sep">–</span> ${espn.away}</span>
        <span class="td-clock">${espn.clock}</span>`;
    } else if (isLive && !espn) {
      centerHtml = `<span class="td-live-dot">🔴</span>`;
    } else {
      centerHtml = `<span class="td-time">${entry.kickoff}</span>`;
    }

    const cardClass = isFinished
      ? 'td-card--finished'
      : isLive
        ? 'td-card--live'
        : '';

    return `
      <div class="td-card ${cardClass}">
        <div class="td-team td-team--home">
          ${flagImg(match.home)}
          <span class="td-team-name">${match.home}</span>
        </div>
        <div class="td-center">${centerHtml}</div>
        <div class="td-team td-team--away">
          <span class="td-team-name">${match.away}</span>
          ${flagImg(match.away)}
        </div>
      </div>`;
  }).join('');

  return `
    <section class="today-section">
      <div class="today-header">
        <h2 class="section-title">📅 Partidos de Hoy</h2>
        <span class="today-date">${dateLabel}</span>
      </div>
      <div class="today-grid">${cards}</div>
    </section>`;
}

function renderStandings() {
  const scored = participants.map(p => ({
    ...p,
    ...calcScore(p.predictions)
  })).sort((a,b) => b.pts - a.pts || b.exact - a.exact || b.partial - a.partial);

  const grouped = {};
  MATCHES.forEach(m => { if (!grouped[m.group]) grouped[m.group] = []; grouped[m.group].push(m); });

  return `
    ${renderHeader()}
    <main class="main-content">
      <section class="standings-section">
        <div class="standings-title-row">
          <h2 class="section-title">🏆 Tabla de Posiciones</h2>
        </div>
        <div class="standings-table-wrap">
          <table class="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Participante</th>
                <th title="Puntos totales">PTS</th>
                <th title="Resultados exactos (3 pts)">✅ Exactos</th>
                <th title="Resultados parciales (1 pt)">〽️ Parciales</th>
              </tr>
            </thead>
            <tbody>
              ${scored.length === 0 ? `<tr><td colspan="5" class="empty-msg">No hay participantes aún</td></tr>` : ''}
              ${scored.map((p, i) => `
                <tr class="participant-row ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}" 
                    data-pid="${p.id}">
                  <td class="rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i+1}</td>
                  <td class="p-name">${p.name}</td>
                  <td class="pts-val">${p.pts}</td>
                  <td class="exact-val">${p.exact}</td>
                  <td class="partial-val">${p.partial}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="standings-bottom-row">
          <button class="btn-reglas" id="btn-reglas">⚡ Sistema de puntos</button>
        </div>
      </section>

      
      ${renderLiveSection()}
      ${renderTodayMatches()}

      <section class="participants-section">
        <h2 class="section-title">👥 Participantes</h2>
        <div class="cards-grid">
          ${participants.map(p => {
            const s = calcScore(p.predictions);
            return `
              <div class="participant-card" data-pid="${p.id}">
                <div class="card-avatar">${p.name.charAt(0).toUpperCase()}</div>
                <div class="card-info">
                  <div class="card-name">${p.name}</div>
                  <div class="card-stats">
                    <span class="stat-pts">${s.pts} pts</span>
                    <span class="stat-sep">·</span>
                    <span class="stat-exact">✅ ${s.exact}</span>
                    <span class="stat-sep">·</span>
                    <span class="stat-partial">〽️ ${s.partial}</span>
                  </div>
                </div>
                <div class="card-arrow">→</div>
              </div>`;
          }).join('')}
        </div>
      </section>
    </main>`;
}

function renderParticipant() {
  const p = participants.find(x => x.id === selectedParticipant);
  if (!p) return renderStandings();
  const s = calcScore(p.predictions);
  const grouped = {};
  MATCHES.forEach(m => { if (!grouped[m.group]) grouped[m.group] = []; grouped[m.group].push(m); });

  return `
    ${renderHeader()}
    <main class="main-content">
      <div class="profile-header">
        <div class="profile-avatar">${p.name.charAt(0).toUpperCase()}</div>
        <div class="profile-info">
          <h2 class="profile-name">${p.name}</h2>
          <div class="profile-stats">
            <div class="profile-stat"><span class="pstat-val">${s.pts}</span><span class="pstat-lbl">Puntos</span></div>
            <div class="profile-stat"><span class="pstat-val">${s.exact}</span><span class="pstat-lbl">Exactos</span></div>
            <div class="profile-stat"><span class="pstat-val">${s.partial}</span><span class="pstat-lbl">Parciales</span></div>
          </div>
        </div>
      </div>

      ${Object.entries(grouped).map(([grp, matches]) => `
        <div class="group-block">
          <h3 class="group-title">${grp}</h3>
          <div class="matches-list">
            ${matches.map(m => {
              const pred = p.predictions?.[m.id];
              const res = results[m.id];
              const pts = getMatchPoints(p.predictions, m.id);
              const manualPts = pred?.manualPts;
              const hasPred = pred && pred.homeGoals !== undefined && pred.homeGoals !== '';
              const hasRes = res && res.homeGoals !== undefined && res.homeGoals !== '';
              const effectivePts = pts !== null ? pts : (manualPts !== undefined ? manualPts : null);
              const rowClass = effectivePts === 3 ? 'pts-3' : effectivePts === 1 ? 'pts-1' : effectivePts === 0 ? 'pts-0' : '';
              return `
                <div class="match-row ${rowClass}">
                  <div class="match-meta">${formatDate(m.date)} · ${m.jornada}</div>
                  <div class="match-content">
                    <span class="team home">
                      ${flagImg(m.home)}
                      <span class="team-name">${m.home}</span>
                    </span>
                    <div class="match-center">
                      <div class="score-block pred">
                        <span class="score-lbl">Pronóstico</span>
                        <span class="score-val">${hasPred ? `${pred.homeGoals} – ${pred.awayGoals}` : '— – —'}</span>
                      </div>
                      ${hasRes ? `
                      <div class="score-block result">
                        <span class="score-lbl">Resultado</span>
                        <span class="score-val">${res.homeGoals} – ${res.awayGoals}</span>
                      </div>` : ''}
                    </div>
                    <span class="team away">
                      <span class="team-name">${m.away}</span>
                      ${flagImg(m.away)}
                    </span>
                    <div class="match-pts-wrap">
                      ${pts !== null
                        ? `<span class="match-pts pts-badge-${pts}">${pts} pts</span>`
                        : manualPts !== undefined
                          ? `<span class="match-pts pts-badge-${manualPts}">${manualPts} pts</span>`
                          : isAdmin
                            ? `<div class="pts-selector" data-mid="${m.id}" data-pid="${p.id}">
                                <button class="pts-btn ${manualPts === 0 ? 'active' : ''}" data-val="0">0</button>
                                <button class="pts-btn ${manualPts === 1 ? 'active' : ''}" data-val="1">1</button>
                                <button class="pts-btn ${manualPts === 3 ? 'active' : ''}" data-val="3">3</button>
                                </div>`
                            : hasPred ? `<span class="match-pts pts-badge-pending">—</span>` : ''
                      }
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>`).join('')}
    </main>`;
}

let adminTab = 'results'; // 'results' | 'predictions'
let adminPredPid = null;

function renderAdmin() {
  const grouped = {};
  MATCHES.forEach(m => { if (!grouped[m.group]) grouped[m.group] = []; grouped[m.group].push(m); });

  return `
    ${renderHeader()}
    <main class="main-content admin-main">
      <h2 class="section-title">👑 Panel de Administración</h2>

      <div class="admin-grid">
        <!-- LEFT: Participants -->
        <section class="admin-section">
          <h3 class="admin-sub">Participantes</h3>
          <div class="add-participant-form">
            <input id="new-name" type="text" placeholder="Nombre del participante" class="text-input" />
            <button class="btn-primary" id="btn-add-participant">+ Agregar</button>
          </div>
          <button class="btn-import" id="btn-import-excel">📂 Importar Excel</button>
          <div class="participants-admin-list">
            ${participants.map(p => {
              const s = calcScore(p.predictions);
              return `
                <div class="admin-participant-row ${adminPredPid === p.id ? 'active' : ''}"
                      data-pred-pid="${p.id}" style="cursor:pointer">
                  <span class="ap-name">${p.name}</span>
                  <span class="ap-pts">${s.pts} pts</span>
                  <button class="btn-edit-pred" data-pred-pid="${p.id}" title="Cargar predicciones">✏️</button>
                  <button class="btn-danger-sm" data-del-pid="${p.id}">🗑</button>
                </div>`;
            }).join('')}
            ${participants.length === 0 ? '<p class="empty-msg">Sin participantes</p>' : ''}
          </div>
        </section>

        <!-- RIGHT: Tabs -->
        <section class="admin-section admin-matches">
          <div class="admin-tabs">
            <button class="admin-tab ${adminTab==='results'?'active':''}" data-tab="results">⚽ Resultados Reales</button>
            <button class="admin-tab ${adminTab==='predictions'?'active':''}" data-tab="predictions">📝 Predicciones${adminPredPid ? ': '+participants.find(p=>p.id===adminPredPid)?.name : ''}</button>
          </div>

          ${adminTab === 'results' ? `
            <div class="admin-bulk-header">
              <h3 class="admin-sub">Cargar Resultados</h3>
              <button class="btn-save-all" id="btn-save-all-results">💾 Guardar todos</button>
            </div>
            <p class="admin-hint">Modificá los que quieras y guardá todo junto. Los campos editados se marcan en amarillo.</p>
            <div class="admin-scrollable">
            ${Object.entries(grouped).map(([grp, matches]) => `
              <div class="admin-group">
                <h4 class="admin-group-title">${grp}</h4>
                ${matches.map(m => {
                  const res = results[m.id] || {};
                  return `
                    <div class="admin-match-row">
                      <span class="admin-match-teams">${m.home} vs ${m.away}</span>
                      <span class="admin-match-date">${formatDate(m.date)}</span>
                      <div class="admin-score-inputs">
                        <input type="number" min="0" max="30" class="score-input result-input"
                                data-mid="${m.id}" data-side="home"
                                value="${res.homeGoals !== undefined ? res.homeGoals : ''}"
                                placeholder="L" />
                        <span class="score-sep">-</span>
                        <input type="number" min="0" max="30" class="score-input result-input"
                                data-mid="${m.id}" data-side="away"
                                value="${res.awayGoals !== undefined ? res.awayGoals : ''}"
                                placeholder="V" />
                      </div>
                    </div>`;
                }).join('')}
              </div>`).join('')}
            </div>
          ` : adminPredPid ? (() => {
            const p = participants.find(x => x.id === adminPredPid);
            return `
              <div class="admin-bulk-header">
                <h3 class="admin-sub">Predicciones de ${p.name}</h3>
                <button class="btn-save-all" id="btn-save-all-preds" data-pid="${p.id}">💾 Guardar todo</button>
              </div>
              <p class="admin-hint">Modificá los pronósticos y guardá todo junto. Los campos editados se marcan en amarillo.</p>
              <div class="admin-scrollable">
              ${Object.entries(grouped).map(([grp, matches]) => `
                <div class="admin-group">
                  <h4 class="admin-group-title">${grp}</h4>
                  ${matches.map(m => {
                    const pred = p.predictions?.[m.id] || {};
                    return `
                      <div class="admin-match-row">
                        <span class="admin-match-teams">${m.home} vs ${m.away}</span>
                        <span class="admin-match-date">${formatDate(m.date)}</span>
                        <div class="admin-score-inputs">
                          <input type="number" min="0" max="30" class="score-input pred-input"
                                  data-pid="${p.id}" data-mid="${m.id}" data-side="home"
                                  value="${pred.homeGoals !== undefined ? pred.homeGoals : ''}"
                                  placeholder="L" />
                          <span class="score-sep">-</span>
                          <input type="number" min="0" max="30" class="score-input pred-input"
                                  data-pid="${p.id}" data-mid="${m.id}" data-side="away"
                                  value="${pred.awayGoals !== undefined ? pred.awayGoals : ''}"
                                  placeholder="V" />
                        </div>
                      </div>`;
                  }).join('')}
                </div>`).join('')}
              </div>`;
          })() : `<div style="color:var(--text2);padding:30px;text-align:center">← Seleccioná un participante para cargar sus predicciones</div>`}
        </section>
      </div>
    </main>`;
}

function formatDate(d) {
  const [y,m,day] = d.split('-');
  const months = ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${parseInt(day)} ${months[parseInt(m)]}`;
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
function attachEvents() {
  document.getElementById('btn-home')?.addEventListener('click', () => {
    navigateTo('standings', null);
  });
  document.getElementById('btn-go-admin')?.addEventListener('click', () => { navigateTo('admin', null); });
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    isAdmin = false; navigateTo('standings', null);
  });
  document.getElementById('btn-admin-mode')?.addEventListener('click', showAdminModal);
  document.getElementById('btn-reglas')?.addEventListener('click', showReglasModal);

  // participant rows / cards click — solo en standings, NO en admin
  if (currentView !== 'admin') {
    document.querySelectorAll('.participant-row[data-pid], .participant-card[data-pid]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('[data-del-pid]')) return;
        navigateTo('participant', el.dataset.pid);
      });
    });
  }

  // admin add participant
  document.getElementById('btn-import-excel')?.addEventListener('click', showImportModal);

  document.getElementById('btn-add-participant')?.addEventListener('click', async () => {
    const name = document.getElementById('new-name').value.trim();
    if (!name) return;
    const id = 'p_' + Date.now();
    const np = { id, name, predictions: {} };
    await saveParticipant(np);
    participants.push(np);
    participants.sort((a,b) => a.name.localeCompare(b.name));
    document.getElementById('new-name').value = '';
    render();
  });

  // admin delete participant
  document.querySelectorAll('[data-del-pid]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const pid = btn.dataset.delPid;
      if (!confirm('¿Eliminar participante?')) return;
      await deleteParticipant(pid);
      participants = participants.filter(p => p.id !== pid);
      render();
    });
  });

  // admin tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      adminTab = tab.dataset.tab; render();
    });
  });

  // admin edit predictions button
  document.querySelectorAll('.btn-edit-pred').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      adminPredPid = btn.dataset.predPid;
      adminTab = 'predictions';
      render();
    });
  });

  // Marcar input como modificado (dirty)
  document.querySelectorAll('.result-input, .pred-input').forEach(inp => {
    inp.addEventListener('input', () => inp.classList.add('dirty'));
  });

  // Guardar TODOS los resultados de una vez
  document.getElementById('btn-save-all-results')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-save-all-results');
    btn.disabled = true;
    btn.textContent = '⏳ Guardando...';

    document.querySelectorAll('.result-input[data-side="home"]').forEach(hInput => {
      const mid = hInput.dataset.mid;
      const aInput = document.querySelector(`.result-input[data-mid="${mid}"][data-side="away"]`);
      const hv = hInput.value, av = aInput.value;
      const hEmpty = hv === '', aEmpty = av === '';
      if (hEmpty && aEmpty) {
        delete results[mid];
      } else if (!hEmpty && !aEmpty) {
        results[mid] = { homeGoals: parseInt(hv), awayGoals: parseInt(av) };
      }
    });

    await saveResults();
    document.querySelectorAll('.result-input').forEach(i => i.classList.remove('dirty'));
    btn.textContent = '✅ Guardado';
    btn.style.background = 'var(--green)';
    btn.style.color = '#000';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = '💾 Guardar todos';
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  });

  // Guardar TODAS las predicciones de un participante de una vez
  document.getElementById('btn-save-all-preds')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-save-all-preds');
    const pid = btn.dataset.pid;
    const pIdx = participants.findIndex(p => p.id === pid);
    if (pIdx < 0) return;
    btn.disabled = true;
    btn.textContent = '⏳ Guardando...';

    if (!participants[pIdx].predictions) participants[pIdx].predictions = {};

    document.querySelectorAll(`.pred-input[data-pid="${pid}"][data-side="home"]`).forEach(hInput => {
      const mid = hInput.dataset.mid;
      const aInput = document.querySelector(`.pred-input[data-pid="${pid}"][data-mid="${mid}"][data-side="away"]`);
      const hv = hInput.value, av = aInput.value;
      const hEmpty = hv === '', aEmpty = av === '';
      if (hEmpty && aEmpty) {
        delete participants[pIdx].predictions[mid];
      } else if (!hEmpty && !aEmpty) {
        participants[pIdx].predictions[mid] = {
          homeGoals: parseInt(hv),
          awayGoals: parseInt(av)
        };
      }
    });

    await saveParticipant(participants[pIdx]);
    document.querySelectorAll('.pred-input').forEach(i => i.classList.remove('dirty'));
    btn.textContent = '✅ Guardado';
    btn.style.background = 'var(--green)';
    btn.style.color = '#000';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = '💾 Guardar todo';
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  });

  // pts selector (manual)
  document.querySelectorAll('.pts-selector').forEach(sel => {
    sel.querySelectorAll('.pts-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const mid = sel.dataset.mid;
        const pid = sel.dataset.pid;
        const val = parseInt(btn.dataset.val);
        const pIdx = participants.findIndex(p => p.id === pid);
        if (pIdx < 0) return;
        if (!participants[pIdx].predictions) participants[pIdx].predictions = {};
        if (!participants[pIdx].predictions[mid]) participants[pIdx].predictions[mid] = {};
        const isAlreadySelected = btn.classList.contains('active');
        if (isAlreadySelected) {
          // Deseleccionar: borrar manualPts
          delete participants[pIdx].predictions[mid].manualPts;
          await saveParticipant(participants[pIdx]);
          btn.classList.remove('active');
        } else {
          participants[pIdx].predictions[mid].manualPts = val;
          await saveParticipant(participants[pIdx]);
          sel.querySelectorAll('.pts-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });
  });
}

function showReglasModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box modal-box-reglas">
      <h3 class="modal-title">⚡ Sistema de puntos</h3>

      <div class="reglas-card pts-card-3">
        <div class="reglas-pts-badge">3 PTS</div>
        <div class="reglas-card-body">
          <div class="reglas-card-title">Resultado Exacto</div>
          <div class="reglas-card-desc">Acertás el marcador exacto del partido.</div>
          <div class="reglas-example">
            <span class="ex-pred">Pred: <strong>2 – 1</strong></span>
            <span class="ex-sep">→</span>
            <span class="ex-result">Real: <strong>2 – 1</strong></span>
            <span class="ex-check">✅</span>
          </div>
        </div>
      </div>

      <div class="reglas-card pts-card-1">
        <div class="reglas-pts-badge">1 PTS</div>
        <div class="reglas-card-body">
          <div class="reglas-card-title">Resultado Parcial</div>
          <div class="reglas-card-desc">Acertás el ganador o el empate, pero no el marcador exacto.</div>
          <div class="reglas-example">
            <span class="ex-pred">Pred: <strong>2 – 0</strong></span>
            <span class="ex-sep">→</span>
            <span class="ex-result">Real: <strong>3 – 1</strong></span>
            <span class="ex-check">〽️</span>
          </div>
        </div>
      </div>

      <div class="reglas-card pts-card-0">
        <div class="reglas-pts-badge">0 PTS</div>
        <div class="reglas-card-body">
          <div class="reglas-card-title">Sin Puntos</div>
          <div class="reglas-card-desc">El ganador o resultado fue distinto al pronosticado.</div>
          <div class="reglas-example">
            <span class="ex-pred">Pred: <strong>2 – 0</strong></span>
            <span class="ex-sep">→</span>
            <span class="ex-result">Real: <strong>0 – 1</strong></span>
            <span class="ex-check">❌</span>
          </div>
        </div>
      </div>

      <div class="reglas-note">
        Los puntos se calculan automáticamente una vez que se registra el resultado real del partido.
      </div>

      <button class="btn-primary" id="btn-reglas-cerrar" style="width:100%">Entendido</button>
    </div>`;
  document.body.appendChild(modal);
  document.getElementById('btn-reglas-cerrar').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

function showAdminModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box">
      <h3 class="modal-title">🔐 Acceso Administrador</h3>
      <div style="position:relative;display:flex;align-items:center;">
        <input type="password" id="admin-pass-input" placeholder="Contraseña" class="text-input" style="padding-right:42px;width:100%;box-sizing:border-box;" />
        <button id="toggle-pass-visibility" title="Mostrar/ocultar contraseña"
          style="position:absolute;right:8px;background:none;border:none;cursor:pointer;color:var(--text2);font-size:1.2rem;padding:4px;line-height:1;user-select:none;">
          👁
        </button>
      </div>
      <div class="modal-actions">
        <button class="btn-primary" id="modal-confirm">Ingresar</button>
        <button class="btn-secondary" id="modal-cancel">Cancelar</button>
      </div>
      <p id="modal-error" class="modal-error"></p>
    </div>`;
  document.body.appendChild(modal);
  const passInput = document.getElementById('admin-pass-input');
  passInput.focus();
  document.getElementById('toggle-pass-visibility').addEventListener('click', () => {
    const isHidden = passInput.type === 'password';
    passInput.type = isHidden ? 'text' : 'password';
    document.getElementById('toggle-pass-visibility').textContent = isHidden ? '🙈' : '👁';
    passInput.focus();
  });
  document.getElementById('modal-cancel').addEventListener('click', () => modal.remove());
  document.getElementById('modal-confirm').addEventListener('click', () => {
    const pass = passInput.value;
    if (pass === ADMIN_PASS) {
      isAdmin = true; modal.remove(); navigateTo('admin', null);
    } else {
      document.getElementById('modal-error').textContent = 'Contraseña incorrecta';
    }
  });
  passInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('modal-confirm').click();
  });
}

// ─── NAVEGACIÓN CON HISTORIAL (botón atrás Android) ─────────────────────────
function pushHistory(view, pid) {
  const state = { view, pid: pid || null };
  if (history.state?.view !== view || history.state?.pid !== (pid || null)) {
    history.pushState(state, '');
  }
}

function navigateTo(view, pid) {
  currentView = view;
  selectedParticipant = pid || null;
  pushHistory(view, pid);
  render();
}

window.addEventListener('popstate', (e) => {
  const state = e.state;
  if (state) {
    currentView = state.view;
    selectedParticipant = state.pid || null;
  } else {
    currentView = 'standings';
    selectedParticipant = null;
    history.replaceState({ view: 'standings', pid: null }, '');
  }
  render();
});

// ─── INIT ────────────────────────────────────────────────────────────────────
async function init() {
  document.getElementById('app').innerHTML = `
    <div class="loading-screen">
      <div class="loading-ball"></div>
      <p>Cargando prode...</p>
    </div>`;
  await Promise.all([loadResults(), loadParticipants()]);
  history.replaceState({ view: 'standings', pid: null }, '');
  await fetchLiveScores();
  render();
  setInterval(() => {
    if (currentView === 'standings') render();
  }, 60 * 1000); // revisa cada 1 minuto
}


// ─── ACTUALIZACIÓN AUTOMÁTICA EN TIEMPO REAL ──────────────────────────────

// 1. Nos aseguramos de que haya un renderizado inicial apenas abre la página
render(); 

// 2. Configuramos el bucle para que actualice la vista cada 1 minuto (60000 ms)
setInterval(async () => {
  await fetchLiveScores();
  render();
}, 60000);


// ─── IMPORT EXCEL ────────────────────────────────────────────────────────────
function showImportModal() {
  // Cargar SheetJS si no está disponible
  function withXLSX(cb) {
    if (window.XLSX) { cb(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'import-modal';
  modal.innerHTML = `
    <div class="modal-box modal-box-import">
      <h3 class="modal-title">📂 Importar Excel</h3>
      <p class="import-hint">Seleccioná a quién pertenece el archivo y luego elegí el Excel.</p>

      <div class="import-target-wrap">
        <label class="import-label">¿Para quién es?</label>
        <div class="import-radio-group">
          <label class="import-radio">
            <input type="radio" name="import-target" value="results" checked />
            <span>⚽ Resultados reales</span>
          </label>
          ${participants.map(p => `
            <label class="import-radio">
              <input type="radio" name="import-target" value="${p.id}" />
              <span>${p.name}</span>
            </label>`).join('')}
        </div>
      </div>

      <label class="btn-file-wrap">
        <span class="btn-primary" id="btn-choose-file">📁 Elegir archivo (.xlsx / .xls)</span>
        <input type="file" id="import-file-input" accept=".xlsx,.xls" style="display:none" />
      </label>

      <div id="import-preview" class="import-preview" style="display:none">
        <p id="import-preview-text" class="import-preview-text"></p>
      </div>
      <div id="import-error" class="modal-error"></div>

      <div class="modal-actions">
        <button class="btn-primary" id="btn-import-confirm" disabled>✅ Importar</button>
        <button class="btn-secondary" id="btn-import-cancel">Cancelar</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  let parsedData = null; // { matchId -> { homeGoals, awayGoals } }

  document.getElementById('btn-import-cancel').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

  document.getElementById('import-file-input').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    document.getElementById('import-error').textContent = '';
    document.getElementById('import-preview').style.display = 'none';
    document.getElementById('btn-import-confirm').disabled = true;
    parsedData = null;

    withXLSX(() => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const wb = XLSX.read(ev.target.result, { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

          // Construir lookup: "home|away" -> matchId
          const lookup = {};
          MATCHES.forEach(m => {
            lookup[m.home.toLowerCase() + '|' + m.away.toLowerCase()] = m.id;
          });

          const found = {};
          let count = 0;

          rows.forEach(row => {
            // Fila válida: col[2]=equipo casa, col[3]=gol local, col[4]=gol visitante, col[5]=equipo visitante
            const home = String(row[2] || '').trim();
            const away = String(row[5] || '').trim();
            const hg = row[3];
            const ag = row[4];
            if (!home || !away) return;
            const key = home.toLowerCase() + '|' + away.toLowerCase();
            const mid = lookup[key];
            if (!mid) return;
            const h = parseInt(hg), a = parseInt(ag);
            if (isNaN(h) || isNaN(a)) return; // sin goles = ignorar
            found[mid] = { homeGoals: h, awayGoals: a };
            count++;
          });

          if (count === 0) {
            document.getElementById('import-error').textContent = 'No se encontraron partidos con goles en el archivo.';
            return;
          }

          parsedData = found;
          document.getElementById('import-preview').style.display = 'block';
          document.getElementById('import-preview-text').textContent =
            `✅ Se encontraron ${count} partido${count !== 1 ? 's' : ''} con resultados.`;
          document.getElementById('btn-import-confirm').disabled = false;
        } catch (err) {
          document.getElementById('import-error').textContent = 'Error leyendo el archivo: ' + err.message;
        }
      };
      reader.readAsArrayBuffer(file);
    });
  });

  document.getElementById('btn-import-confirm').addEventListener('click', async () => {
    if (!parsedData) return;
    const target = document.querySelector('input[name="import-target"]:checked')?.value;
    const btn = document.getElementById('btn-import-confirm');
    btn.disabled = true;
    btn.textContent = '⏳ Guardando...';

    try {
      if (target === 'results') {
        // Merge con resultados existentes
        Object.assign(results, parsedData);
        await saveResults();
      } else {
        // Es un participante
        const pIdx = participants.findIndex(p => p.id === target);
        if (pIdx < 0) throw new Error('Participante no encontrado');
        if (!participants[pIdx].predictions) participants[pIdx].predictions = {};
        Object.assign(participants[pIdx].predictions, parsedData);
        await saveParticipant(participants[pIdx]);
      }
      modal.remove();
      render();
    } catch (err) {
      document.getElementById('import-error').textContent = 'Error guardando: ' + err.message;
      btn.disabled = false;
      btn.textContent = '✅ Importar';
    }
  });
}

init();