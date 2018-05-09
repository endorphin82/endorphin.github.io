/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_KEY = "c5e671d77ad5ead1175111461993f8ea";

exports.default = {
  searchMovieUrl: "https://api.themoviedb.org/3/search/multi?api_key=" + API_KEY + "&query=",
  imageSrc: "http://image.tmdb.org/t/p/w185",
  noImageSrc: "http://babakunyho.eu/img/default-no-image.png",
  baseMovieUrl: "https://api.themoviedb.org/3/",
  queryMovieById: "tv/",
  apiKey: "?api_key=" + API_KEY
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _movieList = __webpack_require__(2);

var _movieList2 = _interopRequireDefault(_movieList);

var _movieCard = __webpack_require__(4);

var _movieCard2 = _interopRequireDefault(_movieCard);

var _moviesService = __webpack_require__(5);

var _moviesService2 = _interopRequireDefault(_moviesService);

var _info = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import infoResultsPages from './components/info'
// import infoPage from './components/info'
// import movie from './components/movie'

// const link = document.querySelector('.movie-link')
var totalp = document.querySelector('.total_p');
var total_pages = document.querySelector('.total_pages');
var page = document.querySelector('.page');
var input = document.querySelector('.search-input');
var movieList = document.querySelector('.movies');
var list = new _movieList2.default();
var filters = document.querySelector('.filters');

input.addEventListener('input', function (e) {
  var searchText = e.target.value;

  if (!searchText) {
    list.clearList(movieList);
    return;
  }

  _moviesService2.default.getVideoByText(searchText).then(function (data) {
    list.init(data);
    list.renderMovies(data.results);
    list.drawToDom(movieList);
    totalp.innerHTML = (0, _info.infoResults)(data);
    page.innerHTML = (0, _info.infoPage)(data);
    total_pages.innerHTML = (0, _info.infoResultsPages)(data);
    console.log(data);
  });
});

filters.addEventListener('click', function (e) {
  e.preventDefault();
  var target = e.target;
  var dataAttr = target.getAttribute('data-filter');
  if (!dataAttr) {
    return;
  }
  list.sort(dataAttr);
});

movieList.addEventListener('click', function (e) {
  var target = e.target;
  var link = target.closest('.movie-link');
  var id = void 0;

  e.preventDefault();

  if (!link) {
    return;
  }
  id = link.getAttribute('href');
  _moviesService2.default.getVideoById(id).then(function (data) {
    _movieCard2.default.renderMovie(data);
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //все что можно сделать со списком
//добавление в дом
//отрисовка, добавление элементов, очистка
//сортировка


var _movie = __webpack_require__(3);

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovieList = function () {
  function MovieList() {
    _classCallCheck(this, MovieList);
  }

  _createClass(MovieList, [{
    key: 'init',
    value: function init(data) {
      this.data = data;
      // console.log(this)
    }
  }, {
    key: 'drawToDom',
    value: function drawToDom(selector) {
      // console.log(this)
      this.selector = selector;
      this.clearList(selector);
      selector.appendChild(this.fragment);
    }
  }, {
    key: 'renderMovies',
    value: function renderMovies(data) {
      var _this = this;

      this.fragment = document.createDocumentFragment();

      data.forEach(function (data) {
        var article = document.createElement('article');
        article.classList.add('movie');
        article.classList.add('col-md-4');
        article.innerHTML = (0, _movie2.default)(data);
        _this.fragment.appendChild(article);
      });
    }
  }, {
    key: 'clearList',
    value: function clearList(selector) {
      selector.innerHTML = '';
    }
  }, {
    key: 'sort',
    value: function sort(filter) {
      var data = [].concat(_toConsumableArray(this.data.results));
      if (filter === 'raiting-max') {
        this.sortByMaxRaiting(data);
        // console.log(data)
      }

      if (filter === 'raiting-min') {
        this.sortByMinRaiting(data);
      }

      if (filter === 'date-new') {
        this.sortByNew(data);
      }
      if (filter === 'date-old') {
        this.sortByOld(data);
      }
    }
  }, {
    key: 'sortByMaxRaiting',
    value: function sortByMaxRaiting(data) {
      data.sort(function (a, b) {
        if (a.popularity < b.popularity) {
          return 1;
        }
        if (a.popularity > b.popularity) {
          return -1;
        }
      });
      this.renderMovies(data);
      this.drawToDom(this.selector);
    }
  }, {
    key: 'sortByMinRaiting',
    value: function sortByMinRaiting(data) {
      data.sort(function (a, b) {
        if (a.popularity > b.popularity) {
          return 1;
        }
        if (a.popularity < b.popularity) {
          return -1;
        }
      });
      this.renderMovies(data);
      this.drawToDom(this.selector);
    }
  }, {
    key: 'sortByNew',
    value: function sortByNew(data) {
      data.sort(function (a, b) {
        if (new Date(a.release_date || a.first_air_date) < new Date(b.release_date || b.first_air_date)) {
          return 1;
        }

        if (new Date(a.release_date || a.first_air_date) > new Date(b.release_date || b.first_air_date)) {
          return -1;
        }
      });
      this.renderMovies(data);
      this.drawToDom(this.selector);
    }
  }, {
    key: 'sortByOld',
    value: function sortByOld(data) {
      data.sort(function (a, b) {
        if (new Date(a.release_date || a.first_air_date) > new Date(b.release_date || b.first_air_date)) {
          return 1;
        }

        if (new Date(a.release_date || a.first_air_date) < new Date(b.release_date || b.first_air_date)) {
          return -1;
        }
      });
      this.renderMovies(data);
      this.drawToDom(this.selector);
    }

    // hide () {
    //   this.selector.style.display = 'none'
    // }

  }]);

  return MovieList;
}();

exports.default = MovieList;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = movie;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function movie(data) {
  var mappingData = mapData(data);
  var html = '\n<a href=\'' + data.id + '\' class=\'movie-link\'>\n        <h2 class="movie-title">' + mappingData.title + '</h2>\n   </a>\n        <date class="date">' + mappingData.date + '</date>\n        <div class="country">' + mappingData.country + '</div>\n        <div class="picture"><img src=\'' + mappingData.img + '\'></div>\n        <div class="language">' + mappingData.language + '</div>\n        <div class="overview">' + mappingData.overview + '</div>\n        <div class="popularity">' + mappingData.popularity + '</div>                              \n        <div class="id">' + mappingData.id + '</div>                              \n';
  return html;
} //мапирование джейсона


function mapData(data) {
  var defaultValue = 'Unknown';
  return {
    title: data.title || data.name || defaultValue,
    date: data.release_date || data.first_air_date || defaultValue,
    country: data.origin_country || defaultValue,
    img: getPictureUrl(),
    language: data.origin_language || defaultValue,
    overview: data.overview || defaultValue,
    popularity: data.popularity || defaultValue,
    id: data.id //|| Date.now(),
  };

  function getPictureUrl() {
    var url = data.backdrop_path || data.poster_path;

    if (url) {
      return _config2.default.imageSrc + url;
    } else {
      return _config2.default.noImageSrc;
    }
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //мапирование джейсона
//отрисовка карточки


var listWrapper = document.querySelector('.list-wrapper');
var movieWrapper = document.querySelector('.movie-wrapper');

function renderMovie(data) {
  var mappingData = mapData(data);
  var html = '\n    <a class="back">Back</a>\n<!--<a href=\'' + data.id + '\' class=\'movie-link\'>-->\n        <h2 class="movie-title">' + mappingData.title + '</h2>\n <!--</a> -->\n        <date class="date">' + mappingData.date + '</date>\n        <div class="country">' + mappingData.country + '</div>\n        <div class="picture"><img src=\'' + mappingData.img + '\'></div>\n        <div class="language">' + mappingData.language + '</div>\n        <div class="overview">' + mappingData.overview + '</div>\n        <div>' + mappingData.popularity + '</div>                              \n        <div class="popularity">' + mappingData.popularity + '</div>  \n        <div class="episodesCount">' + mappingData.episodesCount + '</div>\n        <div class="seasonsCount">' + mappingData.seasonsCount + '</div>\n        <div class="homeUrl">' + mappingData.homeUrl + '</div>\n        <div class="id">' + mappingData.id + '</div>\n                                    \n    ';
  render(html);
}

function mapData(data) {
  var _ref;

  var defaultValue = 'Unknown';
  return _ref = {
    id: data.id,
    title: data.title || data.name || defaultValue,
    date: data.release_date || data.first_air_date || defaultValue,
    country: data.origin_country || defaultValue,
    img: getPictureUrl(),
    language: data.origin_language || defaultValue,
    overview: data.overview || defaultValue,
    popularity: data.popularity || defaultValue
  }, _defineProperty(_ref, 'id', data.id || Date.now()), _defineProperty(_ref, 'episodesCount', data.number_of_episodes), _defineProperty(_ref, 'seasonsCount', data.number_of_seasons), _defineProperty(_ref, 'homeUrl', data.homepage), _ref;

  function getPictureUrl() {
    var url = data.backdrop_path || data.poster_path;

    if (url) {
      return _config2.default.imageSrc + url;
    } else {
      return _config2.default.noImageSrc;
    }
  }
}

function render(html) {
  var element = document.createElement('article');

  element.classList.add('movie');
  element.innerHTML = html;
  movieWrapper.style.display = 'block';
  listWrapper.style.display = 'none';
  movieWrapper.innerHTML = '';
  movieWrapper.appendChild(element);
  var backButton = document.querySelector('.back');
  backButton.addEventListener('click', back);
}

function back() {
  listWrapper.style.display = 'block';
  movieWrapper.style.display = 'none';
}

exports.default = {
  renderMovie: renderMovie,
  back: back
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVideoByText(text) {
  if (!text) {
    return;
  }
  return fetch(_config2.default.searchMovieUrl + text).then(function (r) {
    return r.json();
  });
} //методы получения объектов с сервера


function getVideoById(id) {
  var url = '' + _config2.default.baseMovieUrl + _config2.default.queryMovieById + id + _config2.default.apiKey;

  return fetch(url).then(function (r) {
    return r.json();
  });
}

exports.default = {
  getVideoByText: getVideoByText,
  getVideoById: getVideoById
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoResults = infoResults;
exports.infoResultsPages = infoResultsPages;
exports.infoPage = infoPage;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function infoResults(data) {
  return data.total_results;
}
function infoResultsPages(data) {
  return data.total_pages;
}
function infoPage(data) {
  return data.page;
}

//
// export default {
//   infoResults,
//   infoResultsPages,
//   infoPage,
// }

/***/ })
/******/ ]);