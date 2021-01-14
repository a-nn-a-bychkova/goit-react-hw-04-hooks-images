function fetchImage(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=19110749-e340c63922b3f8a4d502270f7&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => response.json());
}

const api = { fetchImage };
export default api;
