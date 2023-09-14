const middlewareTest = (req,res,next) => {
    const {method,url} = req;
    console.log(method,"/pokemon"+url);
    next();
}

module.exports = middlewareTest;