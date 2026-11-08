import { useState } from "react";

function SearchBar({onSearch, disabled}) {
 const [text, setText] = useState('');
 function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSearch(trimmed);
 } 

 return (
    <form className="search-form" onSubmit={handleSubmit}> 
     <input className="search-bar"
     value={text} 
     onChange={(e) => setText(e.target.value)} 
     placeholder="Search books..."
     aria-label="Search books"
     />
     <button className="search-btn" disabled={disabled} type="submit">{disabled ? 'Searching' : 'Search'}</button>
        
    </form>
 )
}

export default SearchBar;