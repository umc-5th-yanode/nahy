// response.js
// 응답 포맷
export const response = ({isSuccess, code, message}, result) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result
    }
};