---
title: "One engineer, 10+ services: how Sougba ships with Jenkins and Argo CD"
description: "A deploy pipeline so boring nobody thinks about it. How it works, what broke, and what we would change."
date: 2026-10-26
category: Cloud & DevOps
tags: [gitops, kubernetes, argo-cd, jenkins, ci-cd]
cover: /img/gitops-pipeline.jpg
---

Sougba is a marketplace with more than ten services, a web app, a mobile app and a back office. One engineer runs all of it. The secret is not heroics. It is a deploy pipeline so boring that nobody has to think about it.

Here is how it works, what broke along the way, and what we would change next.

## The rule: git is the only way into production

Nobody runs `kubectl apply` against production by hand. Not even on a Friday night. Every change reaches the cluster through a commit.

That one rule gives three things for free:

- a history of every deploy,
- a review point before it happens,
- a rollback that is just `git revert`.

## The pipeline in four steps

1. **Pull request.** A change goes to the service repo as a pull request. GitHub Actions runs the same build and tests the real pipeline will run. Red never merges.
2. **Build.** Jenkins watches the main branch of every service. When a commit lands, it builds a Docker image and pushes it to a private registry, tagged with the build number. Never just `latest`, so every running version traces back to a build.
3. **Record.** Each service has a second repository, its *deploy repo*, holding only Kubernetes manifests (Kustomize, with a prod overlay). Jenkins bumps the image tag there and pushes. That commit *is* the deploy.
4. **Sync.** Argo CD watches every deploy repo through one parent "app of apps". It sees the new tag and rolls the Deployment. Readiness probes make sure a broken pod never takes traffic.

About 20 Kubernetes deployments, counting shared infrastructure, follow this exact path. Adding a new service means copying a Jenkinsfile, a Dockerfile and a deploy-repo template.

## Why two repos per service?

It feels like overhead at first. It pays for itself the first time something goes wrong:

- The service repo answers *"what does the code do?"*. The deploy repo answers *"what is running right now?"*. At 2 a.m., only the second question matters.
- Rolling back never needs a rebuild. Revert one line, and Argo CD puts the previous image back in under a minute.
- Configuration changes (replicas, memory limits, probes) are deploys too, with the same history and the same rollback.

## What broke, and what we learned

**A pipeline that silently stops is worse than one that fails.** Once, the Docker daemon on the Jenkins machine stopped. Nothing failed, because nothing ran. Commits piled up and looked live. Now a failed build sends a push notification, and a health report checks production every 30 minutes. Monitor the pipeline itself, not only the apps.

**Probes are not optional.** Before every service had proper startup, readiness and liveness probes, a slow start could be marked healthy too early. Adding them everywhere ended a whole family of "it worked after a minute" bugs.

**Fewer services is a feature.** Merging several small services removed pipelines, repos and failure points without removing a single feature. (More on that in [fewer, bigger services](/blog/fewer-bigger-services/).)

## What we would change next

- **A staging step:** deploy to a staging overlay, smoke test, then promote with a second commit.
- **Webhooks instead of polling,** to cut the delay from minutes to seconds.
- **Tests that mean more.** A pipeline is only as safe as the checks it runs.

> The goal is not a clever pipeline. It is one path, the same for every service, where every deploy is a commit and every rollback is a revert. That is what lets a tiny team run a real platform and still sleep.
