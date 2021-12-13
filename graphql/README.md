# GraphQL Queries and Mutations

## Some examples are shown down bellow:

```javascript
mutation Login {
  login(loginInput: { username: "nicu.ducal", password: "1234" }) {
    token
  }
}

mutation Register {
  register(registerInput: { username: "nicu.ducal", password: "1234", email: "nicu@ducal.com", firstName: "Nicu", lastName: "Ducal"}) {
    message
  }
}

query Users {
  users {
    username,
    lastName,
    firstName,
    id
  }
}
```
