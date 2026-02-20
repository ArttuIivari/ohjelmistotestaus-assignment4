import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getRandomDogImage } from '../services/dogService'
describe('dogService.getRandomDogImage', () => {
    beforeEach(() => {
        //tarvitaan mock-vastausta varten
        global.fetch = vi.fn()
    })
    afterEach(() => {
        //Tyhjennetään ja resettaillaan mockit seuraavia testejä varten
        vi.clearAllMocks()
        vi.resetAllMocks()
    })
    //Positiivinen testi
    test('Returns random dog image', async () => {

        // mockkaa API pyynnön palautuksen, jolloin tämä tulee lopulta result-muuttujaan.
        // eli mitä ikinä dog-api palauttaakaan, niin laitetaan tähän dogServicen pureskeltavaksi.
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => ({
                "message": "https://images.dog.ceo/breeds/retriever-curly/n02099429_3371.jpg",
                "status": "success"
            })
        } as Response)
        //tässä tapahtuu varsinainen pureskelu
        const result = await getRandomDogImage()
        expect(fetch).toHaveBeenCalledOnce()
        expect(result).toEqual({ 
            imageUrl: "https://images.dog.ceo/breeds/retriever-curly/n02099429_3371.jpg",
            status: "success"
         })
    })
    //Negatiivinen testi
    test('Throws error when API call fails', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 500
        } as Response)
        await expect(getRandomDogImage()).rejects.toThrow(
            `Failed to fetch dog image: Dog API returned status 500`
        )
    })
})