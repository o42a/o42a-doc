---
title: Claim
template: doc.jade
order: 3
---

Claim
=====
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A claim sentence terminates with an _exclamation mark_ (`!`).

A claim is pretty much the same as [proposition](proposition.html). But, in
contrast, the claim can not be overridden.

The following sentence claims an object and all of its descendants have a
constant value:
```o42a
= 2!
```

If the [declarative block](statements.html#declarative_block) appears within a
claim, the sentences within this block are claims also, even if terminated with
_period_ (`.`):

```o42a
(Foo > 0 ~~This is claim, despite termination mark.~~.)!
```

Members can not be declared within a claim.

A claim is evaluated similarly to [proposition](proposition.html#evaluation).
A claim can not appear after the [proposition](proposition.html), so claims are
always evaluated __before__ propositions.


Derivation
----------

The claim can not be overridden. In contrast to
[propositions](proposition.html#derivation), the derived claims are always
evaluated __before__ the claims of the object, and thus - before any
propositions, either explicit or derived.

An example:
```o42a
A := integer (
  = 1!
)
B := a (= 2)  ~~ The value is still `1`.
C := a (= 3!) ~~ The value is still `1`, despite `C` claimed it to be `3`.
```
