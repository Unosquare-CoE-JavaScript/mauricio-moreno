# Bridge

## Bridge is a structural design pattern that divides business logic or huge class into separate class hierarchies that can be developed independently.

One of these hierarchies (often called the Abstraction) will get a reference to an object
of the second hierarchy (Implementation). The abstraction will be able to delegate some
(sometimes, most) of its calls to the implementations object. Since all implementations
will have a common interface, they’d be interchangeable inside the abstraction.

---

<b>Usage examples:</b> The Bridge pattern is especially useful when dealing with
cross-platform apps, supporting multiple types of database servers or working with several
API providers of a certain kind (for example, cloud platforms, social networks, etc.)

<b>Identification:</b> Bridge can be recognized by a clear distinction between some
controlling entity and several different platforms that it relies on.

# Problems to solve

> Use the Bridge pattern when you want to divide and organize a monolithic class that has
> several variants of some functionality (for example, if the class can work with various
> database servers).
>
> - The bigger a class becomes, the harder it is to figure out how it works, and the
>   longer it takes to make a change. The changes made to one of the variations of
>   functionality may require making changes across the whole class, which often results in
>   making errors or not addressing some critical side effects.

> Use the pattern when you need to extend a class in several orthogonal (independent)
> dimensions.
>
> - The Bridge suggests that you extract a separate class hierarchy for each of the
>   dimensions. The original class delegates the related work to the objects belonging to
>   those hierarchies instead of doing everything on its own.

> Use the Bridge if you need to be able to switch implementations at runtime.
>
> - Although it’s optional, the Bridge pattern lets you replace the implementation object
>   inside the abstraction. It’s as easy as assigning a new value to a field.

# How to Implement

This example illustrates the structure of the Bridge design pattern and focuses on the
following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Bridge](./Bridge.png)

1. Identify the orthogonal dimensions in your classes. These independent concepts could
   be: abstraction/platform, domain/infrastructure, front-end/back-end, or interface
   implementation.

2. See what operations the client needs and define them in the base abstraction class.

3. Determine the operations available on all platforms. Declare the ones that the
   abstraction needs in the general implementation interface.

4. For all platforms in your domain create concrete implementation classes, but make sure
   they all follow the implementation interface.

5. Inside the abstraction class, add a reference field for the implementation type. The
   abstraction delegates most of the work to the implementation object that’s referenced in
   that field.

6. If you have several variants of high-level logic, create refined abstractions for each
   variant by extending the base abstraction class.

7. The client code should pass an implementation object to the abstraction’s constructor
   to associate one with the other. After that, the client can forget about the
   implementation and work only with the abstraction object.

> # Pros
>
> - You can create platform-independent classes and apps.
> - The client code works with high-level abstractions. It isn’t exposed to the platform
>   details.
> - Open/Closed Principle. You can introduce new abstractions and implementations
>   independently from each other.
> - Single Responsibility Principle. You can focus on high-level logic in the abstraction
>   and on platform details in the implementation.

> # Cons
>
> - You might make the code more complicated by applying the pattern to a highly cohesive
>   class.
