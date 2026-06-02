

// export const verifyRole = ( requiredRoles) => {
//     return (req, res, next) => {
//         try {
//         const role = requiredRoles.user.role

//         if (!role) {
//             return res.status(404).json({
//                 message: "role not found"
//             })
//         }

//     if (!requiredRoles.includes(role)){
//         return res.status(404)({
//             message: "You do not have access",
//         });
//     }

//     next()


//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || "something went wrong"
//         })
//     }
//     }
    
// }




export const verifyRole = (requiredRoles) => {
    return (req, res, next) => {
        try {
            const role = req.user.role
            if (!role) {
                return res.status(403).json({
                    message: "role not found"
                })
            }
            if (!requiredRoles.includes(role)) {
                return res.status(403).json({
                    message: "You do not have access"
                })
            }
            next()
        } catch (error) {
            return res.status(500).json({
                message: error.message || "something went wrong"
            })
        }
    }
}