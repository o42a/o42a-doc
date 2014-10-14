---
title: References
template: doc.jade
order: 1
---

References
==========
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A reference is a syntactic construct which addresses something.

The reference may address:

* some [scope](#scope-reference),
* a [member by name](#member-by-name),
* a [parent member](#parent-member) by name,
* a [member](#member-reference) of another object,
* a [link target](../core/links.html#link-dereferencing), or
* an [macro field expansion](../core/macros.html#macro-field-expansion).


Scope Reference
---------------

The following objects can be addressed by scope references:

---------------------

| Reference Target             | Syntax | Description
|------------------------------|--------|-------------
| [Module][]                   | `/`    | Addresses the current module, i.e. the topmost object, defined in the file passed to compiler as argument.
| [Root][]                     | `//`   | Addresses the root object, containing predefined o42a objects, including [void][] and [false][].
| Self                         | `:`    | Refers to the object this reference appears in.
| Parent member                | `::`   | Refers to the closest enclosing member.
| Implied object               | `*`    | Indicates that the referenced object can be determined automatically. Depends on the context it appears in. For example, can be used in [field override][] or in [ascendants expression][].
| [Macro expansion][]          | `#`    | Expands the addressed macro.
| [Standard macro expansion][] | `##`   | Addresses a macro from standard `Macros` module and causes it's expansion.
| [Local][]                    | `$`    | Local reference.
| [Anonymous local][]          | `$$`   | Anonymous local reference.

[Module]:                   ../core/index.html#module
[Root]:                     ../core/index.html#root
[void]:                     ../core/index.html#void
[false]:                    ../core/index.html#false
[field override]:           ../objects/propagation.html#implied-scope-usage
[ascendants expression]:    ../objects/samples.html#implied-scope-usage
[Macro expansion]:          ../core/macros.html#macro-expansion
[Standard macro expansion]: ../core/macros.html#standard-macro-expansion
[Local]:                    ../sentences/locals.html#accessing-locals
[Anonymous local]:          ../sentences/locals.html#anonymous-local

---------------------

Example:
```o42a
Foo := //~~Root~~ void ~~This can be written without `//` prefix.~~ (
  Value :=< //~~Root~~ integer ~~This can be written without `//` prefix~~
  :: ~~Parent field, i.e. `foo`~~
  Arg := / ~~Refers the module object~~ foo ~~Refers module field `foo`~~
  Double value := foo: value + :~~Parent object, i.e. `foo`~~ arg: value
)
```

> Notice the difference between the self (`:`) and parent member (`::`)
> references. They mean the same in the following piece of code:
> ```o42a
> Foo := void (
>   :  ~~ Refers the enclosing object `foo`.
>   :: ~~ Also refers the enclosing object `foo`.
> )
> ```
>
> But have different meanings here:
> ```o42a
> Foo := void (
>   Bar (
>     :  ~~ Refers the enclosing object inherited from `bar`.
>     :: ~~ Refers the enclosing object `foo`.
>   )
> )
> ```


Member by Name
--------------

The name can be written standalone or with an ascendant qualifier:

> `<name> [ '@' ['('] <ascendant> [')'] ]`

where `<ascendant>` is a reference to the object, the named field belongs to.

If an `<ascendant>` not specified, the member is searched by name. Otherwise,
the member is searched by name / ascendant pair with the following algorithm:

* if container object derived from ascendant, the field present in this
  ascendant is searched in the given object;
* otherwise, if container object has an adapter to the given ascendant, the
  field is searched in this adapter.

The member search sequence:

* search in enclosing object;
* if not found, then check whether enclosing object has a given name;
* if not found, then search in enclosing object of enclosed object in the same
  source file;
* ... and so on, until the topmost object of the source file reached;
* if not found, then search among objects imported by `Use object`
  [directive](/docs/core/index.html#directives);
* if not found, then search among members of namespace objects imported by
  `Use namespace` [directive](/docs/core/index.html#directives);
* if not found, then search in enclosing object (possibly in another source
  file, which includes this one); note, that imported symbols not consulted
  any more;
* ... and so on, until the module file reached;
* if not found in module, then check whether the module has a given name;
* if not found and `<name>` is '`void`', return [void][];
* if not found and `<name>` is '`false`', return [false][];
* if not found, then search in [root][].

Some examples:
```o42a
Integer :=> //integer  ~~ New field with the same name.
Value := integer (= 2) ~~ Refers to the new `integer`,
                       ~~ not to the `integer` field of the root.
```

```o42a
Use object 'foo' from 'module'
Bar := foo             ~~ Refers the imported object `foo`.
```

Parent Member
-------------

The syntax is:

> `<name> '::'`

where `<name>` is an enclosing member's name.

This reference will search for a member with the given name only among members,
the reference appears inside of. First, the parent (enclosing) member checked,
then - the parent of the parent and so on, until the module object reached.

The usage example:
```o42a
Foo := string (
  = "value"
  Foo := 2      ~~ Field with the same name as parent one.
  Bar := foo    ~~ Equals to `2`, because refers the `foo: foo`.
  Baz :=> foo:: ~~ Equals to `"value"`, because refers the parent `foo`.
)
```

Member Reference
----------------

An object member (field, adapter or clause) can be referred to by
[field access](../objects/fields.html#field-access),
[adapter access](../objects/adapters.html#adapter-access),
or [access to field of adapter](../objects/adapters.html#access-to-the-field-of-adapter)
references.

Note that when accessing the named member of an object addressed by the scope
or parent member references, the colon sign (`:`) is omitted. So these are
correct expressions:
```o42a
//integer
/foo
:foo
::foo
foo:: bar
$local
$$field of anonymous local
```

Eager Reference
---------------

The syntax is:

> `<expression> '>>'`

Normally, an object value is (re-)evaluated on each request. This not always a
required behaviour, as the results of evaluations may differ, or could be very
excessive in terms of performance and resources usage.

Also, an object value is evaluated when requested. I.e. it won't be evaluated
immediately when object (e.g. field or local) constructed.

To evaluate the object value immediately and to preserve it for later use, an
eager reference could be used. Eager reference evaluates the value of
`<expression>`, constructs a new object inherited from `<expression>` and
returns it. The value of the resulting object is constant, and equal to
previously evaluated value of `<expression>`. Such object is called
_eager object_.

**It is not possible to inherit eager objects or override eager fields.**


Other
-----

These references are also supported, but discussed later:

| Syntax                      | Description                  |
|-----------------------------|------------------------------|
| `<expression> '->'`         | [Link dereference][]         |
| `<expression> '#' <field>`  | [Macro field expansion][]    |
| `<expression> '##' <field>` | [Standard macro expansion][] |

[Link dereference]: ../core/links.html#link-dereference
[Macro field expansion]: ../core/macros.html#macro-field-expansion
[Standard macro expansion]: ../core/macros.html#standard-macro-expansion

