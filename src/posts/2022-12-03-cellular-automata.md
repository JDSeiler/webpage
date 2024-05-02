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
The elementary cellular automata are the simplest kind of cellular automata.
They are one-dimensional automata where each cell can only be on or off
(some fancier automata have cells which can be in more than 2 states).By
one-dimensional, I mean that the automata lives in a single, infinitely long row
of cells.

To "run" an automata, we start by coloring in our choice of cells. To advance
the automata, we look at each cell, and figure out what its next state should
be based on our rules. Once we've figured out the next states for all cells, we
update them all at once.

The astute reader will have squinted at my use of the phrase "every cell", since
I said previoulsy that there are an infinite number of cells. Of course, we
can't have an infite row of cells in reality, so we begrudingly stop computing
the automata at the boundaries of our tape.

To figure out the next value of a cell, you look at that cell's
value and the values of its left and right neighbors. Depending on the values
of all three cells, we assign a new value to the center cell. 

Because we only ever consider three cells at a time, and each cell can have
two values, we can completely describe an elementary cellular automata in 8
rules. 

## Defining Elementary Cellular Automata
First, let's talk about a way to notate the update rules for a single cell.
We describe how to update a single cell with 4 binary numbers: `110 -> 0`.
The three numbers on the left describe the states of the center cell (the
center number), and its left and right neighbors (the first and last digits
respectively). The number on the right is the new state of the center cell.

## Wolfram Codes

## Visualizing the Elementary Automata

