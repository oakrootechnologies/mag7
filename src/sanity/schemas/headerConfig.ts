import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'headerConfig',
  title: 'Daily Ticker Rates',
  type: 'document',
  fields: [
    defineField({
      name: 'tickerItems',
      title: 'Marquee Ticker Items',
      type: 'array',
      description: 'Items scrolling in the top marquee ticker (add, delete, edit, or drag to reorder)',
      of: [
        {
          type: 'object',
          name: 'productItem',
          title: 'Product Ticker Item',
          fields: [
            defineField({ name: 'emoji', type: 'string', title: 'Emoji (e.g. 🧅, 🍌)' }),
            defineField({ name: 'name', type: 'string', title: 'Product Name', validation: Rule => Rule.required() }),
            defineField({ name: 'price', type: 'number', title: 'Price', validation: Rule => Rule.required() }),
            defineField({ name: 'currency', type: 'string', title: 'Currency Symbol (e.g. ₹, $)', initialValue: '₹', validation: Rule => Rule.required() }),
            defineField({ name: 'weightUnit', type: 'string', title: 'Unit (e.g. Kg, Pc, Dozen)', initialValue: 'Kg', validation: Rule => Rule.required() }),
          ],
          preview: {
            select: {
              title: 'name',
              price: 'price',
              currency: 'currency',
              unit: 'weightUnit',
              emoji: 'emoji',
            },
            prepare({ title, price, currency, unit, emoji }) {
              return {
                title: `${emoji || ''} ${title || 'Unnamed Product'}`,
                subtitle: `${currency || '₹'}${price ?? ''}/${unit || 'Kg'}`,
              }
            }
          }
        },
        {
          type: 'object',
          name: 'customItem',
          title: 'Custom Ticker Item (Forex, Freight, etc.)',
          fields: [
            defineField({ name: 'emoji', type: 'string', title: 'Emoji (e.g. 💵, 🚢)' }),
            defineField({ name: 'label', type: 'string', title: 'Label (e.g. INR to USD)', validation: Rule => Rule.required() }),
            defineField({ name: 'value', type: 'string', title: 'Value (e.g. 0.012, $750/FEU)', validation: Rule => Rule.required() }),
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
              emoji: 'emoji',
            },
            prepare({ label, value, emoji }) {
              return {
                title: `${emoji || ''} ${label || 'Custom Item'}`,
                subtitle: value || '',
              }
            }
          }
        }
      ]
    }),
  ]
})

