import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import { useEffect, useState } from 'react';
import useMovieTrailer from '../Hooks/useMovieTrailer';

const MainContainer = () => {
    const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
    const [mainMovie, setMainMovie] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const getMovieTrailer = useMovieTrailer();

    // Log movies to ensure it's being fetched properly
    console.log("Movies from Redux:", movies);

    useEffect(() => {
        console.log("useEFfect from mainContainer");
        if (movies?.length > 0) {
            const selectedMovie = movies[Math.floor(Math.random()*20)];
            console.log("Selected Movie:", selectedMovie); // Log selected movie for debugging
            setMainMovie(selectedMovie);
        }
    }, [movies]);

    useEffect(() => {
        console.log("useEffect 2 from maincontainer ");

        const handleMovieId = async () => {
            if (mainMovie) {
                const id = await getMovieTrailer(mainMovie.original_title);
                setVideoId(id);
            }
        };

        handleMovieId();  // Call the function when `mainMovie` is set
    }, [mainMovie]);

    if (!mainMovie) {
        return <div className='h-[700px] w-[100%] bg-black overflow-hidden'></div>;
    }

    const { original_title, overview, id } = mainMovie;

    // Log original_title, overview, and id to confirm data consistency
    console.log("Main Movie Details - Title:", original_title, "Overview:", overview, "ID:", id);

    return (
        <>
            <div className='-z-10 relative w-[100%] overflow-hidden '>
                <VideoTitle title={original_title} overview={overview} />
                <VideoBackground title={original_title} movieId={videoId} />
            </div>
        </>
    );
};

export default MainContainer;
