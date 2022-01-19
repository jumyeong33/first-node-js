var mongoose = require('mongoose');
var db = require('../models')

module.exports = {
    addBook : (req, res) => {
        try {
            if(!req.body) {
                return res.json({
                    success : 0,
                    status : 400,
                    msg : 'Required parameters not set.'
                });
            }
            var book = new db.book({
                title : req.body.title,
                author : req.body.author,
                published_date : new Date(req.body.published_date)
            });
             book.save().then((result) =>{
                console.log(result);
                res.json(result)
        }).catch((err) => {
            console.log(err);
            res.json({
                success :0,
                status : 400,
                msg : 'Oops! Something went wrong. Data is not saved.'
            })
        })
        } catch (error) {
            console.log(error);
            res.json({
                success: 0,
                status: 400,
                msg: 'Something went wrong. Please try again.'
            })
        }
    },
    allBooks : (req, res) => {
        db.book.find((err, books) => {
            if(err) return res.status(500).send({
                error :'database failure'
            });
            res.json(books);
        })
    },
    findBookByAuthor : (req, res) => {
        try {
            if(!req.params.author) {
                return res.json({
                    success: 0,
                    status: 400,
                    data: null,
                    msg: 'Required parameters not set'
                })
            }
            db.book.find(
                {author : req.params.author},
                (err, result) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            status: 400,
                            data: null,
                            msg: 'Oops. Something went wrong. Please try again.'
                        })
                    }
                    res.json({
                        success: 1,
                        status: 200,
                        data: result
                    })
                }
            );
        } catch (error) {
            res.json({
                success: 1,
                status: 400,
                data: null,
                msg: 'Oops. Something went wrong. Please try again.'
            })
        }
    },
    findBook : (req, res) => {
        try {
                if (!req.params.book_id) {
                    return res.json({
                        success: 0,
                        status: 400,
                        data: null,
                        msg: 'Required parameters not set'
                });
            }
            db.book.findOne(
                {_id : req.params.book_id},
                (err, book) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            status: 400,
                            data: null,
                            msg: 'Oops. Something went wrong. Please try again.'
                        })
                    }
                res.json(book);
                }
            )
         } catch (err) {
            res.json({
                success: 0,
                status: 400,
                data: [],
                msg: 'Oops! Something went wrong. Please try again.'
            })
         }
    },
    updateBook : (req, res) => {
        //USING UPDATE METHOD
        db.book.updateOne(
            {_id : req.params.book_id},
            { $set : req.body},
            (err, output) => {
                if (err) res.status(500).json({error : 'database failure'})
                console.log(output);
                if (!output.acknowledged) return res.status(404).json({error : 'book not found'});
                res.json({ messge : 'book updated'})
            }
        )
        //USING FIND METHOD
        // db.book.findById(req.params.book_id, (err, book) => {
        //     if (err) return res.status(500).json({error : 'database failure'});
        //     if (!book) return res.status(404).json({error : 'book not found'});

        //     book.title = req.body.title;
        //     book.author = req.body.author;
        //     book.published_date = req.body.published_date;
            
        //     book.save().then(result => {
        //         res.json(result)
        //     }).catch(err =>{
        //         res.json({
        //             success :0,
        //             status : 400,
        //             msg : 'Oops! Something went wrong. Data is not saved.'
        //         })
        //     })
        // });
    }
}