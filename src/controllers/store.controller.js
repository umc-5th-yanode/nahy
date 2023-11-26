import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { addStore } from "../services/store.service.js";
import { reviewStore } from "../services/store.service.js";
import { getReview } from "../providers/store.providers.js";


export const storeAdd = async (req, res, next) => {
    console.log("새로운 지역에 가게 추가 요청!");
    console.log("body : ", req.body);

    res.send(response(status.SUCCESS, await addStore(req.body)));
}

export const storeReview = async (req, res, next) => {
    console.log("리뷰를 작성 요청하였습니다.");
    console.log("body:", req.body); 

    res.send(response(status.SUCCESS, await reviewStore(req.body)));

}

// store.controller.js

export const reviewPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await getReview(req.params.storeId, req.query)));
}