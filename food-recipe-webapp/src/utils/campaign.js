export function getTitle(campaign) {
  const campaignType = campaign.type
  if (campaignType === 1) {
    const listAlias = campaign.alias
    if (listAlias) {
      const smsAlias = listAlias.filter(a => a && a.type && a.type === 1)
      if (smsAlias) {
        return smsAlias[0] ? smsAlias[0].name : null
      }
      return null
    }
  } else {
    return campaign.title
  }
}
