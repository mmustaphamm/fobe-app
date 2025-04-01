import { CustomError } from './../../common/errors/custom.error'
import PersistenceManager from '../../config/db'
import { Artists } from './artists.model'
import { ResponseTypes } from './../../utils/response.utils'
import Logger from './../../utils/logger.utils'
import { IEvents } from '../event/event.interface'
import { IArtist } from './artists.interface'

export default class ArtistsService {
    static get artistRepository() {
        return PersistenceManager.repository(Artists)
    }

    static async initializeArtist(data: IArtist) {
        Logger.getInstance().warn('Creation of artist started')
        const { name, bio } = data

        // Validate inputs
        if (!name || bio === undefined || bio === null) {
            throw CustomError.badRequest(ResponseTypes.INVALID_EVENTS_DATA)
        }

        const savedArtist = await ArtistsService.artistRepository.findOneBy({
            name,
        })

        if (savedArtist) {
            throw CustomError.badRequest(ResponseTypes.DUPLICATE_ARTIST)
        }

        let artist = ArtistsService.artistRepository.create({
            name,
            bio,
        })

        const runner = PersistenceManager.dataSource.createQueryRunner()
        await runner.startTransaction()
        try {
            await ArtistsService.artistRepository.save(artist)
            await runner.commitTransaction()
            Logger.getInstance().warn('Artist created and added to the db successfully')
            return artist
        } catch (e: any) {
            await runner.rollbackTransaction()

            throw e instanceof CustomError ? e : CustomError.internalServerError(e)
        } finally {
            await runner.release()
        }
    }

    static async getAllArtist() {
        try {
            return await ArtistsService.artistRepository.find()
        } catch (e: any) {
            throw e instanceof CustomError ? e : CustomError.internalServerError(e)
        }
    }
}
