---
title: Documentation
template: doc.jade
---

Comments
========
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Comments are used to place a free-form textual remarks anywhere in the code.

o42a has it own, unique syntax for comments. There are two forms of comments
supported:

* inline comment can be placed on any line, and
* block comments, which fully occupy several lines of source code.


### Inline Comments ###

Inline comment starts with two (or more) tildes (**`~~`**). Any text can be
placed after them. Inline comment either ends with two or more tildes (**`~~`**)
or occupies the rest of the line otherwise:
```o42a
~~ This comment occupies the whole line.
Foo := bar ~~ This one occupies the rest of the line.
++ ~~~ Between unary operator an operand ~~~ operand.
Foo ~~~~~ Comment 1 ~~ : ~~ Comment 2 ~~~~~ bar
```


### Block comments ###

In contrast to inline comments, the block comment fully occupies several lines
of source code.

A block comment starts and ends with lines containing three or more tildes
(**`~~~`**). __Nothing except spaces may appear on the same line__:
```o42a
~~~~~~~~
Block
comment.
~~~~~~~~
```

<div class="tip">
Note that the tildes are used as both inline and block comment separators. But
it is unlikely to mistype and start a block comment instead of inline one. The
block comment separator requires at least three tildes, which __should be placed
on a separate line__, while the inline comment requires one less tilde, and is
either placed after the code or contains a text right after separator.
</div>


Comments Placement
------------------

Comments may appear anywhere in the program code, except:

* Inside names. This is wrong:
```o42a
Hello ~~ Phrase instead of the name ~~ World
```
* Inside strings. This is not recognized as a comment:
```o42a
"Hello, ~~ Not a comment ~~ World!"
```
* They can't break numbers. This is wrong:
```o42a
123~~ (Incorrect) phrase instead of a number ~~45
```
* They should not break operators and other monolithic constructs.
  This is wrong:
```o42a
+~~Two arithmetic pluses instead of `is true` operator~~+ plus
Foo :~~ Syntax error ~~= bar
```

Documentation Comments
----------------------

Despite a comment may contain arbitrary text, the preferred text format is
[Markdown](http://daringfireball.net/projects/markdown/syntax/). This can be
used in the future, e.g. by documentation generation tools.

Also, it is preferred to place the block comment describing a
[field](/docs/objects/fields.html) **after the field declaration**, not before
it:
```o42a
Sign :=> integer (
~~~
Returns an arithmetic sign of `argument`.
~~~
  Argument :=< float ~~ Argument to find a sign of.
  
  Argument < 0? = -1
  Argument > 0? = 1
  = 0
)
```

Also, it is good to place a documentation comment right after a source file
[title](/docs/sources/file.html#title):
```o42a
Use namespace 'Console'

Hello World := main
===================
~~~
This is an example "Hello, World!" program.

It prints a string `"Hello, World!"` to standard output.
~~~

Print "Hello, World!" nl
```
