---
title: Locals
template: doc.jade
order: 3
---

Locals
======
<!--
Copyright (C) 2013,2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Locals are named expressions existing during the object value evaluation only.

A local can be declared similarly to a field:

> `'$' <name> {':='|'='} <definition>`

where:

* `<name>` is a local name;
* `<definition>` is an arbitrary expression.

The `:=` and `=` signs can be used interchangeably and mean the same.

Unlike fields, the locals can be declared anywhere in the sentence. Even inside
[interrogative sentences](index.html#interrogative-sentence).

A local declaration is a statement, which may fail. If this happens, the value
evaluation aborts and results to false.

A local declaration is executed once. The local then stores the expression
evaluation result. This result can be used multiple times without expression
re-evaluation.


Accessing Locals
----------------

A local can be accessed by name, just like any field. However, the local may
have the same name as some field. To avoid confusion a local scope reference
(**`$`**) can be used to require a local access explicitly:
```o42a
$Local = 1
= $Local + local ~~ Both operands access the same local.
                 ~~ But the left one does it explicitly.
```

Because locals exist only during the object value evaluation, they can not be
accessed by object fields.

Also, a local can be accessed only after its declaration. The following rules
apply to the locals visibility:

* A local is not visible outside the block it is declared in:
```o42a
($Local = 1)
= $Local + 1 ~~ Error. The local is not visible outside the block.
```
* A local declared as a [requirement](statements.html#requirements) is
  visible by dependent statements:
```o42a
$Local = 1, = $local + 1
```
* A local declared inside an [alternative][] is not visible outside this
  alternative, unless this alternative is the only one of the sentence:
```o42a
$Local = 1;
$Local + 1 ~~ Error. The local is not visible in another alternative.
```
* A local declared in a non-interrogative sentence with only one
 [alternative][] is visible in subsequent sentences:
```o42a
$Local = 1, $local > 0.
= $Local - 1 ~~ Correct.
```
* A local declared in an [interrogative](index.html#interrogative-sentence)
  sentence with only one [alternative][] is visible in the next
  non-interrogative sentence, but not in the one next to it:
```o42a
$Local = 1, $local > 0? = $Local - 1 ~~ Correct.
= $Local                              ~~ Error.
```

Note that in contrast to enclosing object's fields, the objects created during
the value evaluation has full access to locals:
```o42a
$Left = 1
$Right = 2
= Integers: add (
  ~~ The same as `$Left + $right`.
  Left operand = $left
  Right operand = $right
)
```

[alternative]: statements.html#alternatives

Local Scope
-----------

There is an alternative syntax for local declaration, which declares a local
along with its visibility scope. It is called _local scope_:

> `<definition> '$' [<name>] ':' <content>`

where:

* `<definition>` is an arbitrary expression, [link](../core/links.html), or
  [variable](../core/variables.html) declaration;
* `<name>` is a local name;
* `<content>` is a local scope content, which can use the declared local.

Unlike the traditional, field-like local declaration, the local declared this
way is only visible inside its scope. I.e. only the local scope content can use
the local.

The local scope content is a statement, and can be one of:

* [declarative block](statements.html#declarative-block),
* [imperative block](imperatives.html),
* [named block](imperatives.html#named-blocks),
* [assignment](../core/variables.html#assignment),
* [expression](../expressions/index.html), or
* another local scope declaration.

Here is an example:
```o42a
1 $ local: $local > 0
```

The colon can be omitted when the local scope content is unnamed block.

The local scope content can be placed on a new line after the colon.

Note that not any statement allowed as a local scope content. Such statements
can be enclosed into a block though:
```o42a
1 $ left:
2 $ right (
  = $Left + $right ~~ Return is not a valid scope content,
                   ~~ but it can be used inside parentheses.
)
```

When the local scope content is unnamed imperative block, then this block's name
becomes the same as the local's name. Here is an example of a local scope loop:
```o42a
``3 $ i { ~~ `I` is a variable loop counter,
          ~~ and a block name.
  Print [i] '/3' nl
  I > 1? I -<< 1... i ~~ Decrease and repeat `i` while it is more than one. 
}
```

### Anonymous Local ###

The name can be omitted from local scope declaration. In this case the local is
called _anonymous_ and can be accessed using a special syntax: `$` or `$$`. The
loop above can be shortened:
```o42a
``3 $ { ~~ Anonymous loop counter,
  Print [$] '/3' nl
  $ > 1? $ -<< 1... ~~ Decrease and repeat `$` while it is more than one. 
}
```

`$` and `$$` mean the same when used alone. But when used in a member reference
they are treated differently:

* `$foo` accesses a local with name `foo`, while
* `$$foo` accesses a field `foo` of anonymous local.

```o42a
"abc" $:           ~~ Declare anonymous string.
$$length $ length: ~~ Declare `length` equal to string length.
print "`Length` local: " [$length] " == string length " [$$length] nl
```
