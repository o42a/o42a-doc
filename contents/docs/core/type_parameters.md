---
title: Type Parameters
template: doc.jade
order: 5
---

Type Parameters
===============
<!--
Copyright (C) 2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Any object, including prototypes, can be parameterized with type parameters.
These are expressions resolving to other objects, which can be used just like
[macros](macros.html) inside the object or its fields' definitions.

A type parameter value can be specified (overridden) when inheriting an object,
which has a type parameter.

For example, a [link](links.html) object has a type parameter called `interface`
representing a [link interface](links.html#link_interface). It can be specified
like this:
```o42a
Integer link :=> integer` link
```

Type Definition
---------------

Type parameters can be declared inside a special type definition block of
phrase or object construction expression. The syntax is:

> `<prefix> '#' '(' <type definition> ')' <phrase parts>`

where `<type definition>` consists of a sentences containing type parameters
declarations in the form similar to
[field declarations](../objects/fields.html#field_declaration):

> `<name> [ ['@' ['('] <ascendant> [')'] ] | ':' ] '=' <type>`

where:

* `<name>` is type parameter name;
* `<ascendant>` is a reference to an object's ascendant, the overridden type
   parameter is present in;
* `<type>` is a reference to an object, used as initial value; can be a
  [macro expansion](macros.html#macro_expansion).

Each of such declarations declares a new type parameter or overrides an existing
one, and provides the initial value for it.

**The order of type parameters declaration is significant.**

> See also how the type definition is
> [declared](../sources/file.html#type_definition) in a standalone file.


Type Parameters Usage
---------------------

Each type parameter can be used like any other macro. E.g. it can be expanded.
There are differences though:

* Unlike ordinal fields, the type parameter can be accessed even if it is
  defined inside a prototype.
* The type parameter may refer to other type parameter of the object, or other
  object, but can not refer the object it is defined in, or the fields of this
  object.
* The type parameter can not be overridden outside of the type definition.
* Type parameters can be passed to the newly constructed object with a 
  [type arguments][#type_arguments] expression.
* Type parameters can be specified either as type arguments, or inside a type
  definition, but not both.


### Type Arguments ###

Type arguments is a shorter way to specify the type parameters. The syntax is:

> ``<argument> '`' [ <argument> '`' ... ] <type>``

where:

* `<argument>` is one of:
    * type [reference][], including [macro expansion][]
    * static type reference (` '&' <reference> `),
    * parentheses, containing one or more comma-separated:
        * type [references][reference],
        * static type references,
        * type arguments,
        * [macro expanding expressions][macro expansion],
* `<type>` is one of:
    * [reference][],
    * [ascendants expression](../objects/samples.html#ascendants_expression).

[reference]:       ../expressions/references.html
[macro expansion]: macros.html#macro_expansion


Type arguments are substituted as type parameter values in the order of
parameters declaration within a type definition. If the number of arguments
passed is less than the number of parameters declared, the rest of parameter
values won't change.

Here are some examples:
```o42a
integer` link               ~~ Link to integer.
string` array               ~~ Array of strings.
string` array` link         ~~ Link to array of strings.
(string` array)` link       ~~ The same as above.
(string, integer` row)` map ~~ Map of string keys to integer row values.
```

##

Here is an example illustrating the type parameters usage with map interface:
```o42a
Map :=> void #( 
  ~~~
  A key/value map interface.
  ~~~
  Key type := void   ~~ Key type parameter.
  Value type := void ~~ Value type parameter.
) (
  Get :=> #value type` link (
    ~~~
    Returns a value by its key.
    ~~~
    Key :=< #key type` link  ~~ A key of the value to find.
  )
)

Hash map :=> map (
  ~~~
  Hash map implementation here.
  ~~~
)

Integers by strings := (string, integer)` hash map
~~ A hash map with string keys and integer values.

Integers by strings: get (Key = "one")
```


