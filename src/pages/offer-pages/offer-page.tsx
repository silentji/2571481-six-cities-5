import { Header } from '@components/header';
import ReviewForm from '@components/review-form';
import ReviewsList from '@components/reviewsList';
import { Helmet } from 'react-helmet-async';
import Map from '@components/map';
import { OffersList } from '@components/offersList';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { AuthStatus } from '@const';
import { OfferForMap, SingleOffer } from '@appTypes/offer';
import { OfferGallery } from './offerGallery';
import { fetchSingleOfferAction } from '@store/api-actions';
import { useParams } from 'react-router-dom';
import { LoadingScreen } from '@pages/loading-screen/loading-screen';
import { useEffect } from 'react';


export function OfferPage(): JSX.Element {

  const offerId = useParams<{ id: string }>().id as string;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (offerId) {
      dispatch(fetchSingleOfferAction({ offerId }));
    }
  }, [offerId, dispatch]);

  const offers = useAppSelector((state) => state.offersList);
  const reviews = useAppSelector((state) => state.reviews);
  const cityName = useAppSelector((state) => state.city.name);
  const curentOffer = useAppSelector((state) => state.singleOffer) as SingleOffer;
  const isAuthorised = useAppSelector((state) => state.authStatus) === AuthStatus.Auth;

  const isDataLoading = useAppSelector((state) => state.isSingleOfferDataLoading);
  if (!curentOffer || isDataLoading) {
    return <LoadingScreen/>;
  }

  const nearbyOffers = offers.filter(
    (offer) => offer.city.name === cityName && offer.id !== offerId
  ).slice(0, 3);

  return (
    <div className="page">
      <Helmet>
        <title>Rent Offer {offerId}</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery/>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {curentOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{curentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${curentOffer.rating * 100 / 5}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{curentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {curentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {curentOffer.bedrooms}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {curentOffer.maxAdults}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{curentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  { curentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={`good-${good}`}>
                      {good}
                    </li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={curentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {curentOffer.host.name}
                  </span>
                  {curentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {curentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>
                {isAuthorised && <ReviewForm offerId={offerId}/>}
              </section>
            </div>
          </div>
          <Map city={curentOffer.city} offers={offers} selectedOffer={curentOffer as OfferForMap} className={'offer__map'} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} onActiveOfferChange={()=>{}} className='near-places__list places__list'/>
          </section>
        </div>
      </main>
    </div>
  );
}
