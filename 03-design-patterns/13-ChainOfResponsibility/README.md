# Chain of responsibility

## Chain of Responsibility is behavioral design pattern that allows passing request along the chain of potential handlers until one of them handles request.

The pattern allows multiple objects to handle the request without coupling sender
class to the concrete classes of the receivers. The chain can be composed
dynamically at runtime with any handler that follows a standard handler interface.

---

**Usage examples:** The Chain of Responsibility pattern isn’t a frequent guest in
a TypeScript program since it’s only relevant when code operates with chains of
objects.

**Identification:** The pattern is recognizable by behavioral methods of one
group of objects that indirectly call the same methods in other objects, while
all the objects follow the common interface.

# Problems to solve

> Use the Chain of Responsibility pattern when your program is expected to
process different kinds of requests in various ways, but the exact types of
requests and their sequences are unknown beforehand.
>
> - The pattern lets you link several handlers into one chain and, upon receiving
a request, “ask” each handler whether it can process it. This way all handlers
get a chance to process the request.

> Use the pattern when it’s essential to execute several handlers in a particular
order.
>
> - Since you can link the handlers in the chain in any order, all requests will
get through the chain exactly as you planned.

> Use the CoR pattern when the set of handlers and their order are supposed to
change at runtime.
>
> - If you provide setters for a reference field inside the handler classes,
you’ll be able to insert, remove or reorder handlers dynamically.

# Real world analogy

You’ve just bought and installed a new piece of hardware on your computer. Since
you’re a geek, the computer has several operating systems installed. You try to
boot all of them to see whether the hardware is supported. Windows detects and
enables the hardware automatically. However, your beloved Linux refuses to work
with the new hardware. With a small flicker of hope, you decide to call the
tech-support phone number written on the box.

The first thing you hear is the robotic voice of the autoresponder. It suggests
nine popular solutions to various problems, none of which are relevant to your
case. After a while, the robot connects you to a live operator.

Alas, the operator isn’t able to suggest anything specific either. He keeps
quoting lengthy excerpts from the manual, refusing to listen to your comments.
After hearing the phrase “have you tried turning the computer off and on again?”
for the 10th time, you demand to be connected to a proper engineer.

Eventually, the operator passes your call to one of the engineers, who had
probably longed for a live human chat for hours as he sat in his lonely server
room in the dark basement of some office building. The engineer tells you where
to download proper drivers for your new hardware and how to install them on
Linux. Finally, the solution! You end the call, bursting with joy.

# How to implement

This example illustrates the structure of the Chain of Responsibility design pattern and focuses on the following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![ChainOfResponsibility](./ChainOfResponsibility.png)

1. Declare the handler interface and describe the signature of a method for
handling requests.

   Decide how the client will pass the request data into the method. The most
   flexible way is to convert the request into an object and pass it to the
   handling method as an argument.

2. To eliminate duplicate boilerplate code in concrete handlers, it might be
worth creating an abstract base handler class, derived from the handler interface.

   This class should have a field for storing a reference to the next handler in
   the chain. Consider making the class immutable. However, if you plan to modify
   chains at runtime, you need to define a setter for altering the value of the
   reference field.

   You can also implement the convenient default behavior for the handling
   method, which is to forward the request to the next object unless there’s none
   left. Concrete handlers will be able to use this behavior by calling the
   parent method.

3. One by one create concrete handler subclasses and implement their handling
methods. Each handler should make two decisions when receiving a request:

   - Whether it’ll process the request.
   - Whether it’ll pass the request along the chain.

4. The client may either assemble chains on its own or receive pre-built chains
from other objects. In the latter case, you must implement some factory classes
to build chains according to the configuration or environment settings.

5. The client may trigger any handler in the chain, not just the first one. The
request will be passed along the chain until some handler refuses to pass it
further or until it reaches the end of the chain.

6. Due to the dynamic nature of the chain, the client should be ready to handle
the following scenarios:

   - The chain may consist of a single link.
   - Some requests may not reach the end of the chain.
   - Others may reach the end of the chain unhandled.

> # Pros
>
> - You can control the order of request handling.
> - Single Responsibility Principle. You can decouple classes that invoke
operations from classes that perform operations.
> - Open/Closed Principle. You can introduce new handlers into the app without
breaking the existing client code.

> # Cons
>
> - Some requests may end up unhandled.
