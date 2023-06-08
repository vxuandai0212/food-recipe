const _ = require('lodash')

const contacts = [
  {
    'id': 65537,
    'status': 1,
    'audienceId': 1
  },
  {
    'id': 912105,
    'status': 2,
    'audienceId': 1
  },
  {
    'id': 912106,
    'status': 3,
    'audienceId': 2
  },
  {
    'id': 912107,
    'status': 1,
    'audienceId': 3
  }
]

// audienceContactByIds: {
//     1: {
//         totalContacts: 10,
//         totalSubscribers: 8,
//         totalUnsubscribers: 1,
//         totalNonSubscribers: 1
//     }
// }

const audienceContactByIds = _.reduce(contacts, function(r, contact) {
  r[contact.audienceId] = r[contact.audienceId] || {}
  r[contact.audienceId]['totalContacts'] = r[contact.audienceId]['totalContacts'] || 0
  r[contact.audienceId]['totalSubscribers'] = r[contact.audienceId]['totalSubscribers'] || 0
  r[contact.audienceId]['totalUnsubscribers'] = r[contact.audienceId]['totalUnsubscribers'] || 0
  r[contact.audienceId]['totalNonSubscribers'] = r[contact.audienceId]['totalNonSubscribers'] || 0
  const status = contact.status
  if (status === 1) {
    r[contact.audienceId]['totalContacts'] += 1
    r[contact.audienceId]['totalSubscribers'] += 1
  }
  if (status === 2) {
    r[contact.audienceId]['totalContacts'] += 1
    r[contact.audienceId]['totalUnsubscribers'] += 1
  }
  if (status === 3) {
    r[contact.audienceId]['totalContacts'] += 1
    r[contact.audienceId]['totalNonSubscribers'] += 1
  }
  return r
}, {})

console.log(audienceContactByIds)
