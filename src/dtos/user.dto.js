// sign in response DTO
export const signinResponseDTO = (user/*, prefer*/) => {
    // const preferFood = [];
    // for (let i = 0; i < prefer[0].length; i++) {
    //     preferFood.push(prefer[0][i].f_category_name);
    // }
    return {"id": user[0].id, "name": user[0].name, /*"preferCategory": preferFood*/};
}

export const joinMissionResponseDTO = (mission) => {
    return {"store_id": mission.store_id, "mission_id": mission.mission_id, "mission_status" : mission.mission_status};
}