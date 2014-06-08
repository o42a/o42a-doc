---
title: File Structure
template: doc.jade
order: 1
---

File Structure
==============
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

By default, the source file declares either module or new public static field
[field](../objects/fields.html), which inherits `void`.

But it is possible to specify any field declaration option, such as visibility,
override field, declare an [adapter](../objects/adapters.html), or provide
[type parameters](../core/type_parameters.html).

All of this can be specified in a file title.


Title
-----

The title is a line consisting of three or more _equals signs_ (**`===`**)
optionally preceded by the field declaration.

A field declaration in the title can declare or override any field or adapter.
The field definition in title can only contain ancestor reference 
and [type arguments](../core/type_parameters.html#type-arguments). It should not
contain any other expressions, because an actual field definition is the rest of
the file.

Here is an example:
```o42a
::Sum :=> integer
=================
~~~
Declares a protected prototype, calculating the sum of two integers.
~~~

Left operand :=< `integer      ~~ It's not necessary to declare simple fields
Right operand :=< `integer     ~~ in separate files, so declare them here.

= Left operand + right operand ~~ Calculate the sum.
```

The module file can also have a title. In this case the field declaration
statement should declare a public pseudo-field with the same name as module
(i.e. the same name as file). This field should not be a prototype or abstract
field and can't be an adapter.


Header
------

The title may refer the objects from another modules. To make it possible, the
source file may contain a header section with a necessary import directives.
These directives work globally for the whole file.

```o42a
Use namespace 'Test' ~~ Import the `test` module name space.

My test := test
===============
~~~
`My test` inherits the `test` object from `test` module.
~~~

~~ `Assert` is also declared in 'test' module and is imported by the header.
Assert [my condition] "My condition failed"
```

The header can only contain directives that don't produce any declarations,
values or executable logic. This could be a `Use namespace` and `Use object`
directives for example.


Type Definition
---------------

The title can not contain an ordinal
[type definition](../core/type_parameters.html#type-definition). Instead, a type
definition can be specified right after the title and separated from the rest
of the object definition with line consisting of three or more hash signs
(**`###`**):

```o42a
Map :=> void
============
~~~
A key/value map interface.
~~~
Key type := void   ~~ Key type parameter.
Value type := void ~~ Value type parameter.
############
Get :=> #value type` link (
  ~~~
  Returns a value by its key.
  ~~~
  Key :=< #key type` link  ~~ A key of the value to find.
)
```
