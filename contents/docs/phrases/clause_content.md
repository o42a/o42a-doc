---
title: Clause Content
template: doc.jade
order: 2
---

Clause Content
==============
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Clause content is a statement. Almost any statement can be clause content, but
there are some limitations though:

* a new field declaration can not be used as clause content;
* an expression should be in canonical form, i.e. arbitrary phrase is not
  supported, only [constructor expression][] allowed.

[constructor expression]: ../objects/creation.html#constructor_expression


Phrase Object
-------------

Each phrase builds an object. This object is called __phrase object__.


### Phrase Object Construction ###

A phrase constructs an object depending on the first phrase part:

* when it is a [declarative block](clauses.html#declarative_block), the phrase
  object is inherited from phrase prefix;
* when it corresponds to a clause, which content is an
  [expression](#expression), the phrase object inherits this expression;
* otherwise, the phrase object is inherited from phrase prefix.

Some examples:
```o42a
Phrase :=> void (
  Foo := 1
  <[]> Foo = *
  <''> String ()
)

Phrase () [2] ~~ Constructs an object inherited from `phrase`.
~~ Canonical form:
Phrase (
  Foo = 2
)

Phrase () 'value' ~~ Constructs an object inherited from `phrase`.
~~ Canonical form:
Phrase (
  String (= "value")
)

Phrase 'value' ~~ Constructs a string, as corresponding clause's content is an expression.
~~ Canonical form:
String (= "value")

Phrase [2] ~~ Constructs an object inherited from `phrase`.
~~ Canonical form:
Phrase (
  Foo = 2
)
```


### Phrase Object Definition ###

A phrase part complements the phrase object's definition by reproducing the
corresponding clause's content in the scope of this definition and placing the
value of this part at the end:

* the [argument](clauses.html#argument),
  [single-quoted string](clauses.html#single-quoted_string),
  [array constructor](clauses.html#array_constructor),
  [initializer](clauses.html#initializer), and
  [interval](clauses.html#interval) bounds place their values as
  [self-assignment](../objects/definition.html#self-assignment) statement;
* the [name](clauses.html#name) phrase part places nothing;
* the [imperative block](clauses.html#imperative_block) places itself unchanged;
* the [declarative block](clauses.html#declarative_block]] places itself
  unchanged.

Examples:
```o42a
Phrase :=> string (
  <[]>
  <''>
  <{}>
)

~~ The following builds the same definitions:
Phrase ["value"]
Phrase 'value'
Phrase (= "value")

~~ The following:
Phrase {= "value"}
~~ Canonical form:
Phrase ({= "value"})
```


Field Overrider
---------------

When the clause content is a field override declaration, the clause content
reproduced as a field override of the constructing object:
```o42a
Phrase :=> void (
  Foo :=< integer
  <[]> Foo = * ~~ The value will be substituted from phrase part.
)

Phrase [42] ~~ The same as:
Phrase (
  Foo = 42
)
```

A special syntax can be used to substitute the value as a field definition. For
that, use an empty parentheses as field definition:
```o42a
Phrase :=> void (
  Value :=< `string      ~~ Link to a `string` object.
  <[]> Value = ()        ~~ Substitution.
)

Str := "Some string"

Phrase [str]             ~~ Link to existing `str` object.
Phrase (Value = str)     ~~ Canonical form of the above.
```


Expression
----------

When the clause content is an arbitrary expression, this expression is
reproduced in the object's definition:
```o42a
Phrase := void (
  <''> String
)

Phrase 'value' ~~ The same as:
Phrase (String (= "value"))
```

Blocks
------

When the clause content is either [imperative](/docs/sentences/imperatives.html)
or [declarative](../sentences/statements.html#declarative_block) block, the
block is reproduced in object's definition:
```o42a
Phrase :=> string (
  <''> (Foo ())
)

Phrase 'value' ~~ The same as:
Phrase (
  (Foo (). = "value")
)
```
```o42a
Phrase :=> string (
  <''> {Print "Hello"}
)

Phrase 'value' ~~ The same as:
Phrase (
  {Print "Hello". = "value"}
)
```

Empty Content
=============

When the clause content is absent, the value is substituted unchanged.

This creates a condition rather than a self-assignment statement when
substituted inside a block:
```o42a
Phrase :=> void (
  On :=< void
  <*> On = * (
    <[]>
    = Void
  )
)

Phrase [false]
~~ Canonical form of the above:
Phrase (
  On = * (
    False  ~~ Substituted value.
    = Void ~~ Value from implicit content.
  )
)
```

The top-level clause with empty content does not construct anything. It just
returns a value:
```o42a
Phrase :=> float (
  <[]>
)

Phrase "Hello" ~~ Returns `"Hello"` unchanged, despite the type of `phrase` object is `float`.
Phrase [42]    ~~ Returns `42`. Has no connection to `phrase` object.
```

Phrase Prefix
-------------

A phrase prefix can be used as a [field definition](#field_overrider) or as an
[expression](#expression). For that a `$Prefix` reference can be used in the
appropriate clause content.
