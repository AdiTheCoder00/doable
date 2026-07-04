import type { Diff, Milestone } from '../types';

const DIFF_TOKENS: Record<Diff, number> = { easy: 50, medium: 150, hard: 400 };
export const SERIOUSNESS_MILESTONES = { curious: 2, learn: 4, master: 5 };

function t(diff: Diff): number {
  return DIFF_TOKENS[diff];
}

function task(title: string, diff: Diff) {
  return { title, diff, tokens: t(diff), done: false };
}

interface Template {
  title: string;
  milestones: Milestone[];
}

const TEMPLATES: Record<string, Template> = {
  hackathon: {
    title: 'Crack a hackathon',
    milestones: [
      {
        title: 'Understand hackathons',
        tasks: [
          task('Read what a hackathon actually is and how judging works', 'easy'),
          task('Watch one winning project demo end-to-end', 'easy'),
          task('Join a hackathon community or Discord', 'easy'),
        ],
      },
      {
        title: 'Team building',
        tasks: [
          task('List 3 skills you bring to a team', 'easy'),
          task('Find or form a team of 2\u20134 people', 'medium'),
          task('Agree on roles (build, design, pitch)', 'medium'),
        ],
      },
      {
        title: 'Idea selection',
        tasks: [
          task('Brainstorm 5 problem ideas', 'easy'),
          task('Pick one idea and write a 3-line pitch', 'medium'),
          task('Sketch the core user flow', 'medium'),
        ],
      },
      {
        title: 'Build',
        tasks: [
          task('Set up your repo and dev environment', 'medium'),
          task('Build a working core feature', 'hard'),
          task('Cut scope \u2014 ship an MVP, not the dream version', 'hard'),
        ],
      },
      {
        title: 'Submission & demo',
        tasks: [
          task('Record a 2-minute demo video', 'medium'),
          task('Write your submission summary', 'medium'),
          task('Submit before the deadline', 'easy'),
        ],
      },
    ],
  },
  resume: {
    title: 'Write a strong resume',
    milestones: [
      {
        title: 'Gather your material',
        tasks: [
          task("List every project, job, and win from the last 2 years", 'easy'),
          task("Pick the target role you're writing this for", 'easy'),
        ],
      },
      {
        title: 'Draft the content',
        tasks: [
          task('Write 3 bullet points per experience using numbers', 'medium'),
          task('Draft your summary line', 'medium'),
        ],
      },
      {
        title: 'Design & format',
        tasks: [
          task('Pick a clean one-page template', 'easy'),
          task('Format consistently \u2014 fonts, spacing, dates', 'medium'),
        ],
      },
      {
        title: 'Get feedback',
        tasks: [
          task('Get one person to review it', 'medium'),
          task('Run it through a proofread pass', 'easy'),
        ],
      },
      {
        title: 'Finalize',
        tasks: [
          task('Export as PDF and check it opens correctly', 'easy'),
          task('Send it to your first application', 'medium'),
        ],
      },
    ],
  },
  interview: {
    title: 'Prep for interviews',
    milestones: [
      {
        title: 'Research the role',
        tasks: [
          task('Read the job description line by line', 'easy'),
          task("Research the company's product and recent news", 'easy'),
        ],
      },
      {
        title: 'Practice core questions',
        tasks: [
          task("Write out your 'tell me about yourself' answer", 'medium'),
          task('Prepare 3 STAR stories', 'medium'),
        ],
      },
      {
        title: 'Mock interviews',
        tasks: [
          task('Do one mock interview with a friend', 'hard'),
          task('Record yourself answering and review it', 'medium'),
        ],
      },
      {
        title: 'Technical prep',
        tasks: [
          task('Solve 3 practice problems relevant to the role', 'hard'),
          task('Review your own past projects out loud', 'medium'),
        ],
      },
      {
        title: 'Follow up',
        tasks: [
          task('Prepare 3 questions to ask the interviewer', 'easy'),
          task('Send a thank-you note after the interview', 'easy'),
        ],
      },
    ],
  },
  coding: {
    title: 'Sharpen DSA / coding skills',
    milestones: [
      {
        title: 'Fundamentals recap',
        tasks: [
          task('Review arrays, strings, and hashmaps', 'easy'),
          task('Review recursion and time complexity basics', 'medium'),
        ],
      },
      {
        title: 'Pattern practice',
        tasks: [
          task('Solve 3 two-pointer problems', 'medium'),
          task('Solve 3 sliding-window problems', 'medium'),
        ],
      },
      {
        title: 'Timed mocks',
        tasks: [
          task('Do a 45-minute timed mock, 2 problems', 'hard'),
          task('Review what slowed you down', 'medium'),
        ],
      },
      {
        title: 'Weak areas',
        tasks: [
          task('Pick your weakest topic and drill it', 'hard'),
          task('Redo 2 problems you failed, from scratch', 'medium'),
        ],
      },
      {
        title: 'Interview simulation',
        tasks: [
          task('Full mock interview with a peer', 'hard'),
          task('Write down 3 things to improve next round', 'easy'),
        ],
      },
    ],
  },
  fitness: {
    title: 'Build a consistent workout habit',
    milestones: [
      {
        title: 'Set your baseline',
        tasks: [
          task('Write down your current activity level honestly', 'easy'),
          task('Pick 3 days a week you can actually commit to', 'easy'),
        ],
      },
      {
        title: 'Build the routine',
        tasks: [
          task('Choose a simple 30-minute workout plan', 'medium'),
          task('Do workout #1', 'medium'),
        ],
      },
      {
        title: 'Consistency phase',
        tasks: [
          task('Complete workout #2 and #3 this week', 'medium'),
          task('Log how each session felt', 'easy'),
        ],
      },
      {
        title: 'Progressive overload',
        tasks: [
          task('Increase reps or weight slightly', 'hard'),
          task('Do a full second week without missing a day', 'hard'),
        ],
      },
      {
        title: 'Track & adjust',
        tasks: [
          task('Review 2 weeks of logs and adjust the plan', 'medium'),
          task('Set your next 2-week target', 'easy'),
        ],
      },
    ],
  },
  generic: {
    title: '',
    milestones: [
      {
        title: 'See the shape of it',
        tasks: [
          task("Find one beginner-level tutorial or doc page and skim only the headings \u2014 don't read the content yet", 'easy'),
          task('Write down, in your own words, the 3 sub-topics that keep showing up', 'easy'),
        ],
      },
      {
        title: 'Do the smallest real thing',
        tasks: [
          task('Copy one beginner example exactly and get it to actually run or work', 'medium'),
          task('Change one small part of that example and see what breaks', 'medium'),
        ],
      },
      {
        title: 'Build without the example',
        tasks: [
          task('Redo the same small thing from memory, without looking at the tutorial', 'medium'),
        ],
      },
      {
        title: 'Stretch it',
        tasks: [
          task('Combine two of the sub-topics you wrote down into one slightly bigger attempt', 'medium'),
          task('Get one person to look at what you made and ask you one question about it', 'hard'),
        ],
      },
      {
        title: 'Lock it in',
        tasks: [
          task('Explain what you learned out loud, in under 2 minutes, with no notes', 'easy'),
          task('Pick the next specific sub-topic to go deeper on', 'easy'),
        ],
      },
    ],
  },
  python: {
    title: 'Get started with Python basics',
    milestones: [
      {
        title: 'Variables & data types',
        tasks: [
          task('Write a script that stores your name (string), age (int), and height (float) in variables and prints all three', 'easy'),
          task('Use type() on each variable and print the result, so you can see str vs int vs float', 'easy'),
        ],
      },
      {
        title: 'Conditionals',
        tasks: [
          task('Write a program that takes a number and prints "even" or "odd"', 'easy'),
          task('Build a grade calculator using if / elif / else for at least 4 grade bands', 'medium'),
        ],
      },
      {
        title: 'Loops',
        tasks: [
          task('Use a for loop to print the first 10 numbers of the Fibonacci sequence', 'medium'),
          task('Build a number-guessing game using a while loop and input()', 'medium'),
        ],
      },
      {
        title: 'Functions',
        tasks: [
          task("Write a function that reverses a string without using [::-1] or reversed()", 'medium'),
          task('Turn your grade calculator into a function that takes a score and returns a grade', 'hard'),
        ],
      },
      {
        title: 'Put it together',
        tasks: [
          task('Build a small terminal to-do list: add, view, and remove items using a list and functions', 'hard'),
          task("Add input validation so it doesn't crash on bad input", 'hard'),
        ],
      },
    ],
  },
  sql: {
    title: 'Get started with SQL',
    milestones: [
      {
        title: 'Reading data',
        tasks: [
          task('Write a SELECT with a WHERE clause on a sample table (even a spreadsheet imported into SQLite works)', 'easy'),
          task('Sort results with ORDER BY and limit them with LIMIT', 'easy'),
        ],
      },
      {
        title: 'Filtering & grouping',
        tasks: [
          task('Use GROUP BY with COUNT() or SUM() to summarize a column', 'medium'),
          task('Add a HAVING clause to filter on the grouped result, not the raw rows', 'medium'),
        ],
      },
      {
        title: 'Joins',
        tasks: [
          task('Write an INNER JOIN across two related tables and explain in one sentence what it returns', 'medium'),
          task('Write a LEFT JOIN on the same tables and explain how the result differs', 'hard'),
        ],
      },
      {
        title: 'Writing data',
        tasks: [
          task('Write an INSERT, an UPDATE with a WHERE clause, and a DELETE with a WHERE clause', 'medium'),
        ],
      },
      {
        title: 'Put it together',
        tasks: [
          task('Answer one real question about a dataset you care about using a single query with a JOIN and a GROUP BY', 'hard'),
        ],
      },
    ],
  },
  webdev: {
    title: 'Get started with web development',
    milestones: [
      {
        title: 'HTML structure',
        tasks: [
          task('Build a single page with a heading, a paragraph, a list, and an image using only HTML', 'easy'),
          task('Add a form with a text input and a button, no styling yet', 'easy'),
        ],
      },
      {
        title: 'CSS styling',
        tasks: [
          task('Style that page: colors, fonts, spacing, using a class-based CSS file', 'medium'),
          task('Make the layout responsive using flexbox for at least one section', 'medium'),
        ],
      },
      {
        title: 'JavaScript basics',
        tasks: [
          task('Make the button change the text on the page when clicked', 'medium'),
          task('Read the value out of the text input and display it somewhere on the page', 'medium'),
        ],
      },
      {
        title: 'Put it together',
        tasks: [
          task('Build a small to-do list: add an item from the input and show it in the list', 'hard'),
          task('Add a way to delete an item from the list', 'hard'),
        ],
      },
    ],
  },
};

export default TEMPLATES;
