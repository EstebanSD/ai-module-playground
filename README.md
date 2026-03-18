# AI Module Playground

A small playground application used to experiment with AI-powered
endpoints such as summarization, classification, keyword extraction, and
SEO metadata generation.

The project focuses on clean architecture, modular backend design, and
modern frontend patterns for working with LLM APIs and streaming
responses.

This repository exists primarily to validate backend AI capabilities and prompt behavior.

---

## Overview

This project is a lightweight playground used to test and experiment with the AI module implemented in the backend.

It provides a simple interface to run prompts, inspect responses, and validate streaming behavior from AI endpoints such as summarization, classification, keyword extraction, and SEO metadata generation.

The application is intended as a development tool rather than a production product.

---

## Features

### Text Generation

- Text summarization
- Text classification
- Keyword extraction
- SEO metadata generation

### Streaming Generation

Some endpoints support **streaming responses** using Server-Sent Events (SSE).  
Instead of returning the full response at once, the model output is emitted incrementally as it is generated.

This allows the UI to display tokens progressively, improving perceived responsiveness and making it easier to inspect the generation process.

### Metrics Display

Each generation request returns basic metrics:

- Provider
- Model
- Input tokens
- Output tokens
- Total tokens

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- React Hook Form
- Zod validation
- shadcn/ui components

---

## Example Endpoints

### Standard Generation

POST /ai/summary
POST /ai/classify
POST /ai/keywords
POST /ai/seo-meta

### Streaming Generation

GET /ai/summary/stream
GET /ai/classify/stream
GET /ai/keywords/stream
GET /ai/seo-meta/stream

Streaming responses use Server-Sent Events (SSE).

Example event:

event: delta
data: { "delta": "Hello" }

event: done
data: { "done": true }

---

## Purpose of the Playground

This project exists to:

- test AI prompts
- experiment with streaming responses
- prototype new AI features
- evaluate prompt quality
- inspect model metrics

It is intended as a development sandbox for AI integrations.

---

## Possible Future Improvements

- Chat interface
- Streaming UI optimizations
- Token cost estimation
- Multiple provider support
- Prompt versioning
- Observability and tracing

---

## License

[MIT](LICENSE)
