document.querySelector('button[id="log-out"]').addEventListener("click",function(stop){
    stop.preventDefault();
    deleteCookie();
    console.log("log out successfully")

  })
// updated variable;
var update_first_name, update_surname, update_user_name, update_email, update_password
var user_id = document.cookie
  

  //patch user new data in the data
document.querySelector('button[id="update-user"]').addEventListener("click",function(stop){
    stop.preventDefault();
    update_first_name = document.getElementById("first_name").value  
    update_surname =  document.getElementById("surname").value;
    update_user_name = document.getElementById("user_name").value;
    update_email =  document.getElementById("email").value;
    update_password = document.getElementById("password").value;
    $('#userProfileModal').modal('hide');
    updateUser(user_id,update_first_name,update_surname,update_user_name,update_email,update_password);

    console.log("User details updated")

  })

  //delete a user account
  document.querySelector('button[id="delete-user"]').addEventListener("click",function(stop){
    stop.preventDefault();
    let userId = document.cookie;
    console.log(userId);
    deleteUser(userId);

  })

//get user data in the form
document.getElementById("my-profile").addEventListener('click',function(stop)
{
  fetch('http://localhost:3000/api/users/' + user_id)
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().
        then(function (data) {
          if(data.length==0){
            return;
          }
          generateTable(data,user_id)
        });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
})

function generateTable(data,userId){
  for (let index = 0; index < data.length; index++) {
    if(userId== data[index].user_id){
      document.getElementById("first_name").value  = data[index].first_name;
      document.getElementById("surname").value  = data[index].surname;
      document.getElementById("user_name").value  = data[index].user_name;
      document.getElementById("email").value  = data[index].email;
      document.getElementById("password").value  = data[index].password;

    }   
  }

}


function updateUser(userId, update_first_name, update_surname,update_user_name,update_email,update_password){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
    let dataToUpdate ={
          "first_name": update_first_name,
          "surname": update_surname,
          "user_name": update_user_name,
          "email": update_email,
          "password": update_password
  }
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: JSON.stringify(dataToUpdate),
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/api/users/"+userId, requestOptions)

  .then(function (data) {

      console.log('Request succeeded with JSON response', data);
      document.getElementById("show-msg").innerHTML="User details Updated";
      $('#messageModal').modal('show');
              
  })
  .catch(function (error) {
      console.log('Request failed', error);
      document.getElementById("show-msg").innerHTML="Failed to Update user";
      $('#messageModal').modal('show');
  });

}
function deleteUser(userId){
    console.log(userId);
    fetch("http://localhost:3000/api/users/" + userId, {
        method: 'delete',
        headers: {
            "Content-type": "application/json"
        },
    })

        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
           //Authenticate before delete it and send appropiate message
           deleteCookie();


        })
        .catch(function (error) {
            console.log('Request failed', error);
            document.getElementById("show-msg").innerHTML="No User found!";
        });

}

function deleteCookie(){
    document.cookie = "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href= "index.html";
}

