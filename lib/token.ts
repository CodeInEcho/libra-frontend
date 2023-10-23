import axios from 'axios'
import jwt from 'jsonwebtoken'

let isRefreshing = false
let access_token = null as string | null
let refreshPromise: null | Promise<any> = null;

export function setAccessToken(token: string | null) {
  access_token = token;
  isRefreshing = false;
  refreshPromise = null;
}

export function getAccessToken() {
  return access_token;
}

export const checkTokenValidity = async () => {
  let token = getAccessToken();
  if (token) {
    const decoded = jwt.decode(token) as any;
    if (decoded && Date.now() > decoded?.exp * 1000) {
      const data = await refreshToken();
      token = data?.data?.access_token;
      setAccessToken(token)
    }
    return token;
  } else {
    const data = await refreshToken();
    token = data?.data?.access_token;
    setAccessToken(token)
    return token;
  }
}

export const refreshToken = async () => {
  if (isRefreshing) return refreshPromise;
  isRefreshing = true;
  refreshPromise = axios.get('/api/token');
  return refreshPromise;
}