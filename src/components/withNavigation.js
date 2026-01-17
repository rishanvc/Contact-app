import { useNavigate, useLocation, useParams } from "react-router-dom";

function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return <Component {...props} navigate={navigate} location={location} params={params} />;
  };
}

export default withNavigation;

