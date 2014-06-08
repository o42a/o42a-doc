---
title: Sentences
template: doc.jade
order: 5
---

Sentences
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

A sentence combines [statements](statements.html) with respect to their logical
meaning. Sentences make it possible to write a complex logic in a simpler
manner, which may be called truly intuitive, because it is close to the natural
text.

Sentences form an object definition within a
[constructor expression](../objects/creation.html#constructor-expression), or
within parentheses in phrase.

The sentence is a sequence of zero or more statements, delimited by
_commas_ (`,`) or _semicolons_ (`;`) and optionally terminated with
_period_ (`.`), _exclamation mark_ (`!`) or _question mark_ (`?`).

The sentence has one of the three possible kinds depending on its termination
mark:

| Termination Mark | Sentence Kind
|------------------|---------------
|  `.`  | [Proposition](proposition.html)
|  `!`  | [Claim](claim.html)
|  `?`  | [Issue](issue.html)


Sentence Termination
--------------------

The termination mark can be omitted for the last sentence of block. It can also
be omitted at the end of a line, unless a statement separator (colon or
semicolon) present after the last statement of the sentence.

If the termination mark is omitted, the sentence is considered a
[proposition](proposition.html).

An [underscore](/docs/syntax/underscore.html) should be used to continue a
statement to the next line.
