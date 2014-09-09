---
title: Adapters
template: doc.jade
order: 5
---

Adapters
========
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Adapter provides another interface to an object, i.e. _adapts_ an object to
another object's type.

There are multiple situations when adapter can be useful. For example, adapter
can be substituted instead of an object containing it, when implicit type
conversion required. One such situation is an _integer_-to-_float_ conversion:
```o42a
Float (= 12) ~~ This conversion occurs implicitly,
             ~~ because integer has an adapter to float.
~~ The same can be written explicitly:
Float (= 12 @@float)
```


Adapter Declaration
-------------------

The adapter declaration syntax is following:

> `'@' <interface> ['@' ['('] <ascendant> [')'] | ':'] '=' ['<'] <definition>`

where:

* `<interface>` is a reference to an object to adapt the enclosing object to;
* `<ascendant>` is a reference to an object's ascendant, the overridden adapter
  is present in;
* `<definition>` is an expression either constructing a new object or referring
  to it's ancestor.

Other tokens interpreted similarly to the
[field declaration](fields.html#field-declaration).

Note that the adapter can not be declared as prototype. So, the `=>` and `=<>`
tokens are prohibited in adapter declarations.

Example:
```o42a
Interface :=> integer
Object := void (
  Value := 12
  @Interface := interface (= Value)
)
```


Short Syntax
------------

There is another form of field declaration and override syntax:

> `'@' <interface> ['@' ['('] <ascendant> [')']] <definition>`

This is a shorter way to write the following:

> `'@' <interface> ['@' ['('] <ascendant> [')']] [':'] '=' * <definition>`

The `<definition>` here consists of zero or more
[phrase parts](../phrases/index.html). 

When short syntax is used, a new adapter is declared, unless `<ascendant>`
specified, or adapter with the given interface already present in ancestor,
in which case the statement overrides an existing adapter.

```o42a
One := void (
  @Integer (= 1) ~~ Declare adapter to `integer`.
)
Two := one (
  @Integer (= 2) ~~ Override adapter to `integer`.  
)
```


Access to The Field of Adapter
------------------------------

There is a special syntax for accessing fields of object's adapter. It is
similar to qualified field access, where adapter interface is used instead of
object's ascendant:

> `<owner> ':' <name> ['@' ['('] <interface> [')'] ]`

where:

* `<owner>` is an arbitrary expression resolving to an object with adapter;
* `<name>` is an adapter's field name;
* `<interface>` is a reference to adapter interface object.

Example:
```o42a
Adapter := void (
  Foo := 1
)
Object := void (
  @Adapter := * (
    Foo = * (= 2)
  )
)

Object: foo @adapter    ~~ Field `foo` of adapter to `adapter` of `object`.
(Object @@adapter): foo ~~ The same as above, but using ugly parentheses.
```

Similarly, a qualified form of [adapter access](#adapter-access) can access an
adapter within adapter.

> Note, that the qualified field access has a precedence over adapter's field
> access. So, when the object both derived from some other object and has an
> adapter to it, the field of the object itself will be accessed instead of the
> field of it's adapter.


Adapter Access
--------------

To access an adapter itself the following syntax can be used:

> `<owner> '@@' ['('] <interface> [')'] ['@' ['('] <ascendant> [')'] ]`

where:

* `<owner>` is an arbitrary expression resolving to object with adapter;
* `<interface>` is a reference to adapter's interface object;
* `<ascendant>` is the owner's ascendant reference the adapter is present in.

Examples:
```o42a
foo @@type
foo @@container: type
foo @@type @foo ascendant
foo @@container: type @foo ascendant
```

An identification conflicts are resolved similarly to the
[fields](fields.html#naming-conflicts-resolution).


Adapters are Fields
-------------------

An adapter is a kind of a field, identified by its interface instead of the
name. Adapters are always _public_.

Also, the adapter is implicitly derived from its interface (adapter is
[propagated](samples.html) from its interface. This interface is used as a very
first sample). So, an _implied reference_ (`*`) can be used in the adapter
definition to either indicate that adapter's definition is the same as the one
of it's interface:
```o42a
Type := 1
@Type := * ~~ `1`
```

or as a placeholder in
[#constructor expression](creation.html#constructor-expression):
```o42a
Type := void (
  Foo := 2
)
@Type := * (
  Foo = * (= 4)
)
```

to indicate that adapter has the same ancestor as its interface.
