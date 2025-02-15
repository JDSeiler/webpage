---
tags: post
title: "Understanding React: Part 1"
date: 2024-11-01
layout: layouts/post-layout.njk
---

# Understanding React: Part 1

I have a confession to make.

I've written React for many years, but it wasn't until this year that I really
felt like I had any deep understanding of how it _really_ works. I knew how
React worked practically, certainly enough to be productive at work, but I
lacked a fundamental understanding of what makes React tick.

I hope this will be a series of posts where I can share my "a-ha!" moments about
React. Throughout I'll be assuming an intermediate-advanced knowledge of
JavaScript and React.

## Credits

The person who sparked my new understanding of React was Nadia Makarevich, the
author of the [Developer Way](https://www.developerway.com/) blog and the book
"Advanced React". I can highly recommend the content in "Advanced React", but
(and perhaps I just got a lemon) my Amazon print-on-demand copy quickly started
falling apart. So, maybe get the Kindle edition and spare yourself some trouble.

## Elements vs Components
I want to start at the very beginning. "Element" and "Component" are words that
any React developer should know, but what are they exactly?

Components are the core building blocks in React. They are normal functions
which return elements.

> If you're working with an older learning resource or React project, you may also
> see components defined as classes which extend `Component` and implement a
> `render` method. At this point, class based components are a legacy style, and
> so I'm going to focus on function components instead.

Elements, in turn, are normal JavaScript objects that tell React what to render.
Creating elements is extremely cheap and doing so, by itself, does _not_ cause
any rendering to occur. We typically create elements using JSX, but JSX is simply
syntax sugar for the `createElement` function.

```tsx
// This:
const ContactCard = ({ firstName, lastName }) => {
  return (
    <div>
      <span>{firstName}</span>
      <span>{lastName}</span>
    </div>
  );
};

// Is the same as:
const ContactCard = ({ firstName, lastName }) => {
  return React.createElement(
    "div",
    null, // no props
    React.createElement("span", firstName),
    React.createElement("span", lastName),
  );
};
```

We can see exactly what the output of `createElement` looks like by logging it:

```js
// createElement('div', null, 'hello')
// aka
// <div></div>
{
  "type": "div",
  "key": null,
  "ref": null,
  "props": null,
  "_owner": {
    "@r": 9
  },
  "_store": {}
}
```

There are some internal properties that, despite their beguiling mystery, we
wont be exploring. But, we can see:

1. this is a very normal looking object, and
2. the properties of the object map to the JSX in an obvious way.

The built-in HTML elements are a bit of a special case, because we call
`createElement` with a string. When using our own function components, we'd
actually write: `createElement(MyComponent)` and React would produce an object
like:

```js
{
  "type": MyComponent,
  // snip
}
```

You might be wondering where child elements are in the output. Let's find out
with another example. I'll cut out the `_owner` and `_store` properties to make
the output a bit easier to parse. They're not relevant to what we're looking at
anyway.

```js
createElement(
  'div',
  { key: "foo", ref: 'span', className: "contact-card" },
  createElement(
    'span',
    null,
    "\"Hello\""
  )
)
// creates:
{
  "type": "div",
  "key": "foo",
  "ref": "span",
  "props": {
    "className": "contact-card",
    "children": {
      "type": "span",
      "key": null,
      "ref": null,
      "props": {
        // The double quotes tell React that this is the string "Hello" and not
        // a component called `Hello`.
        "children": "\"Hello\""
      }
    }
  }
}
```

If you've written much React, this probably wont be a surprise, since you access child
components through the `children` prop. The only thing special about the `children`
prop is that React adds it for you automatically. To hammer this home, the following
examples are practically identical:

```jsx
const IconButton = ({ icon }) => {
  return (
    <div className="super-icon-styles">
      {icon}
    </div>
  );
};
const usage = <IconButton icon={<img src="https://placecats.com/300/200" />} />;

// Versus

const IconButton = ({ children }) => {
  return (
    <div className="super-icon-styles">
      {children}
    </div>;
  );
};
const usage = (
  <IconButton>
    <img src="https://placecats.com/300/200" />
  </IconButton>
);
```

## Rendering and Reconciliation
OK, great, JSX is simply sugar for `createElement` and elements themselves are plain-old
objects. But how does this all come together during rendering?

A typical React entrypoint is going to look something like this:
```jsx
import { createRoot } from 'react-dom/client';
import App from './app';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
```
Desugaring the JSX, we get:
```jsx
root.render(
  React.createElement(
    App,
    null,
    null
  )
);
```
And if we evaluate that `createElement` call, we get *something* like:
```jsx
// The more mystical properties of the element have been omitted
root.render({
  type: App,
  key: null,
  ref: null,
  props: {}
})
```
In order to figure out what to do with this, React has to do some work to resolve
components into native HTML elements. Starting with this root element, React will
perform this general process for each node in the element tree:
```
Is this node a component?
  Yes:
    Call the component and pass it this node's props
    Replace this node with the element returned by the component
  No:
    This must be a built in HTML element
    Continue on to the next node
```
React repeats this resolution process, layer by layer, until it has converted
every element into something it knows how to render.

> You can read more in [this post](https://legacy.reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)
> from the legacy React docs. It's rather old but the concepts are the same.

> This [newer post](https://react.dev/learn/understanding-your-ui-as-a-tree#the-render-tree)
> covers some of the same ground, but it doesn't get into the nitty-gritty as much.

Once React has this tree of elements, it does the work to figure out what to
actually put on the webpage. This is also why you need both the `react` and
`react-dom` packages to write a React web app. The `react` package creates the
tree of elements, which is agnostic to how the UI is being rendered. Then, the
`react-dom` package takes the element tree and figures out how to render it
*specifically* as a webpage.

### Subsequent Renders
React wouldn't be that useful if our apps were static and only rendered once.
Things change! Our applications have *state*. When a state change occurs in your
React app, React will rerender that element (the affected node in the element
tree) and all of its children. This process produces a new element tree, which
React compares to the original to figure out what it needs to update on the DOM.
In some cases, React might only need to update a few attributes, but in other
cases React might need to destroy and rebuild entire subtrees of the DOM.

For further reading, this process of figuring out what changed by comparing
element trees is called *reconciliation*.

### Recap
1. Components are functions which return elements.
2. Elements are lightweight JavaScript objects which describe what needs to be
rendered.
3. React recursively resolves elements which refer to components (as opposed to
HTML elements) by calling the Component and passing the provided props. This
progressively refines the element tree until it is entirely defined by HTML
elements.
4. When React is re-rendering, it is comparing two element trees and using
heuristics to figure out what changed and update the real DOM as quickly as
possible. This process is called reconciliation.

## Application
The understanding of JSX as function calls, and React's deep interest in the
element tree, leads to some insights.

### What Triggers Re-Renders
When you first learn React, you're taught that when a component re-renders, React
will re-render its children too. Using the knowledge that JSX is sugar for function
calls, we can see why this is the case:

```jsx
const Parent = () => {
  // Every time Parent re-renders, we're making a NEW
  // object for Child.
  // That object may have all the same keys and values,
  // but it's a new object in memory.
  return <Child />;
};
```

This fact is also why props are **not** relevant to re-rendering, by default.
A child component is always going to re-render when its parent re-renders,
regardless of prop changes, because new renders create new objects.

Ultimately, all re-renders are directly or indirectly caused by state changes.
Either a component had a state update itself, or one of its parents up the chain
had a state update.

### Elements as Props
When we talk about parent-child relationships, as it pertains to re-renders, it
is important to note that it's *not* about how the JSX is nested.

Consider the following VERY contrived example:
```tsx
const MainPage = () => {
  return (
    <FastUpdater>
      {/*
      The implementation of SlowToRender isn't important.
      It could be any component that takes a while to render.
      */}
      <SlowToRender />
    </FastUpdater>
  );
};

const FastUpdater = ({ children }) => {
  // A made up hook that constantly updates
  // with the current Epoch time, in milliseconds.
  const timestamp = useTimeMilliseconds();

  return (
    <div>
      <h1> The time is {timestamp} </h1>
      <div>{children}</div>
    </div>
  );
};
```

On first blush, this might seem like a bad idea. `FastUpdater` is going to
continuously re-render. Surely that's going to make `SlowToRender` constantly
re-render and tank our performance? Not so! Let's rewrite the example to make it
more clear:

```tsx
// This is equivalent to the previous implementation of MainPage.
const MainPage = () => {
  // Remember this is just sugar for `createElement`, which just
  // makes a plain-old JS object.
  const slow = <SlowToRender />;

  return <FastUpdater children={slow} />;
};
```

`slow` is created when `MainPage` renders, and that object is passed to
`FastUpdater`, which returns it wrapped in some extra markup. Every render,
`FastUpdater` is getting the exact same child. Not even a child element with
merely the same *values*, but literally the same object in memory.

When React looks at the element tree returned by `MainPage`, it's going to look
through for anything that's changed. When it see's that the part represented by
`slow` is _exactly the same object_ it was before, it's going to skip over it.
That's why it's not going to re-render!

It can be confusing to untangle all of the different tree-shaped concepts, like the
JSX nesting, element tree, DOM tree, etc. But at the end of the day, remember that
JSX is only a thin layer on top of functions and simple nested objects.

> You can read more in the [`createElement` docs](https://react.dev/reference/react/createElement).

### Memoization
We'll wrap up part 1 with a brief look at an often misapplied feature of React: memoization.

Recall from earlier that React doesn't care if props have changed when it's
deciding whether to re-render a component. But, sometimes we *want* to prevent
re-renders if props are unchanged.

We could implement this by writing a function that:

1. Looks at the incoming props to see if we've seen them before.
2. If we have seen them before, return a stored copy of that rendered component.
   Remember that this will be a plain JS object.
3. If we've not seen them before, render the component and return it, but also
   store a copy in case we try to render with these same props again.

This technique is called **memoization** and React already provides this
function for you. It's called [memo](https://react.dev/reference/react/memo).
When you wrap a component in `memo`, it will usually not re-render with its
parent, so long as its props are unchanged. "Usually" is an important caveat,
since React reserves the right to re-render your component anyway.

In practice, memoization has some pitfalls.

First, any values that are not primitive values must *themselves* be memoized,
because React uses shallow/referential equality to determine if a prop has
changed. Sometimes, this results in large "memoization chains" where a single
mistake will break memoization for all downstream values/components.

Second, memoization can make performance *worse*. Sometimes, people assume that
the computation required to check if props have changed must be cheaper than
re-rendering the component. This is not a safe assumption! There are a lot of
things that go into performance, and it's not a good use of time to apply
memoization without a benchmark in place to see if it's doing anything.

Beyond the performance implications, it creates extra cognitive overhead in the
code. Memoization is easy to break for non-trivial components due to the
"memoization chains" described above, and future maintainers may have to perform
extra work to preserve it. Without concrete evidence that the memoization is
effective, I don't think it's worth the trouble.

## Next Time
In Part 2, I'll discuss how to understand, manage, and eliminate effects.
