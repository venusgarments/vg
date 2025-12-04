const Blog =require("../models/blog.model")


 const createBlog = async({title,summary,content,author,files})=>{
       const images = (files || []).map((f)=>f.path.replacce(/\\\\/g,'/'))
        if(images.length>4) throw {status:400, message:'Max 4 images allow'}

        const blog = await Blog.save({title,content,summary,author,images})
        return blog 
}

 const getAllBlogs =async({page=1, limit=10, search=''}={})=>{
    const skip = (page-1)*limit
    const query = search
    ? {
        $or:[
            {title: new RegExp(search,'i')},
            {sumarry: new RegExp(search,'i')},
            {content: new RegExp(search,'i')},
    ]}
    :{}
    const [items,total] =await Promise.all([
        Blog.find(query).sort({createdAt: -1}).skip(skip).limit(limit),
        Blog.countDocuments(query)
    ])
    return {items, total, page, limit}
}


module.exports={createBlog, getAllBlogs}