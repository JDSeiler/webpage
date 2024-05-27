---
tags: post
title: Any, Unknown, and Never, in TypeScript
date: 2022-11-15
layout: layouts/post-layout.njk
---
In my years of writing TypeScript, I've encountered areas of the language where
myself and others often get tripped up. One example are three special types:

- `any`
- `unknown`
- `never`

In this post, I want to give a rundown of what these types mean and how to use
them from a practical perspective.

# `any`
`any` is the most straightfoward of the three special types. A value of type
`any` can be, well, anything! You can think of variables with the type `any` as
having type-checking disabled. We say that all types are assignable to `any`,
and that `any` is assignable to any type.

```ts
// All of the following is legal, even if it's not valid/useful

// "foo" could be any value of any type. That's what we mean when we say all 
// types "are assignable" to `any`
let x: any = "foo";
let y: number = x;
x[1];
x.someProperty;
x.someMadeUpMethodName()

const square = (n: number) => n*n;
// mySquare will be NaN here, not good!
// `any` can be used in the place of any type. `square` expects a value of type
// `number` but we substitute in `any`. This is what we mean when we say `any`
// "is assignable to" any type
let mySquare = square(y);
```

Typically, `any` is used as an escape-hatch from the type system when it'd be
too difficult or tedious to convince TypeScript that some code is correct.

# `unknown`
`unknown` is the "type-safe" version of `any`. You can assign anything to a
variable of type `unknown`, but basically no operations are permitted on an
`unknown` value except for assignment to `any` and type-casting.

```ts
let x: unknown = "foo"

// ILLEGAL! 
let y: number = x;

// LEGAL! Anything is assignable to `any`.
let z: any = x; 
// LEGAL! Type-casting `unknown` is allowed (and generally necessary).
let w: string = x as string;

// Using `unknown` in any way is also illegal.
// The following 3 lines would cause a compiler error:
let result = x + x;
let propertyAccess = x.length;
let callingMethods = x.toString();
// and just about anything else you can think of...
```

The utility of `unknown` is that it lets us write code that accepts values of
any type, but forces us to more-or-less safely assert the type of the value
before the compiler will let us use it. TypeScript offers many different ways
for asserting or otherwise specifying the type of a value, and the details are
outside the scope of this post. But, you can read all about it in the
TypeScript manual page on [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

# The characters so far:
- `any`
  - Can be assigned a value of any type.
  - Can be used in place of any type.
- `unknown`
  - Can be assigned a value of any type.
  - **Cannot** be used without a type-cast.

# `never`
You can think of `never` as the "opposite" of `any` and `unknown`. Whereas `any`
and `unknown` are types that contain all possible values, `never` is a type that
contains **no** values.

Unsurprisingly, this means that the only things you can assign to a variable of
type `never` are more expressions with the type `never`. The use of the term
"expression" is very purposeful, because there is no such thing as a *value*
with type `never`, by definition.

Less intuitively, an expression of type `never` can be assigned to any variable
of any type. For example:

```ts
function foo(): never {
  throw "err";
}

// This is legal!
const bar: number = foo();
```

This is a kind of [vacuous truth](https://en.wikipedia.org/wiki/Vacuous_truth).
It's true, in an unsatisfying way, that `bar` is being assigned a number because
it's not being assigned any value at all.

If it's not obvious to you why `never` is useful or even necessary, you are not
alone. Unless you're writing advanced conditional types (a topic for another day)
you are pretty unlikely to need `never`. Though, you may encounter it from time
to time if you're using a library with complex generic types and you don't
specify the type arguments correctly.

`never` serves some important theoretical purposes (another topic for another
day), but the most practical usecase I can think of for most people is
exhaustiveness checking. Here's an example:

```ts
interface ComputerScienceStudent {
  major: 'cs';
  favoriteLanguage: string;
}

interface ArchitectureStudent {
  major: 'arch';
  favoriteBuilding: string;
}

interface MathStudent {
  major: 'math'
  favoriteEquation: string;
}

type Student =
 | ComputerScienceStudent
 | ArchitectureStudent
 | MathStudent;

function greetStudent(student: Student) {
  switch (student.major) {
    case 'cs':
      console.log(`Student's favorite language is ${student.favoriteLanguage}`);
      return;
    case 'arch':
      console.log(`Student's favorite building is: ${student.favoriteBuilding}`);
      return;
    case 'math':
      console.log(`Students favorite equation is: ${student.favoriteEquation}`);
      return;
    default:
      // THIS IS THE IMPORTANT BIT
      // This assignment will produce a compiler error if you are not
      // handling every possible variant of `Student`.
      const _check: never = student;
      return _check
  }
}
```
What we're doing is producing a statement that is only valid if it's impossible
for the `default` case of the switch statement to actually run. The `default`
case will never run if all the variants of `Student` are processed by a preceding
branch of the `switch`. So, if we were to add a variant to the `Student` type
later and fail to update `greetStudent`, we'd get a compile error because it 
would be possible to assign a real value to the `_check` variable.

# Summary
- `any` and `unknown` are both types that encompass all possible values.
- `any` basically turns off type-checking.
- `unknown` allows you to process values of any type, while also forcing you
to in some way assert the type of the value before you can actually use it.
- `never` is a type that contains no values.
- Outside the world of conditional types, `never` is pretty niche. You can use
it to make sure you're processing all variants of a discriminated union type.
- `never` becomes way more uesful when you're writing conditional and/or
recursive types. If you're doing that you probably didn't need this post.

