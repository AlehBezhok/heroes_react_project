import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { startTransition } from "react";

const Page404 = () => {
    const navigate = useNavigate();
    
    const handleNavigation = (event) => {
        event.preventDefault();
        startTransition(() => {
            navigate(`/`);
        });
    };

    return (
        <div>
            <ErrorMessage />
            <Link onClick={handleNavigation} style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px',
                'marginTop': '30px'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;