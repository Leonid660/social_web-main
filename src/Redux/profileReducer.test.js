import profileReducer, {addPostAC} from "./profileReducer";

it('length of posts should be incremented',() => {
    // 1. test date
    let action = addPostAC("it-kamasutra.com")
    let state = {
        posts: [
            {id: 1, message: 'Hi, how are you', likesCount: 12},
            {id: 2, message: 'it`s my first post', likesCount: 11},
        ]
    }
    //2. action
    let newState = profileReducer(state,action)
    //3.expectation
    expect (newState.post.length).toBe(3)
})


