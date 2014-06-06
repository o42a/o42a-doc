---
title: Documentation
template: doc.jade
---

Unary Operators
===============
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
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
| `\\` | **[Keep value][]**. Extracts the value, stores it, and returns on subsequent executions.
| `#`  | **[Macro expansion][]**.

[overridden]:      ../phrases/operators.html#unary_operators
[Value of]:        #valuje_of
[Keep value]:      #keep_value
[Macro expansion]: ../core/macros.html#macro_expansion

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

### Keep Value ###

Object values are stateless by default. This means that the object value is
evaluated each time it is requested, unless the object value is mutable (like
variable or array). But this is not always the desired behavior.

With a _keep value_ operator it is possible to preserve the once evaluated value
and return it on subsequent requests.

Here is a usage example:
```o42a
Left := \\a
Right := \\b
Print [left] ' + ' [right] ' = ' [left + right] nl
```

Note that each of the operands is evaluated only once. In contrast, the
following code:
```o42a
Print [a] ' + ' [b] ' = ' [a + b] nl
```

evaluates each of them twice. This may cause a significant decrease in
performance in case of heavy operand value evaluation. Also, this may lead to
incorrect results in case the operand value evaluation has side effects or may
change on subsequent evaluations (e.g. is random).

The keep value operator constructs a stateful object. This object's value will
be evaluated at most once, and then kept for subsequent requests. The object
statefulness is inherited. So, if any ob the object's ascendants is stateful,
then the object will be stateful too. There is no way to change this.

The keep value operator applies to its operand as following:

- If the operand is a reference, then it constructs a new, stateful object
  inherited from operand.
- If the operand is an expression constructing a new object, then the object
  constructed will be stateful and will be used as a result of keep value
  operator.

> Note that any statements can be executed both in the scope of the declaring
> object and in the scopes of its descendants, and any field used by these
> statements can change its value definition if overridden. Thus, the
> light-weight formula may become a heavy-weight one. So, avoid addressing the
> same field's value more than once. Rather keep its value and use a kept one.


Operators Precedence
--------------------

Unary operators has lower precedence than [reference](references.html)
qualifiers, and higher precedence than [binary operators](binary.html).
