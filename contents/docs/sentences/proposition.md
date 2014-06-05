---
title: Documentation
template: doc.jade
---

Proposition
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

A proposition is the default sentence kind. It is a regular way of building
object definitions.

The following sentence proposes a value for an object:
```o42a
= 2
```

While the following proposes a logical value:
```o42a
a > 0
```


Evaluation
----------

[Statements](statements.html) within proposition are evaluated in the order.
The sentence evaluation result may be one of the following:

* If the sentence is empty, it is ignored and evaluation continues to the next
  sentence.
* If a [self-assignment](/docs/objects/definition.html#self-assignment)
  statement successfully executed, an object value is assigned and the sentence
  evaluation finishes.
* If statements evaluated to false (i.e. the last
  [alternative](statements.html#alternatives) failed), an object value becomes
  `false` and evaluation finishes.
* Otherwise, (i.e. when some [alternative](statements.html#alternatives) succeed
  and did not contain a
  [self-assignment](/docs/objects/definition.html#self-assignment) statement)
  the evaluation continues to the next sentence.

The following sentence states that `value` should be positive:
```o42a
Value > 0
```

So, an object declaration can look like this:
```o42a
Object := void (
  Value := 1 ~~ This is a proposition of `value`.
  Value > 0  ~~ `Value` should be positive in order the evaluation to continue
             ~~ and result to inherited `void` value.
             ~~ Otherwise, an object value will be false.
)
```


Derivation
----------

Propositions explicitly defined in the object are evaluated before propositions
derived from ascendant object(s). Thus, they can override the object value.
Otherwise, the derived propositions will be used to evaluate one.

Some examples:
```o42a
Ancestor := integer (
  Name := "ancestor" ~~ Declare the `name` field.
  Name: length > 0   ~~ Require non-empty name.
  = 1                ~~ Value is `1` only when the above requirement met.
)
Sample := ancestor (
  Name = "sample"    ~~ Override the `name`.
  ~~ A proposition of `sample` is the same as an `ancestor`'s one.
)
Object := ancestor & sample (
  Name = "object"    ~~ Override the `name`.
  = 2                ~~ Override proposition.
)
Object 2 := ancestor (
  Name = ""          ~~ Override the `name`.
  ~~ The value is false, as a `name` is empty.
)
```
