---
title: Operators Override
template: doc.jade
order: 7
---

Operators Override
==================
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Arithmetic and comparison operators in o42a are just a special forms of phrases
and can be defined by corresponding clauses. Operators of basic types are all
defined this way.

Identifiers of operator clauses have the same syntax as their corresponding
operators. The first operand of such identifier should be either a clause name
or an asterisk (**`*`**). The second one should always be an asterisk.


Unary Operators
---------------

[Unary](/docs/expressions/unary.html) plus (**`+`**) and minus (**`-`**) can be
overridden.

An operand is a phrase prefix and can be substituted with either `$prefix` or
`()` expressions.

Here is a definition of unary operators for complex numbers:
```o42a
Complex numbers := void (
  Minus :=> complex (
    Operand :=< `complex
    Real = -operand: real
    Img = -operand: img
  )
)
Complex :=> void (
  Real :=< float
  Img :=< float
  <+*> ~~ No content. Just return an operand.
  <*> Complex numbers: minus (
    <-*> Operand = () ~~ Substitute the operand as `operand` field.
  )
)
```


Binary Operators
----------------

[Binary](/docs/expressions/binary.html) arithmetic operators (`+`, `-`, `*`, and
`/`) can be overridden by corresponding clauses.

The left operand is a phrase prefix and can be substituted with `$prefix`
expression. The right operand is handled as a clause value.

Here is a definition of addition operator for complex numbers:
```o42a
Complex numbers := void (
  Add :=> complex (
    Left operand :=< `complex
    Right operand :=< `complex
    Real = left operand: real + right operand: real
    Img = left operand: img + right operand: img
  )
)
Complex :=> void (
  Real :=< float
  Img :=< float
  <*Addition> Complex numbers: add (

    <*Left summand | right summand> Left operand = $prefix ~~ Substitute the
                                                           ~~ left operand

    <:Right summand> (
      <* + *> Right operand = () ~~ Substitute the right operand
    )
  )
)
```

 Comparison Operators
---------------------

[Comparison](/docs/expressions/binary.html) operators can be overridden in
conjunction, by clauses identified by **`<=>`** and **`==`**. I.e. a single
clause defines multiple operators.

Operands of comparison operators are handled the same way as the ones of the
binary arithmetic operators.

The **`==`** clause defines both _equals_ (**`==`**) and _not equals_ (**`<>`**)
operators. It should declare an expression, which logical value interpreted as
equality. I.e. if the result is `false`, the values considered not equal,
otherwise they considered equal.

Here is a definition of complex numbers equality check:
```o42a
Complex numbers := void (
  Equals :=> void (
    What :=< `complex
    To :=< `complex
    What: real == to: real, what: img == to: img
  )
)
Complex :=> void (
  Real :=< float
  Img :=< float
  <*Equality> Complex numbers: equals (
     <*What equals | equals to> What = $prefix
     <:Equals to> (
       <* == *> To = ()
     )
  )
)
```

The **`<=>`** clause defines a _compare_ (**`<=>`**) operator.

This clause can define any expression. But in order to all comparison operators
(**`<`**, **`<=`**, **`>`**, and **`>=`**) to work, such expression should have
an integer value. This value is interpreted the following way:

* if the value is negative, then the left operand considered less than the
  right one;
* if the value is positive, then the left operand considered greater than the
  right one;
* if the value is zero, then operands considered equal.

This clause will be used to interpret an _equals_ (**`==`**) and _not equals_
(**`<>`**) operators, if the **`==`** clause is not declared.


Suffix Operator
---------------

The [suffix](/docs/expressions/binary.html) operator (`~`) differs from the rest
of binary operators by the meaning of its operands. The ordinal binary operator
interprets its left operand as a phrase prefix, and the right one as argument.
The suffix operator uses __the right operand__ to find a phrase prefix, and the
the left one as argument. This makes it suitable for representing things like
quantities.

If the right operand contains a phrase, this phrase's prefix is used as a
resulting phrase prefix, the left operand is used as argument, and the right
operand's phrase parts are appended to the resulting phrase __after__ the left
operand.

The suffix operand can be overridden with corresponding clause:
```o42a
Minutes :=> integer (
  <How many ~ *>
)

3~minutes
~~ Canonical form:
Minutes (= 3)
```
