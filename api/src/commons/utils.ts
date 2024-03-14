export const parseUrl = (baseUrl: string, params = ''): string => (
  `${baseUrl}${params !== '' ? params.replace(/\?/i,"&") : params}`
)
