const getPeople = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => console.log('>>>', data))
    .catch(error => console.error('error: ', error));
};

export default {
  getPeople
}