---
title: Phrase Completeness
template: doc.jade
order: 5
---

Phrase Completeness
===================
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

By default, any part of the phrase is optional. That means, any part can
terminate the phrase. This may be incorrect from the domain-specific point of
view. To prevent such situation, it is possible to require certain parts to
present in phrase. For that, the clause may require _continuation_. So, the
phrase part corresponding to such clause can not be the last one.

To require a continuation, it is sufficient to put an ellipsis (`...`) right
before closing brace (`>`) of clause declaration. An example of sub-string,
taking the length as a second parameter instead of the ending index:
```o42a
Substr :=> string (
  <[] | from | length ...> *Input
                            ~~ Either `from` or `length` required.
  <From...> (               ~~ Argument required after the `from` word.
    <[] | length> *From     ~~ `Length` can be provided after `from`,
                            ~~ but is optional.
  )
  <Length...> (             ~~ Argument required after the `length` word.
    <[]> *Length            ~~ Length has no continuation and can only be the last.
  )

  Input :=< `string
  From := `0
  Length := integer` link = input: length - from

  = Input: substring _from [from] to [from + length]
)

Substr "string" from [2] length [2]   ~~ `"ri"`
Substr "string" from [2]              ~~ `"ring"`
Substr "string" length [3]            ~~ `"str"`
Substr "string"                       ~~ This is an error. Phrase is incomplete.
```


Terminator
----------

Look at the following code:
```o42a
Str :=> string (
  <''> ()
)

Str 'abc' [1]
```

The last expression will fail, because a string clause of object `Str` has no
continuation. So, an expression should be rewritten to work:
```o42a
(Str 'abc') [1] ~~ The second character of string, i.e. `"b"`
```

or, in a shorter form:
```o42a
Str 'abc'\ [1] ~~ The second character of string, i.e. `"b"`
```

But once it is well known that the clause has no continuation, it is logical to
omit the grouping in the above expressions. To make this work the clause should
be declared as _terminator_. The clause becomes a terminator when an exclamation
mark (`!`) precedes the closing bracket. So, the following code is valid:
```o42a
Str :=> string (
  <''!> ()
)

Str 'abc' [1]   ~~ This is valid and is the same as:
(Str 'abc') [1] ~~ Equals to `"b"`.
Str 'abc'\ [1]  ~~ The same as above.
```

The part of the phrase corresponding to terminator clause is always considered
the last one. That is why terminator can not have continuations and can not
reuse other clauses.
