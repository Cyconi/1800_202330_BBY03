let openSideBarE1 = document.getElementById("open-sideBar")
const sideBarE1 = document.getElementById("sideBar")
const closeSideBarE1 = document.getElementById("close-sidebar")

openSideBarE1.addEventListener("click", ()=>{
    sideBarE1.style.display = "block"
})

closeSideBarE1.addEventListener("click", ()=>{
    sideBarE1.style.display = "none"
})

function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the username
                let userName = userDoc.data().name;
                let userLocation = userDoc.data().location

                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("username-goes-here").innerText = userName;
                document.getElementById("userLocation-goes-here").innerText = userLocation
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();

document.querySelector('#logout').addEventListener('click', function (){
    firebase.auth().signOut().then(() => {
        window.location.href = 'login.html'
    })
})

const user = firebase.auth().currentUser;


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection('users').doc(user.uid).get().then (doc => {
            if (doc.exists) {
                const userData = doc.data()

                if (userData.photoURL) {

                    document.querySelector('#userImg').src = userData.photoURL
                }
            } else {
                console.log("No such document")
            }
        }).catch((error) => {
            console.log("Error getting document", error)
        })
    } else {
        console.log("No user log in")
    }
})

function toggleInfo() {
    var infoContainer = document.querySelector('.info-container');
    if (infoContainer.style.display === "none" || !infoContainer.style.display) {
        infoContainer.style.display = "block";
    } else {
        infoContainer.style.display = "none";
    }
}


