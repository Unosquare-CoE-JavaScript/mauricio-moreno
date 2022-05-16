# Adapter

## Adapter is a structural design pattern, which allows incompatible objects to collaborate.

The Adapter acts as a wrapper between two objects. It catches calls for one object and transforms them to format and interface recognizable by the second object.The Adapter acts as a wrapper between two objects, It

---

<b>Usage Example</b>: The Adapter pattern is pretty common in TypeScript code. It’s very often used in systems based on some legacy code. In such cases, Adapters make legacy code work with modern classes.

<b>Identification</b>: Adapter is recognizable by a constructor which takes an instance of a different abstract/interface type. When the adapter receives a call to any of its methods, it translates parameters to the appropriate format and then directs the call to one or several methods of the wrapped object.

---

## Problems to solve

> Use the Adapter class when you want to use some existing class, but its interface isn’t compatible with the rest of your code.
>
> - The Adapter pattern lets you create a middle-layer class that serves as a translator between your code and a legacy class, a 3rd-party class or any other class with a weird interface.

> Use the pattern when you want to reuse several existing subclasses that lack some common functionality that can’t be added to the superclass.
>
> - You could extend each subclass and put the missing functionality into new child classes. However, you’ll need to duplicate the code across all of these new classes, which smells really bad.

# How to implement

This example (./Adapter.ts) illustrates the structure of the Adapter design pattern and focuses on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

1. Make sure that you have at least two classes with incompatible interfaces:

   - A useful service class, which you can’t change (often 3rd-party, legacy or with lots of existing dependencies).

   * One or several client classes that would benefit from using the service class.

2. Declare the client interface and describe how clients communicate with the service.

3. Create the adapter class and make it follow the client interface. Leave all the methods empty for now.

4. Add a field to the adapter class to store a reference to the service object. The common practice is to initialize this field via the constructor, but sometimes it’s more convenient to pass it to the adapter when calling its methods.

5. One by one, implement all methods of the client interface in the adapter class. The adapter should delegate most of the real work to the service object, handling only the interface or data format conversion.

6. Clients should use the adapter via the client interface. This will let you change or extend the adapters without affecting the client code.

> # Pros
>
> - Single Responsibility Principle. You can separate the interface or data conversion code from the primary business logic of the program.
> - Open/Closed Principle. You can introduce new types of adapters into the program without breaking the existing client code, as long as they work with the adapters through the client interface.

> # Cons
>
> - The overall complexity of the code increases because you need to introduce a set of new interfaces and classes. Sometimes it’s simpler just to change the service class so that it matches the rest of your code.
