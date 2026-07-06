# Doable

**Doable** is an AI-powered task completion and habit-tracking platform designed for builders. Unlike traditional AI tools that just give you answers, Doable breaks your goals down into actionable, step-by-step roadmaps that you have to complete yourself.

As you complete steps and prove your work, you build streaks, earn rewards, and watch an interactive 3D island grow and evolve based on your real-world progress!

## ✨ Key Features

- **AI-Powered Roadmaps:** Type any goal (e.g., "Build a landing page"), and Doable creates a concrete, step-by-step plan for you to execute.
- **Interactive 3D World:** Every task you complete adds a new building to your personal 3D island. Your island has a memory—it grows and persists as you accomplish more goals over time.
- **Proof of Work:** No shortcuts allowed. To complete a step, you must submit a screenshot or a short note proving you actually did the work.
- **Gamification & Streaks:** Maintain daily streaks, track your history, and unlock new visual themes (Warm, Forest, Night) as you hit task completion milestones.
- **Beautiful, Fluid UI:** A premium, glassmorphic interface powered by Framer Motion, featuring smooth micro-interactions and dark mode support.
- **Local Persistence:** Your progress, roadmaps, chat logs, and 3D world state are automatically saved to your browser so you never lose your work.

## 🛠 Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS Modules
- **3D Rendering:** Three.js (`@react-three/fiber`, `@react-three/drei`)
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdiTheCoder00/doable.git
   ```
2. Navigate to the project directory:
   ```bash
   cd doable
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to view the app.

### Building for Production

To create a production build:
```bash
npm run build
```
This will generate optimized static files in the `dist` directory.

## 🎨 Themes & Customization

Doable uses a robust CSS variable system (`src/index.css`) attached to the `<html>` tag to handle theming. As users complete tasks, they unlock new themes which automatically swap out background colors, elevation layers, and accent colors across the entire UI.

## 📜 License

This project is licensed under the MIT License.
