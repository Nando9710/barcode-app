import { OptionCode } from "../../../../core/enums/option-code.enum"
import { ProductOptionSearch } from "../../../../core/interfaces/product.interface"

export const searchOptions: ProductOptionSearch[] = [
  { code: OptionCode.BARCODE, name: 'BARCODE' },
  { code: OptionCode.MPN, name: 'MPN' },
  { code: OptionCode.ASIN, name: 'ASIN' },
  { code: OptionCode.TITLE, name: 'Nombre' },
  { code: OptionCode.CATEGORY, name: 'Categoría' },
  { code: OptionCode.MANUFACTURER, name: 'Fabricante' },
  { code: OptionCode.BRAND, name: 'Marca' },
  { code: OptionCode.GEO, name: 'País' },
]

export const filterOptions: ProductOptionSearch[] = [
  { code: OptionCode.MPN, name: 'MPN' },
  { code: OptionCode.CATEGORY, name: 'Categoría' },
  { code: OptionCode.MANUFACTURER, name: 'Fabricante' },
  { code: OptionCode.BRAND, name: 'Marca' },
  { code: OptionCode.GEO, name: 'País' },
]