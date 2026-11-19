function BookCard({ book, onSelect }) {
 const coverURL = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null;
 const authorName = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
 const publishYear = book.first_publish_year ?? 'Unknown Year';
const bookTitle = book.title;

 const hasRating = book.ratings_average != null;
 const rating = hasRating ? book.ratings_average.toFixed(1) : null;
 const ratingCount = book.ratings_count ? book.ratings_count.toLocaleString() : null;

 return (
    <li className="book-card" >
         {coverURL ? <img className="book-cover" src={coverURL} alt={`Cover of ${book.title}`}  /> : 
         <div className="no-cover">No Cover</div>}

        <div className="book-info">
         <h3 className="book-title">{bookTitle}</h3>
         <p className="book-author">--{authorName}</p>
         <p className="book-year">Published at: {publishYear}</p>
         {hasRating && <p className="book-rating" aria-label={`Rated {rating} out of 5`}>
            {rating}<span className="star" aria-hidden="true">★</span>
            {ratingCount && <span className="rating-count">rating count: {ratingCount}</span>}
            </p>

         }
            
        </div>

        <div className="book-actions">
         <button className="select-button" onClick={() => onSelect(book)}>View Details</button>
         <button className="favorite-button" onClick={() => alert('Added to favorites!')}>Add to Favorites</button>

        </div>
    </li>
 )
 
}

export default BookCard;