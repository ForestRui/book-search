import {useEffect, useState} from 'react';
import BookCard from './components/BookCard';
import searchBooks from './api/openLibrary';
import SearchBar from './components/SearchBar';
import './App.css'




function App() {
   const [books, setBooks] = useState([]);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const [searched, setSearched] = useState(false);
   

  async function handleSearch(query) {
     setLoading(true);
     setError('');
     setSearched(true);

     try {
      const results = await searchBooks(query);
      setBooks(results);
     }
     catch(err) {
      setBooks([]);
      setError('Could not load book.')
     } finally {
      setLoading(false);
     }
  }
  
  return (
    <div>
      <header className="upper-page">
    <h1>Book Search</h1>
    <SearchBar onSearch={handleSearch} />
   
      </header>
    
    
     <div className="search-result">
      {loading && <p>is Loading</p>}
    {error && <p>{error}</p>}
    {!loading && !error && searched && books.length === 0 && (<p>No book found</p>)}
      <ul className="book-list">
      {books.map((book) => (
        
       <BookCard book={book} key={book.key} />
      
      ))}
      </ul>
     </div>
    
    </div>
  )
}


export default App;