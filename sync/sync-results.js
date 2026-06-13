// ─── sync-results.js ─────────────────────────────────────────────────────────
// Consulta football-data.org y sube los resultados finalizados a Firestore.
// Se ejecuta via GitHub Actions cada 30 minutos durante el Mundial.
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import fetch from "node-fetch";

// ─── FIREBASE ADMIN INIT ─────────────────────────────────────────────────────
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ─── API CONFIG ───────────────────────────────────────────────────────────────
const FOOTBALL_API_TOKEN = process.env.FOOTBALL_API_TOKEN;
const API_URL = "https://api.football-data.org/v4/competitions/WC/matches?status=FINISHED";

// ─── MAPEO: nombre en inglés (API) → nombre en español (tu prode) ─────────────
// Si la API devuelve un nombre distinto, agregalo acá.
const TEAM_MAP = {
  "Mexico":                  "México",
  "South Africa":            "Sudáfrica",
  "Korea Republic":          "Corea del Sur",
  "Czech Republic":          "República Checa",
  "Czechia":                 "República Checa",
  "Canada":                  "Canadá",
  "Bosnia and Herzegovina":  "Bosnia",
  "Bosnia-H.":               "Bosnia",
  "Bosnia & Herzegovina":    "Bosnia",
  "Qatar":                   "Qatar",
  "Switzerland":             "Suiza",
  "Brazil":                  "Brasil",
  "Morocco":                 "Marruecos",
  "Haiti":                   "Haití",
  "Scotland":                "Escocia",
  "USA":                     "EEUU",
  "United States":           "EEUU",
  "Paraguay":                "Paraguay",
  "Australia":               "Australia",
  "Turkey":                  "Turquía",
  "Türkiye":                 "Turquía",
  "Germany":                 "Alemania",
  "Curaçao":                 "Curazao",
  "Curacao":                 "Curazao",
  "Ivory Coast":             "Costa de Marfil",
  "Côte d'Ivoire":           "Costa de Marfil",
  "Ecuador":                 "Ecuador",
  "Netherlands":             "Países Bajos",
  "Japan":                   "Japón",
  "Sweden":                  "Suecia",
  "Tunisia":                 "Túnez",
  "Belgium":                 "Bélgica",
  "Egypt":                   "Egipto",
  "Iran":                    "Irán",
  "New Zealand":             "Nueva Zelanda",
  "Spain":                   "España",
  "Cape Verde":              "Cabo Verde",
  "Saudi Arabia":            "Arabia Saudita",
  "Uruguay":                 "Uruguay",
  "France":                  "Francia",
  "Senegal":                 "Senegal",
  "Iraq":                    "Irak",
  "Norway":                  "Noruega",
  "Argentina":               "Argentina",
  "Algeria":                 "Argelia",
  "Austria":                 "Austria",
  "Jordan":                  "Jordania",
  "Portugal":                "Portugal",
  "DR Congo":                "R. D. del Congo",
  "Democratic Republic of Congo": "R. D. del Congo",
  "Uzbekistan":              "Uzbekistán",
  "Colombia":                "Colombia",
  "England":                 "Inglaterra",
  "Ghana":                   "Ghana",
  "Panama":                  "Panamá",
  "Croatia":                 "Croacia",
};

// ─── MAPEO: local|visitante (español) → matchId del prode ────────────────────
const MATCHES = [
  {id:"m0",  home:"México",          away:"Sudáfrica"},
  {id:"m1",  home:"Corea del Sur",   away:"República Checa"},
  {id:"m2",  home:"República Checa", away:"Sudáfrica"},
  {id:"m3",  home:"México",          away:"Corea del Sur"},
  {id:"m4",  home:"República Checa", away:"México"},
  {id:"m5",  home:"Sudáfrica",       away:"Corea del Sur"},
  {id:"m6",  home:"Canadá",          away:"Bosnia"},
  {id:"m7",  home:"Qatar",           away:"Suiza"},
  {id:"m8",  home:"Suiza",           away:"Bosnia"},
  {id:"m9",  home:"Canadá",          away:"Qatar"},
  {id:"m10", home:"Suiza",           away:"Canadá"},
  {id:"m11", home:"Bosnia",          away:"Qatar"},
  {id:"m12", home:"Brasil",          away:"Marruecos"},
  {id:"m13", home:"Haití",           away:"Escocia"},
  {id:"m14", home:"Brasil",          away:"Haití"},
  {id:"m15", home:"Escocia",         away:"Marruecos"},
  {id:"m16", home:"Escocia",         away:"Brasil"},
  {id:"m17", home:"Marruecos",       away:"Haití"},
  {id:"m18", home:"EEUU",            away:"Paraguay"},
  {id:"m19", home:"Australia",       away:"Turquía"},
  {id:"m20", home:"Turquía",         away:"Paraguay"},
  {id:"m21", home:"EEUU",            away:"Australia"},
  {id:"m22", home:"Turquía",         away:"EEUU"},
  {id:"m23", home:"Paraguay",        away:"Australia"},
  {id:"m24", home:"Alemania",        away:"Curazao"},
  {id:"m25", home:"Costa de Marfil", away:"Ecuador"},
  {id:"m26", home:"Alemania",        away:"Costa de Marfil"},
  {id:"m27", home:"Ecuador",         away:"Curazao"},
  {id:"m28", home:"Ecuador",         away:"Alemania"},
  {id:"m29", home:"Curazao",         away:"Costa de Marfil"},
  {id:"m30", home:"Países Bajos",    away:"Japón"},
  {id:"m31", home:"Suecia",          away:"Túnez"},
  {id:"m32", home:"Países Bajos",    away:"Suecia"},
  {id:"m33", home:"Túnez",           away:"Japón"},
  {id:"m34", home:"Túnez",           away:"Países Bajos"},
  {id:"m35", home:"Japón",           away:"Suecia"},
  {id:"m36", home:"Bélgica",         away:"Egipto"},
  {id:"m37", home:"Irán",            away:"Nueva Zelanda"},
  {id:"m38", home:"Bélgica",         away:"Irán"},
  {id:"m39", home:"Nueva Zelanda",   away:"Egipto"},
  {id:"m40", home:"Nueva Zelanda",   away:"Bélgica"},
  {id:"m41", home:"Egipto",          away:"Irán"},
  {id:"m42", home:"España",          away:"Cabo Verde"},
  {id:"m43", home:"Arabia Saudita",  away:"Uruguay"},
  {id:"m44", home:"España",          away:"Arabia Saudita"},
  {id:"m45", home:"Uruguay",         away:"Cabo Verde"},
  {id:"m46", home:"Uruguay",         away:"España"},
  {id:"m47", home:"Cabo Verde",      away:"Arabia Saudita"},
  {id:"m48", home:"Francia",         away:"Senegal"},
  {id:"m49", home:"Irak",            away:"Noruega"},
  {id:"m50", home:"Francia",         away:"Irak"},
  {id:"m51", home:"Noruega",         away:"Senegal"},
  {id:"m52", home:"Noruega",         away:"Francia"},
  {id:"m53", home:"Senegal",         away:"Irak"},
  {id:"m54", home:"Argentina",       away:"Argelia"},
  {id:"m55", home:"Austria",         away:"Jordania"},
  {id:"m56", home:"Argentina",       away:"Austria"},
  {id:"m57", home:"Jordania",        away:"Argelia"},
  {id:"m58", home:"Jordania",        away:"Argentina"},
  {id:"m59", home:"Argelia",         away:"Austria"},
  {id:"m60", home:"Portugal",        away:"R. D. del Congo"},
  {id:"m61", home:"Uzbekistán",      away:"Colombia"},
  {id:"m62", home:"Portugal",        away:"Uzbekistán"},
  {id:"m63", home:"Colombia",        away:"R. D. del Congo"},
  {id:"m64", home:"Colombia",        away:"Portugal"},
  {id:"m65", home:"R. D. del Congo", away:"Uzbekistán"},
  {id:"m66", home:"Inglaterra",      away:"Croacia"},
  {id:"m67", home:"Ghana",           away:"Panamá"},
  {id:"m68", home:"Inglaterra",      away:"Ghana"},
  {id:"m69", home:"Panamá",          away:"Croacia"},
  {id:"m70", home:"Panamá",          away:"Inglaterra"},
  {id:"m71", home:"Croacia",         away:"Ghana"},
];

// Construir lookup: "local|visitante" → matchId
const MATCH_LOOKUP = {};
MATCHES.forEach(m => {
  MATCH_LOOKUP[`${m.home}|${m.away}`] = m.id;
});

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🔄 Consultando football-data.org...");

  const response = await fetch(API_URL, {
    headers: { "X-Auth-Token": FOOTBALL_API_TOKEN }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const matches = data.matches || [];
  console.log(`📦 Partidos finalizados recibidos de la API: ${matches.length}`);

  // Leer resultados actuales de Firestore
  const snap = await db.doc("config/results").get();
  const existing = snap.exists ? (snap.data().matches || {}) : {};

  let updated = 0;
  let skipped = 0;
  let notFound = [];

  for (const match of matches) {
    const homeEn = match.homeTeam?.shortName || match.homeTeam?.name || "";
    const awayEn = match.awayTeam?.shortName || match.awayTeam?.name || "";
    console.log(`  🔍 API devuelve: "${homeEn}" vs "${awayEn}"`);

    const homeEs = TEAM_MAP[homeEn];
    const awayEs = TEAM_MAP[awayEn];

    if (!homeEs || !awayEs) {
      notFound.push(`${homeEn} vs ${awayEn} (sin mapeo)`);
      continue;
    }

    const key = `${homeEs}|${awayEs}`;
    const matchId = MATCH_LOOKUP[key];

    if (!matchId) {
      notFound.push(`${homeEs} vs ${awayEs} (no está en MATCHES)`);
      continue;
    }

    const homeGoals = match.score?.fullTime?.home;
    const awayGoals = match.score?.fullTime?.away;

    if (homeGoals === null || homeGoals === undefined ||
        awayGoals === null || awayGoals === undefined) {
      skipped++;
      continue;
    }

    // Solo actualizar si cambió o no existía
    const current = existing[matchId];
    if (current &&
        current.homeGoals === homeGoals &&
        current.awayGoals === awayGoals) {
      skipped++;
      continue;
    }

    existing[matchId] = { homeGoals, awayGoals };
    updated++;
    console.log(`  ✅ ${homeEs} ${homeGoals}-${awayGoals} ${awayEs} → ${matchId}`);
  }

  if (notFound.length > 0) {
    console.warn("⚠️  Partidos sin mapeo (revisar TEAM_MAP):");
    notFound.forEach(n => console.warn(`   - ${n}`));
  }

  if (updated === 0) {
    console.log("ℹ️  No hay resultados nuevos para actualizar.");
    return;
  }

  // Guardar en Firestore
  await db.doc("config/results").set({
    matches: existing,
    updatedAt: FieldValue.serverTimestamp()
  });

  console.log(`✅ Firestore actualizado: ${updated} partido(s) nuevo(s).`);
}

main().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
