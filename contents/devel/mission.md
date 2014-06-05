---
title: Mission Statement
template: devel.jade
---

Mission Statement
=================

Consider programming as formalizing some logic, or just your thoughts, in the
form the machine can operate with.

**The mission of this project is to create a better tool of thoughts
formalization.**

What means "better"?

-   __Let programmer operate with a high level entities, which are natural for
    human understanding__.

    A low-level machine-dependent entities are not natural for human mind.
    They require programmer to "compile" his thoughts into a lower-level
    semantics and thus distract him from actual task.

-   __Limit the number of entity kinds__.

    Too many options to select from is another example of distraction.

-   __Reduce the boilerplate__.

    The most annoying thing is to write the same statements again and again,
    especially when it's unavoidable, like writing declarations.

-   __Let others read your code easily__.

    In fact, the code you write is for you and other developers in your team.
    This code should be readable and easy to understand.

-   __Computing performance is important__.

    But is less important than development performance though. Often, it is
    cheaper to buy more computing power than to optimize the code. Also, more
    development means more time. And time is priceless.

    But. It is better to have computing performance than not. An idea is to let
    the compiler to perform optimizations instead of requiring programmer
    to doing it.

**It's all about development costs actually.**

-   High-level __development is faster__ than a low-level one.

    Less time wasted, less money spent.

-   High-level code is shorter and contains __less bugs__.

    Less support costs. Less user complaints.

-   High-level code is generally __more extensible__.

    More features faster and cheaper.

-   High-level code contains __less or no security flaws__.

    In fact, we should blame the low-level programming languages for the
    majority of the critical security vulnerabilities leading to arbitrary code
    execution.

Critics of high-level programming often pointing out the worse computing
performance. But the proper high-level semantics allows the wider range of
automated optimization techniques. In fact, we can talk about code normalization
instead of optimization hacks in this case. Manual code optimization (except for
algorithms optimization) is a routine task. Why not let the compiler to do it
for us? Why wasting the developer's time on the manual work instead of
automating it?

And the last. Some high-level languages are not easy to learn and use, as they
rely on the knowledge of some aspects of mathematics, such as predicate logic or
lambda calculus. They may also apply a strong limitations, such as an absence of
state or i/o side effects, which is impractical in too many situations.
**The general principle of this project is to stay pragmatic.** The programming
language should be easy to learn and use.
