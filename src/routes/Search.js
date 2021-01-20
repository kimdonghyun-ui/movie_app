import React,{useState, useEffect} from 'react';
import axios from 'axios';
import SearchMovie from '../components/SearchMovie';
// import "./Home.css";
// import "./Search.css";


const Search = () => {






  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [value, setValue] = useState("");



  useEffect(() => {
    getSearchMovie();
  },[]);


    const handleChange = (e: any) => {
      //this.setState({ value: e.target.value });
      setValue(e.target.value);
      console.log(e.target.value)
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    getSearchMovie();
  };

  const getSearchMovie = async () => {
    const ID_KEY = 'gBf_lsuzNXmy44am9k28';
    const SECRET_KEY = 'j6TOwj3MdS';

    const search = value;
    try {
      if (search === "") {
        //this.setState({ movies: [], isLoading: false })
        setMovies([])
        setisLoading(false)
      } else {
        const { data: {
          items
        } } = await axios.get('/v1/search/movie.json',
          {
            params: { query: search, display: 20 },
            headers: {
              'X-Naver-Client-Id': ID_KEY,
              'X-Naver-Client-Secret': SECRET_KEY
            }
          });
        //this.setState({ movies: items, isLoading: false });
        setMovies(items)
        setisLoading(false)
        console.log('items',items);
      }

    } catch (error) { console.log(error); }
  };






  return (
    <section className="container">

        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading..</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="input_div">
                <h1>영화 검색</h1>
                <input className="input_search" type="text" value={value} onChange={handleChange} placeholder="영화를 검색해 보세요." />
              </div>
              <div className="movies">
                {movies.map(movie => (<SearchMovie
                  key={movie.link}
                  id={movie.link}
                  year={movie.pubDate}
                  title={movie.title}
                  poster={movie.image}
                  rating={movie.userRating}
                  director={movie.director}
                  actor={movie.actor} />))}
              </div>
            </div>
          </form>
        )}

    </section>
  );
};

export default Search;