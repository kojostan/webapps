'use client';
import {useEffect,useState} from 'react';
import {useTheme} from 'next-themes';
import {Check,Palette} from 'lucide-react';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '../components/ui/dialog';
const themes=[
 {id:'light',name:'Light',description:'Clean white and soft gray',colors:['#ffffff','#edf0f4','#374151']},
 {id:'dark',name:'Dark',description:'Charcoal with bright, clear text',colors:['#17191e','#292d35','#e5e7eb']},
 {id:'ocean',name:'Ocean',description:'Deep navy, blue, and soft cyan',colors:['#0b1c2c','#14374c','#91deef']},
 {id:'sage',name:'Sage',description:'Muted green, cream, and warm neutrals',colors:['#f6f5ec','#dce6d7','#49634b']},
 {id:'royal',name:'Royal',description:'Rich plum, burgundy, and quiet gold',colors:['#261821','#543043','#e4c38b']}
];
export default function Appearance(){
 const [open,setOpen]=useState(false),[mounted,setMounted]=useState(false);
 const {theme,setTheme}=useTheme();
 useEffect(()=>setMounted(true),[]);
 useEffect(()=>{if(theme&&!themes.some(option=>option.id===theme))setTheme("light")},[theme,setTheme]);
 const selected=mounted?theme:'light';
 return <><button className="nav-link settings-link" aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}><Palette size={19}/><span>Settings <span className="settings-subtitle">Appearance</span></span></button>
 <Dialog open={open} onOpenChange={setOpen}><DialogContent className="appearance-dialog"><DialogHeader><p className="eyebrow">SETTINGS</p><DialogTitle>Appearance</DialogTitle><DialogDescription className="appearance-description">Choose a color scheme that feels like home. Your choice is remembered on this device.</DialogDescription></DialogHeader>
 <fieldset className="theme-options"><legend className="sr-only">Color scheme</legend>{themes.map(option=><label key={option.id} className={'theme-option '+(selected===option.id?'theme-selected':'')}><input type="radio" name="color-scheme" value={option.id} checked={selected===option.id} onChange={()=>setTheme(option.id)}/><span className="theme-preview" aria-hidden="true">{option.colors.map(color=><span key={color} style={{backgroundColor:color}}/>)}</span><span className="theme-option-text"><strong>{option.name}</strong><span>{option.description}</span></span><span className="theme-choice-mark" aria-hidden="true">{selected===option.id&&<Check size={16}/>}</span></label>)}</fieldset>
 <p className="appearance-status" role="status">{themes.find(option=>option.id===selected)?.name||'Light'} theme selected</p><div className="appearance-actions"><button className="gold-button" onClick={()=>setOpen(false)}>Done</button></div></DialogContent></Dialog></>;
}


