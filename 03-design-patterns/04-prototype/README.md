# Prototype

## Prototype is a creational design pattern that allows cloning objects, even complex ones, without coupling to their specific classes.

All prototype classes should have a common interface that makes it possible to copy objects even if their concrete classes are unknown. Prototype objects can produce full copies since objects of the same class can access each other’s private fields.

---

<b>Usage Example:</b> The Prototype pattern is available in TypeScript out of the box with a JavaScript’s native Object.assign() method.
<b></b> The prototype can be easily recognized by a clone or copy methods, etc.

# Problems to solve

> Use the Prototype pattern when your code shouldn’t depend on the concrete classes of objects that you need to copy.
>
> - This happens a lot when your code works with objects passed to you from 3rd-party code via some interface. The concrete classes of these objects are unknown, and you couldn’t depend on them even if you wanted to. The Prototype pattern provides the client code with a general interface for working with all objects that support cloning. This interface makes the client code independent from the concrete classes of objects that it clones.

> Use the pattern when you want to reduce the number of subclasses that only differ in the way they initialize their respective objects.
>
> - Suppose you have a complex class that requires a laborious configuration before it can be used. There are several common ways to configure this class, and this code is scattered through your app. To reduce the duplication, you create several subclasses and put every common configuration code into their constructors. You solved the duplication problem, but now you have lots of dummy subclasses. The Prototype pattern lets you use a set of pre-built objects configured in various ways as prototypes. Instead of instantiating a subclass that matches some configuration, the client can simply look for an appropriate prototype and clone it.

# How to implement

This example illustrates the structure of the Prototype design pattern and focuses on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Prototype](./Prototype.png)

1. Create the prototype interface and declare the clone method in it. Or just add the method to all classes of an existing class hierarchy, if you have one.

2. A prototype class must define the alternative constructor that accepts an object of that class as an argument. The constructor must copy the values of all fields defined in the class from the passed object into the newly created instance. If you’re changing a subclass, you must call the parent constructor to let the superclass handle the cloning of its private fields.

   If your programming language doesn’t support method overloading, you won’t be able to create a separate “prototype” constructor. Thus, copying the object’s data into the newly created clone will have to be performed within the clone method. Still, having this code in a regular constructor is safer because the resulting object is returned fully configured right after you call the new operator.

3. The cloning method usually consists of just one line: running a new operator with the prototypical version of the constructor. Note, that every class must explicitly override the cloning method and use its own class name along with the new operator. Otherwise, the cloning method may produce an object of a parent class.

4. Optionally, create a centralized prototype registry to store a catalog of frequently used prototypes.

   You can implement the registry as a new factory class or put it in the base prototype class with a static method for fetching the prototype. This method should search for a prototype based on search criteria that the client code passes to the method. The criteria might either be a simple string tag or a complex set of search parameters. After the appropriate prototype is found, the registry should clone it and return the copy to the client.

   Finally, replace the direct calls to the subclasses’ constructors with calls to the factory method of the prototype registry.

> # Pros
>
> - You can clone objects without coupling to their concrete classes.
> - You can get rid of repeated initialization code in favor of cloning pre-built prototypes.
> - You can produce complex objects more conveniently.
> - You get an alternative to inheritance when dealing with configuration presets for complex objects.

> # Cons
>
> - Cloning complex objects that have circular references might be very tricky.
