import ActionTypes from '../Constant/constant';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'
import axios from 'axios'


export function signUpAction(data) {
    return dispatch => {
        console.log(data, "action working")
        dispatch({ type: ActionTypes.LOADER })
        if (data.password === data.repeatPassword) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((user) => {
                    dispatch({ type: ActionTypes.LOADER })
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage, "save authentication");
                    dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                })
        } else {
            var errorMessage = "Please check password";
            dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
            setTimeout(() => {
                dispatch({ type: ActionTypes.HIDEERROR })
            }, 3000)
        }
    }
}

export function signinAction(users) {
    return dispatch => {
        console.log(users, "ACTION")
        dispatch({ type: ActionTypes.LOADER })
        firebase.auth().signInWithEmailAndPassword(users.email, users.password)
            .then((signedinUser) => {
                console.log(signedinUser, "SIGNINUSER")
                dispatch({ type: ActionTypes.LOADER })

            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage, "save authentication");
                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })




    }
}


export function logOut() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            Actions.signIn()
        }, function (error) {
            // An error happened.
            console.log('log out nahen hua', error.message)
        });

    }
}


export function forgotPassword(email) {
    return dispatch => {
        console.log(email, "userrrrrrrr")
        dispatch({ type: ActionTypes.LOADER })
        firebase.auth().sendPasswordResetEmail(email)
            .then((user) => {
                dispatch({ type: ActionTypes.LOADER })
                alert("Please check your Email  ")
                Actions.signIn()
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.SHOWERROR, payload: error.message })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
                var errorMessage = error.message;
                console.log(errorMessage)
            });

    }
}


export function mealAction(details) {
    return dispatch => {
        let id = firebase.auth().currentUser.uid
        console.log(details, "MEALSDEATILSACTION")
        details.chefId = id
        details.orderKey = firebase.database().ref('meals/').push().key;
        firebase.database().ref('meals/').push(details).then(() => {

            alert("Meal added successfuly")
            Actions.HomeSeller()
        })
    }
}

// export function getCarouselAction(index) {
//     return dispatch => {
//         dispatch({ type: ActionTypes.CAROUSELINDEX, payload: index })
//     }
// }


export function clearReduxStateAction() {
    return dispatch => {
        dispatch({ type: ActionTypes.CLEARREDUXSTATE })
    }
}

export function getChefsAction(currentUser) {
    return dispatch => {
        axios.post('https://us-central1-nombox-1529885929392.cloudfunctions.net/getChefs', currentUser).then(function (response) {
            console.log(response, "Responce")
            dispatch({ type: ActionTypes.GETCHEFS, payload: response.data })

        })
        // let array = [];
        // console.log(currentUser, "currentuserCorrds")
        // firebase.database().ref('meals/').once('value', (snapshot) => {
        //     console.log(snapshot.val(), 'snapshot')
        //     let data = snapshot.val()
        //     Object.values(data).map((arr, index) => {
        //         console.log(arr, index)
        //         array.push(arr)
        //     })
        //     getArray(array, currentUser)
        //         .then(async (filteredArray) => {
        //             // console.log(filteredArray)
        //             await filteredArray
        //             console.log(filteredArray, "ArrinGet array in action")

        //             dispatch({ type: ActionTypes.GETCHEFS, payload: filteredArray })
        //         })
        // })

    }
}

// getArray = async (arr, currentUser) => {
//     console.log(arr, "ARRAYINGET")
//     console.log(currentUser, "currentUserAYINGET")
//     let filteredArray = []
//     // console.log(currentUser, 'Current User')
//     let orderedArray = await geolib.orderByDistance(currentUser, arr)
//     console.log(orderedArray, "ORDEREDARRAY")
//     orderedArray.map((data, index) => {
//         console.log(data, index, 'before Filter')
//         if (index <= 5) {
//             console.log(data, index, 'after filter')
//             let obj = {
//                 distance: data.distance,
//                 key: data.key,
//                 latitude: arr[index].latitude,
//                 longitude: arr[index].longitude,
//                 chefId: arr[index].chefId,
//                 title: arr[index].title,
//                 image: arr[index].downloadedURL[0],
//                 orderKey: arr[index].orderKey,
//                 chef: 'Byrce Fox',
//                 rating: arr[index].rating,
//                 mealPrice: arr[index].mealPrice,
//                 mealTime: arr[index].mealTime
//                 // distance: '1.3 km',
//             }

//             filteredArray.push(obj)
//         }
//     })
//     // currentUser.currentPos = true
//     filteredArray.push(currentUser)
//     console.log(filteredArray, "ArrinGet array")
//     return filteredArray

// }

export function sentMessageAction(message, sessionKey, orderKey, isNewSession, recieverId) {
    return dispatch => {
        console.log(sessionKey, 'sessionKey')
        let senderId = firebase.auth().currentUser.uid
        let chatId;
        let messageobj = {
            message: message,
            timeStamp: Date.now(),
            senderId: senderId
        }
        if (senderId > recieverId) {
            chatId = senderId + recieverId
        } else {
            chatId = recieverId + senderId
        }
        if (isNewSession == true) {
            console.log('actionIF')
            // firebase.database().ref('Chats/' + chatId + '/' + sessionKey + '/').set({ orderKey: orderKey })
            firebase.database().ref('Chats/' + chatId + '/' + sessionKey + '/').push(messageobj).then(() => {
                firebase.database().ref('Sessions/' + recieverId + '/' + sessionKey + '/').set({ recieverId: senderId, sessionKey: sessionKey, orderKey: orderKey, status: 'Active' }).then(() => {
                    firebase.database().ref('Sessions/' + senderId + '/' + sessionKey + '/').set({ recieverId: recieverId, sessionKey: sessionKey, orderKey: orderKey, status: 'Active' })
                })
            })

        } else {
            console.log('actionELSE')
            let pushKey = firebase.database().ref('Chats/' + chatId + '/' + sessionKey + '/').push().key
            firebase.database().ref('Chats/' + chatId + '/' + sessionKey + '/' + pushKey + '/').set(messageobj)

        }

    }
}

export function checkSessionAction(orderKey) {
    return dispatch => {
        let currentUserId = firebase.auth().currentUser.uid
        firebase.database().ref("Sessions/" + currentUserId + '/').orderByChild("status").equalTo('Active').once('value').then((data) => {
            if (data.val() !== null) {
                console.log(data.val(), "SESSISONB")
                let allSession = data.val()
                Object.values(allSession).map((session) => {
                    if (orderKey == null) {
                        dispatch({ type: ActionTypes.ACTIVESESSION, payload: session })
                    }
                    else {
                        if (session.orderKey == orderKey) {

                            dispatch({ type: ActionTypes.ACTIVESESSION, payload: session })
                        } else {

                            dispatch({ type: ActionTypes.ACTIVESESSION, payload: null })
                        }
                    }
                })
            }
            else {
                console.log(data.val(), "SESSISONBelse")
                dispatch({ type: ActionTypes.ACTIVESESSION, payload: data.val() })

            }

        })
        // let id = null
        // if (currentUserId > recieverId) {
        //     id = currentUserId + recieverId
        // } else {
        //     id = recieverId + currentUserId
        // }
        // console.log(id, "ID")
        // firebase.database().ref("Sessions/" + currentUserId + '/').once('value', (data) => {
        //     console.log(data.val())
        //     if (data.val() !== null) {
        //         console.log(data.val(), "SESSISONB")
        //         dispatch({ type: ActionTypes.ACTIVESESSION, payload: data.val() })
        //     }
        //     else {
        //         console.log(data.val(), "SESSISONBelse")
        //         dispatch({ type: ActionTypes.ACTIVESESSION, payload: data.val() })

        //     }
        // })

    }
}

export function orderDetailsAction(orderDetails) {
    return dispatch => {
        let user = firebase.auth().currentUser
        if (user == null) {
            console.log('user==null')
            Actions.signIn({ order: true })
            dispatch({ type: ActionTypes.ORDERDETAILS, payload: orderDetails })
        }
        else {
            console.log('user!==>>>>>>>>>>>null')
            firebase.database().ref('orders/' + user.uid + '/').push(orderDetails)
                .then(() => {
                    alert('We got your order')
                    dispatch({ type: ActionTypes.ORDERDETAILSCLEAR })
                    Actions.BuyerHome()

                })
        }
    }
}



export function getChatsAction(recieverId, orderKey, sessionKey) {
    return dispatch => {
        let currentUserId = firebase.auth().currentUser.uid
        let id = null
        if (currentUserId > recieverId) {
            id = currentUserId + recieverId
        } else {
            id = recieverId + currentUserId
        }
        console.log(id, "ID")
        console.log(recieverId, 'reciverIdMessages')
        console.log(orderKey, 'orderKeyMessages')
        console.log(sessionKey, 'sessionKeyMessages')

        firebase.database().ref('Chats/' + id + '/' + sessionKey + '/').on('child_added', (snapshot) => {
            let value = snapshot.val();
            console.log(value, 'valueeeee')
            dispatch({ type: ActionTypes.GETCHATS, payload: value })

            // Object.values(value).map((val, index) => {
            //     if (val.orderKey == orderKey) {
            //         console.log(val, "checkarratElements")
            //         let key = val.orderKey
            //         // firebase.database().ref("meals/" + key).once('value', (mealDetails) => {
            //         //     console.log(mealDetails, "mealDetails")
            //         //     let details = {
            //         //         title: mealDetails.title,
            //         //         mealTime: mealDetails.mealTime,
            //         //         serving: mealDetails.serving
            //         //     }

            //         //     dispatch({ type: ActionTypes.GETCHATS, payload: details })
            //         // })
            //     }
            //     else {
            //         dispatch({ type: ActionTypes.GETCHATS, payload: data.val() })

            //     }
            // })
        })


        // console.log(data.val(), "DATAdata.val()___________________________")


    }
}


export function getAllSessionsAction() {
    return dispatch => {
        let currentUserId = firebase.auth().currentUser.uid

        // axios.post('https://us-central1-nombox-1529885929392.cloudfunctions.net/getChefs', currentUserId).then(function (response) {
        //     console.log(response, "Responce")
        //     dispatch({ type: ActionTypes.GETALLSESSIONS, payload: response.data })

        // })
        firebase.database().ref("Sessions/" + currentUserId + '/').orderByChild("status").equalTo('Active').once('value').then((data) => {
            if (data.val() !== null) {
                console.log(data.val(), "ALLSESSISONB")
                let allSession = data.val()
                Object.values(allSession).map((session) => {
                    dispatch({ type: ActionTypes.GETALLSESSIONS, payload: session })
                })
            }
            else {
                console.log(data.val(), "ALLSESSISONBelse")
                dispatch({ type: ActionTypes.GETALLSESSIONS, payload: data.val() })

            }

        })
    }
}