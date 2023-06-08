const campaignLogByCampaignIds = {
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

const CAMPAIGNS = {
  SENDING_CODE: 1,
  SENT_CODE: 2,
  DRAFT_CODE: 3,
  ARCHIVED_CODE: 4,
  SCHEDULED_CODE: 5
}

const campaignId = 1475

const logs = new Map([
  [CAMPAIGNS.SENDING_CODE, CAMPAIGN_LOG_TYPE.SENDING],
  [CAMPAIGNS.SENT_CODE, CAMPAIGN_LOG_TYPE.SENT],
  [CAMPAIGNS.DRAFT_CODE, CAMPAIGN_LOG_TYPE.UPDATE],
  [CAMPAIGNS.SCHEDULED_CODE, CAMPAIGN_LOG_TYPE.SCHEDULE],
  ['default', CAMPAIGN_LOG_TYPE.UPDATE]
])

const getCampaignLogMessage = (campaignLogByCampaignIds, campaignId, campaignStatus) => {
  const logType = logs.get(campaignStatus) || logs.get('default')
  const logMessage = campaignLogByCampaignIds[campaignId][logType].message
  if (logMessage) {
    return logMessage
  }
  return 'Loading campaign log'
}

console.log(getCampaignLogMessage(campaignLogByCampaignIds, campaignId, 5))
