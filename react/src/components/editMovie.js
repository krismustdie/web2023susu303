import React from "react";

// Фрагмент редактирования фильма
function EditMovie(props) {

    // Получение новых параметров фильма из текстовых полей
    function getParameters() {
        return {
            id: props.movie.id,
            title: document.getElementById("movieTitle").value,
            year: document.getElementById("movieYear").value,
            runtime: document.getElementById("movieRuntime").value,
            genres: document.getElementById("movieGenres").value.split(", "),
            director: document.getElementById("movieDirector").value,
            actors: document.getElementById("movieActors").value,
            plot: document.getElementById("moviePlot").value,
            posterUrl: document.getElementById("moviePosterUrl").value
        }
    }
    
    return (
        <div>
            <div className="createOrEdit">
                <p className="mainLable">Редактирование фильма</p>

                { /* Ввод параметров фильма */ }
                <div>
                    <div className="item">
                        <p className="itemStyle">Название фильма</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите название фильма" id="movieTitle" defaultValue={ props.movie.title } />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Жанры</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите жанры фильма (через ', ')" id="movieGenres" defaultValue={ props.movie.genres.join(", ") } />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Год выпуска</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите год выпуска" id="movieYear" defaultValue={ props.movie.year } />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Описание</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите описание" id="moviePlot" defaultValue={ props.movie.plot } />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Ссылка на обложку</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Укажите ссылку на обложку" id="moviePosterUrl" defaultValue={ props.movie.posterUrl } />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Длительность фильма (мин)</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Укажите длительность фильма в минутах" id="movieRuntime" defaultValue={ props.movie.runtime } />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Список актеров</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите актеров (через ', ')" id="movieActors" defaultValue={ props.movie.actors } />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Режиссер</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите режиссера" id="movieDirector" defaultValue={ props.movie.director } />
                        </div>
                    </div>
                </div>
            </div>

            { /* Нижняя линия */ }
            <div className="footerLine" />
            
            { /* Кнопки отмены и подтверждения */ }
            <div className="createOrEditFooter">
                <button className="cancelButton" onClick={ () => { props.onCancelClick() } }>Отменить</button>
                <button className="saveButton" onClick={ () => { props.onSubmit(getParameters()) } }>Сохранить</button>
            </div>
        </div>
    )
}

export default EditMovie;
