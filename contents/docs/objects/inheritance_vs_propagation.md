---
title: Inheritance vs Propagation
template: doc.jade
order: 9
---

Inheritance vs Propagation
==========================
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

It is important to understand the difference between ancestor
[inheritance](inheritance.html) and sample (either [field](propagation.html),
[explicit object](samples.html) or
[adapter interface](adapters.html#adapters_are_fields)) propagation. While the
ancestor is an __expression__, the sample is always a __static object__.


Ancestor Object Evaluation
--------------------------

An ancestor expression is evaluated once per object, in the scope of the
enclosing object.

When executed in different scopes, an ancestor expression can resolve to
different objects.
```o42a
A := void (
  Foo := void (
    F := 1
  )
  Bar := foo
)

B := a (
  Foo = * (
    G := 2
  )
)
```

An ancestor of `b: bar`, executed in the scope of enclosing object `b` will
result to `b: foo` object, which contains a new field `g`. So an expression
`b: bar: g` is valid and returns `2`.


Static Ancestor
---------------

There is a way to specify an ancestor object statically. This can be done by
prefixing the ancestor reference by _ampersand_ (`&`). For example:
```o42a
Foo := &ancestor (~~ Definition ~~) ~~ Static ancestor.
Foo := &ancestor & sample 1 & sample 2 (~~ Definition ~~) ~~ Static ancestor and samples.
```

As a result of the following declarations
```o42a
A := void (
  Foo := void (
    F := 1
  )
  Bar := &foo ~~ Static declaration.
)

B := a (
  Foo = * (
    G := 2
  )
)
```

the ancestor of a `bar` field becomes static. So, the ancestor of `b: bar` is
`a: foo` (the same as of `a: bar`). Therefore, an expression `b: bar: g` is
invalid. The similar results can be achieved if `foo` would be a sample of
`bar`, not its ancestor.
