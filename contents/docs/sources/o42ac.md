---
title: Documentation
template: doc.jade
---

o42ac: an o42a Compiler
=======================
<!--
Copyright (C) 2010-2012 Ruslan Lopatin.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
-->

The o42ac is a command line tool to compile o42a source code and produce either
executable binary or other representation the LLVM supports.

Usage:

> `o42ac [<options>] <input file> [--vmargs <java options>] [-- <gcc options>]`

where:

* `<java options>` passed to [Java VM][javac];
* `<gcc options>` passed to [gcc compiler][gcc]; 
* supported `<options>` are:

---------------------

| Option            | Value                   | Description
|-------------------|-------------------------|-------------
| `-analyze-uses`   | 0/1, enabled by default | Controls whether compiler should track the uses of objects and other program model entities. With this disabled, the executable will contain __all__ objects from root, imported modules and program module, and will take the most conservative (and slowest) code generation decisions. It's meaningless to disable this option for something but compiler debugging.
| `-encoding`, `-E` | `<encoding>`            | The encoding of files in [source tree](index.html). UTF-8 by default.
| `-format`, `-F`   |                         | Output file format. Can be one of:
|                   | `ll`                    | to generate an [LLVM IR][]
|                   | `s`                     | to generate an assembler code
|                   | `o`                     | to generate an object file
| `-help`           |                         | Specify to display the available options.
| `-normalize`      | 0/1, enabled by default | Controls the normalization. It is meaningless to disable this option for something but compiler debugging.
| `-o`              | `<path>`                | Output file name. If `-format` option not specified then the output format will be determined by the file name extension:
|                   | `*.ll`                  | same as `-format=ll`
|                   | `*.s`                   | same as `-format=s`
|                   | `*.o`                   | same as `-format=o`
|                   | Anything else           | an executable file will be generated with `gcc`
|                   |                         | When the output file is omitted and format is not, the output will be sent to standard output.
|                   |                         | Any option supported by LLVM. Call `o42ac -help` to see the available options.

---------------------

Usage examples
--------------

Generates an executable file `hello_world`:
> `o42ac hello_world.o42a -o hello_world`

Generates an LLVM IR and places it to file `hello_world.ll`:
> `o42ac hello_world.o42a -o hello_world.ll`

Generates an object file `hello_world.o`:
> `o42ac hello_world.o42a -o hello_world.o`


[javac]:   http://download.oracle.com/javase/6/docs/technotes/tools/solaris/javac.html
[gcc]:     http://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html
[LLVM IR]: http://llvm.org/docs/LangRef.html