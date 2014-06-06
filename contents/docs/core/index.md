---
title: Core Objects
template: doc.jade
order: 7
---

Core Objects
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

There are several objects available to any program.


Module
------

This is an object representing your program. The file passed as an argument to
the [compiler](/docs/sources/o42ac.html) contains the module definition.
Therefore, the module object contains all other objects and definitions of your
program.

Module object inherits [void](#void) by default. But this can be changed in the
[title](/docs/sources/file.html#title).


Void
----

This is a representation of _void_ type. __Every__ other object inherits `void`.


False
-----

This is an object of type _void_, which [value](/docs/objects/value.html) is
always `false`. Its value is [claimed](/docs/sentences/claim.html) and can not
be overridden by descendants.


Root
----

The _root_ object contains language intrinsics. These are directives, basic
types, and other objects available to any program.

Also, the _root_ is a last resort of the name lookup. This means that if some
name can't be found in the object hierarchy of the program, it will be searched
for in the _root_.

Here are some of the objects nested inside the _root_ as its fields:


### Basic Types ###

Every basic type is represented by a built-in object, accessible as a field of root:

| Field       | Description
|-------------|-------------
| `Float`     | 64-bit floating point number
| `Integer`   | 64-bit integer
| `String`    | Unicode string
| `Link`      | Immutable link to another object
| `Variable`  | A link to another object, which can be modified at run time
| `Array`     | Array, which elements could be modified at run time
| `Row`       | Immutable array
| `Directive` | A prototype of every directive
| `Macro`     | A prototype of every macro


### Directives ###

| Directive       | Meaning
|-----------------|---------
| `Use namespace` | Makes the members of another module or object available in the file this directive appears in.
| `Use object`    | Makes another object or module available in the file this directive appears in, and optionally declares an alias for it. |


Other Modules
-------------

Modules can be reused in your program. `Use namespace` and `Use object`
directives exist for that.

For example, the following code:
```o42a
Use module 'Console'
```

makes all public members of `Console` module available in the current file.

And this code:
```o42a
Use object _ from 'Console' as 'con'
```
creates an alias `con` for module `Console` visible in the current file. You can
access the fields of `Console` by the code like this:
```o42a
Con: main
Con: print
```
