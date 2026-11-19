---
title: "Fewer, bigger services win early"
description: "Microservices look great on a whiteboard. For a young product, fewer and bigger services usually ship faster and break less."
date: 2026-11-19
category: Architecture
tags: [microservices, architecture]
---

Microservices are fun to draw. Ten neat boxes, each with one job. It looks like a grown-up architecture.

Then you have to deploy, monitor, back up, secure and debug ten boxes. Every arrow between them is a network call that can fail.

## The trap

A young product splits things very finely: one service for users, another for sign-in, another for notifications, another for chat. Each split makes sense on its own.

Together they mean more pipelines, more repositories, more things to restart at night, and more calls that must all succeed just to show one page.

## How to tell if two services want to be one

- They are **always deployed together**.
- One **cannot do anything useful** while the other is down.
- They **share the same data** and keep asking each other for it.
- The **same person** owns both.

Three out of four? They are probably one service wearing two hats. Merging them usually means fewer moving parts and faster releases, with exactly the same features.

## When splitting *does* make sense

Split when parts need to **scale differently** (search vs. checkout), have **different reliability needs** (payments vs. a newsletter), or are owned by **different teams**. Then the extra boxes pay for themselves.

## The takeaway

Start with the fewest services you can defend. Splitting later is easier than you think; merging later is harder than you would like.

*Planning the architecture of a new product? [Get a second opinion](/start-a-project/?type=custom-software).*
