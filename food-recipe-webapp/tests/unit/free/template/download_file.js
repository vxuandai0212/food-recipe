const axios = require('axios')

const img_url = 'https://i.imgur.com/Gzv0VyXb.jpg'

// axios.get(img_url, { responseType: 'arraybuffer' })
//         .then(function (response) {
//             const image = Buffer.from(response.data, 'binary').toString('base64')
//             console.log(response.data.toString('base64'))
//             console.log(response.headers['content-type'])
//             console.log(response.headers['content-length'])
//         })
//         .catch(function (error) {
//             console.log(error)
//         })

axios.get(img_url, { responseType: 'blob' })
  .then(function(response) {
    const blob = new Blob([response.data])
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      var base64data = reader.result;
      console.log(base64data);
    }
  })
  .catch(function(error) {
    console.log(error)
  })
