import axios from "axios";
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CONTENT = 'FETCH_CONTENT';
export const FETCH_STORY = 'FETCH_STORY';

const API_ROOT_URL = "https://api-gw-dev.radio-canada.ca/aggregate-content/v1/";

export function fetchCategories() {
  var request = axios.get(`${API_ROOT_URL}/categories`);

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }; 

}

export function fetchContent(id) {
  var request = axios.get(`${API_ROOT_URL}/items?pageSize=20&page=1&categoryIds=${id}`);

  return {
    type: FETCH_CONTENT,
    payload: request
  }
}

export function fetchStory(id) {
  var request = axios.get(`http://www.cbc.ca/json/cmlink/${id}`);

  return {
    type: FETCH_STORY,
    payload: request
  }
}



