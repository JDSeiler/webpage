---
tags: post
title: "General Principles for Quality Code Reviews"
date: 2024-MM-DD
layout: layouts/post-layout.njk
---

# General Principles for Quality Code Reviews
At my day job, code review is something that everyone can
participate in. There's an understanding that if you don't
know what you're talking about, you wont leave a review.
Otherwise, anyone can leave a review on any PR. My team is
really small, so this self-organizing system generally works.

Now, I've never been the best communicator. So when I first
started having to leave code reviews, I began to worry about
whether or not I was leaving _good_ reviews. So, I went out
on the web to find some authoritative-enough looking
opinions and compiled them into a personal note.

What you're about to read is an adaptation of that note to
fit on my blog. I'll link out to original sources and
note what constitutes my own opinions, as appropriate.

Throughout this post you'll see the terms "Pull Request" (PR)
and "Change List" (CL). I treat them as synonyms and use them
to mean "a `git` patch that someone wants to merge into some
other branch, typically the main-line".

# Why Code Review Matters
Why should we even care about writing good reviews? What do
I even mean when I say a review is "good" or "bad"?

In my opinion, the functional goals of code review are:

- To function as an educational opportunity between two or
  more engineers.
- To spot quality or correctness errors before merging.

"Correctness" here meaning: "Does the software do what it is
designed/intended to do?" and "quality" meaning: "Is the
implenentation readable, maintainable, and free of bugs,
performances problems, etc?"

Naturally, the most basic difference between a good review
and a bad one is whether or not the review accomplishes the
goals above. We cannot count on code review to catch all
problems, since reviews are conducted with limited time
and reviewers are fallible humans, just like everyone.
However, I don't think it's controversial to say that a code
review that fails to identify a critical error is "bad".

Beyond the functional goals, there are more qualitative
aspects to what makes a good review:

- Was the review time-efficient? Was time wasted waiting for
  responses to comments? Was the PR too big to review in a
  reasonable amount of time? Did you have to overly clarify
  review comments because of poor communication?
- Was the review frustrating to the reviewee? I'll elaborate
  more on this later. But, writing reviews that don't make
  people defensive ("being kind") is not only good for
  morale, it's also more efficient.

# "The Senior Principle"

Google cites the following as [The Senior Principle](https://google.github.io/eng-practices/review/reviewer/standard.html)
among all of their code review guidelines:

> In general, reviewers should favor approving a CL
> \[change list\] once it is in a state where it definitely
> improves the overall code health of the system, being
> worked on, even if the CL isn't perfect.

Put another way, in absence of a specific guideline, ask
yourself if the change makes the system better. What's
acceptable or what "better" means is going to be different
from company to company, but the idea still works.

# What's Worth Talking About
The backing source for this whole section is: [Google Standard of Code Review: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)

One of the simplest strategies you can employ to keep reviews
effective and lean is to _make fewer comments_. You can make
fewer comments without sacrificing review quality by focusing
on the things that really matter.

## Complexity
Code should not be more complex than it needs to be.
The following are warning signs of complexity:
- The code cannot be understood in a reasonable amount
  of time.
- Developers are likely to introduce bugs when they call
  or modify the code.
- The code is over-engineered. It is solving tomorrow's
  problems today.

If the code is difficult for you to read and understand,
then it's likely that it will be difficult for maintainers
to understand too.

When looking for complexity, sometimes it's helpful to look
at the broader context that a change lives in.

Google makes a big deal of complexity, from: [What to look for in a code review - Context](https://google.github.io/eng-practices/review/reviewer/looking-for.html#context)
> Don’t accept CLs that degrade the code health of the system.
> Most systems become complex through many small changes that
> add up, so it’s important to prevent even small complexities
> in new changes.
