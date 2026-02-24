import { describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '../index'

describe('Dog API', () => {

    //Positiivinen testi
    test('GET /api/dogs/random returns random dog image', async () => {
        const response = await request(app)
            .get('/api/dogs/random')
        expect(response.status).toBe(200)
        expect(response.body.success).toEqual(true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('imageUrl')
        expect(typeof response.body.data.imageUrl).toBe('string')
    })

    //Negatiivinen testi
    test('GET /api/dogs/invalid returns 404 for invalid request url', async () => {
        const response = await request(app)
            .get('/api/dogs/invalid')
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body).toEqual({
            "error": "Route not found",
            "success": false,
        })
    })
})