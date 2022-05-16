# Composite

## Composite is a structural design pattern that allows composing objects into a tree-like structure and work with the it as if it was a singular object.Composite es un patrón de diseño estructural que permite componer objetos en una estructura en forma de árbol y trabajar con ella como si fuera un objeto único.

Composite became a pretty popular solution for the most problems that require building a tree structure. Composite’s great feature is the ability to run methods recursively over the whole tree structure and sum up the results.

El patrón Composite se convirtió en una solución muy popular para la mayoría de problemas que requieren la creación de una estructura de árbol. La gran característica del Composite es la capacidad para ejecutar métodos de forma recursiva por toda la estructura de árbol y recapitular los resultados.

---

<b>Usage Example:</b> The Composite pattern is pretty common in TypeScript code. It’s often used to represent hierarchies of user interface components or the code that works with graphs

<b>Identification:</b> If you have an object tree, and each object of a tree is a part of the same class hierarchy, this is most likely a composite. If methods of these classes delegate the work to child objects of the tree and do it via the base class/interface of the hierarchy, this is definitely a composite.

# Problems to solve

> Use the Composite pattern when you have to implement a tree-like object structure.
>
> - The Composite pattern provides you with two basic element types that share a common interface: simple leaves and complex containers. A container can be composed of both leaves and other containers. This lets you construct a nested recursive object structure that resembles a tree.

> Use the pattern when you want the client code to treat both simple and complex elements uniformly.
>
> - All elements defined by the Composite pattern share a common interface. Using this interface, the client doesn’t have to worry about the concrete class of the objects it works with.

# How to implement

This example illustrates the structure of the Composite design pattern and focuses on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Composite](./Composite.png)

1. Make sure that the core model of your app can be represented as a tree structure. Try to break it down into simple elements and containers. Remember that containers must be able to contain both simple elements and other containers.

2. Declare the component interface with a list of methods that make sense for both simple and complex components.

3. Create a leaf class to represent simple elements. A program may have multiple different leaf classes.

4. Create a container class to represent complex elements. In this class, provide an array field for storing references to sub-elements. The array must be able to store both leaves and containers, so make sure it’s declared with the component interface type.

While implementing the methods of the component interface, remember that a container is supposed to be delegating most of the work to sub-elements.

5. Finally, define the methods for adding and removal of child elements in the container.

Keep in mind that these operations can be declared in the component interface. This would violate the Interface Segregation Principle because the methods will be empty in the leaf class. However, the client will be able to treat all the elements equally, even when composing the tree.

> # Pros
>
> - You can work with complex tree structures more conveniently: use polymorphism and recursion to your advantage.
> - Open/Closed Principle. You can introduce new element types into the app without breaking the existing code, which now works with the object tree.

> # Cons
>
> - It might be difficult to provide a common interface for classes whose functionality differs too much. In certain scenarios, you’d need to overgeneralize the component interface, making it harder to comprehend.
