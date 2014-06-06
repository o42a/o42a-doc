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
Use namespace 'Console'.

@Main := * {
  Print "Hello, World!" nl.
}
```

## Program Structure ##
When compiled the program above produces a _module_ with (case insensitive) name `Hello World`. A module is a top-level object containing all other objects declared in the same program.

Note that the statements organized in sentences. Some sentences end with periods. Period is optional at the end of line.

Also note that the names are case-insensitive. The capital letters are used only at the sentence beginnings, like in natural text. This is grammatically correct, but not required.


## "Use Namespace" Directive ##
The first line
```o42a
Use namespace 'Console'
```
contains a directive, which makes an objects declared in the module `Console` available in the file this directive appeared in.

`Console` is a built-in module containing `Print` and `Main` definitions.

`Use namespace` is a directive, which doesn't mean it is some sort of a keyword. Directives are regular objects interpreted by compiler rather than executed at run time.

Note that the name `Use namespace` consists of two words separated by space. Names in o42a may consist of multiple words, numbers and hyphens separated by spaces.

The whole statement is a _phrase_, which is an advanced syntax construct. Programmer may define a custom rules for phrase syntax. This may improve readability, but is not required, because any phrase can be written in a canonical form. For example, the statement above can be rewritten as following:
```o42a
Use namespace (
  Module = "Console".
)
```

Note that in contrast to a canonical form, where the double quotes used around `Console`, the phrase itself uses a single quotes. The difference is in their interpretation: double quoted string is always an expression of `string` type, while single quoted string is always a part of the phrase and interpreted accordingly to the rules of that phrase. In the above situation, there is no difference between the two forms. But there is a difference between the following expressions:
```o42a
float '1234.5' ~~ This is a floating-point number definition.
float "1234.5" ~~ This is an error, as there is no obvious connection between strings and floats.
```


## @Main Declaration ##

The following construct
```o42a
@Main := ~~ Field definition ~~
```
declares a field.

The `:=` sign means it is a new field declaration. In contrast, a plain `=` without a colon would mean a field override (which is impossible here, as module does not derive any fields to override).

A _commercial at_ (`@`) sign means that `Main` is not a field name. Instead, it's an object reference, which is used as a field identifier. Any field in o42a can be declared with either textual name or object as it's identifier. In the latter case the field is called _adapter_. Adapters are useful in many situations, such as automatic type casts. Adapter adds an interface to an object in a more flexible way than inheritance. There is a special syntax for accessing adapters and their nested fields.

The `Main` is an object defined in `Console` module and is treated specially. When module declares a `Main` adapter this adapter is used as a main function of the program. The program invocation means this adapter access. The value of this adapter becomes the result of program execution.


## @Main Definition ##

An expression following the `=` sign is a `Main` adapter definition:
```o42a
* {
  ~~ Some statements here ~~
}
```

An asterisk (`*`) here is an _implied reference_. This means the field is derived from some object, which can be determined automatically. In this case the automatically determined ascending object is `Main`, as every adapter implicitly derives it's identifier object.

Braces (`{..}`) here enclose a block of _imperative_ code. In contrast to the _declarative_ code, an imperative one can loop, allocate the local fields or modify the variables, but it cannot modify the structure of enclosing object. Note that the module definition itself is _declarative_.

The whole expression above is a phrase. The syntax of this phrase is defined in the `Main` object, while its canonical form is:
```o42a
* ({ ~~ An imperative block within a declarative one
     ~~ Statements here ~~
})
```

## Print Invocation ##

Now to the `@Main` field definition content.
```o42a
Print "Hello, World!" nl
```

A `Print` object is defined in `Console` module and does what expected: prints a message to the console.

The whole expression is a phrase and can be rewritten roughly as following:
```o42a
{
  Print (Text = "Hello, World!") ~~ Message
  Print (Text = "\n")            ~~ New line
}
```
