const db = require("./../models");

module.exports = {
    getData(req, res) {
        db.posts.findAll({
            include: [{
                model: db.categories,
                as: 'categories',
                required: false,
                through: { attributes: [] }
            }],
        }).then(posts=>{
            return res.status(201).json({
                id:req.userId,
                posts,
            });
        }).catch(error=>{
            return res.status(500).json({ error: error.message })
        })
    },
    createData (req, res) {
        db.posts.create(req.body).then(
            post=>{
                const categories= req.body.categories
                const result=req.body
                result.id=post.id
                categories.forEach(c => {
                    db.post_categories.create({
                        "postId":post.id,
                        "categoryId": c.id
                    })
                });
                return res.status(201).json({
                    result
                });
            }
        ).catch(error=>{
            return res.status(500).json({ error: error.message })
        })        
    },
    updateData (req, res) {
        db.posts.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(
            id=>{
                db.post_categories.destroy({
                    where:{
                        postId:id
                    }
                }).then(()=>{
                    const categories= req.body.categories
                    const result=req.body
                    result.id=id
                    categories.forEach(c => {
                        db.post_categories.create({
                            "postId":id,
                            "categoryId": c.id
                        })
                    });
                    return res.status(201).json({
                        result
                    });
                })
                
            }
        ).catch(error=>{
            return res.status(500).json({ error: error.message })
        })        
    },
    deleteData (req, res) {
        db.posts.destroy({
            where:{
                id:req.params.id
            }
        }).then(
            id=>{
                return res.status(201).json({
                    id
                });
            }
        ).catch(error=>{
            return res.status(500).json({ error: error.message })
        })        
    },
    
}

