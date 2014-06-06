---
title: Inheritance
template: doc.jade
order: 6
---

Inheritance
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

Every object inherits some other object called _ancestor_. This means an
inherited object has the same fields as ancestor, and the same value type,
unless overridden.


Definition Inheritance
----------------------

By default, the inherited object has the same definition as ancestor.

For example:
```o42a
Ancestor := Integer (= 2)
Object := Ancestor
```

In this case `object` has the same definition as `ancestor`, i.e. its value is
`2`.

Note that definition depends on the execution scope. So, when inherited, it may
result to a different value.

Example:
```o42a
Ancestor := Integer (
  Arg 1 := 1
  Arg 2 := 2
  = Arg 1 * arg 2
)

Object := Ancestor (
  Arg 1 = 2
  Arg 2 = 4
)
```

Here `object` has value `8`, despite it has the same definition as `ancestor`,
which value is `2`.


Definition Override
-------------------

The definition can be overridden in inherited object.

For example:
```o42a
Ancestor := Integer (= 2)
Object := Ancestor (= 3)
```

In this case the `object` definition is overridden, and its value is `3`.

The value type of inherited object should remain the same. That is, if ancestor
has an _integer_ value, an inherited object can't be updated to have a _float_
one. The only exception is a _void_: it can be overridden with definition of any
type. Thats how `Integer` object inherits `Void` despite it has a different
value type.


Fields
------

Every field present in ancestor is [propagated](propagation.html) to inherited
object and can be overridden.

Note that despite _private_ fields are propagated to inherited object, they are
not accessible (and thus can not be overridden).

Also, the inherited object may declare new fields.

Example:
```o42a
Ancestor := void (
  Foo := 2
)
Object := ancestor (
  Foo = 3            ~~ Override field "foo" declared in "ancestor".
  Bar := "new field" ~~ Declare new field "bar".
)
```
