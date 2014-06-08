---
title: Reusing Clauses
template: doc.jade
order: 4
---

Reusing Clauses
===============
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Within compound phrase it can be useful to include the same part multiple times,
or move upwards the nested object's definition and to place the subsequent
definitions to the upper-level object. All of this can be done with a clause
reuse.

When one clause reuses another, then clauses corresponding to subsequent phrase
parts will be searched in the clause itself first. And then, if not found, among
the reused clauses.

An example:
```o42a
Phrase :=> void (
  Foo :=< `integer
  Bar :=< `string
  <*Foo setter> (
    <[] | bar setter> Foo = ()
  )
  <*Bar setter> (
    <'' | foo setter> Bar = ()
  )
)

Phrase 'value' [42] ~~ The same as:
Phrase [42] 'value' ~~ And the same as:
Phrase (
  Foo = 42
  Bar = 'value'
)
```

There are two forms of reusing the clause:

- the reuse of a certain clause;
- the reuse of all sub-clauses of the given clause (including clauses reused by
  it, recursively).

By default, the first form is applied. To apply the second one, an asterisk
(`*`) should be added right after reused clause reference in the clause
declaration:
```o42a
Phrase :=> void (
  A :=< `integer
  B :=< `integer
  C :=< `integer

  <[] | set b*> A = () ~~ Value of `b` can be placed right after this.
  <Set a> (
    <[]
      | set b  ~~ `Set b` can be placed after value. ~~
      | set b* ~~ Or `b` value can be placed right after this one. ~~/> A = ()
  )
  <Set b> (
    <[] | set c | set c*> B = ()
  )
  <Set c> (
    <[]> C = ()
  )
)

Phrase _set a [1] set b [2] set c [3]  ~~ Long form.
Phrase [1, 2, 3]                       ~~ Short form.
```

[Implicit clauses](compound.html#implicit-clauses) can not be reused directly,
so the asterisk is always implied for them and is optional. 


Reusing Object and Top-Level Clause
-----------------------------------

Enclosing object can be reused too. The `$object` reference can be used for that:
```o42a
Phrase :=> void (
  Foo :=< `integer
  Bar :=< `string
  <[] | $object> Foo = ()
  <'' | $object> Bar = ()
)

Phrase 'value' [42] ~~ The same as:
Phrase [42] 'value' ~~ And the same as:
Phrase (
  Foo = 42
  Bar = 'value'
)
```

It is always implied that the sub-clauses of object reused, so the asterisk is
optional when reusing the object.

It is impossible to reuse the object when a top-level clause is an expression.

When the top-level clause is an expression, an asterisk can be used to reuse it.
Otherwise, an asterisk means the same as `$object`. So, the above declaration
can be rewritten as following:
```o42a
Phrase :=> void (
  Foo :=< `integer
  Bar :=< `string
  <[] | *> Foo = ()
  <'' | *> Bar = ()
)
```


Multiple Instances
------------------

A clause reuse allows to include the same clause content multiple times into the
same phrase. This makes it possible to create multiple clause instances with
different parameters (e.g. argument values). For example, this is a fragment of
`print` object definition:
```o42a
Print :=> void (
  Text :=< `string

  <*Printer> Void (
    <*Content> Print (
      <[] | *> Text = ()
      <'' | *> Text = ()
      <NL | *> Text = "\n"
    )
  )
)
```

So, the following code:
```o42a
Print ["Hello, "] ["World!"] nl
```

creates multiple `print` invocations inside a `printer` expression, because each
time the `printer` clause reused, the `content` invocation context is left. So,
the above phrase can be re-written in canonical form as:
```o42a
Void (
  Print (Text = "Hello, ")
  Print (Text = "World!")
  Print (Text = "\n")
)
```

> Note that a single phrase creates only one top-level object, so this technique
> is only applicable to nested clauses.
