---
tags: post
title: "Two Sides of Programs"
date: 2025-09-13
layout: layouts/post-layout.njk
---

# Two Sides of Programs

One thing that’s great about having a blog is that it gives me a place to talk
about the abstract nonsense that flies around my head so that it can… stop
doing that…  Most recently, I’ve been thinking a lot about types in programming
languages, and how to situate them in my mental model of programming.

I want to start with how I used to think about types. My first language was
Python, which at the time had just barely added type annotations, and so they
were not a part of my learning. I would gain experience with more robust type
systems later, but my programming was in untyped languages for at least a year.

As I learned to program, my mental model of languages split into two broad
parts. One part was the behavior or functional part of the language. This
includes things like procedure definitions, classes, structures, or anything
else that makes up the actual execution of the program. Throughout the rest of
this post, I may use the term “functions” to generically describe this idea.
The other part was the types, which “just described” what was happening within
the functions. 

In this mental model, types are more like an afterthought or a decoration on
top of “the real program”, which is described by the functional part of the
source code. The thought process is that types are not what actually executes,
they only annotate what executes, and so are in a sense less important than the
functions.

This all began to shift during undergrad, when I took a course focused on the
study of programming languages. As part of this course, the instructor taught
us a “design recipe” for programs. The exact details of the recipe aren’t
pertinent here, except that it started with defining the data types before
writing any “actual” code. Using the recipe in class showed me that functions
could be systematically derived from data types. In other words, it showed me
that you could take a “data first” approach to program design.

Interestingly, the class was predominantly taught in Racket, which is a
descendant of Scheme and has even fewer typing facilities than Python ([Typed
Racket](https://docs.racket-lang.org/ts-guide/) exists, but it’s classified as
a “sister language” and not part of Racket-proper). All of this data design was
happening in comments or on paper! And not only did I find this process useful,
but it could be done in any language, not just ones with powerful type systems.

As this percolated around in my head, a new philosophy started to emerge.
Instead of thinking of types as a decoration on top of functions, I began to
think of types and functions as two sides of the same coin. 

Programs need behavior and data to operate. Without behavior, data is lifeless.
But without data, behaviors have nothing to operate on. Abstractly, all
programs define some sort of data model (set of types) because the functional
aspect of the program implicitly defines expectations about what it will
operate on. But, the quality of this data model is going to vary based on the
level of care taken by the programmer and the tools provided by the language.
Regardless of language, good programs have models of data and behavior that
relate together coherently.

The key difference is in seeing your data model (whether it’s concretely
expressed or not) as an equal partner with your functions in the definition of
your program. By thinking about your data types and how they relate up front,
you’re helping ensure the data aspect of your program’s design is not
neglected. A good data model functions like a skeleton for your program on
which the rest of it can attach. 

This is where type systems enter the picture for me. A type system gives you
tools to express your ideas concretely and tie your design to the functional
aspects of your program. Furthermore, the compiler or type-checker can check
your types for validity, which can help keep the design consistent as it’s used
over time. In an untyped program, your data model and associated functions are
unmoored from one-another. Their consistency is only as strong as the
programmer’s discipline in keeping them synchronized. Without any kind of
guardrails, it’s easy for the documented mental model and the actual code to
become out of sync.

But, the key is not so much having a type system as it is doing the work to
design all aspects of your program well. Just having a type system in your
language doesn’t mean that that your data model is going to be good. Types are
a tool of expression that can be used to express bad ideas just as well as good
ones. Suggesting that a program written in a typed language is intrinsically
better designed than an untyped program is like saying that a book will have a
better story because it’s written in French instead of English. Nevertheless, I
think type systems make the difficult work of program design more tractable by
providing you with tools to keep it organized and self-consistent.

So what’s the takeaway? It’s that just because a program is typed does not mean
it is founded on a good data model. A model has to be designed, type system or
no, and then types can be used to express or formalize the model. Both the data
model and the design of the programs behavioral elements must work together to
form a coherent system. Producing this coherency doesn’t necessarily require a
type system, but it does require careful attention on the part of the
programmer, and a type system can be a great help.
