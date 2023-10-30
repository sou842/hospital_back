const express = require('express');
const { postModel } = require('../model/postModel.js');


const postRoute = express.Router()


postRoute.get('/', async (req, res) => {
    const { Filter, date, Search, id } = req.query;

    try {
        if (Filter && Search && date) {
            const post = await postModel.find({ 'specialization': Filter, 'name': Search, 'date': date })
            res.status(200).json({ post })
        }
        else if (Filter && Search) {
            const post = await postModel.find({ 'specialization': Filter, 'name': Search })
            res.status(200).json({ post })
        }
        else if (Filter) {
            const post = await postModel.find({ 'specialization': Filter })
            res.status(200).json({ post })
        } else if (Search) {
            const post = await postModel.find({ 'name': Search })
            res.status(200).json({ post })
        }
        else if (date) {
            const post = await postModel.find({ 'date': date })
            res.status(200).json({ post })
        } 
        else if (id) {
            const post = await postModel.find({ '_id': id })
            res.status(200).json({ post })
        } 
         else {
            const post = await postModel.find()
            res.status(200).json({ post })
        }
        // res.status(200).json({post})

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }


})


postRoute.post('/add', async (req, res) => {

    try {
        const post = new postModel(req.body)
        await post.save()
        res.status(200).json({ msg: 'new post added', 'post': post })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }

})

postRoute.patch('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.findByIdAndUpdate({ _id: id }, req.body)
        res.status(200).json({ msg: 'post updated', 'post': post })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }

})

postRoute.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ msg: 'post deleted', 'post': post })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }

})

module.exports = { postRoute }
