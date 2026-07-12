import { groq } from 'next-sanity'

export const headerConfigQuery = groq`
  *[_type == "headerConfig"][0] {
    tickerItems[] {
      _type,
      emoji,
      name,
      price,
      currency,
      weightUnit,
      label,
      value
    }
  }
`
