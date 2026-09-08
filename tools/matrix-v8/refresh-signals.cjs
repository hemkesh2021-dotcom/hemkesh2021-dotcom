const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
async function main() {
  const user = process.env.PROFILE_USER || 'hemkesh2021-dotcom';
  let repos = [];
  if (process.argv[2]) repos = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  else {
    const headers = {Accept:'application/vnd.github+json', 'User-Agent':'profile-signals', 'X-GitHub-Api-Version':'2022-11-28'};
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    for(let page=1;;page++) {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?type=owner&per_page=100&page=${page}`, {headers});
      if(!res.ok) throw Error(`GitHub API: ${res.status}`);
      const items=await res.json(); if(!Array.isArray(items)) throw Error('Invalid repository response');
      repos.push(...items); if(items.length<100) break;
    }
  }
  const pubs=repos.filter(r=>r.private===false);
  if(!pubs.length) throw Error('No public repositories returned; retaining previous graphics');
  const counts=new Map(); for(const r of pubs) if(r.language) counts.set(r.language,(counts.get(r.language)||0)+1);
  const data={repos:pubs.length,portfolio:pubs.filter(r=>r.name.toLowerCase()!==user.toLowerCase()).length,stars:pubs.reduce((n,r)=>n+r.stargazers_count,0),languages:[...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,5).map(([label,value])=>({label,value}))};
  if(!Number.isSafeInteger(data.stars)||data.stars<0) throw Error('Invalid star total');
  const ctx=vm.createContext({PROFILE_SIGNAL:data});
  const source=['gen-lib.js','gen-panels.js'].map(n=>fs.readFileSync(path.join(__dirname,n),'utf8')).join('\n');
  const assets=new vm.Script(source+`\nJSON.stringify(['d','t','m'].map(mode=>{const spec=PANELS.find(s=>s.id==='signal');const p=P(mode,spec);return {mode,svg:render(p,spec.build(p))};}))`).runInContext(ctx,{timeout:10000});
  for(const {mode,svg} of JSON.parse(assets)) {
    if(!svg.includes('<animate')) throw Error('Missing animation');
    const filename=path.join(root,'assets/matrix-v8/signal-'+({d:'desktop',t:'tablet',m:'mobile'}[mode])+'.svg');
    fs.mkdirSync(path.dirname(filename),{recursive:true});fs.writeFileSync(filename,svg);
  }
  console.log(JSON.stringify(data));
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
