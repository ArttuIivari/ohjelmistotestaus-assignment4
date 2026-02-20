import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import { Request, Response } from 'express'
import * as dogController from '../controllers/dogController'


vi.mock('../controllers/dogController')

describe('Dog routes', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });
    //Positiivinen testi
    test('GET /api/dogs/random returns a dog image', async () => {
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (_req: Request, res: Response) => {
                res.status(200).json({
                    success: true,
                    data: {
                        message: "https://images.dog.ceo/breeds/spaniel-irish/n02102973_4794.jpg",
                        status: "success"
                    }
                })
            })
        const res = await request(app)
            .get('/api/dogs/random')
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            success: true,
            data: {
                message: "https://images.dog.ceo/breeds/spaniel-irish/n02102973_4794.jpg",
                status: "success"
            }
        })
    })


    //Negatiivinen testi
    test('GET /api/dogs/random returns 500 for network error', async () => {
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (_req: Request, res: Response) => {
                res.status(500).json({
                    success: false,
                    error: "Failed to fetch dog image: Network error"
                })
            })
        const res = await request(app)
            .get('/api/dogs/random')
        expect(res.status).toBe(500)
        expect(res.body).toEqual({
            success: false,
            error: "Failed to fetch dog image: Network error"
        })
    })
})