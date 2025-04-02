export const GetTopicSwagger = {
    operation: { summary: 'Get topic' },
    code_200: { status: 200, description: 'The Topic has been successfully sent' },
    code_403: { status: 403, description: 'Forbidden.' }
}
export const GetTopicsSwagger = {
    operation: { summary: 'Get all topics' },
    code_200: { status: 200, description: 'The list of topics has been successfully sent' },
    code_403: { status: 403, description: 'Forbidden.' }
}

export const PostTopicSwagger = {
    operation: { summary: 'New topic creation' },
    code_201: { status: 201, description: 'The topic was successfully created' },
    code_403: { status: 403, description: 'Forbidden.' }
}