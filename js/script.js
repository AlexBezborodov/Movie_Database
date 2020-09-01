/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        '<span class="star"></span> Назад у майбутнє',
        "Шерлок Холмс",
        'Відступники <span class="star"></span> ',
        "Престиж",
        "Пропозиція",
        "Метод Хітча",
        "Таксі",
        "Термінатор. Судний день",
        'ТЕНЕТ <span class="star"></span> ',
        
    ]
};

const promo = document.querySelectorAll('.promo__adv img'),
      poster = document.querySelector('.promo__bg'),
      genre = poster.querySelector('.promo__genre'),
      movieList = document.querySelector('.promo__interactive-list '),
      addForm = document.querySelector('form.add'),
      addInput = addForm.querySelector('.adding__input'),
      checkBox = addForm.querySelector('[type="checkbox"]');

      checkBox.addEventListener('click', () => {
          if (checkBox.checked == true) {
              console.log('checked');
          } else {
            console.log('not checked')
          }
      })

// 1) delete Advertising
const deleteAdv = (arg) => {
    arg.forEach((imgAdv) => {
        imgAdv.remove();
    });
}


//2)change genre
const changeGenre = () => {
    genre.innerHTML = 'драма';}


//3) 
poster.style.backgroundImage = 'url(img/bg.jpg)' ;
//4) Sort and create movie list
const sortArr = (arr) => {
    arr.sort();
};

function createMovieList (films, parent) {
    parent.innerHTML = "";
    films.forEach((film, i) => {
    parent.innerHTML +=  `
    <li class="promo__interactive-item">${i + 1} ${film}
    <div class="delete"></div>
    </li>
    `;    
    sortArr(films);
});

 document.querySelectorAll('.delete').forEach((trashBtn,i) => {
    trashBtn.addEventListener('click', () => {
        trashBtn.parentElement.remove();
        movieDB.movies.splice(i,1);
        sortArr(films);
        createMovieList(films, parent);
        
    })
})
    
};
deleteAdv(promo);
changeGenre();
createMovieList(movieDB.movies, movieList);


//5) Add movie to list




addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newFilm = addInput.value;
    let favourite = checkBox.checked;
    
    if(newFilm) {

        if (newFilm.length > 20) {
            newFilm  = `${newFilm.substr(0, 21)}...`;
        }
        if (favourite) {
            
                newFilm = `
                ${newFilm}<span class="star"></span>
                `
            
            console.log(newFilm);
        };
           //<div class="promo__interactive-item"><span></span></div>
    
        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
        createMovieList(movieDB.movies, movieList);
        addForm.reset();
    }
    
    
})

