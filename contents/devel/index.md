---
title: Development
template: devel.jade
---

Development Status
==================

The development started in April, 2009. The initial language concepts were 
changed several times since then. But today the conceptual work is almost done.

The prototype of compiler is under development.
This compiler is written in Java and uses [LLVM](http://llvm.org) for executable
code generation.

All documented language features are implemented. The development is currently
focused on core libraries implementation, compiler stability, and implementation
of additional language features necessary to make libraries handy and efficient.

The next major step is a 0.3.0 release, which should contain the core libraries
and should be stable and practically usable.

> You may track the development activity [here](https://bitbucket.org/o42a/o42a/commits/all).

Development Plan
----------------

The development is planned to consist of two main phases:

* a prototype development, and
* a production compiler development (since release 0.5.0).

The prototype will be written in Java and should become a bootstrap compiler
for the upcoming production compiler, which will be written in o42a.

A production compiler written in o42a is not just a get-rid-of-Java task.
The more important objective is to proof the language maturity and
its usefulness in a serious development. Well, the compiler is really is
a serious project and its development will be an excellent practice of the
language usage.

Because Java has a rich set of development tools it better suits for the
conceptual work, experimenting and refactoring. The production compiler written
in o42a will be a rewrite of a prototype one. Its development will start only
when the prototype compiler will be considered good enough in terms of feature
set, stability and performance.

| Releases | Status    | Objectives
|----------|-----------|------------
| 0.1.0    | Draft     | The initial release with some basic features missing
| 0.1.x    | Draft     | Implement the missing language features. Improve stability.
| 0.2.0    | Prototype | First feature-complete release.
| 0.2.x    | Prototype | Implement additional language features. Write a base library.
|          |           | The main room for experimenting.
| 0.3.0    | Bootstrap | A base of bootstrap compiler implementation.
|          |           | This is a start of the work on production compiler.
| 0.3.x    | Bootstrap | Improve stability. Implement the features demanded by production compiler.
| 0.4.0    | Bootstrap | The last major release of the Java-based compiler. Will be released at the same time as 0.5.0.
| 0.4.x    | Bootstrap | Bug fixes.
| 0.5.0    | Pre-alpha | The initial release of the production compiler written in o42a.
|          |           | The latest release from 0.4.x branch will be used as a bootstrap compiler from this point.
|          |           | Every upcoming release should be able to compile itself.
| 0.5.x    | Pre-alpha | Improve stability. Port the missing features from bootstrap compiler.
| 0.6.0    | Pre-alpha | The first release, which does not rely on a bootstrap compiler written in Java.
|          |           | The latest release of 0.5.x branch will be used as a bootstrap compiler from this point.
|          |           | The 0.4.x branch will be closed soon after this release.
| 0.6.x    | Pre-alpha | Improve the native code interoperability. It would be hard to move on without easy integration with native libraries.
| 0.7.x    | Alpha     | Alpha release cycle. Improve the compiler, extend the runtime and possibly the language itself.
|          |           | The latest minor release from preceding major release branch will be used as a bootstrap compiler, e.g. 0.6.x for 0.7, 0.7.x for 0.8, etc.
| 0.8.x    | Beta      | Beta release cycle. Work on stability. New features are possible, but not likely.
| 0.9.x    | RC        | Release candidates. Final testing and fixes.
| 1.0.0    | Stable    | The first stable release.
