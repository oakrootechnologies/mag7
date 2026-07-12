import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mag7 Global Admin')
    .items([
      // ⚙️ Daily Ticker Rates Singleton
      S.listItem()
        .title('Daily Ticker Rates')
        .id('headerConfig')
        .child(
          S.document()
            .schemaType('headerConfig')
            .documentId('headerConfig')
            .title('Manage Daily Ticker Rates')
        ),
      
      S.divider(),

      // Filter out singleton types from the default list
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'headerConfig'
      ),
    ])
