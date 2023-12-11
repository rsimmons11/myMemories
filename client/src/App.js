// Importing React and specific components from the '@material-ui/core' and 'react-router-dom' libraries.
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Importing various components used in the application.
import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

// Functional component 'App' responsible for defining the application's routes and structure.
const App = () => {
  // Retrieving user information from local storage.
  const user = JSON.parse(localStorage.getItem('profile'));

  // JSX structure defining the overall application layout and routing using 'react-router-dom'.
  return (
    <BrowserRouter>
      {/* Container component from Material-UI providing styling and layout. */}
      <Container maxWidth="xl">
        {/* Navbar component, appearing on the top of the application. */}
        <Navbar />
        {/* Switch component to conditionally render routes based on the current URL. */}
        <Switch>
          {/* Route for the home page, redirects to "/posts" if the exact path is matched. */}
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          {/* Route for the main posts page. */}
          <Route path="/posts" exact component={Home} />
          {/* Route for the posts search page, using the same component as the main posts page. */}
          <Route path="/posts/search" exact component={Home} />
          {/* Route for displaying the details of a specific post. */}
          <Route path="/posts/:id" exact component={PostDetails} />
          {/* Route for displaying posts based on creators or tags. */}
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          {/* Route for the authentication page. Redirects to "/posts" if the user is logged in. */}
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

// Exporting the 'App' component as the default export.
export default App;
