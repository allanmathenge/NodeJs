const verifyRoles = (...allowedRoles) => { //(...allowedRoles) is rest operator;
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401); //unauthorized req.?roles is an optional chaining
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true); //we return only the truthy values - Boolean
        if (!result) return res.sendStatus(401) //unauthorized
        next();
    }
}

module.exports = verifyRoles