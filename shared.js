// ═══════════════════════════════════════════════════
//  SHARED STATE, GAMIFICATION, RESUME, VOCABULARY AI
// ═══════════════════════════════════════════════════

// ── VOCABULARY DATABASE (works offline, no API needed) ──
const VOCAB_DB = {
  // Unit 1
  "achieve":    {def:"To successfully reach a goal through effort.", ex:"She worked hard to achieve her dream.", tip:"Think: you ACHieve when you REACH something.", unit:1},
  "diligent":   {def:"Showing careful and steady effort in everything.", ex:"A diligent student finishes all homework on time.", tip:"Diligent = doing work carefully every day.", unit:1},
  "excel":      {def:"To be very good at something, better than most.", ex:"He excels at mathematics.", tip:"Excel = EXTRA good!", unit:1},
  "persevere":  {def:"To keep trying even when something is very difficult.", ex:"She persevered and finally won the race.", tip:"Never stop — that is what persevere means!", unit:1},
  "knowledge":  {def:"Facts and skills gained through learning and experience.", ex:"Reading books helps us gain knowledge.", tip:"Know + ledge → things you KNOW.", unit:1},
  "curious":    {def:"Eager to learn or know more about something.", ex:"The curious child asked many questions.", tip:"Curious people always ask WHY!", unit:1},
  "dedicate":   {def:"To give your time and energy fully to something.", ex:"She dedicated 2 hours daily to study.", tip:"Dedicate = give it everything you have.", unit:1},
  "progress":   {def:"Forward movement and improvement towards a goal.", ex:"The teacher praised the student's great progress.", tip:"Pro + gress → moving FORWARD.", unit:1},
  // Unit 2
  "nurture":    {def:"To care for and help someone grow.", ex:"Parents nurture children with love.", tip:"Nurture = caring and helping growth.", unit:2},
  "compassion": {def:"Concern and sympathy for someone who is suffering.", ex:"She showed compassion to her injured friend.", tip:"Compassion = caring about others' pain.", unit:2},
  "cherish":    {def:"To hold someone or something very dear.", ex:"We cherish time with our grandparents.", tip:"Cherish = keep close to your heart.", unit:2},
  "sibling":    {def:"A brother or sister.", ex:"My sibling and I play together.", tip:"Sibling = brother OR sister.", unit:2},
  "ancestor":   {def:"A family member from a very long time ago.", ex:"Our ancestors built beautiful temples.", tip:"Ancestors = family from LONG ago.", unit:2},
  "bond":       {def:"A strong connection between people.", ex:"The bond between twins is very deep.", tip:"Bond = a strong tie between people.", unit:2},
  "respect":    {def:"Deep admiration and honour for someone.", ex:"Children should respect their elders.", tip:"Respect = show you value someone.", unit:2},
  "generous":   {def:"Willing to give and share freely with others.", ex:"Her generous grandmother brought gifts.", tip:"Generous people love to share!", unit:2},
  // Unit 3
  "ecosystem":      {def:"All living things in an area and how they interact.", ex:"A pond is a small ecosystem.", tip:"Eco = environment, system = everything together.", unit:3},
  "photosynthesis": {def:"How plants make food using sunlight, water, and air.", ex:"Plants use photosynthesis to make food.", tip:"Photo = light, synthesis = making.", unit:3},
  "hibernate":      {def:"To sleep deeply through winter to save energy.", ex:"Bears hibernate all winter.", tip:"Hibernate = long winter sleep.", unit:3},
  "predator":       {def:"An animal that hunts other animals for food.", ex:"The lion is a powerful predator.", tip:"Predator = hunter.", unit:3},
  "habitat":        {def:"The natural home where an animal or plant lives.", ex:"The rainforest is habitat for many birds.", tip:"Habitat = HOME of an animal.", unit:3},
  "climate":        {def:"The typical pattern of weather in a place over time.", ex:"Nepal has a very varied climate.", tip:"Climate = long-term weather pattern.", unit:3},
  "adapt":          {def:"To change in ways that help you survive your environment.", ex:"Camels adapt to desert heat well.", tip:"Adapt = change to fit your surroundings.", unit:3},
  "organism":       {def:"Any living thing — plant, animal, or microbe.", ex:"Every organism needs water to survive.", tip:"Organism = any living thing.", unit:3},
  // Unit 4
  "tradition":  {def:"A custom passed down through generations in a community.", ex:"Dashain is a beloved Nepali tradition.", tip:"Tradition = what families do year after year.", unit:4},
  "cooperate":  {def:"To work together towards a shared goal.", ex:"Students cooperate during group projects.", tip:"Co + operate = work TOGETHER.", unit:4},
  "diversity":  {def:"The variety of different people, cultures, and ideas.", ex:"Nepal celebrates its cultural diversity.", tip:"Diverse = many different kinds.", unit:4},
  "citizen":    {def:"A legal member of a particular country or community.", ex:"Every citizen has rights and duties.", tip:"Citizen = member of a country.", unit:4},
  "heritage":   {def:"Traditions and values passed down from older generations.", ex:"Nepal's temples are our heritage.", tip:"Heritage = what past generations leave us.", unit:4},
  "volunteer":  {def:"To freely give time to help others without pay.", ex:"She volunteered at the school library.", tip:"Volunteer = help others for FREE.", unit:4},
  "harmony":    {def:"A state of peaceful agreement and cooperation.", ex:"The communities live in harmony.", tip:"Harmony = peace and agreement together.", unit:4},
  "preserve":   {def:"To protect something important and keep it safe.", ex:"We must preserve our traditions.", tip:"Preserve = protect for the future.", unit:4},
};

function getVocabAnswer(question) {
  const q = question.toLowerCase().trim();
  // Check for specific word lookup
  for (const [word, data] of Object.entries(VOCAB_DB)) {
    if (q.includes(word)) {
      const responses = [
        `📖 "${word.charAt(0).toUpperCase()+word.slice(1)}" means: ${data.def} Example: "${data.ex}" 💡 Tip: ${data.tip}`,
        `Great question! 🌟 "${word}" = ${data.def} Here's an example: "${data.ex}"`,
        `"${word.toUpperCase()}" is from Unit ${data.unit}. It means: ${data.def} 📝 Example: ${data.ex}`,
      ];
      return responses[Math.floor(Math.random()*responses.length)];
    }
  }
  // Generic helpful responses
  if (q.includes('help') || q.includes('hint')) return "I'm here to help! 😊 Type any vocabulary word from this unit and I'll explain it for you!";
  if (q.includes('hello') || q.includes('hi')) return "Hello there! 👋 I'm your vocabulary helper. Ask me about any word from this unit!";
  if (q.includes('meaning') || q.includes('what is') || q.includes('what does')) {
    const words = Object.keys(VOCAB_DB);
    const found = words.find(w => q.includes(w));
    if (found) return getVocabAnswer(found);
    return "I didn't find that word. Try asking about one of your unit vocabulary words! Type the word and I'll explain it 😊";
  }
  if (q.includes('example') || q.includes('sentence')) return "Sure! Tell me which word you want an example for. Just type the word! 📝";
  return "Good question! 🤔 I know all the vocabulary words in this course. Just type any word (like 'achieve' or 'ecosystem') and I'll explain it! 😊";
}

// ── STATE MANAGEMENT ──
function getPart() {
  const pid = localStorage.getItem('vc_current');
  if (!pid) return null;
  try { return JSON.parse(localStorage.getItem('vcp_' + pid) || 'null'); } catch { return null; }
}
function savePart(p) {
  if (!p) return;
  p.lastActive = new Date().toISOString();
  localStorage.setItem('vcp_' + p.pid, JSON.stringify(p));
}

// ── GAMIFICATION ──
const XP_PER_CORRECT = 10;
const BADGES = {
  1: { name: "Academic Scholar",   icon: "🏛️", color: "#1a7a5e" },
  2: { name: "Family Scholar",     icon: "👨‍👩‍👧", color: "#c05621" },
  3: { name: "Science Scholar",    icon: "🌿", color: "#276749" },
  4: { name: "Community Scholar",  icon: "🏘️", color: "#553c9a" },
};

function addXP(amount) {
  const p = getPart(); if (!p) return 0;
  if (!p.xp) p.xp = 0;
  p.xp += amount;
  savePart(p);
  showXPPop(amount);
  return p.xp;
}
function showXPPop(amount) {
  const el = document.createElement('div');
  el.textContent = '+' + amount + ' XP ⭐';
  el.style.cssText = 'position:fixed;top:70px;right:20px;background:#d4a017;color:white;font-size:18px;font-weight:800;padding:8px 18px;border-radius:99px;z-index:500;animation:xpPop .8s ease forwards;pointer-events:none;font-family:Nunito,sans-serif';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}
function getXP() { const p = getPart(); return (p && p.xp) || 0; }
function getLevel() {
  const xp = getXP();
  if (xp >= 1200) return { level: 4, name: "Master Scholar", icon: "👑" };
  if (xp >= 700)  return { level: 3, name: "Expert Scholar",  icon: "🥇" };
  if (xp >= 300)  return { level: 2, name: "Rising Scholar",  icon: "🥈" };
  return { level: 1, name: "New Scholar", icon: "🥉" };
}
function updateXPBar() {
  const xp = getXP();
  const lvl = getLevel();
  const el = document.getElementById('xp-display');
  if (el) el.textContent = '⭐ ' + xp + ' XP — ' + lvl.icon + ' ' + lvl.name;
}

// ── TIMER ──
let sec = 0, tiv = null;
function startTimer() {
  const p = getPart(); sec = (p && p.totalTime) || 0;
  clearInterval(tiv);
  tiv = setInterval(() => {
    sec++;
    const p2 = getPart(); if (p2) { p2.totalTime = sec; savePart(p2); }
    renderTimer();
  }, 1000);
}
function renderTimer() {
  const m = Math.floor(sec / 60), s = sec % 60;
  const el = document.getElementById('timer-disp');
  if (el) el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}
function renderProgress() {
  const p = getPart(); const done = p ? (p.unitsCompleted || []).length : 0;
  const el = document.getElementById('gprog'); if (el) el.style.width = (done / 4 * 100) + '%';
}

// ── RESUME FROM EXACT STEP ──
function saveStep(unitNum, step) {
  const p = getPart(); if (!p) return;
  if (!p.stepProgress) p.stepProgress = {};
  p.stepProgress['unit' + unitNum] = step;
  savePart(p);
}
function getSavedStep(unitNum) {
  const p = getPart(); if (!p) return 0;
  return (p.stepProgress && p.stepProgress['unit' + unitNum]) || 0;
}

// ── PRONUNCIATION ──
let curUtt = null;
function speak(word, btn) {
  if (!window.speechSynthesis) { alert('Speech not supported. Please use Google Chrome or Microsoft Edge.'); return; }
  window.speechSynthesis.cancel(); curUtt = null;
  document.querySelectorAll('.speaking').forEach(b => { b.classList.remove('playing', 'speaking'); b.innerHTML = b.dataset.lbl || '🔊 Listen'; });
  const u = new SpeechSynthesisUtterance(word);
  u.rate = 0.78; u.pitch = 1.1; u.lang = 'en-US';
  if (btn) { btn.dataset.lbl = btn.innerHTML; btn.classList.add('playing', 'speaking'); btn.textContent = '🔊 Playing…'; }
  u.onend = u.onerror = () => { if (btn) { btn.classList.remove('playing', 'speaking'); btn.innerHTML = btn.dataset.lbl || '🔊 Listen'; } curUtt = null; };
  curUtt = u; window.speechSynthesis.speak(u);
}
function wireSpeakBtns() {
  document.querySelectorAll('[data-speak]').forEach(b => { b.onclick = () => speak(b.dataset.speak, b); });
}

// ── STEPS ENGINE ──
const STEP_TITLES = ['📚 Vocabulary Words','📖 Story','🎧 Pronunciation','📝 Fill in the Blanks','✅ True or False','🧩 Word Scramble','🔗 Word Matching','🏆 Multiple Choice Quiz','✍️ Open Response'];
let curStep = 0, totalSteps = 9;
let UNIT_NUM_G = 1;

function initSteps(unitNum) {
  UNIT_NUM_G = unitNum;
  curStep = getSavedStep(unitNum);
  renderStep();
}
function renderStep() {
  saveStep(UNIT_NUM_G, curStep);
  document.querySelectorAll('.step').forEach((s, i) => s.classList.toggle('active', i === curStep));
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i < curStep) d.classList.add('done');
    else if (i === curStep) d.classList.add('active');
  });
  const sl = document.getElementById('step-label'); if (sl) sl.textContent = 'Step ' + (curStep + 1) + ' of 9';
  const st = document.getElementById('step-title'); if (st) st.textContent = STEP_TITLES[curStep] || '';
  wireSpeakBtns();
  if (curStep === 2) checkSpeechSupport();
  if (curStep === 3) initFIB();
  if (curStep === 4) initTF();
  if (curStep === 5) initScramble();
  if (curStep === 6) initMatch();
  if (curStep === 7) initMC();
  if (curStep === 8) initOpenAI();
  updateXPBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function nextStep() { if (curStep < totalSteps - 1) { curStep++; renderStep(); } }
function prevStep() { if (curStep > 0) { curStep--; renderStep(); } }

function checkSpeechSupport() {
  const n = document.getElementById('speech-note'); if (!n) return;
  n.textContent = window.speechSynthesis
    ? '✅ Click Listen to hear each word. Make sure your device volume is ON!'
    : '⚠️ Speech not available. Please use Google Chrome or Microsoft Edge.';
}

// ── ACTIVITIES ──
let fibC = 0, fibT = 0;
function initFIB() {
  const cards = document.querySelectorAll('#step-fib .fib-card');
  fibT = cards.length; fibC = 0;
  cards.forEach(c => { if (c.classList.contains('ok')) fibC++; });
  updateFIBnext();
}
function checkFIB(card) {
  if (card.classList.contains('ok')) return;
  const inp = card.querySelector('.fib-inp'), fb = card.querySelector('.fib-fb');
  const ans = inp.dataset.answer.toLowerCase(), val = inp.value.trim().toLowerCase();
  if (!val) { fb.textContent = 'Please type your answer!'; fb.className = 'fib-fb no'; return; }
  if (val === ans) {
    card.classList.add('ok'); inp.setAttribute('readonly', '');
    fb.textContent = '✓ Correct!'; fb.className = 'fib-fb ok';
    fibC++; addXP(XP_PER_CORRECT); updateFIBnext();
  } else {
    fb.textContent = 'Not quite! Hint: starts with "' + ans[0].toUpperCase() + '"'; fb.className = 'fib-fb no';
    setTimeout(() => { fb.textContent = ''; fb.className = 'fib-fb'; }, 2500);
  }
}
function updateFIBnext() {
  const b = document.getElementById('fib-next'); if (b) b.disabled = fibC < fibT;
  const bar = document.getElementById('fib-bar'); if (bar) bar.style.width = (fibT ? Math.round(fibC / fibT * 100) : 0) + '%';
}

let tfC = 0, tfT = 0;
function initTF() {
  tfT = document.querySelectorAll('#step-tf .tf-card').length; tfC = 0;
  document.querySelectorAll('#step-tf .tf-card[data-done]').forEach(() => tfC++);
  updateTFnext();
}
function handleTF(btn, userSaid, correct, card) {
  if (card.dataset.done) return; card.dataset.done = '1';
  const tBtn = card.querySelector('.t-btn'), fBtn = card.querySelector('.f-btn');
  tBtn.disabled = true; fBtn.disabled = true;
  const right = (userSaid === correct);
  btn.classList.add(right ? 'correct' : 'wrong');
  if (!right) (userSaid ? fBtn : tBtn).classList.add('correct');
  const fb = card.querySelector('.tf-fb');
  fb.textContent = right ? '✓ Correct!' : '✗ The correct answer is: ' + (correct ? 'TRUE' : 'FALSE');
  fb.className = 'tf-fb ' + (right ? 'ok' : 'no');
  card.classList.add(right ? 'ok' : 'no');
  if (right) { tfC++; addXP(XP_PER_CORRECT); }
  updateTFnext();
}
function updateTFnext() {
  const a = document.querySelectorAll('#step-tf .tf-card[data-done]').length;
  const b = document.getElementById('tf-next'); if (b) b.disabled = a < tfT;
}

let scrC = 0, scrT = 0;
function initScramble() {
  scrT = document.querySelectorAll('#step-scr .scr-card').length; scrC = 0;
  document.querySelectorAll('#step-scr .scr-card.ok').forEach(() => scrC++);
  updateScrNext();
}
function checkScr(card) {
  if (card.classList.contains('ok')) return;
  const inp = card.querySelector('.scr-inp'), fb = card.querySelector('.scr-fb');
  const ans = inp.dataset.answer.toLowerCase(), val = inp.value.trim().toLowerCase();
  if (!val) { fb.textContent = 'Type your answer!'; fb.className = 'scr-fb no'; return; }
  if (val === ans) {
    card.classList.add('ok'); inp.setAttribute('readonly', '');
    fb.textContent = '🎉 Excellent!'; fb.className = 'scr-fb ok';
    scrC++; addXP(XP_PER_CORRECT); updateScrNext();
  } else {
    fb.textContent = 'Not quite! Try again.'; fb.className = 'scr-fb no';
    setTimeout(() => { fb.textContent = ''; fb.className = 'scr-fb'; }, 2200);
  }
}
function updateScrNext() { const b = document.getElementById('scr-next'); if (b) b.disabled = scrC < scrT; }

let matchC = 0, matchT = 0, selWord = null, selEl = null;
function initMatch() {
  matchT = document.querySelectorAll('#step-match .match-word').length; matchC = 0;
  document.querySelectorAll('#step-match .match-word.matched').forEach(() => matchC++);
  selWord = null; selEl = null; updateMatchNext();
}
function selectWord(el, word) {
  if (el.classList.contains('matched')) return;
  document.querySelectorAll('.match-word').forEach(e => e.classList.remove('selected'));
  selWord = word; selEl = el; el.classList.add('selected');
}
function selectDef(el, word) {
  if (el.classList.contains('matched')) return;
  if (!selWord) { el.style.animation = 'shake .4s ease'; setTimeout(() => el.style.animation = '', 400); return; }
  if (selWord === word) {
    el.classList.add('matched'); selEl.classList.remove('selected'); selEl.classList.add('matched');
    matchC++; addXP(XP_PER_CORRECT); updateMatchNext(); selWord = null; selEl = null;
  } else {
    el.style.animation = 'shake .4s ease'; setTimeout(() => el.style.animation = '', 400);
    selEl.classList.remove('selected'); selWord = null; selEl = null;
  }
}
function updateMatchNext() {
  const b = document.getElementById('match-next'); if (b) b.disabled = matchC < matchT;
  const s = document.getElementById('match-score'); if (s) s.textContent = '✓ Matched: ' + matchC + ' / ' + matchT;
}

let mcC = 0, mcT = 0;
function initMC() {
  mcT = document.querySelectorAll('#step-mc .mc-block').length; mcC = 0;
  document.querySelectorAll('#step-mc .mc-block[data-done]').forEach(() => mcC++);
  updateMCNext();
}
function handleMC(btn, correct, block) {
  if (block.dataset.done) return; block.dataset.done = '1';
  block.querySelectorAll('.mc-opt').forEach(b => b.disabled = true);
  btn.classList.add(correct ? 'ok' : 'no');
  if (!correct) block.querySelector('[data-correct="1"]').classList.add('ok');
  const fb = block.querySelector('.mc-fb');
  fb.textContent = correct ? '✓ Correct! Well done!' : '✗ Not quite — see the correct answer above.';
  fb.className = 'mc-fb ' + (correct ? 'ok' : 'no');
  if (correct) { mcC++; addXP(XP_PER_CORRECT); }
  updateMCNext();
}
function updateMCNext() {
  const a = document.querySelectorAll('#step-mc .mc-block[data-done]').length;
  const b = document.getElementById('mc-next'); if (b) b.disabled = a < mcT;
}

// ── AI CHAT (offline vocabulary helper) ──
function initOpenAI() {
  const msgs = document.getElementById('ai-msgs');
  if (!msgs || msgs.children.length) return;
  addAIMsg('👋 Hi! I am your vocabulary helper! I work completely offline 😊 Ask me about ANY word from this unit — just type the word and I will explain it!', 'bot');
}
function addAIMsg(text, type) {
  const msgs = document.getElementById('ai-msgs'); if (!msgs) return;
  const d = document.createElement('div'); d.className = 'ai-msg ' + type; d.textContent = text;
  msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
}
function sendAI() {
  const inp = document.getElementById('ai-in'); if (!inp) return;
  const q = inp.value.trim(); if (!q) return;
  addAIMsg(q, 'usr'); inp.value = '';
  setTimeout(() => { addAIMsg(getVocabAnswer(q), 'bot'); }, 400);
}

function saveOpenResp() {
  const ta = document.getElementById('open-ta'), msg = document.getElementById('open-ok');
  if (!ta || !ta.value.trim()) { alert('Please write your response first!'); return; }
  const p = getPart();
  if (p) { if (!p.answers) p.answers = {}; p.answers['unit' + UNIT_NUM_G + '_open'] = ta.value.trim(); savePart(p); }
  if (msg) msg.style.display = 'block';
  const nb = document.getElementById('open-next'); if (nb) nb.disabled = false;
}

// ── CONFETTI ──
function confetti() {
  const cols = ['#1D9E75','#d4a017','#2db88a','#f5e6b0','#0a4a38','#fff','#e53e3e','#4299e1'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'confetti-p';
      el.style.cssText = `left:${Math.random()*100}vw;top:-12px;background:${cols[Math.floor(Math.random()*cols.length)]};width:${7+Math.random()*10}px;height:${7+Math.random()*10}px;animation-duration:${1.5+Math.random()*2.5}s;animation-delay:${Math.random()*.5}s;border-radius:${Math.random()>.5?'50%':'2px'}`;
      document.body.appendChild(el); setTimeout(() => el.remove(), 5000);
    }, i * 16);
  }
}

// ── SAVE SCORES & COMPLETE ──
function avg(arr) { const f = arr.filter(v => v != null); return f.length ? Math.round(f.reduce((a, b) => a + b, 0) / f.length) : null; }
function sc(v) { return v != null ? v + '%' : '—'; }
function cl(v) { return v == null ? '' : (v >= 80 ? 'g' : v >= 60 ? 'o' : 'r'); }

function saveAndComplete(nextPage) {
  const p = getPart(); if (!p) return;
  if (!p.scores) p.scores = {}; if (!p.unitsCompleted) p.unitsCompleted = []; if (!p.attempts) p.attempts = {};
  const u = UNIT_NUM_G;
  p.scores['fib' + u] = fibT ? Math.round(fibC / fibT * 100) : null;
  p.scores['tf' + u] = tfT ? Math.round(tfC / tfT * 100) : null;
  p.scores['scr' + u] = scrT ? Math.round(scrC / scrT * 100) : null;
  p.scores['match' + u] = matchT ? Math.round(matchC / matchT * 100) : null;
  p.scores['mc' + u] = mcT ? Math.round(mcC / mcT * 100) : null;
  const vals = [p.scores['fib'+u], p.scores['tf'+u], p.scores['scr'+u], p.scores['match'+u], p.scores['mc'+u]].filter(v => v != null);
  p.scores['overall' + u] = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  p.scores['unit' + u] = p.scores['overall' + u];
  if (!p.unitsCompleted.includes(u)) p.unitsCompleted.push(u);
  p.attempts['unit' + u] = (p.attempts['unit' + u] || 0) + 1;
  // Clear step progress for this unit (so if they redo it starts fresh)
  if (p.stepProgress) p.stepProgress['unit' + u] = 0;
  addXP(50); // bonus for completing unit
  savePart(p);
  confetti();

  const badge = BADGES[u];
  const overall = p.scores['overall' + u];
  const rows = [
    ['📝 Fill in the Blanks', fibT, fibC, p.scores['fib'+u]],
    ['✅ True or False', tfT, tfC, p.scores['tf'+u]],
    ['🧩 Word Scramble', scrT, scrC, p.scores['scr'+u]],
    ['🔗 Word Matching', matchT, matchC, p.scores['match'+u]],
    ['🏆 Multiple Choice Quiz', mcT, mcC, p.scores['mc'+u]],
  ];

  const scoreHTML = `
    <table class="score-tbl">
      <thead><tr><th>Activity</th><th>Correct</th><th>Total</th><th>Score</th></tr></thead>
      <tbody>
        ${rows.map(([n,t,c,s]) => `<tr><td>${n}</td><td>${c}</td><td>${t}</td><td class="${cl(s)}">${sc(s)}</td></tr>`).join('')}
        <tr style="font-size:19px"><td><strong>OVERALL</strong></td><td colspan="2"></td><td class="${cl(overall)}"><strong>${sc(overall)}</strong></td></tr>
      </tbody>
    </table>`;

  document.getElementById('modal-badge-icon').textContent = badge.icon;
  document.getElementById('modal-badge-name').textContent = badge.name + ' Badge Earned!';
  document.getElementById('modal-scores').innerHTML = scoreHTML;
  document.getElementById('modal-xp').textContent = '⭐ Total XP: ' + getXP() + ' — ' + getLevel().icon + ' ' + getLevel().name;
  const nb = document.getElementById('modal-next-btn');
  if (nb) {
    nb.textContent = nextPage ? 'Next Unit →' : '🎓 Get My Certificate!';
    nb.onclick = () => nextPage ? window.location = nextPage : showCertificate();
  }
  document.getElementById('complete-modal').classList.add('show');
}

// ── CERTIFICATE ──
function showCertificate() {
  const p = getPart(); if (!p) return;
  const overall = avg([p.scores?.overall1, p.scores?.overall2, p.scores?.overall3, p.scores?.overall4]);
  const lvl = getLevel();
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const certWin = window.open('', '_blank');
  certWin.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Certificate</title>
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Nunito:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    body{margin:0;background:#f0f7f4;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Nunito',sans-serif}
    .cert{background:white;width:800px;padding:60px;text-align:center;border:12px solid #0a4a38;border-radius:16px;position:relative;box-shadow:0 0 0 4px #d4a017,0 20px 60px rgba(0,0,0,.15)}
    .cert::before,.cert::after{content:'🌟';font-size:36px;position:absolute;top:20px}
    .cert::before{left:24px}.cert::after{right:24px}
    h1{font-family:'Lora',serif;font-size:42px;color:#0a4a38;margin-bottom:6px}
    .sub{font-size:20px;color:#888;margin-bottom:30px}
    .presented{font-size:18px;color:#555;margin-bottom:10px}
    .name{font-family:'Lora',serif;font-size:48px;font-weight:700;color:#d4a017;border-bottom:3px solid #d4a017;padding-bottom:8px;margin-bottom:30px;display:inline-block;padding:0 40px 8px}
    .desc{font-size:17px;color:#333;line-height:1.7;margin-bottom:28px;max-width:540px;margin-left:auto;margin-right:auto}
    .badges-row{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin:20px 0}
    .badge-cert{background:#e8f7f2;border:2px solid #2db88a;border-radius:12px;padding:12px 20px;font-size:16px;font-weight:700;color:#0a4a38}
    .score-big{font-size:52px;font-weight:800;color:#0a4a38;margin:10px 0}
    .score-label{font-size:16px;color:#888}
    .level{font-size:20px;font-weight:700;color:#553c9a;margin:10px 0}
    .footer{margin-top:36px;padding-top:20px;border-top:2px solid #e0e0e0;display:flex;justify-content:space-between;align-items:flex-end;font-size:14px;color:#888}
    .sign{font-family:'Lora',serif;font-size:22px;color:#0a4a38;font-weight:700}
    @media print{body{background:white}.cert{box-shadow:none}}
    .print-btn{position:fixed;top:20px;right:20px;background:#0a4a38;color:white;border:none;border-radius:10px;padding:12px 24px;font-size:16px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif}
  </style></head><body>
  <button class="print-btn" onclick="window.print()">🖨️ Print Certificate</button>
  <div class="cert">
    <h1>Certificate of Achievement</h1>
    <div class="sub">Grade 4 Vocabulary Learning Adventure</div>
    <div class="presented">This certificate is proudly presented to</div>
    <div class="name">${p.name}</div>
    <div class="desc">for successfully completing all four units of the Grade 4 Vocabulary Learning Adventure Course, demonstrating outstanding commitment to vocabulary learning and academic excellence.</div>
    <div class="badges-row">
      <div class="badge-cert">🏛️ Academic Scholar</div>
      <div class="badge-cert">👨‍👩‍👧 Family Scholar</div>
      <div class="badge-cert">🌿 Science Scholar</div>
      <div class="badge-cert">🏘️ Community Scholar</div>
    </div>
    <div class="score-label">Overall Course Score</div>
    <div class="score-big">${overall != null ? overall + '%' : '—'}</div>
    <div class="level">${lvl.icon} Level: ${lvl.name} &nbsp;|&nbsp; ⭐ ${getXP()} XP Earned</div>
    <div class="footer">
      <div><div class="sign">Grade 4 Vocabulary Course</div><div>Nepal Online Learning Program</div></div>
      <div>${today}</div>
      <div><div class="sign">________________________</div><div>Course Instructor</div></div>
    </div>
  </div>
  </body></html>`);
  certWin.document.close();
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  const p = getPart();
  if (!p && window.location.pathname.includes('unit')) { window.location = 'index.html'; return; }
  if (p) {
    const sn = document.getElementById('student-name'); if (sn) sn.textContent = p.name || 'Student';
  }
  startTimer(); renderTimer(); renderProgress(); updateXPBar();
  document.querySelectorAll('.fib-inp').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') checkFIB(i.closest('.fib-card')); }));
  document.querySelectorAll('.scr-inp').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') checkScr(i.closest('.scr-card')); }));
  const ai = document.getElementById('ai-in'); if (ai) ai.addEventListener('keydown', e => { if (e.key === 'Enter') sendAI(); });
});
