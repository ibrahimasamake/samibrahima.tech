---
title: "Fewer, bigger services win early"
description: "Sougba started with too many microservices. Merging them made deploys faster and outages rarer, without losing a single feature."
date: 2026-11-19
category: Architecture
tags: [microservices, architecture, spring-boot]
---

Microservices are fun to draw. Ten neat boxes, each with one job. It looks like a grown-up architecture.

Then you have to deploy, monitor, back up, secure and debug ten boxes. Every arrow between them is a network call that can fail.

## Where Sougba started

The first version split things very finely. Users had their own service. Authentication had another. Notifications had one, real-time chat another.

Each split made sense on its own. Together they meant more pipelines, more repos, more things to restart at night, and more calls that had to succeed just to show one page.

## What we merged

- **Users into auth.** Who you are and how you sign in were always changed together anyway.
- **Notifications into real-time.** Push, email and chat all answer the same question: *how do we tell someone something happened?*

Fewer moving parts, faster deploys, same features.

## How to tell if two services want to be one

- They are **always deployed together**.
- One **cannot do anything useful** while the other is down.
- They **share the same data** and keep asking each other for it.
- The **same person** owns both.

Three out of four? They are probably one service wearing two hats.

## When splitting *does* make sense

Split when parts need to **scale differently** (search vs. checkout), have **different reliability needs**, or are owned by **different teams**. Today Sougba still runs 10+ Spring Boot services, talking through Kafka events and gRPC where it makes sense. But each split now has a reason.

## The takeaway

Start with the fewest services you can defend. Splitting later is easier than you think; merging later is harder than you would like.

*Planning the architecture of a new product? [Get a second opinion](/start-a-project/?type=custom-software).*
