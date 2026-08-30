import { mkdirSync, writeFileSync } from "node:fs";

const username = process.env.PROFILE_USER || "hemkesh2021-dotcom";
const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error("GITHUB_TOKEN is required");
}

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "profile-snapshot-workflow"
};

const repositories = [];

for (let page = 1; ; page += 1) {
  const url = new URL(`https://api.github.com/users/${encodeURIComponent(username)}/repos`);
  url.searchParams.set("type", "owner");
  url.searchParams.set("sort", "updated");
  url.searchParams.set("per_page", "100");
  url.searchParams.set("page", String(page));

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}: ${await response.text()}`);
  }

  const pageItems = await response.json();
  repositories.push(...pageItems);

  if (pageItems.length < 100) {
    break;
  }
}

const publicRepositories = repositories.filter((repository) => !repository.private);
const portfolioRepositories = publicRepositories.filter(
  (repository) => repository.name.toLowerCase() !== username.toLowerCase()
);
const totalStars = publicRepositories.reduce(
  (sum, repository) => sum + repository.stargazers_count,
  0
);

const metrics = [
  ["PUBLIC REPOS", publicRepositories.length],
  ["PORTFOLIO REPOS", portfolioRepositories.length],
  ["TOTAL STARS", totalStars],
  ["FEATURED SYSTEMS", 3]
];

const themes = {
  light: {
    background: "#FFFFFF",
    border: "#E4E7EB",
    tile: "#F4F7F9",
    title: "#0B2545",
    text: "#59636E",
    cyan: "#008AA3",
    orange: "#C86432"
  },
  dark: {
    background: "#0D1117",
    border: "#2E343B",
    tile: "#161B22",
    title: "#E6EDF3",
    text: "#8B949E",
    cyan: "#00B4D8",
    orange: "#FF6B00"
  }
};

function render(themeName, theme) {
  const metricMarkup = metrics
    .map(([label, value], index) => {
      const x = index % 2 === 0 ? 18 : 174;
      const y = index < 2 ? 58 : 119;
      const accent = index % 2 === 0 ? theme.cyan : theme.orange;

      return `
        <g transform="translate(${x} ${y})">
          <rect width="148" height="49" rx="10" fill="${theme.tile}"/>
          <rect width="3" height="49" rx="1.5" fill="${accent}"/>
          <text x="14" y="19" fill="${theme.text}" font-size="9" font-weight="600" letter-spacing=".7">${label}</text>
          <text x="14" y="40" fill="${theme.title}" font-size="19" font-weight="700">${value}</text>
        </g>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="200" viewBox="0 0 340 200" role="img" aria-labelledby="title-${themeName} desc-${themeName}">
  <title id="title-${themeName}">Hemkesh's public GitHub portfolio snapshot</title>
  <desc id="desc-${themeName}">${publicRepositories.length} public repositories, ${portfolioRepositories.length} portfolio repositories, ${totalStars} total stars, and 3 featured systems.</desc>
  <rect x="1" y="1" width="338" height="198" rx="12" fill="${theme.background}" stroke="${theme.border}"/>
  <text x="18" y="30" fill="${theme.title}" font-family="'Segoe UI', Ubuntu, Helvetica, Arial, sans-serif" font-size="15" font-weight="700">Public Portfolio Snapshot</text>
  <circle cx="309" cy="24" r="4" fill="${theme.cyan}"/>
  <circle cx="321" cy="24" r="4" fill="${theme.orange}"/>
  <g font-family="'Segoe UI', Ubuntu, Helvetica, Arial, sans-serif">
    ${metricMarkup}
    <text x="170" y="188" text-anchor="middle" fill="${theme.text}" font-size="8.5">Live public data · refreshed by GitHub Actions</text>
  </g>
</svg>
`;
}

mkdirSync("assets", { recursive: true });

for (const [themeName, theme] of Object.entries(themes)) {
  writeFileSync(
    `assets/profile-snapshot-${themeName}.svg`,
    render(themeName, theme),
    "utf8"
  );
}

console.log(
  `Generated profile snapshot: ${publicRepositories.length} public repos, ${portfolioRepositories.length} portfolio repos, ${totalStars} stars`
);
