---
title: Documentation
template: doc.jade
---

Compound Phrase
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

A phrase may be compound, i.e. it may contain more than one part. To declare the
syntactic rules of compound phrase, a nested clauses can be used.


Nested Clauses
--------------

The clause content may contain a block, either
[imperative](/docs/sentences/imperatives.html) or
[declarative](../sentences/statements.html#declarative_block). They can be
stand-alone, or parts of
[constructor expression](../objects/creation.html#constructor_expression).
Such block may contain a nested clause declarations. These clauses are used when
interpreting subsequent phrase parts. For example, the following code declares
an [argument](clauses.html#argument) can follow the
[single-quoted string](clauses.html#single-quoted_string):
```o42a
Phrase :=> string (
  Foo :=< integer
  <''> (
    <[]> foo = *
  )
)

Phrase 'value' [2] ~~ Argument clause is searched in single-quoted string clause.
~~ Canonical form is:
Phrase (
  = "value"
  Foo = 2
)
```


Implicit Clauses
----------------

Sometimes, it is required to build a complex definition, where some clause
should be placed deeply inside the object within the phrase object's definition.
For that, an implicit clauses can be used.

An implicit clause is a clause, which does not correspond to any phrase part.
But it may contain other clauses, which are not implicit. Thus, when a clause
corresponding to some phrase part is searched, the clause will be searched
inside the implicit clauses also. If found, the implicit clause will be applied
before the found one.

An implicit clause identifier has the following syntax:

> `'*' [<name>]`

where `<name>` is an optional clause name. In contrast to the
[name](clauses.html#name) clause, this name won't be used when searching for the
clause. But it still should be unique. When the `<name>` is omitted, the clause
is called _anonymous_. A clause identifier will be generated automatically.
Multiple anonymous clauses allowed: their identifiers won't conflict with each other.

An example:
```o42a
Println :=> void (
  <*Printer> { ~~ Implicit clause, which constructs an imperative block.
    <*> Print ( ~~ Anonymous implicit clause, which constructs an expression.
      <''> Text = * ~~ Single-quoted string clause.
    )
    Print _nl
  }
)

Println 'Hello' ~~ This is the same as:
Println (
  {~~ This block is constructed implicitly.
    Print (Text = "Hello")
    Print (Text = "\n")
  }
)
```


### Nested Implicit Clauses ###

Implicit clauses inside implicit clauses are also allowed:
```o42a
Println :=> void (
  <*Printer> {            ~~ Implicit clause, which constructs an imperative block.
    <*> Print (           ~~ Anonymous implicit clause, which constructs an expression.
      <*> Text = string ( ~~ Implicit clause, overriding the field `text`.
        <''>              ~~ Single-quoted string clause.
      )
    )
    Print _nl
  }
)

Println 'Hello' ~~ This is the same as:
Println (
  { ~~ This block is constructed implicitly.
    Print (Text = string (= "Hello"))
    Print (Text = "\n")
  }
)
```

### Naming Conflicts ###

Because the clause corresponding to a phrase part is searched in the scope
(either object or enclosing clause) and all of the implicit clauses within this
scope, the clauses declared there should not have the same identifiers:
```o42a
Phrase :=> string (
  <[]>
  <*> (
    <[Enclosed]> = String () ~~ Conflicts with a clause at top level.
  )
)
```
```o42a
Phrase :=> string (
  Foo :=< string
  <*Implicit 1> (
    <[]> Foo = *
  )
  <*Implicit 2> (
    <[Enclosed]> = String () ~~ Conflicts with a clause declared in `implicit 1`.
  )
)
```
