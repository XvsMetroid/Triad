# Copilot Instructions for Triad

## Project Overview
This repository contains the **Sovereign Triad** philosophical framework - a governance system based on three core principles: **Truth**, **Wisdom**, and **Humanity**. The project provides both human-readable philosophy (`sovereign_triad_corpus.md`) and machine-readable data (`triad_corpus.json`) for analysis and implementation.

## Core Architecture Patterns

### The Triad Structure
All content follows a three-pillar architecture:
- **Truth**: Evidence-based, verifiable reality (data integrity, transparency)
- **Wisdom**: Contextual application of truth (practical ethics, long-term thinking)
- **Humanity**: Human dignity and flourishing (individual agency, collective benefit)

When working with this codebase, ensure any additions or modifications align with all three principles simultaneously.

### The Fractal Pattern
The framework scales from individual → organizational → societal → global levels. When adding content or analysis, consider how concepts apply across these four scales. Reference the existing fractal sections in `sovereign_triad_corpus.md` for examples.

### The Feedback Loop Mechanism
The core operational pattern is: **Act → Measure → Learn → Adapt**.
- All proposals should include measurement criteria.
- Analysis should identify what can be learned from the current state.
- Recommendations should suggest adaptive mechanisms.

## Key Files and Their Purposes

### `sovereign_triad_corpus.md`
The authoritative source document containing the complete philosophical framework. It is structured in 8 main parts:
- Parts I-III: Foundational theory (Principles, Mechanisms, Fractal Architecture)
- Part IV: Concrete implementation proposals (P-01 through P-04)
- Parts V-VIII: Axioms, applications, limitations, and measurement challenges.

### `triad_corpus.json`
A machine-readable corpus where each paragraph from the `.md` file is an object with `section`, `subsection`, and `paragraph` metadata. Use this for:
- Data analysis and pattern recognition.
- Training or fine-tuning AI models.
- Programmatic content extraction and cross-referencing.
- **Note**: This file is a direct derivative of `sovereign_triad_corpus.md`. Changes in the markdown source should be reflected here.

### `README.md`
The user-facing documentation explaining the repository's purpose and structure.

## Content Conventions

### Implementation Proposals
Use the `P-XX` numbering format (e.g., `P-01`, `P-02`) for concrete implementation ideas. Each should specify:
- Which Triad principle(s) it primarily serves.
- The feedback loop mechanism it employs.
- How the Meta-Monitor would audit it.

### Foundational Sayings
Key philosophical quotes are numbered and include explanatory context. When adding new axioms, follow this pattern and ensure they don't contradict the "proto-principle" that "There is always an exception."

### Meta-Monitor Concept
Any proposed governance mechanism must include a "who watches the watchers" component. Always include oversight mechanisms that audit for alignment drift with the core principles.

## Development Guidelines

### When Adding Content
- Maintain philosophical coherence with the existing framework.
- Include measurement/validation considerations for any new proposal.
- Consider fractal scalability (does the concept work at all four levels?).
- Reference specific examples from real-world governance challenges.

### When Analyzing Data
- Use `triad_corpus.json` for quantitative analysis.
- Preserve the section/subsection context when extracting insights.
- Look for patterns across the fractal levels.
- Identify potential gaps or contradictions in the framework.

### When Creating Derivatives
- Cite the original Triad framework appropriately.
- Maintain the principle-based architecture (Truth, Wisdom, Humanity).
- Include adaptation mechanisms (Feedback Loops) rather than rigid rules.

## Critical Limitations to Consider
The framework acknowledges its own limitations in Part VIII of the corpus:
- It assumes rational actors and may not handle bad-faith participation well.
- It lacks a detailed theory for power transition or implementation against resistance.
- The principles require cultural translation while maintaining integrity.
- It provides the destination (an ideal state) but not the detailed journey.

When working with this codebase, be mindful of these constraints and avoid overstating the framework's completeness.