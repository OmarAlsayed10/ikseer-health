export interface LegalSection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface LegalContentProps {
  effectiveDate: string
  lastUpdated: string
  sections: LegalSection[]
}
