---
title: Sample Propagation
template: doc.jade
order: 8
---

Sample Propagation
==================
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Apart from [field propagation](propagation.html) it is possible for object to be
propagated from another one, which is called _sample_. Object may have arbitrary
number of samples.


Ascendants Expression
---------------------

To specify the object samples, a special _ascendants_ expression can be used:

> `['&'] <ancestor> [ ( '&' <sample> ) ... ]`

where:

* `<ancestor>` is an object ancestor reference;
* `<sample>` is a sample object reference. 

If ampersand appears before `<ancestor>`, then ancestor is
[static](inheritance_vs_propagation.html#static_ancestor).

Object ancestor should be the same as, or derived from, each of the samples`
ancestors.


This expression can be used in
[constructor expression](creation.html#constructor_expression) like this:
```o42a
Ancestor & sample 1 & sample 2 (
  foo @ancestor = "foo"
  bar @sample 1 = 2
  baz = 3
)
```

or alone:
```o42a
Ancestor & sample 1 & sample 2 ~~ This means the same as the following:
Ancestor & sample 1 & sample 2 ()
```

It can also be used as a phrase prefix.


### Implied Scope Usage ###

An _implied scope reference_ (`*`) can be used instead of explicit ancestor to
indicate that it should be a common ancestor of all samples:
```o42a
Sample 1 := string (= "value")
Sample 2 := void (Foo := 1)
Sample 3 := sample 1 (= "another value")
Sample 4 := sample 2 (foo = 2)

* & sample 2                       ~~ Ancestor is `void`.
* & sample 1 & sample 2            ~~ Ancestor is `string`.
* & sample 1 & sample 2 & sample 3 ~~ Ancestor is `sample 1`.
* & sample 3 & sample 4            ~~ Error, because these samples` ancestors are incompatible.
```


Definitions Precedence
----------------------

Fields and definitions from ancestor and samples are derived by constructed
object. Their precedence is reverse to the order of their specification:
```o42a
Ancestor := string (
  = "value1"
  Foo := 1
)
Sample 1 := ancestor (
  Foo = 2
)
Sample 2 := "value2"

Object := ancestor & sample 1 & sample 2
```

In this case the `object` value is `"value2"`, as it is derived from `sample 2`,
while `object: foo` equals to `2`, as `foo` definition is derived from
`sample 1`.


Naming Conflicts Resolution
---------------------------

The field declared in sample takes precedence over the field declared in
ancestor:
```o42a
Ancestor := void (
  Foo := 1
)
Sample := void (
  Foo := "value"
)
Object := ancestor & sample

Object: foo           ~~ Equals to `value` and is the same as following:
Object: foo @sample
Object: foo @ancestor ~~ Equals to `1`. Ancestor's field access requires qualifier.
```

The field declared in sample takes precedence over the field declared in the
sample specified earlier:
```o42a
Sample 1 := void (
  Foo := 1
)
Sample 2 := void (
  Foo := "value"
)
Object := * & sample 1 & sample 2

Object: foo          ~~ Equals to `value` and is the same as following:
Object: foo @sample2
Object: foo @sample1 ~~ Equals to `1`. First sample's field access requires qualifier.
```
