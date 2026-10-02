import { planningDb } from '../../../db/planning';
import { samples, type Entry } from '../../../lib/planning';
import { getChatGPTUser } from '../../chatgpt-auth';
export async function GET(){try{
 const rows=await planningDb().prepare('SELECT id, payload, deleted FROM entries').all<{id:string;payload:string;deleted:number}>();
 const map=new Map(samples.map(e=>[e.id,e]));for(const row of rows.results){if(row.deleted)map.delete(row.id);else map.set(row.id,JSON.parse(row.payload));}
 return Response.json({entries:[...map.values()]});
}catch(error){console.error('Planning load failed',error);return Response.json({error:'We could not load your plans. Please try again.'},{status:503});}}
export async function POST(request:Request){
 if(!await getChatGPTUser())return Response.json({error:'Please sign in to save changes.'},{status:401});
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Request not allowed.'},{status:403});
 try{const input=await request.json() as {entry:Entry};const e=input.entry as Entry;
 if(!e||!['preaching','flow','announcements'].includes(e.section)||typeof e.id!=='string'||e.id.length>100||!/^\d{4}-\d{2}-\d{2}$/.test(e.date)||new Date(e.date+'T12:00:00').toISOString().slice(0,10)!==e.date||typeof e.title!=='string'||!e.title.trim()||e.title.length>200||!/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time)||!Number.isFinite(e.duration)||e.duration<0||e.duration>480)return Response.json({error:'Please check the date, title, time, and duration.'},{status:400});
 const clean:Entry={id:e.id,section:e.section,date:e.date,title:e.title.trim(),time:e.time,duration:e.duration,person:String(e.person||'').slice(0,200),scripture:String(e.scripture||'').slice(0,200),series:String(e.series||'').slice(0,200),location:String(e.location||'').slice(0,200),category:String(e.category||'').slice(0,100),notes:String(e.notes||'').slice(0,4000),status:['Confirmed','Draft'].includes(e.status)?e.status:'Draft',sample:false};
 await planningDb().prepare('INSERT INTO entries (id,payload,deleted) VALUES (?,?,0) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload,deleted=0').bind(clean.id,JSON.stringify(clean)).run();return Response.json({entry:clean});
 }catch(error){console.error('Planning save failed',error);return Response.json({error:'Your changes could not be saved. Please try again.'},{status:503});}}
export async function DELETE(request:Request){if(!await getChatGPTUser())return Response.json({error:'Please sign in to remove an entry.'},{status:401});
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Request not allowed.'},{status:403});
 try{const {id}=await request.json() as {id:string};if(typeof id!=='string'||id.length>100)return Response.json({error:'Invalid entry.'},{status:400});await planningDb().prepare('INSERT INTO entries (id,payload,deleted) VALUES (?, ?,1) ON CONFLICT(id) DO UPDATE SET deleted=1').bind(id,'{}').run();return Response.json({success:true});}catch(error){console.error(error);return Response.json({error:'Could not remove this entry. Please try again.'},{status:503});}}

