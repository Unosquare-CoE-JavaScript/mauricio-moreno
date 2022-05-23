# Template Method

## Template Method is a behavioral design pattern that allows you to defines a skeleton of an algorithm in a base class and let subclasses override the steps without changing the overall algorithm’s structure.

---

**_Usage Examples:_** The Template Method pattern is quite common in TypeScript
frameworks. Developers often use it to provide framework users with a simple means of
extending standard functionality using inheritance.

**_Identification_** Template Method can be recognized by behavioral methods that already
have a “default” behavior defined by the base class.

# PRoblems to solve

> Use the Template Method pattern when you want to let clients extend only particular
> steps of an algorithm, but not the whole algorithm or its structure.
>
> - The Template Method lets you turn a monolithic algorithm into a series of individual
>   steps which can be easily extended by subclasses while keeping intact the structure
>   defined in a superclass.

> Use the pattern when you have several classes that contain almost identical algorithms
> with some minor differences. As a result, you might need to modify all classes when the
> algorithm changes.
>
> - When you turn such an algorithm into a template method, you can also pull up the steps
>   with similar implementations into a superclass, eliminating code duplication. Code that
>   varies between subclasses can remain in subclasses.

# Real World Analogy

The template method approach can be used in mass housing construction. The architectural
plan for building a standard house may contain several extension points that would let a
potential owner adjust some details of the resulting house.

Each building step, such as laying the foundation, framing, building walls, installing
plumbing and wiring for water and electricity, etc., can be slightly changed to make the
resulting house a little bit different from others.

# How to implement

This example illustrates the structure of the Template Method design pattern and focuses
on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![TemplateMEthod](./TemplateMethod.png)

1. Analyze the target algorithm to see whether you can break it into steps. Consider which
   steps are common to all subclasses and which ones will always be unique.

2. Create the abstract base class and declare the template method and a set of abstract
   methods representing the algorithm’s steps. Outline the algorithm’s structure in the
   template method by executing corresponding steps. Consider making the template method
   final to prevent subclasses from overriding it.

3. It’s okay if all the steps end up being abstract. However, some steps might benefit
   from having a default implementation. Subclasses don’t have to implement those methods.

4. Think of adding hooks between the crucial steps of the algorithm.

5. For each variation of the algorithm, create a new concrete subclass. It must implement
   all of the abstract steps, but may also override some of the optional ones.

> # Pros
>
> - You can let clients override only certain parts of a large algorithm, making them less
>   affected by changes that happen to other parts of the algorithm.
> - You can pull the duplicate code into a superclass.

> # Cons
>
> - Some clients may be limited by the provided skeleton of an algorithm.
> - You might violate the Liskov Substitution Principle by suppressing a default step
>   implementation via a subclass.
> - Template methods tend to be harder to maintain the more steps they have.
