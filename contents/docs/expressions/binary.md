---
title: Binary Operators
template: doc.jade
order: 3
---

Binary Operators
================
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

The following binary operators supported:

---------------------

|     |              |              | Arithmetic Operators
|-----|--------------|--------------|----------------------
| `*` | `×` (U+00D7) | `⋅` (U+22C5) | **Multiplication**. Returns the product of numeric operands. Can be [overridden][].
| `/` | `÷` (U+00F7) | `∕` (U+2215) | **Division**. Returns the quotient of numeric operands. Can be [overridden][].
| `+` |              |              | **Addition**. Returns the sum of numeric operands. Can be [overridden][].
| `-` | `−` (U+2212) |              | **Subtraction**. Returns the difference of numeric operands. Can be [overridden][].

[overridden]: ../phrases/operators.html#binary_operators

---------------------

|       |              | Comparison Operators
|-------|--------------|----------------------
| `==`  |              | **Equals**. Returns `true` if operands are equal, or `false` otherwise. Equality check algorithm can be [customized][].
| `<>`  | `≠` (U+2260) | **Not equals**. Returns `false` if operands are not equal, or `false` otherwise. Can be customized together with `==` operator.
| `<=>` |              | **Compare**. Compares operands. The result of comparison may have arbitrary type. Comparison algorithm can be [customized][].
| `>`   |              | **Greater than**. Returns `true` if the left operand is greater than the right one, or `false` otherwise. Can be customized together with `<=>` operator.
| `>=`  | `≥` (U+2265) | **Greater than or equal to**. Returns `true` if the left operand is greater than or equal to the right one, or `false` otherwise. Can be customized together with `<=>` operator.
| `<`   |              | **Less than**. Returns `true` if the left operand is less than the right one, or `false` otherwise. Can be customized together with `<=>` operator.
| `<=`  | `≤` (U+2264) | **Less than or equal to**. Returns `true` if the left operand is less than or equal to the right one, or `false` otherwise. Can be customized together with `<=>` operator.

[customized]: ../phrases/operators.html#comparison_operators

---------------------

|     | Special Operator
|-----|------------------
| `~` | **Suffix**. A special operator capable of representing things such as quantities, like `3~minutes`. Can be [customized](../phrases/operators.html#suffix_operator).

---------------------

> Note, that the right operand should be at the same line with the left operand
> and operator sign. The following code will raise a compile time error:
>
>     :::o42a
>     1 +  ~~ Right operand expected here.
>     2
>
> While the following code will not be interpreted as a binary operator:
>
>     :::o42a
>     1    ~~ First statement.
>     + 2  ~~ Second statement.
>
> An [underscore](/docs/syntax/underscore.html) should be used to place the
> binary operator on multiple lines:
>
>     :::o42a
>     ~~ Place an underscore on the next line (__recommended practice__).
>     1 +
>     _2
>
>     ~~ Place an underscore before the sign.
>     1
>     _+ 2


Operators Precedence
--------------------

Binary operators has lower precedence, than [unary operators](unary.html) and
[reference](references.html) qualifiers.

| Precedence | Operator
|------------|----------
| 1          | `~`
| 2          | `*`, `×`, `⋅`, `/`, `÷`, `∕`
| 3          | `+`, `-`, `−`
| 4          | `<=>`
| 5          | `==`, `<>`, `≠`, `>`, `>=`, `≥`, `<`, `<=`, `≤`
