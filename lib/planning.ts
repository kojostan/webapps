export type Section='preaching'|'flow'|'announcements';
export type Entry={id:string;section:Section;date:string;title:string;person:string;time:string;duration:number;scripture:string;series:string;location:string;category:string;notes:string;status:string;sample?:boolean};
const base={person:'',time:'10:00',duration:0,scripture:'',series:'',location:'Main sanctuary',category:'Community',notes:'',status:'Confirmed',sample:true};
export const samples:Entry[]=[
 ...['2026-10-04','2026-10-11','2026-10-18','2026-10-25'].map((date,i)=>({...base,id:'sermon-'+i,section:'preaching' as Section,date,title:['A faith that makes room','Rooted in grace','The beauty of belonging','Living with open hands'][i],person:['Pastor Samuel Bennett','Pastor Grace Mitchell','Pastor Samuel Bennett','Pastor Daniel Brooks'][i],duration:35,scripture:['Romans 12:9–18','Ephesians 3:14–21','1 Corinthians 12:12–27','2 Corinthians 9:6–11'][i],series:'Together in grace',notes:'A four-week journey into faith, community, and the everyday practice of grace.'})),
 ...['2026-10-04','2026-10-11','2026-10-18','2026-10-25'].flatMap(date=>[
 {title:'Welcome & opening prayer',person:'Service host',time:'10:00',duration:5,notes:'Welcome the congregation and open with prayer.'},
 {title:'Worship together',person:'Worship team',time:'10:05',duration:20,notes:'Congregational worship and reflection.'},
 {title:'Community & giving',person:'Service host',time:'10:25',duration:10,notes:'Share announcements and receive the offering.'},
 {title:'Scripture & message',person:'Teaching pastor',time:'10:35',duration:35,notes:'Teaching from the Together in grace series.'},
 {title:'Response & closing blessing',person:'Worship team',time:'11:10',duration:10,notes:'A moment of response, followed by a blessing.'}
 ].map((item,i)=>({...base,...item,id:date+'-flow-'+i,section:'flow' as Section,date}))),
 ...['2026-10-04','2026-10-11','2026-10-18','2026-10-25'].flatMap(date=>[
 {title:'A seat at the table',category:'Community',time:'11:30',location:'Courtyard',notes:'Stay after the service for coffee, conversation, and a chance to get to know someone new.'},
 {title:'Serve our neighborhood',category:'Outreach',time:'09:00',location:'Community center',notes:'Join our Saturday food pantry team. Speak with the welcome team after the service to take part.'},
 {title:'Midweek prayer gathering',category:'Prayer',time:'19:00',location:'Chapel',notes:'Gather with us on Wednesday evening for a quiet hour of prayer and encouragement.'}
 ].map((item,i)=>({...base,...item,id:date+'-announcement-'+i,section:'announcements' as Section,date})))
];
export const labels={preaching:'Preaching Schedule',flow:'Flow of Service',announcements:'Announcements'};
