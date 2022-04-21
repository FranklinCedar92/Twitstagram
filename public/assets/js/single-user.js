let userId;

function getUser() {
    // get id of user
    const searchParams = new URLSearchParams(document.location.search.substring(1));
    const userId = searchParams.get('id');

    // get user info
    fetch(`/api/users/${userId}`)
        .then(response => {
            if(!response.ok) {
                throw new Error({ message: "something's not right..." });
            }
            return response.json();
        })
        .then(printUser)
        .catch(err => {
            console.log(err);
            alert('No user found with this id!');
        });
}

function newThought() {

//const thoughtBody = //I'm not sure what this is
//const writtenBy = //I'm also not sure

if (!thoughtBody || writtenBy ) {
    return false;
}

const formData = { thoughtBody, writtenBy };

    fetch(`/api/thoughts/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        response.json();
      })
      .then(thoughtResponse => {
        console.log(thoughtResponse);
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
}

function newReaction() {

    // const thoughtId = // I'm really not sure

    // const writtenBy = // what is this?
    // const thoughtBody = // what is this?

    if (!writtenBy || !thoughtBody) {
        return false;
    }

    const formData = { writtenBy, thoughtBody };

    fetch(`/api/comments${userId}/${thoughtId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        response.json();
      })
      .then(thoughtResponse => {
        console.log(thoughtResponse);
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
}

getUser();