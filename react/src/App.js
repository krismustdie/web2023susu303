import MovieBlock from './components/movieBlock';
import {useState} from 'react';
import MovieDetails from './components/movieDetails';
import CreateMovie from './components/createMovie';
import EditMovie from './components/editMovie';
import './App.css';
import './header.css';
import './body.css';
import './movieDetails.css';
import './createOrEditMovie.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    function hideAddMovieButton() {
        document.getElementById("addMovieButton").classList.add("hidden")
    }

    function showAddMovieButton() {
        document.getElementById("addMovieButton").classList.remove("hidden")
    }
		
    function onAddMovieButtonClick() {
        setCreatingMovie(true)
        hideAddMovieButton()
    }

    function onEditMovieButtonClick() {
        setEditingMovie(true)
        hideAddMovieButton()
    }

    function onMovieItemClick(id) {
        setSelectedMovie(filterredMovies[id])
        setCreatingMovie(false)
        setEditingMovie(false)

        showAddMovieButton()
    }

    function onCancelButtonClick() {
        setCreatingMovie(false)
        setEditingMovie(false)

        showAddMovieButton()
    }

    function checkMovieParametersAreValid(movie) {
        return movie.title !== "" && movie.year !== "" && movie.plot !== "" && movie.posterUrl !== "" && movie.runtime !== "" && movie.genres !== "" && movie.actors !== "" && movie.director !== ""
    }

    async function sendAndReceiveMovie(movie) {
        var newMovie = {}

        await fetch("https://my-json-server.typicode.com/krismustdie/web2023susu303/movies", {
            method: 'POST',
            body: JSON.stringify(movie),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
        })
	        .then(response => response.json())
	        .then(json => { newMovie = JSON.parse(JSON.stringify(json)) })
				
        newMovie.id = findMaxId(movies) + 1

        return newMovie
    }

    async function addMovie(movie) {
        if (!checkMovieParametersAreValid(movie)) {
            alert("Вы ввели не все параметры")
            return
        }

        var newMovie = await sendAndReceiveMovie(movie)
				
        setMovies(prevState => [...prevState, newMovie])
        setCreatingMovie(false)

        showAddMovieButton()
    }

    function editMovie(movie) {
        if (!checkMovieParametersAreValid(movie)) {
            alert("Вы ввели не все параметры")
            return
        }

        selectedMovie.title = movie.title
        selectedMovie.year = movie.year
        selectedMovie.runtime = movie.runtime
        selectedMovie.genres = movie.genres
        selectedMovie.director = movie.director
        selectedMovie.actors = movie.actors
        selectedMovie.plot = movie.plot
        selectedMovie.posterUrl = movie.posterUrl

        setEditingMovie(false)

        showAddMovieButton()
    }

    function findMaxId(list) {
        var maxId = 0

        list.forEach(movie => { if (movie.id > maxId) maxId = movie.id })
        return maxId
    }

    // Получение фильмов из файла movies.json
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "movies.json", false)
    xhttp.send()

    var json = {}
    if (xhttp.status === 200) json = JSON.parse(xhttp.responseText)

    const [creatingMovie, setCreatingMovie] = useState(false)
    const [editingMovie, setEditingMovie] = useState(false)
    const [movies, setMovies] = useState(json.movies)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [filterText, setFilterText] = useState('')

    // Фильмы, полученные в результате фильтрации по поиску
    const filterredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(filterText.toLowerCase())
    })

    return (
        <div>
            {/* Header */}
            <div className="header">
                <b>Фильмотека</b>
                <div className="authorBlock"><b>Абдулфанова К.Д., КЭ-303</b></div>
            </div>
    
            {/* Body */}
            <div className="wrapper">
    
                { /* Список фильмов + поиск */ }
                <div className="moviesList">
    
                    { /* Поиск */ }
                    <div className="searchBlock">
                        <div className="search">
                            <input type="text" className="searchText" placeholder="Введите название фильма" id="searchText"></input>
                        </div>
    
                        <button className="searchButton" onClick={ () => { setFilterText(document.getElementById("searchText").value) } }>Искать</button>
                    </div>
    
                    { /* Список фильмов */ }
                    <div className="list">
                        { <MovieBlock movies={ filterredMovies } onClick={ onMovieItemClick } /> }
                    </div>
    
                    <div className="line"></div>
    
                    { /* Количество найденных элементов + кнопка добавления фильма */ }
                    <div className="moviesListFooter">
                        <label>Найдено { filterredMovies.length } элементов</label>
                        <button className="addMovieButton" onClick={ onAddMovieButtonClick } id="addMovieButton"><img src='plus.svg' alt=''></img> Добавить</button>
                    </div>
                </div>
    
                { /* В зависимости от действий пользователя будет выведен один из 3-х фрагментов: детали фильма, добавление фильма или редактирование фильма. */ }
                <div>
                    { creatingMovie ? <CreateMovie onCancelClick={ onCancelButtonClick } onSubmit={ addMovie } /> : <div></div> }
                    { editingMovie ? <EditMovie onCancelClick={ onCancelButtonClick } onSubmit={ editMovie } movie={ selectedMovie } /> : <div></div> }
                    { selectedMovie != null && !(creatingMovie || editingMovie) ? <MovieDetails movie={ selectedMovie } onEditClick={ onEditMovieButtonClick } /> : <div></div> }
                </div>
            </div>
        </div>
    );
}

export default App;
