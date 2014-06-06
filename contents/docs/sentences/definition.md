---
title: Understanding The Value Definition
template: doc.jade
order: 5
---

Understanding The Value Definition
==================================
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

An object value definition logic may look complicated. Nevertheless, it is
designed to be easily used despite the complexity of implementation.


Value Definition Algorithm
--------------------------

First, let's examine the value definition algorithm.

As described earlier, the value definition consists of [claims](claim.html) and
[propositions](proposition.html). They evaluated in the following order:

* [derived](claim.html#derivation) claims;
* explicit claims;
* explicit propositions;
* [derived](proposition.html#derivation) propositions.

For each claim or proposition:

* evaluate it:
    * if evaluation failed, assign `false` to the object value and stop;
    * if evaluated to value, assign this value to the object and stop;
* go to the next claim or proposition, if it exists;
* otherwise, assign `false` to the object value and stop.


Reading the Definition
----------------------

But the definition can be understood literally, by reading the source code and
without diving into the above algorithm. __Just keep in mind how to read__.

----

The construct like this:
```
<prerequisite>? <definition>.
```

can be read as: "__If__ `<prerequisite>` __then__ `<definition>`".

----

Constructs with `,`:
```
<statement 1>, <statement 2>
```

can be read as: "`<statement 1>` __and__ (__then__) `<statement 2>`".

----

Constructs with `;`:
```
<statements 1>; <statements 2>
```

can be read as: "`<statements 1>` __or__ (__otherwise__) `<statements 2>`".

----

Statements starting with **`=`**:
```
= <expression>
```

can be read as: "__Return__ `<expression>`."  
or "__Assign__ `<expression>`".

----

Statements with **`:=`** in the middle:
```
<field> := <value>
```

can be read as "`<field>` __is__ `<value>`".

----

Statements with **`=`** in the middle:
```
<field> = <value>
```

can be read as "__Assign__ `<value>` __to__ `<field>`".


----

Other statements can be read literally, having in mind they are conditions:
their values are not important, only success is.
