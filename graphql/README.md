# GraphQL Queries and Mutations

## Some examples are shown down bellow:

```javascript
# Welcome to Altair GraphQL Client.
# You can send your request using CmdOrCtrl + Enter.

# ... on UserType {
#       id
#       username
#     }
#     ... on MessageResult {
#       message
#     }


mutation Register {
  register(registerInput: { username: "nicu.ducal", password: "1234", email: "nic1u@ducal.com", firstName: "Nicu", lastName: "Ducal"}) {
         ... on UserType {
      id
      username
    }
    ... on MessageResult {
      message
    }
  }
}

# Login Admin
mutation LoginAdmin {
  login(loginInput: { username: "store.admin", password: "1234" }) {
    token
  }
}

# Login User
mutation LoginUser {
  login(loginInput: { username: "nicu.ducal", password: "1234" }) {
    token
  }
}

# # adminul ofera drepturi de admin userului cu id-ul introdus
# mutation GrantAdminRoles {
#   grantAdminRole(id: 23) {
#     message
#   }
# }

# # adminul revoca privilegiile de admin a unui alt admin
# mutation RevokeAdminRole {
#   revokeAdminRole(id: 23) {
#     message
#   }
# }

## USERS

# Afiseaza toti userii
query GetAllUsers {
  users {
    username
  }
}

## Category

# Afiseaza toate categoriile
query CategoriesAll {
  categories {
    id
    name
  } 
}

# Afiseaza o caterogie dupa un id anumit
query Category {
  category(id: 39) {
    name
  }
}

# Adauga o categorie in baza de date
mutation AddCategory {
    addCategory(categoryInput: {name: "Counter-Strike"}) {
    ... on CategoryType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

# Modifica o categorie dupa id
mutation EditCategory {
  editCategory(id: 39, data: {name: "CS:GO"}) {
    ... on CategoryType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

# Elimina o categorie dupa id
mutation RemoveCategory {
  removeCategory(id: 40) {
    ... on CategoryType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

## Publisher


# Afiseaza toti publisher-ii
query PublisherAll {
  publishers {
    id
    name
  } 
}

# Afiseaza un publisher dupa un id anumit
query Publisher {
  publisher(id: 39) {
    name
  }
}

# Adauga un publisher in baza de date
mutation AddPUblisher {
    addPublisher(name: "Valve Inc") {
    ... on PublisherType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

# Modifica un publisher dupa id
mutation EditPublisher {
  editPublisher(id: 39,name: "Source Inc") {
    ... on PublisherType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

# Elimina un publisher dupa id
mutation RemovePublisher {
  removePublisher(id: 305) {
    ... on PublisherType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

## Platform


# Afiseaza toate platformele
query PlatformAll {
  platforms {
    id
    name
  } 
}

# Afiseaza o platforma dupa un id anumit
query Platform {
  platform(id: 1) {
    name
  }
}

# Adauga o platforma in baza de date
mutation AddPlatform {
    addPlatform(platformInput: {name: "Toaster"}) {
    ... on PlatformType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

# Modifica o platforma dupa id
mutation EditPlatform {
  editPlatform(id: 1, data: {name: "Fridge" }) {
    ... on PlatformType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

# Elimina o platforma dupa id
mutation RemovePlatform {
  removePlatform(id: 1) {
    ... on PlatformType {
      id
      name
    }
    ... on MessageResult {
      message
    }
  }
}

## Game

# Afiseaza toate jocurile
query AllGames {
  games {
    id
    title
  }
}

# Afiseaza doar jocurile disponibil
query AllAvailableGames {
  availableGames {
    id
    title
  }
}

# Afiseaza un joc dupa un anumit id
query GameById {
  game(id: 300) {
    title
    isAvailable
    
  }
}

# Afiseaza jocurile dupa un anumit criteriu
query FilteredGames {
  filteredGames(categoryId: 1, platformId: 1, publisherId: 2) {
    title
    category {
      id
      name
    }
    platform {
      id
      name
    }
  }
}

# Adauga un joc
mutation AddGame {
  addGame(gameInput: {title: "Sekiro", description: "hehe", PublisherId: 2}) {
    ... on GameType {
      id
      title
    }
    ... on MessageResult {
      message
    }
  }
}

# Editeaza un joc
mutation EditGame {
  editGame(data: {id: 305, newGameData: {title: "Sekiro: Shadows die twice"}}) {
    ... on GameType {
      id
      title
    }
    ... on MessageResult {
      message
    }
  }
}

# Seteaza vizibilitatea unui joc
mutation SetGameVisibility {
  setGameVisibility(id: 300, status: true) {
    ... on GameType {
      id
      title
    }
    ... on MessageResult {
      message
    }
  }
}

# Sterge un joc din baza de date
mutation DestroyGame {
  destroyGame(id: 300) {
    ... on GameType {
      id
      title
    }
    ... on MessageResult {
      message
    }
  }
}

## Purchases

# Afiseaza toate achizitiile
query AllPurchases {
  purchases {
    game {
      title
    }
    user {
      username
    }
  }
}

# Afiseaza achizitiile userului logat
query UserPurchases {
  userPurchases {
    game {
      title
      id
    }
    price
  }
}

# Afiseaza achizitiile unui anumit user
query PurchasesWithUserId {
  purchasesWithUserId(id: 2) {
    user {
      username
    }
    game {
      title
    }
    price
  }
}

# Userul logat face o achizitie
mutation Purchase {
  purchase(GameId: 1) {
    ... on PurchaseType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      price
    }
    ... on MessageResult {
      message
    }
  }
}

# Adminul adauga o achizitie la un user
mutation AddPurchaseToUser {
  addPurchaseToUser(UserId: 3, GameId: 6) {
    ... on PurchaseType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      price
    }
    ... on MessageResult {
      message
    }
  }
}

# Adminul elmina o achizitie
mutation RemovePurchase {
  removePurchase(UserId: 3, GameId: 6) {
    ... on PurchaseType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      price
    }
    ... on MessageResult {
      message
    }
  }
}

## Review

# Afiseaza toate recenziile
query AllReviews {
  reviews {
    user {
      username
    }
    game {
      title
    }
    comment
    rating
  }
}

# Afiseaza recenziile userului logat
query UserReviews {
  userReviews {
    user {
      username
    }
    game {
      id
      title
    }
    comment
    rating
  }
}

# Afiseaza recenziile unui anumit user
query ReviewsWithUserId {
  reviewsWithUserId(id: 3){
    game {
      id
      title
    }
    comment
    rating
  }
}

# Afiseaza recenziile la un anumit joc
query ReviewsWithGameId {
  reviewsWithGameId(id: 1){
    game {
      id
      title
    }
    comment
    rating
  }
}

# Userul logat face o recenzie
mutation AddReview {
  review(GameId: 10, rating: 3, comment: "Meeeerge") {
    ... on ReviewType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      comment
      rating
    }
    ... on MessageResult {
      message
    }
  }
}

# Adminul adauga o recenzie unui user
mutation AddReviewAdmin {
  review(UserId: 10, GameId: 36, rating: 2, comment: "Oribil") {
    ... on ReviewType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      comment
      rating
    }
    ... on MessageResult {
      message
    }
  }
}

# Userul logat isi editeaza o recenzie
mutation EditReview {
  editReview(GameId: 10, comment: "ff bun") {
    ... on ReviewType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      comment
      rating
    }
    ... on MessageResult {
      message
    }
  }
}

# Adminul editeaza o recenzie a unui user
mutation EditReviewAdmin {
  editReview(UserId: 3, GameId: 114, comment: "cool") {
    ... on ReviewType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      comment
      rating
    }
    ... on MessageResult {
      message
    }
  }
}

# Userul isi sterge propriul review
mutation RemoveReview {
  removeReview(GameId: 10) {
    ... on ReviewType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      comment
      rating
    }
    ... on MessageResult {
      message
    }
  }
}

# Adminul sterge recenzia unui user
mutation RemoveReviewAdmin {
  removeReview(UserId: 3, GameId: 114) {
    ... on ReviewType {
      user {
        id
        username
      }
      game {
        id
        title
      }
      comment
      rating
    }
    ... on MessageResult {
      message
    }
  }
}
```
