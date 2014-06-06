---
title: Phrase Outcome
template: doc.jade
order: 6
---

Phrase Outcome
==============
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

By default, a phrase expression returns an object this phrase constructs. This
can be changed to return arbitrary field of constructed object or some nested
field. Such field is called _phrase outcome_. Outcome can be used to emulate a
[method][]'s return value.

[method]: http://wikipedia.org/wiki/Method_(computer_programming)

To specify the outcome, put the _equal sign_ (`=`) right after the
[clause identifier](clauses.html) and a field reference after it. This outcome
will be applied when the phrase part corresponding to this clause terminates the
phrase. If outcome omitted in clause declaration, then outcome of enclosing
clause is used.

Example:
```o42a
Diff :=> void (
  Value :=< integer` link
  Subtrahend :=< integer` link
  Result := integer` link = value - subtrahend
  
  <[] | minus...> Value = ()
  <Minus = result...> (   ~~ `Diff: result` will be an outcome.
    <[]> Subtrahend = () ~~ Outcome omitted here.
                          ~~ The outcome of enclosing clause (`Diff: result`) will be used.
  )
)

Diff [4] minus [2]                       ~~ Results to `2`.
Diff (Value = 4. Subtrahend = 2): result ~~ Canonical form of the above.
```
