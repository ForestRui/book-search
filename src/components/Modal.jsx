import {useEffect, useRef, useState} from 'react';
import GetDetail from './GetDetail';

function Modal ({book, onClose}) {
const dialogRef = useRef(null);
const [detail, setDetail] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

function readDescription(description) {
    if (!description) {
        return 'No description available.';
    }
  return typeof description === 'string' ? description : description.value;
}

// Modal Display //

   useEffect(() => {
     const dialog = dialogRef.current;
        if (dialog) {
            dialog.showModal();
        }
   }, [])

   // fetch Details //
   useEffect (() => {
    let ignore = false;

    GetDetail(book.key).then((data) => {
        if (!ignore) setDetail(data)
    }
    )
    .catch((error) => {
        if (!ignore) setError("Can't get details");
        console.log(error);
    }
    )
    .finally(() => {
        if (!ignore) setLoading(false);
    }
    )
    return () => {ignore = true};

   }, [book.key]);  // re-render when book.key changes //

   //informations // 

   const description = readDescription(detail?.description);
   const coverURL = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null;
 const authorName = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
 const publishYear = book.first_publish_year ?? 'Unknown Year';
const bookTitle = book.title;

 const hasRating = book.ratings_average != null;
 const rating = hasRating ? book.ratings_average.toFixed(1) : null;
 const ratingCount = book.ratings_count ? book.ratings_count.toLocaleString() : null;

    return (
        <dialog ref={dialogRef} className="book-modal" onClose={onClose}>
           <div className="modal-content"> 
            <div className="modal-left">
            <h3 className="book-year">{bookTitle}</h3>
            <img className="book-cover" src={coverURL} alt={`Cover of ${book.title}`} />
            <p className="book-author">By {authorName}</p>
            
            </div>
            <div className="modal-right">

            {loading && <p>Loading</p>}
            {error && <p>error: {error}</p>}

            {!loading && !error && detail && <p className="modal-description">{description}</p>}

            {hasRating && <p className="book-rating" aria-label={`Rated {rating} out of 5`}>
            {rating}<span className="star" aria-hidden="true">★</span>
            {ratingCount && <span className="rating-count">rating count: {ratingCount}</span>}

            
            </p>}
            </div>
           </div>
            <button className="modal-button" onClick={() => dialogRef.current.close()}>Close</button>
        </dialog>
    )
}

export default Modal;