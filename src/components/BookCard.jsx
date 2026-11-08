function BookCard({ book }) {
 const coverURL = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null;
 const authorName = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
 const publishYear = book.first_publish_year ?? 'Unknown Year';

 return (
    <li className="book-card">
         {coverURL ? <img src={coverURL} alt={`Cover of ${book.title}`}  /> : <div>No Cover</div>}
        <div className="book-info">
         <h2>{authorName}</h2>
         <p>{publishYear}</p>
        </div>
    </li>
 )
 
}

export default BookCard;