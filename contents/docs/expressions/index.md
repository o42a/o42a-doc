---
title: Expressions
template: doc.jade
order: 4
---

Expressions
===========
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Any expression in o42a either constructs a new object, or addresses an existing
one.

An expression is one of:

* [string](/docs/syntax/strings.html);
* [number](/docs/syntax/numbers.html);
* [reference](references.html), which addresses some object;
* [unary](unary.html) or [binary](binary.html) operator;
* [ascendants expression](../objects/samples.html#ascendants_expression);
* object [constructor expression](../objects/creation.html#constructor_expression);
* [array constructor](../core/arrays.html#array_constructor);
* [phrase](/docs/phrases/index.html);
* or [grouping expression](#grouping_expression).


Grouping Expression
-------------------

A grouping expression is any expression enclosed into parentheses. It can be
used e.g. to change the priority of operators:
```o42a
(a + b) * c ~~ Multiply the sum of `a` and `b` by `c`.
```

There is a special syntax to avoid the use of parentheses at the very beginning
of expression:
```o42a
Some expression\ another expression
```

which is the same as
```o42a
(Some expression) another expression
```

Such syntax is especially useful with combination of subsequent phrases, in
order to distinguish one from another:
```o42a
"Some string": substring _from [5]\ [1] ~~ "t"
~~ This is the same as following:
("Some string": substring _from [5]) [1]
```

Note that the grouping expression has higher priority than any operator, so it
works for its operands, not for the whole operator:
```o42a
a + b\ c * d
~~ The above expression is the same as:
a + (b\ c) * d
~~ or, more precisely:
a + ((b _c) * d)
```
