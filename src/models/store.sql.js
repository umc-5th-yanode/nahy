export const insertStoreQuery = "INSERT INTO store (name, phone, address, region_id) VALUES (?,?,?,?);";
export const getStoreQuery = "SELECT * FROM store WHERE store_id = ?;";
export const confirmStore = "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;";
export const insertReviewQuery = "INSERT INTO review (content, store_id, score) VALUES (?,?,?);";
export const getReviewQuery ="SELECT * FROM review WHERE id = ?;";

export const getReviewByReviewId = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.restaurant_id = ? AND r.review_id < ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"

export const getReviewByReviewIdAtFirst = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.restaurant_id = ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"