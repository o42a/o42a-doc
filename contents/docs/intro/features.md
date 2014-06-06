---
title: Language Features
template: doc.jade
order: 1
---

Language Features
=================

Syntax
------

* A multi-word, case-insensitive names may contain numbers and hyphens.  
  All of these are valid names:
    * `Hello World`,
    * `Plug-in`,
    * `String 2 integer`, which is the same as `string2integer`,
    * `Links-2-3-4`.
* No keywords.
* Natural punctuation with a logical meaning:
    * Statements organized in sentences ending with:
        * _period_ (`.`) when the sentence is a _proposition_,
        * _exclamation mark_ (`!`) when the sentence is a _claim_, or
        * _question mark_ (`?`) when the sentence is an _issue_.
    * Statements within the same sentence may be delimited by:
        * _comma_ (`,`), which stands for _logical AND_, or
        * _semicolon_ (`;`), which stands for _logical OR_.
* _Colon_ (`:`) is used as a field access modifier:
```o42a
Foo: bar      ~~ Accessing field `bar` of object `foo`
Foo: bar: baz ~~ Accessing field `baz` of field `bar` of object `foo`
```
* o42a supports _phrases_ - a pure syntactic, customizable way to build a
  domain-specific expressions. It is possible to declare syntactic rules
  to interpret the following expressions:
```o42a
Print "Hello, World!" nl
Use object 'main' from 'console' as 'run'
SELECT ['t1.foo', 't1.bar', 't2.baz'] FROM 't1' LEFT OUTER JOIN 't2' ON 'id' ORDER BY 'foo'
```

Values & Type System
--------------------

* Every object has a **value** of some basic type. The following scalar value types supported:
    * _void_ - nothing;
    * _integer_ - a 64-bit integer number;
    * _float_ - a 64-bit floating-point number;
    * _string_ - a Unicode string of text;
* Composite types like arrays, links, and variables are also supported.
* The o42a type system is static, which means once defined a type of the object
  can not be changed or overridden in derived objects. The only exception is
  _void_ type, which is the base of all other types.
* Every type is represented by intrinsic object.
* The `Void` object, representing _void_ type is an ancestor of every other object.


Logical Meaning
---------------

* Every value has a logical precondition of its existence called
  **logical value**.
* There are **no nulls** and **no exceptions**.
  They are replaced by the logical values.
* Every expression has a logical meaning derived from the value it produces.
  The syntax is designed in favor of this. For example, here is a definition of
  the arithmetic `signum` function:
```o42a
Signum :=> integer (
  Arg :=< integer
  Arg > 0? = 1  ~~ If `arg` is positive, return 1.
  Arg < 0? = -1 ~~ Otherwise, if `arg` is negative, return -1.
  = Arg         ~~ Otherwise, return the value itself.
                ~~ Can be either zero or false.
)
```


Declarative & Imperative Paradigms
----------------------------------

* o42a supports both declarative and imperative coding styles within 
  appropriate code blocks.
* The code is declarative by default. The imperative code is the one enclosed
  in curly braces (`{}`).
* Any code consists of sentences evaluating the enclosing object's value.
* The [declarative code][] can additionally define the enclosing object's
  structure by declaring its members.
* The [imperative code][] may contain advanced evaluation algorithms,
  such as loops:
```o42a
{
  I := ``0 ~~ This is a local integer variable initialized to zero. 
  {
    ~~ Some code here. ~~
    I = i + 1
    I < 10? ... ~~ While `i` less than 10, repeat.
  }
  {
    ~~ Some code here. ~~
    I = i + 1
    I >= 20?!  ~~ Exit when `i` greater or equal to 20.
    ...        ~~ Repeat otherwise.
  }
}
```

Object Model
------------

* An o42a object model is [prototype-based][], which means there is
  **no classes or interfaces**. Objects derive other objects directly.
* Furthermore, there is **no methods**, and **no constructors**. The inheritance
  is the only way to construct a new object.
* Everything in o42a is represented as an object, including:
    * _scalar values_,
    * _strings_,
    * _arrays_,
    * _links_ to an objects,
    * _variables_, which are the links modifiable at run time,
    * program _modules_,
    * compiler _directives_,
    * _macros_.
* An object's **field** is just a nested object with name.
* There is **no packages**, **no primitive values**, and **nothing else but 
  objects**.
* o42a features an **instant [generic programming][]**. An object inherits an
  expression, not just another static object. So, the nested object's ancestor
  is updated automatically when the enclosing object is inherited:
```o42a
A := void (     ~~ `A` is a base object.
  Foo := void ( ~~ `Foo` is a field of `A`.
    F := 1      ~~ `Foo` contains field `F`.
  )
  Bar := foo () ~~ `Bar` is another field of `A`, which inherits `Foo`.
)

B := A (        ~~ `B` inherits `A`.
  Foo = * (     ~~ `Foo` is overridden in `B`.
    G := 2      ~~ `G` is a new field of `B: foo`.
  )
)

B: bar: g       ~~ Equals to 2. This is valid, because `b: bar` derived from `b: foo`,
                ~~ which has a field `g`.  
```
* A more traditional [parametric polymorphism][generics] (generics)
  is available with the use of **type parameters**.
* A more advanced meta-programming is possible with **macros**.
* An **object propagation** is a form of object derivation used in o42a instead
  of the [multiple inheritance][]:
```o42a
A := void (Foo := 1)
B := void (Bar := 2)
C := void & a & b
C: foo      ~~ Equals to 1, derived from `A`.
C: foo @a   ~~ A more precise specification of where `foo` came from. 
C: bar      ~~ Equals to 2, derived from `B`.
C: bar @b   ~~ A more precise specification of where `bar` came from. 
```
* o42a supports **[adapters][]** at syntax level. Adapters are used when
  implicit type conversion needed. The adapter is a field with interface object
  as identifier. There is a special syntax for accessing the adapter itself
  or one of its fields:
```o42a
A := void (
  Foo := 1
)
B := void (
  @A := * (Foo = 2) ~~ An adapter of `B` to `A` declaration.
)

b @@a      ~~ An adapter to `A`.
b: foo @a  ~~ The field `Foo` of adapter to `A`.
```
* Some adapters have predefined meaning and recognized by the compiler.
  For example, the following code can be used to declare a **main object**
  of the program:
```o42a
Use namespace 'Console'       ~~ Import symbols declared in `Console` module.

@Main :=> * {                 ~~ Declare the main object.
  Print "Program executed" nl ~~ Print the message.
  = 0                         ~~ Return the code of success.
}
```

[declarative code]:     http://wikipedia.org/wiki/Declarative_programming
[imperative code]:      http://wikipedia.org/wiki/Imperative_programming
[prototype-based]:      http://wikipedia.org/wiki/Prototype-based_programming
[generic programming]:  http://wikipedia.org/wiki/Generic_programming
[generics]:             http://wikipedia.org/wiki/Parametric_polymorphism
[multiple inheritance]: http://wikipedia.org/wiki/Multiple_inheritance
[adapters]:             http://wikipedia.org/wiki/Adapter_pattern
