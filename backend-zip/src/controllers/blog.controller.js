const blogServices =require('../services/blog.services')

 const createBLog = async(req,res)=>{
    try{
        const files = req.files ? req.files.images || [] : [];
        const {title,summary,content,author} = req.body
        if (!title || !summary || !content || !author )
            return res.status(400).json({message:'All field are required'})
        const blog = await blogServices.createBlog({title,summary, content,author,files})
        return res.status(200).json({blog:blog})
    } catch(err){
        return res.status(200).json({message:err.message})
    }
}

 const getAllBlog = async()=>{
    try{
        const {page=1, limit=10,search=''} = req.query
        const data = await blogServices.getAllBlogs({ page: Number(page), limit: Number(limit), search })
        return res.status(200).json({data})
    }catch(err){
        return res.status(400).json({message:err.message})
}
} 

module.exports={createBLog, getAllBlog}