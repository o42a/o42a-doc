---
title: Field Propagation
template: doc.jade
order: 7
---

Field Propagation
=================
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

When object is inherited, every field present in ancestor, except static ones,
is propagated to the inherited object. The field definition remains the same,
unless overridden. The nested fields are also propagated.

An example:
```o42a
Ancestor := void (
  Foo := void (
    Bar := 2
  )
)

Object := ancestor
``` 

In this case the `object` contains a field `foo`, which in turn contains a field
`bar`, which value is `2`.


Field Override
--------------

Field can be overridden, which means its definition can be updated,
similarly to the [definition override](inheritance.html#definition-override) of
inherited object. Nested fields can be overridden also.

An example:
```o42a
Ancestor := void (
  Foo := 2
)

Object := ancestor (
  Foo = * (= 3)
)
```

In this case the `object: foo` value is `3`.


Implied Scope Usage
-------------------

When overriding a field it is not possible to change the field's ancestor.
Instead, an _implied scope reference_ (`*`) can be used as an ancestor
placeholder in [constructor expression](creation.html#constructor expression): 
```o42a
Ancestor := void (
  Foo := void (
    Bar := 2
  )
)

Object := ancestor (
  Foo = * (
    Bar = * (= 4)
  )
)
```

It is also possible to use an implied scope reference alone to indicate that
the field definition didn't change:
```o42a
Ancestor := void (
  Foo := 2
)

Object := ancestor (
  Foo = *
)
```


Short Syntax
------------

There is another form of field override syntax:
 
> `'*' <name> ['@' ['('] <ascendant> [')']] [<definition>]`

This is a shorter way to write the following:
 
> `<name> ['@' ['('] <ascendant> [')'] ] = * [<definition>]`

The `<definition>` here consists of zero or more
[phrase parts](../phrases/index.html). 

```o42a
A := void (
  Field := integer (
    = 1
  )
)

B := a (
  *Field (= 2)     ~~ Short override syntax.
)

C := a (
  Field := * (= 2) ~~ Full override syntax equal to the short one above.
)
```
