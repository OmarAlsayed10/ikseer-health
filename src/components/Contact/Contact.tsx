import { useState } from 'react'
import { Box, Grid, Text, VStack, Flex, chakra } from '@chakra-ui/react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { AppButton } from '../UI/AppButton/AppButton'
import { AppInput, AppTextarea } from '../UI/AppInput/AppInput'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'
import { useFormValidation } from '../../hooks/useFormValidation'
import { validators } from '../../utils/validation'
import { checkRateLimit } from '../../utils/rateLimit'
import { CONFIG } from '../../constants/config'
import { submitContactForm, validateContactForm } from '../../services/accessRequest.service'
import { CONTACT_TOKENS } from './Contact.token'
import type { ContactFormData } from './Contact.type'

const EMPTY_FORM: ContactFormData = { name: '', email: '', subject: '', message: '' }
const Anchor = chakra('a')

const SCHEMA = {
  name: [validators.required(), validators.minLength(2), validators.maxLength(100)],
  email: [validators.required(), validators.email()],
  subject: [validators.required(), validators.minLength(3), validators.maxLength(200)],
  message: [validators.required(), validators.minLength(10), validators.maxLength(2000)],
}

export function Contact() {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { errors, validate } = useFormValidation<ContactFormData>(SCHEMA)

  const setField = (field: keyof ContactFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    if (!validate(form)) return

    const { allowed } = checkRateLimit('contact-form', CONFIG.rateLimit.contactForm)
    if (!allowed) {
      setStatus('error')
      return
    }

    const { isValid } = validateContactForm(form)
    if (!isValid) return

    setIsLoading(true)
    setStatus('idle')
    const result = await submitContactForm(form)
    setIsLoading(false)
    setStatus(result.success ? 'success' : 'error')
    if (result.success) setForm(EMPTY_FORM)
  }

  return (
    <SectionWrapper background="white" id="contact">
      <Box ref={groupRef}>
        <Grid templateColumns={{ base: '1fr', lg: '5fr 7fr' }} gap={{ base: '12', lg: '16' }}>
          <Box>
            <Box className="animate-fade-up">
              <AppBadge>{t.contact.badge}</AppBadge>
            </Box>
            <Text
              as="h2"
              mt="4"
              fontSize={{ base: '1.875rem', md: '2.5rem' }}
              fontWeight="700"
              color="gray.900"
              letterSpacing="-0.02em"
              className="animate-fade-up animate-delay-1"
            >
              {t.contact.headline}
            </Text>
            <Text
              mt="4"
              fontSize={{ base: '1rem', md: '1.0625rem' }}
              color="gray.600"
              lineHeight="1.7"
              className="animate-fade-up animate-delay-2"
            >
              {t.contact.subheadline}
            </Text>

            <Box
              mt="8"
              p="5"
              bg={CONTACT_TOKENS.infoCardBg}
              borderRadius="xl"
              border="1px solid"
              borderColor={CONTACT_TOKENS.infoCardBorder}
              className="animate-fade-up animate-delay-3"
            >
              <Flex align="center" gap="3">
                <Box color={CONTACT_TOKENS.infoIconColor} flexShrink={0}>
                  <Mail size={18} />
                </Box>
                <Box>
                  <Text fontSize="13px" color="gray.500" mb="0.5">
                    {t.contact.email.label}
                  </Text>
                  <Anchor
                    href={`mailto:${t.contact.email.value}`}
                    fontSize="15px"
                    fontWeight="500"
                    color="teal.700"
                    textDecoration="none"
                    _hover={{ color: 'teal.800' }}
                  >
                    {t.contact.email.value}
                  </Anchor>
                </Box>
              </Flex>
            </Box>
          </Box>

          <Box className="animate-fade-up animate-delay-2">
            <Box
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="2xl"
              p={{ base: '6', md: '8' }}
              shadow="sm"
            >
              {status === 'success' ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  gap="4"
                  py="8"
                  textAlign="center"
                >
                  <Box color="teal.500">
                    <CheckCircle size={40} />
                  </Box>
                  <Text fontSize="16px" fontWeight="600" color="gray.900">
                    {t.contact.form.success}
                  </Text>
                </Flex>
              ) : (
                <VStack gap="5" align="stretch">
                  <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap="4">
                    <AppInput
                      id="contact-name"
                      label={t.contact.form.name}
                      value={form.name}
                      onChange={setField('name')}
                      error={errors.name}
                      isRequired
                    />
                    <AppInput
                      id="contact-email"
                      label={t.contact.form.email}
                      value={form.email}
                      onChange={setField('email')}
                      type="email"
                      error={errors.email}
                      isRequired
                    />
                  </Grid>
                  <AppInput
                    id="contact-subject"
                    label={t.contact.form.subject}
                    value={form.subject}
                    onChange={setField('subject')}
                    error={errors.subject}
                    isRequired
                  />
                  <AppTextarea
                    id="contact-message"
                    label={t.contact.form.message}
                    value={form.message}
                    onChange={setField('message')}
                    error={errors.message}
                    rows={5}
                    isRequired
                  />

                  {status === 'error' && (
                    <Flex
                      align="center"
                      gap="2"
                      p="3"
                      bg={CONTACT_TOKENS.errorBg}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={CONTACT_TOKENS.errorBorderColor}
                      role="alert"
                    >
                      <AlertCircle size={16} color="var(--chakra-colors-red-500)" />
                      <Text fontSize="14px" color="red.600">
                        {t.contact.form.error}
                      </Text>
                    </Flex>
                  )}

                  <AppButton
                    label={t.contact.form.submit}
                    variant="primary"
                    size="md"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    fullWidth
                    type="button"
                  />
                </VStack>
              )}
            </Box>
          </Box>
        </Grid>
      </Box>
    </SectionWrapper>
  )
}
