# Facade

## Facade is a structural design pattern that provides a simplified (but limited) interface to acomplex system of classes, library or framework.

While Facade decreases the overall complexity of the application, it also helps to move unwanted
dependencies to one place.

---

<b>Usage Examples:</b> The Facade pattern is commonly used in apps written in TypeScript. It’s
especially handy when working with complex libraries and APIs.
<b></b> Facade can be recognized in a class that has a simple interface, but delegates most of
the work to other classes. Usually, facades manage the full life cycle of objects they use.

# Problems to solve

> Use the Facade pattern when you need to have a limited but straightforward interface to a
> complex subsystem.
>
> - Often, subsystems get more complex over time. Even applying design patterns typically leads
>   to creating more classes. A subsystem may become more flexible and easier to reuse in various
>   contexts, but the amount of configuration and boilerplate code it demands from a client grows
>   ever larger. The Facade attempts to fix this problem by providing a shortcut to the most-used
>   features of the subsystem which fit most client requirements.

> Use the Facade when you want to structure a subsystem into layers.
>
> - Create facades to define entry points to each level of a subsystem. You can reduce coupling
>   between multiple subsystems by requiring them to communicate only through facades.

# How to implement

This example illustrates the structure of the Facade design pattern and focuses on the following
questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Facade](./Facade.png)

1. Check whether it’s possible to provide a simpler interface than what an existing subsystem
   already provides. You’re on the right track if this interface makes the client code independent
   from many of the subsystem’s classes.

2. Declare and implement this interface in a new facade class. The facade should redirect the
   calls from the client code to appropriate objects of the subsystem. The facade should be
   responsible for initializing the subsystem and managing its further life cycle unless the client
   code already does this.

3. To get the full benefit from the pattern, make all the client code communicate with the
   subsystem only via the facade. Now the client code is protected from any changes in the
   subsystem code. For example, when a subsystem gets upgraded to a new version, you will only need
   to modify the code in the facade.

4. If the facade becomes too big, consider extracting part of its behavior to a new, refined
   facade class.

> # Pros
>
> - You can isolate your code from the complexity of a subsystem.

> # Cons
>
> - A facade can become a god object coupled to all classes of an app.
