import {mkdirSync,writeFileSync} from "node:fs";
import {dirname} from "node:path";

function buildSignalAssets(repositories,username="hemkesh2021-dotcom"){
  const pubs=repositories.filter(r=>!r.private), portfolio=pubs.filter(r=>r.name.toLowerCase()!==username.toLowerCase()), stars=pubs.reduce((n,r)=>n+Number(r.stargazers_count||0),0);
  const metrics=[["PUBLIC REPOS",pubs.length],["PORTFOLIO REPOS",portfolio.length],["TOTAL STARS",stars],["FEATURED SYSTEMS",3]];
  const counts=new Map(); for(const r of pubs) if(r.language) counts.set(r.language,(counts.get(r.language)||0)+1);
  const langs=[...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,5);
  const colors={JavaScript:"#F1E05A",Java:"#B07219",TypeScript:"#3178C6",Python:"#3572A5","Jupyter Notebook":"#DA5B0B",HTML:"#E34C26",CSS:"#563D7C",C:"#555555"};
  const ps={
    light:{bg:"#FFFFFF",border:"#E4E7EB",tile:"#F4F7F9",text:"#0B2545",muted:"#59636E",cyan:"#008AA3",orange:"#C86432"},
    dark:{bg:"#0D1117",border:"#2E343B",tile:"#161B22",text:"#E6EDF3",muted:"#8B949E",cyan:"#00B4D8",orange:"#FF6B00"}
  };
  const xe=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  const out={};
  for(const [name,t] of Object.entries(ps)){
    const mm=metrics.map(([l,v],i)=>{const x=i%2?174:18,y=i<2?58:119,a=i%2?t.orange:t.cyan;return `<g transform="translate(${x} ${y})"><animate attributeName="opacity" values=".7;1;.7" dur="${3.2+i*.45}s" begin="-${i*.7}s" repeatCount="indefinite"/><rect width="148" height="49" rx="10" fill="${t.tile}"/><rect width="3" height="49" fill="${a}"><animate attributeName="opacity" values=".4;1;.4" dur="${2.4+i*.3}s" begin="-${i*.5}s" repeatCount="indefinite"/></rect><text x="14" y="19" fill="${t.muted}" font-size="9" font-weight="600">${l}</text><text x="14" y="40" fill="${t.text}" font-size="19" font-weight="700">${v}</text></g>`}).join("");
    out[`assets/profile-snapshot-${name}.svg`]=`<svg xmlns="http://www.w3.org/2000/svg" width="340" height="200" viewBox="0 0 340 200" role="img"><title>Animated public portfolio snapshot</title><rect x="1" y="1" width="338" height="198" rx="12" fill="${t.bg}" stroke="${t.border}" stroke-dasharray="4 14"><animate attributeName="stroke-dashoffset" from="0" to="-108" dur="12s" repeatCount="indefinite"/></rect><text x="18" y="30" fill="${t.text}" font-family="Arial" font-size="15" font-weight="700">Public Portfolio Snapshot</text><circle cx="309" cy="24" r="4" fill="${t.cyan}"><animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/></circle><circle cx="321" cy="24" r="4" fill="${t.orange}"><animate attributeName="opacity" values=".35;1;.35" dur="2.4s" repeatCount="indefinite"/></circle><g font-family="Arial">${mm}</g><path id="sr-${name}" d="M18 178H322" stroke="${t.border}"/><circle r="3" fill="${t.cyan}"><animateMotion dur="5.8s" repeatCount="indefinite"><mpath href="#sr-${name}"/></animateMotion></circle><text x="170" y="191" text-anchor="middle" fill="${t.muted}" font-family="Arial" font-size="8">Live public data · refreshed by GitHub Actions</text></svg>\n`;
    const total=Math.max(1,langs.reduce((n,[,c])=>n+c,0)),circ=2*Math.PI*42; let offset=0;
    const seg=langs.map(([l,c],i)=>{const len=circ*c/total,col=colors[l]||[t.cyan,t.orange,"#8B5CF6","#10B981","#EAB308"][i];const s=`<circle cx="269" cy="112" r="42" fill="none" stroke="${col}" stroke-width="14" stroke-dasharray="${len.toFixed(2)} ${(circ-len).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90 269 112)"><animate attributeName="stroke-opacity" values=".55;1;.55" dur="${3.4+i*.55}s" begin="-${i*.7}s" repeatCount="indefinite"/></circle>`;offset+=len;return s}).join("");
    const list=langs.map(([l,c],i)=>{const y=65+i*22,col=colors[l]||t.cyan;return `<g><animate attributeName="opacity" values=".55;1;.55" dur="${3+i*.5}s" begin="-${i*.6}s" repeatCount="indefinite"/><rect x="20" y="${y-9}" width="8" height="8" rx="2" fill="${col}"/><text x="34" y="${y-1}" fill="${t.muted}" font-size="10">${xe(l)}</text><text x="182" y="${y-1}" text-anchor="end" fill="${t.text}" font-size="10" font-weight="700">${c}</text></g>`}).join("");
    out[`assets/profile-languages-${name}.svg`]=`<svg xmlns="http://www.w3.org/2000/svg" width="340" height="200" viewBox="0 0 340 200" role="img"><title>Animated top languages by repository</title><rect x="1" y="1" width="338" height="198" rx="12" fill="${t.bg}" stroke="${t.border}" stroke-dasharray="4 14"><animate attributeName="stroke-dashoffset" from="0" to="-108" dur="12s" repeatCount="indefinite"/></rect><text x="18" y="30" fill="${t.text}" font-family="Arial" font-size="15" font-weight="700">Top Languages by Repo</text><path id="lr-${name}" d="M18 42H322" stroke="${t.border}"/><circle r="3" fill="${t.orange}"><animateMotion dur="6.4s" begin="-2s" repeatCount="indefinite"><mpath href="#lr-${name}"/></animateMotion></circle><g font-family="Arial">${list}</g><g><animateTransform attributeName="transform" type="rotate" from="0 269 112" to="360 269 112" dur="60s" repeatCount="indefinite"/>${seg}</g><circle cx="269" cy="112" r="22" fill="${t.bg}"><animate attributeName="r" values="21;23;21" dur="3s" repeatCount="indefinite"/></circle><text x="269" y="116" text-anchor="middle" fill="${t.text}" font-family="Arial" font-size="12" font-weight="700">${total}</text><text x="269" y="132" text-anchor="middle" fill="${t.muted}" font-family="Arial" font-size="8">repos</text><text x="170" y="189" text-anchor="middle" fill="${t.muted}" font-family="Arial" font-size="8">Primary language across public repositories</text></svg>\n`;
  }
  return out;
}

const username=process.env.PROFILE_USER||"hemkesh2021-dotcom",token=process.env.GITHUB_TOKEN;
if(!token) throw new Error("GITHUB_TOKEN is required");
const headers={Accept:"application/vnd.github+json",Authorization:`Bearer ${token}`,"X-GitHub-Api-Version":"2022-11-28","User-Agent":"animated-profile-signals-workflow"};
const repositories=[];
for(let page=1;;page++){const url=new URL(`https://api.github.com/users/${encodeURIComponent(username)}/repos`);url.searchParams.set("type","owner");url.searchParams.set("per_page","100");url.searchParams.set("page",String(page));const response=await fetch(url,{headers});if(!response.ok)throw new Error(`GitHub API returned ${response.status}`);const items=await response.json();repositories.push(...items);if(items.length<100)break;}
const assets=buildSignalAssets(repositories,username);
for(const [path,content] of Object.entries(assets)){if(!content.includes("<animate"))throw new Error(`Animation missing from ${path}`);mkdirSync(dirname(path),{recursive:true});writeFileSync(path,content,"utf8");}
console.log(`Generated ${Object.keys(assets).length} animated signal cards.`);
