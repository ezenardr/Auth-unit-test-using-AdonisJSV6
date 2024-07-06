/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const OrganisationsController = () => import('#controllers/organisations_controller')

const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/auth/register', [UsersController, 'register'])
router.post('/auth/login', [UsersController, 'login'])
router
  .get('/api/users/:id', [UsersController, 'getUserById'])
  .use(middleware.auth({ guards: ['api'] }))

router
  .get('/api/organisations', [OrganisationsController, 'getUsersOrganisations'])
  .use(middleware.auth({ guards: ['api'] }))

router
  .post('/api/organisations', [OrganisationsController, 'createOrganisation'])
  .use(middleware.auth({ guards: ['api'] }))

router
  .get('/api/organisations/:orgId', [OrganisationsController, 'getUniqueOrganisations'])
  .use(middleware.auth({ guards: ['api'] }))

router
  .post('/api/organisations/:orgId/users', [OrganisationsController, 'addUserToOrganisation'])
  .use(middleware.auth({ guards: ['api'] }))
