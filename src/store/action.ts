import { createAction } from '@reduxjs/toolkit';
import { Offers, SingleOffer } from '@appTypes/offer';
import { Reviews } from '@appTypes/review';
import { City } from '@appTypes/city';
import { AuthStatus } from '@const';
import { User } from '@appTypes/user';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const changeCity = createAction<City>('city/changeCity');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setUser = createAction<User>('user/setUser');
export const setNearbyOffers = createAction<Offers>('offers/setNearbyOffers');
export const setFavoriteOffers = createAction<Offers>('offers/setFavoriteOffers');
export const setSingleOffer = createAction<SingleOffer>('offers/setSingleOffer');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setSingleOfferDataLoadingStatus = createAction<boolean>('data/setSingleOfferDataLoadingStatus');
export const requireAuth = createAction<AuthStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<string>('engine/redirectToRoute');
