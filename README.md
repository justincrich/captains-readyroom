# Captain's Ready Room

A Next.js application that provides advice in the style of Captain Jean-Luc Picard from Star Trek through a streaming AI interface using Anthropic's Claude API.

## Features

- Real-time streaming responses from Claude AI
- Styled interface inspired by LCARS (Star Trek computer interface)
- Save responses to Captain's Log
- Light/Dark mode toggle

## Setup

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file with your Anthropic API key:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technical Implementation

The application uses:
- Next.js App Router
- Streaming responses via the Vercel AI SDK
- Anthropic Claude API for AI responses
- Tailwind CSS for styling
- Shadcn/UI components

The streaming implementation allows for real-time character-by-character display of Claude's responses, enhancing the interactive experience.

## API Usage

The application connects to Claude via a serverless API route (`/api/claude`) that uses streaming responses for an optimal user experience. 