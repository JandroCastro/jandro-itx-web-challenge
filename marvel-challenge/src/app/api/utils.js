import axios from "axios";
import md5 from "md5";
import { setupCache } from "axios-cache-interceptor";

export const BASE_URL = "https://gateway.marvel.com/v1/public/characters";

export const generateHash = () => {
  const timestamp = new Date().toISOString();
  const hash = md5(
    timestamp +
      process.env.NEXT_PUBLIC_MARVEL_PRIVATE_API_KEY +
      process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY
  );

  return { timestamp, hash };
};

export const getMarvelParams = (additionalParams = {}) => {
  const { timestamp, hash } = generateHash();

  return {
    ts: timestamp,
    apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY,
    hash: hash,
    ...additionalParams,
  };
};

const instance = axios.create();
const axiosWithCache = setupCache(instance, {
  maxAge: 15 * 60 * 1000,
});

export const api = axiosWithCache.create({
  baseURL: BASE_URL,
});
