import { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { BsSearch } from 'react-icons/bs'
import { BsChevronRight } from 'react-icons/bs'
import { BsChevronLeft } from 'react-icons/bs'
import Movie from '../Movie/Movie'
import "./Home.css"
import { API_KEY } from '../../API'
import axios from 'axios'
function Section() {
    let sliderRange = 190
    const [count, setcount] = useState(0)
    const movieWrapper = useRef()
    const [feed, setFeed] = useState([])
    const [upComing, setUpComing] = useState([])
    const searchFeed = (e) => {
        setUpComing(upComing.filter(movie => e.target.value === movie.title))
        setFeed(feed.filter(movie => e.target.value === movie.title[0]))
        upComing.forEach(movie => console.log(movie.title[0]))
        console.log(e.target.value)
    }
    const getData = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`).then((response) => setFeed(response.data.results))
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`).then((response) => setUpComing(response.data.results))
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='section'>
            <div className='movie__section'>
                <div className='search' >
                    <BsSearch className='searchIcon' />
                    <input type="text" placeholder="Search for movies and TV series" onChange={searchFeed} />
                </div>
                <h1>Upcoming Movies</h1>
                <div className='upcoming_movies '>
                    {
                        count === 0 ? "" :
                            <BsChevronLeft className="prev_Slide" onClick={() => {
                                setcount(count + sliderRange)
                            }} />

                    }
                    <motion.div className='movies_wrapper' style={{ left: count }} ref={movieWrapper} dragMomentum={false}  >
                        {
                            upComing.map(dataset => (
                                <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />
                            ))
                        }
                    </motion.div>
                    {
                        count === parseInt(`-${sliderRange * (upComing.length - 6)}`) ? "" :
                            <BsChevronRight className="next_Slide" onClick={() => {
                                setcount(count - sliderRange)
                            }} />

                    }
                </div>
                <h1>Recommended for you</h1>
                <div className='movies'>
                    {
                        feed.map(dataset => (
                            <Movie key={dataset.id} id={dataset.id} movieTitle={dataset.title} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.release_date} movieGenre={dataset.genre_ids} />
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Section