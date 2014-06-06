---
title: Field Propagation
template: doc.jade
order: 7
---

Field Propagation
=================
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

When derive (either inherit or propagate) the object, every field present in
ascendant gets propagated to the derived object. The field definition remains
the same, unless overridden. The nested fields are also propagated.

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
similarly to the [definition override](inheritance.html#definition_override) of
inherited object. Nested fields can be overridden also.

An example:
```o42a
Ancestor := void (
  Foo := 2
)

Object := ancestor (
  Foo = 3
)
```

In this case the `object: foo` value is `3`.


Implied Scope Usage
-------------------

When overriding a field it is possible to use an _implied scope reference_ (`*`)
to indicate that the field definition didn't change:
```o42a
Ancestor := void (
  Foo := 2
)

Object := ancestor (
  Foo = *
)
```

Implied scope reference can also be used as an ancestor placeholder in
[constructor expression](creation.html#constructor expression):
```o42a
Ancestor := void (
  Foo := void (
    Bar := 2
  )
)

Object := ancestor (
  Foo = * (
    Bar = 4
  )
)
```


Ancestor Upgrade
----------------

When overriding a field, it is possible to upgrade its ancestor.

Propagated field's ancestor should be derived from overridden field's one.

Here is an example:
```o42a
Ancestor := void (
  Foo := void (
    Bar := 2
  )
)

Object := ancestor (
  Foo = string (~~ `object: foo` is `string`, despite it's propagated from `ancestor: foo`, which is `void`.
    Bar = 4
    = "four"
  )
)
```

Note that in the above example the `object: foo` upgraded its type to _string_
from _void_ in addition to ancestor upgrade.
