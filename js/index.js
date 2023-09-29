let searchForm = document.querySelector('#github-form')
let h2 = document.querySelector('#h2')
h2.textContent = "GitHub Search: Enter Username"

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let user = event.target.search.value;
    searchForm.reset();
    searchUser(user)
})

function searchUser(user) {
    fetch(`https://api.github.com/search/users?q=${user}`)
        .then(response => response.json())
        .then(data => data.items.forEach(renderUserResults))
        .catch(error => console.log(error))
}

function renderUserResults(items) {
    let userList = document.querySelector('#user-list')
    let userContainer = document.createElement('li')

    let p = document.createElement('p')
    let link = document.createElement('a')

    p.textContent = items.login
    p.id = 'usersname'
    link.innerHTML = 'view profile'
    link.href = items.html_url

    userList.appendChild(userContainer)
    userContainer.appendChild(p)
    userContainer.appendChild(link)
    

    p.addEventListener('click', (event) => {
        fetch(`https://api.github.com/users/${event.target.innerHTML}/repos`)
            .then(response => response.json())
            .then(data => data.forEach(renderRepoResults))
            .catch(error => console.log(error))
    })
}

function renderRepoResults(repo) {
    let repoList = document.querySelector('#repos-list')
    let repoContainer = document.createElement('li')

    let pRepo = document.createElement('p')
    let repoLink = document.createElement('a')

    pRepo.textContent = repo.name
    repoLink.innerHTML = 'view repo'
    repoLink.href = repo.html_url

    repoList.appendChild(repoContainer)
    repoContainer.appendChild(pRepo)
    repoContainer.appendChild(repoLink)
}