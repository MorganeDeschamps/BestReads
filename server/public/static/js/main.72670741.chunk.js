(this["webpackJsonpnewapp-client"]=this["webpackJsonpnewapp-client"]||[]).push([[0],{35:function(e,t,a){},36:function(e,t,a){},38:function(e,t,a){},44:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),c=a(28),r=a.n(c),o=(a(35),a(12)),u=a(2),i=(a(36),a(0)),l=a(9),j=(a(38),function(e){return Object(i.jsxs)("nav",{children:[Object(i.jsx)(l.b,{to:"/",className:"nav__projectName",children:"Your app name"}),Object(i.jsx)("div",{className:"nav__authLinks",children:e.user?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(l.b,{to:"/protected",className:"authLink",children:"Protected Page"}),Object(i.jsx)("button",{className:"nav-logoutbtn",onClick:e.handleLogout,children:"Logout"})]}):Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(l.b,{to:"/auth/signup",className:"authLink",children:"Signup"}),Object(i.jsx)(l.b,{to:"auth/login",className:"authLink",children:"Log In"})]})})]})}),p=a.p+"static/media/logo.6ce24c58.svg";a(44);var h=function(){return Object(i.jsx)("div",{className:"App",children:Object(i.jsxs)("header",{className:"App-header",children:[Object(i.jsx)("img",{src:p,className:"App-logo",alt:"logo"}),Object(i.jsxs)("p",{children:["Edit ",Object(i.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(i.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},d=a(11),b=a(5),m=a(30),O=a.n(m),x="access_token",g="newapp";g[0].toUpperCase(),g.slice(1).toLowerCase();function f(e){return{status:!1,errorMessage:"Internal server error. Please check your server"}}function v(e){return{status:!0,data:e.data}}var w=O.a.create({baseURL:"".concat("https://deploy-project-3-ih-bcn.herokuapp.com/api","/auth")});a(63);var S=function(e){e.authenticate;var t=Object(n.useState)({username:"",email:"",password:""}),a=Object(o.a)(t,2),s=a[0],c=a[1],r=function(e){var t=e.target,a=t.name,n=t.value;c(Object(b.a)(Object(b.a)({},s),{},Object(d.a)({},a,n)))};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Sign Up"}),Object(i.jsxs)("form",{onSubmit:function(t){t.preventDefault(),function(e){return w.post("/signup",e).then(v).catch(f)}({username:s.username,password:s.password,email:s.email}).then((function(t){console.log(t),t.status||console.log("error"),localStorage.setItem(x,t.data.accessToken),e.authenticate(t.data.user),e.history.push("/")}))},className:"auth__form",children:[Object(i.jsx)("label",{htmlFor:"input-username",children:"Username"}),Object(i.jsx)("input",{id:"input-username",type:"text",name:"username",placeholder:"Text",value:s.username,onChange:r,required:!0}),Object(i.jsx)("label",{htmlFor:"input-username",children:"Email"}),Object(i.jsx)("input",{id:"input-email",type:"text",name:"email",placeholder:"Text",value:s.email,onChange:r,required:!0}),Object(i.jsx)("label",{htmlFor:"input-password",children:"Password"}),Object(i.jsx)("input",{id:"input-password",type:"password",name:"password",placeholder:"Password",value:s.password,onChange:r,required:!0,minLength:"8"}),Object(i.jsx)("button",{className:"button__submit",type:"submit",children:"Submit"})]})]})};var N=function(e){var t=e.authenticate,a=Object(n.useState)({username:"",password:""}),s=Object(o.a)(a,2),c=s[0],r=s[1],u=function(e){var t=e.target,a=t.name,n=t.value;r(Object(b.a)(Object(b.a)({},c),{},Object(d.a)({},a,n)))};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Log In"}),Object(i.jsxs)("form",{onSubmit:function(a){a.preventDefault(),function(e){return w.post("/login",e).then(v).catch(f)}({username:c.username,password:c.password}).then((function(a){a.status||console.log("error"),localStorage.setItem(x,a.data.accessToken),t(a.data.user),e.history.push("/")}))},className:"signup__form",children:[Object(i.jsx)("label",{htmlFor:"input-username",children:"Username"}),Object(i.jsx)("input",{id:"input-username",type:"text",name:"username",placeholder:"username",value:c.username,onChange:u,required:!0}),Object(i.jsx)("label",{htmlFor:"input-password",children:"Password"}),Object(i.jsx)("input",{id:"input-password",type:"password",name:"password",placeholder:"Password",value:c.password,onChange:u,required:!0,minLength:"8"}),Object(i.jsx)("button",{className:"button__submit",type:"submit",children:"Submit"})]})]})},L=function(e){console.log(e);var t=e.user;return Object(i.jsx)("div",{children:Object(i.jsxs)("h1",{children:["This page is protected just for you, ",t.username,"!"]})})},I=a(14),k=["exact","to","path","component"],A=function(e){var t=e.exact,a=e.to,n=e.path,s=e.component,c=Object(I.a)(e,k),r=s;return Object(i.jsx)(u.b,{exact:t,path:n||a,render:function(e){return Object(i.jsx)(r,Object(b.a)(Object(b.a)({},c),e))}})},_=["user","exact","to","path","component"],y=function(e){var t=e.user,a=e.exact,n=e.to,s=e.path,c=e.component,r=Object(I.a)(e,_),o=c;return t?Object(i.jsx)(u.b,{exact:a,path:s||n,render:function(e){return Object(i.jsx)(o,Object(b.a)(Object(b.a)(Object(b.a)({},r),e),{},{user:t}))}}):Object(i.jsx)(u.a,{to:"/auth/login"})};var E=function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],s=t[1];Object(n.useEffect)((function(){var e=localStorage.getItem(x);e||s(null),w.get("/session",{headers:{Authorization:localStorage.getItem(x)}}).then(v).catch(f).then((function(e){console.log(e),e.data?s(e.data.user):(console.log("RES IN CASE OF FAILURE",e),s(null))}))}),[]);var c=function(e){s(e)};return Object(i.jsxs)("div",{className:"App",children:[Object(i.jsx)(j,{handleLogout:function(){var e=localStorage.getItem(x);e||s(null),w.delete("/logout",{headers:{Authorization:localStorage.getItem(x)}}).then(v).catch(f).then((function(e){e.status||console.error("\ud83d\udca1 SOMETHING HAPPENED THAT HAS TO DEALT WITH",e),localStorage.removeItem(x),s(null)}))},user:a}),Object(i.jsxs)(u.d,{children:[Object(i.jsx)(A,{exact:!0,path:"/",component:h}),Object(i.jsx)(A,{exact:!0,path:"/auth/signup",authenticate:c,component:S}),Object(i.jsx)(A,{exact:!0,path:"/auth/login",authenticate:c,component:N}),Object(i.jsx)(y,{exact:!0,path:"/protected",component:L,user:a})]})]})};r.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(l.a,{children:Object(i.jsx)(E,{})})}),document.getElementById("root"))}},[[64,1,2]]]);
//# sourceMappingURL=main.72670741.chunk.js.map