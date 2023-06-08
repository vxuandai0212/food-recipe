import axios from 'axios'
import * as parser from 'node-html-parser'

export function processTemplate(htmlContent, bucket, storageDomain) {
  return new Promise((resolve) => {
    const result = {
      content: '',
      attachments: []
    }
    const root = parser.parse(htmlContent)
    const imgs = root.querySelectorAll('img')
    const promises = []
    for (let i = 0; i < imgs.length; ++i) {
      const img = imgs[i]
      promises.push(
        downloadImageToBase64(img).then(res => {
          const image = res.image
          const filename = res.filename
          const contentType = res.contentType
          const object = `${storageDomain}/${filename}`
          const attachment = {}
          attachment.payload = image
          attachment.object = object
          attachment.bucket = bucket
          attachment.contentType = contentType

          result.attachments.push(attachment)
          setImageAttributes(img, bucket, object, filename, contentType)
        })
      )
    }

    Promise.all(promises)
      .then(() => {
        result.content = root.toString()
        resolve(result)
      })
      .catch(err => console.log(err))
  })
}

function setImageAttributes(img, bucket, object, filename, contenttype) {
  return new Promise((resolve) => {
    img.setAttribute('data-bucket', bucket)
    img.setAttribute('data-object', object)
    img.setAttribute('data-filename', filename)
    img.setAttribute('data-content-type', contenttype)
    resolve(img)
  })
}

function downloadImageToBase64(img) {
  const img_url = img.getAttribute('src')
  const filename = getFilenameFromUrl(img_url)
  return new Promise((resolve, reject) => {
    axios
      .get(img_url, {
        responseType: 'arrayBuffer'
      })
      .then(function(response) {
        const resp = {
          image: img_url,
          filename,
          contentType: response.headers['content-type'],
          contentLength: response.headers['content-length']
        }
        resolve(resp)
      })
      .catch(function(error) {
        reject(error)
      })
  })
}

function getFilenameFromUrl(url) {
  const file = url.split('/').slice(-1)[0]
  const filenameArr = file.split('.')
  let filename = filenameArr[0]
  const extension = filenameArr[1]
  filename = removeSpecialCharacters(filename)
  return filename + new Date().getTime() + '.' + extension
}

function removeSpecialCharacters(input) {
  let output = input.split('')
  const pattern = new RegExp('[d|a-z|A-Z|-|_|0-9]')
  output = output.filter(char => pattern.test(char))
  return output.join('')
}
