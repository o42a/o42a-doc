---
title: Variables
template: doc.jade
order: 2
---

Variables
=========
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A variable is a link, which target can be re-assigned at run time.

The variable can be constructed with a variable unary operator:
> ``` '``' <initializer>```

, by utilizing [type arguments](type_parameters.html#type_arguments):

> ``<interface> '`' 'variable' '[=' <initializer> ']'``

or, when declaring a variable field:

> ``<field> [':'] {'='|'=>'|'=<'|'=<>'} <interface> '`' 'variable' '=' <initializer>``

where:

* `<field>` is a left part of either
  [field](/docs/objects/fields.html#field_declaration) or
  [adapter](/docs/objects/adapters.html#adapter_declaration) declaration;
* `<initializer>` is initial variable value, which will be assigned to
  variable at first access, unless new target [assigned](#variable_assignment)
  first;
* `<interface>` is a variable interface reference, similarly to the
  [link interface](links.html#link_interface).

Variables are used mostly the same way as links.


Assignment
----------

The variable target can be re-assigned inside
an [imperative block](../sentences/imperatives.html) with assignment statement.

There are two kinds of assignment statements supported:

- binding: `<target> '<-' <value>`
- value assignment: `<target> '=' <value>`

where `<target>` is an assignment target (e.g. variable), and `<value>` is a
value to assign to the `<target>`.

Note that unlike initial variable target, the `<value>` will be resolved and
assigned immediately at assignment statement execution.

> Also note that the value assignment statement syntax is similar to the field
> override one. That's because the field override is impossible inside
> imperative blocks.

The assignments are also possible inside a declarative code. But the value
assignment requires a special syntax, as otherwise it conflicts with a field
override syntax.

The assignment syntax acceptable for both imperative and declarative code is
based on a [local scope](../sentences/locals.html#local_scope) declaration
syntax:

> `<target> '$' [<local name>] {'=' | '<-'} <value>`

where `<local name>` is an optional name for declared local, which value is an
assignment target.

As for any local scope declaration, the local name can be omitted.

Note that such syntax allows to use the declared local inside a value
expression. This makes it possible to implement things like increment without
re-evaluating the target variable:
```o42a
Array [n] $= $ + 1 ~~ Increment the Nth element of array.
```


### Binding ###

The binding statement just assigns a new value to the target.

In the binding target is variable, then it stores an object the value is
evaluated to, in the variable and does nothing else.


### Value Assignment ###

The value assignment statement is a combination of actions making it behave more
like a traditional imperative assignments.

The value assignment does the following:

- Makes the value stateful (exactly like a [keep value][] operator).
- Evaluates its value.
- Assigns the value to the target just like binding.

A good example of why this is needed is loops. Lets look at the following loop:
```o42a
``3 $ i {
  I <- i - 1
  I > 0?...
}
```
It does what expected: loops three times and exits. But how this happens? In
fact the binding operator each time constructs a new object `i - 1` and stores
it in variable `i`. For the first time this will be a `3 - 1`, for the second
time this will be `(3 - 1) - 1`, for the last time this will be
`((3 - 1) - 1) - 1`. See? Each time the value of object stored in `i` requested,
its value will be re-evaluated. What if the loop is much longer?

The solution is to [keep its value][keep value]. Then the value will be
evaluated at most once. But the value will be evaluated only when requested.
The value assignment evaluates it explicitly, making it behave just like in
traditional imperative programming languages. If the explicit value evaluation
fails, then the binding won't happen and the assignment target remain unchanged.

So, if replace the binding (`<-`) in the code above with the value assignment
(`=`), the loop will work as expected, without additional overhead and without
boilerplate.

[keep value]: ../expressions/unary.html#keep_value


### Combined Assignment ###

A combined assignment statement combines an arithmetic operation with value
assignment. The following statements supported:

- `<target> '+=' <value>` - add and assign;
- `<target> '-=' <value>` - subtract and assign;
- `<target> '*=' <value>` - multiply and assign;
- `<target> '/=' <value>` - divide and assign.

The statement like this: `a += b` is the same as `a = a + b`, given the `a` is
evaluated only once. So, the more correct code would be
`a $ tmp (tmp = tmp + b)`. Combined assignments avoid this boilerplate.


Variable Object
---------------

Every variable is an object inherited from the `Variable` prototype and can be
used similarly to the [link one](links.html#link_object).
