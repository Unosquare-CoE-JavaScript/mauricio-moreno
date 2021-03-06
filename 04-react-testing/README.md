# Testing library queries

With testing library when you want to test an element, you need to select it
searching for things visible to the user, things like a text a color, accesibility
elements like tags, arias etc. Not Ids classes or metadata in general

If you need to know what role you need to implement you can visit the site
https://www.w3.org/TR/wai-aria/#role_definitions

## Important

> > Each tag has predifined role, but you can change it to make your page more
> > accessible

## Test structure

Every implementation of a test file will have at least this 2 global functions

- test: will give the test a name, and executes a function that if there is an error
  the specified test will not run, if nothing happens the test will success
- expect: Will receive in this case a jsx component or function
  after that you can invoque some functions at the end wit its specific options
  and behaviors, if that function throws an error the test will fail

Also it can have some of these

- describe: It can group some tests to more readability

Queries: To get dom elements we can use the scrren.getBy method

## Styles testing

When you are working with tests you can only check for js-styles, if you have classes
and after that the styles are applied importing sass or css module into the code
you need to use another tools called transformers

https://www.npmjs.com/package/jest-transform-css
https://www.npmjs.com/package/jest-cass-modules-transform

## Linters vs formatters

Linter: analyzes static text and marks syntax that breaks rules
Static: anayze code as written, not what happens when the code is run

Lints help to make the code appearance consistent

- Formatters automaticale format code idents spacing

ESLint has some plugins, that help you to always have the best practices in your code
you can visit these websites for more information:

https://github.com/testing-library/eslint-plugin-testing-library
https://github.com/testing-library/eslint-plugin-jest-dom

preferred rules and plugins:
https://github.com/bonnie/bonniedotdev/blob/master/client/.eslintrc.json

## Configuring ESLINT

At this moment 10/5/2022 the only thing that you need to add to te settings.json in
the .vscode file (or also in the >\settings.json file of vscode) is:

...
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
}

# Query Methods

We use the screen object to select DOM elements

We can divide the queries Commands in these categories

## Command

- get: Expect element to be in DOM
- query: Expect element not to be in DOM
- find: expect elements to appear async

## All

- (exclude) expect only one match
- (include) expect more than one match

## Query type

- Role
- AltText(images)
- Text
- Form elements (placeholderText, label text, display value=

### Some resources

https://testing-library.com/docs/dom-testing-library/api-queries
https://testing-library.com/docs/dom-testing-library/cheatsheet
https://testing-library.com/docs/guide-which-query

https://testing-library.com/docs/guide-which-query/

# not wrapped in act (...) warning

- React updated element after test was finished
- Dont want to follow the advice to wrap in act(...)

testingLibrary already does this for us!
https://testing-library.com/docs/preact-testing-library/api#act

# Mock Service Worker (Read the documentation)

Purposes:

- intercept network calls
- return specified responses
- Prevents network calls during tests
- Set up test conditions using server response

## Mock service worker setup

npm install msw
create handlers
create test server
make sure test server listens during all tests

> reset after each test

## mock structure

The structure of a test using msw will look like this

```js
rest.get('http://localhost:3030/scoops', (req, res, ctx) => {});
```

where
rest = the type of handler used (graphql|rest)
get = http method
params:
string = url
callback = the function returned after the call
req: request object
res: function to create response
ctx: utility to build response
more details
https://mswjs.io/docs/basics/response-solver

# Asyncronous code

When you are waiting for something to appear asynchronously on the page,
you must use awat or 'findBy'

Sometimes also the code will return all the elements the in the first flow of data
returning only one element and don't waiting for more data for that cases you
need to use the method 'waitFor'

# Errors from server

when you mock errors from the server you need to override the server callings in your test
using the server.resetHandlers method

# Review of "Scoops" Testing, testing connections

In order to test the fetching process of data you need to

- Create a handler
- Create a server
- update setupTests to listen to requests

- getAllByRole: This search for all data asyncrounosly because of the use of getby

- await allways use -> findBy

# Debugging

You can skip or run only one kind or group of tests

- The first way is to click 'p' in the terminal when the tests are running and write
  the regex name of the files you want to run
- you can skipe or run only tests

```js
test.only('blabla',() => {...})
test.skip('blabla',() => {...})
```

you can use also screen.debug() that shows you how the DOM looks like at some point
of your code

# Testear componentes dentro de un provider de data

Para testear un componente dentro de un provider de data simplemente renderiza el
objeto que buscas usando el un objeto de configuration and import the provider
inside it like this

```jsx
render(<Component />, { wrapper: DataProvider });
```

## Default providers to render

You can create a file called testing-library-utils.jsx and add and overwrite the functions
of the library and instead of import content from the library you can import the functions
from this file it would look something like this

```jsx
import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../context/OrderDetails';

const renderWithContext = (ui, options) =>
	render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything

export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
```

# Errors cheatsheet

> ## Unable to find role="role"
>
> Either role doesn't exist or no element with that role that also matches name option

> ## Warning: An update to component inside a test was not wrapped in act(...)
>
> There was an update to the component after the test completed. Use await or findBy

> ## Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
>
> there was an update to the components state after the test completed. Use await or findby

> ## Error: connect ECONNREFUSED 127.0.0.1
>
> There is no Mock Service Worker handler associated with this route and method

# Questions to make when creating a test

- What to render?
- What's the smallest component that encompases tests?
- Do we need to pass any props?
- Do we need to wrap in a provider
- Does the provider get used? it is already wrapped within the component
- Where should the tests go?
- Which file New file needed?
- What to test?
- What's the actual behavior
- How to test?
- Do we need to await? Is there anything async going on?
