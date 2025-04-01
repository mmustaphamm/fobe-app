export interface IArtist {
    name: string
    bio: string
}

export const getArtistSessionKey = (artistId: string) => `ArtistSession_${artistId}`
