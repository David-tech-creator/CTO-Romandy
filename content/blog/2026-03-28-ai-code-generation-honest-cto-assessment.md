---
title: "AI Code Generation: An Honest CTO Assessment"
excerpt: "The hype has settled. Here's where AI coding tools are delivering real gains — and where they're still creating more work than they save."
date: "2026-03-28"
category: "AI & Automation"
coverImage: "/agentic12.png"
---

## The Question Has Shifted

A year ago, every CTO in our network was being asked the same thing: are your engineers using Copilot? Today, the question has changed — *how are you governing it?*

That shift tells you something. The tools are real. The productivity gains are real in specific contexts. But so is the new class of problems they introduce.

Here's what we're actually seeing in Geneva and Romandy's tech companies, not what the vendors are saying.

## Where It Actually Works

**Boilerplate and scaffolding.** If your engineers are writing CRUD endpoints, migration scripts, or test fixtures, AI assistants cut that time by 60–70%. This is real and significant. Work that used to take an afternoon takes an hour.

**Code explanation and documentation.** This is underrated. Onboarding new engineers to a legacy codebase? Having them walk through the code with an AI assistant that explains context is genuinely useful. It's not perfect, but it's better than nothing.

**First drafts of regex and SQL.** Writing a complex SQL query or a regex pattern from scratch is slow even for experienced engineers. Getting a first draft from Copilot and then verifying it is significantly faster than the blank-page approach.

## Where It Creates Problems

**Test generation with teeth.** AI-generated tests tend to test the implementation, not the behavior. Engineers reviewing AI-generated test suites often approve them because they look complete. They pass on every run. They also don't catch the bugs that matter.

**Over-confident completions in unfamiliar domains.** When a junior engineer asks Claude to write authentication code, they often get something that looks correct and is mostly correct — except for the one subtle session management issue that gets discovered in production six months later.

**Code review fatigue.** When AI generates more code faster, review queues grow. If your review culture wasn't strong before AI adoption, it gets worse. Senior engineers become bottlenecks. This is the most common complaint we hear from CTOs who rolled out Copilot without addressing the review process first.

## What Swiss Companies Are Getting Right

The companies in our community that are getting the most value share a few patterns.

They treat AI-generated code differently in review. Some are using AI to review AI — running a secondary check that specifically looks for security issues and behavioral gaps.

They've updated their onboarding to include AI tool training. Not just "here's how to use it" — but "here's how it fails, here's how to verify what it generates."

They've accepted that estimates don't work the same way. Velocity appears to go up, but the shape of the work changes. Time saved on generation often gets absorbed in verification. The net gain is real but smaller than promised.

## The Honest Number

Across the companies we've talked to: genuine productivity gains of 15–25% for experienced engineers, 30–40% for boilerplate-heavy work. Not the 10x that's being marketed. But 20% across an engineering team compounds. It's worth pursuing, with eyes open.

## What to Do Now

If you haven't rolled out AI coding tools: start with a structured pilot on one team, one codebase. Measure review time, not just generation time.

If you have rolled it out: audit what your tests are actually testing. AI-generated test suites are a specific risk that's easy to miss until it isn't.

If you're being asked by your board whether you're "using AI": the better answer isn't yes or no — it's describing the specific workflows you've changed and what you measured.

That's it. The tools are good enough to use and imperfect enough to respect. Both are true.
