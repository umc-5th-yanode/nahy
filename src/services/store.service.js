import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addStoreResponseDTO } from "../dtos/store.dto.js";
import { insertStore, getStore } from "../models/store.dao.js";
import { reviewResponseDTO } from "../dtos/store.dto.js";
import { insertReview, getStoreReview } from "../models/store.dao.js";

export const addStore = async (body) => {

    const addStoreData = await insertStore({
        'name' : body.name,
        'phone' : body.phone,
        'region_id' : body.region_id,
        'address' : body.address
    });

    return addStoreResponseDTO(await getStore(addStoreData));
}

export const reviewStore = async (body) => {

    const reviewData = await insertReview({
            'content' : body.content,
            'store_id' : body.store_id,
            'score' : body.score
    });
    
    if(reviewData == -1){
            throw new BaseError(status.STORE_NOT_FOUND);
    } 
    //else {
            
    //}
    return reviewResponseDTO(await getStoreReview(reviewData));
}