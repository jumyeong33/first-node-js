var mongoose = require('mongoose');
var db = require('../models')

module.exports = {
    addBook : (req, res) => {
        console.log(req.body)
        try {
            if(!req.body) {
                return res.json({
                    success : 0,
                    status : 400,
                    msg : 'Required parameters not set.'
                });
            }
            var book = new db.book({
                title : req.body.name,
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
    }
}