<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/profile-hero-dark-v2.svg" />
    <img src="./assets/profile-hero-light-v2.svg" width="100%" alt="Hemkesh — Software Engineer and AI/ML Engineer" />
  </picture>
</div>

<p align="center">
  <a href="https://github.com/hemkesh2021-dotcom?tab=repositories"><img src="./assets/explore-projects-v2.svg" height="44" alt="Explore projects" /></a>
  &nbsp;
  <a href="https://www.linkedin.com/in/hemkesh-r-461532322/"><img src="./assets/linkedin-v2.svg" height="44" alt="LinkedIn" /></a>
</p>

<a id="whoami"></a>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/whoami-dark.svg" />
  <img src="./assets/sections/whoami-light.svg" width="100%" alt="Section 01 — $ whoami — identity profile" />
</picture>

I am **Hemkesh**, a final-year B.Tech Computer Science Engineering student at **Dayananda Sagar University**, graduating in **2027**.

I build intelligent systems across generative AI, edge inference, computer vision, full-stack services, and systems engineering. My work emphasizes grounded outputs, local-first execution, measurable evaluation, security, and software that remains useful outside a demo environment.

- **Primary direction:** Generative AI, LLM applications, RAG, and agentic systems
- **Engineering depth:** Edge AI, computer vision, backend services, data systems, and deployment
- **Current experience:** Freelance AI/ML Model Evaluator at Deccan AI — Apr 2026 to present
- **Current status:** Student · open to full-time Software Engineering and AI/ML roles

> **Software, intelligence, and systems—built to work.**

## `$ focus --current`

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/focus-dark.svg" />
  <img src="./assets/sections/focus-light.svg" width="100%" alt="Active direction: generative AI, edge AI, and systems" />
</picture>

| Generative AI systems | Edge intelligence | Production-oriented software |
|---|---|---|
| Agent workflows, hybrid retrieval, grounded generation, evaluation, and human approval paths | TensorRT computer vision, local multimodal models, constrained-memory deployment, and real-time inference | Java and Python services, full-stack interfaces, PostgreSQL, containers, security, and observability |

## `$ stack --matrix`

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/stack-dark.svg" />
  <img src="./assets/sections/stack-light.svg" width="100%" alt="Toolchain matrix loaded and ready" />
</picture>

| Area | Technologies |
|---|---|
| Languages | `Python` · `Java` · `C` · `TypeScript` |
| AI and ML | `LLMs` · `RAG` · `Computer Vision` · `Machine Learning` · `TensorRT` |
| Web and services | `Next.js` · `React` · `FastAPI` · `Spring Boot` · `Flask` |
| Infrastructure and data | `Docker` · `Cloud` · `PostgreSQL` · `pgvector` · `NVIDIA Jetson` |

## `$ systems --featured`

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/systems-dark.svg" />
  <img src="./assets/sections/systems-light.svg" width="100%" alt="Three featured systems active" />
</picture>

### 01 — [AEGIS](https://github.com/hemkesh2021-dotcom/AEGIS-complaint-resolution)

<a href="https://github.com/hemkesh2021-dotcom/AEGIS-complaint-resolution">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/projects/aegis-dark.svg" />
    <img src="./assets/projects/aegis-light.svg" width="100%" alt="AEGIS completed — agentic RAG for banking complaint resolution" />
  </picture>
</a>

**Agentic banking complaint resolution that verifies AI-generated responses before they reach customers.**

AEGIS uses a Spring Boot Java 21 orchestrator to run a seven-stage pipeline:

`ingest → classify → compliance → retrieve → draft → verify → audit`

- DistilBERT complaint classification with local inference and deterministic fallback
- Hybrid pgvector semantic retrieval plus BM25 keyword retrieval
- NVIDIA NIM drafting with a deterministic template-engine fallback
- Grounding gates that block invented figures, contacts, and template debris
- PII redaction, OIDC roles, maker-checker approval, rate limits, and append-only audit history
- Human edits become labelled feedback through an exportable learning loop

**Verified engineering signals:** `77.3% temporal-holdout accuracy` · `p95 774 ms pipeline latency` · `~63 requests/s measured`

`Java 21` · `Spring Boot` · `Python` · `DistilBERT` · `FastAPI` · `RAG` · `pgvector` · `NVIDIA NIM` · `Docker`

---

### 02 — [SENTINEL](https://github.com/hemkesh2021-dotcom/Sentinel_Surveillance)

<a href="https://github.com/hemkesh2021-dotcom/Sentinel_Surveillance">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/projects/sentinel-dark.svg" />
    <img src="./assets/projects/sentinel-light.svg" width="100%" alt="SENTINEL prototype complete with improvements ongoing" />
  </picture>
</a>

**Self-hosted edge-AI surveillance for NVIDIA Jetson: detect, identify, understand, and alert locally in real time.**

`RTSP camera → detection and tracking → face recognition → local VLM analysis → dashboard and alerts`

#### Completed prototype

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/sentinel-prototype-dark.svg" />
  <img src="./assets/sections/sentinel-prototype-light.svg" width="100%" alt="SENTINEL prototype stage complete" />
</picture>

- YOLOv8n TensorRT person detection with ByteTrack tracking
- DeepFace, Facenet512, and YuNet face recognition with session Re-ID
- LFM2-VL 1.6B scene understanding through GPU-accelerated llama.cpp
- Fully local inference with no cloud dependency for vision or scene analysis
- Fire/smoke, threat, stranger, restricted-hours, entry/exit, and alert workflows
- Authenticated Flask dashboard with live stream, event log, and camera-aware AI chat
- Telegram alert snapshots with priority-aware cooldowns
- Tested on an NVIDIA Jetson Orin Nano Super with 8 GB unified memory and an ONVIF/RTSP camera

#### Deployment engineering

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/sentinel-deployment-dark.svg" />
  <img src="./assets/sections/sentinel-deployment-light.svg" width="100%" alt="SENTINEL deployment engineering stage" />
</picture>

- Uses `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` so the VLM can run on Jetson's shared CPU/GPU memory pool
- Starts headless, launches the VLM first, and then starts the surveillance engine and dashboard
- Separates `llama-server`, the Python inference engine, and the Flask dashboard into three processes
- Exchanges frames and state atomically to prevent torn dashboard reads

#### Active improvement process

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/sentinel-improvement-dark.svg" />
  <img src="./assets/sections/sentinel-improvement-light.svg" width="100%" alt="SENTINEL improvement process active" />
</picture>

- Reduce and enforce memory usage below the project cap
- Improve runtime reliability, camera reconnection, and long-running observability
- Harden authentication, transport security, secrets handling, and deployment defaults
- Expand PTZ patrol, tracking, and persistent home-position behavior
- Upgrade the responsive web experience and prepare Android/iOS client support

`Python` · `YOLOv8n TensorRT` · `ByteTrack` · `DeepFace` · `LFM2-VL 1.6B` · `llama.cpp` · `Flask` · `NVIDIA Jetson`

---

### 03 — ARIA

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/projects/aria-dark.svg" />
  <img src="./assets/projects/aria-light.svg" width="100%" alt="ARIA is an active local-first multimodal AI build" />
</picture>

**Local-first multimodal AI assistant combining private intelligence, automation, and edge surveillance.**

- Private-by-default orchestration with cloud escalation only for heavier workloads
- Persistent cross-device memory and tool-aware assistant workflows
- One local intelligence layer spanning assistant, automation, and surveillance contexts
- Designed for Jetson-class edge hardware and full desktop environments

`Python` · `FastAPI` · `LLMs + RAG` · `NVIDIA Jetson` · `NVIDIA NIM` · `React / Next.js` · `Docker` · `PostgreSQL / pgvector`

## `$ github --signal`

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/github-dark.svg" />
  <img src="./assets/sections/github-light.svg" width="100%" alt="Public GitHub signal refreshed daily" />
</picture>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/profile-snapshot-dark.svg" />
    <img height="200" src="./assets/profile-snapshot-light.svg" alt="Hemkesh's public GitHub portfolio snapshot" />
  </picture>
  &nbsp;
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/profile-languages-dark.svg" />
    <img height="200" src="./assets/profile-languages-light.svg" alt="Top languages across Hemkesh's public repositories" />
  </picture>
</p>

<p align="center">
  <sub>Repository-hosted animated SVGs · refreshed daily by GitHub Actions</sub>
</p>

## `$ interests`

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/sections/interests-dark.svg" />
  <img src="./assets/sections/interests-light.svg" width="100%" alt="Research interests in local-first and edge AI" />
</picture>

`Local-first AI` · `Edge AI` · `Intelligent systems` · `Systems engineering` · `Computer vision` · `Robotics` · `Open-source engineering` · `Cloud-native development`

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/animated-footer-dark.svg" />
  <img src="./assets/animated-footer-light.svg" width="100%" alt="Build status: curious, shipping, and learning" />
</picture>
