const _ = require('lodash')

const stats = [
  {
    'campaignId': 1471,
    'sent': 0,
    'total': 1
  },
  {
    'campaignId': 1484,
    'sent': 0,
    'total': 1
  }
]

const expectedStats = {
  1471: {
    sent: 0,
    total: 1
  },
  1484: {
    sent: 0,
    total: 1
  }
}

const getCampaignSendingStatusByIds = (stats) => {
  const campaignSendingStatusByIds = _.reduce(stats, function(r, stat) {
    r[stat.campaignId] = r[stat.campaignId] || {}
    r[stat.campaignId]['sent'] = stat.sent
    r[stat.campaignId]['total'] = stat.total
    return r
  }, {})
  return campaignSendingStatusByIds
}

console.log(getCampaignSendingStatusByIds(stats))
