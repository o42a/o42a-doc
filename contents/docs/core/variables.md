---
title: Variables
template: doc.jade
order: 2
---

Variables
=========
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
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

, by utilizing [type arguments](type_parameters.html#type-arguments):

> ``<interface> '`' 'variable' '[=' <initializer> ']'``

or, when declaring a variable field:

> ``<field> [':'] {'='|'=>'|'=<'|'=<>'} <interface> '`' 'variable' '=' <initializer>``

where:

* `<field>` is a left part of either
  [field](../objects/fields.html#field-declaration) or
  [adapter](../objects/adapters.html#adapter-declaration) declaration;
* `<initializer>` is initial variable value, which will be assigned to
  variable at first access, unless new target [assigned](#variable-assignment)
  first;
* `<interface>` is a variable interface reference, similarly to the
  [link interface](links.html#link-interface).

Variables are used mostly the same way as links.


Assignment
----------

The variable target can be re-assigned with an _assignment_ statement.

There are two kinds of assignment statements supported:

- binding: `<target> '<-' <value>`
- value assignment: `<target> '<<' <value>`

where `<target>` is an assignment target (e.g. variable), and `<value>` is a
value to assign to the `<target>`.

Note that unlike initial variable target, the `<value>` will be resolved and
assigned immediately at assignment statement execution.

There is also a special declare-local-and-assign syntax based on a 
[local scope](../sentences/locals.html#local-scope) declaration syntax:

> `<target> '$' [<local name>] {'<<' | '<-'} <value>`

where `<local name>` is an optional name for declared local. This local is an
assignment target.

As for any local scope declaration, the local name can be omitted.

Note that such syntax allows to use the declared local inside a value
expression. This makes it possible to implement things like increment without
re-evaluating the target variable:
```o42a
Array [n] $<< $ + 1 ~~ Increment Nth element of array.
```


### Binding ###

The binding statement just assigns a new value to the target.

If the binding target is variable, then it stores an object the `<value>` is
evaluated to in the variable and does nothing else.


### Value Assignment ###

The value assignment statement is a combination of actions making it behave more
like a traditional imperative assignments.

The value assignment [eagerly evaluates][eager-ref] the `<value>` and assigns
the result to the target. In fact an expression like
```o42a
target << value
```

is the same as
```o42a
target <- value>>
```

A good example of why this is needed is loops. Lets look at the following loop:
```o42a
``3 $ i {
  I <- i - 1
  I > 0?..
}
```

It does what expected: loops three times and exits. But how this happens? In
fact, the binding operator constructs a new object `i - 1` on each iteration
and stores it in variable `i`. For the first time this will be a `3 - 1`,
for the second time this will be `(3 - 1) - 1`, for the last time this will be
`((3 - 1) - 1) - 1`. See? Each time the value of an object stored in `i`
requested, its value will be fully re-evaluated. What if the loop is much
longer?

The solution is to [eagerly evaluate][eager-ref] the value, making it behave
just like in traditional imperative programming languages. If the eager value
evaluation fails, then the binding won't happen and the assignment target
remain unchanged.

So, if replace the binding (`<-`) in the code above with the value assignment
(`<<`), the loop will work as expected, without additional overhead and without
boilerplate.

[eager-ref]: ../expressions/references.html#eager-reference


### Combined Assignment ###

A combined assignment statement combines an arithmetic operation with value
assignment. The following statements supported:

- `<target> '+<<' <value>` - add and assign;
- `<target> '-<<' <value>` - subtract and assign;
- `<target> '*<<' <value>` - multiply and assign;
- `<target> '/<<' <value>` - divide and assign.

The statement like this: `a +<< b` is the same as `a << a + b`, given the `a` is
evaluated only once. So, a more correct code would be
`a $ tmp (tmp << tmp + b)`. Combined assignments avoid this boilerplate.


Variable Object
---------------

Every variable is an object inherited from the `Variable` prototype and can be
used similarly to the [link one](links.html#link-object).
