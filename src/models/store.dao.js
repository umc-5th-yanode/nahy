import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertStoreQuery,getStoreQuery, confirmStore, insertReviewQuery, getReviewQuery } from "./store.sql.js";
import { getReviewByReviewIdAtFirst, getReviewByReviewId } from "./store.sql.js";

export const insertStore = async (data) => {
    try {
    const conn = await pool.getConnection();
        const result = await pool.query(insertStoreQuery, [data.name, data.phone, data.address, data.region_id]);
        conn.release();
        return result[0].insertId;

    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStore = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const result = await pool.query(getStoreQuery, storeId);
        conn.release();
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const insertReview = async (data) => {
	try{
		const conn = await pool.getConnection();
		const [confirm] = await pool.query(confirmStore, data.store_id);

		if(confirm[0]==null){
			conn.release();
			return -1;
		}

		const result = await pool.query(insertReviewQuery, [data.content, data.store_id, data.score]);

		conn.release();
		return result[0].insertId;
		
	}catch (err) {
		throw new BaseError(status.PARAMETER_IS_WRONG);
	}
}

export const getStoreReview = async (reviewId) => {
    try {
        const conn = await pool.getConnection();
        
        const [review] = await pool.query(getReviewQuery, reviewId);

				console.log(review);
				if(review.length==0){
					return -1;
				}

        conn.release();
        
        return review;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);

    }
}

export const getPreviewReview = async (cursorId, size, storeId) => {
    try {
        const conn = await pool.getConnection();

        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [reviews] = await pool.query(getReviewByReviewIdAtFirst, [parseInt(storeId), parseInt(size)]);
            conn.release();
            return reviews;
    
        }else{
            const [reviews] = await pool.query(getReviewByReviewId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return reviews;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}