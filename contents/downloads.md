---
title: Downloads
template: article.jade
---

Downloads
==========

The o42a compiler and source code are available under the terms of 
[GNU General Public License, version 3 or later][GPL].

The run-time libraries and source code are available under the terms of
[Mozilla Public License, version 2.0][MPL]

[GPL]: http://gnu.org/licenses/gpl-3.0.html
[MPL]: http://www.mozilla.org/MPL/2.0


Source Code
-----------

> The source code is available for download
> **[here](http://bitbucket.org/o42a/o42a/downloads)**.

The latest sources can be obtained from project's Mercurial repository.
For that, type the following command in console:

> `hg clone https://bitbucket.org/o42a/o42a`

Or follow to the [source](http://bitbucket.org/o42a/o42a/src) section
at Bitbucket.

Information about releases can be found [here](../releases/index.html).


Installation
------------

### Requirements ###

o42a works on GNU/Linux with x86_64 architecture.
Other configurations not tested.


### Dependencies ###

* [Java SE 1.7](http://www.oracle.com/technetwork/java/index.html)
* [LLVM 3.3](http://llvm.org)
* [ICU 4.6](http://icu-project.org) (May also work with earlier releases)
* [Apache Ant 1.8](http://ant.apache.org/)
* [GNU Make](http://gnu.org/software/make/)
* [GCC](http://gnu.org/software/gcc/) or compatible C/C++ compiler
* [Bash](http://gnu.org/software/bash/)


### Customize The Build ###

You may be required to customize the build. For that:

* enter the 'build' directory,
* locate the files you want to customize (those with names containing
  `.default.` sub-string) and follow customization instructions inside.


### Build ###

Once all dependencies installed, enter the directory, where o42a located
and invoke the following command:

> `ant`


### Install ###

o42a does not require a special installation procedure. To invoke `o42ac`
just add the o42a directory to the `PATH` environment variable or create
an alias for `o42ac` executable.


"Hello, World!" Execution
--------------------------

Enter the `examples` directory and type in the following command:

> `ant hello-world`

to compile and run the program, or

> `ant compile`

to only compile, but not execute it.

The compiled executable will be called `bin/hello_world`.
