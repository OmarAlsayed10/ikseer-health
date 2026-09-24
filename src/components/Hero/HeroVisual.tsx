import type { ReactNode } from 'react'
import { Box, Grid, HStack, Text, VStack } from '@chakra-ui/react'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { HERO_TOKENS } from './Hero.token'

const STATUS_COLORS = {
  done: { bg: 'gray.100', color: 'gray.600' },
  inRoom: { bg: 'teal.50', color: 'teal.700' },
  waiting: { bg: 'orange.50', color: 'orange.600' },
} as const

export function HeroVisual() {
  const { t } = useTranslation()
  const visual = t.hero.visual

  return (
    <Box position="relative" px="6" py="8" aria-hidden>
      <Box
        bg="white"
        borderRadius={HERO_TOKENS.mockupBorderRadius}
        border="1px solid"
        borderColor="gray.100"
        p="6"
        style={{ boxShadow: HERO_TOKENS.mockupShadow }}
      >
        <Text fontSize="17px" fontWeight="700" color="gray.900">
          {visual.title}
        </Text>
        <Text fontSize="12px" color="gray.500">
          {visual.subtitle}
        </Text>

        <Grid templateColumns="repeat(3, 1fr)" gap="3" mt="5">
          {visual.stats.map((stat) => (
            <Box key={stat.label} bg="teal.25" border="1px solid" borderColor="teal.100" borderRadius="lg" p="3">
              <Text fontSize="11px" color="gray.500">
                {stat.label}
              </Text>
              <Text fontSize="18px" fontWeight="700" color="teal.800" mt="1">
                {stat.value}
              </Text>
            </Box>
          ))}
        </Grid>

        <VStack gap="2" mt="5" align="stretch">
          {visual.schedule.map((slot) => (
            <HStack
              key={slot.time}
              justify="space-between"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="lg"
              px="3"
              py="2.5"
            >
              <HStack gap="3">
                <Text fontSize="12px" fontWeight="600" color="gray.500" minW="44px">
                  {slot.time}
                </Text>
                <Box w="30px" h="30px" borderRadius="full" bg="teal.100" color="teal.800" display="grid" placeItems="center" fontSize="12px" fontWeight="700">
                  {slot.name.charAt(0)}
                </Box>
                <Text fontSize="13px" fontWeight="600" color="gray.800">
                  {slot.name}
                </Text>
              </HStack>
              <Text
                fontSize="11px"
                fontWeight="600"
                px="2"
                py="0.5"
                borderRadius="full"
                {...STATUS_COLORS[slot.status]}
              >
                {visual.statuses[slot.status]}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      <FloatingChip
        top="0"
        insetEnd="0"
        icon={<MessageCircle size={16} />}
        iconBg="green.50"
        iconColor="green.600"
        title={visual.reminder.title}
        subtitle={visual.reminder.subtitle}
      />
      <FloatingChip
        bottom="0"
        insetStart="0"
        icon={<CheckCircle2 size={16} />}
        iconBg="teal.50"
        iconColor="teal.700"
        title={visual.invoice.title}
        subtitle={visual.invoice.subtitle}
      />
    </Box>
  )
}

interface FloatingChipProps {
  top?: string
  bottom?: string
  insetStart?: string
  insetEnd?: string
  icon: ReactNode
  iconBg: string
  iconColor: string
  title: string
  subtitle: string
}

function FloatingChip({ icon, iconBg, iconColor, title, subtitle, ...position }: FloatingChipProps) {
  return (
    <HStack
      position="absolute"
      {...position}
      gap="3"
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="xl"
      px="4"
      py="3"
      shadow="lg"
    >
      <Box bg={iconBg} color={iconColor} p="2" borderRadius="lg">
        {icon}
      </Box>
      <VStack align="start" gap="0">
        <Text fontSize="13px" fontWeight="700" color="gray.900">
          {title}
        </Text>
        <Text fontSize="11px" color="gray.500">
          {subtitle}
        </Text>
      </VStack>
    </HStack>
  )
}
