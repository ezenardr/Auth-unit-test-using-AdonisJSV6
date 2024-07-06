import vine from '@vinejs/vine'

export const registerOrganisationValidation = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
  })
)
