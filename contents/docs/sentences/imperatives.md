---
title: Imperative Blocks
template: doc.jade
order: 2
---

Imperative Blocks
=================
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
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
one.

Any nested block inside of imperative one, either enclosed into parentheses or
braces, is imperative too.

An imperative code, in contrast to declarative one, can not declare the
enclosing object's members. But it can contain an advanced execution logic, such
as [loops](#loops).

A [declarative](index.html#declarative-sentence) within imperative code is
called _imperative sentence_ and is treated the same way. 


Named Blocks
------------

A name can be assigned to imperative block when it appears as a statement.
The syntax is:

> `<name> ':' '{' ... '}'`

The block name should be unique within an object definition or within a phrase
part.


Loops
-----

Every imperative block is inherently a loop, because every block execution can
be repeated or aborted.

An imperative block is repeated after successful execution of
_continuation sentence_ terminated with _ellipsis_ (`...`):
```o42a
$I = ``0
{ ~~ Loop.
  Print [i] nl ~~ Prints numbers from `0` to `9`.
  I +<< 1
  I < 10? ...  ~~ Repeat the loop if `i < 10`.
}
```

Continuations ignore parentheses. So, the above can be written as following:
```o42a
$I = ``0
{ ~~ Loop.
  Print [i] nl  ~~ Prints numbers from `0` to `9`.
  I +<< 1
  I < 10? (...) ~~ Repeat the loop if `i < 10`.
                ~~ Note that execution control escapes parentheses
                ~~ and continues execution from the opening brace.
}
```

If empty continuation sentence immediately follows an interrogative one,
a short _continued interrogation_ (`?..`) syntax can be used:
```o42a
$I = ``0
{ ~~ Loop.
  Print [i] nl ~~ Prints numbers from `0` to `9`.
  I +<< 1
  I < 10?..    ~~ Repeat the loop if `i < 10`.
}
```

It is possible to repeat the execution of any enclosing block, not only the
immediately enclosing one. For that the target block should have a name, and a
special ellipsis syntax should be used:
```o42a
$I = ``0
Outer loop: {
  $J = ``i
  I < 10 ? { ~~ Inner loop.
    J > 0? Print " "
    Print [i]
    J -<< 1
    J < 0? I +<< 1, print _nl... outer loop ~~ Repeat the `outer loop`.
    ... ~~ Repeat the inner loop.
  }
}
```

An imperative block is exited after successful execution of
_exclamation sentence_ terminated with _exclamation mark_ (`!`).
```o42a
$I = ``0
{ ~~ Loop.
  Print [i] nl ~~ Prints numbers from `0` to `9`.
  I +<< 1
  I >= 10?!    ~~ Exit when `i >= 10`.
  ...          ~~ Repeat the loop otherwise.
}
```

To exit a named block a special _continued exclamation_ (`!..`) syntax should be
used:
```o42a
$I = ``0
Outer loop: {
  $J = ``i
  { ~~ Inner loop.
    J > 0? Print " "
    Print [i]
    J -<< 1
    J > 0?..                 ~~ Repeat the inner loop.
    I +<< 1
    Print _nl
    I >= 10?!.. outer loop   ~~ Exit the `outer loop`.
    ... outer loop           ~~ Repeat the `outer loop`.
  }
}
```
