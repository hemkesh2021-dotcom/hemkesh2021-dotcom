const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const ctx=vm.createContext({saveFile:async(p,s)=>{const target=path.resolve(root,p);if(!target.startsWith(root+path.sep))throw Error('Outside project');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,s);},log:()=>{}});
(async()=>{const code=['gen-lib.js','gen-panels.js'].map(n=>fs.readFileSync(path.join(__dirname,n),'utf8')).join('\n');await new vm.Script(code+'\nbuildAll("assets/matrix-v8")').runInContext(ctx,{timeout:10000});console.log('Rebuilt 71 assets from supplied generators');})().catch(e=>{console.error(e);process.exit(1)});
