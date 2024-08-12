
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/Pages/Home';
import CreateBlog from './components/Createblog';
import Auth from './components/Auth';
import BlogList from './components/ReadAllBlog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createblog" element={<CreateBlog></CreateBlog>} />
        <Route path="/auth" element={<Auth></Auth>} />
        <Route path="/allblogs" element={<BlogList></BlogList>} />
      </Routes>
    </Router>
  );
}

export default App;
