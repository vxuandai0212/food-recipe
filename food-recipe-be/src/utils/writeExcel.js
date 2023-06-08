const Excel = require('exceljs')
const faker = require('faker')
const moment = require('moment')

async function exTest() {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('Danh sách thuê bao')

  worksheet.columns = [
    { header: 'Địa chỉ email', key: 'email', width: 10 },
    { header: 'Họ và tên', key: 'name', width: 32 },
    { header: 'Ngày sinh', key: 'dob', width: 15 },
    { header: 'Địa chỉ', key: 'address', width: 15 }
  ]

  for (let i = 1; i <= 60000; i++) {
    const email = faker.internet.email()
    const name = faker.name.findName()
    const dob = moment(faker.date.past()).format('DD/MM/Y')
    const address = faker.address.streetAddress()
    worksheet.addRow({ id: i, email, name, dob, address })
  }

  // save under export.xlsx
  await workbook.xlsx.writeFile('Danh sách thuê bao.xlsx')

  console.log('File is written')
}

exTest()
