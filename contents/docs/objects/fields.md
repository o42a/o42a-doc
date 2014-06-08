---
title: Fields
template: doc.jade
order: 4
---

Fields
======
<!--
Copyright (C) 2010-2013 Ruslan Lopatin.
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

> `[<visibility>] <name> [ ['@' ['('] <ascendant> [')'] ] | ':'] [{'=' | '=>' | '=<' | '=<>'}] <definition>`

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
field declaration, while it's absence means the field override. In the latter
case it is expected that the field with the same identifier is present in
object's ascendant. Because object may have multiple ascendants, it is possible
to explicitly specify an `<ascendant>` the overridden field is originated from.

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
  Operand 1 = 11 ~~ Override `operand 1`.
  Operand 2 = 31 ~~ Override `operand 2`.
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

If an object has multiple ascendants and some ascendants contain different
fields with the same identifier, then unqualified field access means access to
the __last__ ascendant in the list. To access the fields derived from other
ascendants an explicit qualification required.

Example:
```o42a
A := void (
  Foo := 1 ~~ Declare the field `foo`.
)
B := void (
  Foo := 1 ~~ Declare a field with the same name `foo`.
)
C := * & a & b ~~ `C` derived from both `a` and `b`.

C: foo    ~~ Access the field `foo` of object `c` derived from `b`.
C: foo @b ~~ The same as above. Qualifier is not required here, but may be a good idea.
B: foo @a ~~ Access the field `foo` of object `c` derived from `a`.
```
