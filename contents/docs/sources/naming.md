---
title: Documentation
template: doc.jade
---

Naming Conventions
==================
<!--
Copyright (C) 2010-2012 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

o42a source file names are case insensitive.

The files with the names starting from dot ('**`.`**') or underscore ('**`_`**')
are ignored by compiler.

> `_hidden1.o42a`  
> `.hidden2.o42a`


The file name may contain arbitrary text after the double underscore
('**`__`**'). This part is considered a comment and is meaningless to compiler:

> `hello_world__rev2.0.o42a`


The meaningful part of the name, depending on the file contents, should be:

| Contents                | Name format
|-------------------------|-------------
| Module                  | `<module name>`
| New field declaration   | `<field name>`
| Field override          | `<field name> ['**@**' <ascendant>]`
| New adapter declaration | `'@' <interface>`
| Adapter override        | `'@' <interface> ['@' <ascendant>]`

The `<module name>` and `<field name>` are case insensitive
[names](../syntax/names.html), encoded with the following rules:

* words can be separated either by spaces or underscores;
* name should not contain both spaces and underscores;
* there shouldn't be two subsequent word separators;
* if the word separator can be omitted (e.g. between word and number, word and
  hyphen, number and hyphen), it should be omitted.

The `<interface>` and `<ascendant>` are references, literally present in the
field declarations inside the file and encoded by replacing colons ('**`:`**')
with dots ('**`.`**').

Some examples of valid names:
> `New field.o42a`  
> `Overridden field__base object is optional here.o42a`  
> `overridden_field@module.container.base_object__compound ascendant.o42a`  
>  
> `@adapter.o42a`  
> `@Another Adapter.o42a`  
> `@container_object.adapter__compound adapter.o42a`  
> `@Overridden Adapter@base_object__different names encoded differently.o42a`
