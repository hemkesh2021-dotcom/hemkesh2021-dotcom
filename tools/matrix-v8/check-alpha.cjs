// Read-only regression checks: run with `node tools/matrix-v8/check-alpha.cjs`.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const source = ['gen-lib.js', 'gen-panels.js'].map(name => fs.readFileSync(path.join(__dirname, name), 'utf8')).join('\n');
async function generated(only) {
  const files = {};
  const context = vm.createContext({saveFile: async (name, text) => { files[name] = text; }, log: () => {}});
  await new vm.Script(source + `\nbuildAll('assets/matrix-v8', ${JSON.stringify(only)})`).runInContext(context, {timeout: 10000});
  return files;
}
(async () => {
  const full = await generated([]);
  const focused = await generated(['sentinel-alpha']);
  assert.deepEqual(focused, await generated(['sentinel-alpha']), 'Generation must be deterministic');
  assert.equal(Object.keys(focused).length, 3);
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const section = readme.split('<a id="sentinel-alpha"></a>')[1].split('<a id="sentinel-v2"></a>')[0];
  const release = 'https://github.com/hemkesh2021-dotcom/Sentinel_Surveillance/releases/tag/v2.0.0-alpha.2';
  const notes = 'https://github.com/hemkesh2021-dotcom/Sentinel_Surveillance/blob/v2.0.0-alpha.2/docs/RELEASE_NOTES_v2.0.0-alpha.2.md';
  assert(section.includes(`<a href="${release}">\n<picture>`), 'Image must be a real release link');
  assert(section.includes(`<a href="${notes}">Release notes and limitations</a>`));
  assert(section.includes('(max-width: 560px)') && section.includes('(max-width: 1000px)'));
  assert(section.includes('experimental pre-release') && section.includes('Face recognition remains pending validation'));
  assert(section.includes('chat is not admitted for production use'));
  assert(section.includes('Beta may release in Q1 2027 (tentative).'));
  assert(!section.includes('not a confirmed release date'));
  for (const [name, svg] of Object.entries(focused)) {
    assert.equal(svg, full[name], 'Full builds must retain the alpha panel');
    assert.equal(svg, fs.readFileSync(path.join(root, name), 'utf8'), `Regenerate ${name}`);
    assert(section.includes('./' + name), `README must reference ${name}`);
    assert(svg.includes('role="img"') && svg.includes('<title') && svg.includes('<desc>'));
    assert(svg.includes('#3572A5'), 'Keep the restrained existing palette accent');
    const visibleText = [...svg.matchAll(/<text[^>]*>(.*?)<\/text>/g)].map(match => match[1]).join(' ');
    for (const text of ['v2.0.0-alpha.2', 'EXPERIMENTAL // PRE-RELEASE', 'Not production-accepted.', 'Published 21 October 2026', 'Q1 2027 (tentative).']) {
      assert(visibleText.includes(text), `Missing release wording: ${text}`);
    }
    assert(!svg.includes('not a confirmed release date'));
    assert(!/<script|<foreignObject|https?:\/\/(?!www\.w3\.org)/.test(svg), 'SVGs must remain self-contained');
  }
  console.log('PASS: alpha assets, deterministic/full generation, responsive README, accessible release links and wording');
})().catch(error => { console.error(error); process.exitCode = 1; });
