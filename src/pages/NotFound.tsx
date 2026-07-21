import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export default function NotFound() {
  return (
    <div className="content-wrap">
      <div className="content not-found">
        <Seo
          title="Page not found"
          description="The page you're looking for doesn't exist."
          path="/404"
        />
        <h1>404</h1>
        <p className="lead">We couldn't find that page.</p>
        <div className="hero__cta">
          <Link className="btn btn--primary" to="/">
            Back home
          </Link>
          <Link className="btn btn--ghost" to="/docs/getting-started">
            Getting Started
          </Link>
        </div>
      </div>
    </div>
  );
}
