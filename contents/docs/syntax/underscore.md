---
title: Underscore
template: doc.jade
order: 5
---

Underscore
==========
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

An underscore (**`_`**) can be placed anywhere, where comment can be placed.
Like the comment, it is ignored. It is just a separator, which can be useful in
some situations.


Names Separator
---------------

Underscore can be used to separate subsequent names inside a
[phrase](/docs/phrases/index.html). The following code will place two new line
characters after the `"Hello"` string:
```o42a
Print "Hello" nl _nl
```

The underscore is required here, because without it the two subsequent `nl`
words will be considered a single name, which will raise a compile time error:
```o42a
Print "Hello" nl nl ~~ **Error**: `print` phrase can not recognize a
                    ~~ `nl nl` symbol.
```


Line Continuation
-----------------

An underscore can be used to continue an
[expression](../expressions/index.html) or
[statement](../sentences/statements.html) to the next line.

The line is considered a continuation of preceding one if it starts with an
underscore:
```o42a
A * b +
_c
```

Only spaces can precede the underscore on the same line. No comments allowed.
But comments allowed between the line and its continuation:
```o42a
  A + ~~ comment 1
~~~~~~~~~~~~~~~~~
  Block comment
  between the lines
~~~~~~~~~~~~~~~~~
  _ ~~Inline comment after underscore~~ b
```
