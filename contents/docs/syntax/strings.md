---
title: Documentation
template: doc.jade
---

Strings
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

There are two forms of string literals:

* a string literals with escape sequences support, and
* a text blocks.


String Literals
---------------

A simple string literal starts with a _quotation mark_ (`"`) followed by string
content and ends with a closing _quotation mark_.

A string content may include arbitrary characters excluding _new lines_.

### Escape sequences ###

To place an arbitrary character, including quotation mark, special characters,
and characters from another character set to the string, an escape sequences may
be used. The following escape sequences recognized within a string:

| Escape sequence | Unicode | Name                 | Meaning
|-----------------|---------|----------------------|---------
| `\t`            | U+0009  | CHARACTER TABULATION | Tabulation
| `\n`            | U+000A  | LINE FEED            | New line control character
| `\r`            | U+000D  | CARRIAGE RETURN      | CR control character
| `\"`            | U+0022  | QUOTATION MARK       | `"` (double quote)
| `\'`            | U+0027  | APOSTROPHE           | `'` (single quote)
| `\\`            | U+005C  | REVERSE SOLIDUS      | `\` (backslash) |
| `\hex_code\`    |         |                      | Arbitrary [Unicode][] symbol with code represented in hexadecimal form by `hex_code`


Text Blocks
-----------

A text block fully occupies several lines of source code. It starts an ends with
lines containing three or more quotes (**`"""`**).
__Nothing except spaces may appear at the same line__. 

A text block content may contain new lines and quotation marks and does not
recognize any escape sequences.

A trailing spaces of each line are stripped, but the _new line_ character itself
is not, except for the very last line.

The following are the same:
```o42a
"""
line 1
line 2
"""
```
```o42a
"line 1\nline 2"
```

To place a _new line_ character after the last line an additional empty line is
required. So, something like this:
```o42a
"""
first line
last line

"""
```
will be the same as
```o42a
"first line\nlast line\n"
```


Line Continuation
-----------------

Unlike all other types of expressions, a string is always considered a
continuation of the preceding expression. So the following code snippets are
equivalent:
```o42a
Print "Hello, World!" nl
```
```o42a
Print
"Hello, World!" nl
```
```o42a
Print
_"Hello, World!" nl
```
```o42a
Print
"""""""""""""
Hello, World!
"""""""""""""
_nl
```

String Concatenation
--------------------

When two or more string literals follow each other they are automatically
joined. The following expressions are identical:
```o42a
"Hello, World!"
```
```o42a
"Hello, " "World!"
```
```o42a
"""
Hello,
"""
" World!"
```

[Unicode]: http://wikipedia.org/wiki/Unicode
