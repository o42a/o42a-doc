---
title: Object Creation
template: doc.jade
order: 1
---

Object Creation
===============
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

The only way to create a new object is to inherit another one.

The object creation syntax is one of:

* constructor expression,
* phrase, or
* constant.


Constructor Expression
----------------------

This expression allows to derive objects and provide definitions for the result.

The syntax is:
> `<prefix> '(' <definitions> ')'`

where

* `<prefix>` is one of:
    * arbitrary expression, resulting to constructing object's ancestor;
    * [ascendants expression](samples.html#ascendants_expression);
    * [type arguments](../core/type_parameters.html#type_arguments);
* `<definitions>` is a set of [sentences](/docs/sentences/index.html), forming
  constructing object's [definition](definition.html).

Note that `<prefix>` itself can not be a constructor expression or phrase,
unless enclosed into parentheses, because otherwise the whole construct would be
a single phrase.

Some examples:
```o42a
void (     ~~ Inherit the core object `void`.
  Foo := 1 ~~ Declare the new field `foo`.
)
```

```o42a
integer ( ~~ Inherit the core object `integer`.
  = 1     ~~ Define it's value.
)
```

```o42a
foo (           ~~ Inherit some object `foo`.
  = "new value" ~~ Override it's value.
  Bar = 3       ~~ Override the field `bar`. 
)
```


Phrase
------

Any phrase can be reduced to canonical form, which is a constructor expression. So, the following:
```o42a
Use object 'main' from 'console' as 'run'
```

is the same as
```o42a
Use object (         ~~ Inherit object `use object`
  Object = "main"    ~~ Override field `object`.
  Module = "console" ~~ Override field `console`.
  Alias = "run"      ~~ Override field `alias`.
)
```


Constant
--------

A constant expression creates an object inherited from some predefined one,
and defines it's value.

So, the following:
```o42a
123
```

means roughly the same as
```o42a
Integer (= 123)
```

While the string expression
```o42a
"foo"
```

means roughly the same as
```o42a
String (= "foo")
```
