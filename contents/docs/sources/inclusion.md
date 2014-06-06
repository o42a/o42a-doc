---
title: File Inclusion
template: doc.jade
order: 3
---

File Inclusion
==============
<!--
Copyright (C) 2010,2011 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Normally, field definitions are included from external files automatically, once
these files reside in the proper locations and follow the
[naming conventions](naming.html).

But it is also possible to explicitly include the field definitions from
external files into the given position of the file. For that an inclusion
statement can be used, having the following syntax:
> `'***' ['*'...] <tag> ['*'...]`

which means three or more asterisks ('**`***`**') followed by a `<tag>`,
optionally followed by an arbitrary number of asterisks.

The `<tag>` is a simple [name](../syntax/names.html), which is used to find the
content to include.

Tag is used to find a sections of source files, containing field definitions to
include at the given position.

Note, that the inclusion statement can only be used inside the top-level
definition of the source file. It can't be placed inside of imperative block or
nested fields defined in the source file.

Also, be aware, that if at least one inclusion statement present inside a source
file, then the normal automatic field definitions inclusion will be disabled and
all the definitions should be included explicitly.


Sections
--------

Source file may contain multiple sections, each starting with a
[title](file.html#title). Each section may be tagged with a simple tag
[name](../syntax/names.html) or compound tag name consisting of simple names
separated by colons ('`:`'). The tag name is placed right after the underline of
the section title and optionally followed by a zero or more '**`=`**' signs.

All sections with the matching tag are searched for in all files in
corresponding source directory by inclusion statement, present in the owner
object's definition. Compound tags are used to include field definitions into
owner object's tagged definition sections.

An example of the file with multiple sections (file `signum/result.o42a`):
```o42a
Result := integer
==== negative ===
= -1

Result := integer
==== positive ===
= 1

Result := integer
======== zero ===
= 0
```

These field definitions can be included in the enclosing object
(file `signum.o42a`):
```o42a
Signum :=> void
=============

Arg :=< integer

Arg > 0? *** positive *** ~~ `Result` is `1`. ~~
Arg < 0? *** negative *** ~~ `Result` is `-1`. ~~
*** zero ***              ~~ `Result` is `0`. ~~
```

The following limitations apply to section tags:

* Two sections of the same file can not have the same tag.
* If the file has more than one section, then all sections should be tagged.
* If the title of the subsequent section is exactly the same as the one of the
  preceding one, the title can be replaced with an empty line followed by underline.


