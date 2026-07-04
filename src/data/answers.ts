import TEMPLATES from './templates';

const ANSWERS: Record<string, string | null> = {
  hackathon: "A hackathon is a short, intense event  usually 24 to 48 hours  where you build a working prototype from scratch and pitch it to judges at the end.\n\nWhat actually gets judged is a working demo and a clearly explained problem, not perfect code. Most first-timers fail by scoping too big. The teams that place usually ship the smallest possible thing that clearly solves one problem, then polish the pitch.\n\nTo participate: find one on Devfolio, Devpost, or MLH, form or join a team of 2-4, and show up with an idea you can realistically build in the time given.",
  resume: "A resume's only job is to get you the interview, not the offer. Recruiters skim it in about 7 seconds, so the first third of the page has to carry your strongest, most specific wins.\n\nUse bullet points that lead with an action and end with a number  impact, scale, or outcome. Keep it to one page unless you have 8+ years of experience, and tailor the summary line to the exact role you're applying for.",
  interview: "Interviews are less about having the 'right' answer and more about showing structured thinking under pressure.\n\nMost rounds test three things: whether you understand the role, whether you can explain your own past work clearly, and whether you're pleasant to work with. Prepare 3-4 STAR stories (Situation, Task, Action, Result) you can adapt to almost any behavioral question, and research the company enough to ask a sharp question back.",
  coding: "Getting good at DSA is less about memorizing solutions and more about recognizing patterns  two pointers, sliding window, BFS/DFS, dynamic programming  and knowing which one a problem is hinting at.\n\nA solid loop is: review one pattern, solve 3-5 problems in it, then do a timed mixed set so you're forced to recognize the pattern without being told which one it is.",
  fitness: "Consistency beats intensity when you're starting out. A routine you actually repeat 3 times a week for a month will always beat a perfect plan you quit after 4 days.\n\nStart with a simple full-body routine 2-3 times a week, track how each session felt, and only increase weight or reps once the current level feels easy  that's progressive overload, and it's the entire game long-term.",
  python: "Python basics really come down to 4 building blocks, in this order: variables & data types, conditionals, loops, and functions. Each one builds on the last, so skipping ahead is where most beginners get lost.\n\nThe part people get wrong: a 'variable' just holds a value (like x = 5), while a 'keyword' is a reserved word Python itself uses for logic  if, for, while, def, return. You can name a variable almost anything, but you can never use a keyword as a variable name. That distinction alone clears up half of the confusing error messages beginners hit.\n\nDon't try to learn syntax by reading. Read one concept for 10 minutes, then immediately write 3 tiny programs using only that concept before moving to the next one.",
  sql: "SQL has two very different jobs: reading data (SELECT) and changing data (INSERT / UPDATE / DELETE). Almost all beginner confusion comes from mixing up clause order versus execution order  you *write* SELECT ... FROM ... WHERE ... GROUP BY ... but the database actually *runs* FROM and WHERE first, then GROUP BY, then SELECT last.\n\nThat's also why you can't filter on a grouped value with WHERE  you need HAVING instead, since WHERE runs before grouping even happens.\n\nStart with SELECT + WHERE on a single table before touching JOINs. Joins are just 'pull matching rows from two tables at once'  the confusing part is only ever whether unmatched rows should disappear (INNER JOIN) or stay with blanks (LEFT JOIN).",
  webdev: "HTML, CSS, and JavaScript each do one job and only one job: HTML is structure (what exists on the page), CSS is presentation (how it looks), and JavaScript is behavior (what happens when something changes). A common beginner mistake is trying to make things happen with CSS or trying to style things with JavaScript  if you're fighting the language, you're usually using the wrong one for that job.\n\nBuild in that order too: get the raw HTML working and readable with zero styling first, then layer CSS on top, then add JavaScript last for anything that needs to react to a click, a scroll, or user input.",
};

export function getAnswer(key: string): string | null {
  return ANSWERS[key] ?? null;
}

export function genericAnswer(text: string): string {
  return `I don't have a specific playbook memorized for "${text}" the way I do for things like Python or SQL, so here's the honest, general version:\n\nThe fastest way into any new topic is to find the 3-4 core sub-concepts it's actually built from  not the whole field, just the load-bearing pieces  and learn them in dependency order, since most topics have one thing that everything else depends on.\n\nThe roadmap below follows that structure: get the shape of it, do one small real thing, redo it without help, then stretch it. Tell me the specific area if you want the answer above to get sharper.`;
}

export function pickTemplate(text: string): string {
  const t = text.toLowerCase();
  const KEYWORD_MAP: [string[], string][] = [
    [['hackathon'], 'hackathon'],
    [['resume', 'cv'], 'resume'],
    [['cover letter', 'coverletter', 'marketing internship'], 'cover_letter'],
    [['interview'], 'interview'],
    [['dsa', 'leetcode', 'algorithm', 'data structure'], 'coding'],
    [['gym', 'fitness', 'workout', 'exercise'], 'fitness'],
    [['python'], 'python'],
    [['sql', 'database query', 'mysql', 'postgres'], 'sql'],
    [['html', 'css', 'web dev', 'webdev', 'frontend', 'front-end'], 'webdev'],
    [['javascript', 'js basics'], 'webdev'],
  ];
  for (const [keys, key] of KEYWORD_MAP) {
    if (keys.some((k) => t.includes(k))) return key;
  }
  return 'generic';
}

export function buildRoadmapFromTemplate(templateKey: string, seriousness: 'curious' | 'learn' | 'master', question: string) {
  const SERIOUSNESS_MILESTONES = { curious: 2, learn: 4, master: 5 };
  const tmpl = TEMPLATES[templateKey];
  if (!tmpl) return null;
  const cap = SERIOUSNESS_MILESTONES[seriousness];
  const milestones = tmpl.milestones.slice(0, cap).map((m) => ({
    title: m.title,
    tasks: m.tasks.map((t) => ({ title: t.title, diff: t.diff, description: t.description, done: false })),
  }));
  const title = templateKey === 'generic' ? question.charAt(0).toUpperCase() + question.slice(1) : tmpl.title;
  return { id: Date.now().toString(), title, milestones };
}
