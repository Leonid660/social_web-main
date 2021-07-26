import React from 'react'
import s from "./users.module.css";
import userPhoto from "../../assets/images/172-1724489_defaultavatar-user-icon-black-png.png";
import {NavLink} from "react-router-dom"
import * as axios from "axios";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.selectPage}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}
                >{p}</span>
            })}

        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.usersPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed

                            ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                      onClick={() => {
                                          props.toggleFollowingProgress(true, u.id)
                                          axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                              withCredentials: true,
                                              headers: {
                                                  "API-KEY": "ce02fdc3-f220-462d-8381-68f1127f7d72"
                                              }
                                          })
                                              .then(response => {

                                                  if (response.data.resultCode == 0) {
                                                      props.unfollow(u.id)
                                                  }
                                                  props.toggleFollowingProgress(false, u.id)
                                              })
                                      }}>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleFollowingProgress(true, u.id)
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "ce02fdc3-f220-462d-8381-68f1127f7d72"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
                                        props.toggleFollowingProgress(false, u.id)
                                    })
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                      <span>
                        <div>{"u.location.city"}</div>
                          <div>{"u.location.country"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users