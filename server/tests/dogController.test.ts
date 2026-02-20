import { describe, expect, test, vi } from "vitest"
import { getDogImage } from "../controllers/dogController"
import * as dogService from "../services/dogService"

vi.mock('../services/dogService')

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res
}

describe('dogController.getDogImage', () => {
    test('Return dog image with valid request', async () => {
        const req: any = {}
        const res = createMockResponse()
        const payload = {
            "success": true,
            "data": {
                "imageUrl": "https://images.dog.ceo/breeds/spaniel-irish/n02102973_4794.jpg",
                "status": "success"
            }
        }
        vi.mocked(dogService.getRandomDogImage).mockResolvedValue(payload.data)
        
        await getDogImage(req, res)

        expect(res.json).toHaveBeenCalledWith({
            "success": true,
            "data": {
                "imageUrl": "https://images.dog.ceo/breeds/spaniel-irish/n02102973_4794.jpg",
                "status": "success"
            }
        })
    })

})