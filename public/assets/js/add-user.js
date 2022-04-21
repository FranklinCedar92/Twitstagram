function addPizza() {
    // there will be consts for username and email

    const formData = { username, email };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(postResponse => {
            alert('User created!');
        })
        .catch(err => {
            console.log(err);
        });
};