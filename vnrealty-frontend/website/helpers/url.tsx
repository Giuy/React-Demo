import { IncomingMessage } from 'http'
import qs from 'query-string'
import { ROUTES } from '../constants/routes'

export function getFullUrl(req: IncomingMessage, fallback: string = '') {
//server side request object(req)
    if(req) {
      return `https://${req.headers.host}${req.url}`
      
    } //making sure we are on the client side
    else if(!(typeof window === 'undefined')) {
      return window.location.href
      
    } else {
      return fallback
    }
}

export function getListingDetailUrl(slug: string) {
    return ROUTES.LISTING.SINGLE_LISTING.replace('{slug}', slug)
}

export function getNewsDetailUrl(slug: string) {
  return ROUTES.NEWS.SINGLE_NEWS.replace('{slug}', slug)
}