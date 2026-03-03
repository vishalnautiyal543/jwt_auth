const asyncHandler= (fn)=> (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next)
}

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     next(error);
//   }
// };

export {asyncHandler}