import { Router } from 'express'
import { IRoute } from '../../routes/route.interface'
import ArtistsController from './artists.controller'
import { authMiddleware } from '../auth/auth.middleware'
import { decryptRequest } from '@app/common/functionsUtils/functions'

const router = Router()

router.get('/all-artist', authMiddleware, ArtistsController.getArtist)

router.post(
    '/initialize',
    authMiddleware,
    decryptRequest,
    // EventValidator.initializeEventValidator,
    ArtistsController.initialize,
)
export default {
    router,
    path: 'artist',
} as IRoute
