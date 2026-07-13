export const leadType = {
  name: 'lead',
  title: 'RFQ Lead',
  type: 'document',
  fields: [
    { name: 'date', title: 'Date', type: 'datetime' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'Pending' },
          { title: 'Quoted', value: 'Quoted' },
          { title: 'Closed', value: 'Closed' }
        ]
      },
      initialValue: 'Pending'
    },
    { name: 'fullName', title: 'Full Name', type: 'string' },
    { name: 'designation', title: 'Designation', type: 'string' },
    { name: 'companyName', title: 'Company Name', type: 'string' },
    { name: 'businessType', title: 'Business Type', type: 'string' },
    { name: 'destinationCountry', title: 'Destination Country', type: 'string' },
    { name: 'destinationPort', title: 'Destination Port', type: 'string' },
    { name: 'whatsappCode', title: 'WhatsApp Code', type: 'string' },
    { name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'productId', title: 'Product ID', type: 'string' },
    { name: 'qualitySpecs', title: 'Quality Specs', type: 'text' },
    { name: 'packaging', title: 'Packaging', type: 'string' },
    { name: 'quantity', title: 'Quantity', type: 'number' },
    { name: 'quantityUnit', title: 'Quantity Unit', type: 'string' },
    { name: 'incoterm', title: 'Incoterm', type: 'string' },
    { name: 'timeline', title: 'Timeline', type: 'string' },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'companyName',
      status: 'status',
    },
    prepare(selection: any) {
      const { title, subtitle, status } = selection
      return {
        title: `${title} - ${status}`,
        subtitle: subtitle
      }
    }
  }
}
