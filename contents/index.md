---
title: About
template: article.jade
---

About
=====

**o42a** is a high-level general purpose programming language. It is:

* **compiled**,
* **statically-typed**,
* **prototype-based**,
* **logic-driven**, and
* primarily **declarative**, while
* the **imperative** programming style is also supported. 

A program written in o42a is closer to natural English text than one written
in any C-like programming language.

The language is designed with programming productivity and code maintainability
 as main priorities. This achieved by

* **powerful, yet restrained, semantics**, and
* **expressive and natural syntax**.

> See the [Mission Statement](devel/mission.html)  
> Take a look at the [feature list](docs/intro/features.html) for overall 
> language description.  
> Read the [documentation](docs/index.html) for the details.


Development Status
------------------

A prototype of compiler is under development.
This compiler is written in Java and uses [LLVM](http://llvm.org) for executable
code generation.

All documented language features are implemented. The development is currently
focused on core libraries implementation, compiler stability, and implementation
of additional language features necessary to make libraries handy and efficient.

> See the detailed [development](devel/index.html) status and plan.

Hello, World!
-------------

Here is a "Hello, World!" program written in o42a:

```o42a
Use namespace 'Console'.

@Main := * {
  Print "Hello, World!" nl.
}
```

> See the [explanation](docs/intro/hello_world_explained.html).

Download
--------

The o42a compiler and source code are available under the terms of
[GNU General Public License, version 3 or later](http://gnu.org/licenses/gpl-3.0.html).

The run-time libraries and source code are available under the terms of
[Mozilla Public License, version 2.0](http://www.mozilla.org/MPL/2.0/).

> Proceed to the [download](downloads.html) section.
