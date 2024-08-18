import { useParams, useNavigate } from 'react-router-dom';
import { useGetHeroQuery } from '../../api/apiSlice';
import Spinner from '../pages/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './heroInfo.scss';

const HeroInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: hero,
        isLoading,
        isError
    } = useGetHeroQuery(id);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorMessage />;
    }

    if (!hero) {
        return <h5 className="text-center mt-5">Hero not found</h5>;
    }

    return (
        <div className="hero-info-container">
            <View hero={hero} />
            <button className="back-button" onClick={() => navigate('/')}>Back to main page</button>
        </div>
    );
}

const View = ({ hero }) => {
    const { name, description, element } = hero;

    return (
        <div className="single-hero">
            <div className="single-hero__info">
                <div className="info-item">
                    <span className="info-label">Hero Name:</span>
                    <span className="info-text">{name}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Element:</span>
                    <span className="info-text">{element}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Description:</span>
                    <span className="info-text">{description}</span>
                </div>
            </div>
        </div>
    );
}

export default HeroInfo;
