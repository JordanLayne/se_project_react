import { Route, Redirect } from "react-router-dom";


function ProtectedRoute({ children, isLoggedIn, ...props }) {
    return (
      <Route {...props}>
        {isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )}
      </Route>
    );
  }
  
  export default ProtectedRoute;
  