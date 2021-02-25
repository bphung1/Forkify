import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1, and there are other pages
    if (curPage === 1 && numPages) {
      return this.#renderButton(curPage + 1, 'right', 'next');
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return this.#renderButton(curPage - 1, 'left', 'prev');
    }

    //other page (between 1 and the last page)
    if (curPage < numPages) {
      return (
        this.#renderButton(curPage - 1, 'left', 'prev') +
        this.#renderButton(curPage + 1, 'right', 'next')
      );
    }

    //page 1 and there are no other pages
    return '';
  }

  #renderButton(curPage, direction, arrow) {
    return `
        <button data-goto="${curPage}" class="btn--inline pagination__btn--${arrow}">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${direction}"></use>
            </svg>
            <span>Page ${curPage}</span>
        </button>
    `;
  }
}

export default new PaginationView();
