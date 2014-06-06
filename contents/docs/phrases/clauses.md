---
title: Clauses
template: doc.jade
order: 1
---

Clauses
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

A clause is a building block of phrase syntax definition. Each part of the
phrase interpreted accordingly to corresponding clause.

Clause declaration syntax is:

> `'<' <id> ['=' <outcome>] {['!'] | ['|' <reused> ['*'] ...] ['...']} '>' [ <content> ]`

where

* `<id>` is a [clause identifier](#clause_identifier);
* `<outcome>` is a [reference](/docs/expressions/references.html) to 
  [phrase outcome](outcome.html);
* `<reused>` is a [reference](/docs/expressions/references.html) to another
  clause declared in the same object, which definition is [reused](reuse.html)
  by this one;
* `<content>` is an optional statement forming a
  [clause content](clause_content.html).


Clause Identifier
-----------------

A clause identifier is used to find a clause corresponding to the phrase part
when interpreting the phrase. So, the chosen identifier is essential to the
phrase correctness.

A clause identifier syntax is similar to corresponding phrase part. It can be a
name, or e.g. square brackets. In addition, any clause may have a name. Clauses
may have the same names as fields: the naming conflict won't happen, because
clauses are defined in separate name space.


Argument
--------

When an argument is present in phrase, the corresponding clause is identified by
square brackets (**`[]`**) identifier.

The clause declaration would look like this:
```o42a
<[]> ~~ Clause content. ~~
```

Also, a name can be specified for the clause (e.g. for clause
[reuse](reuse.html)):
```o42a
<[label]>
```

Here is a usage example:
```o42a
Int :=> integer (
  <[]> (~~ Argument value will be inserted here. ~~)
)

Int [42]   ~~ Substitute an argument value.
Int (= 42) ~~ This is a canonical form of the above expression.
Int _42    ~~ This is also correct.
```


### Multiple Arguments ###

Multiple comma-separated values within a single set of square brackets are
recognized the same way as multiple arguments with a single value each. So, the
following are the same:
```o42a
Phrase [foo, bar, baz]
Phrase [foo] [bar, baz]
Phrase [foo, bar] [baz]
Phrase [foo] [bar] [baz]
```


### String ###

A string in the phrase is interpreted as argument. So, the following are the
same:
```o42a
Phrase ["string"]
Phrase "string"  ~~ Brackets are optional when argument value is a string.
```

> Note that multiple strings are concatenated automatically and recognized as a
> single string. So, the following:
>
>     :::o42a
>     Phrase "abc" "def"
>
> would be the same as one of:
>
>     :::o42a
>     Phrase "abcdef"
>     Phrase ["abc" "def"]
>     Phrase ["abcdef"]
>
> but different from
>
>     :::o42a
>     Phrase ["abc"] ["def"]


Single-Quoted String
--------------------

In contrast to a string, a clause corresponding to the
[single-quoted string](index.html#single-quoted_string) is interpreted
independently and recognized by single quotes (**`''`**) identifier.

So, the clause declaration would look like this:
```o42a
<''> ~~ Clause content. ~~
```

A clause name can also be specified:
```o42a
<'label'> ~~ Clause content. ~~
```

A single-quoted string can be written with optional brackets around it. So, the
following are the same:
```o42a
Phrase 'string'  
Phrase ['string'] ~~ This is NOT an argument. Brackets are just a decoration.
```

> See the tip about [string](#string) concatenation. The same takes place for
> single-quoted strings.


Name
----

When a name is present in the phrase, the corresponding clause is selected by
this name.

Remember to place an underscore between the phrase prefix and the first name
part:
```o42a
Phrase :=< void (
  Foo :=< integer
  <Clause> foo = *
)

Phrase _clause (= 2)

~~ A canonical form of the above phrase:
Phrase (
  Foo = 2
)
```

No need in underscore in the following case:
```o42a
Phrase :=> string (
  Foo :=< integer
  <[]> (
    <Clause> foo = *
  )
)

Phrase "value" clause (= 2)

~~ Canonical form:
Phrase (
  = "value"
  Foo = 2
)
```


Array Constructor
-----------------

When an [array constructor](../core/arrays.html#array_constructor) is present in
the phrase, the corresponding clause is identified by array constructor
(**`[[]]`**) identifier.

The clause declaration would look like this:
```o42a
<[[]]>  ~~ Clause content. ~~
```

Also, a clause name can be specified:
```o42a
<[[label]]>  ~~ Clause content. ~~
```

Here are the usage examples:
```o42a
Row [[1, 2]]
[1, 2]           ~~ The same as above.
Row (= [1, 2])   ~~ Canonical form of the above.

Array [[1, 2]]
Array (= [1, 2]) ~~ Canonical form of the above.
```

> Note that [array constructor](../core/arrays.html#array_constructor)
> expression should be placed inside an extra pair of square brackets. Otherwise
> it will be treated as one or more [arguments](#argument).


Interval
--------

Every kind of intervals is interpreted independently. I.e. an interval like
`[a..b)` requires its own set of clauses to be declared, which won't work for
intervals like `[a..)`, `(a..b)`, or `[a..b]`.


### Fully Bounded Interval ###

A fully bounded interval, i.e. the one with both bounds specified, requires two
clauses to be declared: one for the left bound, and another for the right one.
The second clause should be either [nested](compound.html#nested_clauses), or
should be [reused](reuse.html) by the first one. Identifiers of these clauses
correspond to the clause open/closed kind. An asterisk or clause name should be
placed to corresponding bound. The other bound should be omitted.

Here is an example of a fully-bounded right-open substring clause declaration:
```o42a
<*Substring> Substring (
  <[From...) | to> From = ()
  <[...To)!> To = ()
)
``` 

### Half-Bounded Interval ###

A half-bounded interval requires only one clause declaration. An asterisk or
clause name should be placed to corresponding bound. The other bound should
contain either `-` or `∞` (U+221E) sign. Note that just omitting the open bound
won't work, because such identifiers are reserved for fully-bounded intervals.

Here are examples of half-bounded (leading and trailing) substring clause
declarations:
```o42a
<*Leading substring> Substring (
  <(-...To)!> To = ()
)

<*Trailing substring> Substring (
  <[From...-)!> From = ()
)
```

### Unbounded Interval ###

An unbounded interval does not expect any value. A corresponding clause
identifier may contain `-` or `∞` symbols in place of bounds, or completely omit
the bounds. There is no way to specify a name for such clause.

Here is an example of full substring clause declaration:
```o42a
<(...)!>
```

Note that the clause above just returns the original string object. It is
unlikely that something else would be required, though it is possible.


Initializer
-----------

When an [initializer](index.html#ininitializer) is present in the phrase, the
corresponding clause is identified by initializer (**`[= *]`**) identifier.

The clause declaration would look like this:
```o42a
<[= *]> ~~ Clause content. ~~
```

Also, a name can be specified for the clause (e.g. for clause
[reuse](reuse.html)):
```o42a
<[= label]>
```

Here is a usage example:
```o42a
Int :=> integer (
  <[= *]> (~~ Argument value will be inserted here. ~~)
)

Int [= 42] ~~ Substitute an initial value.
Int (= 42) ~~ This is a canonical form of the above expression.

Int field 1 := int = 42    ~~ A special form useful for field declarations.
Int field 2 := int [= 42]  ~~ The same as above.
Int field 3 := int (= 42)  ~~ Canonical form.
```


Imperative Block
----------------

When an [imperative block](../sentences/imperatives.html) is present in the
phrase, the corresponding clause is identified by curly braces (**`{}`**)
identifier.

So, the clause declaration would look like:
```o42a
<{}> ~~ Clause content. ~~
```

A clause name can also be specified:
```o42a
<{label}> ~~ Clause content. ~~
```


Declarative Block
-----------------

The [declarative block](../sentences/statements.html#declarative_block) can
present anywhere in the phrase. It is always recognized internally and does not
require a clause for it to be declared. The contents of the declarative block
are just appended to the same context as a preceding phrase part.

So, the
[constructor expression](../objects/creation.html#constructor_expression)
is just a form of phrase.
