---
tags: post
title: Exploring the Elementary Cellular Automata
date: 2022-12-03
layout: layouts/post-layout.njk
---
# Exploring the Elementary Cellular Automata
Recently, I became quite interested in cellular automata. For the uninitiated,
a cellular automata is a grid (not necessarily square, you might have triangular
or hexagon cells) of colored cells. Each cell in the grid updates based on the
states of neighboring cells. One of the most famous cellular automata is
[Conway's Game of Life](https://conwaylife.com/), but in this post we'll be
exploring a different kind of automata.

## Elementary Cellular Automata
The elementary cellular automata are the simplest varietal.
They are one-dimensional automata where each cell can only be on or off
(some fancier automata have cells which can be in more than 2 states). By
one-dimensional, I mean that the automata lives in a single, infinitely long row
of cells.

To "run" an automata, we start by coloring in our choice of cells. To advance
the automata, we look at each cell, and figure out what its next state should
be based on our rules. Once we've figured out the next states for all cells, we
update them all at once.

The astute reader will have squinted at my use of the phrase "every cell",
since I said previously that there are an infinite number of cells. Of course,
we can't have an infinite row of cells in reality, so we begrudgingly stop
computing the automata at the boundaries of our space.

To figure out the next value of a cell, you look at that cell's
value and the values of its left and right neighbors. Depending on the values
of all three cells, we assign a new value to the center cell.

Because we only ever consider three cells at a time, and each cell can have
two values, we can completely describe an elementary cellular automata in 8
rules ($2^3$).

## Defining Elementary Cellular Automata
First, let's talk about a way to notate the update rules for a single cell.
We describe how to update a single cell with 4 binary numbers: `110 -> 0`.
The three numbers on the left describe the states of the center cell (the
center number), and its left and right neighbors (the first and last digits
respectively). The number on the right is the new state of the center cell.

## Wolfram Codes
Now, we could notate all 8 rules for our automata in the manner just described,
but a smart guy named Stephen Wolfram (yes, [that Wolfram](https://www.wolframalpha.com/))
came up with a much more compact notation called the [Wolfram Code](https://en.wikipedia.org/wiki/Wolfram_code).

To construct a Wolfram Code for an elementary cellular automata, we first lay
out each of the 8 possible states in a predefined order:
```
111 110 101 100 011 010 001 000
```
This order is descending numeric order, if you interpret each state as a binary
number.

Next, we line up our "output states" (the 4th number in the notation we
introduced previously) underneath the "input states":
```
111 110 101 100 011 010 001 000
 0   0   0   1   1   1   1   0
```
Then, we treat the binary digits we've just laid out as a number, in this
case: `00011110` or `30` in base 10. Thus, `30` is the Wolfram Code with the
following rules:

- `111 -> 0`
- `110 -> 0`
- `101 -> 0`
- `100 -> 1`
- `011 -> 1`
- `010 -> 1`
- `001 -> 1`
- `000 -> 0`

You can, of course, reverse this process to take any number from 0 to 255 and
convert it to the explicit automata rules.

## Visualizing the Elementary Automata
To sate my curiosity about these automata, I build a visualizer that you can
try [here](https://jdseiler.github.io/automata-explorer/)! Each of the
elementary automata can be visualized in two modes: "centered" and "random". In
centered mode, the automata starts as a single cell in the center of the screen.
In random mode, cells in the first row are turned on randomly, often times
resulting in much more chaotic and interesting pictures. Since the automata are
being drawn using the HTML Canvas API, you can save the images at full size to
your computer if you'd like.

Here are some of my favorite automata:
- Rule 18
- Rule 30 (this one is [quite famous](https://en.wikipedia.org/wiki/Rule_30))
- Rule 73
- Rule 105
- Rule 110 (this one is [also quite famous](https://en.wikipedia.org/wiki/Rule_110))
- Rule 169 (specifically in random mode)

The source code for the visualize is available on GitHub at:
[automata-explorer](https://github.com/JDSeiler/automata-explorer). The implementation is...
uninspired... but it was a great afternoon project.
