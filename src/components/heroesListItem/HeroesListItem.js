import { Link, useNavigate } from "react-router-dom";
import { startTransition } from "react";

import './heroesListItem.scss';

const HeroesListItem = ({ id, name, description, element, onDelete }) => {
    const elementClassName = getElementClassName(element);
    const navigate = useNavigate();

    const handleNavigation = (event) => {
        event.preventDefault();
        startTransition(() => {
            navigate(`/heroes/${id}`);
        });
    };

    return (
        <li
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName} hero-item`}
            tabIndex={0}
            key={id}
        >
            <Link to={`/heroes/${id}`} onClick={handleNavigation} className="d-flex align-items-center hero-link">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
                    className="img-fluid w-25 d-inline hero-img"
                    alt="unknown hero"
                    style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                    <h3 className="card-title hero-name">{name}</h3>
                    <p className="card-text hero-description">{description}</p>
                </div>
            </Link>
			<span
				onClick={onDelete}
				className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
			>
				<button
					type="button"
					className="btn-close btn-close"
					aria-label="Close"
				></button>
			</span>
        </li>
    );
};

const getElementClassName = (element) => {
    switch (element) {
        case "fire":
            return "bg-danger bg-gradient";
        case "water":
            return "bg-primary bg-gradient";
        case "wind":
            return "bg-success bg-gradient";
        case "earth":
            return "bg-secondary bg-gradient";
        default:
            return "bg-warning bg-gradient";
    }
};

export default HeroesListItem;
