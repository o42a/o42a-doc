---
title: Value Definition
template: doc.jade
order: 3
---

Value Definition
================
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

An object value definition consists of [sentences](../sentences/index.html),
which define the algorithm of the value evaluation.


Value Evaluation
----------------

An object value is evaluated on each request, unless it has a stateful type like
[variable](../core/variables.html) or mutable [array](../core/arrays.html)
(not row). A client code may request the value evaluation to happen only once
with [eager reference](../expressions/references.html#eager-reference).

The definition is evaluated in the scope of the object. So the same definition
can evaluate to different value in another (derived) object:
```o42a
A := integer (
  Value := 1
  = Value + 1
)
B := a (
  Value = 41
)
```

Here objects `A` and `B` have the same definition, but different values: the
value of `A` is `2`, while the value of `B` is `42`.


Definition Syntax
-----------------

There are multiple ways to provide a definition for an object. Only a very basic
ones represented here.


### Field Value Expression ###

The simplest way to provide a value for an object, is to declare a field with
an expression:
```o42a
Integer constant := 1            ~~ Inherit `integer`, assign value `1`.
String constant := "value"       ~~ Inherit `string`, assign value `"value"`.
Negation := -a                   ~~ Unary operator.
Sum := a + b                     ~~ Binary operator.
Float constant := float '123.45' ~~ Phrase.
```

In this case an object ancestor is the same, as an ancestor of the expression
result.


### Return ###

Within an object definition body the _return_ statement can be used to provide
a value for the object.

The syntax is:

> `'=' <value>`

where `<value>` is an arbitrary expression producing the object value.

Examples:
```o42a
Integer (= 1)
String (= "value")
Foo (= a + b)
```

### Yield ###

A value can be yielded with a _yield_ statement, which has the following syntax:

> `'<<' <value>`

where `<value>` is an arbitrary expression producing the object value.

The _yield_ statement is similar to _return_ one. But it returns evaluated
value only once per object. The next time the same object's value will be
requested, the value evaluation will continue right after the yield statement.

Example:
```o42a
Generator := (
  << 1
  << 2
  << 3
)
Print [generator, generator, generator] nl ~~ Prints `123`.
```


### Conditional Values ###

A conditional definition can be used to provide multiple value alternatives.
Only the first one, which precondition is met, will be used.

Here is an example of mathematical `signum` function declaration:
```o42a
Signum :=> integer (
  Arg :=< integer ~~ Function input.
  Arg < 0? = -1   ~~ The value is `-1` if an input is negative.
  Arg > 0? = 1    ~~ Otherwise, the value is `1` if an input is positive.
  = 0             ~~ Otherwise, the value is `0`.
)
```

Note that the conditions are tested in order of their appearance.

----------

> Learn more about [sentences](/docs/sentences/index.html), then read the
> [Understanding The Value Definition](../sentences/definition.html) article
> to fully understand the value definition concepts.
