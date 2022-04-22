const getUserList = () => {
    fetch('/api/users')
        .then(response => response.json())
        //.then(userListArr => {
            //userListArr.forEach( I don't need this because it prints the user )
        //})
        .catch(err => {
            console.log(err);
        });
};

getUserList();