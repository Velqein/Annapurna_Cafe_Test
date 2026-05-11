import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Poppins:wght@300;400;500;600;700&family=Caveat:wght@600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::-webkit-scrollbar{display:none;}
    body{background:#c8c4bc;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Poppins',sans-serif;}
  `}</style>
);

/* ─── Colour tokens ─────────────────────────────────────────────────────────── */
const C = {
  cream:   "#F7F5F0",
  blue:    "#1F4591",
  yellow:  "#F2CF4A",
  sage:    "#A8D5A2",
  green:   "#7FB36B",
  orange:  "#E85D3F",
  card:    "#FFFFFF",
};

/* ─── SVG Illustrations ─────────────────────────────────────────────────────── */

const LeafPair = ({size=32})=>(
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 28 C16 20 8 14 6 8 C10 6 16 10 16 16" stroke={C.blue} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    <path d="M16 28 C16 20 24 14 26 8 C22 6 16 10 16 16" stroke={C.blue} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    <path d="M16 16 L16 28" stroke={C.blue} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const SmallLeaf = ({flip=false})=>(
  <svg width="22" height="28" viewBox="0 0 22 28" fill="none" style={{transform:flip?"scaleX(-1)":"none"}}>
    <path d="M11 26 C11 18 4 12 2 5 C7 2 13 8 11 14" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M11 14 L11 26" stroke={C.blue} strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M11 20 C14 18 18 15 20 10" stroke={C.blue} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
);

const ChilliDeco = ()=>(
  <svg width="70" height="60" viewBox="0 0 70 60" fill="none">
    <path d="M20 10 C18 6 20 1 24 0 C25 4 23 8 20 10Z" stroke={C.blue} strokeWidth="1.5" fill="none"/>
    <path d="M20 10 C16 18 15 28 17 38 C19 48 24 56 26 52 C28 48 25 38 23 28 C21 18 20 12 20 10Z" stroke={C.blue} strokeWidth="1.8" fill="none"/>
    <path d="M19 24 C16 24 14 27 15 30" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M45 6 C43 2 45 -2 49 -1 C50 3 48 7 45 6Z" stroke={C.blue} strokeWidth="1.5" fill="none"/>
    <path d="M45 6 C43 14 44 24 48 34 C52 44 56 52 54 55 C52 58 48 52 44 42 C40 32 40 22 42 14 C43 10 44 8 45 6Z" stroke={C.blue} strokeWidth="1.8" fill="none"/>
    <path d="M47 22 C50 22 52 25 51 28" stroke={C.blue} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M26 8 C33 5 38 8 43 10" stroke={C.blue} strokeWidth="1.1" strokeDasharray="3 2" strokeLinecap="round" fill="none"/>
  </svg>
);

const HerbDeco = ()=>(
  <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
    <path d="M30 75 C28 55 25 40 28 25 C30 10 30 5 30 2" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    {[[18,55,8,42,5,35],[42,50,50,38,53,30],[15,38,5,28,3,18],[45,35,54,22,56,12]].map(([x1,y1,x2,y2,x3,y3],i)=>(
      <path key={i} d={`M30 ${y1} C${x1} ${y1-5} ${x2} ${y2} ${x3} ${y3}`} stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    ))}
    <circle cx="5" cy="35" r="2.5" stroke={C.blue} strokeWidth="1.2" fill="none"/>
    <circle cx="53" cy="30" r="2" stroke={C.blue} strokeWidth="1.2" fill="none"/>
  </svg>
);

const Dots = ({n=5,color=C.blue,opacity=0.4})=>(
  <svg width={n*14} height="14" viewBox={`0 0 ${n*14} 14`} fill="none">
    {Array.from({length:n}).map((_,i)=>(
      <circle key={i} cx={i*14+7} cy="7" r={i%2===0?3:2} fill={color} opacity={opacity+(i%3)*0.1}/>
    ))}
  </svg>
);

/* ─── Food image placeholders (SVG illustrated bowls) ───────────────────────── */
const FoodImg = ({type="noodles",size=80})=>{
  const imgs={
    noodles:(
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="56" rx="30" ry="10" fill="#E8956D" opacity="0.3"/>
        <path d="M10 42 C10 42 14 68 40 68 C66 68 70 42 70 42Z" fill="#D4742A"/>
        <ellipse cx="40" cy="42" rx="30" ry="10" fill="#E8956D"/>
        <path d="M15 40 C20 36 25 40 30 37 C35 34 40 38 45 35 C50 32 55 36 60 33" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M18 43 C23 39 28 43 33 40 C38 37 43 41 48 38 C53 35 58 38 65 36" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <circle cx="28" cy="38" r="5" fill="#C0392B"/>
        <circle cx="52" cy="36" r="4" fill="#27AE60"/>
        <circle cx="40" cy="34" r="3.5" fill="#F39C12"/>
        <path d="M32 22 L36 38" stroke="#8B4513" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M36 20 L39 38" stroke="#8B4513" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    rice:(
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="58" rx="28" ry="9" fill="#B8860B" opacity="0.3"/>
        <path d="M12 44 C12 44 16 66 40 66 C64 66 68 44 68 44Z" fill="#DAA520"/>
        <ellipse cx="40" cy="44" rx="28" ry="9" fill="#F0C040"/>
        {Array.from({length:20}).map((_,i)=>(
          <ellipse key={i} cx={20+Math.sin(i*1.8)*16} cy={38+Math.cos(i*2.2)*5} rx="2" ry="1.2" fill="#fff" opacity="0.7" transform={`rotate(${i*18} ${20+Math.sin(i*1.8)*16} ${38+Math.cos(i*2.2)*5})`}/>
        ))}
        <circle cx="30" cy="40" r="5" fill="#E74C3C"/>
        <circle cx="50" cy="38" r="4" fill="#2ECC71"/>
        <circle cx="40" cy="36" r="3" fill="#9B59B6"/>
      </svg>
    ),
    momo:(
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="60" rx="26" ry="8" fill="#BDC3C7" opacity="0.4"/>
        {[[24,40],[34,34],[44,33],[54,40],[28,50],[40,52],[52,49]].map(([cx,cy],i)=>(
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="9" ry="7" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="1"/>
            <path d={`M${cx-4} ${cy} Q${cx} ${cy-4} ${cx+4} ${cy}`} stroke="#BDC3C7" strokeWidth="0.8" fill="none"/>
          </g>
        ))}
        <circle cx="40" cy="68" r="3" fill="#E74C3C" opacity="0.8"/>
      </svg>
    ),
    side:(
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <rect x="15" y="35" width="50" height="30" rx="8" fill="#F39C12"/>
        <rect x="15" y="32" width="50" height="12" rx="6" fill="#E67E22"/>
        <path d="M20 38 C25 34 30 38 35 35 C40 32 45 36 50 33 C55 30 60 34 65 32" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <circle cx="30" cy="50" r="4" fill="#E74C3C"/>
        <circle cx="42" cy="52" r="3.5" fill="#27AE60"/>
        <circle cx="54" cy="49" r="4" fill="#F1C40F"/>
        <rect x="36" y="18" width="8" height="18" rx="2" fill="#8B4513"/>
        <rect x="44" y="20" width="7" height="16" rx="2" fill="#8B4513"/>
      </svg>
    ),
  };
  return imgs[type]||imgs.noodles;
};

/* ─── Hero food illustration ─────────────────────────────────────────────────── */
const HeroFood = ()=>(
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
    {/* shadow */}
    <ellipse cx="75" cy="130" rx="48" ry="12" fill="#1F4591" opacity="0.08"/>
    {/* bowl body */}
    <path d="M22 72 C22 72 28 118 75 118 C122 118 128 72 128 72Z" fill="url(#bowlGrad)"/>
    <defs>
      <radialGradient id="bowlGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#D4742A"/>
        <stop offset="100%" stopColor="#A0522D"/>
      </radialGradient>
      <radialGradient id="topGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#E8956D"/>
        <stop offset="100%" stopColor="#C06030"/>
      </radialGradient>
    </defs>
    {/* bowl rim */}
    <ellipse cx="75" cy="72" rx="53" ry="16" fill="url(#topGrad)"/>
    {/* noodles */}
    <path d="M30 68 C38 62 46 68 54 64 C62 60 70 66 78 62 C86 58 94 64 102 60 C110 56 118 61 125 58" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
    <path d="M32 74 C40 68 48 74 56 70 C64 66 72 72 80 68 C88 64 96 69 104 65 C112 61 120 66 127 63" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
    {/* toppings */}
    <circle cx="52" cy="64" r="8" fill="#C0392B"/>
    <circle cx="52" cy="64" r="5" fill="#E74C3C"/>
    <circle cx="98" cy="60" r="7" fill="#27AE60"/>
    <circle cx="98" cy="60" r="4.5" fill="#2ECC71"/>
    <ellipse cx="75" cy="58" rx="9" ry="6" fill="#F39C12"/>
    <ellipse cx="75" cy="58" rx="6" ry="4" fill="#F1C40F"/>
    {/* chopsticks */}
    <path d="M56 28 L68 70" stroke="#8B4513" strokeWidth="3" strokeLinecap="round"/>
    <path d="M64 24 L74 68" stroke="#8B4513" strokeWidth="3" strokeLinecap="round"/>
    {/* steam */}
    <path d="M50 52 C48 44 50 36 48 28" stroke="#1F4591" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
    <path d="M75 48 C73 40 75 32 73 24" stroke="#1F4591" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
    <path d="M100 52 C98 44 100 36 98 28" stroke="#1F4591" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
  </svg>
);

/* ─── Category icon SVGs ────────────────────────────────────────────────────── */
const NoodleIcon=({active})=>(
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M4 14 C6 10 10 12 12 10 C14 8 16 10 18 8 C20 6 22 9 24 8" stroke={active?"#fff":C.blue} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M4 18 C7 14 11 16 14 14 C17 12 20 14 24 12" stroke={active?"#fff":C.blue} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M6 22 C8 20 12 21 16 20 C20 19 22 21 24 20" stroke={active?"#fff":C.blue} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const RiceIcon=({active})=>(
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M5 18 C5 18 7 26 14 26 C21 26 23 18 23 18Z" stroke={active?"#fff":C.blue} strokeWidth="1.8" fill="none"/>
    <ellipse cx="14" cy="18" rx="9" ry="4" stroke={active?"#fff":C.blue} strokeWidth="1.8" fill="none"/>
    {[10,14,18].map((cx,i)=><circle key={i} cx={cx} cy={15} r="1.2" fill={active?"#fff":C.blue}/>)}
  </svg>
);
const MomoIcon=({active})=>(
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    {[[8,14],[14,10],[20,14],[11,20],[17,20]].map(([cx,cy],i)=>(
      <ellipse key={i} cx={cx} cy={cy} rx="4.5" ry="3.5" stroke={active?"#fff":C.blue} strokeWidth="1.5" fill="none"/>
    ))}
  </svg>
);
const SideIcon=({active})=>(
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="5" y="13" width="18" height="12" rx="3" stroke={active?"#fff":C.blue} strokeWidth="1.8" fill="none"/>
    <rect x="5" y="11" width="18" height="5" rx="2.5" stroke={active?"#fff":C.blue} strokeWidth="1.8" fill="none"/>
    <path d="M10 8 L10 11" stroke={active?"#fff":C.blue} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 7 L14 11" stroke={active?"#fff":C.blue} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 8 L18 11" stroke={active?"#fff":C.blue} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GameIcon=()=>(
  <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
    <rect x="1" y="3" width="22" height="12" rx="6" stroke="white" strokeWidth="1.8" fill="none"/>
    <path d="M6 9 H10 M8 7 V11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="15" cy="8" r="1.5" fill="white"/>
    <circle cx="18" cy="10" r="1.5" fill="white"/>
  </svg>
);

const BackArrow=()=>(
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M11 4 L6 9 L11 14" stroke={C.blue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const categories=[
  {id:"noodles",label:"Noodles",Icon:NoodleIcon},
  {id:"rice",label:"Rice & Pulaw",Icon:RiceIcon},
  {id:"momos",label:"Momos",Icon:MomoIcon},
  {id:"sides",label:"Chinese Sides",Icon:SideIcon},
];

const menuData={
  noodles:{
    title:"NOODLES",
    items:[
      {name:"Veg Hakka Noodles",price:149,type:"noodles"},
      {name:"Paneer Chilli Noodles",price:179,type:"noodles"},
      {name:"Schezwan Noodles",price:169,type:"noodles"},
      {name:"Triple Schezwan",price:219,type:"noodles"},
    ],
  },
  rice:{
    title:"RICE & PULAW",
    items:[
      {name:"Veg Fried Rice",price:149,type:"rice"},
      {name:"Paneer Fried Rice",price:179,type:"rice"},
      {name:"Schezwan Fried Rice",price:169,type:"rice"},
      {name:"Burnt Garlic Rice",price:189,type:"rice"},
    ],
  },
  momos:{
    title:"MOMOS",
    items:[
      {name:"Veg Steam Momos",price:129,type:"momo"},
      {name:"Paneer Fried Momos",price:159,type:"momo"},
      {name:"Schezwan Momos",price:149,type:"momo"},
      {name:"Tandoori Momos",price:169,type:"momo"},
    ],
  },
  sides:{
    title:"CHINESE SIDES",
    items:[
      {name:"Veg Manchurian",price:129,type:"side"},
      {name:"Chilli Paneer",price:159,type:"side"},
      {name:"Spring Rolls",price:119,type:"side"},
      {name:"Veg Dimsums",price:149,type:"side"},
    ],
  },
};

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

const FoodCard=({item,delay=0})=>{
  const [added,setAdded]=useState(false);
  return(
    <motion.div
      initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay,duration:0.5}}
      style={{
        minWidth:138,maxWidth:138,background:C.card,borderRadius:20,
        overflow:"hidden",boxShadow:"0 4px 18px rgba(31,69,145,0.09)",
        flexShrink:0,cursor:"pointer",
      }}
      whileHover={{y:-4,boxShadow:"0 10px 28px rgba(31,69,145,0.16)"}}
    >
      {/* image area */}
      <div style={{
        background:`linear-gradient(135deg,#FFF8F0,#FFF0E8)`,
        height:110,display:"flex",alignItems:"center",justifyContent:"center",
        position:"relative",
      }}>
        <div style={{
          position:"absolute",top:6,right:6,
          background:C.yellow,borderRadius:8,padding:"2px 7px",
          fontSize:9,fontWeight:700,color:C.blue,fontFamily:"'Poppins',sans-serif",letterSpacing:"0.05em"
        }}>BESTSELLER</div>
        <FoodImg type={item.type} size={80}/>
      </div>
      {/* info */}
      <div style={{padding:"10px 12px 12px"}}>
        <div style={{fontSize:11.5,fontWeight:600,color:C.blue,fontFamily:"'Poppins',sans-serif",lineHeight:1.3,marginBottom:6,minHeight:30}}>
          {item.name}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:13,fontWeight:700,color:C.green,fontFamily:"'Poppins',sans-serif"}}>₹{item.price}</span>
          <motion.button
            whileTap={{scale:0.88}}
            onClick={()=>setAdded(v=>!v)}
            style={{
              width:26,height:26,borderRadius:13,border:"none",cursor:"pointer",
              background:added?C.green:C.blue,
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"background 0.2s",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              {added
                ?<path d="M2 6 L5 9 L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                :<><path d="M6 2 V10" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M2 6 H10" stroke="white" strokeWidth="2" strokeLinecap="round"/></>
              }
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const MenuSection=({data,delay=0})=>(
  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay}} style={{marginBottom:24}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,paddingRight:20}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontFamily:"'Bungee',cursive",fontSize:18,color:C.blue,letterSpacing:"0.04em"}}>{data.title}</span>
        <div style={{width:28,height:2.5,background:C.yellow,borderRadius:2}}/>
      </div>
      <span style={{fontFamily:"'Poppins',sans-serif",fontSize:11.5,fontWeight:600,color:C.green,textDecoration:"underline",cursor:"pointer"}}>View All</span>
    </div>
    <div style={{display:"flex",gap:12,overflowX:"auto",paddingLeft:20,paddingRight:20,paddingBottom:6}}>
      {data.items.map((item,i)=><FoodCard key={i} item={item} delay={delay+i*0.07}/>)}
    </div>
  </motion.div>
);

/* ─── Main App ───────────────────────────────────────────────────────────────── */
export default function AnnapurnaMenu(){
  const [activeCat,setActiveCat]=useState("noodles");
  const [sliderDot,setSliderDot]=useState(1);
  const scrollRef=useRef(null);

  const fadeUp=(delay=0)=>({
    initial:{opacity:0,y:22},
    animate:{opacity:1,y:0},
    transition:{duration:0.6,delay,ease:[0.22,1,0.36,1]},
  });

  return(
    <>
      <Fonts/>
      <div style={{
        minHeight:"100vh",background:"#c8c4bc",
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:"32px 16px",
      }}>

        {/* ── iPhone 17 Pro Frame ── */}
        <div style={{
          position:"relative",width:393,height:852,borderRadius:54,background:"#111",
          boxShadow:"0 0 0 1.5px #555,0 0 0 3px #2a2a2a,0 30px 80px rgba(0,0,0,0.55),inset 0 0 0 1px #444",
          flexShrink:0,
        }}>
          {/* side buttons */}
          <div style={{position:"absolute",left:-3,top:150,width:3,height:36,background:"#333",borderRadius:"2px 0 0 2px"}}/>
          <div style={{position:"absolute",left:-3,top:200,width:3,height:64,background:"#333",borderRadius:"2px 0 0 2px"}}/>
          <div style={{position:"absolute",left:-3,top:278,width:3,height:64,background:"#333",borderRadius:"2px 0 0 2px"}}/>
          <div style={{position:"absolute",right:-3,top:180,width:3,height:90,background:"#333",borderRadius:"0 2px 2px 0"}}/>

          {/* ── Screen ── */}
          <div style={{
            position:"absolute",inset:6,borderRadius:48,overflow:"hidden",
            background:C.cream,display:"flex",flexDirection:"column",
          }}>

            {/* Dynamic Island */}
            <div style={{
              position:"absolute",top:14,left:"50%",transform:"translateX(-50%)",
              width:120,height:34,background:"#000",borderRadius:20,zIndex:50,
            }}/>

            {/* ── Background decorations (non-scrolling) ── */}
            <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1}}>
              {/* green blob left */}
              <motion.div
                style={{position:"absolute",top:180,left:-70,width:180,height:210,opacity:0.55}}
                animate={{y:[0,-12,0],rotate:[0,-2,1,0]}}
                transition={{duration:8,repeat:Infinity,ease:"easeInOut"}}
              >
                <svg viewBox="0 0 180 210" fill="none" style={{width:"100%",height:"100%"}}>
                  <path d="M90 10 C130 5 165 35 172 75 C179 115 160 165 130 185 C100 205 55 200 28 175 C1 150 -5 105 8 70 C21 35 50 15 90 10Z" fill={C.sage}/>
                </svg>
              </motion.div>
              {/* yellow blob top right */}
              <motion.div
                style={{position:"absolute",top:-30,right:-40,width:160,height:160,opacity:0.7}}
                animate={{y:[0,-8,0],rotate:[0,3,-1,0]}}
                transition={{duration:7,repeat:Infinity,ease:"easeInOut",delay:1}}
              >
                <svg viewBox="0 0 160 160" fill="none" style={{width:"100%",height:"100%"}}>
                  <path d="M80 8 C115 2 148 28 155 62 C162 96 145 138 118 152 C91 166 50 158 28 135 C6 112 2 72 16 45 C30 18 45 14 80 8Z" fill={C.yellow}/>
                </svg>
              </motion.div>
              {/* particles */}
              <div style={{position:"absolute",top:70,right:50}}><Dots n={4} opacity={0.3}/></div>
              {/* bottom herb */}
              <motion.div style={{position:"absolute",bottom:70,left:10}} animate={{y:[0,-6,0],rotate:[0,1.5,-1,0]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}>
                <HerbDeco/>
              </motion.div>
              {/* bottom chilli */}
              <motion.div style={{position:"absolute",bottom:80,right:12}} animate={{y:[0,-5,0],rotate:[0,-2,1,0]}} transition={{duration:5.5,repeat:Infinity,ease:"easeInOut",delay:1.5}}>
                <ChilliDeco/>
              </motion.div>
            </div>

            {/* ── Status Bar ── */}
            <div style={{
              position:"relative",zIndex:10,
              height:54,display:"flex",alignItems:"flex-end",justifyContent:"space-between",
              padding:"0 24px 8px",
              fontSize:12,fontWeight:600,color:C.blue,fontFamily:"'Poppins',sans-serif",flexShrink:0,
            }}>
              <span>9:41</span>
              <span style={{display:"flex",gap:5,alignItems:"center"}}>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><rect x="0" y="3" width="3" height="8" rx="1" fill={C.blue}/><rect x="4" y="2" width="3" height="9" rx="1" fill={C.blue}/><rect x="8" y="1" width="3" height="10" rx="1" fill={C.blue}/><rect x="12" y="0" width="3" height="11" rx="1" fill={C.blue} opacity="0.3"/></svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2C10.8 2 13.3 3.2 15 5.2L13.6 6.6C12.3 5 10.3 4 8 4C5.7 4 3.7 5 2.4 6.6L1 5.2C2.7 3.2 5.2 2 8 2Z" fill={C.blue}/><path d="M8 6C9.7 6 11.2 6.7 12.3 7.8L10.9 9.2C10.1 8.4 9.1 8 8 8C6.9 8 5.9 8.4 5.1 9.2L3.7 7.8C4.8 6.7 6.3 6 8 6Z" fill={C.blue}/><circle cx="8" cy="11" r="1.5" fill={C.blue}/></svg>
              </span>
            </div>

            {/* ── Scrollable content ── */}
            <div ref={scrollRef} style={{flex:1,overflowY:"auto",position:"relative",zIndex:5,scrollbarWidth:"none"}}>

              {/* ── HEADER ── */}
              <div style={{padding:"0 20px 14px",position:"relative"}}>
                {/* back button */}
                <motion.div {...fadeUp(0.1)} style={{
                  position:"absolute",top:0,left:20,
                  width:38,height:38,borderRadius:19,
                  background:"white",display:"flex",alignItems:"center",justifyContent:"center",
                  boxShadow:"0 2px 10px rgba(31,69,145,0.13)",cursor:"pointer",
                }}
                  whileTap={{scale:0.92}}
                >
                  <BackArrow/>
                </motion.div>

                {/* Title */}
                <motion.div {...fadeUp(0.15)} style={{textAlign:"center",paddingTop:2}}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:8}}>
                    <SmallLeaf/>
                    <div>
                      <div style={{fontFamily:"'Bungee',cursive",fontSize:20,color:C.blue,letterSpacing:"0.06em",lineHeight:1}}>ANNAPURNA</div>
                      <div style={{fontFamily:"'Poppins',sans-serif",fontSize:10,fontWeight:600,color:C.blue,opacity:0.6,letterSpacing:"0.3em",marginTop:1}}>MENU</div>
                    </div>
                    <SmallLeaf flip/>
                  </div>
                </motion.div>
              </div>

              {/* ── HERO BANNER ── */}
              <motion.div {...fadeUp(0.25)} style={{margin:"0 20px 16px"}}>
                <div style={{
                  background:`linear-gradient(135deg, #FFF8EE 0%, #FFF3DC 100%)`,
                  borderRadius:28,padding:"18px 16px 18px 22px",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                  position:"relative",overflow:"hidden",
                  boxShadow:"0 6px 24px rgba(242,207,74,0.22)",
                  minHeight:150,
                }}>
                  {/* yellow blob behind food */}
                  <div style={{
                    position:"absolute",right:-20,top:-20,
                    width:160,height:160,
                    background:C.yellow,
                    borderRadius:"60% 40% 55% 45%",
                    opacity:0.5,
                  }}/>
                  {/* dots decoration */}
                  <div style={{position:"absolute",top:12,right:90,opacity:0.4}}>
                    <Dots n={3} color={C.blue} opacity={0.3}/>
                  </div>

                  {/* Left text */}
                  <div style={{zIndex:2,flex:1}}>
                    <div style={{
                      background:C.blue,borderRadius:8,padding:"3px 10px",display:"inline-block",
                      marginBottom:7,
                    }}>
                      <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:700,color:"white",letterSpacing:"0.08em"}}>TODAY'S BEST SELLER</span>
                    </div>
                    <div style={{fontFamily:"'Caveat',cursive",fontSize:22,fontWeight:700,color:C.green,lineHeight:1.1,marginBottom:12}}>
                      Schezwan<br/>Noodles
                    </div>
                    <motion.button
                      whileTap={{scale:0.94}}
                      whileHover={{scale:1.04}}
                      style={{
                        background:C.yellow,border:"none",cursor:"pointer",
                        borderRadius:22,padding:"8px 18px",
                        fontFamily:"'Poppins',sans-serif",fontSize:11,fontWeight:700,
                        color:C.blue,letterSpacing:"0.04em",
                        boxShadow:"0 3px 12px rgba(242,207,74,0.4)",
                      }}
                    >ORDER NOW</motion.button>
                  </div>

                  {/* Right food image */}
                  <motion.div
                    style={{zIndex:2,marginRight:-4}}
                    animate={{y:[0,-6,0]}}
                    transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}
                  >
                    <HeroFood/>
                  </motion.div>
                </div>

                {/* Slider dots */}
                <div style={{display:"flex",justifyContent:"center",gap:7,marginTop:10}}>
                  {[0,1,2].map(i=>(
                    <motion.div
                      key={i} onClick={()=>setSliderDot(i)}
                      animate={{width:sliderDot===i?22:8,background:sliderDot===i?C.blue:C.sage}}
                      transition={{duration:0.3}}
                      style={{height:8,borderRadius:4,cursor:"pointer"}}
                    />
                  ))}
                </div>
              </motion.div>

              {/* ── CATEGORY SECTION ── */}
              <motion.div {...fadeUp(0.35)} style={{padding:"0 20px",marginBottom:18}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <span style={{fontFamily:"'Bungee',cursive",fontSize:15,color:C.blue,letterSpacing:"0.04em"}}>CHOOSE CATEGORY</span>
                  <div style={{flex:1,height:1.5,background:C.green,opacity:0.35,borderRadius:2}}/>
                </div>
                <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4}}>
                  {categories.map(({id,label,Icon},i)=>{
                    const isActive=activeCat===id;
                    return(
                      <motion.div
                        key={id}
                        initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.38+i*0.07}}
                        whileTap={{scale:0.93}}
                        onClick={()=>setActiveCat(id)}
                        style={{
                          display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                          minWidth:76,padding:"10px 10px",borderRadius:18,
                          background:isActive?C.green:"white",
                          boxShadow:isActive?"0 4px 16px rgba(168,213,162,0.45)":"0 2px 10px rgba(31,69,145,0.08)",
                          cursor:"pointer",flexShrink:0,
                          border:isActive?"none":`1.5px solid rgba(31,69,145,0.1)`,
                          transition:"all 0.2s",
                        }}
                      >
                        <div style={{
                          width:42,height:42,borderRadius:14,
                          background:isActive?"rgba(255,255,255,0.25)":"rgba(31,69,145,0.06)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                        }}>
                          <Icon active={isActive}/>
                        </div>
                        <span style={{
                          fontFamily:"'Poppins',sans-serif",fontSize:9.5,fontWeight:600,
                          color:isActive?"white":C.blue,textAlign:"center",lineHeight:1.2,
                        }}>{label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── MENU SECTIONS ── */}
              <div style={{paddingLeft:0}}>
                {[activeCat,...Object.keys(menuData).filter(k=>k!==activeCat)].map((key,si)=>(
                  <MenuSection key={key} data={menuData[key]} delay={0.4+si*0.08}/>
                ))}
              </div>

              {/* ── PLAY GAME CTA ── */}
              <motion.div {...fadeUp(0.7)} style={{padding:"8px 20px 110px",display:"flex",justifyContent:"center"}}>
                <motion.button
                  whileTap={{scale:0.96}}
                  whileHover={{scale:1.03,boxShadow:"0 14px 36px rgba(31,69,145,0.38)"}}
                  style={{
                    display:"flex",alignItems:"center",gap:14,
                    background:C.blue,border:"none",cursor:"pointer",
                    borderRadius:50,padding:"16px 36px",
                    boxShadow:"0 8px 24px rgba(31,69,145,0.28)",
                    width:"100%",maxWidth:280,justifyContent:"center",
                  }}
                >
                  <GameIcon/>
                  <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:15,color:"white",letterSpacing:"0.06em"}}>
                    PLAY GAME
                  </span>
                </motion.button>
              </motion.div>

            </div>

            {/* ── Bottom Nav Bar ── */}
            <div style={{
              position:"absolute",bottom:0,left:0,right:0,
              height:80,background:"white",zIndex:20,
              borderTop:"1px solid rgba(31,69,145,0.07)",
              display:"flex",alignItems:"center",justifyContent:"space-around",
              padding:"0 10px 10px",
              boxShadow:"0 -4px 20px rgba(31,69,145,0.08)",
            }}>
              {[
                {label:"Home",icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 10 L11 3 L19 10 V19 H14 V14 H8 V19 H3Z" stroke={C.blue} strokeWidth="1.8" fill="none" strokeLinejoin="round"/></svg>},
                {label:"Search",icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="6.5" stroke={C.blue} strokeWidth="1.8"/><path d="M15 15 L19 19" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round"/></svg>},
                {label:"Cart",active:true,icon:(
                  <div style={{width:44,height:44,borderRadius:22,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",marginTop:-16,boxShadow:`0 4px 16px rgba(31,69,145,0.3)`}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 3 H5 L7 15 H17 L19 7 H7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="18.5" r="1.5" fill="white"/><circle cx="16" cy="18.5" r="1.5" fill="white"/></svg>
                  </div>
                )},
                {label:"Offers",icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 3 L7 7 M15 15 L19 19 M7 7 L12 5 L17 7 L19 12 L17 17 L12 19 L7 17 L5 12Z" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="2" stroke={C.blue} strokeWidth="1.5"/></svg>},
                {label:"Profile",icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke={C.blue} strokeWidth="1.8"/><path d="M3 19 C3 15.7 6.6 13 11 13 C15.4 13 19 15.7 19 19" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round"/></svg>},
              ].map(({label,icon,active},i)=>(
                <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer"}}>
                  {icon}
                  {!active&&<span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:500,color:C.blue,opacity:0.6}}>{label}</span>}
                </div>
              ))}
            </div>

            {/* Home indicator */}
            <div style={{position:"absolute",bottom:6,left:"50%",transform:"translateX(-50%)",width:120,height:4,background:C.blue,opacity:0.2,borderRadius:2,zIndex:30}}/>
          </div>
        </div>
      </div>
    </>
  );
}
