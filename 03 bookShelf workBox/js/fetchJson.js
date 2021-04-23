const statusResponse = response => {
  if (response.status !== 200) {
      console.log(`Error : ${response.status}`)
      return Promise.reject(new Error(response.statusText));
  } else {
      return Promise.resolve(response);
  }
}

const json = response => {
  return response.json();
}

const error = error => {
  console.log(`Error: ${error}`);
  document.querySelector('#articles').innerHTML = `${error}`;
}

module.exports = { statusResponse, json, error};