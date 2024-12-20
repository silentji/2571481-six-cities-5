import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { OfferGallery } from './offer-gallery';
import Header from '@components/header';
import { ReviewForm } from '@components/review-form';
import ReviewsList from '@components/reviews-list';
import Map from '@components/map';
import OffersList from '@components/offers-list';
import Footer from '@components/footer';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { AppRoute, AuthStatus, CardType, PlaceTypes } from '@const';
import { OfferForMap } from '@appTypes/offer';
import { editFavoritesAction, fetchSingleOfferAction } from '@store/api-actions';
import LoadingScreen from '@pages/loading-screen/loading-screen';
import { getNearbyOffers, getReviews, getSingleOffer, getSingleOfferDataLoadingStatus } from '@store/single-offer-data/single-offer-data.selectors';
import { getAuthStatus } from '@store/user-process/user-process.selectors';
import { redirectToRoute } from '@store/action';

function OfferPage(): JSX.Element {

  const offerId = useParams<{ id: string }>().id as string;
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.OFFERS.offersList);

  useEffect(() => {
    if (offerId) {
      const isOfferValid = offers.some((offer) => offer.id === offerId);

      if (isOfferValid) {
        dispatch(fetchSingleOfferAction({ offerId }));
      } else {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
    }
  }, [offerId, offers, dispatch]);

  const isAuth = useAppSelector(getAuthStatus) === AuthStatus.Auth;
  const reviews = useAppSelector(getReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const curentOffer = useAppSelector(getSingleOffer);

  const isDataLoading = useAppSelector(getSingleOfferDataLoadingStatus);
  if (!curentOffer || isDataLoading) {
    return <LoadingScreen/>;
  }

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isAuth) {
      dispatch(editFavoritesAction({
        offerId: curentOffer.id,
        isFavorite: !curentOffer.isFavorite
      }));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

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
                <button className={`offer__bookmark-button${curentOffer.isFavorite ? '--active' : ''} button`} type="button" onClick={handleClick}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  {curentOffer.isFavorite ?
                    <span className="visually-hidden">In bookmarks</span> :
                    <span className="visually-hidden">To bookmarks</span>}
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${Math.round(curentOffer.rating) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{curentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {PlaceTypes[curentOffer.type]}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${curentOffer.bedrooms} Bedroom${curentOffer.bedrooms > 1 ? 's' : ''}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${curentOffer.maxAdults} Adult${curentOffer.maxAdults > 1 ? 's' : ''}`}
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
                  <div className={`offer__avatar-wrapper ${curentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : 'user__avatar-wrapper'}`}>
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
                {isAuth && <ReviewForm offerId={offerId}/>}
              </section>
            </div>
          </div>
          <Map city={curentOffer.city} offers={[...nearbyOffers, curentOffer]} selectedOffer={curentOffer as OfferForMap} className={'offer__map'} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} onActiveOfferChange={()=>{}} cardType={CardType.Nearby} className='near-places__list places__list'/>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default OfferPage;
