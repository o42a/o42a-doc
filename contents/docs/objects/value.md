---
title: Documentation
template: doc.jade
---

Object Value
============
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Each object has a value of some basic type. This type is defined by inhered
[type representation object](../core/index.html#basic_types).


Value Type
----------

The following scalar types supported in o42a:

| Type      | Description
|-----------|-------------
| `void`    | The very basic type without value. It is assignment-compatible with any other type.
| `integer` | 64-bit integer number.
| `float`   | 64-bit floating-point number.
| `string`  | Unicode string of variable length. Its length in bytes is stored as 32-bit integer internally.

There are also compound and special [types](../core/index.html#basic_types),
like link, array, macro, or directive.


Logical Value
-------------

The value has a logical precondition of it's existence called _logical value_,
which can be either true or false. The value exists only when logical value is
true. Even when the object has a `void` type and its value is meaningless, it
still has a logical value.

The logical value of constant expressions is always true:
```o42a
"value" ~~ Logical value is `true`, value is `value`.
1       ~~ Logical value is `true`, value is `1`.
```

The logical value can be defined explicitly, by defining it's requirement:
```o42a
Positive :=> string (
  Value :=< integer
  value > 0 ~~A requirement for the value following the comma.~~, = "positive".
)

Positive (value = 1)  ~~ Logical value is `true` and the value is `"positive"`.
Positive (value = -1) ~~ Logical value is `false` and the value does not exist.
```

Also, the logical value can be determined implicitly, from it's definition
expression:
```o42a
A := integer (False, = 2) ~~ Logical value is explicitly `false`.
B := 3
C := a + b                ~~ Logical value is `false`, because one of operands
                          ~~ is `false` and thus has no value.
```
