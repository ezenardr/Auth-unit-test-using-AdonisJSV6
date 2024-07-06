import { test } from '@japa/runner'

test.group('User login', () => {
  test('login successfull', async ({ client }) => {
    const response = await client.post('/auth/login').fields({
      email: 'ezenardr.dev@gmail.com',
      password: '11111111',
    })
    // type User = {
    //   status: string
    //   message: string
    //   data: {
    //     accessToken: string
    //     user: {
    //       userId: string
    //       firstName: string
    //       lastName: string
    //       email: string
    //       phone: string | null
    //     }
    //   }
    // }
    // expectTypeOf<typeof response>().toMatchTypeOf<User>()
    response.assertStatus(200)
    // response.assertBody({
    //   status: 'success',
    //   message: 'Registration successfully',
    //   data: {
    //     accessToken: 'oat_MTI.djdRU2laeHdLNHk2RVVhSHJPcVNtMjl0Y1praHpDeTFFVGQzRnBxeDMyMjQyMzgxNA',
    //     user: {
    //       userId: typeof<string>,
    //       firstName: 'Rodolphe',
    //       lastName: 'Ezenard',
    //       email: 'ezenardr.dev@gmail.com',
    //       phone: null,
    //     },
    //   },
    // })
  })
})
