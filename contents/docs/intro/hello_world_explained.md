---
title: "\"Hello, World!\" Explained"
template: doc.jade
order: 2
---

"Hello, World!" Explained
=========================
<!--
Copyright (C) 2010-2012 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

Let's examine the program `hello_world.o42a`:
```o42a
Use namespace 'Console'

@Main (
  Print "Hello, World!" nl
)
```

## Program Structure ##
When compiled the program above produces a _module_ with (case insensitive) name
`Hello World`. A module is a top-level object containing all other objects
declared in the same program.

The statements are organized in sentences. Sentences may end with periods.
But the period is optional at the end of line.

The names are case-insensitive. The capital letters are used only at the
sentence beginnings, like in natural text. This is grammatically correct,
but is not required.


## "Use Namespace" Directive ##
The first line
```o42a
Use namespace 'Console'
```
contains a directive, which makes objects declared in the module `Console`
available in the file this directive appears in.

The `Console` is a built-in module containing `Print` and `Main` definitions.

The `Use namespace` is a directive, which doesn't mean it is some sort of a
keyword. Directives are regular objects interpreted by compiler rather than
executed at run time.

Note that the name `Use namespace` consists of two words separated by space.
Names in o42a may consist of multiple words, numbers and hyphens separated
by spaces.

The whole statement is a _phrase_, which is an advanced syntax construct.
Programmers may define custom rules for phrase syntax. This may improve
readability, but is not required, as any phrase can be written in a
canonical form. For example, the statement above can be rewritten as following:
```o42a
Use namespace (
  Module = "Console"
)
```

Note that in contrast to canonical form, where double quotes are used
around a `Console` string, the phrase itself uses single quotes. The difference
is in their interpretation: a double quoted string is always an expression of
`string` type, while a single quoted string is always a part of the phrase
and is interpreted accordingly to the rules of that phrase. In the above
situation, there is no difference between the two forms. But there is
a difference between the following expressions:
```o42a
float '1234.5' ~~ This is a floating-point number definition.
float "1234.5" ~~ This is an error, as there is no obvious connection
               ~~ between strings and floats.
```


## @Main Declaration ##

The following construct
```o42a
@Main (
  ~~ Declarations
)
```
declares a field. A _commercial at_ (`@`) sign means that `Main` is not a field
name. Instead, it is an object reference, which is used as a field identifier.
Any field in o42a can be declared with either textual name or object as its
identifier. In the latter case the field is called _adapter_. Adapter declares
an interface for enclosing object in addition to inherited one.

Adapters are useful in many situations, such as automatic type casts.
The `Main` is an object defined in `Console` module and is treated specially.
When a module has a `Main` interface, either inherited or declared as adapter,
this interface is used as a main function of the program. When the program is
executed it evaluates the value of this interface. I.e. either inherited
object's value, or adapter's value respectively.


## @Main Definition ##

The syntax above is a shorter way of writing the following:
```o42a
@Main := * (
  ~~ Declarations
)
```

The `:=` sign here means a new field declaration.

An asterisk (`*`) is an _implied reference_. This means the field is derived
from some object, that can be determined automatically. In this case the
automatically determined ascending object is `Main`, as every adapter implicitly
derives its identifier object.

Parentheses (`(..)`) here enclose a block of _declarative_ code. Such code may
contain field declarations and simple statements evaluating to the object value.

In contrast, an _imperative_ code blocks are enclosed in braces (`{..}`).
They may contain a more advanced value evaluation logic, such as loops,
but cannot declare fields.

Note that the module definition itself is _declarative_.


## Print Invocation ##

Now to the `@Main` adapter definition.
```o42a
Print "Hello, World!" nl
```

A `Print` object is defined in `Console` module and does what expected:
prints a message to console.

The whole expression is a phrase and can be rewritten roughly as following:
```o42a
Print (Text = "Hello, World!") ~~ Message
Print (Text = "\n")            ~~ New line
```
