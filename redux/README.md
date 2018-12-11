# Includes

Redux Files

## Folders / Files

### Tree

+reducer
service1.js  
 service2.js  
+sagas  
 actions.js  
 reducer.js
+store
store.js  
constants.js
localStorage.js  
reducer.js
restApi.js

### Files Description

`constants.js` defines the constants of all the actions.  
`localStorage.js` has nothing but the function to define memoryStorage according to the browser support. (usually localStorage but sometimes it can be MemoryStorage instance)  
`reducer.js` is to combine all reducers from features.  
`restApis.js` give a way to get common ret api endpoints per feature.  
`sagas.js` combines all sagas (for now it is not used but will consider later).  
`store.js` configures the store.
