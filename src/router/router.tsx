import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import DetailContact from '../pages/detail-contact';
import CreateNewContact from '../pages/create-contact';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail-contact/:id' element={<DetailContact />} />
        <Route path='/create-contact' element={<CreateNewContact />} />
      </Routes>
    </Router>
  )
}

export default AppRouter