# Singleton

## Singleton is a creational design pattern, which ensures that only one object of its kind exists and provides a single point of access to it for any other code.

Singleton has almost the same pros and cons as global variables. Although they’re
super-handy, they break the modularity of your code.

You can’t just use a class that depends on Singleton in some other context. You’ll have to
carry the Singleton class as well. Most of the time, this limitation comes up during the
creation of unit tests.

---

**Usage examples** A lot of developers consider the Singleton pattern an antipattern.
That’s why its usage is on the decline in TypeScript code.

**Identification** Singleton can be recognized by a static creation method, which returns
the same cached object.

# Problems to solve

> Use the Singleton pattern when a class in your program should have just a single
> instance available to all clients; for example, a single database object shared by
> different parts of the program.
>
> - The Singleton pattern disables all other means of creating objects of a class except
>   for the special creation method. This method either creates a new object or returns an
>   existing one if it has already been created.

> Use the Singleton pattern when you need stricter control over global variables.
>
> - Unlike global variables, the Singleton pattern guarantees that there’s just one
>   instance of a class. Nothing, except for the Singleton class itself, can replace the
>   cached instance.

# How to implement

This example illustrates the structure of the Singleton design pattern and focuses on the
following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Singleton](./Singleton.png)

1. Add a private static field to the class for storing the singleton instance.

2. Declare a public static creation method for getting the singleton instance.

3. Implement “lazy initialization” inside the static method. It should create a new object
   on its first call and put it into the static field. The method should always return that
   instance on all subsequent calls.

4. Make the constructor of the class private. The static method of the class will still be
   able to call the constructor, but not the other objects.

5. Go over the client code and replace all direct calls to the singleton’s constructor
   with calls to its static creation method.

> # Pros
>
> - You can be sure that a class has only a single instance.
> - You gain a global access point to that instance.
> - The singleton object is initialized only when it’s requested for the first time.

> # Cons
>
> - Violates the Single Responsibility Principle. The pattern solves two problems at the
>   time.
> - The Singleton pattern can mask bad design, for instance, when the components of the
>   program know too much about each other.
> - The pattern requires special treatment in a multithreaded environment so that multiple
>   threads won’t create a singleton object several times.
> - It may be difficult to unit test the client code of the Singleton because many test
>   frameworks rely on inheritance when producing mock objects. Since the constructor of the
>   singleton class is private and overriding static methods is impossible in most languages,
>   you will need to think of a creative way to mock the singleton. Or just don’t write the
>   tests. Or don’t use the Singleton pattern.
