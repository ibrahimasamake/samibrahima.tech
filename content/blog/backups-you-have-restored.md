---
title: "A backup you have never restored is just a hope"
description: "The morning a clean-up job deleted products it should have kept, and the three small changes that made sure it can never happen silently again."
date: 2026-11-19
category: Cloud & DevOps
tags: [backups, incident, postgres, mongodb, reliability]
---

Every team says "we have backups". Fewer can say "we restored one last month".

Sougba learned the difference the honest way.

## What happened

A scheduled clean-up job ran as usual one night. It was supposed to remove expired data. It also removed products it should have kept.

No alarms. No errors. The job did exactly what its code said. It just said the wrong thing.

## The same morning

The products were restored from the latest database backup. Shops kept selling. Then came the part that matters more than the fix: a short written post-mortem. What broke, why, and what stops it from happening again.

## Three changes, all small

1. **Databases backed up every 30 minutes,** PostgreSQL and MongoDB, to object storage, with 14 days of retention. Short gaps, long memory.
2. **A nightly mirror of product photos with a 7-day trash.** Photos are files, not rows, so they needed their own safety net. Anything deleted can come back for a week.
3. **A freshness check in the health report.** Every 30 minutes, an automated report checks production, including *"is the latest backup actually recent?"*. A backup job that quietly stops is now loud.

## And one big one: practise

A standby cluster exists, and it has been through a real failover drill, with no data lost. The drill is the only way to know the plan works before you need it.

## Your quick checklist

- When did you last **restore** a backup, not just take one?
- Would you notice if the backup job stopped tonight?
- Are files (photos, documents) backed up, or only the database?
- Does someone write down what happened after an incident?

If two of those made you a little nervous, you are not alone. It is fixable in days, not months.

*Want a second pair of eyes on your setup? [Ask for a quick review](/start-a-project/?type=cloud-devops).*
