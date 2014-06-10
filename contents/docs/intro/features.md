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
    * Statements are organized in sentences ending with _periods_ (`.`),
      _question marks_ (`?`), _exclamation marks_ (`!`), or _ellipses_ (`...`). 
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

  SELECT ['t1.foo', 't1.bar', 't2.baz']
  _FROM 't1' LEFT OUTER JOIN 't2' ON 'id'
  _ORDER BY 'foo'
  ```

Values & Type System
--------------------

* Every object has a **value** of some basic type. The following scalar value
  types supported:
    * _void_ - nothing;
    * _integer_ - a 64-bit integer number;
    * _float_ - a 64-bit floating-point number;
    * _string_ - a Unicode string of text.
* Composite types like arrays, links, and variables are also supported.
* An object value is not necessarily a constant. It is (re-)evaluated on each 
  request, and the value definition algorithm could be any. 
* The o42a type system is static. This means once defined, the type of the
  object can not be changed or overridden in derived objects. The only exception
  is a _void_ type, which is a base of all other types.
* Every type is represented by its intrinsic object.
* The `Void` object, representing a _void_ type, is an ancestor of every other
  object.


Logical Meaning
---------------

* Every value has a logical precondition of its existence called
  **logical value**.
* There are **no nulls** and **no exceptions**.
  They all could be easily replaced by logical values.
* Every expression has a logical meaning derived from the value it produces.
  The syntax is designed in favor of this. For example, here is a definition of
  the arithmetic `signum` function:
  ```o42a
  Signum :=> integer (
    Arg :=< integer
    Arg > 0? = 1  ~~ If the `arg` is positive, return 1.
    Arg < 0? = -1 ~~ Otherwise, if the `arg` is negative, return -1.
    = Arg         ~~ Otherwise, return the `arg` itself.
                  ~~ Can be either zero or false.
  )
  ```


Declarative & Imperative Paradigms
----------------------------------

* o42a supports both declarative and imperative coding styles within 
  appropriate code blocks.
* The code is declarative by default. The imperative code is the one enclosed
  in curly braces (`{}`).
* Any code consists of sentences evaluating the enclosing object's value or
  precondition of this value existence (logical value).
* The [declarative code][] can additionally define the enclosing object's
  structure by declaring its members.
* The [imperative code][] may contain advanced evaluation algorithms,
  such as loops:
  ```o42a
  $I = ``0 ~~ Local variable initialized to zero. 
  {
    ~~ Some code here. ~~
    I +<< 1   ~~ Increase `i`.
    I < 10?.. ~~ While `i` less than 10, repeat.
  }
  {
    ~~ Some code here. ~~
    I +<< 1    ~~ Increase `i`.
    I >= 20?!  ~~ Exit when `i` greater or equal to 20.
    ...        ~~ Repeat otherwise.
  }
  ```

Object Model
------------

* An o42a object model is [prototype-based][], which means there is
  **no classes or interfaces**. Objects inherit other objects directly.
  An inheritance is the only way to construct a new object.
* An object's **field** is just a nested object with a name.
  There is **no methods**, and **no constructors**, as any field has a value.
* Everything in o42a is represented as an object, including:
    * _scalar values_,
    * _strings_,
    * _arrays_,
    * _links_ to an objects,
    * _variables_, which are the links modifiable at run time,
    * program _modules_,
    * compiler _directives_,
    * _macros_.
  There is **no packages**, **no primitive values**, and **nothing else but 
  objects**.
* A [parametric polymorphism][generics] (generics) is supported by o42a.
  Any object may have **type parameters**.
* A more advanced meta-programming is possible with **macros**.
* o42a supports **[adapters][]** at syntax level. An adapter adds an interface
  to an object. **Multiple inheritance is not supported**. Instead, adapters
  are used for things like implicit type conversion.
```

[declarative code]:     http://wikipedia.org/wiki/Declarative_programming
[imperative code]:      http://wikipedia.org/wiki/Imperative_programming
[prototype-based]:      http://wikipedia.org/wiki/Prototype-based_programming
[generic programming]:  http://wikipedia.org/wiki/Generic_programming
[generics]:             http://wikipedia.org/wiki/Parametric_polymorphism
[multiple inheritance]: http://wikipedia.org/wiki/Multiple_inheritance
[adapters]:             http://wikipedia.org/wiki/Adapter_pattern
