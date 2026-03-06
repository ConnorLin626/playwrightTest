const { proxyTrack } = require("./proxyTrack");

class LoginApi {
    signin() {
      console.log("/users/signin");
    }
    signout() {
      console.log("/users/signout");
    }
    signup(body) {
      console.log("/users/");
    }
    isAuth() {
      console.log("/users/isAuth");
    }
}

loginApi = new Proxy(new LoginApi(), {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      if(propKey === 'isAuth') {
        return () => { console.log('没有权限'); }
      }
      return Reflect.get(target, propKey, receiver);
    }
  })
  loginApi.signin()
  loginApi.isAuth()
