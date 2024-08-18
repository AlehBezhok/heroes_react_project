import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../pages/Spinner';
import './heroesList.scss';

const HeroesList = () => {
    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();
    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        if (activeFilter === 'all') {
            return heroes;
        }
        return heroes.filter(hero => hero.element === activeFilter);
    }, [heroes, activeFilter]);

    const onDelete = useCallback((id) => {
        deleteHero(id).unwrap()
            .catch(err => console.error('Failed to delete hero:', err));
    }, [deleteHero]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h5 className="text-center mt-5">Error loading heroes</h5>;
    }

    const elements = filteredHeroes.length > 0 
        ? filteredHeroes.map(({ id, ...props }) => (
            <CSSTransition key={id} timeout={500} classNames="hero">
                <HeroesListItem {...props} id={id} onDelete={() => onDelete(id)} />
            </CSSTransition>
        ))
        : (
            <CSSTransition timeout={0} classNames="hero">
                <h5 className="text-center mt-5">No heroes yet</h5>
            </CSSTransition>
        );

    return (
        <TransitionGroup component="ul" className="heroes-list">
            {elements}
        </TransitionGroup>
    );
}

export default HeroesList;