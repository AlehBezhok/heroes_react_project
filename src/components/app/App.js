import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {lazy} from 'react';

import './app.scss';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const HeroInfo = lazy(() => import('../heroInfo/HeroInfo'));

const App = () => {
    
    return (
        <Router>
            <main className="app">
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/heroes/:id' element={<HeroInfo />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </main>
        </Router>
    )
}

export default App;