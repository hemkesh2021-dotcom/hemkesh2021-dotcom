/* panel definitions — run after gen-lib.js is eval'd */

const PANELS = [];
const def = (id, o) => PANELS.push({ id, ...o });

/* 00 — hero (dark, marquee) */
def('hero', {
  accent: C.cyan, accent2: C.orange, bg: C.deep, dark: true,
  title: 'Hemkesh — Software Engineer and AI/ML Engineer — available for full-time roles',
  build(p) {
    const oneCol = p.mode === 'm';
    const ipad = p.pad + 26 * p.k;
    const top = (oneCol ? 34 : 54) * p.k;
    let y = top + (oneCol ? 6 : 6) * p.k;
    const kfs = p.fs(10.5), nfs = p.fs(oneCol ? 44 : 68), rfs = p.fs(oneCol ? 14 : 18), tfs = p.fs(12);
    let s = '';
    s += `<circle cx="${n(ipad + 3 * p.k)}" cy="${n(y - kfs * 0.32)}" r="${n(3 * p.k)}" fill="${C.mint}"><animate attributeName="opacity" values=".35;1;.35" dur="2.2s" repeatCount="indefinite"/></circle>`;
    s += txt(ipad + 16 * p.k, y, 'SYSTEM / PROFILE_BOOT', { s: kfs, w: 600, fill: C.faint, ls: 2.6 });
    y += kfs * 2.1;
    s += txt(ipad, y, '> identity verified: hemkesh2021-dotcom', { s: tfs, w: 400, fill: C.mute });
    s += `<rect x="${n(ipad + ('> identity verified: hemkesh2021-dotcom'.length) * tfs * 0.6 + 4)}" y="${n(y - tfs * 0.85)}" width="${n(tfs * 0.5)}" height="${n(tfs * 1.05)}" fill="${C.mint}"><animate attributeName="opacity" values="1;1;.05;.05;1" dur="1.15s" repeatCount="indefinite"/></rect>`;
    y += nfs * 1.05;
    s += txt(ipad, y, 'Hemkesh', { s: nfs, w: 600, disp: 1, fill: C.ink, ls: oneCol ? -1.2 : -2.6 });
    y += rfs * 1.7;
    s += txt(ipad, y, oneCol ? 'Software Engineer' : 'Software Engineer  ×  AI/ML Engineer', { s: rfs, w: 500, disp: 1, fill: C.mute, ls: 0.2 });
    if (oneCol) { y += rfs * 1.5; s += txt(ipad, y, '× AI/ML Engineer', { s: rfs, w: 500, disp: 1, fill: C.mute, ls: 0.2 }); }
    y += 22 * p.k;
    const bh = 36 * p.k, bl = 'AVAILABLE FOR FULL-TIME', bw = pillW(p, bl, 11.5);
    s += pill(p, ipad, y, bw, bh, bl, C.mint, { s: 11.5 });
    y += bh;
    const plateW = oneCol ? p.cw : p.cw * 0.555;
    p.add(shell(p, p.pad, top - 24 * p.k, plateW, (y + 24 * p.k) - (top - 24 * p.k), { r: Math.round(24 * p.k) }));
    p.parts.push(s); s = '';
    /* live telemetry monitor */
    const sw = oneCol ? p.cw : p.cw * 0.42;
    const sx = oneCol ? p.pad : p.pad + p.cw - sw;
    const sy = oneCol ? y + 54 * p.k : top - 24 * p.k;
    const sh = oneCol ? 86 * p.k : (y + 24 * p.k) - sy;
    s += shell(p, sx, sy, sw, sh, { r: Math.round(22 * p.k) });
    const gr = Math.min(sh * 0.2, 30 * p.k);
    const gcx = sx + gr + 26 * p.k, gcy = sy + sh * 0.44;
    const band = Math.min(sh * 0.46, 54 * p.k);
    for (let i = 0; i <= 4; i++) s += `<path d="M${n(gcx + gr * 2.1)} ${n(gcy - band / 2 + (band / 4) * i)}H${n(sx + sw - 20 * p.k)}" stroke="${C.line}" stroke-opacity=".5"/>`;

    /* rotating gear */
    s += well(p, gcx - gr * 1.4, gcy - gr * 1.4, gr * 2.8, gr * 2.8, { r: Math.round(gr * 1.4) });
    let g = `<g><animateTransform attributeName="transform" type="rotate" from="0 ${n(gcx)} ${n(gcy)}" to="360 ${n(gcx)} ${n(gcy)}" dur="7s" repeatCount="indefinite"/>`;
    for (let i = 0; i < 8; i++) {
      g += `<rect x="${n(gcx - gr * 0.14)}" y="${n(gcy - gr - gr * 0.2)}" width="${n(gr * 0.28)}" height="${n(gr * 0.38)}" rx="${n(gr * 0.1)}" fill="${C.mint}" transform="rotate(${i * 45} ${n(gcx)} ${n(gcy)})"/>`;
    }
    g += `<circle cx="${n(gcx)}" cy="${n(gcy)}" r="${n(gr * 0.8)}" fill="none" stroke="${C.mint}" stroke-width="${n(gr * 0.22)}"/>`;
    g += `<path d="M${n(gcx - gr * 0.4)} ${n(gcy)}H${n(gcx + gr * 0.4)}" stroke="${C.ink}" stroke-width="${n(gr * 0.15)}" stroke-linecap="round"/></g>`;
    s += g;

    /* scrolling waveform */
    const wx = gcx + gr * 2.1, ww = sx + sw - wx - 20 * p.k;
    const vals = [.35, .52, .3, .68, .48, .82, .58, .9, .66, .96, .74, .88, .35];
    void 0;
    const seg = ww / (vals.length - 1);
    const poly = ox => 'M' + vals.map((v, i) => `${n(ox + i * seg)} ${n(gcy + band / 2 - v * band)}`).join('L');
    s += `<clipPath id="wclip-${p.id}"><rect x="${n(wx)}" y="${n(gcy - band / 2 - 3)}" width="${n(ww)}" height="${n(band + 6)}"/></clipPath>`;
    s += `<g clip-path="url(#wclip-${p.id})"><g><animateTransform attributeName="transform" type="translate" from="0 0" to="${n(-ww)} 0" dur="7s" repeatCount="indefinite"/>` +
      `<path d="${poly(wx)}" fill="none" stroke="${C.cyan}" stroke-width="${n(2.2 * p.k)}" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${poly(wx + ww)}" fill="none" stroke="${C.cyan}" stroke-width="${n(2.2 * p.k)}" stroke-linecap="round" stroke-linejoin="round"/>` +
      `</g><rect x="${n(wx)}" y="${n(gcy - band / 2)}" width="${n(1.6 * p.k)}" height="${n(band)}" fill="${C.ink}" opacity=".5"><animate attributeName="x" from="${n(wx)}" to="${n(wx + ww)}" dur="3.2s" repeatCount="indefinite"/></rect></g>`;
    s += txt(wx, sy + sh - 18 * p.k, 'BUILD SIGNAL // ACTIVE', { s: p.fs(9.5), w: 700, fill: C.faint, ls: 1.6 });
    s += txt(sx + sw - 20 * p.k, sy + sh - 18 * p.k, 'LIVE', { s: p.fs(9.5), w: 700, fill: C.mint, ls: 1.6, anchor: 'end' });
    p.add(s);
    const bottom = oneCol ? sy + sh : Math.max(y + 24 * p.k, sy + sh);
    return bottom + (oneCol ? 34 : 40) * p.k;
  }
});

/* identity */
def('identity', {
  accent: C.cyan, bg: C.tan,
  title: 'Hemkesh professional identity — B.Tech CSE at Dayananda Sagar University, graduating 2027',
  build(p) {
    const oneCol = p.mode === 'm';
    let y = p.pad;
    const ipad = 20 * p.k;
    const barH = 30 * p.k;
    const nfs = p.fs(oneCol ? 26 : 34), rfs = p.fs(15), tag = p.fs(13.5);
    let h = ipad + barH + nfs * 1.35 + rfs * 1.7 + tag * 1.8 + tag * 1.6 + ipad;
    if (oneCol) h += tag * 1.6;
    let s = shell(p, p.pad, y, p.cw, h, { r: Math.round(22 * p.k) });
    s += `<path d="M${n(p.pad + 12 * p.k)} ${n(y + barH)}H${n(p.pad + p.cw - 12 * p.k)}" stroke="${C.line}"/>`;
    [C.mint, C.faint, C.faint].forEach((c, i) => { s += `<circle cx="${n(p.pad + ipad + i * 15 * p.k)}" cy="${n(y + barH / 2)}" r="${n(3.6 * p.k)}" fill="${c}" opacity="${i ? '.45' : '1'}"/>`; });
    s += txt(p.pad + ipad + 56 * p.k, y + barH / 2 + p.fs(11) * 0.36, 'hemkesh@github:~', { s: p.fs(11), w: 500, fill: C.faint, ls: 0.8 });
    if (!oneCol) {
      const bl = 'BUILDING INTELLIGENT SYSTEMS', bw = pillW(p, bl, 10.5);
      s += pill(p, p.pad + p.cw - bw - ipad, y + (barH - 24 * p.k) / 2, bw, 24 * p.k, bl, C.cyan, { s: 10.5 });
    }
    let cy = y + barH + ipad + p.fs(12);
    s += txt(p.pad + ipad, cy, '$ whoami', { s: p.fs(12), w: 600, fill: C.mint });
    cy += nfs * 1.25;
    s += txt(p.pad + ipad, cy, 'Hemkesh', { s: nfs, w: 600, disp: 1, ls: -1.2, fill: C.ink });
    cy += rfs * 1.7;
    s += txt(p.pad + ipad, cy, 'Software Engineer × AI/ML Engineer', { s: rfs, w: 500, fill: C.mute });
    cy += tag * 1.9;
    s += txt(p.pad + ipad, cy, 'Software, intelligence, and systems—built to work.', { s: tag, w: 400, fill: C.ink });
    cy += tag * 1.7;
    s += txt(p.pad + ipad, cy, 'B.Tech CSE · Dayananda Sagar University · 2027', { s: p.fs(12), w: 400, fill: C.faint });
    if (oneCol) { cy += tag * 1.7; s += txt(p.pad + ipad, cy, 'featured: AEGIS · SENTINEL', { s: p.fs(12), w: 600, fill: C.mint }); }
    else {
      s += txt(p.pad + p.cw - ipad, y + h - ipad, 'featured: AEGIS · SENTINEL', { s: p.fs(12), w: 600, fill: C.mint, anchor: 'end' });
    }
    p.add(s);
    y += h + p.gap;
    y = cards(p, y, {
      cols: 3, tfs: 15.5, items: [
        { tag: 'STATUS', title: 'Final-year student', body: 'Graduating in 2027' },
        { tag: 'FOCUS', title: 'Generative AI + LLMs', body: 'Cloud-to-edge systems' },
        { tag: 'OPPORTUNITY', title: 'Open to full-time roles', body: 'Software and AI/ML' }
      ]
    });
    return y + p.pad;
  }
});

/* 01 build */
def('build', {
  accent: C.cyan, bg: C.beige,
  title: 'Section 01 — What I build: generative AI, edge intelligence, and production-oriented software',
  build(p) {
    let y = head(p, p.pad, { kicker: 'SECTION 01 // WHAT I BUILD', title: 'What I build', num: '01', badge: '3 PRACTICE AREAS', big: 1 });
    y = cards(p, y + p.gap, {
      cols: 3, items: [
        { tag: '$ genai', title: 'Generative AI systems', body: 'Agent workflows, hybrid retrieval, grounded generation, evaluation, and human approval paths.' },
        { tag: '$ edge', title: 'Edge intelligence', body: 'TensorRT computer vision, local multimodal models, constrained-memory deployment, and real-time inference.' },
        { tag: '$ systems', title: 'Production-oriented software', body: 'Java and Python services, full-stack interfaces, PostgreSQL, containers, security, and observability.' }
      ]
    });
    return y + p.pad;
  }
});

/* 02 stack */
def('stack', {
  accent: C.orange, bg: C.peach,
  title: 'Section 02 — Technology matrix: Python, Java, C, TypeScript, AI, web, data, and infrastructure',
  build(p) {
    let y = head(p, p.pad, { kicker: 'SECTION 02 // TECHNOLOGY MATRIX', title: 'Technology matrix', num: '02', badge: '12 TECHNOLOGIES', big: 1 });
    y = chipGroups(p, y + p.gap, {
      groups: [
        { label: 'LANGUAGES', items: ['Python', 'Java', 'C', 'TypeScript'] },
        { label: 'FRAMEWORKS', items: ['Next.js', 'Spring Boot'] },
        { label: 'AI / ML', items: ['LLMs + RAG', 'Computer Vision', 'Machine Learning'] },
        { label: 'DATA / INFRA', items: ['Docker', 'Cloud', 'PostgreSQL'] }
      ]
    });
    return y + p.pad;
  }
});

/* 03 path */
def('path-edgeverve', {
  accent: C.cyan, bg: C.beige,
  title: 'Section 03 — Current path: AI/ML Model Evaluator, incoming Systems Engineer-EV at EdgeVerve Systems (Infosys Finacle), and B.Tech CSE student',
  build(p) {
    let y = head(p, p.pad, { kicker: 'SECTION 03 // CURRENT PATH', title: 'Current path', num: '03', badge: 'ACTIVE // 2026', big: 1 });
    y = cards(p, y + p.gap, {
      cols: 2, tfs: 16, items: [
        { tag: 'CURRENT ROLE', title: 'AI/ML Model Evaluator · Deccan AI', body: 'Freelance · Apr 2026—Present' },
        { tag: 'EDUCATION', title: 'B.Tech Computer Science Engineering', body: 'Dayananda Sagar University · 2027' }
      ]
    });
    y = cards(p, y + p.gap, {
      cols: 1, tfs: 16, items: [
        { tag: 'PRE-JOINING TECHNICAL TRAINING', title: 'Incoming Systems Engineer–EV', body: 'EdgeVerve Systems (Infosys Finacle)' }
      ]
    });
    return y + p.pad;
  }
});

/* 04 systems */
def('systems', {
  accent: C.cyan, bg: C.tan,
  title: 'Section 04 — Featured systems: AEGIS and SENTINEL',
  build(p) {
    let y = head(p, p.pad, { kicker: 'SECTION 04 // FEATURED BUILDS', title: '$ systems --featured', num: '04', badge: '02 SYSTEMS // ONLINE', big: 1 });
    return y + p.pad;
  }
});

/* AEGIS */
def('aegis', {
  accent: C.cyan, bg: C.beige,
  title: 'AEGIS — completed and verified agentic banking complaint resolution system',
  build(p) {
    let y = banner(p, p.pad, {
      kicker: 'FEATURED SYSTEM // 01', title: '01 / AEGIS', sub: 'Agentic banking complaint resolution',
      badge: 'COMPLETED // VERIFIED', stack: 'JAVA 21 · SPRING BOOT · PYTHON · RAG · PGVECTOR'
    });
    return y + p.pad;
  }
});

def('aegis-engineering-details', {
  accent: C.cyan, bg: C.beige,
  title: 'AEGIS engineering details — classification, retrieval, drafting, grounding, security, audit, measured signals, and technology stack',
  build(p) {
    let y = p.pad;
    const ipad = 18 * p.k;
    const kfs = p.fs(11), sfs = p.fs(14);
    const sub = 'Verifies AI-generated banking complaint responses before customer delivery.';
    const subL = wrap(sub, Math.floor((p.cw - ipad * 3) / (sfs * 0.62)));
    const hh = ipad * 1.8 + kfs * 1.7 + subL.length * sfs * 1.5;
    p.add(shell(p, p.pad, y, p.cw, hh, { r: Math.round(14 * p.k) }) +
      accentBar(p, p.pad + ipad * 0.8, y + ipad * 0.8, hh - ipad * 1.6) +
      txt(p.pad + ipad + 14 * p.k, y + ipad * 0.9 + kfs, 'VERIFIED COMPLAINT-RESOLUTION PIPELINE', { s: kfs, w: 800, fill: C.cyan, ls: 1.5 }) +
      lines(p.pad + ipad + 14 * p.k, y + ipad * 0.9 + kfs * 1.7 + sfs, subL, { s: sfs, lh: sfs * 1.5, fill: C.ink }));
    y += hh + p.gap;
    y = flow(p, y, { nodes: ['ingest', 'classify', 'compliance', 'retrieve', 'draft', 'verify', 'audit'] });
    y += p.gap;
    y = steps(p, y, {
      items: [
        'DistilBERT classification with local inference and deterministic fallback',
        'Hybrid pgvector semantic retrieval plus BM25 keyword retrieval',
        'NVIDIA NIM drafting with deterministic template-engine fallback',
        'Grounding gates block invented figures, contacts, and template debris',
        'PII redaction, OIDC roles, maker-checker approval, rate limits, and append-only audit',
        'Human edits become labelled feedback through an exportable learning loop'
      ]
    });
    y += p.gap;
    y = stats(p, y, {
      vfs: 26, items: [
        { value: '77.3%', label: 'TEMPORAL ACCURACY' },
        { value: '774 ms', label: 'P95 LATENCY' },
        { value: '~63/s', label: 'REQUESTS' }
      ]
    });
    y += p.gap * 0.7;
    y = meta(p, y, { text: 'STACK · Java 21 · Spring Boot · Python · RAG · pgvector · NVIDIA NIM · Docker', accent: C.orange });
    return y + p.pad;
  }
});

/* SENTINEL */
def('sentinel', {
  accent: C.orange, bg: C.peach,
  title: 'SENTINEL — completed edge-AI surveillance prototype in active improvement',
  build(p) {
    let y = banner(p, p.pad, {
      kicker: 'FEATURED SYSTEM // 02', title: '02 / SENTINEL', sub: 'Self-hosted edge-AI surveillance',
      badge: 'PROTOTYPE COMPLETE // ITERATING', stack: 'JETSON · YOLO · TENSORRT · LFM2-VL · FLASK'
    });
    return y + p.pad;
  }
});

def('sentinel-overview-details', {
  accent: C.orange, bg: C.beige,
  title: 'SENTINEL overview — local edge-AI pipeline, completed prototype, active improvement status, and technology stack',
  build(p) {
    let y = p.pad;
    const ipad = 18 * p.k, kfs = p.fs(11), sfs = p.fs(14);
    const sub = 'Detects, identifies, understands, and alerts locally on NVIDIA Jetson.';
    const subL = wrap(sub, Math.floor((p.cw - ipad * 3) / (sfs * 0.62)));
    const hh = ipad * 1.8 + kfs * 1.7 + subL.length * sfs * 1.5;
    p.add(shell(p, p.pad, y, p.cw, hh, { r: Math.round(14 * p.k) }) +
      accentBar(p, p.pad + ipad * 0.8, y + ipad * 0.8, hh - ipad * 1.6) +
      txt(p.pad + ipad + 14 * p.k, y + ipad * 0.9 + kfs, 'LOCAL EDGE-AI SURVEILLANCE PIPELINE', { s: kfs, w: 800, fill: C.orange, ls: 1.5 }) +
      lines(p.pad + ipad + 14 * p.k, y + ipad * 0.9 + kfs * 1.7 + sfs, subL, { s: sfs, lh: sfs * 1.5, fill: C.ink }));
    y += hh + p.gap;
    y = flow(p, y, { nodes: ['RTSP camera', 'tracking', 'face recognition', 'local VLM', 'dashboard + alerts'] });
    y += p.gap;
    y = steps(p, y, {
      items: [
        'Completed working prototype with local inference end to end',
        'Improvement work remains active across reliability, security, and UX'
      ]
    });
    y += p.gap * 0.7;
    y = meta(p, y, { text: 'STACK · Python · YOLOv8n TensorRT · ByteTrack · DeepFace · LFM2-VL 1.6B', accent: C.orange });
    y += p.gap * 0.5;
    y = meta(p, y, { text: 'RUNTIME · llama.cpp · Flask · NVIDIA Jetson · ONVIF / RTSP', accent: C.cyan });
    return y + p.pad;
  }
});

/* stage banners + detail panels */
const STAGES = [
  ['sentinel-prototype', C.cyan, 'SENTINEL // STAGE 01', 'Completed prototype', 'PROTOTYPE // COMPLETE'],
  ['sentinel-deployment', C.orange, 'SENTINEL // STAGE 02', 'Deployment engineering', 'DEPLOYMENT // ENGINEERED'],
  ['sentinel-improvement', C.cyan, 'SENTINEL // STAGE 03', 'Active improvement process', 'IMPROVEMENT // ACTIVE'],
  ['sentinel-v2', C.orange, 'SENTINEL // STAGE 04', 'Version 2 beta in development', 'V2 BETA // TARGET Q4 2026']
];
STAGES.forEach(([id, accent, kicker, title, badge]) => {
  def(id, {
    accent, bg: accent === C.cyan ? C.beige : C.peach, title,
    build(p) { return stage(p, p.pad, { kicker, title, badge }) + p.pad; }
  });
});

const DETAILS = [
  ['sentinel-prototype-details', C.cyan, 'STAGE 01 // WORKING PROTOTYPE', 'A complete local vision-to-alert workflow tested on Jetson hardware.',
    ['YOLOv8n TensorRT person detection with ByteTrack tracking',
      'DeepFace, Facenet512, and YuNet face recognition with session Re-ID',
      'LFM2-VL 1.6B scene understanding through GPU-accelerated llama.cpp',
      'Fully local vision and scene inference without a cloud dependency',
      'Fire, smoke, threat, stranger, hours, entry, exit, and alert workflows',
      'Authenticated Flask dashboard with live stream, events, and camera-aware chat',
      'Telegram alert snapshots with priority-aware cooldowns',
      'Tested on Jetson Orin Nano Super 8 GB with an ONVIF / RTSP camera'],
    'PROTOTYPE STATE · COMPLETE // VERIFIED ON EDGE HARDWARE',
    'SENTINEL completed prototype details — detection, tracking, face recognition, local VLM analysis, dashboard, alerts, and Jetson test hardware'],
  ['sentinel-deployment-details', C.orange, 'STAGE 02 // EDGE RUNTIME', 'Deployment is structured for constrained shared-memory edge hardware.',
    ["Unified-memory mode lets the VLM use Jetson's shared CPU / GPU memory pool",
      'Headless startup launches the VLM first, then surveillance and dashboard services',
      'llama-server, Python inference, and Flask run as isolated processes',
      'Frames and state are exchanged atomically to prevent torn dashboard reads'],
    'RUNTIME · HEADLESS STARTUP · PROCESS ISOLATION · ATOMIC STATE EXCHANGE',
    'SENTINEL deployment engineering — unified-memory operation, startup order, process isolation, and atomic state exchange'],
  ['sentinel-improvement-details', C.cyan, 'STAGE 03 // ITERATION QUEUE', 'The prototype is complete; these production improvements remain active.',
    ['Enforce the project memory cap and reduce peak runtime usage',
      'Improve camera reconnection, reliability, and long-running observability',
      'Harden authentication, transport security, secrets handling, and deployment defaults',
      'Expand PTZ patrol and tracking with persistent home-position behavior',
      'Upgrade the responsive web experience and prepare Android / iOS client support'],
    'STATUS · PROTOTYPE COMPLETE // IMPROVEMENT PROCESS ACTIVE',
    'SENTINEL active improvement work — memory, reliability, security, PTZ behavior, and responsive clients'],
  ['sentinel-v2-details', C.orange, 'STAGE 04 // V2 BETA ROADMAP', 'A ground-up rebuild of the v1 prototype. Public beta targeted for Q4 2026.',
    ['Evidence-based threat engine with calibrated uncertainty scoring',
      'Resource-bounded scheduler keeps perception alive under a memory cap',
      'Published Orin Nano 8 GB benchmark with a reproducible replay harness',
      'PTZ active perception physical centring and full-res crops',
      'Hardened deployment auth, secrets, and durable alert delivery'],
    'STATUS · V2 IN DEVELOPMENT // PUBLIC BETA TARGET Q4 2026',
    'SENTINEL version 2 beta roadmap — evidence-based threat engine, resource-bounded scheduler, published Orin Nano benchmark, PTZ active perception, and hardened deployment']
];
DETAILS.forEach(([id, accent, kicker, sub, items, metaText, title]) => {
  def(id, {
    accent, bg: accent === C.cyan ? C.beige : C.peach, title,
    build(p) {
      let y = p.pad;
      const ipad = 18 * p.k, kfs = p.fs(11), sfs = p.fs(14);
      const subL = wrap(sub, Math.floor((p.cw - ipad * 3) / (sfs * 0.62)));
      const hh = ipad * 1.8 + kfs * 1.7 + subL.length * sfs * 1.5;
      p.add(shell(p, p.pad, y, p.cw, hh, { r: Math.round(14 * p.k) }) +
        accentBar(p, p.pad + ipad * 0.8, y + ipad * 0.8, hh - ipad * 1.6) +
        txt(p.pad + ipad + 14 * p.k, y + ipad * 0.9 + kfs, kicker, { s: kfs, w: 800, fill: accent, ls: 1.5 }) +
        lines(p.pad + ipad + 14 * p.k, y + ipad * 0.9 + kfs * 1.7 + sfs, subL, { s: sfs, lh: sfs * 1.5, fill: C.ink }));
      y += hh + p.gap;
      y = steps(p, y, { items });
      y += p.gap * 0.7;
      y = meta(p, y, { text: metaText, accent });
      return y + p.pad;
    }
  });
});

/* 05 signal */
def('signal', {
  accent: C.cyan, bg: C.tan,
  title: 'Section 05 — GitHub signal: public repositories, stars, featured systems, and languages',
  build(p) {
    let y = head(p, p.pad, { kicker: 'SECTION 05 // PUBLIC PORTFOLIO SNAPSHOT', title: 'GitHub signal', num: '05', badge: '8 REPOS', big: 1 });
    y = stats(p, y + p.gap, {
      items: [
        { value: '8', label: 'PUBLIC REPOS' },
        { value: '7', label: 'PORTFOLIO REPOS' },
        { value: '4', label: 'TOTAL STARS' },
        { value: '2', label: 'FEATURED SYSTEMS' }
      ]
    });
    y = bars(p, y + p.gap, {
      label: 'TOP LANGUAGES BY REPOSITORY', items: [
        { label: 'JavaScript', value: 3 }, { label: 'Java', value: 1 },
        { label: 'Jupyter Notebook', value: 1 }, { label: 'Python', value: 1 }, { label: 'TypeScript', value: 1 }
      ]
    });
    return y + p.pad;
  }
});

/* 06 interests */
def('interests', {
  accent: C.orange, bg: C.peach,
  title: 'Section 06 — Interests: local-first AI, edge AI, systems, computer vision, robotics, open source, and cloud-native development',
  build(p) {
    let y = head(p, p.pad, { kicker: 'SECTION 06 // INTERESTS', title: 'Interests', num: '06', badge: '8 THREADS', big: 1 });
    y = chipGroups(p, y + p.gap, {
      groups: [
        { label: 'INTELLIGENCE', items: ['Local-first AI', 'Edge AI', 'Intelligent systems', 'Computer vision'] },
        { label: 'SYSTEMS', items: ['Systems engineering', 'Robotics', 'Open-source engineering', 'Cloud-native development'] }
      ]
    });
    return y + p.pad;
  }
});

/* footer */
def('footer', {
  accent: C.cyan, bg: C.beige,
  title: 'Build status: curious, shipping, and learning',
  build(p) {
    const oneCol = p.mode === 'm';
    const ipad = 18 * p.k, fs = p.fs(13);
    const h = oneCol ? ipad * 2 + fs * 3.4 : ipad * 2 + fs * 1.6;
    let y = p.pad;
    let s = shell(p, p.pad, y, p.cw, h, { r: Math.round(14 * p.k) });
    const t = '> build_status: curious / shipping / learning';
    s += txt(p.pad + ipad, y + ipad + fs, t, { s: fs, w: 500, fill: C.ink });
    s += `<rect x="${n(p.pad + ipad + t.length * fs * 0.6 + 4)}" y="${n(y + ipad + fs * 0.12)}" width="${n(fs * 0.5)}" height="${n(fs * 1.05)}" fill="${C.orange}"><animate attributeName="opacity" values="1;1;.06;.06;1" dur="1.15s" repeatCount="indefinite"/></rect>`;
    const sy = oneCol ? y + ipad + fs * 3 : y + ipad + fs;
    const sx = oneCol ? p.pad + ipad : p.pad + p.cw - ipad - 22 * p.k;
    s += txt(oneCol ? sx : sx - 4 * p.k, sy, 'SESSION // ACTIVE', { s: p.fs(11), w: 800, fill: C.cyan, ls: 1.2, anchor: oneCol ? 'start' : 'end' });
    const cx = oneCol ? sx + 132 * p.k : p.pad + p.cw - ipad - 6 * p.k;
    s += `<circle cx="${n(cx)}" cy="${n(sy - p.fs(11) * 0.34)}" r="${n(4 * p.k)}" fill="${C.cyan}"><animate attributeName="r" values="${n(3 * p.k)};${n(6 * p.k)};${n(3 * p.k)}" dur="2s" repeatCount="indefinite"/></circle>`;
    p.add(s);
    return y + h + p.pad;
  }
});

/* dividers */
['cyan', 'orange'].forEach(kind => {
  def('divider-' + kind, {
    accent: kind === 'cyan' ? C.cyan : C.orange, accent2: kind === 'cyan' ? C.orange : C.cyan,
    bg: C.deep, dark: true, plain: true, title: 'Animated section boundary',
    build(p) {
      const h = (p.mode === 'm' ? 44 : 58) * p.k;
      const A = p.accent;
      const x0 = p.pad, x1 = p.W - p.pad, my = h / 2;
      let s = `<path d="M${n(x0)} ${n(my)}H${n(x1)}" stroke="${C.line}" stroke-width="1.5"/>`;
      s += `<path d="M${n(x0)} ${n(my)}H${n(x1)}" stroke="${A}" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="${n((x1 - x0) * 0.16)} ${n(x1 - x0)}"><animate attributeName="stroke-dashoffset" values="${n((x1 - x0) * 0.16)};${n(-(x1 - x0))}" dur="${kind === 'cyan' ? '5.5' : '6.5'}s" repeatCount="indefinite"/></path>`;
      s += `<circle r="${n(3.4 * p.k)}" fill="${A}"><animateMotion path="M${n(x0)} ${n(my)}H${n(x1)}" dur="${kind === 'cyan' ? '5.5' : '6.5'}s" repeatCount="indefinite"/></circle>`;
      s += `<path d="M${n(x0)} ${n(my - 6 * p.k)}V${n(my + 6 * p.k)}M${n(x1)} ${n(my - 6 * p.k)}V${n(my + 6 * p.k)}" stroke="${C.faint}" stroke-width="1.5" opacity=".7"/>`;
      p.add(s);
      return h;
    }
  });
});

/* buttons — fixed size, one variant */
const BUTTONS = [
  ['button-projects', 'Explore projects', C.cyan],
  ['button-linkedin', 'LinkedIn', C.orange]
];

function buildButton(label, accent) {
  const W = 300, H = 76, id = 'btn-' + label.replace(/\W+/g, '');
  const fs = 16, r = (H - 8) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="ttl-${id}">
<title id="ttl-${id}">${esc(label)}</title>
<defs>
<filter id="n-${id}" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="4" dy="5" stdDeviation="6" flood-color="${C.shadow}" flood-opacity=".95"/><feDropShadow dx="-3" dy="-3" stdDeviation="4" flood-color="#FFFFFF" flood-opacity=".95"/></filter>
<linearGradient id="e-${id}" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#FFFFFF" stop-opacity="1"/><stop offset=".45" stop-color="#FFFFFF" stop-opacity=".25"/><stop offset="1" stop-color="${C.shadow}" stop-opacity=".55"/></linearGradient>
<pattern id="d-${id}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1" fill="${C.steel}" fill-opacity=".4"/></pattern>
<clipPath id="c-${id}"><rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="${r}"/></clipPath></defs>
<rect width="${W}" height="${H}" fill="${C.bg}"/>
<rect width="${W}" height="${H}" fill="url(#d-${id})"/>
<rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="${r}" fill="${C.plate}" filter="url(#n-${id})"/>
<rect x="4.75" y="4.75" width="${W - 9.5}" height="${H - 9.5}" rx="${r}" fill="none" stroke="url(#e-${id})" stroke-width="1.5"/>
<g clip-path="url(#c-${id})"><rect x="-110" y="4" width="110" height="${H - 8}" fill="${accent}" opacity=".07"><animate attributeName="x" from="-110" to="${W}" dur="4s" repeatCount="indefinite"/></rect></g>
<circle cx="34" cy="${H / 2}" r="4.5" fill="${accent}"><animate attributeName="r" values="3.5;5.5;3.5" dur="2.4s" repeatCount="indefinite"/></circle>
<circle cx="34" cy="${H / 2}" r="4.5" fill="none" stroke="${accent}" stroke-opacity=".5"><animate attributeName="r" values="4.5;12" dur="2.4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".5;0" dur="2.4s" repeatCount="indefinite"/></circle>
<text x="54" y="${H / 2 + fs * 0.36}" fill="${C.ink}" font-family="${DISP}" font-size="${fs}" font-weight="500" letter-spacing="-.1">${esc(label)}</text>
<text x="${W - 28}" y="${H / 2 + 6}" fill="${accent}" font-family="${MONO}" font-size="17" font-weight="700" text-anchor="middle">↗</text>
</svg>`;
}

/* ---------- runner ---------- */
async function buildAll(dir) {
  FONT_CSS = '';

  const written = [];
  for (const spec of PANELS) {
    for (const mode of ['d', 't', 'm']) {
      const p = P(mode, spec);
      const h = spec.build(p);
      const svg = render(p, h);
      const suffix = { d: 'desktop', t: 'tablet', m: 'mobile' }[mode];
      const path = `${dir}/${spec.id}-${suffix}.svg`;
      await saveFile(path, svg);
      written.push(`${spec.id}-${suffix} ${p.W}x${Math.round(h)}`);
    }
  }
  for (const [id, label, accent] of BUTTONS) {
    await saveFile(`${dir}/${id}.svg`, buildButton(label, accent));
    written.push(id);
  }
  log(written.join('\n'));
  log('total files: ' + written.length);
}
