---
title: Fields
template: doc.jade
order: 4
---

Fields
======
<!--
Copyright (C) 2010-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A field is a nested object, which can be accessed by identifier. An object can
have an arbitrary number of fields.

Identifiers of fields declared within the same object should be unique, but
object __may__ declare a new field with the same identifier as a field of
ascendant. In the latter case, two __different__ fields with the same identifier
will co-exist in the object. See the
[naming conflicts resolution](#naming-conflicts-resolution) section below.


Field Declaration
-----------------

Field declaration syntax is:

> `[<visibility>] <name> ['@' ['('] <ascendant> [')'] | ':'] ['=' | '=>' | '=<' | '=<>'] <definition>`

where:

* `<visibility>` is one of:
    * '**`:`**' - to declare _private_ field;
    * '**`::`**' - to declare _protected_ field;
    * otherwise:
        * the field is _public_, if it is a new field declaration;
        * the field has the same visibility as overridden field, if it is a field
          override;
* `<name>` is arbitrary field name;
* `<ascendant>` is a reference to object's ascendant, the overridden field is
  present in;
* `<definition>` is an expression either constructing a new object or referring
  to its ancestor.

The _colon_ (**`:`**) presence before the _equals sign_ (**`=`**) indicates the
field declaration, while its absence means the field [override][]. In the latter
case it is expected that the field with the same identifier is present in
object's ascendant. Because object may have multiple ascendants, it is possible
to explicitly specify an `<ascendant>` the overridden field is originated from.

There is also a [short form][] of field override syntax.

[override]: propagation.html#field-override
[short form]: propagation.html#short-syntax

The sign following the _equals sign_ indicates the following:

| Sign  | Meaning
|-------|---------
| `=`   | Ordinary field declaration.
| `=>`  | Prototype declaration. Prototype is an incompletely defined object, which doesn't have an instance. The contents of prototype are not accessible from outside the prototype itself, but prototype can be derived.
| `=<`  | Input (abstract) field declaration. This is only allowed within prototype declaration. When creating an object derived from enclosing prototype, it is required to provide definition for such field, unless the derived object is a prototype or abstract field too.
| `=<>` | Abstract prototype declaration. This is only allowed within another prototype declaration. When creating an object derived from enclosing prototype, it is required to provide definition for such field, unless the derived object is a prototype or abstract field too.

Example:
```o42a
Binary operation :=> float ( ~~ Public prototype.
  ::Operand 1 :=< float ~~ Protected input field.
  ::Operand 2 :=< float ~~ Protected input field. 
)
Addition :=> binary operation ( ~~ Public prototype.
  = operand 1 + operand 2
)
:Sum := addition ( ~~ Ordinary private object.
  *Operand 1 (= 11) ~~ Override `operand 1`.
  *Operand 2 (= 31) ~~ Override `operand 2`.
)
```

Field Visibility
----------------

As mentioned above, there are three kinds of visibility:

* _public_ - field is visible from everywhere;
* _protected_ - field is visible from the same file, from nested objects and
  definitions, and from derived objects;
* _private_ - field is only visible from the same file or from nested objects
  and definitions.

A field can not change its visibility when overridden.

Private fields can not be overridden, even if they are visible to the derived
object.


Field Access
------------

The field of an object can be accessed by its name with the following syntax:

> `<owner> ':' <name> ['@' ['('] <ascendant> [')'] ]`

where:

* `<owner>` is an arbitrary [expression](/docs/expressions/index.html)
  resolving to an object containing the field;
* `<name>` is a field name;
* `<ascendant>` is the owner's ascendant
  [reference](/docs/expressions/references.html), the field is present in.

Examples:
```o42a
foo: field
foo: field @foo ascendant
```

### Naming Conflicts Resolution ###

An object derived from another object can declare a new field with the same
identifier (name or adapter interface) as  the one of ascendant's field. In this
case an unqualified field access means access to the explicitly declared field.
To access the field derived from ascendant an explicit qualification required.

Example:
```o42a
A := void (
  Foo := 1 ~~ Declare the field `foo`.
)
B := a ( ~~ Inherit `a`.
  Foo := "foo" ~~ Declare a new field with the same name `foo`.
)

B: foo    ~~ Access the field `foo` declared in `b`.
B: foo @b ~~ The same as above. Qualifier is redundant here.
B: foo @a ~~ Access the field `foo` of object `b` derived from `a`.
```

Static Fields
-------------

Static fields are named objects declared only once. They never
[propagated](propagation.html) to inherited objects, but still accessible from
them, just like any other field.

Static field declarations syntax is the same as ordinary one, except the `::=`
symbol is used instead of `:=`:

Static fields are not propagated, so they can not be overridden. A field
override syntax is irrelevant to them.

Static fields can be accessed with exactly the same syntax as ordinary fields.
 
A static field can only be declared in module or inside another static field.


Aliases
-------

Aliases are named expressions, which can be accessed just like fields.

An alias declaration syntax is similar to field declaration, except the `:-`
symbol is used instead of `:=`:

> `[<visibility>] <name> ':-' <expression>`

where:

* `<visibility>` is an alias visibility, similar to field visibility,
* `<name>` is an alias name,
* `<expression>` is arbitrary expression.

If an alias expression constructs an object, then such object will be
constructed at most once per owner object.
 
Aliases can be accessed with exactly the same syntax as fields.

Aliases can not be overridden. But there is a special case. If the alias
expression is a reference to a field of the same owner object, then such alias
becomes just another name for aliased field. So, overriding such alias becomes
equal to overriding the aliased field:
```o42a
A := void (
  Field := 1      ~~ Declare a field.
  Alias :- field  ~~ Create an alias for `field`.
)
A: field          ~~ 1
A: alias          ~~ 1, the same as `a: field`.

B := a (
  Alias = * (= 2) ~~ This is valid.
)
B: field          ~~ 2, overridden with alias.
B: alias          ~~ 2, the same as `b: field`.
```
