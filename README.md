# Frontend Quiz

Design, assets, and requirements provided by [FrontEndMentors](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU)

The project goal is to create a fucntional quiz application that can be completed from beginning to end, with the final results displayed upon quiz completion. The appliction should allow users to select between different choices, restart the test when completed, and implement a responsive design so that users on any device can comfortably take the quiz. The requirements also called for implementing key-board navigation for accessibility purposes and providing a light and dark theme.

This `README.md` will dicuss the technology used, the challenges faced, and my thought process while developing this web application. Feel free to access a [live version of the application here].

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Development](#development)
  - [Project Config](#project-config)
  - [React Router](#react-router)
  - [Styling](#styling)
  - [Testing](#testing)
  - [Other](#other)

## Technologies Used

This application was bootstrapped with [Vite](https://vitejs.dev/guide/) using the the React/Typescript template. This project is linted and formatted with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Please see the `eslintrc.cjs` and `.prettierrc` for the rules implemented.

The application was built wiht the following technology:

- [React](https://reactjs.org/), library/framework for building user interfaces.
- [Typescript](https://www.typescriptlang.org/), a superset of Javascript that adds static typing.
- [Cypress](https://www.cypress.io/), an end-to-end testing framework.
- [CSS Modules](https://github.com/css-modules/css-modules)

Libraries used include [react-router](https://reactrouter.com/en/main) to provide routing, and [Vitest](https://vitest.dev/) for component/unit testing. Both of which will be discussed later in this markdown file.

## Installation

Please follow the instructions below to install and run the application locally:

1. Clone the repository to your machine with the command `git clone https://github.com/JorgeAMendoza/frontend-quiz-app.git`.
2. `cd` into the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the development server.
5. Open `localhost:3000` in your browser to view the application.

To run intergration test, either run `npm run cypress:open` to open the Cypress UI, or `npm run cypress:run` to run the tests in the terminal. Unit test can be run with `npm test`.

## Development

This section will discuss the challenges faced during development and my solutions to them, diving into the decisions for using certain technologies and how I used each one in relation to the project requiremets.

### React Router

When first planning out the structure of the application, the original idea was develop a simple single-page application. Create a set of state variables like the current question, amount of questions left, questions answered, etc...

When I make user-interfaces, I focus on two atttributes:

- How can I make this UI fun and interesting to use?
- How can I make the UI accessible and easy to use?

I believe I was restricting myself from what I wanted to do just making the usual React application. This is why I decided to expand the application capabilities by providing routing through **react-router**.

#### What React Router Provided

For one, I wanted to review **react-router** and improve my skills using it, but using the library allowed me to implement some features that I believe enhanced the user-experience which includes:

1. Allowing users to see test status through the URL
2. Make it easier to handle page a page refresh and persist user data

**react-router** allowed me to better organize my application, provide data between applications, and handle errors more efficiently.

#### React Router Config

In [router.tsx](/src/routes/config/router.tsx), the following configuration can be found:

```ts
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: <TestError />,
    children: [
      {
        path: '/:test',
        errorElement: <TestError />,
        loader: testLoader,
        element: <Test />,
        children: [
          {
            path: 'question/:questionNumber',
            element: <TestQuestion />,
          },
          {
            path: 'result',
            element: <Results />,
          },
        ],
      },
    ],
  },
])
```

Test types are defined as a `:test` and the questions and current question the user is on is marked as `question/:questionNumber`. Each path will have a general `TestError` rendered when there are path errors or something goes wrong within the component itself (explained later).

#### `Root` Route

The [Root route](/src/routes/root/Root.tsx) is where the user selects which test they wish to take. An option will navigate them to the `:test` route with the question. The `Theme` component exists here as well, but that will be discussed in its own section.

If you refer back to the `router.tsx` file, you'll note the [rootLoader](/src/routes/root/loader.ts) is ran and its result is returned to the `Root` route. Instead of hardcoding the test information into the application itself, the [JSON file `data.json`](/src/assets/data.json) contains the test information. so within `rootLoader`, the test names are extracted from the `data.json` file and are used to render the test choices and generate the test routes as well.

Since the theme toggle and the test name need to stay on the page at all times, when a user navigates to a test, the `Outlet` component is rendered, which renders the route, while keeping the test name and theme toggle on the page.

#### `Test` Route

When a user clicks a test, for example `HTML`, they would be navigated to the `/html` route, which would render the [Test.tsx component](/src/routes/Test/Test.tsx). The [testLoader](/src/routes/Test/loader.ts) function defined in the config takes in the test name from the path, finds the set of the question with that test name, and returns all the questions to be rendered for the test.

With this test data, we extract it from the loader using `useLoaderData`, and pass it into the `TestDataContextProvder`.

##### `TestDataContextProvider` and useReducer

Earlier when I discussed page refresh, a component was going to be needed that kept track of current test status and provided that data to components rendered within. This led me to implement a React context in the [test-data-context.tsx](/src/routes/Test/context/test-data-context.tsx), with `useReducer` used to keep track of the following data:

1. test name
2. set of questions
3. current question
4. user answers

The context would be inititalized using the data from our `testLoader`, but instead just passing the data in directly, a `intitializeTestData` function that takes in the `testDataInit` as args is passed into the reducer to execute the following:

1. grab `answerSheet` from local storage
2. grab `currentQuestion` from local storage
3. Create a copy of the passed in data init.
4. if the localstorage data exists for either item exits, we overwrite the copy with this data; Else, we leave the copy alone
5. return the copied test data init.

Not discussed yet in detail yet, but when a user answers a question, data is saved into local storage. So when a user refreshses the page and our app initialized, we can check for the saved data and have it rendered, essentially returning the user to the point they were at when they refreshed the page.

Various dispatch functions were created to update the reducer. Please refer to the file for more details.

#### `TestQuestion` Route

Within the `Outlet` of `/:test`, or we could say `/html`, the [TestQuestion.tsx](/src/routes/TestQuestion/TestQuestion.tsx) component is rendered. If we starting from the beginning, then the URL would be `html/question/1`. I originally planned to have a loader retrieve the question data, but since the reducer already has that information, the `useTestData` hook is used to extract the questions. With the question set ready, the `TestQuestion` component executes the following:

1. uses various conditionals to check for a bad question number
2. Create two functions

- `nextPageNav`, a function to navigate to the next question, contains a conditional to instead navigate to the result route.
- `updateAnswerSheet`, a functino that updates the reducer answer sheet (the local storage is updated through the dispatch).

Both of these functions are passed into the `Question` component.

##### `Question`

The [Question.tsx component](/src/features/Question/components/Question/Question.tsx) takes in multiple props to render the question for the user to answer. The behavior of the component is as follows:

1. Question, choices, and progress bar are rendered.
2. Users cannot submit an answer until one has been selected.
3. When a answer is submitted, the user is notified of the question result.
4. Users can proceed to the next question by clicking the `next button`.

Note that the state in the component is intitalized with functions, these are used to set the state if the question is already answered. So if a user answers a questions, and refreshes, the completed state of the question is rendered instead of the un-answered one. This detracts users from being able to answer a question again.

#### `Results` Route

The [Result.tsx route](/src/routes/result/Results.tsx) is rendered when a user, for example, reaches the route `/html/result`. The function `nextPageNav` within the `TestQuestion` route is the only valid way this route can be reached. It checks for test status, and once it reaches the last question, it will navigate to the `/result` page with the quiz result passed in. If a user tries to access this route manually, they will welcomed with an `Error` screen.

From within the route, just for organizational sake, I created a `Result` component that takes in the passed in information and renders it.

##### `Result`

The [Result.tsx component](/src/features/Result/components/Result.tsx) takes in the data from the `/results` route and renders it. Along with the test result, it also provides a link to return to the home page and take another quiz. Note that for the the `playAgain` button, it removes all localStorage data, ensuring that the previous test session does not interfere with the next test.

### Styling

The application was configured with post-css to use css-modules. This allowed me to place my CSS into modules, scoping my CSS to avoid class name collisions. I was originally going to use tail-wind but noticed that my CSS skills had gotten stale, so I treated this as a review and also used this as an opportunity to try some new techniques (margin/padding, inline).

Global styles and resets are defined in the [index.css file](/src/styles/index.css), along with a [font.css file](/src/styles/fonts.css) to define the font. Instead of manually importing each file into `main.tsx`, I used `import.meta.glob` to import all `.css` files in the `src/style` directory (but not files within subdirectories). This wasn't a necessary feature to implement, I just wanted to try using some `Vite` techniques I had just learned as well!

You'll note in `index.css` that a data attribute for body `data-theme` is implemented. Depending on the attribute value, the variables defined along with the background-color are affected, more on this later.

I created the CSS with the new _nesting_ feature in mind, but as of the time of writing, native nesting is only supported in about 85% of browsers. For this reason, I used the `postcss-nested` plugin, which transpiles the written CSS into something that older browsers can understand.

### Testing

Testing is an important aspect of software development, both component testing and end-to-end testing are implemented into this application. When merging code into the repository, our GitHub Action contains scripts to run both test runners, ensuring we are deploying an error-free application (at least to the point of what we tested).

#### Vitest

This isn't a very complex application, but I stil wanted to keep my skills up to the date with the latest testing tools. `Vitest` is used to run component test with [jsdom] to provide the test runner with a _DOM_ environment. The test config can be found in the [vitest.config.ts file](/vitest.config.ts), with utitlies and such found in the [/test directory](/test/).

In [setup.ts](/test/setup.ts), you'll note that I created a jest mock function. In the [ThemeToggle component test](/src/features/ThemeToggle/components/ThemeToggle.test.tsx), Vitest would continously throw errors when it attempted use the `matchMedia` method on the `window`. Since it doesn't exist, a _mocked_ implementation of it with a deafult value of `false` was created. By putting it into this `setup.ts` file, all test have access to it. This ensures that our theme defined would stay consistent through the all test suites.

#### Cypress

End-to-end test were created with Cypress. All test can be found in the [/cypress/e2e directory](/cypress/e2e/). To better organize the project, three test suites were created:

1. `page-load.cy.ts`, test the initial load of the application
2. `question-skip.cy.ts`, test that our app catches bad route navigations
3. `test.cy.ts`, test the answering of the questions

As with Vitest, GitHub actions will run our all cypress tests with the `npm run cypress:run` command to ensure that an error-ridden version of the application is not deployed. This doesn't guarantee that the application will be error-free since that would depend on the quality of the test and how much is covered; but we can at least confirm that new changes made do not break already working functionality.

### Other

This section will detail other strategies and functionality that I implemented in the project. They were related to some of the topics discussed before, but since they cover general purposes it felt better to list them here.

#### Keyboard Navigation

One of the requirements state to implement keyboard navigation for the application. After reading some documentation on accessibility best practices and implementing keyboard controls on [my portfolio website](https://www.jorgemendozadev.com/); I created [a `useKeyboardNav` hook](/src/hooks/useKeyboardNav.tsx) that that could be implemented on a set of elements.

The hook functions as so:

1. It takes in the the following args:

- a range of elements to toggle between
- an object for extra elements to toggle between, in this case, a first and last element.

2. A `useRef` variable is used to create a wrapper for the list of elements where the DOM event will be fired.
3. A `useEffect` hook id utilized to handle the following:

- `handleKeyDown` is the function that is executed for the `keydown` event. It grabs elements based on the passed in args and depending on a `ArrowUp`/ `ArrowDown` or `ArrowLeft`/ `ArrowRight` key, it will toggle between the elements in the list. A conditional is created to check for either the first or last element in provided list so it can loop between them, creating a circular toggle pattern.

4. Add an event listner with the `keydown` event with the `handleKeyDown` function. Ensure to provide the cleanup function.
5. Return the `ref`.

With that `ref`, a list of elements can have keyboard navigation. Going back to the `Question` component, we call the hook with the following:

```ts
const ref = useKeyboardNav('ul li button', {
  lastElementQuery: '#submitOrNext',
})
```

The keyboard can be used to toggle between all answer choices and the button. The hook is also implemented in the quiz list. With just a few modifications, I believe the hook could work for any list of elements.

#### Theme Toggle

The application contains a light and dark theme that can be toggled in the [ThemeToggle.tsx component](/src/features/ThemeToggle/components/ThemeToggle.tsx). After some thought, I considered it best to have each state change modify a data attribute on the body, and depending on either a `light` or `dark` value, CSS variables would change as well as the background.

On first load, the application should render the user's preferred color theme. This is why the `theme` state is initialized with a fucntion. This function executes the following:

1. check for a local storage item of `theme`
2. if the item exists, return the value to set the state.
3. in the case of no local storage/last saved theme, then use the `watchMedia` method on `window` to check for the dark preference.

- if true, then return `dark`
- else, return `light`.
- both instances also set the data attribute on the `body` element.

With this, anytime a user selects a theme, it is saved for next time. If no saved theme, then the browser preference is used to set the theme.

## Conclusion

Overall this was a fun project to work on, I was able review my skills with react router, implement React best practices, and learn new things about Vitest. Setting the development environment of this project took me a bit of time, which led me to create [my own `vite-react` template](https://github.com/JorgeAMendoza/vite-react) which I plan to use on future React projects.

Thank you for taking the time to read through this, if you have any suggestions or fixes, please feel free to open an issue or submit a PR!
