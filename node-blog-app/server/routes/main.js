

const express=require('express')
const Post = require('../models/Post');
const router=express.Router();

///GET
///Index
router.get('',async(req,res)=>{
    try {
        
        let sayfaAdet=3;
        let sayfa=req.query.page || 1;
        const data=await Post.aggregate([{$sort:{createdAt:-1}}])
            .skip(sayfaAdet*sayfa-sayfaAdet)
            .limit(sayfaAdet)
            .exec()

        const count=await Post.count();
        const sonrakiSayfa=parseInt(sayfa)+1;
        const sonrakiSayfaKontrol=sonrakiSayfa<=Math.ceil(count/sayfaAdet);

        res.render('index',{data,current:sayfa,nextPage:sonrakiSayfaKontrol ? sonrakiSayfa:null})


    } catch (error) {
        console.log(error);
    }
})


///GET
///About
router.get('/about',(req,res)=>{
    res.render('about')
})


//GET
///POST DETAY
router.get('/post/:id',async (req,res)=>{
    try {
        let slug=req.params.id;

        const data=await Post.findById({_id:slug});

        res.render('post',{data})

    } catch (error) {
        console.log(error);
    }
})

///POST
///Search
router.post('/search',async(req,res)=>{
    try {
        
        let aramaMetni=req.body.searchInput;

        const data=await Post.find({
            $or:[
                {title:aramaMetni},
                {body:aramaMetni}
            ]
        })

        console.log(data);
        
        res.render('searchResult',{data})

    } catch (error) {
        console.log(error);
    }
})


/*
function PostEkle(){
    Post.insertMany([
        {
            title:'Beşinci Kitap',
            body:'kitap açıklama'
        }
    ])
}

PostEkle();
*/

module.exports=router;