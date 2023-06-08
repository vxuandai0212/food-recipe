const parser = require('node-html-parser')
const fs = require('fs')
const axios = require('axios')

/**
 * Output của processHtml
 * content: Nội dung html mới
 *          Thêm các thuộc tính này cho img
 *              data-bucket="notification"
 *              data-object="TEST/template/kurama.png"
 *              data-filename="kurama.png"
 *              data-content-type="image/png"
 * attachments: [
 *   {
 *     payload,
 *     size,
 *     object,
 *     bucket
 * ]
 */

async function processHtml() {
  const htmlContent = await getHtmlContent()
  await processImage(htmlContent).then(res => console.log(res))
}

function processImage(htmlContent) {
  return new Promise((resolve, reject) => {
    const result = {
      content: '',
      attachments: []
    }
    const bucket = 'notify'
    const appCode = 'VTS'
    const storageDomain = 'template'
    const templateId = 123
    const root = parser.parse(htmlContent)
    const imgs = root.querySelectorAll('img')
    const promises = [];
    for (let i = 0; i < imgs.length; ++i) {
      const img = imgs[i]
      promises.push(downloadImageToBase64(img).then(res => {
        const image = res.image
        const filename = res.filename
        const contentType = res.contentType
        const contentLength = res.contentLength
        const object = `${appCode}/${storageDomain}/${templateId}/${filename}`
        const attachment = {}
        attachment.payload = image
        attachment.size = contentLength
        attachment.object = object
        attachment.bucket = bucket

        result.attachments.push(attachment)
        setImageAttributes(img, bucket, object, filename, contentType)
      }))
    }

    Promise.all(promises).then(() => {
      result.content = root.toString()
      resolve(result)
    })
  })
}

function setImageAttributes(img, bucket, object, filename, contenttype) {
  return new Promise((resolve, reject) => {
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
    axios.get(img_url, { responseType: 'arraybuffer' })
      .then(function(response) {
        const image = Buffer.from(response.data).toString('base64')
        const resp = {
          image,
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

function getHtmlContent() {
  return new Promise(function(resolve, reject) {
    fs.readFile(__dirname + '/mock/unlayer.html', (error, data) => {
      if (error) {
        reject(error)
      }
      const htmlContent = data.toString()
      resolve(htmlContent)
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
  const pattern = new RegExp('[\d|a-z|A-Z|\-|_|0-9]');
  output = output.filter(char => pattern.test(char))
  return output.join('')
}

processHtml()
