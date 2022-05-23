# Command

## Command is behavioral design pattern that converts requests or simple operations into objects.

The conversion allows deferred or remote execution of commands, storing command
history, etc.

---

**Usage Examples** The Command pattern is pretty common in TypeScript code. Most
often it’s used as an alternative for callbacks to parameterizing UI elements
with actions. It’s also used for queueing tasks, tracking operations history, etc.

**Identification** The Command pattern is recognizable by behavioral methods in
an abstract/interface type (sender) which invokes a method in an implementation
of a different abstract/interface type (receiver) which has been encapsulated by
the command implementation during its creation. Command classes are usually
limited to specific actions.

# Problems to solve

> Use the Command pattern when you want to parametrize objects with operations.
>
> - The Command pattern can turn a specific method call into a stand-alone
object. This change opens up a lot of interesting uses: you can pass commands as
method arguments, store them inside other objects, switch linked commands at
runtime, etc.
>   Here’s an example: you’re developing a GUI component such as a context menu,
and you want your users to be able to configure menu items that trigger
operations when an end user clicks an item.

> Use the Command pattern when you want to queue operations, schedule their
execution, or execute them remotely.
>
> - As with any other object, a command can be serialized, which means converting
it to a string that can be easily written to a file or a database. Later, the
string can be restored as the initial command object. Thus, you can delay and
schedule command execution. But there’s even more! In the same way, you can
queue, log or send commands over the network.

> Use the Command pattern when you want to implement reversible operations.
>
> - Although there are many ways to implement undo/redo, the Command pattern is
perhaps the most popular of all.
>   To be able to revert operations, you need to implement the history of
performed operations. The command history is a stack that contains all executed
command objects along with related backups of the application’s state.
>   This method has two drawbacks. First, it isn’t that easy to save an
application’s state because some of it can be private. This problem can be
mitigated with the Memento pattern.
>   Second, the state backups may consume quite a lot of RAM. Therefore,
sometimes you can resort to an alternative implementation: instead of restoring
the past state, the command performs the inverse operation. The reverse operation
also has a price: it may turn out to be hard or even impossible to implement.

# How to implement

This example illustrates the structure of the Command design pattern and focuses
on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Command](./Command.png)

1. Declare the command interface with a single execution method.

2. Start extracting requests into concrete command classes that implement the
command interface. Each class must have a set of fields for storing the request
arguments along with a reference to the actual receiver object. All these values
must be initialized via the command’s constructor.

3. Identify classes that will act as senders. Add the fields for storing commands
into these classes. Senders should communicate with their commands only via the
command interface. Senders usually don’t create command objects on their own, but
rather get them from the client code.

4. Change the senders so they execute the command instead of sending a request to
the receiver directly.

5. The client should initialize objects in the following order:

   - Create receivers.

   * Create commands, and associate them with receivers if needed.
   * Create senders, and associate them with specific commands.

> # Pros
>
> - Single Responsibility Principle. You can decouple classes that invoke
operations from classes that perform these operations.
> - Open/Closed Principle. You can introduce new commands into the app without
breaking existing client code.
> - You can implement undo/redo.
> - You can implement deferred execution of operations.
> - You can assemble a set of simple commands into a complex one.

> # Cons
>
> - The code may become more complicated since you’re introducing a whole new
layer between senders and receivers.
