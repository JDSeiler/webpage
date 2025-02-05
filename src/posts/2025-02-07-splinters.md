---
tags: post
title: "Take Out the Splinter Already"
date: 2025-02-07
layout: layouts/post-layout.njk
---

# Take Out the Splinter Already
A splinter might be small, but if it's lodged in your foot it'll change the way
you walk.

Day-to-day, we all encounter "inefficiencies" in our workflows. These are
things like invoking an action manually (usually with the mouse) instead of
with a keyboard shortcut, not having fast access to commonly used resources,
having to look up an arcane `git` command, etc.

Generally, it's doing something in a way that's you find slow and annoying, but
it's not "bad" enough that you'll bother to change it.

I call these little annoyances "splinters" and I am here to tell you: **TAKE
OUT THE SPLINTER**! It's worth it!

# "Personal Efficiency" and Mental Energy
I used to think that "personal efficiency" was all about getting things done
and done quick. We want to be efficient so we can be *fast*, right? Nowadays, I
don't think that's the whole picture. Speed might be one of the usual
byproducts of efficiency, but there's more to the story.

Every day we wake up with only so much mental energy. We've got a finite amount
of attention, focus, and care, that we can expend on our work and lives.

Every splinter we remove, every rough corner we sand down, we get to spend more
of our energy on the things that really matter instead of irrelevant
distractions that pull on our focus and sap our patience. From this
perspective, efficiency is not about working fast for "The Man" or avoiding
work so you can be lazy. It's about getting less bogged down by the hundreds
of tiny interruptions that occur over the course of the day.

This is particularly applicable to professional work, but it's true in our
personal lives as well. You'd be amazed how satisfying it is to grease all the
door hinges in your house. All it takes 15 minutes, a shop rag, and a can of
WD-40.

## Splinters VS Meta-work

If you read my last post on [Meta-work](../2025-01-30-meta-work), you might be
wondering why taking out splinters isn't "Meta-work", and thus to be avoided.
While it's true that in the process of removing splinters you might get
side-tracked into meta-work, I think you can stay on track through two
simple guidelines:

1. Only solve problems you know you already have.
2. Don't go overboard or over generalize your solution.

# Examples of Splinters
Everyone's splinters will be different, since everyone both works differently
and has different opinions on what is considered "slow and annoying". So,
instead of giving suggestions on how to streamline your workflow, I'll give
examples of things I've implemented as a software engineer that have improved
my life.

## Search Engine Shortcuts
At work I've set up a number of custom search engines in Chrome so that I can
get to what I want more quickly. This feature might go by another name (like
"Keyword Search" in Firefox), but here's the gist:

You define a format string, like
`https://github.com/search?q=%s&type=repositories`, where the placeholder `%s`
will get replaced by whatever your search term is. In addition to the format
string, you define a trigger keyword, like `gh`.  Then, instead of:

1. Go to GitHub
2. Wait for the page to load
3. Click on the search bar
4. Make your search
5. Wait for the search to load

You can:

1. Type `gh <whatever your query is>` into your address bar
2. Hit Enter
3. Wait for the search to load

You might think, "You cut out two steps, big whoop", but the fact that removing
those two steps is a big deal is the point of this post. If you have any
websites you search on often, you should try this! I have one set up for my
companies GitHub repos, Google Drive, and internal documentation, and it makes
a world of difference.

## Autojump Tools
At my dayjob I spent a fair amount of time in the terminal and I switch between
a lot of different projects. To streamline my workflow, I use a plugin through
[Oh My ZSH](https://ohmyz.sh/) called [zsh-z](https://github.com/agkozak/zsh-z).

A number of these tools exist and are typically marketed as a "smart cd" or
"autojump" tool. They all have the same general idea:

1. The tool keeps a record of what directories you visit.
2. You invoke the tool with an approximate/partial string for where you
want to go.
3. The record of what directories you've been in is used to predict what the
   best matching directory is based on your query.
4. The tool changes directory for you, based on what it thinks the best match
   is.

For instance, when I want to work on my blog, I type `z web` or `z webpage` and
I'm automatically jumped to where I have the repository checked out.

I find this to be a huge timesaver over iteratively calling `ls+cd` or using an
interactive interface to navigate jump into to a shell. I can quickly open up
any number of terminals and get them to exactly the project I want in a single
command.

Some examples other than `zsh-z` include:
- [zoxide](https://github.com/ajeetdsouza/zoxide)
- [autojump](https://github.com/wting/autojump)
- [jump](https://github.com/gsamokovarov/jump)

## Alternate Version Control Tools
For a long time, I prided myself on using the `git` CLI without extra tooling.
It was some weird and silly ego thing that I was comfortable using the tool "as
it was intended" instead of shelling out to a GUI.

Now, I think that perspective was 1) unhealthy and 2) wasted a lot of my time.
I realized that using `git` at the terminal added a non-trivial amount of typing
to my day and was disruptive to boot.

There are a lot of ways to address this kind of problem. I'll share two:

- [lazygit](https://github.com/jesseduffield/lazygit)
- [jj](https://jj-vcs.github.io/jj/latest/)

`lazygit` is a TUI program that layers over `git`. The vast majority of my
`git` usage is branch management (creating, deleting, switching), staging
things, and normal commits plus the occasional amend. For those simple
operations, `lazygit` was so much faster for me. For more advanced operations,
like rebasing, I'd go back to the CLI. Not because `lazygit` can't do them, but
because I was more comfortable doing them with the CLI and I didn't want to
learn the `lazygit` interface for them.

You may have noticed I'm speaking about `lazygit` in the past-tense, and that's
because today I use [`jj`](https://jj-vcs.github.io/jj/latest/). `jj` is a
completely different version control system that is compatible with `git`. It
really deserves its own post, but I'll summarize with the following points:

- `jj` is a different interface, experience, and way of working.
- I like it much more than `git` and do not intend to go back.
- It's compatible with `git` in such a way that none of my coworkers need to
know or care, and I can "escape hatch" out to `git` if I need to.

Suggesting that you switch version control systems is a lot to ask, which is
why I wrote `lazygit` into this post. But `jj` has been an absolute game
changer that was totally worth the small learning curve.

## Turn Off Email Notifications
I'm rather compulsive when it comes to checking notifications. If I see a red
bubble on an app, or my phone chimes, I *really* want to check it. So, I do my
best to control when it's possible for me to see notifications so that I don't
get distracted.

Up until recently, I considered email an "important" notification channel and
did little-to-nothing to block it. This was rather ironic, because most of the
email I receive is marketing garbage or non-urgent confirmations/receipts.

Now, I push all email notifications into the iOS [Scheduled
Summary](https://support.apple.com/guide/iphone/view-and-respond-to-notifications-iph6534c01bc/ios)
feature and don't receive them at any other time. All of the emails I receive
can wait at least a day. I don't need to see them immediately.

This small change has helped my focus *so much* and I've been recommending it to
everyone I can. I think there's great value in aggressively pruning notifications
that are not essential to your life.

## `fzf` for Ruby Tools

At my dayjob, I'm often switching between JavaScript and Ruby on Rails
projects. In JavaScript land, for all it's flaws, I can invoke tools like the
test runner and formatter with glob patterns:

- `jest src/foo/bar`: Only run tests found in the `src/foo/bar` directory
- `prettier --write lib/**/*.js`: Only format JavaScript files in `lib`

This is *really* handy because if I'm working on `super-search.tsx` and the
test file is called `super-search.test.tsx`, all I have to type is `jest
super-search` and it does the rest.

In Rails land, I am not so lucky, and commands like `rails test` or `rubocop`
require **complete paths to the file you want to test/process**. So instead of
typing `rails test post_controller` I have to type `rails test
test/controllers/blog/post_controller_test.rb`. If you have a large project
with lots of nesting this can be very annoying. There's the `-n` option which
is *so close* to what I want, except it filters based on the actual *names of
the test cases*, not on the test files themselves. Thank goodness I can pass a
line range to only run a portion of the test file though. That's exactly what I
want to do.

If you can't tell I've got a chip on my shoulder when it comes to Rails. But that's
for another post.

Here's a slightly more tolerable option. Instead of specifying the name of the
test, you interpolate the output of `fzf`. Syntax for this will vary, but
here's what it looks like for zsh: `rails test $(fzf)`. Running this command
will invoke fzf. Once you make a selection, the `$(fzf)` part will get replaced
with the path to the file that you selected.

Using `fzf` this way has a downside, which is that you can't easily repeat the
last command from your shell history to re-run the tests. To get around this,
you can assign the result of `fzf` to a variable and reference that when invoking
`rails test`:
```
$ export T=$(fzf)
$ rails test $T
```

# Wrap-Up
Efficiency can help you get *more* done, that's true. But it can also help you
refocus your efforts onto the things that matter to you. Splinters are small
disruptions to your life that can be found in any process you do regularly. I
think that time spent on removing splinters from your life (if you're able) is
a sound investment, because a life filled with distractions is wasteful and
exhausting.

Grease the door hinges! Organize the spice cabinet! Automate that crappy
process at work! Make the small changes to help your life be delightful.
