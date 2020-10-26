export class Navbar {
 
  get isLoggedIn(){
    console.log(!!window.localStorage.getItem('token'));
    //userInfo is an object that is updated on authentication
    return !!window.localStorage.getItem('token');
}
}
