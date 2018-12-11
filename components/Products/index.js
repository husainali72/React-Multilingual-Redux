import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { LIST_PRODUCTS } from '../../redux/constants';
import { translationText } from '../../helpers';
import { productListType, translationType } from '../../types';

class Products extends Component {
  static propTypes = {
    products: productListType.isRequired,
    hbwText: translationType.isRequired,
    showButton: PropTypes.bool,
    getProductList: PropTypes.func.isRequired,
    selectedId: PropTypes.number,
    selectedSlug: PropTypes.string,
    onSelect: PropTypes.func,
    loading: PropTypes.number,
  };

  static defaultProps = {
    showButton: false,
    selectedId: -1,
    selectedSlug: '',
    onSelect: null,
    loading: -1,
  };

  componentDidMount() {
    const { getProductList, products } = this.props;
    if (!products.length) {
      getProductList({ grade: 0 });
    }
  }

  onProductSelect = (product) => {
    if (this.props.onSelect) this.props.onSelect(product);
  };

  render() {
    const { products, showButton, hbwText, selectedId, selectedSlug, loading } = this.props;
    const locale = localStorage.language || 'ar';

    return (
      <div className="products-row">
        {!!products.length &&
          products.map((product, index) => (
            <div
              className={classNames('animated', 'fadeIn', 'product-item', product.slug, {
                active: product.id === selectedId || product.slug === selectedSlug,
                clickable: !!this.props.onSelect,
              })}
              key={index}
            >
              <div className="image-wrapper">
                <img
                  onClick={() => this.onProductSelect(product)}
                  src={product.image_thumbnail_uri || '/assets/images/default-product-img.png'}
                  alt="product"
                />
                {loading === product.id && <span className="hbw-btn-loader" />}
              </div>
              <div className="app-name">
                {locale !== 'en' ? product.name : translationText(hbwText, `product.${product.slug}Name`)}
              </div>
              {showButton && (
                <div className="product-item-link">
                  <a className="hbw-btn hbw-btn-primary hbw-btn-small">
                    {translationText(hbwText, 'dashboard.enterInProduct')}
                  </a>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  products: state.toJS().folder.products,
  user: state.toJS().user.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  getProductList: payload => dispatch({ type: LIST_PRODUCTS.REQUEST, payload }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Products),
);
