---
title: "The tools we reach for in 2026 (and why)"
description: "Not the trendiest stack. The one that has run real products in production. A short tour, with the honest reasons."
date: 2026-11-19
category: Tools
tags: [stack, nextjs, flutter, spring-boot, kubernetes]
---

Every few weeks a new framework promises to change everything. We like trying them. We build client products with the ones that have already survived production.

Here is the current toolbox, and the honest reason behind each pick.

## Web

- **Next.js** for marketing sites, online shops and content-heavy apps. Fast pages, good SEO, easy to host. (This site and the [Nafas Perfumes shop](/projects/nafas-perfumes/) are built with it.)
- **Angular with server-side rendering** for big, long-lived web apps with lots of forms and screens, like [Sougba](/projects/sougba/) and its back office. Structure pays off when a codebase grows.
- **Tailwind CSS** because consistent design is easier when the design system lives in the code.

## Mobile

- **Flutter** for Android and iOS from one codebase. One team, one set of features, two stores.

## Backend

- **Spring Boot (Java 21)** for business platforms with real money and real stock: boring in the best way, and very well understood.
- **FastAPI (Python)** when AI or data processing is involved. Pydantic schemas keep AI answers honest.
- **Kafka and gRPC** when services need to talk, but only once there is a reason to split.

## Data

- **PostgreSQL** by default. It does almost everything well.
- **Redis** for caching and short-lived data.
- **Typesense** for fast, typo-tolerant search that shoppers actually enjoy.

## Running it

- **Docker and Kubernetes (k3s)** with **Argo CD**: every deploy is a commit. ([How that works](/blog/gitops-solo-developer/).)
- **Jenkins and GitHub Actions** for builds and checks.
- **Cloudflare** in front: DNS, TLS, CDN, and Tunnel so servers need no open ports.
- **Terraform and Ansible** so infrastructure is written down, not remembered.

## And what we don't use by default

Kubernetes for a five-page website. Microservices for a first version. A new database because it trended on social media. The simplest tool that does the job is usually the right one.

*Not sure which stack fits your project? [Ask us](/start-a-project/). Sometimes the answer is "you don't need custom software at all".*
