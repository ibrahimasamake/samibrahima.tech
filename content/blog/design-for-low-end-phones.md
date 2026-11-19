---
title: "Design for the phone your customer actually has"
description: "Most of Sougba's users browse on low-end Android phones with expensive data. Here is what that changed in the product."
date: 2026-11-19
category: Product
tags: [mobile, performance, ux, ssr]
cover: /images/projects/sougba/home-mobile.jpg
---

It is easy to design on a big laptop with fast Wi-Fi and forget who is on the other side.

For [Sougba](/projects/sougba/), the other side is a shopper in Bamako on an entry-level Android phone, paying for every megabyte. A shop owner checking stock between two customers. Someone with one bar of signal.

So every decision started with that phone.

## Render on the server

A page that needs a big JavaScript bundle before it shows anything feels broken on a slow phone. Sougba's web app is server-side rendered (Angular SSR): the first thing that arrives is a real page with real products, not a spinner.

Bonus: search engines see the same real page. Good for the shops, good for discovery.

## Treat images like they cost money (they do)

Product photos are the heaviest thing on a marketplace. Small sizes, sensible compression and lazy loading for anything below the fold. The photo you see first is the only one that has to arrive first.

## Speak the customer's language

French first. Plain words. "Choose a neighbourhood", not "Configure location preferences". When people use a product on the go, every confusing word is a lost sale.

## Meet people where they already talk

Many shops already sell on WhatsApp. Instead of fighting that, Sougba connects to it: buyers message the seller on WhatsApp, directly, no middleman.

## Thumbs, not mice

Big tap targets, the important actions at the bottom of the screen, nothing that needs hovering. If it cannot be done with one thumb on a bus, it is not finished.

## The takeaway

"Mobile-first" is not a CSS breakpoint. It is a promise to the person holding the cheapest phone in the room. Keep that promise and the product feels fast for everyone else too.

*Building something your customers use on the go? [Let's talk](/start-a-project/).*
