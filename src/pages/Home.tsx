import { Box } from '@chakra-ui/react'
import { Hero } from '../components/Hero/Hero'
import { Products } from '../components/Products/Products'
import { WhyIkseer } from '../components/WhyIkseer/WhyIkseer'
import { BuiltFor } from '../components/BuiltFor/BuiltFor'
import { Ecosystem } from '../components/Ecosystem/Ecosystem'
import { VideoDemo } from '../components/VideoDemo/VideoDemo'
import { Features } from '../components/Features/Features'
import { Security } from '../components/Security/Security'
import { Pricing } from '../components/Pricing/Pricing'
import { HomeFAQ } from '../components/HomeFAQ/HomeFAQ'
import { CTABanner } from '../components/CTABanner/CTABanner'

interface HomeProps {
  onRequestAccess: () => void
  onContactSales: () => void
}

export function Home({ onRequestAccess, onContactSales }: HomeProps) {
  const scrollToClinic = () =>
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Box>
      <Hero onRequestAccess={onRequestAccess} onWatchDemo={scrollToClinic} />
      <Products onExploreClinic={scrollToClinic} />
      <WhyIkseer />
      <BuiltFor />
      <Ecosystem />
      <VideoDemo onRequestAccess={onRequestAccess} />
      <Features onRequestAccess={onRequestAccess} showAll={false} />
      <Security />
      <Pricing onRequestAccess={onRequestAccess} onContactSales={onContactSales} />
      <HomeFAQ />
      <CTABanner onRequestAccess={onRequestAccess} />
    </Box>
  )
}
