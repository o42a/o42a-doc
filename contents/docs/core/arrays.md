---
title: Arrays
template: doc.jade
order: 3
---

Arrays
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

An array is a fixed-length sequence of object references. Each array is an
object, which [value](/docs/objects/value.html) contains that references.

The array object inherits one of the two base objects:

| Object  | Description
|---------|---------------------------------------------------------------------
| `Row`   | Immutable array. Such array can not be altered after initialization.
| `Array` | Mutable array. Array elements can be modified by the [assignment](variables.html#assignment) statement.

Note that array length can not be altered despite the array mutability.

Both of these objects inherited from `Indexed` prototype, which declares an
interface for all objects containing indexed elements.


Array Constructor
-----------------

An array can be constructed and initialized with a special expression with the
following syntax:
> `'[' [<item> [',' <item>] ...] ']'`

where `<item>` is an expression resolving to the corresponding array element's
initial value; the number of items defines an array length.

The constructed array will inherit a `Row` object.

The type of elements will be determined automatically.


Array Object
------------

Every array is an object and can be constructed by the
object [constructor expression][]. The type of array
elements can be specified as a type parameters:
```o42a
Foo :=> void (Int :=< integer)
Bar :=> foo (Str :=< string)

Foo row := [foo (Int = 1), foo (Int = 2)] ~~ Elements type is `foo`.

Bar row := bar` foo row (= [bar (Int = 1, Str = "One")]) 
~~ Inherit the `foo row` and upgrade elements type to `bar`.
```

[constructor expression]: ../objects/creation.html#constructor-expression

Also the `Row` and `Array` objects declare phrases, which can be used to
 construct arrays:
```o42a
Integer` row [[1, 2, 3]] ~~ Row of integers

String` array [["first", "second", "last"]] ~~ Array of strings:

Array of strings := string` array = ["first", "second", "last"]
~~ Field initializer syntax
```


Array Element Access
--------------------

An array element can be accessed with the following phrase:
> `<array> '[' <index> ']'`

where:

* `<array>` is an expression resolving to target array;
* `<index>` is an expression resolving to integer value, designating the
  requested element's index (zero-based).

Examples:
```o42a
~~ The row of three integers.
My array := [1, 2, 3]
My array [1]            ~~ Returns `2`.
My array [10]           ~~ False value, as element index is invalid.

~~ The array of two strings.
Var-array := string` array [["one", "sec" + "ond"]]
Var-array [1]           ~~ `"second"` initially, until modified.
{
  Var-array [1] = "two" ~~ Assign `"two"` to second element.
  Var-array [1]         ~~ Now it's `"two"`.
}
```


Array Value Definition
----------------------

Array object's value can be defined just as any other one, e.g. with a
[return](/docs/objects/definition.html#return)
or [yield](/docs/objects/definition.html#yield) statement.

`Row` and `Array` has different [value types](../objects/value.html#value-type),
but they can be converted from one to another:
```o42a
Var-array := integer` array ( ~~ Declare the (mutable) array of integers.
  = [1, 2, 3]                   ~~ Initialize it with (immutable) row.
)
```

Note however, that return and yield statements copy an array content (unless
a row returned from row object). It is possible to create a [link](links.html)
to array, or array [variable](variables.html) to pass arrays by reference.
