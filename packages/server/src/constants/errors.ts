export const TOPIC_NOT_FOUND = 'TOPIC_NOT_FOUND'
export const COMMENT_NOT_FOUND = 'COMMENT_NOT_FOUND'
export const REPLY_NOT_FOUND = 'REPLY_NOT_FOUND'
export const PARENT_REPLY_NOT_FOUND = 'PARENT_REPLY_NOT_FOUND'
export const REACTION_NOT_FOUND = 'REACTION_NOT_FOUND'
export const UNAUTHORIZED_REACTION_REMOVAL = 'UNAUTHORIZED_REACTION_REMOVAL'

export const NOT_FOUND_MESSAGES = {
  [TOPIC_NOT_FOUND]: 'Topic not found',
  [COMMENT_NOT_FOUND]: 'Comment not found',
  [REPLY_NOT_FOUND]: 'Reply not found',
  [PARENT_REPLY_NOT_FOUND]: 'Parent reply not found',
  [REACTION_NOT_FOUND]: 'Reaction not found',
  [UNAUTHORIZED_REACTION_REMOVAL]: 'You can only remove your own reactions',
}
