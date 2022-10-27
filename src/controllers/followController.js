import { 
checkFollowConnection,
insertFollowConnection,
removeFollowConnection } from "../repositories/followRepository.js";
import {
    okResponse,
    unprocessableRequestResponse,
    serverErrorResponse
} from "./controllerHelper.js"

async function checkFollow(req, res){
    const userId = res.locals.user.id;
    const {personId} = req.params
    if(!personId){
        return unprocessableRequestResponse(res, 'The requisition needs the id of the person')
    }
    
    try {
        const isFollower = ((await checkFollowConnection(userId, personId)).rows[0]);
        if(!isFollower){
            return okResponse(res, 'false')
        }    
        okResponse(res, 'true')
    } catch (error) {
        serverErrorResponse(res)
    }
}

async function followPerson(req, res){
    const userId = res.locals.user.id;
    const {personId} = req.body
    if(!personId){
        return unprocessableRequestResponse(res)
    }

    try {
        const isFollower = ((await checkFollowConnection(userId, personId)).rows[0]);
        if(isFollower){
           return okResponse(res, 'The user is already following the person.') 
        }
        await insertFollowConnection(userId, personId)
        okResponse(res)
    } catch (error) {
        unprocessableRequestResponse(res)
    }
}
async function unfollowPerson(req, res){
    const userId = res.locals.user.id;
    const {personId} = req.params
    if(!personId){
        return unprocessableRequestResponse(res)
    }
    try {
        const isFollower = ((await checkFollowConnection(userId, personId)).rows[0]);
        if(!isFollower){
           return okResponse(res, 'The user is already unfollowed the person.') 
        }
        await removeFollowConnection(userId, personId)
        okResponse(res)
    } catch (error) {
        unprocessableRequestResponse(res)
    }
}

export {
    checkFollow,
    followPerson,
    unfollowPerson
}