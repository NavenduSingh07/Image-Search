import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log('data', data);
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  console.log('page', page);

  return (
    <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Type something to search...'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>
      <div className='filters'>
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>
      <div className='images'>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className='image'
          />
        ))}
      </div>
      <div className='buttons'>
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default App;



//index.css
{/* <Form.Control
   type='search'
   placeholder='Type something to search...'
   className='search-input'
   ref={searchInput}
/> */}

// //handleSearch
// const handleSearch = (event) => {
//   event.preventDefault();
//   console.log(searchInput.current.value);
// };


//Quick Search 
{/* <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        ...
      </div>
      <div className='filters'>
        <div>Nature</div>
        <div>Birds</div>
        <div>Cats</div>
        <div>Shoes</div>
      </div>
</div> */}

//filters
{/* <div className='filters'>
   <div onClick={() => handleSelection('nature')}>Nature</div>
   <div onClick={() => handleSelection('birds')}>Birds</div>
   <div onClick={() => handleSelection('cats')}>Cats</div>
   <div onClick={() => handleSelection('shoes')}>Shoes</div>
</div> */}

//https://unsplash.com/documentation

//https://unsplash.com/oauth/applications/570680


// https://www.freecodecamp.org/news/how-to-build-an-image-search-app-using-react/
//https://github.com/myogeshchavan97/unsplash_image_search   git 



// https://curious-halva-a2a85a.netlify.app/