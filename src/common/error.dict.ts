export const getExceptionText = {
    CREATE_TOPIC_BAD_REQUEST: "Create Topic BadRequest",
    GET_TOPIC_BAD_REQUEST: (query = '') => {
        if (query) {
            return `Get Topic by ${query} BadRequest`
        }
        return `Get Topic BadRequest`;
    },
    GET_TOPIC_NOT_FOUND: (query = '') => {
        if(query) {
            return `Topic by ${query} is not found`;
        }
        return `Topic is not found`;
    }
}