const listMessage = [
  {
    'id': 15587,
    'contactId': 798478,
    'status': 3,
    'fullname': 'Phạm Văn Hòa',
    'employeeCode': '190394',
    'email': 'hoapv12@viettel.com.vnfasd',
    'phone': '0981328388'
  },
  {
    'id': 15588,
    'contactId': 798914,
    'status': 3,
    'fullname': 'Lê Văn Việt',
    'employeeCode': '190873',
    'email': 'vietlv2@viettel.com.vn',
    'phone': '0349651992'
  },
  {
    'id': 15589,
    'contactId': 883449,
    'status': 3,
    'fullname': 'Lê Mạnh Hùng',
    'employeeCode': '241173',
    'email': 'hunglm25@viettel.com.vn',
    'phone': '0968302155'
  },
  {
    'id': 15590,
    'contactId': 886043,
    'status': 3,
    'fullname': 'Nguyễn Thị Thoa',
    'employeeCode': '244105',
    'email': 'thoant32@viettel.com.vn',
    'phone': '0967189290'
  },
  {
    'id': 15591,
    'contactId': 887602,
    'status': 3,
    'fullname': 'Vương Xuân Đại',
    'employeeCode': '245742',
    'email': 'daivx1@viettel.com.vn',
    'phone': '0375509533'
  },
  {
    'id': 15592,
    'contactId': 889415,
    'status': 3,
    'fullname': 'Nguyễn Hoàng Khôi',
    'employeeCode': '247587',
    'email': 'khoinh4@viettel.com.vn',
    'phone': '0367789599'
  },
  {
    'id': 15593,
    'contactId': 901682,
    'status': 2,
    'fullname': 'Nguyễn Quang Huy',
    'employeeCode': '263480',
    'email': 'huynq79@viettel.com.vn',
    'phone': '0964010516'
  },
  {
    'id': 15594,
    'contactId': 908507,
    'status': 2,
    'fullname': 'Trần Mỹ Duyên',
    'employeeCode': '270970',
    'email': 'duyentm1@viettel.com.vn',
    'phone': '0378851729'
  },
  {
    'id': 15595,
    'contactId': 911049,
    'status': 1,
    'fullname': 'Vũ Ngọc Sáng',
    'employeeCode': '273655',
    'email': 'sangvn1@viettel.com.vn',
    'phone': '0397709098'
  }
]

let totalSuccess = 0
let totalFail = 0
let totalSending = 0

listMessage.map(m => {
  if (m.status === 3) {
    totalSuccess += 1
  } else if (m.status === 2) {
    totalFail += 1
  } else if (m.status === 1) {
    totalSending += 1
  }
})

console.log(totalSuccess)
console.log(totalFail)
console.log(totalSending)

const successRate = (totalSuccess / listMessage.length) * 100
console.log(Math.round((totalSuccess / listMessage.length) * 100))
