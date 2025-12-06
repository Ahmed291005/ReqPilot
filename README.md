# ReqPilot Chat 🤖

ReqPilot Chat is an AI assistant for software requirement gathering built with Next.js and Google's Gemini models via Genkit. It helps you brainstorm and refine software requirements through an intuitive conversational interface.

## ✨ Features

- **📝 Conversational Requirement Generation**: Describe your app idea in plain English. The AI assistant will ask clarifying questions to elicit and build a cumulative list of requirements.
- **🔄 Iterative Refinement**: Continue the conversation to add, remove, or modify requirements based on your feedback.
- **📊 Requirement Classification**: Automatically classify the gathered requirements into `functional`, `non-functional`, `domain`, and `inverse` categories.
- **📄 Dashboard & Export**: View all classified requirements in a clean dashboard and export the list as a PDF document.
- **📱 Fully Responsive**: A clean and intuitive layout that works on both desktop and mobile devices.
- **🎨 Light/Dark Mode**: Toggle between light and dark themes for your comfort.

## ✨ Interface

<img width="1366" height="639" alt="image" src="https://github.com/user-attachments/assets/1ba856bc-2979-47e7-95f8-282c9255f031" />
<img width="1363" height="570" alt="image" src="https://github.com/user-attachments/assets/31df0952-5eee-4c36-9f44-cbfbf3ec8f4f" />

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI/Generative**: [Google's Gemini](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **UI**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or another package manager

### Installation

1. **Set up your API Key:**
   - Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Create a file named `.env` in the root of the project.
   - Add your API key to the `.env` file like this:
     ```
     GEMINI_API_KEY="YOUR_API_KEY_HERE"
     ```

2. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/reqpilot.git
   cd reqpilot
   ```

3. **Install NPM packages:**
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the application.

The page will auto-update as you edit the files.

### Genkit Development

This project uses Genkit to manage AI flows. To start the Genkit development server and inspect your flows, run:

```bash
npm run genkit:dev
```

This will start the Genkit UI at [http://localhost:4000](http://localhost:4000).
