import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { signinResponseDTO } from "../dtos/user.dto.js"
import { addUser, getUser, getUserPreferToUserID, setPrefer } from "../models/user.dao.js";

import { joinMissionResponseDTO } from "../dtos/user.dto.js"
import { insertMission, getJoinMission } from "../models/user.dao.js";

export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    const prefer = body.prefer;

    const joinUserData = await addUser({
        'name': body.name,
        'nickname' : body.nickname,
        'gender': body.gender,
        'email': body.email,
        'birth': birth,
        'address': body.addr,
        'phone_num': body.phone,
    });

    if(joinUserData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }
    else{
        // for (let i = 0; i < prefer.length; i++) {
        //     await setPrefer(joinUserData, prefer[i]);
        // }
        return signinResponseDTO(await getUser(joinUserData)/*, await getUserPreferToUserID(joinUserData)*/);
    }
}

export const joinMission = async (body) => {
	
	const joinMissionData = await insertMission({
		'store_id' : body.store_id,
		'mission_id' : body.mission_id,
		'user_id' : body.user_id
	});

	if(joinMissionData == -1){
		throw new BaseError(status.EMAIL_ALREADY_EXIST);
	} 
	//else{

	//}
	return joinMissionResponseDTO(await getJoinMission(joinMissionData));
}