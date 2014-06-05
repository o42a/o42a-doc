---
title: Documentation
template: doc.jade
---

Issue
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

An issue is a sentence terminated with a _question mark_ (`?`).

The sentence following an issue will be evaluated only when the issue succeed.
Otherwise, the sentence following the next [proposition](proposition.html)
or [claim](claim.html) will be evaluated.

Some examples:
```o42a
Arg > 0? = 1  ~~ If `arg` is positive, propose `1`.
Arg < 0? = -1 ~~ Otherwise, if `arg` is negative, propose `-1`.
= 0           ~~ Otherwise, propose `0`.
```

An issue may follow another issue. In this case statements of theses issues are
combined with a logical AND. So, the following definitions are equal:
```o42a
Age >= 10? Age <= 19? = "teen" 
Age >= 10, age <= 10? = "teen"
```

An issues sentence alone (e.g. as a last sentence of declarative block) is
treated as an issue preceding an empty sentence.

An issue may not contain any member declarations,
[self-assignment](/docs/objects/definition.html#self-assignment) statements,
or [imperative blocks](imperatives.html).
