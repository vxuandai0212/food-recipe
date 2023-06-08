const lodash = require('lodash')

enum INVITE_STATUS {
  WAITING = 1,
  EXPIRED = 2,
  ACCEPTED = 3
}

console.log(...lodash.values(INVITE_STATUS).filter(Number))
