async function searchBooks(query) {
    

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}` +
    `&limit=20&fields=key,title,author_name,first_publish_year,cover_i`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json();
    console.log(data);
    
    return data.docs

    
    
   

}

export default searchBooks;