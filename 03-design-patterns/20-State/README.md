# State

## State is a behavioral design pattern that allows an object to change the behavior when its internal state changes.

The pattern extracts state-related behaviors into separate state classes and forces the original object to delegate the work to an instance of these classes, instead of acting on its own.

---

**_Usage examples_** The State pattern is commonly used in TypeScript to convert massive switch-base state machines into the objects.

**_Identification_** State pattern can be recognized by methods that change their behavior depending on the objects’ state, controlled externally.

# Problems to solve

> Use the State pattern when you have an object that behaves differently depending on its current state, the number of states is enormous, and the state-specific code changes frequently.
>
> - The pattern suggests that you extract all state-specific code into a set of distinct classes. As a result, you can add new states or change existing ones independently of each other, reducing the maintenance cost.

> Use the pattern when you have a class polluted with massive conditionals that alter how the class behaves according to the current values of the class’s fields.
>
> - The State pattern lets you extract branches of these conditionals into methods of corresponding state classes. While doing so, you can also clean temporary fields and helper methods involved in state-specific code out of your main class.

> Use State when you have a lot of duplicate code across similar states and transitions of a condition-based state machine.
>
> - The State pattern lets you compose hierarchies of state classes and reduce duplication by extracting common code into abstract base classes.

# Real World analogy

The buttons and switches in your smartphone behave differently depending on the current state of the device:

- When the phone is unlocked, pressing buttons leads to executing various functions.
- When the phone is locked, pressing any button leads to the unlock screen.
- When the phone’s charge is low, pressing any button shows the charging screen.

# How to implement

This example illustrates the structure of the State design pattern and focuses on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![State](./State.png)

1. Decide what class will act as the context. It could be an existing class which already has the state-dependent code; or a new class, if the state-specific code is distributed across multiple classes.

2. Declare the state interface. Although it may mirror all the methods declared in the context, aim only for those that may contain state-specific behavior.

3. For every actual state, create a class that derives from the state interface. Then go over the methods of the context and extract all code related to that state into your newly created class.

   While moving the code to the state class, you might discover that it depends on private members of the context. There are several workarounds:

   - Make these fields or methods public
   - Turn the behavior you’re extracting into a public method in the context and call it from the state class. This way is ugly but quick, and you can always fix it later.
   - Nest the state classes into the context class, but only if your programming language supports nesting classes.

4. In the context class, add a reference field of the state interface type and a public setter that allows overriding the value of that field.

5. Go over the method of the context again and replace empty state conditionals with calls to corresponding methods of the state object.

6. To switch the state of the context, create an instance of one of the state classes and pass it to the context. You can do this within the context itself, or in various states, or in the client. Wherever this is done, the class becomes dependent on the concrete state class that it instantiates.

> # Pros
>
> - Single Responsibility Principle. Organize the code related to particular states into separate classes.
> - Open/Closed Principle. Introduce new states without changing existing state classes or the context.
> - Simplify the code of the context by eliminating bulky state machine conditionals.

> # Cons
>
> - Applying the pattern can be overkill if a state machine has only a few states or rarely changes.
