---
title: Sentences
template: doc.jade
order: 5
---

Sentences
=========
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A sentence combines [statements](statements.html) with respect to their logical
meaning. Sentences make it possible to write complex logic in a simpler
manner, which may be called truly intuitive, because it is close to the natural
text.

Sentences form an object definition within a
[constructor expression](../objects/creation.html#constructor-expression), or
within blocks of the phrase.

The sentence is a sequence of zero or more statements delimited by
_commas_ (`,`) or _semicolons_ (`;`) and optionally terminated with
_period_ (`.`), _question mark_ (`?`), _exclamation mark_ (`!`),
or their combinations (`?..` or `!..`).

The declarative code may only contain [declarative](#declarative-sentence)
sentences terminating with _periods_ (`.`),
and [interrogative](#interrogative-sentence) sentences terminating with
_question marks_ (`?`).

The [imperative](imperatives.html) code may contain any kinds of sentences.


Sentence Termination
--------------------

The termination mark can be omitted for the last sentence of the block.
It can also be omitted at the end of the line.

If the termination mark is omitted, and no separator (colon or semicolon)
present after the last statement, the sentence is automatically terminated
with period (`.`).

An [underscore](../syntax/underscore.html) should be used to continue a
statement to the next line.


Declarative Sentence
--------------------

A declarative sentence is the default sentence kind. It is a regular way of
building object definitions.

The following sentence defines a value for an object:
```o42a
= 2
```

While the following defines only a logical value:
```o42a
a > 0
```

### Evaluation

[Statements](statements.html) within declarative sentence are evaluated in their
order. The sentence evaluation result may be one of the following:

* If the sentence is empty, it is ignored and evaluation continues to the next
  sentence.
* If a [return][] or [yield][] statement successfully executed, a value is
  returned and the sentence evaluation finishes.
* If statements evaluated to false (i.e. the last [alternative][] failed),
  a `false` value is returned and evaluation finishes.
* Otherwise, (i.e. when some [alternative][] succeed and did not contain a
  [return][] or [yield][] statement) the evaluation continues to the next
  sentence.

The following sentence states that the `value` should be positive:
```o42a
Value > 0
```

So, an object declaration can look like this:
```o42a
Object := void (
  Value := 1 ~~ This is a definition of `value`.
  Value > 0  ~~ `Value` should be positive in order the evaluation to continue
             ~~ and result to inherited `void` value.
             ~~ Otherwise, an object value will be false.
)
```


Interrogative Sentence
----------------------

An interrogative sentence is terminated with a _question mark_ (`?`).

The sentence following an interrogative one will be evaluated only when
interrogative sentence succeed. Otherwise, the sentence following the next
non-interrogative sentence will be evaluated.

Some examples:
```o42a
Arg > 0? = 1  ~~ If `arg` is positive, return `1`.
Arg < 0? = -1 ~~ Otherwise, if `arg` is negative, return `-1`.
= 0           ~~ Otherwise, return `0`.
```

An interrogative sentence may follow another interrogative sentence.
In this case statements of theses sentences are combined with logical AND.
So, the following definitions are equal:
```o42a
Age >= 10? Age <= 19? = "teen" 
Age >= 10, age <= 10? = "teen"
```

An interrogative sentence alone (e.g. as a last sentence of declarative block)
is treated as preceding an empty sentence.

An interrogative sentence may not contain any member declarations,
[return][] or [yield][] statements, or [imperative blocks](imperatives.html).

[return]: ../objects/definition.html#return
[yield]: ../objects/definition.html#yield
[alternative]: statements.html#alternatives
