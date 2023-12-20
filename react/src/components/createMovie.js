import React from "react";

// Фрагмент создания фильма
function CreateMovie(props) {
    
    // Получение параметров фильма из текстовых полей
    function getParameters() {
        return {
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
                <p className="mainLable">Создание фильма</p>

                { /* Ввод параметров фильма */ }
                <div>
                    <div className="item">
                        <p className="itemStyle">Название фильма</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите название фильма" id="movieTitle" />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Жанры</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите жанры фильма (через ', ')" id="movieGenres" />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Год выпуска</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите год выпуска" id="movieYear" />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Описание</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите описание" id="moviePlot" />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Ссылка на обложку</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Укажите ссылку на обложку" id="moviePosterUrl" />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Длительность фильма (мин)</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Укажите длительность фильма в минутах" id="movieRuntime" />
                        </div>
                    </div>

                    <div className="item">
                        <p className="itemStyle">Список актеров</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите актеров (через ', ')" id="movieActors" />
                        </div>
                    </div>
                    
                    <div className="item">
                        <p className="itemStyle">Режиссер</p>
                        <div className="inputStyle">
                            <input type="text" className="textStyle" placeholder="Введите режиссера" id="movieDirector" />
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

export default CreateMovie;
