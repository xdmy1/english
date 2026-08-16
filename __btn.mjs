import { createJiti } from "jiti";
import path from "node:path";
const root = process.cwd();
const jiti = createJiti(import.meta.url, { alias: { "@": path.join(root, "src") } });
const locales = ["en","ro","ru"];
const files = ["common","home","about","programmes","team","schedule","contact","apply","legal"];
const d = {};
for (const l of locales){ d[l]={}; for(const f of files){ const m = await jiti.import(path.join(root,`src/i18n/dictionaries/${l}/${f}.ts`)); d[l][f]=m[f]; } }
const paths = [
 "common.actions.apply","common.actions.applyShort","common.actions.contact","common.actions.learnMore",
 "common.actions.viewAll","common.actions.call","common.actions.email","common.actions.directions",
 "common.actions.skipToContent","common.ctaBand.primary","common.ctaBand.secondary",
 "common.cookieBanner.acceptAll","common.cookieBanner.rejectAll","common.cookieBanner.customise","common.cookieBanner.save","common.cookieBanner.readMore","common.cookieBanner.settingsLabel","common.cookieBanner.alwaysOn",
 "home.hero.primary","home.hero.secondary","home.stats.cta","home.programmes.cta","home.simulation.cta","home.method.cta","home.enrol.cta","home.faq.cta","home.visit.primary","home.visit.secondary",
 "about.cta.primary","about.cta.secondary","programmes.cta.primary","programmes.cta.secondary","team.cta.primary","team.cta.secondary","team.join.cta","schedule.cta.primary","schedule.cta.secondary",
 "apply.form.submit","apply.form.submitting","apply.success.again","apply.failure.retry","common.notFound.cta","common.errorPage.retry",
 "schedule.views.week","schedule.views.list","schedule.views.label","schedule.filters.reset","schedule.filters.all","schedule.filters.title","schedule.filters.programme","schedule.filters.level","schedule.filters.teacher","schedule.filters.room","schedule.filters.day",
 "schedule.columns.time","schedule.columns.group","schedule.columns.programme","schedule.columns.level","schedule.columns.teacher","schedule.columns.room",
 "programmes.ladder.columns.exam","programmes.ladder.columns.legacy","programmes.ladder.columns.cefr","programmes.ladder.columns.duration","programmes.ladder.columns.scale",
 "programmes.facts.ages","programmes.facts.levels","programmes.facts.outcomeLabel","programmes.facts.anyAge",
 "contact.map.accept","contact.map.open","contact.closed",
 "apply.form.required","apply.form.optional","apply.form.levelUnknown",
 "common.language.label","common.footer.exploreTitle","common.footer.programmesTitle","common.footer.contactTitle","common.footer.legalTitle","common.footer.addressLabel","common.footer.hoursLabel",
 "common.nav.home","common.nav.about","common.nav.programmes","common.nav.team","common.nav.schedule","common.nav.contact","common.nav.apply","common.nav.privacy","common.nav.cookies","common.nav.terms",
 "team.teachers.sinceLabel","common.placeholder.badge","common.placeholder.photo","legal.tocTitle",
];
const get=(o,p)=>p.split(".").reduce((a,k)=>a?.[k],o);
for(const p of paths){
  const row = locales.map(l=>{const v=get(d[l],p); return `${l}:${JSON.stringify(v)}(${String(v).length})`;});
  console.log(p.padEnd(38), row.join("  "));
}
