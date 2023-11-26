// models/user.sql.js

export const insertUserSql = "INSERT INTO member (name, nickname, gender, email, birth, status, address, created_at, updated_at, inactive_date, phone_num, clear_mission_num) VALUES (?, ?, ?, ?, ?, 'active', ?, now(), now(), null, ?, 0);";

export const getUserID = "SELECT * FROM member WHERE id = ?";

export const connectFoodCategory = "INSERT INTO user_favor_category (f_category_id, user_id) VALUES (?, ?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail";

export const getPreferToUserID =
"SELECT ufc.uf_category_id, ufc.f_category_id, ufc.user_id, fcl.f_category_name "
+ "FROM user_favor_category ufc JOIN food_category_list fcl on ufc.f_category_id = fcl.f_category_id "
+ "WHERE ufc.user_id = ? ORDER BY ufc.f_category_id ASC;";


//week9
export const insertMissionQuery = "INSERT INTO user_has_mission (user_id, mission_id, store_id) VALUES (?,?,?);";
export const getMissionQuery = "SELECT * FROM mission WHERE mission_id = ?;";