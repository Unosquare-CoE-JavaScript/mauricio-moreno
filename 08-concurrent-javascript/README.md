# Web workers

There are some additional rules when it comes to loading adedicated worker script file.
The file that is loaded must bein the same origin that the main JavaScript environment
isrunning in.

Also, browsers won’t allow you to run dedicatedworkers when JavaScript runs using the
file:// protocol,which is a fancy way of saying you can’t simply double-clickthe index
html file and view the application running.
