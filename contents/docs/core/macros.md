---
title: Macros
template: doc.jade
order: 4
---

Macros
======
<!--
Copyright (C) 2012-2014 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

A macro is an object, which value is an arbitrary expression. This expression
will be substituted whenever a [macro expansion](#macro-expansion) used.


Macro Declaration
-----------------

Macro can be declared as an ordinary object inherited from `Macro` prototype:
```o42a
My macro := macro (= a + b)
```
Note that the macro value is an expression itself, not the value of that
expression, unless the expression is a macro itself.

There is also a special, shorter syntax for macro declaration:

> ` '#' <field> [':'] '=' ['<'] <definition>`

where:

* `<field>` is a left part of macro
  [field](/docs/objects/fields.html#field-declaration) declaration;
* `<definition>` is an expression, which can be either:
    * an expression resolved to another macro, in which case the value will be
      copied to declared one, or
    * an arbitrary expression, which will become a macro value.

Note that macro can not be declared as prototype this way. So, the **`=>`** 
and **`=<>`** tokens are prohibited here.

The macro field can be overridden just like any other field. But note, that
disregarding the presence of **`#`** prefix, the field definition will be
treated as a macro value, unless it is a macro expression.


Macro Expansion
---------------

Macros are intended for their expansion, i.e. for placing their values
(which are expressions) to other parts of the program.

The macro expansion is performed when the macro reference starts with a **`#`**
sign. Such reference may be used in places where ordinary expressions not
allowed. For example, it can be used as type argument:
```o42a
#T := integer
Link to integer := #t` link = 123
Integer link :=> #t` link
```

The macro expansion can be used in the following situations:

* as type parameter or argument;
* as statement;
* as a value of return or yield statements;
* as field definition, or
* as phrase argument.

Macros are always expanded at **compile time**. So, the macro value have to be
evaluable at compile time.

Whenever the macro is overridden, it will be re-expanded in the affected scope.
This can be used to create [generics][] for example:
```o42a
Generic :=> void (
  #Type :=< void ~~ Type parameter.
  Link :=< #type` link
)
Integer generic := generic (
  Type = integer ~~ Override the type parameter.
  Link = 123     ~~ `Integer` is substituted as new link interface.
)
```

[generics]: http://wikipedia.org/wiki/Generic_programming

The macro expansion expression doesn't mean an immediate macro expansion when
used as phrase prefix. Instead, a phrase will be constructed as usual and the
result will be expanded:
```o42a
#Macro (Arg = value) ~~ The phrase is expanded, not the `macro` object.
```

> Note that when overriding a macro, the new value of the macro is an
> arbitrary expression, which is unrelated to an old one. So, when the new value
> is substituted instead of an old one, this may result to incompatibility
> errors.
>
> Not any expression can be used as link interface for example.
> So, the macro expansion may result to an error in this case too.
>
> So, despite the macro value is an arbitrary expression, the macro expansions
> apply limitations to it.


### Macro Field Expansion ###

If the field of some object is a macro, then it can be accessed and expanded
with a special syntax:
```o42a
Foo #macro   ~~ Access field `macro` of object `foo` and expand it.
#Foo: macro  ~~ The same as above.
```


### Standard Macro Expansion ###

The o42a standard library contains a `Macros` module. This module contains
standard macros, which may be very helpful. To access and expand standard macro
a special [scope reference](../expressions/references.html#scope-references)
(**`##`**) can be used. The rules of
[macro expansion](#macro-expansion) works for standard macro expansion too:
```o42a
Comparison :=> void (
  What :=< void` link
  With :=< void` link
  = What ##eq [with]
)
```

The code above is a shorter form of the following:
```o42a
Use object 'EQ' from 'Macros'
Comparison :=> void (
  What :=< void` link
  With :=< void` link
  = What ~#eq [with]  ~~ `eq` is imported from `Macros`
)
```


### Macro Expansion Inside Prototypes  ###

When the macro is expanded inside a prototype, the macro expansion failure does
not necessarily mean a compile time error. This allows to use macros to build
expressions on incomplete types.

For example, a code above uses an `##eq` standard macro. This macro does the
same as a `==` operator. But the `==` operator is not defined for the `void`
object and can't be used here. That's why the `##eq` macro fails to expand. But
this is not an error, as the macro is expanded inside prototype. When this
prototype will be derived, the derived object's field types may change, making
the macro expansion possible:
```o42a
Int comparison := comparison (
  What := `1
  With := `2
) ~~ The `==` operator is defined for integers, so the macro expansion succeeds,
  ~~ and this code compiles successfully.
```
