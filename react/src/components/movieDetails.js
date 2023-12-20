import React from "react";

// Фрагмент деталей фильма
function MovieDetails(props) {
    const splittedActors = props.movie.actors.split(", ")
    const actors = splittedActors.map((actor, index) => <div className="actor" key={ index }><p>{ actor }</p></div>)

    return (
        <div className="movieDetails">

            { /* Верхняя часть фрагмента (ID и блок "Редактировать") */ }
            <div className="movieDetailsHeader">

                { /* По нажатию на значок будет скопирован ID фильма */ }
                <label>ID: <label id="id">{ props.movie.id }</label> <img className="copyButton" src="copy.svg" alt="" onClick={ () => { navigator.clipboard.writeText(document.querySelector("#id").innerText) } } /></label>
                
                <div className="edit" onClick={ () => { props.onEditClick() } }>
                    <label className="editText"><img src="edit.svg" alt=""></img> Редактировать</label>
                </div>
            </div>

            { /* Обертка деталей фильма */ }
            <div className="movieDetailsWrapper">
                <img className="poster" alt="" src={ props.movie.posterUrl } />

                <div>
                    <p><b className="titleStyle">{ props.movie.title }</b></p>
                    <p className="directorStyle">{ props.movie.director }</p>

                    <div className="detailsWrapper">

                        { /* Детали фильма */ }
                        <div className="parameters">
                            <b>Параметры</b>

                            <div className="parameter">
                                <label className="parameterNameStyle">Год производства</label>
                                <label>{ props.movie.year }</label>
                            </div>

                            <div className="parameter">
                                <label className="parameterNameStyle">Длительность (мин)</label>
                                <label>{ props.movie.runtime }</label>
                            </div>

                            <div className="parameter">
                                <label className="parameterNameStyle">Жанры</label>
                                <label>{ props.movie.genres.join(", ") }</label>
                            </div>
                        </div>

                        { /* Актеры */ }
                        <div>
                            <b>В главных ролях <img src="checkMark.svg" alt="" /></b>
                            { actors }
                        </div>
                    </div>
                </div>
            </div>

            { /* Описание фильма */ }
            <div className="description">
                <p><b>Описание</b></p>
                <p>{ props.movie.plot }</p>
            </div>
        </div>
    )
}

export default MovieDetails;
