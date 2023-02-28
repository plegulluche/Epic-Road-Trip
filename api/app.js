const sdk = require('api')('@fsq-developer/v1.0#2ehz6bc12len5ghzp');

sdk.auth('fsq3I4zOjYBfvuaMcmztwjFFjyGLCRP84f05zC9vt3Zjsao=');
sdk.placeSearch({near: 'montrouge'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));