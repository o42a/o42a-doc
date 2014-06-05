---
title: Documentation
template: doc.jade
---

Statements
==========
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A statement can be one of:

* an [expression](/docs/expressions/index.html),
* a [self-assignment](/docs/objects/definition.html#self-assignment),
* a member declaration,
* a [local declaration](locals.html),
* a [assignment](../core/variables.html#assignment),
* a [declarative block](#declarative_block), or
* an [imperative block](imperatives.html).

When expression results to a directive, then this directive is executed at
compile time and replaced with its result, if any.

Otherwise, an expression is treated as a condition. Its value is discarded,
while the logical value not. So, an expression used as a statement is
effectively the same as `++<expression>`.

A sentence containing member declaration can not contain any other statements
(except for some directives).


### Declarative Block ###

A declarative block is a group of sentences enclosed into parentheses:

> ` '(' [ <sentence> ] ... ')'`

#

Each statement, except the member declaration, has a
[logical value](../objects/value.html#logical_value). It is possible to
logically combine the statements, separating them with:

* a colon (**`,`**) to declare the first statement is a
  [requirement](#requirements) of the other, or
* a semicolon (**`;`**) to declare the second statement is an
  [alternative](#alternatives) to the first one.


Requirements
------------

To declare that one statement is required by another, the requirement statement
should be separated from the dependent one by _comma_ ('**`,`**'):

> `<requirement> ',' <dependent>`

The `<requirement>` has to be `true` for the `<dependent>` to be evaluated. The
logical result of the whole construction is `true` if both `<requirement>` and
`<dependent>` succeed. This corresponds to the logical AND.

Examples:
```o42a
False, = 2   ~~ Always false. The `2` is ignored.
Foo > 0, = 1 ~~ The value is `1` if `foo` is positive, or false otherwise.
```

More than two statements can be combined:
```o42a
Foo >= 0, foo <= 100, = "percent" ~~ The value is `"percent"` if `foo` between
                                  ~~ `0` and `100`, or false otherwise.
```

A [self-assignment](/docs/objects/definition.html#self-assignment) statement can
not be used as a requirement of another one. So the following is incorrect:
```o42a
foo >= 0, = "percent", foo <= 100 ~~Redundant statement.~~
```


Alternatives
------------

To declare that a group of statements can be executed only when the preceding
group failed, the following syntax can be used:

> `<alternative1> ';' <alternative2>`

where:

* `<alternative1>` is one ore more comma-delimited statements, which will be
  executed first;
* `<alternative2>` is zero or more comma-delimited statements, which will be
  executed only when the `<alternative1>` fails.

More than two alternatives can be combined.

Note that the _comma_ ('**`,`**') has a higher precedence over a _semicolon_
('**`;`**').

The logical result of the whole construction is `true` when either of
alternatives succeeded. This corresponds to the logical OR.

An example:
```o42a
a > 0, = "Positive"; ~~ Value is `"positive"` if `a` is positive.
a < 0, = "Negative"; ~~ Otherwise, value is `"negative"` if `a` is negative.
= "Zero"             ~~ Otherwise, value is `"zero"`.
```
