(self.webpackChunkpaisa_sanchay=self.webpackChunkpaisa_sanchay||[]).push([[531],{2531:(t,r,e)=>{"use strict";e.r(r),e.d(r,{AuthModule:()=>J});var o=e(1116),n=e(3337),i=e(5366),s=e(7690);let a=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-auth"]],decls:7,vars:0,consts:[[1,"form_bg"],[1,"container"],[1,"row","justify-content-center"],[1,"col-md-offset-4","col-md-4","col-sm-offset-3","col-sm-6"],[1,"form_horizontal"]],template:function(t,r){1&t&&(i._UZ(0,"app-toast-notification"),i.TgZ(1,"div",0),i.TgZ(2,"div",1),i.TgZ(3,"div",2),i.TgZ(4,"div",3),i.TgZ(5,"div",4),i._UZ(6,"router-outlet"),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA())},directives:[s.f,n.lC],styles:[".form_bg[_ngcontent-%COMP%]{background:linear-gradient(180deg,indigo,#9400d3);height:100vh;display:flex;align-items:center}.form_horizontal[_ngcontent-%COMP%]{font-family:lato,sans-serif;text-align:center}"]}),t})();var c=e(1041),p=e(5204),l=e(529),d=e(1039);let g=(()=>{class t{constructor(t){this.http=t}login(t){return this.http.httpPost(`${l.N.api}users/login`,t)}forgotPassword(t){return this.http.httpPost(`${l.N.api}users/forgetPassword`,t)}resetPassword(t){return this.http.httpPost(`${l.N.api}users/resetPassword`,t)}}return t.\u0275fac=function(r){return new(r||t)(i.LFG(d.m))},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var u=e(4488);function m(t,r){1&t&&(i.TgZ(0,"span",8),i._uU(1,"username is required"),i.qZA())}function f(t,r){if(1&t&&(i.TgZ(0,"div",6),i.YNc(1,m,2,0,"span",7),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Q6J("ngIf",t.resetForm.get("username").errors.required)}}let h=(()=>{class t{constructor(t,r,e,o,n){this.fb=t,this.router=r,this.spinnerService=e,this.authService=o,this.toastNotification=n,this.isFormSubmitted=!1}ngOnInit(){this.resetForm=this.createForm()}createForm(){return this.fb.group({username:["",[c.kI.required]]})}reset(){this.isFormSubmitted=!0,this.resetForm.valid&&(this.spinnerService.showSpinner(),this.authService.forgotPassword(this.resetForm.value).subscribe(t=>{this.spinnerService.hideSpinner(),this.router.navigate(["/login"]),this.toastNotification.toastNotification.next({type:"Error",message:"Password reset main sent successfully"})},t=>{this.spinnerService.hideSpinner(),this.toastNotification.toastNotification.next({type:"Error",message:t.error.message})}))}}return t.\u0275fac=function(r){return new(r||t)(i.Y36(c.qu),i.Y36(n.F0),i.Y36(p.V),i.Y36(g),i.Y36(u.k))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-forgot-password"]],decls:8,vars:3,consts:[[1,"login",3,"formGroup"],[1,"title"],[1,"input-group","py-2"],["type","text","placeholder","username","formControlName","username",3,"ngClass"],["class","help-block",4,"ngIf"],[1,"btn","signin","py-2","mt-3",3,"click"],[1,"help-block"],["class","error-text",4,"ngIf"],[1,"error-text"]],template:function(t,r){1&t&&(i.TgZ(0,"div",0),i.TgZ(1,"h3",1),i._uU(2,"Forgot Password"),i.qZA(),i.TgZ(3,"div",2),i._UZ(4,"input",3),i.qZA(),i.YNc(5,f,2,1,"div",4),i.TgZ(6,"button",5),i.NdJ("click",function(){return r.reset()}),i._uU(7,"Submit"),i.qZA(),i.qZA()),2&t&&(i.Q6J("formGroup",r.resetForm),i.xp6(4),i.Q6J("ngClass",!r.resetForm.get("username").valid&&r.isFormSubmitted?"form-control  py-2 border-left-0 border is-invalid":"form-control  py-2 border-left-0 border"),i.xp6(1),i.Q6J("ngIf",!r.resetForm.get("username").valid&&r.isFormSubmitted))},directives:[c.JL,c.sg,c.Fj,c.JJ,c.u,o.mk,o.O5],styles:[".title[_ngcontent-%COMP%]{font-size:23px;font-weight:700;margin:0 0 35px}.btn[_ngcontent-%COMP%], .title[_ngcontent-%COMP%]{color:#fff;letter-spacing:1px;text-transform:uppercase}.btn[_ngcontent-%COMP%]{background:#222;font-size:15px;font-weight:600;width:100%;padding:10px 20px;margin:0 0 15px;border:none;border-radius:20px}.error-text[_ngcontent-%COMP%]{color:coral}"]}),t})();function v(t,r){1&t&&(i.TgZ(0,"span",17),i._uU(1,"email is required"),i.qZA())}function x(t,r){if(1&t&&(i.TgZ(0,"div",15),i.YNc(1,v,2,0,"span",16),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Q6J("ngIf",t.loginForm.get("email").errors.required)}}function Z(t,r){1&t&&(i.TgZ(0,"span",17),i._uU(1,"password is required"),i.qZA())}function b(t,r){if(1&t&&(i.TgZ(0,"div",15),i.YNc(1,Z,2,0,"span",16),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Q6J("ngIf",t.loginForm.get("password").errors.required)}}const w=function(){return["forgot-password"]};function q(t,r){1&t&&(i.TgZ(0,"span",9),i._uU(1,"new password is required"),i.qZA())}function _(t,r){1&t&&(i.TgZ(0,"span",9),i._uU(1,"minimum 6 letters required"),i.qZA())}function P(t,r){1&t&&(i.TgZ(0,"span",9),i._uU(1,"maximum 12 letters allowed"),i.qZA())}function F(t,r){if(1&t&&(i.TgZ(0,"div",7),i.YNc(1,q,2,0,"span",8),i.YNc(2,_,2,0,"span",8),i.YNc(3,P,2,0,"span",8),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Q6J("ngIf",t.resetForm.get("newPassword").errors.required),i.xp6(1),i.Q6J("ngIf",t.resetForm.get("newPassword").errors.minlength),i.xp6(1),i.Q6J("ngIf",t.resetForm.get("newPassword").errors.maxlength)}}function y(t,r){1&t&&(i.TgZ(0,"span",9),i._uU(1,"confirm password is required"),i.qZA())}function S(t,r){1&t&&(i.TgZ(0,"span",9),i._uU(1,"Password doesn't match"),i.qZA())}function k(t,r){if(1&t&&(i.TgZ(0,"div",7),i.YNc(1,y,2,0,"span",8),i.YNc(2,S,2,0,"span",8),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Q6J("ngIf",t.resetForm.get("confirmPassword").errors.required),i.xp6(1),i.Q6J("ngIf",t.resetForm.get("confirmPassword").errors.confirmedValidator)}}const C=[{path:"",component:a,children:[{path:"",component:(()=>{class t{constructor(t,r,e,o,n){this.fb=t,this.authService=r,this.spinnerService=e,this.toastService=o,this.router=n,this.isSubmitted=!1}ngOnInit(){this.loginForm=this.createLoginForm()}createLoginForm(){return this.fb.group({email:["",[c.kI.required]],password:["",[c.kI.required]]})}login(){this.isSubmitted=!0,this.loginForm.valid&&(this.spinnerService.showSpinner(),this.authService.login(this.loginForm.value).subscribe(t=>{var r;localStorage.setItem("token",null===(r=null==t?void 0:t.token)||void 0===r?void 0:r.accessToken),localStorage.setItem("user",JSON.stringify(null==t?void 0:t.user)),this.router.navigate([""]),this.spinnerService.hideSpinner()},t=>{this.toastService.toastNotification.next({type:"Error",message:t.error.message}),this.spinnerService.hideSpinner()}))}}return t.\u0275fac=function(r){return new(r||t)(i.Y36(c.qu),i.Y36(g),i.Y36(p.V),i.Y36(u.k),i.Y36(n.F0))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-login"]],decls:23,vars:7,consts:[[1,"login",3,"formGroup"],[1,"form_icon"],[1,"fa","fa-user-circle"],[1,"title"],[1,"input-group","py-2"],[1,"input-group-prepend"],[1,"input-group-text","bg-white","input-icon"],[1,"fa","fa-user"],["type","text","placeholder","email","formControlName","email",3,"ngClass"],["class","help-block",4,"ngIf"],[1,"fa","fa-lock","lock"],["type","password","placeholder","password","formControlName","password",3,"ngClass"],[1,"btn","signin","py-2","mt-3",3,"click"],[1,"form-options"],["href","javascript:void(0);",3,"routerLink"],[1,"help-block"],["class","error-text",4,"ngIf"],[1,"error-text"]],template:function(t,r){1&t&&(i.TgZ(0,"div",0),i.TgZ(1,"div",1),i._UZ(2,"i",2),i.qZA(),i.TgZ(3,"h3",3),i._uU(4,"Login"),i.qZA(),i.TgZ(5,"div",4),i.TgZ(6,"span",5),i.TgZ(7,"div",6),i._UZ(8,"i",7),i.qZA(),i.qZA(),i._UZ(9,"input",8),i.qZA(),i.YNc(10,x,2,1,"div",9),i.TgZ(11,"div",4),i.TgZ(12,"span",5),i.TgZ(13,"div",6),i._UZ(14,"i",10),i.qZA(),i.qZA(),i._UZ(15,"input",11),i.qZA(),i.YNc(16,b,2,1,"div",9),i.TgZ(17,"button",12),i.NdJ("click",function(){return r.login()}),i._uU(18,"Login"),i.qZA(),i.TgZ(19,"ul",13),i.TgZ(20,"li"),i.TgZ(21,"a",14),i._uU(22,"Forgot password"),i.qZA(),i.qZA(),i.qZA(),i.qZA()),2&t&&(i.Q6J("formGroup",r.loginForm),i.xp6(9),i.Q6J("ngClass",!r.loginForm.get("email").valid&&r.isSubmitted?"form-control  py-2 border-left-0 border is-invalid":"form-control  py-2 border-left-0 border"),i.xp6(1),i.Q6J("ngIf",!r.loginForm.get("email").valid&&r.isSubmitted),i.xp6(5),i.Q6J("ngClass",!r.loginForm.get("password").valid&&r.isSubmitted?"form-control py-2 border-left-0 border is-invalid":"form-control py-2 border-left-0 border"),i.xp6(1),i.Q6J("ngIf",!r.loginForm.get("password").valid&&r.isSubmitted),i.xp6(5),i.Q6J("routerLink",i.DdM(6,w)))},directives:[c.JL,c.sg,c.Fj,c.JJ,c.u,o.mk,o.O5,n.yS],styles:[".form_icon[_ngcontent-%COMP%]{color:#fff;font-size:100px;line-height:85px;margin:0 0 13px}.title[_ngcontent-%COMP%]{color:#fff;font-size:23px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 35px}.input-icon[_ngcontent-%COMP%]{border:0;height:42px;padding-right:10px;border-radius:20px 0 0 20px}.input-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:20px}.form-control[_ngcontent-%COMP%]{border-radius:0 20px 20px 0}.form-control[_ngcontent-%COMP%]::placeholder{color:#000000b3;font-size:14px;text-transform:capitalize}.btn[_ngcontent-%COMP%]{color:#fff;background:#222;font-size:15px;font-weight:600;letter-spacing:1px;width:100%;padding:10px 20px;margin:0 0 15px;border:none;border-radius:20px;text-transform:uppercase}.form-options[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;letter-spacing:.5px;margin:0 0 10px;display:block}.error-text[_ngcontent-%COMP%]{color:coral}.sizer[_ngcontent-%COMP%]{height:100px}"]}),t})()},{path:"forgot-password",component:h},{path:"reset-password",component:(()=>{class t{constructor(t,r,e,o,n,i){this.fb=t,this.router=r,this.route=e,this.authService=o,this.toastNotification=n,this.spinnerService=i,this.isFormSubmitted=!1}ngOnInit(){var t,r,e,o,n,i;this.resetForm=this.createForm(),this.id=null===(e=null===(r=null===(t=this.route)||void 0===t?void 0:t.snapshot)||void 0===r?void 0:r.queryParams)||void 0===e?void 0:e.id,this.token=null===(i=null===(n=null===(o=this.route)||void 0===o?void 0:o.snapshot)||void 0===n?void 0:n.queryParams)||void 0===i?void 0:i.token}createForm(){return this.fb.group({newPassword:["",[c.kI.required,c.kI.minLength(6),c.kI.maxLength(12)]],confirmPassword:["",[c.kI.required]]},{validator:t=>{const r=t.controls.confirmPassword;r.errors&&!r.errors.confirmedValidator||r.setErrors(t.controls.newPassword.value!==r.value?{confirmedValidator:!0}:null)}})}reset(){this.isFormSubmitted=!0,this.resetForm.valid&&this.authService.resetPassword({id:this.id,token:this.token,password:this.resetForm.controls.newPassword.value}).subscribe(t=>{this.router.navigate(["/login"]),this.toastNotification.toastNotification.next({type:"Error",message:t.message})},t=>{this.spinnerService.hideSpinner(),this.toastNotification.toastNotification.next({type:"Error",message:t.error.message})})}}return t.\u0275fac=function(r){return new(r||t)(i.Y36(c.qu),i.Y36(n.F0),i.Y36(n.gz),i.Y36(g),i.Y36(u.k),i.Y36(p.V))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-reset-password"]],decls:11,vars:5,consts:[[1,"login",3,"formGroup"],[1,"title"],[1,"input-group","py-2"],["type","text","placeholder","new password","formControlName","newPassword",3,"ngClass"],["class","help-block",4,"ngIf"],["type","password","placeholder","confirm password","formControlName","confirmPassword",3,"ngClass"],[1,"btn","signin","py-2","mt-3",3,"click"],[1,"help-block"],["class","error-text",4,"ngIf"],[1,"error-text"]],template:function(t,r){1&t&&(i.TgZ(0,"div",0),i.TgZ(1,"h3",1),i._uU(2,"Reset Password"),i.qZA(),i.TgZ(3,"div",2),i._UZ(4,"input",3),i.qZA(),i.YNc(5,F,4,3,"div",4),i.TgZ(6,"div",2),i._UZ(7,"input",5),i.qZA(),i.YNc(8,k,3,2,"div",4),i.TgZ(9,"button",6),i.NdJ("click",function(){return r.reset()}),i._uU(10,"Submit"),i.qZA(),i.qZA()),2&t&&(i.Q6J("formGroup",r.resetForm),i.xp6(4),i.Q6J("ngClass",!r.resetForm.get("newPassword").valid&&r.isFormSubmitted?"form-control py-2 border-left-0 border is-invalid":"form-control py-2 border-left-0 border"),i.xp6(1),i.Q6J("ngIf",!r.resetForm.get("newPassword").valid&&r.isFormSubmitted),i.xp6(2),i.Q6J("ngClass",!r.resetForm.get("confirmPassword").valid&&r.isFormSubmitted?"form-control py-2 border-left-0 border is-invalid":"form-control py-2 border-left-0 border"),i.xp6(1),i.Q6J("ngIf",!r.resetForm.get("confirmPassword").valid&&r.isFormSubmitted))},directives:[c.JL,c.sg,c.Fj,c.JJ,c.u,o.mk,o.O5],styles:[".title[_ngcontent-%COMP%]{font-size:23px;font-weight:700;margin:0 0 35px}.btn[_ngcontent-%COMP%], .title[_ngcontent-%COMP%]{color:#fff;letter-spacing:1px;text-transform:uppercase}.btn[_ngcontent-%COMP%]{background:#222;font-size:15px;font-weight:600;width:100%;padding:10px 20px;margin:0 0 15px;border:none;border-radius:20px}.error-text[_ngcontent-%COMP%]{color:coral}"]}),t})()}]}];let A=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[[n.Bz.forChild(C)],n.Bz]}),t})();var T=e(1986);let J=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[[o.ez,A,T.m]]}),t})()}}]);