# Factory

## Factory method is a creational design pattern which solves the problem of creating product objects without specifying their concrete classes.

Factory Method defines a method, which should be used for creating objects instead of direct constructor call (new operator). Subclasses can override this method to change the class of objects that will be created.

---

<b>Usage examples:</b> The Factory Method pattern is widely used in TypeScript code. It’s very useful when you need to provide a high level of flexibility for your code.

<b>Identification:</b> Factory methods can be recognized by creation methods, which create objects from concrete classes, but return them as objects of abstract type or interface.

# Problems to solve

> Use the Factory Method when you don’t know beforehand the exact types and dependencies of the objects your code should work with.
>
> - The Factory Method separates product construction code from the code that actually uses the product. Therefore it’s easier to extend the product construction code independently from the rest of the code.
> - For example, to add a new product type to the app, you’ll only need to create a new creator subclass and override the factory method in it.

> Use the Factory Method when you want to provide users of your library or framework with a way to extend its internal components.
>
> - Inheritance is probably the easiest way to extend the default behavior of a library or framework. But how would the framework recognize that your subclass should be used instead of a standard component?

The solution is to reduce the code that constructs components across the framework into a single factory method and let anyone override this method in addition to extending the component itself.

> Use the Factory Method when you want to save system resources by reusing existing objects instead of rebuilding them each time.
>
> - You often experience this need when dealing with large, resource-intensive objects such as database connections, file systems, and network resources.

# How to implement

This example (./Factory.ts) illustrates the structure of the Factory Method design pattern and focuses on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Factory](./Factory.png)

1. Make all products follow the same interface. This interface should declare methods that make sense in every product.

2. Add an empty factory method inside the creator class. The return type of the method should match the common product interface.

3. In the creator’s code find all references to product constructors. One by one, replace them with calls to the factory method, while extracting the product creation code into the factory method.

   You might need to add a temporary parameter to the factory method to control the type of returned product.

   At this point, the code of the factory method may look pretty ugly. It may have a large switch statement that picks which product class to instantiate. But don’t worry, we’ll fix it soon enough.

4. Now, create a set of creator subclasses for each type of product listed in the factory method. Override the factory method in the subclasses and extract the appropriate bits of construction code from the base method.

5. If there are too many product types and it doesn’t make sense to create subclasses for all of them, you can reuse the control parameter from the base class in subclasses.

   For instance, imagine that you have the following hierarchy of classes: the base Mail class with a couple of subclasses: AirMail and GroundMail; the Transport classes are Plane, Truck and Train. While the AirMail class only uses Plane objects, GroundMail may work with both Truck and Train objects. You can create a new subclass (say TrainMail) to handle both cases, but there’s another option. The client code can pass an argument to the factory method of the GroundMail class to control which product it wants to receive.

6. If, after all of the extractions, the base factory method has become empty, you can make it abstract. If there’s something left, you can make it a default behavior of the method.

> ## Pros
>
> - You avoid tight coupling between the creator and the concrete products.
> - Single Responsibility Principle. You can move the product creation code into one place in the program, making the code easier to support.
> - Open/Closed Principle. You can introduce new types of products into the program without breaking existing client code.

> ## Cons
>
> - The code may become more complicated since you need to introduce a lot of new subclasses to implement the pattern. The best case scenario is when you’re introducing the pattern into an existing hierarchy of creator classes.

---

# Abstract Factories

## Abstract Factory is a creational design pattern, which solves the problem of creating entire product families without specifying their concrete classes.

Abstract Factory defines an interface for creating all distinct products but leaves the actual product creation to concrete factory classes. Each factory type corresponds to a certain product variety.

The client code calls the creation methods of a factory object instead of creating products directly with a constructor call (new operator). Since a factory corresponds to a single product variant, all its products will be compatible.

Client code works with factories and products only through their abstract interfaces. This lets the client code work with any product variants, created by the factory object. You just create a new concrete factory class and pass it to the client code.

---

<b>Usage Examples:</b> The Abstract Factory pattern is pretty common in TypeScript code. Many frameworks and libraries use it to provide a way to extend and customize their standard components.

<b>Identification:</b> The pattern is easy to recognize by methods, which return a factory object. Then, the factory is used for creating specific sub-components.

# PRoblems to solve

> Use the Abstract Factory when your code needs to work with various families of related products, but you don’t want it to depend on the concrete classes of those products—they might be unknown beforehand or you simply want to allow for future extensibility.
>
> - The Abstract Factory provides you with an interface for creating objects from each class of the product family. As long as your code creates objects via this interface, you don’t have to worry about creating the wrong variant of a product which doesn’t match the products already created by your app.
> - Consider implementing the Abstract Factory when you have a class with a set of Factory Methods that blur its primary responsibility.
> - In a well-designed program each class is responsible only for one thing. When a class deals with multiple product types, it may be worth extracting its factory methods into a stand-alone factory class or a full-blown Abstract Factory implementation.

# How to implement

This example (./AbstractFactory.ts) illustrates the structure of the Abstract Factory design pattern. It focuses on answering these questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![AbstractFactory](./AbstractFactory.png)

1. Map out a matrix of distinct product types versus variants of these products.

2. Declare abstract product interfaces for all product types. Then make all concrete product classes implement these interfaces.

3. Declare the abstract factory interface with a set of creation methods for all abstract products.

4. Implement a set of concrete factory classes, one for each product variant.

5. Create factory initialization code somewhere in the app. It should instantiate one of the concrete factory classes, depending on the application configuration or the current environment. Pass this factory object to all classes that construct products.

6. Scan through the code and find all direct calls to product constructors. Replace them with calls to the appropriate creation method on the factory object.

> ## Pros
>
> - You can be sure that the products you’re getting from a factory are compatible with each other.
> - You avoid tight coupling between concrete products and client code.
> - Single Responsibility Principle. You can extract the product creation code into one place, making the code easier to support.
> - Open/Closed Principle. You can introduce new variants of products without breaking existing client code.

> # Cons
>
> - The code may become more complicated than it should be, since a lot of new interfaces and classes are introduced along with the pattern.
