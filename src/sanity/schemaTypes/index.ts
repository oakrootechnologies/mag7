import { type SchemaTypeDefinition } from 'sanity'
import headerConfig from '../schemas/headerConfig'
import { leadType } from './lead'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [headerConfig, leadType],
}
