export interface Country {
  iso2: string
  code: string
  nameEn: string
  nameAr: string
  flag: string
  nationalLength: number[]
}

export const COUNTRIES: readonly Country[] = [
  { iso2: 'EG', code: '+20',  nameEn: 'Egypt',                nameAr: 'مصر',           flag: '🇪🇬', nationalLength: [10] },
  { iso2: 'SA', code: '+966', nameEn: 'Saudi Arabia',         nameAr: 'السعودية',      flag: '🇸🇦', nationalLength: [9] },
  { iso2: 'AE', code: '+971', nameEn: 'United Arab Emirates', nameAr: 'الإمارات',      flag: '🇦🇪', nationalLength: [9] },
  { iso2: 'QA', code: '+974', nameEn: 'Qatar',                nameAr: 'قطر',           flag: '🇶🇦', nationalLength: [8] },
  { iso2: 'KW', code: '+965', nameEn: 'Kuwait',               nameAr: 'الكويت',         flag: '🇰🇼', nationalLength: [8] },
  { iso2: 'BH', code: '+973', nameEn: 'Bahrain',              nameAr: 'البحرين',        flag: '🇧🇭', nationalLength: [8] },
  { iso2: 'OM', code: '+968', nameEn: 'Oman',                 nameAr: 'عُمان',          flag: '🇴🇲', nationalLength: [8] },
  { iso2: 'JO', code: '+962', nameEn: 'Jordan',               nameAr: 'الأردن',         flag: '🇯🇴', nationalLength: [9] },
  { iso2: 'LB', code: '+961', nameEn: 'Lebanon',              nameAr: 'لبنان',          flag: '🇱🇧', nationalLength: [7, 8] },
  { iso2: 'SY', code: '+963', nameEn: 'Syria',                nameAr: 'سوريا',          flag: '🇸🇾', nationalLength: [9] },
  { iso2: 'IQ', code: '+964', nameEn: 'Iraq',                 nameAr: 'العراق',         flag: '🇮🇶', nationalLength: [10] },
  { iso2: 'PS', code: '+970', nameEn: 'Palestine',            nameAr: 'فلسطين',         flag: '🇵🇸', nationalLength: [9] },
  { iso2: 'YE', code: '+967', nameEn: 'Yemen',                nameAr: 'اليمن',          flag: '🇾🇪', nationalLength: [9] },
  { iso2: 'SD', code: '+249', nameEn: 'Sudan',                nameAr: 'السودان',        flag: '🇸🇩', nationalLength: [9] },
  { iso2: 'LY', code: '+218', nameEn: 'Libya',                nameAr: 'ليبيا',          flag: '🇱🇾', nationalLength: [9] },
  { iso2: 'TN', code: '+216', nameEn: 'Tunisia',              nameAr: 'تونس',           flag: '🇹🇳', nationalLength: [8] },
  { iso2: 'DZ', code: '+213', nameEn: 'Algeria',              nameAr: 'الجزائر',        flag: '🇩🇿', nationalLength: [9] },
  { iso2: 'MA', code: '+212', nameEn: 'Morocco',              nameAr: 'المغرب',         flag: '🇲🇦', nationalLength: [9] },
  { iso2: 'MR', code: '+222', nameEn: 'Mauritania',           nameAr: 'موريتانيا',      flag: '🇲🇷', nationalLength: [8] },
  { iso2: 'SO', code: '+252', nameEn: 'Somalia',              nameAr: 'الصومال',        flag: '🇸🇴', nationalLength: [8, 9] },
  { iso2: 'DJ', code: '+253', nameEn: 'Djibouti',             nameAr: 'جيبوتي',         flag: '🇩🇯', nationalLength: [8] },
  { iso2: 'KM', code: '+269', nameEn: 'Comoros',              nameAr: 'جزر القمر',     flag: '🇰🇲', nationalLength: [7] },
]

export const DEFAULT_COUNTRY_ISO2 = 'EG'

export function findCountry(iso2: string): Country | undefined {
  return COUNTRIES.find((c) => c.iso2 === iso2)
}

export function normalizePhoneNational(value: string): string {
  const digits = value.replace(/\D/g, '')
  return digits.replace(/^0+/, '')
}
