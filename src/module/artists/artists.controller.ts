import { Request, Response } from 'express'
import { CustomError } from '../../common/errors/custom.error'
import { HttpStatusCode } from 'axios'
import CustomResponse from '../../utils/response.utils'
import RedisManager from './../../config/redis'
import { getArtistSessionKey } from './artists.interface'
import { encryptResponse } from '../../common/functionsUtils/functions'
import envs from './../../config/env'
import Logger from './../../utils/logger.utils'
import ArtistsService from './artists.service'
import { Artists } from './artists.model'

export default class ArtistsController {
    static async initialize(request: Request, response: Response) {
        const data: Artists = request.body
        try {
            const result = await ArtistsService.initializeArtist(data)

            // save data in redis
            await RedisManager.set<Artists>(
                getArtistSessionKey(result.id as unknown as string),
                result,
                86000,
            )

            const encrypted_data = encryptResponse(result)

            response.status(HttpStatusCode.Created).send(
                CustomResponse.build({
                    code: HttpStatusCode.Created,
                    success: true,
                    message: 'Artist created successfully',
                    data: encrypted_data,
                }),
            )
        } catch (e: any) {
            if (e instanceof CustomError) {
                throw e
            }
            throw CustomError.internalServerError(e)
        }
    }

    static async getArtist(request: Request, response: Response) {
        try {
            const result = await ArtistsService.getAllArtist()

            const encrypted_data = encryptResponse(result)

            response.status(HttpStatusCode.Created).send(
                CustomResponse.build({
                    code: HttpStatusCode.Created,
                    success: true,
                    message: 'successful',
                    data: encrypted_data,
                }),
            )
        } catch (e: any) {
            if (e instanceof CustomError) {
                throw e
            }
            throw CustomError.internalServerError(e)
        }
    }
}
