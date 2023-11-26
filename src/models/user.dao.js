import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID } from "./user.sql.js";
import { insertMissionQuery, getMissionQuery } from "./user.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmEmail, data.email);

        if(confirm[0].isExistEmail){
            conn.release();
            return -1;
        }

        const result = await pool.query(insertUserSql, [data.name, data.nickname, data.gender, data.email, data.birth, data.address, data.phone_num]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        console.log(user);

        if(user.length == 0){
            return -1;
        }

        conn.release();
        return user;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectFoodCategory, [foodCategoryId, userId]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);

    }
}

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserID, userID);

        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//week9
export const insertMission = async (data) => {
	try {
		const conn = await pool.getConnection();

		const result = await pool.query(insertMissionQuery, [data.user_id, data.store_id, data.mission_id]);

		conn.release();
		return result[0].insertId;

	} catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
	}
}

export const getJoinMission = async (missionId) => {
	try {
		const conn = await pool.getConnection();

		const [mission] = await pool.query(getMissionQuery, missionId);

		console.log(mission);
		if(mission.length==0){
			return -1;
		}
		conn.release();
		return mission;
	} catch (err) {
	    throw new BaseError(status.PARAMETER_IS_WRONG);
	}
}