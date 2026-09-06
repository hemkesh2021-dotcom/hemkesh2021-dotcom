/* matrix-v8 — dark neumorphic / dot-matrix asset generator */

const C = {
  bg: '#E7EAEE', bg2: '#DADEE4',
  plate: '#EDEFF3', plate2: '#F4F6F8', sunk: '#DCE0E6',
  line: '#CBD1D9', edge: '#FFFFFF', shadow: '#AEB5BF',
  ink: '#14161A', mute: '#454B54', faint: '#666D76',
  mint: '#14161A', steel: '#8A919B'
};
/* legacy aliases so panel definitions keep reading */
C.ink1 = C.ink; C.card = C.plate; C.chip = C.plate2; C.mute = C.mute;
C.cyan = C.mint; C.orange = C.mint; C.beige = C.bg; C.tan = C.bg; C.peach = C.bg;
C.deep = C.bg; C.deep2 = C.bg2; C.shade = C.shadow;

const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";
const DISP = "ui-sans-serif,system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
const MODES = { d: { w: 1000, k: 1 }, t: { w: 780, k: 0.94 }, m: { w: 440, k: 0.84 } };
let FONT_CSS = '';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const n = v => (Math.round(v * 100) / 100);

function wrap(str, max) {
  const words = String(str).split(' ');
  const out = []; let cur = '';
  for (const w of words) {
    if (!cur) { cur = w; continue; }
    if ((cur + ' ' + w).length <= max) cur += ' ' + w; else { out.push(cur); cur = w; }
  }
  if (cur) out.push(cur);
  return out;
}

function P(mode, opt) {
  const M = MODES[mode];
  const p = {
    mode, W: M.w, k: M.k, id: opt.id + '-' + mode,
    accent: opt.accent || C.mint, accent2: opt.accent2 || C.steel,
    bg: C.bg, dark: true, plain: !!opt.plain, title: opt.title || '',
    parts: [], y: 0
  };
  p.pad = Math.round(Math.max(M.w * 0.024, 28 * M.k));
  p.cw = p.W - p.pad * 2;
  p.gap = Math.round(M.w * 0.018);
  p.fs = b => n(b * M.k);
  p.add = s => { p.parts.push(s); return p; };
  return p;
}

/* ---------- primitives ---------- */
function txt(x, y, s, o = {}) {
  const f = o.disp ? DISP : MONO;
  const a = [`x="${n(x)}"`, `y="${n(y)}"`, `fill="${o.fill || C.ink}"`, `font-family="${f}"`, `font-size="${n(o.s || 13)}"`];
  if (o.w) a.push(`font-weight="${o.w}"`);
  if (o.ls != null) a.push(`letter-spacing="${o.ls}"`);
  if (o.anchor) a.push(`text-anchor="${o.anchor}"`);
  if (o.op != null) a.push(`opacity="${o.op}"`);
  return `<text ${a.join(' ')}>${esc(s)}</text>`;
}
function lines(x, y, arr, o = {}) {
  const lh = o.lh || (o.s || 13) * 1.45;
  return arr.map((l, i) => txt(x, y + i * lh, l, o)).join('');
}

/* raised neumorphic plate + top-left light edge */
function shell(p, x, y, w, h, o = {}) {
  const r = o.r != null ? o.r : Math.round(20 * p.k);
  const fill = o.fill || C.plate;
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}" fill="${fill}" filter="url(#neu-${p.id})"/>`
    + `<rect x="${n(x + 0.75)}" y="${n(y + 0.75)}" width="${n(w - 1.5)}" height="${n(h - 1.5)}" rx="${r}" fill="none" stroke="url(#edge-${p.id})" stroke-width="1.5"/>`;
}
/* pressed / sunken well */
function well(p, x, y, w, h, o = {}) {
  const r = o.r != null ? o.r : Math.round(14 * p.k);
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}" fill="${C.sunk}"/>`
    + `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}" fill="url(#inset-${p.id})"/>`
    + `<rect x="${n(x + 0.5)}" y="${n(y + 0.5)}" width="${n(w - 1)}" height="${n(h - 1)}" rx="${r}" fill="none" stroke="${C.line}" stroke-opacity=".8"/>`;
}
function accentBar(p, x, y, h, color) {
  const w = n(3 * p.k);
  return `<rect x="${n(x)}" y="${n(y)}" width="${w}" height="${n(h)}" rx="${n(w / 2)}" fill="${color || p.accent}" opacity=".9"/>`;
}
function pill(p, x, y, w, h, label, color, o = {}) {
  const r = n(h / 2), fs = p.fs(o.s || 11.5);
  const dot = o.dot === false ? '' :
    `<circle cx="${n(x + h * 0.62)}" cy="${n(y + h / 2)}" r="${n(3.4 * p.k)}" fill="${color}"><animate attributeName="r" values="${n(2.6 * p.k)};${n(4.4 * p.k)};${n(2.6 * p.k)}" dur="2.4s" repeatCount="indefinite"/></circle>`
    + `<circle cx="${n(x + h * 0.62)}" cy="${n(y + h / 2)}" r="${n(3.4 * p.k)}" fill="none" stroke="${color}" stroke-opacity=".5"><animate attributeName="r" values="${n(3.4 * p.k)};${n(9 * p.k)}" dur="2.4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".5;0" dur="2.4s" repeatCount="indefinite"/></circle>`;
  const tx = o.dot === false ? x + h * 0.62 : x + h * 1.12;
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}" fill="${C.plate2}" filter="url(#neuS-${p.id})"/>`
    + `<rect x="${n(x + 0.5)}" y="${n(y + 0.5)}" width="${n(w - 1)}" height="${n(h - 1)}" rx="${r}" fill="none" stroke="${color}" stroke-opacity=".3"/>`
    + dot + txt(tx, y + h / 2 + fs * 0.36, label, { s: fs, w: 700, fill: color, ls: PILL_LS });
}
const PILL_LS = 0.7;
const pillW = (p, label, s) => { const fs = p.fs(s || 11.5); return n(label.length * (fs * 0.605 + PILL_LS) + fs * 6); };

/* ---------- components ---------- */
function head(p, y, o) {
  const oneCol = p.mode === 'm';
  const kfs = p.fs(11), tfs = p.fs(o.big ? 30 : 26), bh = n(32 * p.k);
  const bw = o.badge ? pillW(p, o.badge) : 0;
  const h = oneCol ? (o.badge ? 124 * p.k : 92 * p.k) : 104 * p.k;
  const x = p.pad, w = p.cw;
  let s = shell(p, x, y, w, h, { r: Math.round(24 * p.k) });
  const tile = (oneCol ? 44 : 56) * p.k;
  const tileX = x + 20 * p.k, tileY = y + (h - tile) / 2 - (oneCol && o.badge ? 16 * p.k : 0);
  if (o.num) {
    s += well(p, tileX, tileY, tile, tile, { r: Math.round(16 * p.k) });
    s += txt(tileX + tile / 2, tileY + tile * 0.63, o.num, { s: p.fs(oneCol ? 17 : 20), w: 700, disp: 1, anchor: 'middle', fill: p.accent, ls: 0.5 });
    const rr = tile * 0.42, ccx = tileX + tile / 2, ccy = tileY + tile / 2;
    s += `<g><animateTransform attributeName="transform" type="rotate" from="0 ${n(ccx)} ${n(ccy)}" to="360 ${n(ccx)} ${n(ccy)}" dur="9s" repeatCount="indefinite"/><circle cx="${n(ccx)}" cy="${n(ccy)}" r="${n(rr)}" fill="none" stroke="${p.accent}" stroke-opacity=".55" stroke-width="${n(1.6 * p.k)}" stroke-dasharray="${n(rr * 0.7)} ${n(rr * 4)}" stroke-linecap="round"/></g>`;
  } else {
    s += accentBar(p, tileX, y + 20 * p.k, h - 40 * p.k);
  }
  const tx = tileX + (o.num ? tile + 20 * p.k : 16 * p.k);
  s += txt(tx, y + 32 * p.k, o.kicker, { s: kfs, w: 600, fill: C.faint, ls: 1.8 });
  s += txt(tx, y + (oneCol ? 66 : 74) * p.k, o.title, { s: tfs, w: 600, disp: 1, ls: -0.4, fill: C.ink });
  if (o.badge) {
    const by = oneCol ? y + h - bh - 18 * p.k : y + (h - bh) / 2;
    const bx = oneCol ? tx : x + w - bw - 20 * p.k;
    s += pill(p, bx, by, bw, bh, o.badge, p.accent);
  }
  p.add(s);
  return y + h;
}

function cards(p, y, o) {
  const items = o.items;
  const cols = p.mode === 'm' ? 1 : (p.mode === 't' ? Math.min(2, items.length) : Math.min(o.cols || 3, items.length));
  const rows = Math.ceil(items.length / cols);
  const g = p.gap;
  const cwid = (p.cw - g * (cols - 1)) / cols;
  const ipad = 20 * p.k;
  const tfs = p.fs(o.tfs || 17), bfs = p.fs(13.5), tagfs = p.fs(10.5);
  const maxch = Math.floor((cwid - ipad * 2) / (bfs * 0.62));
  const wrapped = items.map(it => wrap(it.body || '', maxch));
  const rowH = [];
  for (let r = 0; r < rows; r++) {
    let mx = 0;
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c; if (i >= items.length) continue;
      mx = Math.max(mx, wrapped[i].length);
    }
    rowH.push(ipad + tagfs * 2.3 + tfs * 1.5 + mx * bfs * 1.55 + ipad * 0.8);
  }
  let s = '';
  items.forEach((it, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = p.pad + c * (cwid + g);
    const yy = y + rowH.slice(0, r).reduce((a, b) => a + b + g, 0);
    const h = rowH[r];
    const col = it.accent || p.accent;
    s += shell(p, x, yy, cwid, h);
    s += `<circle cx="${n(x + ipad + 3 * p.k)}" cy="${n(yy + ipad + tagfs * 0.4)}" r="${n(3 * p.k)}" fill="${col}"/>`;
    s += txt(x + ipad + 14 * p.k, yy + ipad + tagfs * 0.8, it.tag, { s: tagfs, w: 700, fill: col, ls: 1.5 });
    s += txt(x + ipad, yy + ipad + tagfs * 2.3 + tfs, it.title, { s: tfs, w: 600, disp: 1, ls: -0.2, fill: C.ink });
    s += lines(x + ipad, yy + ipad + tagfs * 2.3 + tfs * 2.6, wrapped[i], { s: bfs, lh: bfs * 1.55, fill: C.mute });
  });
  p.add(s);
  return y + rowH.reduce((a, b) => a + b + g, 0) - g;
}

function flow(p, y, o) {
  const nodes = o.nodes, N = nodes.length;
  const fs = p.fs(p.mode === 'd' ? 11.5 : 11);
  const kfs = p.fs(9.5);
  let s = '';
  if (p.mode === 'm') {
    const bh = 44 * p.k, g = 20 * p.k, x = p.pad, w = p.cw;
    const total = N * bh + (N - 1) * g;
    const spine = x + 26 * p.k;
    s += `<path d="M${n(spine)} ${n(y + bh / 2)}V${n(y + total - bh / 2)}" stroke="${C.line}" stroke-width="${n(2 * p.k)}"/>`;
    nodes.forEach((nd, i) => {
      const yy = y + i * (bh + g);
      s += shell(p, x, yy, w, bh, { r: Math.round(bh / 2), fill: C.plate2 });
      s += `<circle cx="${n(spine)}" cy="${n(yy + bh / 2)}" r="${n(5 * p.k)}" fill="${p.accent}"/>`;
      s += txt(x + 44 * p.k, yy + bh / 2 + fs * 0.36, nd, { s: fs, w: 600, fill: C.ink, ls: 0.3 });
      s += txt(x + w - 16 * p.k, yy + bh / 2 + kfs * 0.36, String(i + 1).padStart(2, '0'), { s: kfs, w: 700, fill: C.faint, anchor: 'end', ls: 1 });
    });
    s += `<circle r="${n(4.5 * p.k)}" fill="${p.accent}"><animateMotion path="M${n(spine)} ${n(y + bh / 2)}V${n(y + total - bh / 2)}" dur="${(N * 0.8).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="${(N * 0.8).toFixed(1)}s" repeatCount="indefinite"/></circle>`;
    p.add(s);
    return y + total;
  }
  const g = p.mode === 'd' ? 26 * p.k : 20 * p.k;
  const bh = 56 * p.k;
  const w = (p.cw - g * (N - 1)) / N;
  const cy = y + bh / 2;
  s += `<path d="M${n(p.pad + w * 0.5)} ${n(cy)}H${n(p.pad + p.cw - w * 0.5)}" stroke="${C.line}" stroke-width="${n(2 * p.k)}"/>`;
  nodes.forEach((nd, i) => {
    const x = p.pad + i * (w + g);
    s += shell(p, x, y, w, bh, { r: Math.round(16 * p.k), fill: C.plate2 });
    s += txt(x + w / 2, y + bh * 0.36, String(i + 1).padStart(2, '0'), { s: kfs, w: 700, fill: p.accent, anchor: 'middle', ls: 1.2 });
    s += txt(x + w / 2, y + bh * 0.74, nd, { s: fs, w: 600, fill: C.ink, anchor: 'middle', ls: 0.2 });
    if (i < N - 1) {
      const ax = x + w + g / 2;
      s += `<path d="M${n(ax - 3 * p.k)} ${n(cy - 3.5 * p.k)}l${n(4 * p.k)} ${n(3.5 * p.k)}l${n(-4 * p.k)} ${n(3.5 * p.k)}" stroke="${C.faint}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    }
  });
  const dur = (N * 0.6).toFixed(1);
  for (const [d, r] of [[0, 4.5], [dur / 2, 3]]) {
    s += `<circle r="${n(r * p.k)}" fill="${p.accent}"><animateMotion path="M${n(p.pad + w * 0.5)} ${n(cy)}H${n(p.pad + p.cw - w * 0.5)}" dur="${dur}s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="${dur}s" begin="${d}s" repeatCount="indefinite"/></circle>`;
  }
  p.add(s);
  return y + bh;
}

function steps(p, y, o) {
  const items = o.items;
  const cols = p.mode === 'm' ? 1 : (p.mode === 't' ? 2 : (o.cols || 2));
  const g = p.gap;
  const cwid = (p.cw - g * (cols - 1)) / cols;
  const fs = p.fs(13.5), nfs = p.fs(10);
  const badge = 28 * p.k, ipad = 18 * p.k;
  const inner = cwid - ipad * 2 - badge - 12 * p.k;
  const maxch = Math.floor(inner / (fs * 0.62));
  const wrapped = items.map(it => wrap(it, maxch));
  const rows = Math.ceil(items.length / cols);
  const rowH = [];
  for (let r = 0; r < rows; r++) {
    let mx = 1;
    for (let c = 0; c < cols; c++) { const i = r * cols + c; if (i < items.length) mx = Math.max(mx, wrapped[i].length); }
    rowH.push(Math.max(badge + ipad * 2, ipad * 2 + mx * fs * 1.6));
  }
  let s = '';
  items.forEach((it, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = p.pad + c * (cwid + g);
    const yy = y + rowH.slice(0, r).reduce((a, b) => a + b + g * 0.65, 0);
    const h = rowH[r];
    s += shell(p, x, yy, cwid, h, { r: Math.round(16 * p.k) });
    s += well(p, x + ipad, yy + (h - badge) / 2, badge, badge, { r: Math.round(9 * p.k) });
    s += txt(x + ipad + badge / 2, yy + (h - badge) / 2 + badge * 0.64, String(i + 1).padStart(2, '0'), { s: nfs, w: 700, fill: p.accent, anchor: 'middle' });
    const ty = yy + (h - wrapped[i].length * fs * 1.6) / 2 + fs * 1.2;
    s += lines(x + ipad + badge + 12 * p.k, ty, wrapped[i], { s: fs, lh: fs * 1.6, fill: C.ink });
  });
  p.add(s);
  return y + rowH.reduce((a, b) => a + b + g * 0.65, 0) - g * 0.65;
}

function chipGroups(p, y, o) {
  const g = p.gap, cols = p.mode === 'm' ? 1 : 2;
  const cwid = (p.cw - g * (cols - 1)) / cols;
  const ipad = 20 * p.k, lfs = p.fs(10.5), cfs = p.fs(12.5), ch = 34 * p.k;
  let s = '', lays = [], heights = [];
  o.groups.forEach(grp => {
    const lay = []; let cx = 0, cy = 0;
    grp.items.forEach(it => {
      const w = n(it.length * cfs * 0.63 + cfs * 2.2);
      if (cx + w > cwid - ipad * 2 && cx > 0) { cx = 0; cy += ch + 10 * p.k; }
      lay.push({ it, x: cx, y: cy, w }); cx += w + 10 * p.k;
    });
    heights.push(ipad * 2 + lfs * 2 + cy + ch); lays.push(lay);
  });
  const rowCount = Math.ceil(o.groups.length / cols);
  const rowMax = [];
  for (let r = 0; r < rowCount; r++) {
    let mx = 0;
    for (let c = 0; c < cols; c++) { const i = r * cols + c; if (i < heights.length) mx = Math.max(mx, heights[i]); }
    rowMax.push(mx);
  }
  o.groups.forEach((grp, gi) => {
    const r = Math.floor(gi / cols), c = gi % cols;
    const x = p.pad + c * (cwid + g);
    const yy = y + rowMax.slice(0, r).reduce((a, b) => a + b + g, 0);
    const h = rowMax[r];
    s += shell(p, x, yy, cwid, h);
    s += txt(x + ipad, yy + ipad + lfs, grp.label, { s: lfs, w: 700, fill: C.faint, ls: 1.8 });
    lays[gi].forEach((l, li) => {
      const bx = x + ipad + l.x, by = yy + ipad + lfs * 2 + l.y;
      s += `<rect x="${n(bx)}" y="${n(by)}" width="${n(l.w)}" height="${n(ch)}" rx="${n(ch / 2)}" fill="${C.plate2}" filter="url(#neuS-${p.id})"/>`;
      s += `<rect x="${n(bx + 0.5)}" y="${n(by + 0.5)}" width="${n(l.w - 1)}" height="${n(ch - 1)}" rx="${n(ch / 2)}" fill="none" stroke="url(#edge-${p.id})"/>`;
      s += `<circle cx="${n(bx + ch * 0.45)}" cy="${n(by + ch / 2)}" r="${n(3 * p.k)}" fill="${p.accent}"><animate attributeName="opacity" values=".4;1;.4" dur="${(2.4 + li * 0.3).toFixed(1)}s" repeatCount="indefinite"/></circle>`;
      s += txt(bx + ch * 0.78, by + ch / 2 + cfs * 0.36, l.it, { s: cfs, w: 500, fill: C.ink });
    });
  });
  p.add(s);
  return y + rowMax.reduce((a, b) => a + b + g, 0) - g;
}

function stats(p, y, o) {
  const items = o.items;
  const cols = p.mode === 'm' ? 2 : items.length;
  const g = p.gap;
  const cwid = (p.cw - g * (cols - 1)) / cols;
  const rows = Math.ceil(items.length / cols);
  const h = (p.mode === 'm' ? 88 : 102) * p.k;
  const vfs = p.fs(o.vfs || 30), lfs = p.fs(9.5);
  let s = '';
  items.forEach((it, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = p.pad + c * (cwid + g), yy = y + r * (h + g);
    s += shell(p, x, yy, cwid, h, { r: Math.round(18 * p.k) });
    s += txt(x + cwid / 2, yy + h * 0.48, it.value, { s: vfs, w: 600, disp: 1, anchor: 'middle', fill: C.ink, ls: -0.5 });
    s += txt(x + cwid / 2, yy + h * 0.75, it.label, { s: lfs, w: 700, anchor: 'middle', fill: C.faint, ls: 1.6 });
    const tw = cwid * 0.34;
    s += `<rect x="${n(x + (cwid - tw) / 2)}" y="${n(yy + h - 14 * p.k)}" width="${n(tw)}" height="${n(3 * p.k)}" rx="1.5" fill="${C.sunk}"/>`;
    s += `<rect x="${n(x + (cwid - tw) / 2)}" y="${n(yy + h - 14 * p.k)}" width="${n(tw)}" height="${n(3 * p.k)}" rx="1.5" fill="${p.accent}"><animate attributeName="width" values="0;${n(tw)}" dur="1.4s" begin="${(i * 0.16).toFixed(2)}s" fill="freeze"/></rect>`;
  });
  p.add(s);
  return y + rows * (h + g) - g;
}

function bars(p, y, o) {
  const items = o.items, max = Math.max(...items.map(i => i.value));
  const ipad = 22 * p.k, lfs = p.fs(12), tfs = p.fs(10);
  const rowH = 32 * p.k;
  const h = ipad * 2 + tfs * 2 + items.length * rowH;
  const labelW = p.mode === 'm' ? 118 * p.k : 152 * p.k;
  const trackX = p.pad + ipad + labelW;
  const trackW = p.cw - ipad * 2 - labelW - 48 * p.k;
  const th = 10 * p.k;
  let s = shell(p, p.pad, y, p.cw, h);
  s += txt(p.pad + ipad, y + ipad + tfs, o.label, { s: tfs, w: 700, fill: C.faint, ls: 1.8 });
  items.forEach((it, i) => {
    const yy = y + ipad + tfs * 2 + i * rowH;
    const bw = Math.max(th, trackW * (it.value / max));
    s += txt(p.pad + ipad, yy + rowH * 0.62, it.label, { s: lfs, w: 500, fill: C.ink });
    s += well(p, trackX, yy + rowH * 0.3, trackW, th, { r: th / 2 });
    s += `<rect x="${n(trackX)}" y="${n(yy + rowH * 0.3)}" width="${n(bw)}" height="${n(th)}" rx="${n(th / 2)}" fill="${p.accent}" opacity=".9"><animate attributeName="width" values="0;${n(bw)}" dur="1.5s" begin="${(i * 0.14).toFixed(2)}s" fill="freeze"/></rect>`;
    s += txt(trackX + trackW + 14 * p.k, yy + rowH * 0.62, String(it.value), { s: lfs, w: 700, fill: p.accent });
  });
  p.add(s);
  return y + h;
}

function meta(p, y, o) {
  const fs = p.fs(11.5), ipad = 18 * p.k;
  const maxch = Math.floor((p.cw - ipad * 2 - 16 * p.k) / (fs * 0.62));
  const ls = wrap(o.text, maxch);
  const h = ipad * 1.7 + ls.length * fs * 1.5;
  const col = o.accent || p.accent;
  let s = well(p, p.pad, y, p.cw, h, { r: Math.round(14 * p.k) });
  s += accentBar(p, p.pad + ipad * 0.7, y + ipad * 0.7, h - ipad * 1.4, col);
  s += lines(p.pad + ipad + 12 * p.k, y + ipad * 0.85 + fs, ls, { s: fs, lh: fs * 1.5, w: 600, fill: C.mute, ls: 0.4 });
  p.add(s);
  return y + h;
}

function banner(p, y, o) {
  const oneCol = p.mode === 'm';
  const kfs = p.fs(10.5), tfs = p.fs(o.tfs || 27), sfs = p.fs(14), stfs = p.fs(10.5);
  const bh = n(32 * p.k), bw = pillW(p, o.badge);
  const ipad = 24 * p.k;
  const h = oneCol
    ? ipad * 2 + kfs * 1.8 + tfs * 1.5 + sfs * 1.8 + bh + 16 * p.k + (o.stack ? stfs * 2.3 : 0)
    : ipad * 2 + kfs * 1.9 + tfs * 1.4 + sfs * 1.7 + (o.stack ? stfs * 2.2 : 0);
  let s = shell(p, p.pad, y, p.cw, h, { r: Math.round(24 * p.k) });
  const tx = p.pad + ipad;
  let cy = y + ipad + kfs;
  s += txt(tx, cy, o.kicker, { s: kfs, w: 600, fill: C.faint, ls: 1.8 });
  cy += kfs * 0.8 + tfs;
  s += txt(tx, cy, o.title, { s: tfs, w: 600, disp: 1, ls: -0.5, fill: C.ink });
  cy += sfs * 1.7;
  s += txt(tx, cy, o.sub, { s: sfs, w: 400, fill: C.mute });
  if (o.badge) {
    if (oneCol) { cy += 16 * p.k; s += pill(p, tx, cy, bw, bh, o.badge, p.accent); cy += bh; }
    else s += pill(p, p.pad + p.cw - bw - ipad, y + ipad, bw, bh, o.badge, p.accent);
  }
  if (o.stack) {
    const sy = oneCol ? cy + stfs * 2 : y + h - ipad + stfs * 0.2;
    s += txt(tx, sy, o.stack, { s: stfs, w: 600, fill: C.faint, ls: 1.1 });
  }
  p.add(s);
  return y + h;
}

function stage(p, y, o) {
  const oneCol = p.mode === 'm';
  const kfs = p.fs(10), tfs = p.fs(19);
  const bh = n(28 * p.k), bw = pillW(p, o.badge, 10.5);
  const ipad = 20 * p.k;
  const h = oneCol ? ipad * 2 + kfs * 1.8 + tfs * 1.4 + bh + 14 * p.k : ipad * 2 + kfs * 1.8 + tfs * 1.3;
  let s = shell(p, p.pad, y, p.cw, h, { r: Math.round(18 * p.k) });
  const tx = p.pad + ipad;
  s += txt(tx, y + ipad + kfs, o.kicker, { s: kfs, w: 600, fill: C.faint, ls: 1.6 });
  s += txt(tx, y + ipad + kfs * 0.9 + tfs, o.title, { s: tfs, w: 600, disp: 1, ls: -0.3, fill: C.ink });
  if (oneCol) s += pill(p, tx, y + h - ipad - bh, bw, bh, o.badge, p.accent, { s: 10.5 });
  else s += pill(p, p.pad + p.cw - bw - ipad, y + (h - bh) / 2, bw, bh, o.badge, p.accent, { s: 10.5 });
  p.add(s);
  return y + h;
}

/* ---------- document assembly ---------- */
function render(p, h) {
  const R = Math.round(26 * p.k);
  const A = p.accent;
  const dotStep = n(8 * p.k);
  const d = [];
  if (FONT_CSS) d.push(`<style>${FONT_CSS}</style>`);
  /* neumorphic shadows */
  d.push(`<filter id="neu-${p.id}" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="${n(5 * p.k)}" dy="${n(6 * p.k)}" stdDeviation="${n(7 * p.k)}" flood-color="${C.shadow}" flood-opacity=".95"/><feDropShadow dx="${n(-4 * p.k)}" dy="${n(-4 * p.k)}" stdDeviation="${n(5 * p.k)}" flood-color="#FFFFFF" flood-opacity=".95"/></filter>`);
  d.push(`<filter id="neuS-${p.id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="${n(2 * p.k)}" dy="${n(2.5 * p.k)}" stdDeviation="${n(3 * p.k)}" flood-color="${C.shadow}" flood-opacity=".9"/><feDropShadow dx="${n(-1.5 * p.k)}" dy="${n(-1.5 * p.k)}" stdDeviation="${n(2 * p.k)}" flood-color="#FFFFFF" flood-opacity=".95"/></filter>`);
  d.push(`<linearGradient id="edge-${p.id}" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#FFFFFF" stop-opacity="1"/><stop offset=".45" stop-color="#FFFFFF" stop-opacity=".25"/><stop offset="1" stop-color="${C.shadow}" stop-opacity=".55"/></linearGradient>`);
  d.push(`<linearGradient id="inset-${p.id}" x1="0" y1="0" x2=".3" y2="1"><stop stop-color="${C.shadow}" stop-opacity=".55"/><stop offset=".6" stop-color="${C.shadow}" stop-opacity="0"/></linearGradient>`);
  /* dot matrix */
  d.push(`<pattern id="dots-${p.id}" width="${dotStep}" height="${dotStep}" patternUnits="userSpaceOnUse"><circle cx="${n(dotStep / 2)}" cy="${n(dotStep / 2)}" r="${n(1.05 * p.k)}" fill="${C.steel}" fill-opacity=".45"/></pattern>`);
  d.push(`<pattern id="hot-${p.id}" width="${dotStep}" height="${dotStep}" patternUnits="userSpaceOnUse"><circle cx="${n(dotStep / 2)}" cy="${n(dotStep / 2)}" r="${n(1.35 * p.k)}" fill="${A}"/></pattern>`);
  d.push(`<radialGradient id="spotg-${p.id}"><stop stop-color="#fff" stop-opacity="1"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`);
  const sr = n(Math.max(h, p.W * 0.3) * 0.75);
  d.push(`<mask id="spot-${p.id}"><rect width="${p.W}" height="${n(h)}" fill="#000"/><circle cy="${n(h / 2)}" r="${sr}" fill="url(#spotg-${p.id})"><animate attributeName="cx" values="${n(-sr * 0.5)};${n(p.W + sr * 0.5)};${n(-sr * 0.5)}" dur="14s" repeatCount="indefinite"/></circle></mask>`);
  d.push(`<radialGradient id="vig-${p.id}" cx=".5" cy=".5" r=".8"><stop offset=".7" stop-color="${C.bg2}" stop-opacity="0"/><stop offset="1" stop-color="${C.bg2}" stop-opacity=".55"/></radialGradient>`);
  d.push(`<clipPath id="clip-${p.id}"><rect width="${p.W}" height="${n(h)}" rx="${R}"/></clipPath>`);

  const field = `<rect width="${p.W}" height="${n(h)}" fill="url(#dots-${p.id})"/>`
    + `<rect width="${p.W}" height="${n(h)}" fill="url(#hot-${p.id})" mask="url(#spot-${p.id})" opacity=".4"/>`
    + `<rect width="${p.W}" height="${n(h)}" fill="url(#vig-${p.id})"/>`;

  if (p.plain) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${p.W}" height="${n(h)}" viewBox="0 0 ${p.W} ${n(h)}" role="img" aria-labelledby="ttl-${p.id}">
<title id="ttl-${p.id}">${esc(p.title)}</title>
<defs>${d.join('')}</defs>
<g clip-path="url(#clip-${p.id})">
<rect width="${p.W}" height="${n(h)}" fill="${C.bg}"/>
${field}
${p.parts.join('\n')}
</g>
</svg>`;
  }

  /* orbiting accent arc on the panel border */
  const per = 2 * ((p.W - 1.5 - 2 * R) + (h - 1.5 - 2 * R)) + 2 * Math.PI * R;
  const arc = n(per * 0.14), orbit = `<rect x=".75" y=".75" width="${p.W - 1.5}" height="${n(h - 1.5)}" rx="${R}" fill="none" stroke="${C.faint}" stroke-width="1.5" stroke-linecap="round" stroke-opacity=".75" stroke-dasharray="${arc} ${n(per)}"><animate attributeName="stroke-dashoffset" values="0;${n(-per)}" dur="11s" repeatCount="indefinite"/></rect>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${p.W}" height="${n(h)}" viewBox="0 0 ${p.W} ${n(h)}" role="img" aria-labelledby="ttl-${p.id}">
<title id="ttl-${p.id}">${esc(p.title)}</title>
<desc>${esc(p.title)}</desc>
<defs>${d.join('')}</defs>
<g clip-path="url(#clip-${p.id})">
<rect width="${p.W}" height="${n(h)}" fill="${C.bg}"/>
${field}
${p.parts.join('\n')}
</g>
<rect x=".75" y=".75" width="${p.W - 1.5}" height="${n(h - 1.5)}" rx="${R}" fill="none" stroke="${C.line}" stroke-width="1.5"/>
${orbit}
</svg>`;
}
