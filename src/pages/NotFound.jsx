import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="text-center py-5">
            <h1>404</h1>
            <h3>Page not found</h3>

            <Link to="/" className="btn btn-primary">
                Back
            </Link>
        </div>
    );
}