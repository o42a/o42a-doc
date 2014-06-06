---
title: Imperative Blocks
template: doc.jade
order: 6
---

Imperative Blocks
=================
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A block of code enclosed into braces is called imperative:

> `'{' ... '}'`

An imperative block may appear as a [statement](statements.html), or as part of
phrase.

The imperative code consists of [sentences](index.html), just like a declarative
one. Claims are treated differently though.

Any nested block inside of imperative one, either enclosed into parentheses or
braces, is imperative too.

An imperative code, in contrast to declarative one, can not declare the
enclosing object's members. But it can contain an advanced execution logic, such
as [loops](#loops).


Named Blocks
------------

A name can be assigned to the imperative block, when it appears as a statement.
The syntax is:

> `<name> ':' '{' ... '}'`

The block name should be unique within an object definition or within a phrase
part.


Loops
-----

Every imperative block is inherently a loop, because every block execution can
be repeated or aborted.

To repeat the block execution an _ellipsis_ (`...`) statement can be used:
```o42a
{
  I := ``0
  { ~~ Loop.
    Print [i] nl ~~ Prints numbers from `0` to `9`.
    I = i + 1
    I < 10? ...  ~~ Repeat the loop if `i < 10`.
  }
}
```

The ellipsis statement ignores parentheses. So, the above can be written as
following:
```o42a
{
  I := ``0
  { ~~ Loop.
    Print [i] nl  ~~ Prints numbers from `0` to `9`.
    I = i + 1
    I < 10? (...) ~~ Repeat the loop if `i < 10`.
                  ~~ Note that execution control escapes parentheses
                  ~~ and continues execution from the opening brace.
  }
}
```

It is possible to repeat the execution of any enclosing block, not only the
immediately enclosing one. For that the target block should have a name, and a
special ellipsis syntax should be used:
```o42a
I := ``0
Outer loop: {
  J := ``i
  I < 10 ? { ~~ Inner loop.
    J > 0? Print " "
    Print [i]
    J = j - 1
    J < 0? I = i + 1, print _nl ... outer loop ~~ Repeat the `outer loop`.
    ... ~~ Repeat inner loop.
  }
}
```

To exit the block a claim sentence can be used:
```o42a
{
  I := ``0
  { ~~ Loop.
    Print [i] nl ~~ Prints numbers from `0` to `9`.
    I = i + 1
    I >= 10?!    ~~ Exit when `i >= 10`.
    ...          ~~ Repeat the loop otherwise.
  }
}
```

To exit the named block an ellipsis can be used in the claim sentence:
```o42a
I := ``0
Outer loop: {
  J := ``i
  { ~~ Inner loop.
    J > 0? Print " "
    Print [i]
    J := j - 1
    J > 0? ... ~~ Repeat the inner loop.
    I = i + 1
    Print_ nl
    I >= 10? ... outer loop! ~~ Exit the `outer loop`.
    ... outer loop           ~~ Repeat the `outer loop`.
  }
}
```
