
import ActionTypes from '../constant/constant';
import history from '../../History';
import axios from 'axios';
// import createBrowserHistory from 'history/createBrowserHistory'
import firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()

// const hsitory = createBrowserHistory()




// var config = {
//     apiKey: "AIzaSyBPEIY_SxIp5jc47hEUqua1Y6im7E7LlTE",
//     authDomain: "nombox-web.firebaseapp.com",
//     databaseURL: "https://nombox-web.firebaseio.com",
//     projectId: "nombox-web",
//     storageBucket: "nombox-web.appspot.com",
//     messagingSenderId: "762897181697"
// };
// firebase.initializeApp(config);

var config = {
    apiKey: "AIzaSyCkWo2gOBHS00Uft4ZtLyeA_bAJUGxDy_k",
    authDomain: "nombox-1529885929392.firebaseapp.com",
    databaseURL: "https://nombox-1529885929392.firebaseio.com",
    projectId: "nombox-1529885929392",
};
firebase.initializeApp(config);



export function sendFormDataAction(data) {
    return dispatch => {

        console.log(data, "action----> data")
        firebase.database().ref('registrationData/').push(data)
            .then(() => {
                console.log("Registered Successfully")
                dispatch({ type: ActionTypes.FORMSUCCESS, payload: true })
                dispatch({ type: ActionTypes.TYPE, payload: data.type })
                axios({
                    method: 'post',
                    url: 'https://us-central1-nombox-1529885929392.cloudfunctions.net/sendEmail',
                    data: {
                        email: data.email,
                        registrationType: data.type,
                        fullName: data.fullName
                    }
                }).then((res) => { console.log(res, 'res') });

            })
    }
}


export function signupAction(user) {

    return dispatch => {
        console.log('user', user);
        // history.push('/signin');

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                console.log('signed up successfully', createdUser.uid);
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('users/').once('value')
                            .then((userData) => {
                                let allUsers = userData.val();
                                let currentUserUid = firebase.auth().currentUser.uid;
                                dispatch({ type: ActionTypes.ALLUSERS, payload: allUsers })
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                firebase.database().ref('message/').once('value')
                                    .then((messagesData) => {
                                        let messages = messagesData.val();
                                        console.log(messages);
                                        dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                                        history.push('/chat');
                                    })

                            })
                    })


            })



    }
}



export function signinAction(user) {
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('users/').once('value')
                    .then((userData) => {
                        let allUsers = userData.val();
                        let currentUserUid = firebase.auth().currentUser.uid;
                        let allUsersArr = [];
                        for (var key in allUsers) {
                            allUsersArr.push(allUsers[key]);
                        }
                        console.log(allUsersArr);
                        dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                        firebase.database().ref('message/').once('value')
                            .then((messagesData) => {
                                let messages = messagesData.val();
                                console.log(messages);

                                dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                                history.push('/chat');
                            })




                    })
            })
    }
}






export function changeRecipientUID(recpUID) {
    return dispatch => {
        dispatch({ type: ActionTypes.CHANGERECPUID, payload: recpUID })
    }
}



export function sendMessage(message) {
    return dispatch => {
        firebase.database().ref('message/').push(message)
            .then(() => {
                console.log('message sent')
            })

    }
}