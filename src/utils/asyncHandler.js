// this is a wrapper function for async functions to handle errors in express.js
// it takes a function as an argument and returns a new function that handles errors

// it is used to avoid try-catch blocks or promisis in every route handler and conctoroller
// this is a common pattern in express.js to handle async errors


// to use wrapper function we can create in two ways one is by try catch and other is by promises

// promises approach

// const asyncHandler = (requestHandler) => {
//     return (res, req, next) => {
//         Promise.resolve(requestHandler(res, req, next)).catch((error) => next(error))
//     }
// }

// export { asyncHandler }

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
    };
};

export { asyncHandler };


// try catch approach
// const asyncHandler = (fn) => {
//     async (res, req, next) => {
//         try {
//             await fn(res, req, next)
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 sucess: false,
//                 message: error.message || "Internal Server Error",
//             })
//         }
//     }
// }

// export { asyncHandler }
