from pathlib import Path
import re

index = Path('index.html')
concept = Path('concept.html')
text = index.read_text(encoding='utf-8')

final_section = '''    <section class="section final-screen" id="contacts" aria-labelledby="final-title">
      <div class="final-screen-card reveal">
        <span class="section-kicker">Проект завершён</span>
        <h2 id="final-title">Тёплый лекторий</h2>
        <p>Учебный интерьер · 2026</p>
        <div class="final-screen-actions" aria-label="Финальные действия проекта">
          <a class="btn primary" href="concept.html">Открыть концепцию</a>
          <a class="btn" href="contacts.html">Написать автору</a>
          <a class="btn" href="#top">Вернуться к началу</a>
        </div>
      </div>
    </section>'''

pattern = re.compile(r'    <section class="section" id="contacts" aria-labelledby="contacts-title">.*?    </section>', re.S)
text, count = pattern.subn(final_section, text, count=1)
if count != 1:
    raise SystemExit(f'Contact section replacement failed: {count}')

text = text.replace('href="#contacts"', 'href="contacts.html"')
text = text.replace('href="index.html#contacts"', 'href="contacts.html"')

css = '''<style id="contact-stage-overrides">
.final-screen{min-height:min(78svh,760px);display:grid;align-items:center}.final-screen-card{min-height:min(62svh,600px);display:grid;align-content:center;justify-items:center;gap:22px;padding:clamp(42px,7vw,96px);border:1px solid rgba(255,255,255,.13);border-radius:32px;background:rgba(10,12,14,.72);-webkit-backdrop-filter:blur(20px) saturate(110%);backdrop-filter:blur(20px) saturate(110%);box-shadow:inset 0 1px 0 rgba(255,255,255,.045),0 30px 90px rgba(0,0,0,.34);text-align:center}.final-screen-card h2{max-width:900px;margin:0}.final-screen-card p{color:var(--ivory-muted);font-size:clamp(16px,2vw,20px)}.final-screen-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:10px}@media(max-width:640px){.final-screen{min-height:auto}.final-screen-card{min-height:72svh;padding:38px 18px;border-radius:24px}.final-screen-actions{width:100%;flex-direction:column}.final-screen-actions .btn{width:100%}}
</style>'''
text = re.sub(r'<style id="contact-stage-overrides">.*?</style>\s*', '', text, flags=re.S)
text = text.replace('</head>', css + '\n</head>', 1)
index.write_text(text, encoding='utf-8')

if concept.exists():
    c = concept.read_text(encoding='utf-8')
    c = c.replace('href="#contacts"', 'href="contacts.html"')
    c = c.replace('href="index.html#contacts"', 'href="contacts.html"')
    concept.write_text(c, encoding='utf-8')

contacts = '''<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Контакты — Тёплый лекторий</title><meta name="description" content="Контакты автора учебного интерьерного проекта «Тёплый лекторий». Telegram, Email, GitHub и опубликованная версия проекта."><meta name="theme-color" content="#000000"><link rel="preload" as="image" href="assets/render-02.webp"><style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');:root{color-scheme:dark;--line:rgba(255,255,255,.13);--text:#f1f1ed;--muted:rgba(241,241,237,.66);--dim:rgba(241,241,237,.43);--wrap:min(1180px,calc(100% - 40px))}*{box-sizing:border-box}html{scroll-behavior:smooth;text-rendering:optimizeLegibility}body{margin:0;min-height:100svh;background:#000;color:var(--text);font-family:"Montserrat",Arial,sans-serif;overflow-x:hidden}a{color:inherit;text-decoration:none}img{display:block;max-width:100%}:focus-visible{outline:2px solid rgba(255,255,255,.75);outline-offset:4px;border-radius:16px}.topbar{position:sticky;top:0;z-index:20;background:rgba(0,0,0,.5);border-bottom:1px solid rgba(255,255,255,.09);-webkit-backdrop-filter:blur(18px) saturate(118%);backdrop-filter:blur(18px) saturate(118%)}.nav{width:var(--wrap);min-height:68px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.nav-links{display:flex;gap:8px;color:var(--muted);font-size:13px}.nav-links a{padding:10px 12px;border-radius:999px}.nav-links a:hover,.nav-links a:focus-visible{background:rgba(255,255,255,.07);color:var(--text)}main{width:var(--wrap);margin:auto;padding:clamp(54px,8vw,110px) 0 70px}.hero{display:grid;grid-template-columns:minmax(0,.72fr) minmax(420px,1fr);gap:clamp(34px,6vw,88px);align-items:center}.eyebrow{color:var(--dim);font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}h1{margin:18px 0 0;max-width:720px;font-size:clamp(46px,7vw,92px);line-height:.95;letter-spacing:-.045em}.lead{margin:24px 0 0;max-width:620px;color:var(--muted);font-size:clamp(16px,1.6vw,20px);line-height:1.7}.contact-grid{margin-top:34px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.contact-link{min-height:104px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:8px;padding:18px;border:1px solid var(--line);border-radius:20px;background:rgba(12,14,16,.76);-webkit-backdrop-filter:blur(18px) saturate(110%);backdrop-filter:blur(18px) saturate(110%);transition:transform .2s ease,background .2s ease,border-color .2s ease;overflow-wrap:anywhere}.contact-link:hover,.contact-link:focus-visible{transform:translateY(-2px);background:rgba(20,22,24,.86);border-color:rgba(255,255,255,.22)}.contact-link small{color:var(--dim);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.contact-link b{font-size:15px;line-height:1.35}.visual{margin:0;overflow:hidden;border:1px solid var(--line);border-radius:28px;background:#090a0b;box-shadow:0 30px 100px rgba(0,0,0,.45)}.visual img{width:100%;min-height:640px;object-fit:cover}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.btn{min-height:46px;display:inline-flex;align-items:center;justify-content:center;padding:0 18px;border:1px solid var(--line);border-radius:999px;background:rgba(12,14,16,.76)}.btn.primary{background:#eeeae2;color:#070809;font-weight:700}footer{width:var(--wrap);margin:auto;padding:0 0 34px;display:flex;justify-content:space-between;gap:18px;color:var(--dim);font-size:12px}@media(max-width:900px){.hero{grid-template-columns:1fr}.visual{order:-1}.visual img{min-height:360px;aspect-ratio:4/3}}@media(max-width:640px){.nav-links{display:none}main{padding-top:30px}.contact-grid{grid-template-columns:1fr}.visual img{min-height:300px}.actions{flex-direction:column}.btn{width:100%}footer{flex-direction:column}}
</style></head><body><header class="topbar"><nav class="nav" aria-label="Основная навигация"><a class="brand" href="index.html">Тёплый лекторий</a><div class="nav-links"><a href="index.html">Главная</a><a href="concept.html">Концепция</a><a href="index.html#renders">Рендеры</a></div></nav></header><main><section class="hero" aria-labelledby="contacts-title"><div><span class="eyebrow">Связь с автором</span><h1 id="contacts-title">Контакты</h1><p class="lead">Для обсуждения проекта, сотрудничества или обратной связи используйте прямые контакты ниже.</p><div class="contact-grid"><a class="contact-link" href="https://t.me/doomrushaz2000" target="_blank" rel="noopener noreferrer"><small>Telegram</small><b>@doomrushaz2000</b></a><a class="contact-link" href="mailto:yourtoxicpm@gmail.com"><small>Email</small><b>yourtoxicpm@gmail.com</b></a><a class="contact-link" href="https://github.com/WhyPonySwag" target="_blank" rel="noopener noreferrer"><small>GitHub</small><b>WhyPonySwag</b></a><a class="contact-link" href="https://lectory-project.vercel.app" target="_blank" rel="noopener noreferrer"><small>Live site</small><b>Открыть проект</b></a></div><div class="actions"><a class="btn primary" href="index.html">Вернуться к проекту</a><a class="btn" href="concept.html">Открыть концепцию</a></div></div><figure class="visual"><img src="assets/render-02.webp" alt="Деталь интерьера лектория с тёплой палитрой и акцентной стеной" width="900" height="675"></figure></section></main><footer><span>© 2026 · Lectory Interior Concept · T.A.</span><span>Таласбаев Т. А.</span></footer></body></html>'''
Path('contacts.html').write_text(contacts, encoding='utf-8')

for p in [Path('.contact-stage-trigger'), Path('.github/workflows/contact-stage.yml'), Path('.github/scripts/apply_contact_stage.py')]:
    if p.exists():
        p.unlink()
