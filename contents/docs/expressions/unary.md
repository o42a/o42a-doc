---
title: Unary Operators
template: doc.jade
order: 2
---

Unary Operators
===============
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

The following prefix unary operators supported:

---------------------

|      |              | Arithmetic operators
|------|--------------|----------------------
| `+`  |              | **Plus**. Returns unchanged value for numeric operand. Can be [overridden][].
| `-`  | `−` (U+2212) | **Minus**. Returns negated value for numeric operand. Can be [overridden][].

---------------------

|      |              | Logical Operators
|------|--------------|----------------------
| `--` | `¬` (U+00AC) | **Logical NOT**. Negates the logical value and discards the value itself. The result has a `void` type.
| `++` |              | **Logical value**. Discards the value and leaves the logical value unchanged. The result has a `void` type.

---------------------

|      | Other operators
|------|-----------------
| `\`  | **[Value of][]**. Extracts the value from any object.
| `#`  | **[Macro expansion][]**.

[overridden]:      ../phrases/operators.html#unary-operators
[Value of]:        #value-of
[Macro expansion]: ../core/macros.html#macro-expansion

---------------------

Only arithmetic operators can be overridden.


### Value Of ###

The _value of_ operator is a convenience expression to extract the value from
any object. The same effect can be achieved by other means, but the resulting
expression will be longer.

The operator can be used in situation like this:
```o42a
C := \(a + b)
```

This declares a field `C`, which value is a sum of `A` and `B`.
Given the `A` and `B` are integers, this can be written other way:
```o42a
C := integer (= a + b)
```

This means exactly the same, but is longer and involves an explicit type
specification, while the shorter form works for any type of value.

Note how the _value of_ operator differs from it's operand. The similar
expression without operator:
```o42a
A := a + b
```

means that `A` is inherited from the sum object, while the original declaration
makes the `A` inherited from `Integer`.

In some situations the _value of_ operator is useless however. The following
statements mean exactly the same, and the _value of_ operator usage is
redundant:
```o42a
= a
= \a
```

Also, it is necessary to be careful with this operator when using it within
links:
```o42a
A := `b
```

The code above declares a link `A`, which target is an existing object `B`.
But if the _value of_ operator used:
```o42a
A := `\b
```

then the link `A` will be linked to a newly constructed object, which value is
the one of object `B`, which is not the same, and actually means:
```o42a
A := `integer (= B)
```


Operators Precedence
--------------------

Unary operators has lower precedence than [reference](references.html)
qualifiers, and higher precedence than [binary operators](binary.html).
