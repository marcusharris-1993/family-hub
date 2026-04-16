import React, { useState, useEffect, useRef, useCallback } from 'react';

const TOPPINGS = [
  { id:'sauce',     name:'Sauce',     emoji:'🍅' },
  { id:'cheese',    name:'Cheese',    emoji:'🧀' },
  { id:'pepperoni', name:'Pepperoni', emoji:'🔴' },
  { id:'mushroom',  name:'Mushroom',  emoji:'🍄' },
  { id:'pepper',    name:'Pepper',    emoji:'🫑' },
  { id:'olive',     name:'Olive',     emoji:'🫒' },
  { id:'ham',       name:'Ham',       emoji:'🥩' },
  { id:'pineapple', name:'Pineapple', emoji:'🍍' },
  { id:'corn',      name:'Corn',      emoji:'🌽' },
  { id:'broccoli',  name:'Broccoli',  emoji:'🥦' },
  { id:'onion',     name:'Onion',     emoji:'🧅' },
  { id:'bacon',     name:'Bacon',     emoji:'🥓' },
];

const FRUITS = [
  { id:'strawberry', name:'Strawberry', emoji:'🍓' },
  { id:'banana',     name:'Banana',     emoji:'🍌' },
  { id:'orange',     name:'Orange',     emoji:'🍊' },
  { id:'grape',      name:'Grape',      emoji:'🍇' },
  { id:'mango',      name:'Mango',      emoji:'🥭' },
  { id:'apple',      name:'Apple',      emoji:'🍎' },
  { id:'kiwi',       name:'Kiwi',       emoji:'🥝' },
  { id:'lemon',      name:'Lemon',      emoji:'🍋' },
];

const DRINKS = [
  { id:'ss', name:'Strawberry Shake', emoji:'🍓', color:'#ff6b8a', ingredients:[{id:'strawberry',count:2}] },
  { id:'bs', name:'Banana Smoothie',  emoji:'🍌', color:'#ffd93d', ingredients:[{id:'banana',count:2}] },
  { id:'oj', name:'Orange Juice',     emoji:'🍊', color:'#ff9500', ingredients:[{id:'orange',count:1}] },
  { id:'bb', name:'Berry Blast',      emoji:'🍇', color:'#9b59b6', ingredients:[{id:'strawberry',count:1},{id:'grape',count:1}] },
  { id:'tm', name:'Tropical Mix',     emoji:'🥭', color:'#ff6b35', ingredients:[{id:'mango',count:1},{id:'banana',count:1}] },
  { id:'aj', name:'Apple Juice',      emoji:'🍎', color:'#a8e063', ingredients:[{id:'apple',count:2}] },
  { id:'kc', name:'Kiwi Cooler',      emoji:'🥝', color:'#56ab2f', ingredients:[{id:'kiwi',count:1},{id:'lemon',count:1}] },
];

const CUSTOMERS = [
  {emoji:'👧',name:'Emma'},{emoji:'👦',name:'Liam'},{emoji:'👩',name:'Sophie'},
  {emoji:'👨',name:'Jake'},{emoji:'🧒',name:'Mia'},
];

const NW = ['zero','one','two','three','four','five'];
const P  = {ORDER:'ORDER',BUILD:'BUILD',BAKING:'BAKING',DRINK:'DRINK',BLENDING:'BLENDING',RESULT:'RESULT'};

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
.pg*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.pg{font-family:'Nunito',sans-serif;touch-action:pan-y}

@keyframes custIn{from{transform:translateX(-150px) scale(.8);opacity:0}to{transform:none;opacity:1}}
@keyframes speechIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes trayUp{from{transform:translateY(70px);opacity:0}to{transform:none;opacity:1}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes radPulse{0%,100%{opacity:.4;transform:scale(.9)}50%{opacity:1;transform:scale(1.1)}}
@keyframes banner{0%{transform:scale(0) translateY(-40px);opacity:0}65%{transform:scale(1.1) translateY(5px);opacity:1}80%{transform:scale(.96)}100%{transform:scale(1) translateY(0);opacity:1}}
@keyframes dance{0%,100%{transform:rotate(0) scale(1)}25%{transform:rotate(-15deg) scale(1.1)}75%{transform:rotate(15deg) scale(1.1)}}
@keyframes fall{from{transform:translateY(-80px) rotate(0);opacity:1}to{transform:translateY(105vh) rotate(600deg);opacity:0}}
@keyframes oGlow{0%,100%{box-shadow:0 0 25px #ff8c00,0 0 50px #ff4500,inset 0 0 20px rgba(255,80,0,.3)}50%{box-shadow:0 0 40px #ffd700,0 0 80px #ff8c00,inset 0 0 30px rgba(255,160,0,.4)}}
@keyframes wFlicker{0%,100%{background:radial-gradient(circle,#ffd700 30%,#ff8c00 100%);box-shadow:inset 0 0 15px #ffd700,0 0 20px #ff8c00}33%{background:radial-gradient(circle,#ff8c00 30%,#ff4500 100%);box-shadow:inset 0 0 20px #ff8c00,0 0 28px #ff4500}66%{background:radial-gradient(circle,#ff6000 30%,#ff8c00 100%);box-shadow:inset 0 0 18px #ff4500,0 0 24px #ffd700}}
@keyframes fl1{0%,100%{transform:scaleY(1) scaleX(1)}50%{transform:scaleY(1.5) scaleX(.8)}}
@keyframes fl2{0%,100%{transform:scaleY(.8) scaleX(1.2)}50%{transform:scaleY(1.3) scaleX(.9)}}
@keyframes fl3{0%,100%{transform:scaleY(1.2) scaleX(.9)}50%{transform:scaleY(.9) scaleX(1.1)}}
@keyframes haze{0%,100%{transform:skewX(0)}25%{transform:skewX(1.5deg)}75%{transform:skewX(-1.5deg)}}
@keyframes pIn{from{transform:translateY(-210px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes pOut{from{transform:translateY(0);opacity:1}to{transform:translateY(-210px);opacity:0}}
@keyframes fDrop{0%{transform:translateY(-80px) scale(1.4);opacity:0}70%{opacity:1}100%{transform:none;opacity:1}}
@keyframes bShake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-10px)}20%,40%,60%,80%{transform:translateX(10px)}}
@keyframes lChurn{0%,100%{border-radius:0 0 12px 12px}33%{border-radius:6px 0 12px 6px}66%{border-radius:0 6px 6px 12px}}
@keyframes orbit{from{transform:rotate(0deg) translateX(54px) rotate(0deg)}to{transform:rotate(360deg) translateX(54px) rotate(-360deg)}}
@keyframes dSlide{from{transform:translateX(80px);opacity:0}to{transform:none;opacity:1}}
@keyframes sPop{0%{transform:scale(0) rotate(-30deg);opacity:0}70%{transform:scale(1.35) rotate(10deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes wrongWiggle{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(-50%,-50%) rotate(-12deg)}75%{transform:translate(-50%,-50%) rotate(12deg)}}

.pg .glass{background:rgba(255,255,255,.10);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.15);border-radius:24px;box-shadow:0 8px 32px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.18)}
.pg .btn{font-family:'Nunito',sans-serif;font-weight:900;border:none;cursor:pointer;border-radius:50px;padding:14px 28px;font-size:18px;border-bottom:4px solid rgba(0,0,0,.3);display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:transform .08s,border-bottom-width .08s,margin-top .08s;user-select:none;width:100%}
.pg .btn:active{transform:scale(.94);border-bottom-width:1px;margin-top:3px}
.pg .btn-r{background:linear-gradient(135deg,#ff6b6b,#ee5a24);color:#fff;box-shadow:0 4px 20px rgba(238,90,36,.4)}
.pg .btn-g{background:linear-gradient(135deg,#6bcb77,#4c9a52);color:#fff;box-shadow:0 4px 20px rgba(76,154,82,.4)}
.pg .btn-p{background:linear-gradient(135deg,#a66cff,#7b2fff);color:#fff;box-shadow:0 4px 20px rgba(123,47,255,.4)}
.pg .ib{background:rgba(255,255,255,.10);border:2px solid rgba(255,255,255,.18);border-radius:14px;padding:8px 4px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;font-family:'Nunito',sans-serif;touch-action:none;user-select:none;-webkit-user-select:none;transition:transform .1s,background .15s;min-height:64px;justify-content:center}
.pg .ib:active{transform:scale(.92);background:rgba(255,255,255,.25)}
.pg .ib-want{border-color:#ffd700 !important;box-shadow:0 0 10px rgba(255,215,0,.55),0 0 0 1px rgba(255,215,0,.3);background:rgba(255,215,0,.12) !important}
.pg .fl{color:#ff9f43;font-size:1.2em;text-shadow:0 0 10px rgba(255,159,67,.7);font-weight:900}

/* ── Phone layout (default) ── */
.pg .build-wrap{display:flex;flex-direction:column;gap:12px}
.pg .build-pizza{order:2;display:flex;flex-direction:column;align-items:center;gap:8px}
.pg .build-side{order:1;display:flex;flex-direction:column;gap:10px}
.pg .piz-sz{width:170px;height:170px;flex-shrink:0}
.pg .t-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
.pg .drink-wrap{display:flex;flex-direction:column;gap:12px}
.pg .drink-blender{order:2;display:flex;flex-direction:column;align-items:center;gap:8px}
.pg .drink-side{order:1;display:flex;flex-direction:column;gap:10px}
.pg .narrow{max-width:520px;margin:0 auto;width:100%}

/* ── Tablet landscape ── */
@media(min-width:768px) and (orientation:landscape){
  .pg{height:100dvh;overflow:hidden}
  .pg main{overflow:hidden !important;max-width:none !important}
  .pg .build-wrap{display:grid;grid-template-columns:210px 1fr;gap:16px;height:calc(100dvh - 76px);align-items:start}
  .pg .build-pizza{order:0;position:sticky;top:0;padding-top:4px}
  .pg .build-side{order:0;overflow-y:auto;max-height:calc(100dvh - 80px);padding-right:4px}
  .pg .piz-sz{width:196px;height:196px}
  .pg .t-grid{grid-template-columns:repeat(6,1fr);gap:6px}
  .pg .drink-wrap{display:grid;grid-template-columns:160px 1fr;gap:16px;height:calc(100dvh - 76px);align-items:start}
  .pg .drink-blender{order:0;position:sticky;top:0;padding-top:4px}
  .pg .drink-side{order:0;overflow-y:auto;max-height:calc(100dvh - 80px)}
  .pg .narrow{max-width:600px}
  .pg .baking-wrap{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:40px}
}
`;

// ── Audio ─────────────────────────────────────────────────────────────────────
function tone(ctx, freq, dur, type='sine', vol=0.28) {
  if (!ctx) return;
  try {
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type=type; o.frequency.value=freq;
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+dur);
    o.start(); o.stop(ctx.currentTime+dur);
  } catch(_){}
}
const sfx = {
  pop:   c => tone(c,660,.10),
  rm:    c => tone(c,300,.14),
  wrong: c => tone(c,220,.18,'sawtooth',.15),
  ok:    c => [523,659,784].forEach((f,i)=>setTimeout(()=>tone(c,f,.3),i*140)),
  fail:  c => [400,300,200].forEach((f,i)=>setTimeout(()=>tone(c,f,.3),i*140)),
  win:   c => [523,587,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(c,f,.4,'sine',.35),i*180)),
  blend:(c,dur)=>{
    if(!c) return;
    try{
      const o=c.createOscillator(),g=c.createGain();
      o.connect(g); g.connect(c.destination); o.type='sawtooth';
      o.frequency.setValueAtTime(200,c.currentTime);
      o.frequency.linearRampToValueAtTime(500,c.currentTime+dur);
      g.gain.setValueAtTime(0.08,c.currentTime);
      g.gain.linearRampToValueAtTime(0.12,c.currentTime+dur*.5);
      g.gain.linearRampToValueAtTime(0,c.currentTime+dur);
      o.start(); o.stop(c.currentTime+dur);
    }catch(_){}
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function mkOrder() {
  const n    = 2+Math.floor(Math.random()*2);
  const tops = [...TOPPINGS].sort(()=>Math.random()-.5).slice(0,n)
                .map(t=>({...t, required:1+Math.floor(Math.random()*3)}));
  const drink    = DRINKS[Math.floor(Math.random()*DRINKS.length)];
  const customer = CUSTOMERS[Math.floor(Math.random()*CUSTOMERS.length)];
  return {toppings:tops, drink, customer};
}

function calcStars(order, pTops, bFrts) {
  const orderedIds = new Set(order.toppings.map(t=>t.id));
  // Ordered toppings: penalise shortfall and excess per item
  const orderedOff = order.toppings.reduce((s,t)=>s+Math.abs((pTops[t.id]||0)-t.required), 0);
  // Wrong toppings added (not in order)
  const wrongTops  = Object.entries(pTops)
    .filter(([id])=>!orderedIds.has(id))
    .reduce((s,[,c])=>s+c, 0);
  const totalOff   = orderedOff + wrongTops;
  const ps         = totalOff===0 ? 3 : totalOff<=1 ? 2 : 1;

  const drinkIds   = new Set(order.drink.ingredients.map(i=>i.id));
  const wrongFrts  = Object.entries(bFrts)
    .filter(([id])=>!drinkIds.has(id))
    .reduce((s,[,c])=>s+c, 0);
  const dok        = order.drink.ingredients.every(i=>(bFrts[i.id]||0)===i.count) && wrongFrts===0;
  return {ps, db:dok?1:0, total:ps+(dok?1:0)};
}

function tPos(id, idx, cnt) {
  const seed  = (id.charCodeAt(0)*13 + id.charCodeAt(1)*7) % 360;
  const angle = ((seed + idx*(360/Math.max(cnt,1)))*Math.PI)/180;
  const r     = 38+(id.charCodeAt(0)%20);
  return {x:Math.cos(angle)*r, y:Math.sin(angle)*r};
}
function PName({name, small}) {
  const sz = small ? 11 : 12;
  return (
    <span style={{color:'white',fontWeight:700,fontSize:sz,textAlign:'center',lineHeight:1.2}}>
      <span className="fl">{name[0]}</span>{name.slice(1)}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PizzaGame() {
  const [phase,   setPhase]  = useState(P.ORDER);
  const [order,   setOrder]  = useState(()=>mkOrder());
  const [score,   setScore]  = useState(0);
  const [pTops,   setPTops]  = useState({});
  const [bFrts,   setBFrts]  = useState({});
  const [bkPhase, setBkPhase]= useState('idle');
  const [bkPct,   setBkPct]  = useState(0);
  const [blPhase, setBlPhase]= useState('idle');
  const [result,  setResult] = useState(null);
  const [dropEm,  setDropEm] = useState(null);
  const [confetti,setConf]   = useState([]);
  const [wrongId, setWrongId]= useState(null);

  const audRef = useRef(null);
  const pizRef = useRef(null);
  const blnRef = useRef(null);
  const ivRef  = useRef(null);

  const getAud = useCallback(()=>{
    if(!audRef.current){
      try{ audRef.current=new (window.AudioContext||window.webkitAudioContext)(); }catch(_){}
    }
    if(audRef.current?.state==='suspended') audRef.current.resume().catch(()=>{});
    return audRef.current;
  },[]);

  // Baking timer
  useEffect(()=>{
    if(phase!==P.BAKING) return;
    setBkPhase('in'); setBkPct(0);
    const t=setTimeout(()=>{
      setBkPhase('baking');
      let p=0;
      ivRef.current=setInterval(()=>{
        p+=2; setBkPct(Math.min(100,p));
        if(p>=100){ clearInterval(ivRef.current); setBkPhase('out'); setTimeout(()=>{ setBkPhase('done'); setPhase(P.DRINK); },900); }
      },60);
    },900);
    return ()=>{ clearTimeout(t); clearInterval(ivRef.current); };
  },[phase]);

  function newRound(){
    setOrder(mkOrder()); setPTops({}); setBFrts({});
    setBkPhase('idle'); setBkPct(0); setBlPhase('idle');
    setResult(null); setConf([]); setWrongId(null); setPhase(P.ORDER);
  }

  const orderedIds = new Set((order?.toppings||[]).map(t=>t.id));
  const drinkIds   = new Set((order?.drink?.ingredients||[]).map(i=>i.id));

  const addTop = useCallback(t=>{
    getAud();
    if(!orderedIds.has(t.id)){
      sfx.wrong(audRef.current);
      setWrongId(t.id);
      setTimeout(()=>setWrongId(null), 600);
    } else {
      sfx.pop(audRef.current);
    }
    setPTops(p=>({...p,[t.id]:(p[t.id]||0)+1}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[order]);

  const rmTop = useCallback(id=>{
    sfx.rm(getAud());
    setPTops(p=>{ if(!p[id]) return p; const n={...p}; n[id]===1?delete n[id]:n[id]--; return n; });
  },[getAud]);

  const addFrt = useCallback(f=>{
    getAud();
    if(!drinkIds.has(f.id)){
      sfx.wrong(audRef.current);
      setWrongId('frt_'+f.id);
      setTimeout(()=>setWrongId(null), 600);
    } else {
      sfx.pop(audRef.current);
    }
    setBFrts(p=>({...p,[f.id]:(p[f.id]||0)+1}));
    setDropEm(f.emoji); setTimeout(()=>setDropEm(null),600);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[order]);

  const rmFrt = useCallback(id=>{
    sfx.rm(getAud());
    setBFrts(p=>{ if(!p[id]) return p; const n={...p}; n[id]===1?delete n[id]:n[id]--; return n; });
  },[getAud]);

  function doBlend(){
    setBlPhase('blending'); sfx.blend(getAud(),2.1);
    setTimeout(()=>setBlPhase('done'),2200);
  }

  function serve(){
    const r=calcStars(order,pTops,bFrts);
    setResult(r); setScore(s=>s+r.total);
    if(r.total>=4){
      sfx.win(getAud());
      setConf(Array.from({length:40},(_,i)=>({
        id:i, emoji:['🎉','⭐','🍕','✨','🌟','🎊','🏆','🥳'][i%8],
        left:Math.random()*100, delay:Math.random()*1200,
        dur:2200+Math.random()*2000, size:22+Math.random()*18,
      })));
    } else if(r.ps>=2) sfx.ok(getAud()); else sfx.fail(getAud());
    setPhase(P.RESULT);
  }

  function drag(e, item, targetRef, onDrop){
    e.preventDefault(); getAud();
    const g=document.createElement('div');
    g.style.cssText=`position:fixed;pointer-events:none;z-index:9999;display:flex;flex-direction:column;align-items:center;gap:4px;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);filter:drop-shadow(0 6px 12px rgba(0,0,0,.55))`;
    g.innerHTML=`<div style="font-size:48px">${item.emoji}</div><div style="background:rgba(0,0,0,.8);color:#fff;padding:4px 12px;border-radius:20px;font:900 16px 'Nunito',sans-serif">${item.name}</div>`;
    document.body.appendChild(g);
    e.currentTarget.setPointerCapture(e.pointerId);
    const mv=m=>{ g.style.left=m.clientX+'px'; g.style.top=m.clientY+'px'; };
    const up=u=>{
      document.removeEventListener('pointermove',mv);
      document.removeEventListener('pointerup',up);
      if(g.parentNode) g.parentNode.removeChild(g);
      if(targetRef.current){
        const r=targetRef.current.getBoundingClientRect();
        if(u.clientX>=r.left&&u.clientX<=r.right&&u.clientY>=r.top&&u.clientY<=r.bottom) onDrop(item);
      }
    };
    document.addEventListener('pointermove',mv);
    document.addEventListener('pointerup',up);
  }

  const totalPiz = Object.values(pTops).reduce((a,b)=>a+b,0);
  const blFList  = Object.entries(bFrts).flatMap(([id,c])=>Array(c).fill(id));
  const blFill   = Math.min(88,blFList.length*22);

  // ── ORDER ────────────────────────────────────────────────────────────────────
  function renderOrder(){
    return (
      <div className="narrow" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,paddingTop:4}}>
        <div style={{fontSize:80,animation:'custIn .55s ease both, bob 3s ease-in-out 1s infinite'}}>
          {order.customer.emoji}
        </div>
        <div className="glass" style={{width:'100%',padding:'18px 16px',animation:'speechIn .4s .3s ease both',position:'relative'}}>
          <div style={{position:'absolute',top:-20,left:'50%',transform:'translateX(-50%)',fontSize:26}}>💬</div>
          <h2 style={{color:'#ffd700',fontWeight:900,fontSize:19,marginBottom:12,textAlign:'center'}}>
            {order.customer.name} wants:
          </h2>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {order.toppings.map(t=>(
              <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,.08)',borderRadius:12,padding:'9px 12px'}}>
                <span style={{fontSize:32,filter:'drop-shadow(0 2px 4px rgba(0,0,0,.4))'}}>{t.emoji}</span>
                <div>
                  <div style={{color:'white',fontWeight:900,fontSize:18}}>
                    <span className="fl" style={{fontSize:22}}>{t.name[0]}</span>{t.name.slice(1)}
                  </div>
                  <div style={{color:'#ffd700',fontWeight:700,fontSize:15}}>×{t.required} <span style={{opacity:.75}}>({NW[t.required]})</span></div>
                </div>
              </div>
            ))}
            <div style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,.08)',borderRadius:12,padding:'9px 12px'}}>
              <span style={{fontSize:32}}>{order.drink.emoji}</span>
              <div style={{color:'white',fontWeight:900,fontSize:18}}>
                And a <span style={{color:'#4ecdc4'}}>{order.drink.name}</span>!
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-r" onClick={()=>{ getAud(); setPhase(P.BUILD); }} style={{fontSize:20}}>
          Let&apos;s go! 🍕
        </button>
      </div>
    );
  }

  // ── BUILD PIZZA ───────────────────────────────────────────────────────────
  function renderBuild(){
    return (
      <div className="build-wrap">
        {/* LEFT / PHONE-BOTTOM: pizza */}
        <div className="build-pizza">
          <div ref={pizRef} className="piz-sz" style={{borderRadius:'50%',background:'radial-gradient(circle,#f8d04a 55%,#e09030 78%,#c47020 100%)',boxShadow:'0 6px 24px rgba(0,0,0,.5),inset 0 -6px 14px rgba(0,0,0,.25)',position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{position:'absolute',width:'75%',height:'75%',borderRadius:'50%',background:'radial-gradient(circle,#c0392b 50%,#922b21 100%)',pointerEvents:'none'}}/>
            {Object.entries(pTops).map(([id,cnt])=>{
              const top=TOPPINGS.find(t=>t.id===id); if(!top) return null;
              const isWrong=!orderedIds.has(id);
              return Array.from({length:cnt}).map((_,i)=>{
                const pos=tPos(id,i,cnt);
                return (
                  <div key={`${id}-${i}`} style={{position:'absolute',left:`calc(50% + ${pos.x}px)`,top:`calc(50% + ${pos.y}px)`,transform:'translate(-50%,-50%)',fontSize:20,filter:isWrong?'drop-shadow(0 0 4px #ff4444)':'drop-shadow(0 2px 3px rgba(0,0,0,.45))',cursor:'pointer',zIndex:2,animation:wrongId===id?'wrongWiggle .4s ease':'none'}}>
                    {top.emoji}
                    <div onClick={e=>{e.stopPropagation();rmTop(id);}} style={{position:'absolute',top:-7,right:-7,width:17,height:17,borderRadius:'50%',background:'#ff4444',border:'2px solid white',color:'white',fontSize:11,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',lineHeight:1,cursor:'pointer',zIndex:3}}>−</div>
                  </div>
                );
              });
            })}
          </div>
          <div style={{color:'rgba(255,255,255,.55)',fontSize:12,textAlign:'center'}}>Tap to add · tap − to remove</div>
          <div style={{color:'rgba(255,255,255,.8)',fontWeight:700,fontSize:13}}>
            Toppings on pizza: <strong style={{color:'white'}}>{totalPiz}</strong>
          </div>
        </div>

        {/* RIGHT / PHONE-TOP: order + tray + button */}
        <div className="build-side">
          {/* Checklist */}
          <div className="glass" style={{padding:'12px 14px'}}>
            <div style={{color:'#ffd700',fontWeight:900,fontSize:15,marginBottom:8}}>📋 Order</div>
            {order.toppings.map(t=>{
              const placed=pTops[t.id]||0, done=placed===t.required, over=placed>t.required, need=t.required-placed;
              const wrongPlaced=Object.entries(pTops).filter(([id])=>!orderedIds.has(id)).reduce((s,[,c])=>s+c,0);
              return (
                <div key={t.id} style={{display:'flex',alignItems:'center',gap:8,background:done?'rgba(107,203,119,.18)':over?'rgba(255,100,100,.15)':'rgba(255,255,255,.06)',border:`1px solid ${done?'#6bcb77':over?'#ff6464':'rgba(255,255,255,.12)'}`,borderRadius:10,padding:'7px 10px',marginBottom:6}}>
                  <span style={{fontSize:22}}>{t.emoji}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:'white',fontWeight:700,fontSize:13,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                      <span className="fl">{t.name[0]}</span>{t.name.slice(1)} ×{t.required}
                    </div>
                    <div style={{color:done?'#6bcb77':over?'#ff8888':'#ff9f43',fontWeight:700,fontSize:12}}>
                      {done?`✅ ${placed}/${t.required} Done!`:over?`⚠️ ${placed}/${t.required} Too many!`:`${placed}/${t.required} – need ${need} more`}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Wrong toppings warning */}
            {Object.entries(pTops).some(([id])=>!orderedIds.has(id))&&(
              <div style={{color:'#ff8888',fontSize:12,fontWeight:700,marginTop:4}}>
                ⚠️ Some toppings aren't in the order!
              </div>
            )}
          </div>

          {/* Topping tray – all 12 */}
          <div className="glass" style={{padding:'10px 12px',animation:'trayUp .5s ease'}}>
            <div style={{color:'white',fontWeight:900,fontSize:14,marginBottom:8,textAlign:'center'}}>
              Choose Toppings <span style={{color:'#ffd700',fontSize:12}}>✨ = in order</span>
            </div>
            <div className="t-grid">
              {TOPPINGS.map(t=>{
                const isWanted=orderedIds.has(t.id);
                const req=order.toppings.find(x=>x.id===t.id);
                const placed=pTops[t.id]||0;
                const met=req&&placed>=req.required;
                return (
                  <button key={t.id} className={`ib${isWanted?' ib-want':''}`}
                    onClick={()=>addTop(t)}
                    onPointerDown={e=>drag(e,t,pizRef,addTop)}>
                    <span style={{fontSize:28,filter:'drop-shadow(0 2px 3px rgba(0,0,0,.4))',position:'relative'}}>
                      {t.emoji}
                      {met&&<span style={{position:'absolute',top:-6,right:-6,fontSize:12}}>✅</span>}
                    </span>
                    <PName name={t.name} small/>
                    {isWanted&&<span style={{color:'#ffd700',fontSize:10,fontWeight:900}}>×{req.required}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <button className="btn btn-r" onClick={()=>setPhase(P.BAKING)} style={{fontSize:18}}>Bake it! 🔥</button>
        </div>
      </div>
    );
  }

  // ── BAKING ────────────────────────────────────────────────────────────────
  function renderBaking(){
    const isIn=bkPhase==='in', isBk=bkPhase==='baking', isOut=bkPhase==='out'||bkPhase==='done';
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
        <h2 style={{color:'white',fontWeight:900,fontSize:24}}>Baking your pizza! 🔥</h2>
        <div className="baking-wrap" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
          <div style={{width:260,height:300,background:'linear-gradient(180deg,#2e2e2e 0%,#1a1a1a 100%)',borderRadius:28,border:'6px solid #555',position:'relative',overflow:'hidden',animation:isBk?'oGlow 1.4s ease-in-out infinite':'none',boxShadow:isBk?'0 0 35px #ff8c00,0 0 70px #ff4500':'0 6px 24px rgba(0,0,0,.5)',display:'flex',flexDirection:'column',alignItems:'center',padding:'14px 16px 0'}}>
            <div style={{width:'100%',height:26,background:'#3a3a3a',borderRadius:8,marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-around',padding:'0 20px'}}>
              {['#ff4444','#ffaa00','#44dd44'].map((c,i)=>(
                <div key={i} style={{width:12,height:12,borderRadius:'50%',background:isBk?c:'#555',boxShadow:isBk?`0 0 8px ${c}`:'none',transition:'all .3s'}}/>
              ))}
            </div>
            <div style={{width:84,height:84,borderRadius:'50%',background:isBk?'radial-gradient(circle,#ffd700 30%,#ff8c00 100%)':'radial-gradient(circle,#555,#333)',border:'5px solid #888',marginBottom:10,animation:isBk?'wFlicker .45s ease-in-out infinite':'none',boxShadow:isBk?'inset 0 0 15px #ffd700,0 0 20px #ff8c00':'none'}}/>
            <div style={{animation:isIn?'pIn .85s ease forwards':isOut?'pOut .85s ease forwards':'none',filter:isOut?'brightness(.88)':'none'}}>
              <div style={{width:130,height:130,borderRadius:'50%',background:isOut?'radial-gradient(circle,#c49010 55%,#7a4010 78%,#5a2e0a 100%)':'radial-gradient(circle,#f8d04a 55%,#e09030 78%,#c47020 100%)',boxShadow:'0 4px 16px rgba(0,0,0,.45)',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',animation:isBk?'haze .5s ease-in-out infinite':'none'}}>
                <div style={{position:'absolute',width:'75%',height:'75%',borderRadius:'50%',background:'radial-gradient(circle,#c0392b 50%,#922b21 100%)'}}/>
                {Object.entries(pTops).map(([id])=>{ const t=TOPPINGS.find(x=>x.id===id); return t?<div key={id} style={{position:'absolute',fontSize:12,filter:'drop-shadow(0 2px 2px rgba(0,0,0,.5))',zIndex:2}}>{t.emoji}</div>:null; })}
              </div>
            </div>
            {isBk&&(<div style={{position:'absolute',bottom:6,display:'flex',gap:6}}>{[1,2,3,4,5].map(i=>(<span key={i} style={{fontSize:24,display:'block',animation:`fl${((i-1)%3)+1} ${.28+i*.07}s ease-in-out infinite`,transformOrigin:'bottom center'}}>🔥</span>))}</div>)}
          </div>
          <div style={{width:260}}>
            <div style={{width:'100%',height:12,background:'rgba(255,255,255,.18)',borderRadius:6,overflow:'hidden'}}>
              <div style={{height:'100%',width:bkPct+'%',background:'linear-gradient(90deg,#ffd700,#ff8c00,#ff4500)',borderRadius:6,transition:'width .07s linear'}}/>
            </div>
            <p style={{color:'rgba(255,255,255,.6)',fontSize:13,textAlign:'center',marginTop:6}}>{bkPct<100?'Baking…':'Done! ✅'}</p>
          </div>
        </div>
      </div>
    );
  }

  // ── BUILD DRINK ───────────────────────────────────────────────────────────
  function renderDrink(){
    const recipe=order.drink;
    return (
      <div className="drink-wrap">
        {/* LEFT / PHONE-BOTTOM: blender */}
        <div className="drink-blender">
          <div ref={blnRef} style={{width:100,height:156,background:'rgba(255,255,255,.08)',border:'3px solid rgba(255,255,255,.25)',borderRadius:'12px 12px 26px 26px',position:'relative',overflow:'hidden',backdropFilter:'blur(6px)'}}>
            <div style={{position:'absolute',bottom:0,left:0,right:0,height:blFill+'%',background:recipe.color,borderRadius:'0 0 23px 23px',transition:'height .35s ease',opacity:.85}}/>
            <div style={{position:'absolute',top:4,left:0,right:0,display:'flex',flexWrap:'wrap',justifyContent:'center',gap:2,padding:4,zIndex:2}}>
              {blFList.map((id,i)=>{ const f=FRUITS.find(x=>x.id===id); return <span key={i} style={{fontSize:14}}>{f?.emoji}</span>; })}
            </div>
            {dropEm&&<div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',fontSize:28,animation:'fDrop .5s ease forwards',zIndex:10}}>{dropEm}</div>}
          </div>
          {/* Fruits in blender with minus badges */}
          <div style={{display:'flex',flexWrap:'wrap',gap:6,justifyContent:'center',maxWidth:160}}>
            {Object.entries(bFrts).map(([id,cnt])=>{
              const f=FRUITS.find(x=>x.id===id); if(!f) return null;
              const isWrong=!drinkIds.has(id);
              return (
                <div key={id} style={{background:isWrong?'rgba(255,80,80,.2)':'rgba(255,255,255,.1)',borderRadius:10,padding:'4px 8px',display:'flex',alignItems:'center',gap:4,border:`1px solid ${isWrong?'#ff6464':'rgba(255,255,255,.2)'}`}}>
                  <span style={{fontSize:16}}>{f.emoji}</span>
                  <span style={{color:'white',fontSize:12,fontWeight:700}}>×{cnt}</span>
                  <button onClick={()=>rmFrt(id)} style={{background:'#ff4444',border:'2px solid white',borderRadius:'50%',width:16,height:16,color:'white',fontSize:10,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',padding:0,lineHeight:1}}>−</button>
                </div>
              );
            })}
          </div>
          <div style={{color:'rgba(255,255,255,.55)',fontSize:11,textAlign:'center'}}>Tap to add · tap − to remove</div>
        </div>

        {/* RIGHT / PHONE-TOP: order + tray + button */}
        <div className="drink-side">
          <div className="glass" style={{padding:'12px 14px'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:34}}>{recipe.emoji}</span>
              <div>
                <div style={{color:'white',fontWeight:900,fontSize:17}}>{recipe.name}</div>
                {recipe.ingredients.map(ing=>{
                  const f=FRUITS.find(x=>x.id===ing.id), added=bFrts[ing.id]||0, done=added===ing.count, over=added>ing.count;
                  return (
                    <div key={ing.id} style={{color:done?'#6bcb77':over?'#ff8888':'#ffd700',fontWeight:700,fontSize:14}}>
                      {f?.emoji} <span className="fl">{f?.name[0]}</span>{f?.name.slice(1)} ×{ing.count} — {added}/{ing.count}
                      {done?' ✅':over?' ⚠️ Too many!':''}
                    </div>
                  );
                })}
                {Object.entries(bFrts).some(([id])=>!drinkIds.has(id))&&(
                  <div style={{color:'#ff8888',fontSize:12,fontWeight:700,marginTop:2}}>⚠️ Extra fruits added!</div>
                )}
              </div>
            </div>
          </div>

          {/* Fruit tray – all 8 */}
          <div className="glass" style={{padding:'10px 12px',animation:'trayUp .5s ease'}}>
            <div style={{color:'white',fontWeight:900,fontSize:14,marginBottom:8,textAlign:'center'}}>
              Choose Fruits <span style={{color:'#ffd700',fontSize:12}}>✨ = in recipe</span>
            </div>
            <div className="t-grid">
              {FRUITS.map(f=>{
                const isWanted=drinkIds.has(f.id);
                const ing=recipe.ingredients.find(x=>x.id===f.id);
                const added=bFrts[f.id]||0;
                const met=ing&&added>=ing.count;
                return (
                  <button key={f.id} className={`ib${isWanted?' ib-want':''}`}
                    onClick={()=>addFrt(f)}
                    onPointerDown={e=>drag(e,f,blnRef,addFrt)}>
                    <span style={{fontSize:28,filter:'drop-shadow(0 2px 3px rgba(0,0,0,.4))',position:'relative'}}>
                      {f.emoji}
                      {met&&<span style={{position:'absolute',top:-6,right:-6,fontSize:12}}>✅</span>}
                    </span>
                    <PName name={f.name} small/>
                    {isWanted&&<span style={{color:'#ffd700',fontSize:10,fontWeight:900}}>×{ing.count}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <button className="btn btn-p" onClick={()=>{ setPhase(P.BLENDING); doBlend(); }} style={{fontSize:18}}>Blend it! 🌀</button>
        </div>
      </div>
    );
  }

  // ── BLENDING ──────────────────────────────────────────────────────────────
  function renderBlending(){
    const recipe=order.drink, blending=blPhase==='blending', done=blPhase==='done';
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
        <h2 style={{color:'white',fontWeight:900,fontSize:24}}>{blending?'Blending! ⚡':done?'Ready! 🎉':''}</h2>
        <div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
          {blending&&<span style={{fontSize:26,zIndex:6}}>⚡</span>}
          {blending&&(
            <div style={{position:'absolute',top:'50%',left:'50%',width:0,height:0,zIndex:5}}>
              <div style={{animation:'orbit 1s linear infinite',display:'inline-block',fontSize:24}}>🌀</div>
            </div>
          )}
          <div style={{width:100,height:156,background:'rgba(255,255,255,.08)',border:'3px solid rgba(255,255,255,.25)',borderRadius:'12px 12px 26px 26px',position:'relative',overflow:'hidden',animation:blending?'bShake .18s ease-in-out infinite':'none'}}>
            <div style={{position:'absolute',bottom:0,left:0,right:0,height:Math.max(blFill,26)+'%',background:recipe.color,opacity:.85,animation:blending?'lChurn .3s ease-in-out infinite':'none',borderRadius:blending?undefined:'0 0 23px 23px'}}/>
          </div>
        </div>
        {done&&(
          <div style={{animation:'dSlide .5s ease',display:'flex',alignItems:'center',gap:14,background:'rgba(255,255,255,.1)',borderRadius:18,padding:'12px 20px',border:'2px solid rgba(255,255,255,.2)'}}>
            <div style={{position:'relative',width:54,height:74}}>
              <div style={{width:54,height:68,background:recipe.color,borderRadius:'8px 8px 16px 16px',border:'3px solid rgba(255,255,255,.3)',overflow:'hidden',position:'relative'}}>
                <div style={{position:'absolute',top:5,left:5,width:9,height:28,background:'rgba(255,255,255,.35)',borderRadius:5,transform:'rotate(-15deg)'}}/>
              </div>
              <div style={{position:'absolute',top:-9,right:11,width:4,height:40,background:'rgba(255,255,255,.7)',borderRadius:3}}/>
            </div>
            <div style={{color:'white',fontWeight:900,fontSize:18}}>{recipe.name} ready! 🎊</div>
          </div>
        )}
        {done&&<button className="btn btn-g" onClick={serve} style={{fontSize:18,maxWidth:320}}>Serve it! 🍽️</button>}
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  function renderResult(){
    if(!result) return null;
    const perfect=result.total>=4;
    const parts=order.toppings.map(t=>pTops[t.id]||0);
    const sum=parts.reduce((a,b)=>a+b,0);
    return (
      <div className="narrow" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
        {perfect&&(
          <>
            <div style={{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:320,height:320,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,215,0,.35),transparent)',animation:'radPulse 1.5s ease-in-out infinite',pointerEvents:'none',zIndex:5}}/>
            <div style={{animation:'banner .65s ease both',fontSize:26,fontWeight:900,color:'#ffd700',padding:'12px 22px',background:'rgba(0,0,0,.55)',borderRadius:18,border:'3px solid #ffd700',boxShadow:'0 0 32px rgba(255,215,0,.55)',textAlign:'center',zIndex:10,position:'relative'}}>
              🕺 AMAZING! 🕺
            </div>
          </>
        )}
        <div style={{fontSize:80,animation:perfect?'dance .55s ease-in-out infinite':'bob 3s ease-in-out infinite'}}>
          {order.customer.emoji}
        </div>
        <div style={{display:'flex',gap:12,justifyContent:'center'}}>
          {[1,2,3,4].map(i=>(
            <div key={i} style={{fontSize:38,opacity:result.total>=i?1:.2,animation:result.total>=i?`sPop .4s ${i*.15}s ease both`:'none'}}>⭐</div>
          ))}
        </div>
        <div className="glass" style={{padding:'14px 16px',width:'100%'}}>
          <div style={{color:'#ffd700',fontWeight:900,fontSize:16,marginBottom:8,textAlign:'center'}}>🧮 Maths time!</div>
          <div style={{color:'white',fontWeight:900,fontSize:20,textAlign:'center',marginBottom:6}}>
            {parts.join(' + ')} = {sum} topping{sum!==1?'s':''}! 🍕
          </div>
          <div style={{color:result.db?'#6bcb77':'#ff6b6b',fontWeight:700,fontSize:15,textAlign:'center'}}>
            {result.db?'🥤 Perfect drink! +1 ⭐':"🥤 Drink wasn't quite right"}
          </div>
        </div>
        <button className="btn btn-r" onClick={newRound} style={{fontSize:18}}>Next Customer! 👋</button>
      </div>
    );
  }

  return (
    <div className="pg" style={{minHeight:'100dvh',background:'radial-gradient(ellipse at 40% 30%,#1a0a2e 0%,#0d1b4b 100%)',display:'flex',flexDirection:'column',alignItems:'center',padding:'10px 14px 24px',userSelect:'none',WebkitUserSelect:'none'}}>
      <style>{CSS}</style>
      {confetti.length>0&&(
        <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:50}}>
          {confetti.map(c=>(
            <div key={c.id} style={{position:'absolute',left:c.left+'%',top:'-60px',fontSize:c.size,animation:`fall ${c.dur}ms ${c.delay}ms linear forwards`}}>{c.emoji}</div>
          ))}
        </div>
      )}
      <header style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div className="glass" style={{padding:'8px 16px'}}><span style={{color:'white',fontWeight:900,fontSize:18}}>🍕 Pizza Palace</span></div>
        <div className="glass" style={{padding:'8px 16px'}}><span style={{color:'#ffd700',fontWeight:900,fontSize:18}}>⭐ {score}</span></div>
      </header>
      <main style={{width:'100%',flex:1,overflow:'auto'}}>
        {phase===P.ORDER    && renderOrder()}
        {phase===P.BUILD    && renderBuild()}
        {phase===P.BAKING   && renderBaking()}
        {phase===P.DRINK    && renderDrink()}
        {phase===P.BLENDING && renderBlending()}
        {phase===P.RESULT   && renderResult()}
      </main>
    </div>
  );
}
