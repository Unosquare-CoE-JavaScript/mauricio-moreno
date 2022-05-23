# Observer

## Observer is a behavioral design pattern that allows some objects to notify other objects about changes in their state.

The Observer pattern provides a way to subscribe and unsubscribe to and from these events
for any object that implements a subscriber interface.

---

**_Usage examples_**: The Observer pattern is pretty common in TypeScript code, especially
in the GUI components. It provides a way to react to events happening in other objects
without coupling to their classes.

**_Identification:_** The pattern can be recognized by subscription methods, that store
objects in a list and by calls to the update method issued to objects in that list.

# Problems to solve

> Use the Observer pattern when changes to the state of one object may require
changingother objects, and the actual set of objects is unknown beforehand or changes
dynamically.
>
> - You can often experience this problem when working with classes of the graphical user
interface. For example, you created custom button classes, and you want to let the clients
hook some custom code to your buttons so that it fires whenever a user presses a button.
>   The Observer pattern lets any object that implements the subscriber interface
subscribe for event notifications in publisher objects. You can add the subscription
mechanism to your buttons, letting the clients hook up their custom code via custom
subscriber classes.

> Use the pattern when some objects in your app must observe others, but only for a
limited time or in specific cases.
>
> - The subscription list is dynamic, so subscribers can join or leave the list whenever
they need to.

# Real World Analogy

If you subscribe to a newspaper or magazine, you no longer need to go to the store to
check if the next issue is available. Instead, the publisher sends new issues directly to
your mailbox right after publication or even in advance.

The publisher maintains a list of subscribers and knows which magazines they’re interested
in. Subscribers can leave the list at any time when they wish to stop the publisher
sending new magazine issues to them.

# How to implement

This example illustrates the structure of the Observer design pattern and focuses on the
following questions:

- What classes does it consist of?
- What roles do these classes play?
- In what way the elements of the pattern are related?

![Observer](./Observer.png)

1. Look over your business logic and try to break it down into two parts: the core
functionality, independent from other code, will act as the publisher; the rest will turn
into a set of subscriber classes.

2. Declare the subscriber interface. At a bare minimum, it should declare a single update
method.

3. Declare the publisher interface and describe a pair of methods for adding a subscriber
object to and removing it from the list. Remember that publishers must work with
subscribers only via the subscriber interface.

4. Decide where to put the actual subscription list and the implementation of subscription
methods. Usually, this code looks the same for all types of publishers, so the obvious
place to put it is in an abstract class derived directly from the publisher interface.
Concrete publishers extend that class, inheriting the subscription behavior.

   However, if you’re applying the pattern to an existing class hierarchy, consider an approach based on composition: put the subscription logic into a separate object, and make all real publishers use it.

5. Create concrete publisher classes. Each time something important happens inside a
publisher, it must notify all its subscribers.

6. Implement the update notification methods in concrete subscriber classes. Most subscribers would need some context data about the event. It can be passed as an argument of the notification method.

   But there’s another option. Upon receiving a notification, the subscriber can fetch any data directly from the notification. In this case, the publisher must pass itself via the update method. The less flexible option is to link a publisher to the subscriber permanently via the constructor.

7. The client must create all necessary subscribers and register them with proper publishers.

> # Pros
>
> - Open/Closed Principle. You can introduce new subscriber classes without having to change the publisher’s code (and vice versa if there’s a publisher interface).
> - You can establish relations between objects at runtime.

> # Cons
>
> - Subscribers are notified in random order.
