[Content AI](/docs/content-ai/getting-started/overview)

Copy markdownAsk AI

# Build AI-powered editors

Learn how to build AI-powered editors through guides, API references, and integration examples.

## [](#get-started)Get started

Tiptap offers two frontend extensions that integrate directly into your editor.

![AI Toolkit](/docs/_next/static/media/ai-toolkit.168345aa.svg)

Paid add-on

### AI Toolkit

Provides tool definitions for AI agents to read, insert, and patch editor content. Includes document chunking, schema-aware generation, real-time streaming, and suggestion-based reviews.

[Documentation](/docs/content-ai/capabilities/ai-toolkit/overview)[Use cases](/docs/content-ai/capabilities/use-cases)

![Server AI Toolkit](/docs/_next/static/media/ai-toolkit.168345aa.svg)

Restricted release

### Server AI Toolkit

Build AI agents that can read and edit Tiptap documents on the server. Enable background document processing and AI-powered document workflows.

[Documentation](/docs/content-ai/capabilities/server-ai-toolkit/overview)

![AI Generation](/docs/_next/static/media/ai-generation.230843ea.svg)

Start

### AI Generation

Executes built-in or custom text commands (summarize, rephrase, translate) with streaming responses. Includes Tab-triggered autocompletion and response management.

[Documentation](/docs/content-ai/capabilities/generation/overview)[Use cases](/docs/content-ai/capabilities/use-cases)

## [](#explore-use-cases)Explore use cases

Explore technical implementations for AI-powered editing. Build AI agents with document-editing capabilities like chatbots, inline edits, and proofreading, or add simple AI commands like autocompletion, translation, and summarization.

[

View use cases

](/docs/content-ai/capabilities/use-cases)

## [](#use-your-own-ai-infrastructure)Use your own AI infrastructure

All extensions support custom AI infrastructure where no data is sent to Tiptap:

-   **AI Toolkit**: Framework-agnostic. Works with Vercel AI SDK, LangChain, OpenAI SDK, Anthropic SDK, or your own implementation. [Learn more](/docs/content-ai/capabilities/ai-toolkit/overview)

-   **AI Generation**: Connect your own LLM by overriding the resolver. Alternatively, use Tiptap AI server as middleware to OpenAI (currently supports OpenAI models only). [Learn more](/docs/content-ai/capabilities/generation/custom-llms)


**Privacy and security:** When using the Tiptap AI backend with AI Generation, learn how we handle AI data processing and content privacy in our [privacy documentation](/docs/content-ai/resources/privacy).

## [](#legacy-extensions)Legacy extensions

[AI Suggestion](/docs/content-ai/capabilities/suggestion/overview), [AI Changes](/docs/content-ai/capabilities/changes/overview), and [AI Assistant](/docs/content-ai/capabilities/agent/overview) are being deprecated in 2026 and will be replaced by AI Toolkit. These extensions receive no new features and are maintained for existing users only.

**Migrating to AI Toolkit:** The AI Toolkit provides superior capabilities for AI agent workflows. [View migration guides](/docs/content-ai/capabilities/ai-toolkit/migration-guides) to learn how to transition your application.

### Migration support

Get hands-on help migrating your content as part of Business or Enterprise onboarding in a dedicated Slack channel.

[Talk to an engineer](https://tiptap.dev/contact-sales?form=ai-toolkit)

Trusted by Axios, PostHog, Beehiiv, GitLab and more.

[Next upUse cases](/docs/content-ai/capabilities/use-cases)
