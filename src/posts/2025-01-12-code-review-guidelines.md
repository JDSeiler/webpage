---
tags: post
title: "General Principles for Quality Code Reviews"
date: 2025-01-12
layout: layouts/post-layout.njk
---

# General Principles for Quality Code Reviews
At my day job, code review is something that everyone can participate in.
There's an understanding that if you don't know what you're talking about, you
wont leave a review. Otherwise, anyone can review anything. My team is really
small, so this self-organizing system works pretty well.

As I grew in my role, code review became a larger and larger part of my job, and
I wanted to make sure I was writing quality reviews. So, I went out on the web
to find some authoritative-enough opinions and compiled them into a personal
note.

What you're about to read is an adaptation of that note to fit on my blog. I'll
link out to original sources and note what constitutes my own opinions, as
appropriate.

Throughout this post you'll see the terms "Pull Request" (PR) and "Change List"
(CL). I treat them as synonyms and use them to mean "a `git` patch that someone
wants to merge into some other branch, typically the main branch".

## Why Code Review Matters
Why should we even care about writing good reviews? What do I even mean when I
say a review is "good" or "bad"?

In my opinion, the functional goals of code review are:

- To serve as an educational opportunity between two or more engineers.
- To spot quality or correctness errors before merging.

"Correctness" here meaning: "Does the software do what it is designed/intended
to do?" and "quality" meaning: "Is the implementation readable, maintainable,
and free of bugs, performance problems, etc?"

Naturally, the most basic difference between a good and bad reviews is whether
or not a review accomplishes the functional goals. We cannot count on code
review to catch all problems, since reviews are conducted with limited time and
reviewers are fallible, just like everyone. But, if your review process never
facilitates education or catches an error, then you should seriously reconsider
what you're doing.

Beyond the functional goals, there are qualitative aspects to a good review:

- Was the review time-efficient?
    - Was time wasted waiting for responses to comments?
    -  Was the PR too big to review in a reasonable amount of time?
    - Did you have to overly clarify review comments because of poor communication?
- Was the review frustrating to the reviewee? I'll elaborate
  more on this later. But, writing reviews that don't make
  people defensive ("being kind") is not only good for
  morale, it's also more efficient.

## "The Senior Principle"
Google cites the following as [The Senior Principle](https://google.github.io/eng-practices/review/reviewer/standard.html)
among all of their code review guidelines:

> In general, reviewers should favor approving a CL
> \[change list\] once it is in a state where it definitely
> improves the overall code health of the system being
> worked on, even if the CL isn't perfect.

Put another way, in absence of a specific guideline, ask
yourself if the change makes the system better. What's
acceptable or what "better" means is going to be different
from company to company, but the idea transfers.

## What's Worth Talking About
One of the simplest strategies you can employ to keep reviews
effective and lean is to _make fewer comments_. You can make
fewer comments without sacrificing review quality by focusing
on the things that really matter.

### Three Filters for Feedback
Before leaving any feedback, you can pass it through three
yes/no screener questions. If you answer "no" to any of these
questions, then you need to rephrase your comment or discard
it entirely, as the case may be.

1. Is it true?
2. Is it necessary?
3. Is it kind?

These screener questions have been proposed by many people,
and they're applicable to all communication, not just PR
review feedback.

If your feedback is not even true, then it will not only be
unhelpful, but actually antagonistic to the reviewee and
your team.

If your feedback is not necessary, then you're creating
distracting noise for the reviewee. This distraction is not
only frustrating, but also wasteful of people's time and
attention.

Finally, if your feedback is unkind, then you should reword
your comment until you can deliver it in a kind way. I'll
speak more about kindness and why it matters later. But
for now, suffice it to say that by delivering unkind
feedback, you're actively working against yourself as a
reviewer.

Many folks have written about these filters, but I
specifically encountered them through Philipp Hauer's
post on Code Review Guidelines:
[Hauer - Three Filters for Feedback](https://phauer.com/2018/code-review-guidelines/#three-filters-for-feedback)

### Pick Your Battles
Another helpful tidbit from Philipp Hauer is:
["Don't Jump in Front of Every Train"](https://phauer.com/2018/code-review-guidelines/#dont-jump-in-front-of-every-train).

This is another way to say that not everything that comes to
your mind is worth leaving as a comment.

When reviewing, focus is important. You should zero in on
the issues that are most important to you. It is neither
feasible, nor helpful, to bring up every little thing you
don't like. This will annoy the PR author and erode your
relationship with them. In the same way that not every
thought which crosses our mind is worth saying, not every
potential PR comment is worth posting.

Furthermore, you need to accept that there are multiple ways
to solve nearly every issue. Just because someone didn't pick
your preferred method to solve the problem, doesn't mean their
choice is less valid.

### Technical Basics
This post is more concerned with how to write a _good_ code
review, as opposed to how to write one at all. But, a review
that doesn't handle the basics can hardly be called "good".
So, make sure you're covering the technical basics in your
review. These are going to vary slightly from org to org,
but generally speaking, examine:

1. Does the PR actually do what the author intends?
2. Is the PR understandable and maintainable?
3. Is the PR well documented, as necessary?
4. Is the PR well tested?
5. Does the PR integrate well with the existing codebase?

Beyond the basics, there are two specific topics that are
worth speaking about more: complexity and style.

### Complexity
[Google Standard of Code Review: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)

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

### Style
Style issues are _dangerous_. They are easy to have opinions
about, argue about, and typically _don't matter that much_.
Style is important, because consistently formatting code aids
in reading and writing. However, because of how subjective
style decisions are, it's important to set up structures to
prevent the wasting of time by arguing about them.

I strongly think that, when it comes to how code looks, it
should be _boring_. Pick a common style guide for the
language you're using (some languages have only one, and it
might be built into the toolchain!) and _stick with it_.

Even more important than being formatted in a boring and
unsurprising way, projects should be formatted _consistently_
within themselves. Ideally, your style choices should be
enforced automatically through a formatting tool. This way,
any individual developer can simply run the tool and forget
about it. Examples of this include `prettier` for JavaScript,
`black` for Python, `cargo fmt` for Rust, or `go fmt` for Go.

If your style choices cannot be enforced automatically, they
should be written down so that disagreements about style can
be decided by a written document. If your project has no
automatic formatting or written style guide, then you should
consider starting work on that, and then defer to the
following hierarchy:

- Defer to the style of the surrounding code or other
existing precedent in your project.
- Defer to norms for the language you're using.
- If no other precedent exists: accept the PR author's.

Try to zero in on the technical facts that often underpin
differences in style, and if several approaches can be
shown to be equally valid, accept the author's choice.

One caveat here is that PR authors should **not** mix
major style changes with functional changes. Style changes
can easily obscure functional changes, and so it's best
if they can be split into separate PRs.

### Praise
People learn not only by being told what they did wrong but
also by being told when they do something good. Besides,
it can be disheartening to only ever receive negative
feedback. So, when you see something you genuinely think is
good in a PR, leave some encouraging positive feedback!

Doing so can reinforce behaviors you want to see more of,
as well as boost morale.

## Phrasing Feedback
Philipp Hauer's blog post
[Code Review Guidelines for Humans](https://phauer.com/2018/code-review-guidelines)
is the inspiration for this section.

### Why Kindness Matters
From a technical perspective, the "Senior Principle" is the
health of the codebase. From an interpersonal perspective,
I think the senior principle is kindness.

[Philipp Hauer](https://phauer.com/2018/code-review-guidelines/#is-it-kind)
provides my favorite argument for why we should be kind:

> Being kind does _not_ mean that we grab us by the hands,
> sing “Kumbaya My Lord”, and stop saying something
> unpleasant. The point is, that being kind is a smart
> strategy to give feedback that will be accepted. It’s
> efficient because you don’t trigger someone’s defensive
> reaction.

### Avoiding Defensive Reactions
How do we avoid making people defensive?
Here are two strategies I've found very easy to apply.

First, focus on the code. The review you're writing is about
the code and *not* the author.

If you direct a comment at the author of a change instead of
the change itself, it's hard for them to not take it
personally because, well, you literally made it personal.

Keeping the comments focused on the code helps keep the review objective and
supports collective ownership. The review process is not about "your code" and
"my code". It is about **the** code.

Second, write from *your point of view* using words like "I",
"me", and "my". For example:

- I think...
- Personally, I would...
- In my opinion...
- I don't understand...
- My suggestion...
- This code makes me think...

This is a common strategy in communication and conflict
resolution called [I-Messages](https://en.wikipedia.org/wiki/I-message).

Prefer I-Messages, where possible, over "You-Messages" like:
- You did...
- You are doing...
- Why did / don't you...
- You should...

Statements specifically about the code are technical opinions
that can be argued using technical facts and data. Statements
about your own opinions and experience are simply what they
are. Keeping your review to those two areas as much as
possible can help you avoid making people defensive.

### Explain Your Reasoning
When giving feedback, explain your thought process to give the
reviewee additional context. Overly terse feedback like:
"Don't do it this way, use a `BufReader` instead." probably
doesn't give the reviewee enough context about what you
actually think the problem is and what change you'd like to
see.

Of course, you need to strike a balance between giving
guidance and being *too* specific about how you want a
change to be made. If you're too specific about what to do,
you rob people of the opportunity to figure things out for
themselves and really learn.

### Don't Write the Code
This section is in regards to a particular species of review comment, that looks something like:

```
Try this: <big block of code>
```

I call this kind of comment "back seat implementation", and it is very different
from providing a code example as part of a well-formed review comment.
Instead, back seat implementation involves dumping a substantial amount of code,
which itself is more or less complete, and expecting the reviewee to incorporate
or heavily reference it in their PR. These kinds of comments often lack context
about the underlying technical or stylistic problem being addressed, and instead
demand a particular *solution* without explaining what the problem is.

There are very few situations where this *might* be acceptable:

1. There is actually only one feasible way to solve a problem, and the reviewee
is not getting it.
2. The reviewee has directly asked you for implementation help.
3. Production is on fire, this PR will fix it, and needs to be resolved ASAP.

Otherwise, hand feeding a solution to the reviewee has serious problems:

1. It is insulting to the PR author to write the code for them. It's like saying
that their investment of time and energy was unimportant or that they are not
capable of getting the change right.
2. It is a waste of time because the PR author will need to copy/adapt the code
you've already written back into their PR. Inevitably, there will be additional
hiccups and loose ends that will take **extra** time to fix. This extra time
comes from the fact that you, the reviewer, have demanded a particular
implementation instead of letting the reviewee develop a solution using their
own mind.
3. It's arrogant and dismissive to provide an implementation. It's saying:
"I don't care how you would solve the problem, I want you to solve it the
way **I** would do it". Why should the PR author bother doing any work if
the reviewer is going to redo it for them?
4. It robs the PR author of the opportunity to learn by doing.

Reviewers are often the people who are most comfortable with a particular
project or area of code, so it can be frustrating watching a novice struggle
through a change the reviewer thinks is "obvious". You **must** resist the urge
to jump in an "fix" everything by doing it yourself or providing them code
snippets. People will not learn at their full potential if they are not allowed
to struggle. Furthermore, few things are more damaging to morale than being brushed
aside for someone else to do the work. If someone truly needs to be removed from
a particular piece of work, then that situation should be handled specially and
with substantial tact.

### Conventional Comments
Lastly, I want to plug a semi-structured format for writing
commits that I've found incredibly helpful:
[Conventional Comments](https://conventionalcomments.org/)

Conventional Comments are essentially a set of tone-markers
you can use to make your feedback less ambiguous. The format
is simple:
```
<label> [decorations]: <subject>

[discussion]
```

- `label` :: Describes the kind of comment.
- `decorations` (optional) :: 0 or more decorations that
  tweak the meaning of the label.
- `subject` :: The main line of the review comment.
- `discussion` (optional) :: 0 or more follow-on sentences
  or paragraphs that elaborate on the `subject`.

Personally, I think most of the value of the system is in
the labels and decorations, and everything else you can
do how you want. But, what's valuable is going to vary from
team to team.

I wont regurgitate the system when you can read about it
yourself on the source. But I will note what I think is good
about it:

1. Having to label my feedback helps me clarify what I'm
even saying. Particularly, it helps me cut out feedback
that's really about my personal implementation preferences.
2. The labels and decorations clearly and concisely
communicate the type/urgency of the comment, letting me
focus on the meat of my review comment. Instead of having
to type "Only implement this if it's not that much work", I
can write "suggestion (if-easy)" and focus on my suggestion.
3. Makes reviews more efficient by immediately giving the
reviewee context on the type of comment you're leaving and
how much of their attention it will require.

## Wrapping Up
Over the past few years, these guidelines and strategies have
served me well, and I hope they'll do the same for you!

Writing code reviews is a skill that takes practice to perfect.
I've got plenty of room to improve, but by being intentional
with the principles and strategies I've shared in this post,
I've gotten more confident in my review writing.

I'll concede that "more confident" does not mean "better".
But until I hear otherwise from a coworker, I'll keep thinking,
trying my best, and seeing what happens.
