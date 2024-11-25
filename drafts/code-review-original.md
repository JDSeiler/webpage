---
title: "Code Review - Best Practices"
key: 0
tags: [process]
date: 2023-02-07
---

# Inspiration and Sources
- [Google Standard of Code Review (GSCR)](https://google.github.io/eng-practices/review/reviewer/standard.html)
- [Philipp Hauer - Code Review Guidelines for Humans](https://phauer.com/2018/code-review-guidelines/#tldr)
- [Chromium - A Guide for Code Reviewers](https://chromium.googlesource.com/chromium/src/+/master/docs/cr_respect.md)
- [Conventional Comments](https://conventionalcomments.org/)

This document is *primarily concerned* with strategies for writing good review comments and communicating in a kind and effective way.

Why should we be kind? [Philipp Hauer](https://phauer.com/2018/code-review-guidelines/#is-it-kind) has this to say:
> Being kind does _not_ mean that we grab us by the hands, sing “Kumbaya My Lord”, and stop saying something unpleasant. The point is, that being kind is a smart strategy to give feedback that will be accepted. It’s efficient because you don’t trigger someone’s defensive reaction.

# The Senior Principle
Google cites the following as [The Senior Principle](https://google.github.io/eng-practices/review/reviewer/standard.html) among all of their code review guidelines:
> In general, reviewers should favor approving a CL \[change list\] once it is in a state where it definitely improves the overall code health of the system, being worked on, even if the CL isn't perfect.

"There is no such thing as 'perfect' code--there is only *better* code"

# What is worth talking about?
[GSCR: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)

When considering whether or not to make a PR comment, consider if the subject of the comment is even worth talking about.

## Complexity
Code should not be more complex than it needs to be. Complexity often pops up in one of the following ways:
- The code cannot quickly be understood by readers.
- Developers are likely to introduce bugs when they call or modify the code.
- The code is over-engineered: It is solving tomorrow's problems today.

If the code is difficult for you to read and understand, then it probably will be difficult for maintainers of the code too. Ask the author to clarify it.

When looking for complexity, sometimes it is helpful to look at the broader context that changes live in. For example, read the surrounding function or component that a small change lives in.

[GSCR: What to look for in a code review - Context](https://google.github.io/eng-practices/review/reviewer/looking-for.html#context)
> **Don’t accept CLs that degrade the code health of the system.** Most systems become complex through many small changes that add up, so it’s important to prevent even small complexities in new changes.

## Definition of done
The code should follow Ozmo's definition of done. Among other things, it needs to:
1. Satisfy the AC's of the story it is associated
    1. Or otherwise do what the PR author says it should, and the functionality being added/changed should be appropriate.
2. Have associated tests / been tested. It has unit or integration tests as appropriate, and has been manually tested as appropriate.
3. Follow [Ozmo's Coding Standards](https://modeacorp.atlassian.net/wiki/spaces/DPRCMS/pages/19529744/Coding+Standards)
4. Update associated documentation.
    1. READMEs
    2. Doc comments

## Issues of style and opinion
If there is a style issue, the ultimate authority is always the project's associated style guide. If the project has no associated style guide, then the code should follow existing precedent in the project and/or norms for the particular language being used.

PRs should **not** be blocked due to personal style preferences. Similarly, **do not bike-shed**. [GSCR](https://google.github.io/eng-practices/review/reviewer/standard.html) says:
1. Technical facts and data overrule opinions and personal preferences.
2. If the author can demonstrate (either through data or based on solid engineering principles) that several approaches are equally valid, then the reviewer should accept the preference of the author. **Distinguish between best practice and your own taste**.

Similarly, PR authors should **not** include major style changes in the same PR as functional changes. Doing so obscures the functional changes and makes review more difficult.

## Praise
It's worth talking about good things you see in the code review. It can be helpful to balance out code reviews (which usually contain a list of "mistakes") with some mention of good things the author did in the PR. People also learn through reinforcement of what they're doing well, not just being told what they could improve on!

# Providing Feedback
## General concerns
### "Show your work"
[GSCR - Explain Why](https://google.github.io/eng-practices/review/reviewer/comments.html#why)

When writing a comment, explain your reasoning. Why are you making the suggestion? What practice, precedent, or reasoning are you using as the basis for your comment? As the [Chromium Code Review Guide](https://chromium.googlesource.com/chromium/src/+/master/docs/cr_respect.md#explain-why) says:
> It might be obvious to you that some code is wrong, but it‘s probably not obvious to the author — or they wouldn’t have written it that way. So please don‘t say “This is wrong”. Instead, explain at least what the right way looks like. Or even better, explain _why_ they should do things differently.
### Balance guidance and developer autonomy
[GSCR - Giving Guidance](https://google.github.io/eng-practices/review/reviewer/comments.html#guidance)

It is not the code reviewers job to write up a detailed solution when they suggest a change to a developer. However, you don't want to be completely blunt and unhelpful as a reviewer. You must instead strike a balance between giving guidance and letting the developer decide how to solve any particular problem.

Allowing the developer to come up with the solution can help them learn, and sometimes they come up with a better solution because they're closer to the code.
## Phrasing your feedback
### Always assume competence
[Chromium - A Guide for Code Reviewers](https://chromium.googlesource.com/chromium/src/+/master/docs/cr_respect.md#assume-competence-goodwill)

When someone is wrong, it is usually due to a lack of information and not inability. Suggesting a change while assuming incompetence is a counterproductive or even antisocial mindset.
### Talk about the code
[Hauer - Talk About the Code, Not the Coder](https://phauer.com/2018/code-review-guidelines/#talk-about-the-code-not-the-coder)

The code review is not about the author, it is about the code and how it affects the overall system. Write your feedback about the code, not the author.  Hauer points out 3 benefits to this:
1. It makes feedback easier to receive because it's about the code (something objective), and not the author. Directed feedback at the author can make them feel defensive.
2. Feedback about the code prevents pointless buck-passing: "No it was Jack who added that code, not me!"
3. Feedback about the code supports collective ownership.
### I-Messages
[Hauer - Use I-Messages](https://phauer.com/2018/code-review-guidelines/#use-i-messages)

Write from *your point of view* using words like I, me, and my:
- I think...
- Personally, I would...
- In my opinion...
- I don't understand...
- My suggestion...
- This code makes me think...

Instead of writing "You-Messages":
- You did...
- You are doing...
- Why did / don't you...
- You should...

Writing "You-Messages" violates the first guideline, "Talk about the code", and can make the PR author feel defensive. Furthermore, it can make PR authors more receptive to your feedback. I-Messages present your feedback as your own opinions and subjective experience, which is exactly what PR comments are (for the most part).
### OIR
[Hauer - Mind the OIR-Rule of Giving Feedback](https://phauer.com/2018/code-review-guidelines/#mind-the-oir-rule-of-giving-feedback)
OIR is a way to structure feedback into three sections:
- Observation: What is it that *you* are seeing in the code?
    - Be objective and neutral
    - Use I-Messages
- Impact: How does this observation impact *you*, the reviewer?
    - Use I-Messages
- Request: What would you like to happen?
    - Again, use I-Messages

**Examples:**
> I read the parameter name `data` and I don't quite know what it's referring to. This makes it difficult for me to understand when `parse_menu` should be used. What do you think about renaming it to `api_flat_menu_payload`?
- Observation: The function `parse_menu` has an unclear parameter name: `data`
- Impact: The name is vague and causes confusion.
- Request: Let's rename the parameter to something more clear.
- Also note the phrasing of the request as a question. Asking questions is [a great way to provide feedback](https://phauer.com/2018/code-review-guidelines/#ask-questions) that is:
    - Non-threatening
    - Provokes thought in the author
    - Reveals the author's intent without judgement

> This function uses multiple nested calls to `flat_map` to do its job. As someone with less of a functional programming background, `flat_map` can be difficult to work with and understand. I suggest breaking up this function into multiple separate `flat_map` calls while assigning the intermediate results to expressively named variables.
- Observation: A function is using nested `flat_map`  calls to do some work.
- Impact: Multiple levels of `flat_map` is making the code difficult to reason about and could make it more difficult to maintain.
- Request: Break apart each `flat_map` operation into its own separate operation. Assign the intermediate results to variables. This way future readers can understand the function bit-by-bit, by way of the intermediate results.
### Conventional comments
https://conventionalcomments.org/

Similar to Conventional *Commits*, conventional comments are a way of structuring PR review comments with the goal of communicating more effectively. Consider using them!

The format is simple:
```
<label> [decorations]: <subject>

[discussion]
```

The first part of the comment is a single label that denotes the kind of comment. The label is followed by one or more decorations. Decorations are optional tags that can augment the meaning of any comment. Decorations are surrounded by parenthesis and separated by commas. The subject is the comment itself. Additional context and conversation should go in the optional discussion section.

Conventional Comments strongly suggests the following **labels**:
- `praise`  :: Highlight something positive! Look for something sincere to praise.
    - I use `nice` instead because `praise` makes me feel weird
- `nitpick` / `nit` / `quibble` :: Trivial preference-based requests
- `suggestion` :: A proposal for improvement. Use the `blocking` or `non-blocking` decorations to communicate your intent.
    - `polish` :: Like a suggestion, but does not indicate that anything is wrong with the code as-is.
- `issue` :: Highlight a problem with the code. Strongly suggested to pair this with a `suggestion`.
- `todo` :: Small, trivial, but necessary changes.
    - `typo` :: Like `todo`, but the issue a misspelling.
- `question` :: Typically used if you have a concern but you're  not quite sure if it's a problem or not.
- `thought` :: Non-blocking comments that represent an idea you had during the review.
- `chore` :: Simple tasks that must be done before the PR can be accepted. Usually related to common process outside of the source code.
- `note` :: Highlight something the reader should know. Always non-blocking.

**Decorations** can be customized on a team-by-team basis. But the following minimal set of decorations are strongly recommended:
- `non-blocking` :: A comment with this decoration should not block the PR from being merged.
- `blocking` :: A comment with this decoration *should* stop the PR from being merged until it is resolved.
- `if-minor` :: The PR author should resolve this comment only if the changes are small/easy.
    - I prefer a different phrasing: `if-easy`. It means the same thing, but I think the meaning is more obvious.

## Filtering your feedback
### Not everything is worth it
[Hauer - Don't Jump in Front of Every Train](https://phauer.com/2018/code-review-guidelines/#dont-jump-in-front-of-every-train)

When reviewing, focus is important. You should zero in on the issues that are most important to you. It is neither feasible, nor helpful, to bring up every little thing you don't like. This will annoy the PR author and erode your relationship with them. In the same way that not every thought which crosses our mind is worth saying, not every potential PR comment is worth posting.
### True, Necessary, Kind
[Hauer - Three Filters for Feedback](https://phauer.com/2018/code-review-guidelines/#three-filters-for-feedback)

Before leaving a PR comment, ask the following questions:
1. Is it true?
2. Is it necessary?
3. Is it kind?

If your PR review comment does not pass each of those checks, then either discard it or rephrase the comment until it passes. The underlying comment may be valid, but the comment may have only *some parts* that are unnecessary, unkind, or untrue.
