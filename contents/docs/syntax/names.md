---
title: Names
template: doc.jade
order: 2
---

Names
=====
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Names (field names, for example) are case-insensitive and consist of multiple
words, numbers, or hyphens. A name should start with a word and should finish
with either word or number.

Name parts can be separated by any number of space characters (Unicode Zs, not a
new line characters), but this is not always required and sometimes prohibited
or discouraged (may be so with hyphens).

Space is _not_ a part of the name. Rather it's just a syntactic method of
separating different parts of the name.

Note that [comments](comments.html) and [underscore](underscore.html) are not
allowed within a name.


Word
----

Word is a sequence of any [Unicode][] letters.

These are valid words:
> `Hello`  
> `Привет`

When the name contains two sequential words it is necessary to separate them by
space, like this:
> `Hello World`


Number
------

A number is a sequence of decimal digits (`0...9`).

The name can not start with a number. So, the following is not a valid name:
> `3D`

When the number follows a word, there is no need to place the space between
them. So the following names are the same:
> `name2`  
> `name 2`

The same rule applies to the word following the number. The following names are
the same:
> `render 3d`  
> `render 3 d`  
> `render3 d`  
> `render3d`


Hyphen
------

Names may contain hyphens (`-`). There are multiple hyphen characters in
[Unicode][]. o42a makes no difference between them internally, but applies
different syntactic rules for the sake of grammatical correctness. The following
hyphen symbols recognized:

|        |                     |
|--------|---------------------|
| U+002D | HYPHEN-MINUS        |
| U+2010 | HYPHEN              |
| U+2011 | NON-BREAKING HYPHEN |

The following rules apply to the hyphen usage in names:
* the name should not start with a hyphen,
* the name should not end with a hyphen,
* the hyphen should not follow another hyphen,
* no spaces allowed before HYPHEN-MINUS,
* a space before HYPHEN or NON-BREAKING HYPHEN is discouraged and issues a
  warning,
* a space after NON-BREAKING HYPHEN is discouraged and issues a warning.

To write a _subtraction operator_ or _unary minus_ operator, just place a space
before the HYPHEN MINUS sign.

So, the following are not a valid names:
> `name-`  
> `-name`  
> `plug - in`  
> `built -in`  
> `left--over`

Examples of valid names:
> `plug-in`  
> `to-be-defined`  
> `links-2-3-4`


[Unicode]: http://wikipedia.org/wiki/Unicode
