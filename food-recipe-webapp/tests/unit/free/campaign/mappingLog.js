const _ = require('lodash')
const logs = [
  {
    'campaignId': 1470,
    'type': 1,
    'message': 'Chỉnh sửa lần cuối vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi admin',
    'createdAt': 2609893018000
  },
  {
    'campaignId': 1470,
    'type': 1,
    'message': 'Chỉnh sửa lần cuối vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi Vương Xuân Đại',
    'createdAt': 1609893072000
  },
  {
    'campaignId': 1470,
    'type': 2,
    'message': 'Bắt đầu gửi từ Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH',
    'createdAt': 1609893106000
  },
  {
    'campaignId': 1470,
    'type': 3,
    'message': 'Đã gửi cho 30 người vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH',
    'createdAt': 1609893193000
  },
  {
    'campaignId': 1470,
    'type': 4,
    'message': 'Chuẩn bị gửi vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi admin',
    'createdAt': 1609893260000
  },
  {
    'campaignId': 1470,
    'type': 4,
    'message': 'Chuẩn bị gửi vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi Vương Xuân Đại',
    'createdAt': 1609893293000
  },
  {
    'campaignId': 1453,
    'type': 2,
    'message': 'Bắt đầu gửi từ Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH',
    'createdAt': 1609964182000
  },
  {
    'campaignId': 1453,
    'type': 1,
    'message': 'Chỉnh sửa lần cuối vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi admin',
    'createdAt': 1609964249000
  },
  {
    'campaignId': 1471,
    'type': 1,
    'message': 'Chỉnh sửa lần cuối vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi admin',
    'createdAt': 1609964288000
  },
  {
    'campaignId': 1471,
    'type': 4,
    'message': 'Chuẩn bị gửi vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi Vương Xuân Đại',
    'createdAt': 1609964313000
  },
  {
    'campaignId': 1475,
    'type': 3,
    'message': 'Đã gửi cho 30 người vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH',
    'createdAt': 1609964363000
  },
  {
    'campaignId': 1475,
    'type': 1,
    'message': 'Chỉnh sửa lần cuối vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi admin',
    'createdAt': 1609964380000
  },
  {
    'campaignId': 1475,
    'type': 2,
    'message': 'Bắt đầu gửi từ Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH',
    'createdAt': 1609964396000
  },
  {
    'campaignId': 1472,
    'type': 1,
    'message': 'Chỉnh sửa lần cuối vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi admin',
    'createdAt': 1609964560000
  }
]

const expectedResult = {
  1475: {
    1: {
      message: 'Chỉnh sửa lần cuối vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi admin',
      createdAt: 1
    },
    2: {
      message: 'Bắt đầu gửi từ Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH',
      createdAt: 1
    },
    3: {
      message: 'Đã gửi cho 30 người vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH',
      createdAt: 1
    },
    4: {
      message: 'Chuẩn bị gửi vào Thứ hai, ngày 13 Tháng 07 năm 2020 08:51 CH bởi admin',
      createdAt: 1
    }
  }
}

const CAMPAIGN_LOG_TYPE = {
  UPDATE: 1,
  SENDING: 2,
  SENT: 3,
  SCHEDULE: 4
}

const campaignLogByCampaignIds = _.reduce(logs, function(r, log) {
  r[log.campaignId] = r[log.campaignId] || {}

  r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE] = r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE] || {}
  r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].createdAt = r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].createdAt || 0

  r[log.campaignId][CAMPAIGN_LOG_TYPE.SENDING] = r[log.campaignId][CAMPAIGN_LOG_TYPE.SENDING] || {}

  r[log.campaignId][CAMPAIGN_LOG_TYPE.SENT] = r[log.campaignId][CAMPAIGN_LOG_TYPE.SENT] || {}

  r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE] = r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE] || {}
  r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].createdAt = r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].createdAt || 0

  const message = log.message
  const createdAt = log.createdAt
  const logType = log.type

  if (logType === CAMPAIGN_LOG_TYPE.UPDATE) {
    const lastLog = r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].createdAt
    if (createdAt > lastLog) {
      r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].message = message
      r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].createdAt = createdAt
    }
  }

  if (logType === CAMPAIGN_LOG_TYPE.SENDING) {
    r[log.campaignId][CAMPAIGN_LOG_TYPE.SENDING].message = message
    r[log.campaignId][CAMPAIGN_LOG_TYPE.SENDING].createdAt = createdAt
  }

  if (logType === CAMPAIGN_LOG_TYPE.SENT) {
    r[log.campaignId][CAMPAIGN_LOG_TYPE.SENT].message = message
    r[log.campaignId][CAMPAIGN_LOG_TYPE.SENT].createdAt = createdAt
  }

  if (logType === CAMPAIGN_LOG_TYPE.SCHEDULE) {
    const lastLog = r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].createdAt
    if (createdAt > lastLog) {
      r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].message = message
      r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].createdAt = createdAt
    }
  }

  return r
}, {})

console.log(campaignLogByCampaignIds)
