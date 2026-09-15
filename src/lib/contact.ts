export const WHATSAPP_NUMBER = "62881037512641"
export const WECHAT_ID = "wxid_tz213yzqzud422"

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
