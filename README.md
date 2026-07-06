# 🚀 Doable
### *The Missing Layer Between AI and Execution*

> **Built for the Not Your College (NYC) CodeQuest Hackathon 2026**

---

## 🌍 Overview

Every day, millions of people ask AI questions like:
- *How do I learn Web Development?*
- *How do I prepare for a Hackathon?*
- *How do I crack interviews?*
- *How do I stay consistent?*

AI provides excellent answers, yet most users never take the first step. The problem isn't finding information anymore; the problem is **executing it consistently.** That observation led us to build **Doable**.

---

## ❌ The Problem

Modern AI assistants are incredible at generating knowledge. They can explain concepts, generate roadmaps, and answer almost anything. However, they all stop at the same place: **The answer.**

Once the conversation ends, there is no accountability, no structured execution, no progress tracking, and no motivation to continue. Users often read the response, bookmark it, promise to start tomorrow, and completely forget about it. Days later, they ask the exact same question again. 

The gap between **knowing** and **doing** is what inspired Doable. We realized that information without execution is just entertainment. People don't need another chatbot that gives them a list of 50 things to do—they need a system that forces them to do the very first thing on that list.

---

## 💡 Our Solution

Instead of acting like another chatbot, Doable transforms every goal into a guided journey. Whether your goal is to learn React, participate in a hackathon, or build a portfolio, Doable doesn't just explain it. It helps you finish it.

**Doable is AI + Planner + Accountability.**

By merging the intelligence of Large Language Models with the psychological hooks of gamification and accountability, Doable creates an environment where you are highly incentivized to actually do the work.

---

## ⚙️ How Doable Works

1. **Describe your goal**: Simply tell the AI what you want to achieve (e.g., "I want to participate in a Hackathon.")
2. **AI Generates a Roadmap**: The AI understands your objective and generates a clear explanation, a structured roadmap, and small, actionable tasks.
3. **Focus on one task**: Instead of overwhelming you with dozens of steps, Doable unlocks progress one task at a time. You cannot see or start step 2 until step 1 is done.
4. **Submit Proof**: After completing a task, you must upload proof of completion (e.g., a screenshot of your code, a link to your repo, or a summary note) to unlock the next step. No shortcuts allowed.
5. **Build your world**: Instead of meaningless points or badges, every completed task contributes to building a personalized virtual 3D world. Your empty canvas slowly transforms into a bustling island, serving as a powerful visual reminder that consistency creates progress.

---

## ✨ What Makes Doable Different?

Most productivity tools answer one of two questions: *What should I do?* (To-do lists, Notion, Trello) or *What have I completed?* (Habit trackers, GitHub contribution graphs).

Doable focuses on a fundamentally different question: **How do we help users actually finish what they start?** Our platform bridges the gap by combining AI guidance, structured step-by-step planning, strict accountability, and tangible progress visualization into one seamless, premium experience.

---

## 🎯 Key Features

- **🤖 AI Workspace**: Generate personalized, highly accurate roadmaps from natural language goals using advanced prompt engineering.
- **📍 Smart Planning**: Break large, intimidating goals into incredibly small, achievable milestones.
- **📋 Guided Task Flow**: Complete one step at a time without feeling overwhelmed. The UI is designed to keep you focused purely on the immediate next action.
- **📷 Proof Submission**: Upload proof after completing tasks to maintain strict accountability with yourself.
- **🌍 Interactive 3D World**: Every completed task drops a new building onto your personal island. Watch your world grow in real-time using Three.js and React Three Fiber.
- **📊 Detailed Dashboard**: Track your Current Goal, Overall Progress, Activity Streaks, and Growth from one centralized hub.
- **🎨 Unlockable Themes**: Earn completely new visual aesthetics (Warm, Forest, Night) as you hit task completion milestones.
- **🔐 Local-First Architecture**: Your roadmaps, chat logs, and 3D world state are automatically and securely saved to your browser's local storage. No login required to start.
- **⚡ Smooth User Experience**: Premium glassmorphic interface powered by Framer Motion, featuring micro-interactions and extremely fluid transitions.

---

## 🏗 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Vanilla CSS Modules, shadcn/ui, Radix UI
- **Animation**: Framer Motion, React Spring
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Icons**: Lucide React
- **State Management**: React Hooks & Context API

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── AIWorkspace/       # Chat interface and roadmap generation
│   ├── Dashboard/         # User statistics and streak tracking
│   ├── Landing/           # Hero section and marketing pages
│   ├── Navbar/            # Application navigation
│   ├── ProofModal/        # Task completion & proof upload UI
│   ├── ShapeGrid/         # Animated background patterns
│   ├── ui/                # Reusable shadcn/ui and React Bits components
│   └── World/             # 3D Three.js interactive canvas
├── context/               # Global state (Themes, Tasks, App routing)
├── hooks/                 # Custom React hooks
├── styles/                # Global CSS and Tailwind directives
└── utils/                 # Helper functions and constants
```

---

## 🚀 Running Locally

To get a local copy up and running, follow these simple steps.

**Prerequisites:**
Ensure you have Node.js (v16 or higher) installed.

**Installation:**
```bash
# Clone the repository
git clone https://github.com/AdiTheCoder00/doable.git

# Navigate to the project directory
cd doable

# Install all dependencies
npm install

# Start the local development server
npm run dev
```

**Production Build:**
```bash
# Compile and optimize for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔮 Future Scope

Although this is an MVP built rapidly during the NYC CodeQuest Hackathon, the platform has significant potential for future expansion:

- **AI Proof Verification**: Integrate Computer Vision models to automatically analyze screenshots and verify if the user actually did the work before unlocking the next step.
- **Adaptive Roadmaps**: Plans that dynamically evolve—if a user struggles with a step, the AI automatically breaks that step down into three easier sub-steps.
- **AI Memory & Context**: Remember a user's previous goals, learning speed, and preferences to highly personalize future roadmaps.
- **Calendar Integration**: Two-way sync with Google Calendar to block out time for tasks.
- **GitHub Integration**: Automatically verify commits and PRs for coding-related goals without needing manual proof submission.
- **Team Accountability**: Build goals with friends or teammates (e.g., "Build a startup together") where the 3D world grows based on collective effort.
- **Mobile Application**: Native Android and iOS support to submit proof via mobile camera.
- **Community Challenges**: Join public challenges (e.g., "100 Days of Code") and see everyone's 3D islands growing together.

---

## 🎯 Our Vision & Team

We believe AI should not stop after giving an answer. It should continue until the goal is achieved. Our long-term vision is to build the ultimate execution-focused platform that helps users transform knowledge into consistent action.

**Built with ❤️ by Team AXEN for the Not Your College (NYC) CodeQuest Hackathon.**

> **Doable is an AI-powered execution platform that transforms goals into structured action through planning, accountability, and visual progress.**
