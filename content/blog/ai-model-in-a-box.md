---
title: "Put the AI model in a box"
description: "Two days, three AI providers, one locked account. What building RasteScan taught us about trusting AI in real software."
date: 2026-11-19
category: AI
tags: [ai, llm, architecture, rastescan]
cover: /images/projects/rastescan/queue.jpg
---

A news thumbnail said *"Another victim of neglected roads"*. The word **another** stuck. That headline became [RasteScan](/projects/rastescan/), a public record of road damage built by four students, from a citizen's photo to the proof of repair.

AI sits right in the middle of it: a vision model looks at each photo and describes the damage. And in two days of building, the AI side tried very hard to ruin our week.

## What happened

- One provider's account was locked.
- A model we were using was shut down.
- A third provider's reasoning models needed their own special handling.

All inside 48 hours. If our rules had lived inside one provider's prompt, we would have rewritten them three times.

They didn't. They lived in plain code.

## The model suggests. The server decides.

A vision model is good at *describing* a hole. We never let it decide how *urgent* the hole is. It returns a severity score; a few lines of ordinary Python do the rest:

```python
def urgency_for(result: Detection) -> Urgency:
    if result.hazard_type == "Open Manhole":
        return "CRITICAL"
    s = result.severity_score
    if s >= 9.0:
        return "CRITICAL"
    if s >= 7.0:
        return "HIGH"
    if s >= 4.0:
        return "MEDIUM"
    return "LOW"
```

An open manhole is always critical, whatever the model says. That one line removes a whole class of failure.

## Five habits we now use everywhere

1. **One interface, many providers.** The model sits behind a single function. Switching provider is configuration, not a rewrite.
2. **Strict schemas.** Every answer must pass a schema (Pydantic). If it fails, retry once, then ask the user to try again.
3. **Unsure goes to a person.** Under 60% confidence, a report waits for human review before it is published.
4. **A busy AI loses nothing.** Reports are saved as *waiting* and a background worker finishes them later.
5. **The price is arithmetic.** The model measures; the server calculates the repair cost. Models are not calculators.

## And one habit about honesty

Every demo report carries a *Demo* badge, and test mode says so on screen. A civic tool lives on trust, so it should always be easy to see what is real.

The same applies to any business adding AI: customer support, document reading, product descriptions. Let the model do what it is good at, and keep the decisions where you can test them.

*Thinking about an AI feature for your product? [Tell us about it](/start-a-project/?type=ai-automation).*
