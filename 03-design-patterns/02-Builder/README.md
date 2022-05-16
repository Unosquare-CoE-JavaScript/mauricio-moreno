# Builder

## Builder is a creational design pattern, which allows constructing complex objects step by step.

Unlike other creational patterns, Builder doesn’t require products to have a common interface. That makes it possible to produce different products using the same construction process.

---

<b>Usage Examples:</b> The Builder pattern is a well-known pattern in TypeScript world. It’s especially useful when you need to create an object with lots of possible configuration options.

<b>Identification:</b> The Builder pattern can be recognized in a class, which has a single creation method and several methods to configure the resulting object. Builder methods often support chaining (for example, someBuilder.setValueA(1).setValueB(2).create()).

# Problems to solve

> Use the Builder pattern to get rid of a “telescopic constructor”.
>
> - Say you have a constructor with ten optional parameters. Calling such a beast is very inconvenient; therefore, you overload the constructor and create several shorter versions with fewer parameters. These constructors still refer to the main one, passing some default values into any omitted parameters.

```ts
class Pizza {
    Pizza(size: number) { ... }
    Pizza(size: number, cheese): boolean { ... }
    Pizza(size: number, cheese: boolean, pepperoni: boolean) { ... }
```

The Builder pattern lets you build objects step by step, using only those steps that you really need. After implementing the pattern, you don’t have to cram dozens of parameters into your constructors anymore.

> Use the Builder pattern when you want your code to be able to create different representations of some product (for example, stone and wooden houses).
>
> - The Builder pattern can be applied when construction of various representations of the product involves similar steps that differ only in the details.
>   The base builder interface defines all possible construction steps, and concrete builders implement these steps to construct particular representations of the product. Meanwhile, the director class guides the order of construction.

> Use the Builder to construct Composite trees or other complex objects.
>
> - The Builder pattern lets you construct products step-by-step. You could defer execution of some steps without breaking the final product. You can even call steps recursively, which comes in handy when you need to build an object tree.
>   A builder doesn’t expose the unfinished product while running construction steps. This prevents the client code from fetching an incomplete result.

# How To Implement

This example (./Builder.ts) illustrates the structure of the Builder design pattern and focuses on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Builder](./Builder.png)

1. Make sure that you can clearly define the common construction steps for building all available product representations. Otherwise, you won’t be able to proceed with implementing the pattern.

2. Declare these steps in the base builder interface.

3. Create a concrete builder class for each of the product representations and implement their construction steps.

   Don’t forget about implementing a method for fetching the result of the construction. The reason why this method can’t be declared inside the builder interface is that various builders may construct products that don’t have a common interface. Therefore, you don’t know what would be the return type for such a method. However, if you’re dealing with products from a single hierarchy, the fetching method can be safely added to the base interface.

4. Think about creating a director class. It may encapsulate various ways to construct a product using the same builder object.

5. The client code creates both the builder and the director objects. Before construction starts, the client must pass a builder object to the director. Usually, the client does this only once, via parameters of the director’s class constructor. The director uses the builder object in all further construction. There’s an alternative approach, where the builder is passed to a specific product construction method of the director.

6. The construction result can be obtained directly from the director only if all products follow the same interface. Otherwise, the client should fetch the result from the builder.

> ## Pros
>
> - You can construct objects step-by-step, defer construction steps or run steps recursively.
> - You can reuse the same construction code when building various representations of products.
> - Single Responsibility Principle. You can isolate complex construction code from the business logic of the product.
