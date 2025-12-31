[Content AI](/docs/content-ai/getting-started/overview)/

[AI Extensions](/docs/content-ai/capabilities/ai-toolkit)/

[AI Toolkit](/docs/content-ai/capabilities/ai-toolkit)

Copy markdownAsk AI

# AI Toolkit

Paid add-onBeta

The AI Toolkit is a set of tools that enables your AI to work with Tiptap documents.

Use it to build AI agents with document-editing superpowers. Or add custom AI functionality to the Tiptap editor with its flexible primitives.

**Try the AI Toolkit** in action with this interactive demo featuring an AI agent that can read, edit, and manipulate documents.

[Full screen](https://template.tiptap.dev/page-ai-toolkit)|[Learn more](/docs/content-ai/capabilities/ai-toolkit/live-demo)

## [](#core-capabilities)Core Capabilities

The AI Toolkit provides two complementary approaches to building AI features:

-   **AI agent tools** for building agents capable of complex tasks.
-   **Workflows** where the AI has a single, well-defined task.

It also includes **primitives** for building custom AI tools and workflows.

### Compatible with any AI model

Use the AI Toolkit with any AI model capable of producing text, including open source and self-hosted models.

### [](#ai-agent-tools)AI Agent Tools

Pre-built tools that allow your AI agent to interact with documents. When your LLM decides to call a tool, the AI Toolkit handles the execution.

[

#### Execute Tool (AI Agents)

More →

Lets your AI agent read, insert, and patch document content through tool calls. Includes built-in tools for all document operations.

](/docs/content-ai/capabilities/ai-toolkit/primitives/execute-tool)[

#### Tool Definitions

All tools →

Framework-specific tools for AI agents built with the Vercel AI SDK, LangChain, OpenAI, Anthropic, Mastra, and more.

](/docs/content-ai/capabilities/ai-toolkit/tools/available-tools)

### [](#workflows)Workflows

Built-in utilities for simple document editing tasks.

[

#### Proofreader

More →

Detect and correct mistakes in your Tiptap documents.

](/docs/content-ai/capabilities/ai-toolkit/workflows/proofreader)

### [](#primitives)Primitives

Low-level methods for building custom AI features. Use these when you need fine-grained control over how AI interacts with documents, or when building features beyond standard agent workflows.

[

#### Read the Document

More →

Extract document content in AI-friendly formats with chunking and selection support.

](/docs/content-ai/capabilities/ai-toolkit/primitives/read-the-document)[

#### Edit the Document

More →

Insert, replace, or patch content with streaming and automatic position management.

](/docs/content-ai/capabilities/ai-toolkit/primitives/edit-the-document)[

#### Schema Awareness

More →

Help AI models generate valid content based on your custom nodes and marks.

](/docs/content-ai/capabilities/ai-toolkit/primitives/schema-awareness)[

#### Display Suggestions

More →

Show AI changes as suggestions users can accept or reject.

](/docs/content-ai/capabilities/ai-toolkit/primitives/display-suggestions)[

#### Compare Documents

More →

Generate real-time diffs between document versions.

](/docs/content-ai/capabilities/ai-toolkit/primitives/compare-documents)[

#### Diff Utility

More →

Calculate differences between documents with granular control over comparison logic.

](/docs/content-ai/capabilities/ai-toolkit/primitives/diff-utility)

### Add AI Toolkit to your subscription

Integrate the AI Toolkit by purchasing the paid subscription add-on. We can guide your integration with dedicated engineering support via Slack.

[Talk to an engineer](https://tiptap.dev/contact-sales?form=ai-toolkit)

Trusted by Axios, PostHog, Beehiiv, GitLab and more.

## [](#guides-and-examples)Guides and Examples

The AI Toolkit provides flexible building blocks rather than prescribing a single approach to implementation. Start by envisioning the feature you want to create, then use the toolkit's methods to bring it to life. These guides showcase practical examples to inspire and inform your own implementation.

### [](#quickstart-guides)Quickstart Guides

[

### AI Agent Chatbot

Build a conversational AI that reads and edits documents through chat. Includes streaming, tool execution, and conversation management.

](/docs/content-ai/capabilities/ai-toolkit/guides/ai-agent-chatbot)[

### Review Changes

Display AI-generated edits as suggestions users can accept or reject. Implements a Google Docs-style review workflow.

](/docs/content-ai/capabilities/ai-toolkit/guides/review-changes)[

### Review Changes as Summary

Show a text summary of all AI changes instead of inline suggestions. Useful for bulk edits or high-level review.

](/docs/content-ai/capabilities/ai-toolkit/guides/review-changes-as-summary)[

### Tool Streaming

Stream AI tool calls in real-time to show users what the AI is doing. Improves perceived performance and transparency.

](/docs/content-ai/capabilities/ai-toolkit/guides/tool-streaming)[

### Inline Edits

Replace selected text with AI-generated content. Perfect for rewriting, summarizing, or transforming specific sections.

](/docs/content-ai/capabilities/ai-toolkit/guides/inline-edits)

### [](#advanced-guides)Advanced Guides

[

### Selection Awareness

Make AI operations context-aware by passing only selected content. Reduces token usage and improves relevance.

](/docs/content-ai/capabilities/ai-toolkit/advanced-guides/selection-awareness)[

### Multi-Document AI Agent

Build an agent that works across multiple documents simultaneously. Includes document switching and cross-document context.

](/docs/content-ai/capabilities/ai-toolkit/advanced-guides/multi-document)[

### Add Comments

Have AI insert comments and annotations into documents. Useful for feedback, suggestions, or collaborative editing.

](/docs/content-ai/capabilities/ai-toolkit/advanced-guides/comments)[

### AI Engineering Guide

Best practices for prompting, error handling, and performance optimization when building AI document features.

](/docs/content-ai/capabilities/ai-toolkit/advanced-guides/ai-engineering)[

### Style Suggestions

Implement AI-powered writing style suggestions. Helps users improve clarity, tone, and consistency.

](/docs/content-ai/capabilities/ai-toolkit/advanced-guides/style-suggestions)

[PreviouslyAI Toolkit](/docs/content-ai/capabilities/ai-toolkit)

[Next upInstall](/docs/content-ai/capabilities/ai-toolkit/install)
