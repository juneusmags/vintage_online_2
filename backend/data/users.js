import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'juju Admin',
        email: 'juju@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin : true
    },
    {
        name: 'tien',
        email: bcrypt.hashSync('123456', 10),
        password: '123456',
        isAdmin : true
    },
    {
        name: 'chris',
        email: 'cn@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin : true
    }
]


export default users