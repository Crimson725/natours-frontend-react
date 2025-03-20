import { Redirect, Route, Switch } from "react-router-dom";
import AllTours from "./Tours/AllTours";
import BookedTours from "./Tours/BookedTours";
import SingleTour from "./Tours/SingleTour";
import UserProfile from "./UserProfile/UserProfile";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <AllTours />
      </Route>
      <Route exact path="/my-tours">
        <BookedTours />
      </Route>
      <Route path="/me">
        <UserProfile />
      </Route>
      <Route path="/tour/:tour" component={SingleTour} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Main;
