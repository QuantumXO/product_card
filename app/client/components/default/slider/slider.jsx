
import './_slider.sass';

import React, {Component} from 'react';

import LinkWrap from './../LinkWrap';
import Currency from './../currency';
import RatingStars from './../rating/ratingStars';

const bucket =
    (
        <svg viewBox="0 0 40 40" width="60">
            <path d="M0.5 4.5C0.5 3.67157 1.17157 3 2 3H5.4264C7.29819 3 8.97453 4.15869 9.63602 5.9097L10.4264 8.00178C10.4503 8.00062 10.4745 8.00002 10.4987 8L34.0093 7.98001C37.2162 7.97728 39.3967 11.2342 38.1722 14.1982L34.3031 23.5639C33.8485 24.6643 32.8658 25.4581 31.6944 25.6711L18.7279 28.0286C16.5907 28.4172 14.481 27.2236 13.7133 25.1915L6.8296 6.9699C6.60911 6.38623 6.05033 6 5.4264 6H2C1.17157 6 0.5 5.32843 0.5 4.5ZM11.5587 10.9991L16.5197 24.1313C16.7756 24.8087 17.4789 25.2065 18.1913 25.077L31.1577 22.7195C31.3251 22.689 31.4655 22.5756 31.5304 22.4184L35.3995 13.0527C35.8077 12.0648 35.0809 10.9791 34.0119 10.98L11.5587 10.9991Z" />
            <circle cx="13.5" cy="34" r="3" />
            <circle cx="31.5" cy="34" r="3" />
        </svg>
    );

export default class Slider extends Component {
    constructor(props){
        super(props);

        const {arrows, data} = this.props;

        this.state = {
            data: data || [],
            arrows: true,
            autoScroll: false,
            firstSlideIndex: 1,
            stopOnHover: true,
            currentSlidesSetIndex: 1,
            slidesNumber: data.length || 4,
            sliderListWidth: 0,
            slidesToShow: 4,
            slidesToScroll: 1,
            slideWidth: 275,
            itemOffsetLeft: 50,
            sliderOffset: 0,
        };

        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);

        this.sliderRef = React.createRef();
        this.sliderItemsRef = React.createRef();
    }

    componentDidMount() {

        const sliderNode = this.sliderRef.current;
        const sliderWidth = sliderNode.offsetWidth;
        const slideNode = this.sliderItemsRef.current;
        const slideWidth = slideNode.offsetWidth;

        const slidesToShow = this.state.slidesToShow;

        const itemOffsetLeft = (sliderWidth - (slideWidth * slidesToShow)) / (slidesToShow - 1);

        this.setState(() => ({
            sliderListWidth: sliderWidth,
            slideWidth: slideWidth,
            itemOffsetLeft: itemOffsetLeft,
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.data !== prevProps.data) {
            this.setState(() => ({
                data: this.props.data,
            }));
        }
    }

    addToCart(id){
        this.props.addToCartFunc(id, 1, this.props.history)
    }

    prevSlide(){
        if(this.state.currentFirstSlideIndex > 0){
            this.setState(() => ({
                currentFirstSlideIndex: this.state.currentFirstSlideIndex - 1,
            }))
        }
    }

    nextSlide(){

        const {currentFirstSlideIndex, data, slideWidth, slidesToScroll, sliderOffset, slidesToShow, sliderWidth, currentSlidesSetIndex} = this.state;

        if(data.length > slidesToShow && (currentSlidesSetIndex * slidesToShow < data.length)){
            this.setState(() => ({
                currentSlidesSetIndex: currentSlidesSetIndex + 1,
                sliderOffset: slidesToScroll == 1 ? (sliderOffset + -(sliderWidth / slidesToShow)) : -currentFirstSlideIndex * slideWidth
            }))
        }
    }

    render(){

        const {classList, data, id, currency} = this.props;

        const navWrap = this.state.arrows ?
            (
                <div className="slider__nav">
                    <span className="arrow arrow--prev" onClick={this.prevSlide} />
                    <span className="arrow arrow--next" onClick={this.nextSlide} />
                </div>
            ) : null;

        const sliderBody = data.map((item, index) => {

            const {title, id, price, images, old_price, rating} = item;

            const oldPrice = old_price ?
                (
                    <div className="price--old">
                        <Currency currency={currency} />
                        <span className="value">{old_price}</span>
                    </div>
                ) : '';

            const discount = item.discount > 0 ?
                (
                    <span className="slider__item__discount">-{item.discount} %</span>
                ) : '';

            return (
                <li className="slider__item" key={index} ref={this.sliderItemsRef} style={index > 0 ? {left: (this.state.itemOffsetLeft + this.state.slideWidth) * index } : null }>
                    <div className="slider__item__header">
                        {discount}
                        <img src={images[0]} className="slider__item__image" alt={title} />
                        <span className="slider__item__cart" onClick={this.addToCart.bind(this, id)}>{bucket}</span>

                    </div>
                    <div className="slider__item__footer">
                        <LinkWrap
                            url={'product/' + id}
                            classList="slider__item__title"
                            title={title}
                        />
                        <div className="slider__item__price">
                            <div className={discount > 0 ? "price--new" : "price--default"}>
                                <Currency currency={currency} />
                                <span className="value">{price}</span>
                            </div>
                            {oldPrice}
                        </div>
                        <RatingStars rating={rating} />
                    </div>
                </li>
            );
        });

        return(

            <div id={id || null} className={"slider" + (classList && ' ' + classList)} ref={this.sliderRef}>
                {navWrap}
                <ul className={'slider__list'} style={{marginLeft: this.state.sliderOffset, width: 0}}>
                    {sliderBody}
                </ul>
            </div>

        )
    }
}

