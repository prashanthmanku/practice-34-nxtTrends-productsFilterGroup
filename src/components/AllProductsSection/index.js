import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]
const requestStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}
class AllProductsSection extends Component {
  state = {
    productsList: [],
    requestStatus: requestStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    activeCategoryId: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      requestStatus: requestStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      activeRatingId,
      activeCategoryId,
      searchInput,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        requestStatus: requestStatusConstants.success,
      })
    } else {
      this.setState({requestStatus: requestStatusConstants.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeCategory = id => {
    this.setState({activeCategoryId: id}, this.getProducts)
  }

  changeSearchInputText = text => {
    this.setState({searchInput: text})
  }

  getSearchResults = key => {
    if (key === 'Enter') {
      this.getProducts()
    }
  }

  ChangeRating = id => {
    this.setState({activeRatingId: id}, this.getProducts)
  }

  clearAllFilters = () => {
    this.setState(
      {
        activeOptionId: '',
        activeRatingId: '',
        activeCategoryId: '',
        searchInput: '',
      },
      this.getProducts,
    )
  }

  renderNoProductsView = () => (
    <div className="no-products-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
        className="no-products-img"
      />
      <h1 className="no-products-view-heading">No Products Found</h1>
      <p className="no-products-view-description">
        We could not find any products. Try other filters.
      </p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId, requestStatus} = this.state

    // TODO: Add No Products View
    if (
      productsList.length === 0 &&
      requestStatus === requestStatusConstants.success
    ) {
      return this.renderNoProductsView()
    }
    console.log(productsList.length)
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="no-products-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="no-products-img"
      />
      <h1 className="no-products-view-heading">Oops! Something Went Wrong</h1>
      <p className="no-products-view-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderOutputView = () => {
    const {requestStatus} = this.state
    switch (requestStatus) {
      case requestStatusConstants.success:
        return this.renderProductsList()
      case requestStatusConstants.inProgress:
        return this.renderLoader()
      case requestStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeCategoryId, searchInput, activeRatingId} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          changeCategory={this.changeCategory}
          activeCategoryId={activeCategoryId}
          changeSearchInputText={this.changeSearchInputText}
          searchInput={searchInput}
          ratingsList={ratingsList}
          ChangeRating={this.ChangeRating}
          activeRatingId={activeRatingId}
          clearAllFilters={this.clearAllFilters}
          getSearchResults={this.getSearchResults}
        />

        {/* {isLoading ? this.renderLoader() : this.renderProductsList()} */}

        {this.renderOutputView()}
      </div>
    )
  }
}

export default AllProductsSection
