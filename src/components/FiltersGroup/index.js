import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    changeCategory,
    changeSearchInputText,
    activeCategoryId,
    searchInput,
    ratingsList,
    ChangeRating,
    activeRatingId,
    clearAllFilters,
    getSearchResults,
  } = props

  const rendercategories = () =>
    categoryOptions.map(each => {
      const categoryClassName =
        activeCategoryId === each.categoryId
          ? 'category-name-btn selected-category'
          : 'category-name-btn'

      const onChangeCategory = () => {
        changeCategory(each.categoryId)
      }
      return (
        <li className="category-item" key={each.categoryId}>
          <p
            className={categoryClassName}
            // type="button"
            onClick={onChangeCategory}
          >
            {each.name}
          </p>
        </li>
      )
    })

  const renderRatings = () =>
    ratingsList.map(each => {
      const ratingClassName =
        each.ratingId === activeRatingId ? 'up-text selected-rating' : 'up-text'

      const onClickRating = () => {
        ChangeRating(each.ratingId)
      }

      return (
        <li className="rating-item" key={each.ratingId}>
          <button type="button" className="rating-btn" onClick={onClickRating}>
            <img
              src={each.imageUrl}
              alt={`rating ${each.ratingId}`}
              className="rating-img"
            />
            <p className={ratingClassName}>& up</p>
          </button>
        </li>
      )
    })

  const onChangeSearchInput = e => {
    changeSearchInputText(e.target.value)
  }

  const onEnterSearch = e => {
    getSearchResults(e.key)
  }

  const onClearFilters = () => {
    clearAllFilters()
  }

  return (
    <div className="filters-group-container">
      {/* <h1>Filters Group</h1> */}
      {/* Replace this element with your code */}
      <div className="search-input-container">
        <input
          type="search"
          className="search-input-field"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearch}
        />

        <BsSearch className="search-icon" />
      </div>
      <h1 className="category-text">Category</h1>
      <ul className="category-list-container">{rendercategories()}</ul>
      <h1 className="category-text">Rating</h1>
      <ul className="rating-list-container">{renderRatings()}</ul>
      <button
        type="button"
        className="clear-filters-btn"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
