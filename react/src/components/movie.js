import React from "react";

// Плашка фильма, которая находится в списке всех фильмов
function Movie(props) {
    return (
        <div className="filmBlock" onClick={ () => { props.onClick(props.id) } } >
            { /* Название фильма */ }
            <div className="movieName">{ props.movie.title }</div>

            { /* Краткая информация о фильме */ }
            <div className="movieBriefInfo">
                <div className="movieBriefInfoItem">{ props.movie.year }</div>
                <div className="movieBriefInfoItem"><label>|</label></div>
                <div className="movieBriefInfoItem"><label>{ props.movie.genres.join(", ") }</label></div>
            </div>
        </div>
    )
}

export default Movie;
