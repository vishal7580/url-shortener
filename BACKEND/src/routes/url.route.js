import express from 'express'
import { createShortUrl, deleteUrl,  getUserUrls, persistUrl, redirectFromUrl } from '../controller/url.controller.js'

const router = express.Router()

//Urls Routes
router.get('/',(req,res)=> {
    res.send('server running')
})
router.post('/create',createShortUrl)
router.get('/:id',redirectFromUrl)

//User Urls Routes
router.patch('/url/:id',persistUrl)
router.delete('/url/:id',deleteUrl)
router.get('/urls/:userId',getUserUrls)

export default router