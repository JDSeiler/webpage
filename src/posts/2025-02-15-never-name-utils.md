---
tags: post
title: "`utils` and Other Useless Names"
date: 2025-02-15
layout: layouts/post-layout.njk
---

# `utils` and Other Useless Names

It's hard to organize source code. You can choose to do it an almost limitless
number of ways and there are many different factors to consider:

- What features does your language of choice even provide for modularity?
- What is the prevailing style for your language and/or framework?
- Are you using specific tools (IDEs, build tools, or otherwise) that interact
  with particular file or folder structures poorly?

Software is difficult to architect in general, and the files and folders that
make up your application are often a reflection of your abstract architecture.
It's hard to get right, but it's important!

Imagine a kitchen where every dish and utensil is arbitrarily strewn through
the drawers and cabinets, and every ingredient is arbitrarily arranged in the
pantry or refrigerator. Would that be a pleasant place to cook in? Of course
not! The workspaces of experts, from chefs to carpenters to surgeons, are
thoughtfully organized to help facilitate their best work.

I will make the (hopefully) uncontroversial statement that clear, well
reasoned, organization of source files makes work easier and more pleasant
than poor organization. The files and folders that make up an application's
code base are one aspect of a software engineer's workspace, so it stands to
reason that we should organize them with care.

When it comes to *naming* source files, there is one pattern I have seen several
times and is a HUGE pet peeve of mine. It is the pattern of naming files or
folders something like `utils`, `tools`, or `helpers`.

## What is a Utility?

I think it's only fair for me to lay out what I mean by "utility" before
critiquing it as a name.

Utility is a word all about *usefulness*. But in day to day life, we don't
really refer to individual objects as "utilities". The only things we call
by that word are things like water or electric service. But, separate from
our day to day understanding, software development has a particular idea
for the meaning of the term.

If we look at the category of "utility software" (zooming out a bit from
individual source files) we find all kinds of things:

- Disk Defragmenters
- Compression Software
- Encoders/Decoders/Converters
- System Monitors
- Diagnostic Tools

It's easy to get wrapped around the axle trying to classify all software as
either a utility or not. So, I think it's more helpful to think of utility
as a quality that software can possess more or less of on a sliding scale.

*Specifically in the context of software*, I think utility is about how
much a program's usefulness is in relation to "something else". It's
software that you use to do work with or on other programs.

For example, a file manager ranks highly on the utility scale, because a
file manager's usefulness is only realized in relation to all the other
programs that create files.

A video game, in contrast, has very little utility, both in the general sense
and the specific sense I introduced earlier. All the value of the game, as a
piece of software, is realized in itself and not in conjunction with other
things.

## Utilities in Source Code

Taking a look at utility *software* is a good first step. But what is a utility
in the context of *source code*?

If the line between application and utility software is blurry, then the line
between utility and application code is a smear.

The problem is that almost any code can be called a utility *in relation to
something*. The functions that assist in some piece of critical business
logic are just the *very specific utilities* for *this specific feature*.
Nothing to see here! Move along!

But "technically correct" and "actually useful" are two very different things.
If you see someone walking their dog, you *could* say: "Look at that person
walking their animal" and be technically correct, but why would you say that?
You know it's a dog, I know it's a dog, so call it a dog. You could also
organize your code by language construct (`class`, `function`, `struct`, etc.)
and be technically correct, but I wouldn't recommend it if you want to stay on
speaking terms with your coworkers.

What do the names `utils`, `tools`, or `helpers` communicate? All they
communicate is that the code inside has some kind of usefulness. So, you're
telling me that your application contains code whose *most unique*
classification is that it's *useful*? Seriously? That's the best possible name?
A name like `utils` is so preposterously general that it communicates *almost
nothing* about the code inside. You'd be just as well off naming the file
`code` and hoping that the surrounding context gives enough information.

I wont say that there are *no* cases where a name like `utils` is acceptable.
But I do think it's very rare that it's the right choice, and that most times
it's used because someone can't be bothered to think of a better name.

## The Maintenance Problem of `utils`

It would be one thing if a vague name simply failed to be helpful. That would
at least leave you no worse than before. Unfortunately, names like `utils` have
consequences beyond being vague.

As an application grows, new code obviously needs a place to go. The trouble is
that files or folders with overly general names become garbage dumps for code
only related by the fact that someone didn't know how to classify it. It becomes
an escape hatch for people who don't want to do the difficult but necessary
work of deciding how their code ought to be organized.

In extreme cases, such a garbage file may begin strongly coupling totally
separate parts of an application, or otherwise centralizing behavior and state
in a way that makes refactoring difficult.

## Alternatives

What do I think people should do instead?

It's going to be highly contextual based on your application, but I think I
great place to start is to ask: "utils **for what**?". The answer to that
question becomes the starting point for your new name. If a `utils` file has
been accumulating cruft for a while, you may need to break it into multiple
parts before sensible names can be found.

Another tip that has helped me is to spend time sketching out the design
separately from any code before I begin working. My go-to mediums for this are
simple text files or paper, but use whatever you like best. The point is to
get an idea of how to organize the code *before* any substantial amount is
written. You may find it helpful to iterate this process as you narrow in on
a design.

Whatever you do, don't settle for a bad name. If the best name you can come up
with is `utils`, that's a symptom of a more substantial organization problem
that needs to be addressed.
