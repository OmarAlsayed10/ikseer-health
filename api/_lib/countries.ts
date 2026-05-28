export interface Country {
  iso2: string
  code: string
  nameEn: string
  nationalLength: number[]
}

export const COUNTRIES: readonly Country[] = [
  { iso2: 'EG', code: '+20',  nameEn: 'Egypt',                nationalLength: [10] },
  { iso2: 'SA', code: '+966', nameEn: 'Saudi Arabia',         nationalLength: [9] },
  { iso2: 'AE', code: '+971', nameEn: 'United Arab Emirates', nationalLength: [9] },
  { iso2: 'QA', code: '+974', nameEn: 'Qatar',                nationalLength: [8] },
  { iso2: 'KW', code: '+965', nameEn: 'Kuwait',               nationalLength: [8] },
  { iso2: 'BH', code: '+973', nameEn: 'Bahrain',              nationalLength: [8] },
  { iso2: 'OM', code: '+968', nameEn: 'Oman',                 nationalLength: [8] },
  { iso2: 'JO', code: '+962', nameEn: 'Jordan',               nationalLength: [9] },
  { iso2: 'LB', code: '+961', nameEn: 'Lebanon',              nationalLength: [7, 8] },
  { iso2: 'SY', code: '+963', nameEn: 'Syria',                nationalLength: [9] },
  { iso2: 'IQ', code: '+964', nameEn: 'Iraq',                 nationalLength: [10] },
  { iso2: 'PS', code: '+970', nameEn: 'Palestine',            nationalLength: [9] },
  { iso2: 'YE', code: '+967', nameEn: 'Yemen',                nationalLength: [9] },
  { iso2: 'SD', code: '+249', nameEn: 'Sudan',                nationalLength: [9] },
  { iso2: 'LY', code: '+218', nameEn: 'Libya',                nationalLength: [9] },
  { iso2: 'TN', code: '+216', nameEn: 'Tunisia',              nationalLength: [8] },
  { iso2: 'DZ', code: '+213', nameEn: 'Algeria',              nationalLength: [9] },
  { iso2: 'MA', code: '+212', nameEn: 'Morocco',              nationalLength: [9] },
  { iso2: 'MR', code: '+222', nameEn: 'Mauritania',           nationalLength: [8] },
  { iso2: 'SO', code: '+252', nameEn: 'Somalia',              nationalLength: [8, 9] },
  { iso2: 'DJ', code: '+253', nameEn: 'Djibouti',             nationalLength: [8] },
  { iso2: 'KM', code: '+269', nameEn: 'Comoros',              nationalLength: [7] },
]

export function findCountry(iso2: string): Country | undefined {
  return COUNTRIES.find((c) => c.iso2 === iso2)
}
