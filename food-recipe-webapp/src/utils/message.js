export const messageMap = new Map([
  ['alias.name.is.exist', 'Tên tiêu đề đã tồn tại'],
  ['campaign.label.today', 'Hôm nay'],
  ['campaign.label.this.month', 'Tháng này'],
  ['campaign.name.empty', 'Tên thông báo không được để trống'],
  ['campaign.type.invalid', 'Loại thông báo không hợp lệ'],
  ['campaign.status.invalid', 'Trạng thái thông báo không hợp lệ'],
  ['campaign.name.is.exist', 'Tên thông báo đã tồn tại'],
  ['campaign.error', 'Có lỗi xảy ra trong quá trình thực thi'],
  ['campaign.label.this.week', 'Tuần này'],
  ['campaign.label.this.year', 'Năm nay'],
  ['campaign.label.all', 'Tất cả'],
  ['import.contact.email.is.exist', 'Địa chỉ email thuê bao đã tồn tại'],
  ['import.contact.error', 'Có lỗi xảy ra trong quá trình import, vui lòng thử lại'],
  ['audience.name.is.empty', 'Tên audience không được để trống'],
  // ['audience.name.is.exist', 'Tên audience đã tồn tại'],
  ['audience.create.update.error', 'Có lỗi xảy ra khi cập nhật audience, vui lòng thử lại'],
  ['tag.name.is.empty', 'Tên tag không được để trống'],
  ['tag.audience.is.empty', 'Tag chưa được chọn audience'],
  ['tag.name.is.exist', 'Tên tag đã tồn tại'],
  ['tag.create.update.error', 'Có lỗi xảy ra khi cập nhật tag, vui lòng thử lại'],
  ['contact.email.is.empty', 'Địa chỉ email thuê bao không được trống'],
  ['contact.mail.is.exist', 'Địa chỉ email thuê bao đã tồn tại'],
  ['contact.create.update.error', 'Có lỗi xảy ra khi cập nhật thuê bao hoặc email không tồn tại.'],
  ['contact.is.not.exits', 'Thuê bao không tồn tại trong ứng dụng'],
  ['contact.status.was.unsubscribe', 'Thuê bao đã bị huỷ đăng ký'],
  ['segment.campaign.used', 'Segment đang được dùng không thể xóa'],
  ['tag.campaign.used', 'Tag đang được dùng không thể xóa'],
  ['cannot.delete.used.template', 'Template đang được dùng không thể xóa'],
  ['cannot.delete.this.audience', 'Không thể xóa audience đã được sử dụng ở campaign, chứa thuê bao, tag hoặc segment.'],
  ['cannot.delete.this.application', 'Không thể xóa ứng dụng chứa template, campaign, hoặc audience.'],
  ['campaign.status.is.sent.sending.saved', 'Campaign đã gửi/đang gửi (gửi ngay)/lưu trữ không thể xóa'],
  [50001, 'Lỗi không có quyền truy cập'],
  [40000, 'Token không hợp lệ']
])

export function convertMessage(string) {
  if (!string) {
    return ''
  }
  const codeRegex = /#.*# /gm
  const codeStr = string.match(codeRegex)
  const code = codeStr[0].substring(1, codeStr[0].length - 2)
  const replace = messageMap.get(code) + ' '
  return string.replace(codeStr[0], replace)
}
