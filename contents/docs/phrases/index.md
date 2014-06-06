---
title: Phrases
template: doc.jade
order: 6
---

Phrases
=======
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Phrases is a pure syntactic way of building a domain-specific expressions.
Syntactic purity means that phrases does nothing to the language semantics. Any
phrase is just an object construction expression and thus can be written in a
canonical [form](../objects/creation.html#constructor_expression). The only
reason of using phrases is better readability.

The phrase syntax is:

> `<prefix> <part> ...`

where

* `<prefix>` is an arbitrary expression;
* `<part>` is one of:
    * [name](/docs/syntax/names.html);
    * [string](/docs/syntax/strings.html);
    * [single-quoted string](#single-quoted_string);
    * [array constructor](../core/arrays.html#array constructor);
    * phrase argument: `'[' <value> [',' <value>]... ']'`,  
      where `<value>` is an arbitrary [expression](/docs/expressions/index.html),
      [single-quoted string](#single-quoted_string),
      or [array constructor](../core/arrays.html#array constructor);
    * [interval](#interval);
    * [initializer](#initializer);
    * [imperative block](../sentences/imperatives.html);
    * [declarative block](../sentences/statements#declarative_block).

The syntax of concrete phrase is defined by [clauses](clauses.html) declared in
the object the `<prefix>` resolved to.


Single-Quoted String
--------------------

A single-quoted string has the same syntax as
[string](/docs/syntax/strings.html), but is enclosed in a _single quotes_
(''**'**'') instead of a _double quotes_ (**`"`**). It can be either a string
literal or a text block. Multiple single-quoted strings are also
[concatenated](../syntax/strings.html#string_concatenation) automatically.

A single-quoted string may not appear outside the phrase.


Interval
--------

An interval is a special syntactical construct suitable for representing of all
kinds of intervals: opened and closed, bounded and unbounded. The interval
syntax is:

> `{'[' | '('} [<left bound>] '...' [<right bound>] {']' | ')'}`

where:

* square bracket designates a closed bound,
* parenthesis designates an open bound,
* a _horizontal ellipsis_ sign (**`…`**, U+2026) can be used instead of three
  dots,
* `<left bound>` and `<right bound>` are bounds, and can be:
    * an arbitrary bound expression,
    * **`-`**, **`∞`** (U+221E), or nothing to designate the corresponding bound
      is missing.

When left and/or right bound is missing the interval should be left- and/or
right- opened respectively, i.e. a parenthesis should be used at corresponding
side.

Here is some examples:
```o42a
[a...b] ~~ Closed interval
(a...b) ~~ Open interval
[a...b) ~~ Right-open interval
(a...)  ~~ Left bounded open interval
(a...-) ~~ The same as above
(...b]  ~~ Right-bounded interval.
(∞...b] ~~ The same as above.
(...)   ~~ Fully unbounded interval.
(∞...∞) ~~ The same as above.
```

Intervals may not appear outside phrases.

Intervals are used, for example, to extract substrings:
```o42a
"abcde" [1...4) ~~ "bcd"
"abcde" [1...)  ~~ "bcde"
"abcde" (...4]  ~~ "abcd"
"abcde" (...)   ~~ "abcde"
```


Initializer
-----------

An initializer phrase part looks similarly to the phrase argument, i.e. it is
a value specified in square brackets. The difference is a `=` sign prefixing
the value itself:
```o42a
Phrase [= value]
```

Initializers intended to be used to provide the initial values for objects, in
contrast to more general purpose arguments.

An initializer has a special syntax suitable for field initialization:
```o42a
Field := type = value
```
, which is a more convenient form of the following declaration:
```o42a
Field := type [= value]
```
