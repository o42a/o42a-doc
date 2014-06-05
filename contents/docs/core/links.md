---
title: Documentation
template: doc.jade
---

Links
=====
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A link is an object, which value is reference to another object. An object the
link is linked to is called a _link target_.

The simplest way to create a link is by using a link unary operator:

> `` '`' <target>``

The more advanced syntax utilizes the [type arguments][]:

> ``<interface> '`' 'link' '[=' <target> ']'``

or, when declaring a link field:

> ``<field> [':'] {'='|'=>'|'=<'|'=<>'} <interface> '`' 'link' '=' <target>``

[type arguments]: type_parameters.html#type_arguments

where:

* `<field>` is a left part of either
  [field](/docs/objects/fields.html#field_declaration)
  or [adapter](/docs/objects/adapters.html#adapter_declaration) declaration;
* `<target>` is a [link target](#link_target) expression;
* `<interface>` is a [link interface](#link_interface) reference.


Link Interface
--------------

A link target is not known until the link is evaluated, which might only happen
at run time. So, in general case, the link target is not known to the compiler.
But compiler knows the basic type of the target, i.e. an object, the link target
is derived from. This type is called a _link interface_.

The link interface can be specified explicitly:
```o42a
Foo := integer` link = bar
```

In this case the link target should be compatible with its interface (i.e. the
`bar` should be derived from `integer`).

Also, the link interface can be determined automatically:

* When the link target expression is a reference to an object, the link
  interface is a target object itself:
```o42a
Target := "Target value"
Foo := `target               ~~ Link interface is `target`.
Bar := target` link = target ~~ The same as above.
```
* Otherwise, the link interface is an ancestor of the target expression
  result:
```o42a
Link 1 := `"Target value" ~~ Link interface is `string`.
Link 2 := `foo (          ~~ Link interface is `foo`.
  Bar = 2
)
Link 3 := `foo & bar      ~~ Link interface is `foo`.
```


Link Target
-----------

Because the link target is only known at run time, the following limitations
apply it:

* the link target can not be used as [sample](/docs/objects/samples.html);
* when the link target is used as
  [ancestor](/docs/objects/creation.html#constructor_expression), the
  restrictions applied to the constructed object:
    * the constructed object can not have any
      [samples](/docs/objects/samples.html);
    * the constructed object's [type parameters](type_parameters.html) can not
      be altered;
    * the nested fields` ancestors can not be
      [upgraded](../objects/propagation.html#ancestor_upgrade);
    * all of these restrictions apply to the nested fields.

The link target is evaluated on each access. A
[keep value](../expressions/unary.html#keep_value) operator can be used to
evaluate it once.


Link Propagation
----------------

As any other field, a one link is [propagated](/docs/objects/propagation.html)
to the derived object.

The link's interface and target are expressions, so their evaluation in the
scope of the derived object may result to a another objects. So, in the
following code.
```o42a
A := void (
  Foo := 1
  Bar := `foo
)
B := a (
  Foo = * (
    Baz := "baz"
  )
)
```

the `b: bar` link target and interface are `b: foo`, so the `b: bar: baz`
reference is valid and results to a `"baz"` string.

> A link propagation may lead to a conflict:
>
>     :::o42a
>     A := void (
>       Link := integer` link = 1
>     )
>     B1 := a (
>       Foo := 1
>       Link = `foo
>     )
>     B2 := a (
>       Bar := 2
>       Link = `bar
>     )
>     C := a & b1 & b2 ~~ **Conflict**: `c: link` interface should be derived
>                      ~~ from both `foo` and `bar`, which are not compatible.
> Such conflicts should be resolved manually, by explicit
> [link override](#link_override).


Link Override
-------------

A link override provides another target expression to the link. Another link
interface expression can also be provided (but see the
[link target](#link_target) usage limitations).

A new link target should be compatible with (i.e. derived from) both new and old
link interfaces.

A new link interface should be compatible with an old one, i.e. it should be
derived from it.

```o42a
Target := integer (
  Foo := 1
  = 1
)
A := void (
  Link := `target
)
B := a (
  Link = integer` link = target
  ~~ **Error**: `integer` is not derived from `target`.
)
C := a (
  Foo := target
  Link = target` link = foo
  ~~ Interface remains the same, while the target is changed.
)
D := a (
  Foo := target
  Link = `foo ~~ Both interface and target are changed.
)
```

If the backquote omitted in the link overrider, and a new link interface not
specified explicitly, the link interface remains unchanged:
```o42a
A := void (
  Link := `"target" ~~ Link interface is `string`.
)
Target := string (
  Foo := "foo"
  = "value"
)
B := a (
  Link = target ~~ The link target changed  to `target` object,
                ~~ while the interface remains the same: `string`.
)
```


Link Object
-----------

Every link is an object inherited from the `Link` prototype, and is treated
specially by o42a compiler. It allows the transparent access to the link target
by dereferencing the link when necessary:

* When a link member is referenced, the member is first searched for in the link
  object itself, and if not found, then it is searched for in the link target.
* When converting a link to another type, an attempt to convert the link object
  itself is performed (e.g. by searching for appropriate adapter), and if
  failed - the link target is converted.
* When interpreting the phrase with prefix resolving to a link, the clause
  corresponding to the first phrase part is first searched for in the link
  object itself, and if not found - in the link target.

The link can be created with an object
[constructor expression](/docs/objects/creation.html#constructor_expression).
The link interface can be specified as type argument:
```o42a
Lnk := integer` link (
  ~~~
  Declare the link object.
  Link interface is `integer`.
  ~~~

  = 2 ~~ The plain value `2` is converted to the link automatically.
)

Sum := 40 + lnk ~~ Equals to `42`, as `lnk` is automatically dereferenced
                ~~ to the integer value `2`.
```

The `Link` object declares a phrase syntax for link creation:
```o42a
String` link [= "string"]
String` link (            ~~ Canonical form
  = "string"
)
```


### Link Dereferencing ###

As mentioned above, the link is automatically dereferenced when required. But
this can be done explicitly, with a link dereference expression:

> `<link> '->'`

Usage examples:
```o42a
~~ Array of links
Link array := string` link` array [[
  string` link [= "a"]
  string` link [= "b"]
  string` link [= "c"]
]]
Link array [1]     ~~ Refers the second element.
Link array [1]->   ~~ Refers the second element's link.
Link array [1]->-> ~~ Refers the target string of the second element's link
                   ~~ (`"b"`).
```


Adapter Links
-------------

Any [adapter](/docs/objects/adapters.html) can be declared as link. In contrast
to plain adapter object, the adapter link object does not derive the
adapter's identifier. Instead, it is required that the link interface to be
derived from the adapter's interface. The link target will be used as an adapter
instead of a link object itself.
```o42a
Int :=> void (
  Value :=< `integer
  @String := `value @@string ~~ String representation of `int`.
)

Forty two := string (= Int (Value = 42))  ~~ String representation of `42`.
Forty two := string (
  = Int (Value = 42) @@string             ~~ Same as above.
)
Forty two := string (
  = (Int (Value = 42) @@string)->         ~~ Fully explicit version.
)
```


Links To Other Links
--------------------

Links to other links are supported:
```o42a
Integer link := `1
Link to integer link := `integer link
Link to link to integer link := integer` link` link` link = Link to integer link
```

This is discouraging however. It is highly recommended to avoid the links to
another links. To reduce the discourage of the deep links usage the numerous
limitations applied.

The second-level link is never dereferenced automatically. It should be
dereferenced explicitly. Given the definitions above:
```o42a
Integer (= Link to integer link)   ~~ Error. Can not dereference a deeper link.
Integer (= Link to integer link->) ~~ Results to `1`.
```

The values can not be automatically converted to the deep links. The
one-less-depth link can be converted to a deeper link however.
```o42a
Integer `link` link [= 1]                   ~~ Error.
Integer `link` link [= integer` link [= 1]] ~~ Correct.
```


Custom Assignment
-----------------

New values can be assigned only to [variables](variables.html#assignment).
But the assignment statement can be applied to a link also. Such statements
interpreted as [phrases](/docs/phrases/index.html).

The assignment clause can be declared similarly to the
[binary operators](../phrases/operators.html#binary_operators) override. The
[clause identifier](../phrases/clauses#clause_identifier) should be a
binding statement (`<-`).

With custom assignment clause declared the link becomes a [property][]:
```o42a
Property := integer` link (
  Value := ``0 ~~ The property value is kept here. The initial value is `0`.
  = Value

  Set :=> void (
    ~~~
    Value setter.
    ~~~

    {
      Value = new value
    }
  )

  <*Set> Set (
    ~~~
    Assignment clause.

    It assigns a new value with <set> prototype.
    ~~~

    <New value <- *> New value = *
  )
)

{
  Property->           ~~ Returns `0`.
  Property: value->    ~~ The same as above.
  Property <- 2        ~~ Assigns a new value to `property`.
  Property: value <- 2 ~~ That's what the statement above is actually doing.
}
```

The [value assignment](variables.html#value_assignment) and
[combined assignment](variables.html#combined_assignment) statements can also be
used.

[property]: http://wikipedia.org/wiki/Property_(programming)
