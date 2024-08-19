import { useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { selectAll } from '../heroesFilters/filtersSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';
import store from '../../store';

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const [createHero] = useCreateHeroMutation();

    const {fitersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Loading</option>;
        } else if (status === "error") {
            return <option classcName="text-center mt-5">Eror</option>
        }

        if (filters && filters.length > 0) {
            return filters
                .filter(({ name }) => name !== 'all') // Фильтруем элементы
                .map(({ name, label }) => (
                    <option key={name} value={name}>
                        {label}
                    </option>
                ));
        }
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        createHero(newHero).unwrap();

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    };

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Hero name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder="Hero name"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Desctiption</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}
                    placeholder="Description"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Hero can use...</option>
                    {renderFilters(filters, fitersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;