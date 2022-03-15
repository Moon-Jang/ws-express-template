const UserDao = require("../dao/UserDao")

module.exports = {
    checkUser: async (jwtPayload, connection) => {
        const { id, permisson } = jwtPayload

        if (permisson === 0) {
            throw Error("비회원은 접근할 수 없습니다")
        }

        //next()
        if (isNaN(id)) {
            throw Error("id 형식이 잘못되었습니다")
        }

        //유저 검증
        const user = await UserDao.findUserById(id, connection)
        //여기에 findUser를 통해 프론트토큰 id와 서버 id 비교함
        if (id !== user.id) {
            throw Error("검증할 수 없는 사용자입니다.")
        }
    },
}
