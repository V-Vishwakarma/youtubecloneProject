// this is a wrapper function for async functions to handle errors in express.js
// it takes a function as an argument and returns a new function that handles errors
// it is used to avoid try-catch blocks or promisis in every route handler


// to use wrapper function we can create in two ways one is by try catch and other is by promises

// promises approach

const asyncHandler = (fn) => {
    (err, res, req, next) => {
        Promise.resolve(fn(err, res, req, next)).catch((error) => next(error))
    }
}






// try catch approach
// const asyncHandler = (fn) => {
//     async (err, res, req, next) => {
//         try {
//             await fn(err, res, req, next)
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 sucess: false,
//                 message: error.message || "Internal Server Error",
//             })
//         }
//     }
// }