# Skip Selector

The template in use provides a minimal setup to get React working in Vite with Hot Module Reloading (HMR) and some ESLint rules.

## UX Enhancement Approach

These are the features and changes included that attempt to improve the user experience.

### Color Contrast

The main style sheet, [index.css](/src/index.css), defines two variables called `--primary` and `--secondary`. These are the two main colors used throughout the application. A white background color has been used to create a better a color contrast from the variables.

### Data Fetching

The Axios package has been used for making a GET request to the respective endpoint in [App.jsx](/src/App.jsx). This package has easier syntax compared to the JavaScript fetch function and this combined with the `fetchData` function inside a `useEffect` make it possible to update the state value for `skips` using its `setSkips` function. The `skips` value is then used to iterate over all the data returned by the get request and renders the [**Card**](#card-component) component. 

### Navigation

The navigation bar at the top of the page has been created using a flex layout and the `flex-wrap` property has been specified allowing it to correctly display its contents while adapting to various screen sizes.

### Loading Animation

A loading animation is used to show the user an optimistic update before the data is loaded from the GET request. This is done using the `loading` and `setLoading` state values in [App.jsx](/src/App.jsx). Other animations are used to provide better visual indicators to the user such as on the [ScrollUp component](#scroll-up-component), and the text the informs the user that the skips is not allowed on the road on the [Card component](#card-component).

### Toggling Layout (List + Grid view)

The UI can be toggled using two buttons with icons representing a grid and list, these show the cards of the skips using a grid or list view respectively. This makes use of the `view` and `setView` state values in [App.jsx](/src/App.jsx). The users option is stored using the browsers local storage allowing for persistence after window closes or the browser refreshes.

### Scroll Up Component

The [Scroll Up component](/src/components/ScrollUp.jsx) component renders a button with an arrow pointing upwards that allows the user to change their viewing context and see the top of the page. This is possible using the **window** object, **scrollTo** function and the styles defined in the [index.css](/src/index.css) file for **scroll-behavior**.

### Card Component

This component is reusable and allows the UI to show the individual data for each Skip. The props of this component enable conditional rendering for aspects such as border, box shadow, and button text. This is located [in /components/Card.jsx](/src/components/Card.jsx).

### Responsive Layout

Some layouts such as the grid layout used to display the Card component only cater for larger screen sizes because they wouldn't look as appealing on mobile screens. This is accounted for throughout the application.

## Running The Application

If desired, the application can be run locally by firstly installing all the node modules using the `npm install` command. Then, run the `npm run dev` command to start the application which should be available on **http://localhost:5173/**
