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
    }
}