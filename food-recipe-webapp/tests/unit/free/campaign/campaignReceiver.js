const _ = require('lodash')
const campaignReceivers = [
  {
    'id': 1,
    'campaignId': 1470,
    'ctId': 1,
    'ctType': 1,
    'audienceId': 1,
    'tagId': 22,
    'segmentId': 1,
    'fbAppId': 1,
    'type': 2
  },
  {
    'id': 1,
    'campaignId': 1470,
    'ctId': 1,
    'ctType': 1,
    'audienceId': 1,
    'tagId': 2,
    'segmentId': 1,
    'fbAppId': 1,
    'type': 1
  },
  {
    'id': 1,
    'campaignId': 1470,
    'ctId': 1,
    'ctType': 1,
    'audienceId': 1,
    'tagId': 23,
    'segmentId': 1,
    'fbAppId': 1,
    'type': 1
  },
  {
    'id': 1,
    'campaignId': 1470,
    'ctId': 1,
    'ctType': 1,
    'audienceId': 1,
    'tagId': 22,
    'segmentId': 1,
    'fbAppId': 1,
    'type': 2
  },
  {
    'id': 1,
    'campaignId': 1470,
    'ctId': 1,
    'ctType': 1,
    'audienceId': 2,
    'tagId': 22,
    'segmentId': 10,
    'fbAppId': 1,
    'type': 2
  },
  {
    'id': 1,
    'campaignId': 1470,
    'ctId': 1,
    'ctType': 1,
    'audienceId': 2,
    'tagId': 22,
    'segmentId': 10,
    'fbAppId': 1,
    'type': 2
  },
  {
    'id': 1,
    'campaignId': 1470,
    'ctId': 1,
    'ctType': 1,
    'audienceId': 3,
    'tagId': 24,
    'segmentId': 10,
    'fbAppId': 1,
    'type': 2
  }
]

// const expectedResult = {
//   'direct': {
//     type: 1,
//     totalContact: 2
//   },
//   'byAudienceIds': {
//     1: {
//       type: 2,
//       audienceId: 1,
//       tagIds: [1, 2],
//       segmentIds: [1, 2],
//       totalContact: 0
//     }
//   }
// }

const res = {
  direct: {
    type: 1,
    totalContact: 0
  },
  byAudienceIds: {}
}

campaignReceivers.map(r => {
  const { id, audienceId, tagId, segmentId, type } = r
  if (id && type && type === 1) {
    res.direct.totalContact = res.direct.totalContact + 1
  } else {
    res.byAudienceIds[audienceId] = res.byAudienceIds[audienceId] || {}
    res.byAudienceIds[audienceId].tagIds = res.byAudienceIds[audienceId].tagIds || []
    res.byAudienceIds[audienceId].segmentIds = res.byAudienceIds[audienceId].segmentIds || []
    res.byAudienceIds[audienceId].totalContact = res.byAudienceIds[audienceId].totalContact || 0
    res.byAudienceIds[audienceId].type = 2
    res.byAudienceIds[audienceId].audienceId = audienceId
    res.byAudienceIds[audienceId].tagIds.push(tagId)
    res.byAudienceIds[audienceId].segmentIds.push(segmentId)
    res.byAudienceIds[audienceId].totalContact = res.byAudienceIds[audienceId].totalContact + 1
    res.byAudienceIds[audienceId].tagIds = [...new Set(res.byAudienceIds[audienceId].tagIds)]
    res.byAudienceIds[audienceId].segmentIds = [...new Set(res.byAudienceIds[audienceId].segmentIds)]
  }
})

console.log(res)
