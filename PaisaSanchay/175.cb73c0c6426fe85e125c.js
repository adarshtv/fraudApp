(self.webpackChunkpaisa_sanchay=self.webpackChunkpaisa_sanchay||[]).push([[175],{175:(e,t,r)=>{"use strict";r.r(t),r.d(t,{RecieptModule:()=>_});var i=r(1116),o=r(3337),n=r(5366),a=r(1458),s=r(1041),c=r(5204),p=r(4488),m=r(529),l=r(1039);let d=(()=>{class e{constructor(e){this.http=e}AddLoan(e,t){var r;const i=null===(r=JSON.parse(localStorage.getItem("user")))||void 0===r?void 0:r.id;return this.http.httpPost(`${m.N.api}${e}`,Object.assign(Object.assign({},t),{userid:i}))}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(l.m))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var u=r(3070),g=r(3841),h=r(7064),f=r(7436),Z=r(4155),b=r(9550),v=r(9024),S=r(4369);function q(e,t){if(1&e&&(n.TgZ(0,"mat-option",8),n._uU(1),n.qZA()),2&e){const e=t.$implicit;n.Q6J("value",e),n.xp6(1),n.hij(" ",e," ")}}function A(e,t){1&e&&(n.TgZ(0,"div",1),n.TgZ(1,"div",9),n.TgZ(2,"mat-radio-group",10),n.TgZ(3,"mat-radio-button",11),n._uU(4,"Credit"),n.qZA(),n.TgZ(5,"mat-radio-button",12),n._uU(6,"Debit"),n.qZA(),n.qZA(),n.qZA(),n.qZA())}function T(e,t){if(1&e&&(n.TgZ(0,"mat-option",8),n._uU(1),n.qZA()),2&e){const e=t.$implicit;n.Q6J("value",e.id),n.xp6(1),n.hij(" ",e.name," ")}}function y(e,t){if(1&e&&(n.TgZ(0,"div",1),n.TgZ(1,"div",2),n.TgZ(2,"mat-form-field",3),n.TgZ(3,"mat-select",13,5),n.TgZ(5,"mat-option"),n._UZ(6,"ngx-mat-select-search",14),n.qZA(),n.YNc(7,T,2,2,"mat-option",6),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e){const e=n.oxw();n.xp6(6),n.Q6J("formControl",e.memberFilterCtrl),n.xp6(1),n.Q6J("ngForOf",e.members)}}function F(e,t){1&e&&(n.TgZ(0,"span",26),n._uU(1,"amount is required"),n.qZA())}function x(e,t){if(1&e&&(n.TgZ(0,"div",24),n.YNc(1,F,2,0,"span",25),n.qZA()),2&e){const e=n.oxw(2);n.xp6(1),n.Q6J("ngIf",e.recieptForm.get("amount").errors.required)}}function C(e,t){if(1&e){const e=n.EpF();n.TgZ(0,"div",1),n.TgZ(1,"div",2),n.TgZ(2,"div",15),n.TgZ(3,"mat-form-field",16),n._UZ(4,"input",17),n._UZ(5,"mat-datepicker-toggle",18),n._UZ(6,"mat-datepicker",null,19),n.qZA(),n.qZA(),n.TgZ(8,"div",15),n._UZ(9,"input",20),n.YNc(10,x,2,1,"div",21),n.qZA(),n.TgZ(11,"div",15),n._UZ(12,"input",22),n.qZA(),n.TgZ(13,"div",9),n.TgZ(14,"button",23),n.NdJ("click",function(){return n.CHM(e),n.oxw().addReciept()}),n._uU(15,"Submit"),n.qZA(),n.qZA(),n.qZA(),n.qZA()}if(2&e){const e=n.MAs(7),t=n.oxw();n.xp6(4),n.Q6J("matDatepicker",e),n.xp6(1),n.Q6J("for",e),n.xp6(5),n.Q6J("ngIf",!t.recieptForm.get("amount").valid&&t.isSubmitted)}}let w=(()=>{class e{constructor(e,t,r,i,o){this.spinnerService=e,this.service=t,this.toastService=r,this.fb=i,this.receiptService=o,this.members=[],this.paymentOption=["Loan","MDTWF","Subscription","Kuri"],this.paymentType=["Receipt","Payment","Opening balance"],this.paymentOptionApi={Loan:"loans/add",MDTWF:"mdtwf/add",Subscription:"subscriptions/add",Kuri:"kuri/add"},this.isSubmitted=!1,this.memberFilterCtrl=new s.NI(null),this.completeMembersList=[]}ngOnInit(){this.recieptForm=this.createForm(),this.getMembers(),this.memberFilterCtrl.valueChanges.subscribe(e=>{null!=e&&(this.members=this.completeMembersList.filter(t=>t.name.toString().toLowerCase().includes(e.toString().toLowerCase())))})}createForm(){return this.fb.group({operation:["Receipt",s.kI.required],accountid:[null,s.kI.required],date:[new Date,s.kI.required],amount:["",s.kI.required],remarks:[""]})}getMembers(){this.spinnerService.showSpinner(),this.service.getMembers().subscribe(e=>{this.members=e.members,this.completeMembersList=e.members,this.spinnerService.hideSpinner()},e=>{this.members=[],this.toastService.toastNotification.next({type:"Error",message:"Failed to add member"}),this.spinnerService.hideSpinner()})}addReciept(){if(this.isSubmitted=!0,this.recieptForm.valid){const e=Object.assign(Object.assign({},this.recieptForm.value),{transactionDate:this.formatDate(this.recieptForm.controls.date.value)});delete e.date,this.spinnerService.showSpinner(),this.receiptService.AddLoan("transactions/add",e).subscribe(e=>{this.recieptForm.reset(),this.recieptForm.controls.date.setValue(new Date),this.recieptForm.controls.operation.setValue("Receipt"),this.recieptForm.updateValueAndValidity(),this.isSubmitted=!1,this.spinnerService.hideSpinner(),this.toastService.toastNotification.next({type:"success",message:e.message})},e=>{this.spinnerService.hideSpinner(),this.toastService.toastNotification.next({type:"Error",message:e.error.message})})}}paymentTypeChanged(e){"Opening balance"==e.value?this.recieptForm.addControl("type",new s.NI("debit")):this.recieptForm.controls.type&&this.recieptForm.removeControl("type")}formatDate(e){let t=new Date(e),r=""+(t.getMonth()+1),i=""+t.getDate(),o=t.getFullYear();return r.length<2&&(r="0"+r),i.length<2&&(i="0"+i),[o,r,i].join("-")}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(c.V),n.Y36(a.Y),n.Y36(p.k),n.Y36(s.qu),n.Y36(d))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-reciept-member"]],decls:10,vars:5,consts:[[1,"card-container","border","pb-3",3,"formGroup"],[1,"row","px-3"],[1,"col-12"],[1,"mt-2","w-100"],["formControlName","operation","placeholder","Select transaction type",3,"selectionChange"],["singleSelect",""],[3,"value",4,"ngFor","ngForOf"],["class","row px-3",4,"ngIf"],[3,"value"],[1,"col-12","text-center"],["formControlName","type"],["color","primary","id","radio_1","value","credit",1,"mx-3"],["color","primary","id","radio_2","value","debit",1,"mx-3"],["formControlName","accountid","placeholder","Select Member"],["placeholderLabel","Search member","noEntriesFoundLabel","No search result found",3,"formControl"],[1,"form-group","mb-3"],[1,"input-field","w-100"],["matInput","","placeholder","Reciept Date","formControlName","date",3,"matDatepicker"],["matSuffix","",3,"for"],["picker1",""],["type","number","formControlName","amount","placeholder","Amount",1,"form-control"],["class","help-block",4,"ngIf"],["type","text","formControlName","remarks","placeholder","Remarks",1,"form-control"],["mat-raised-button","","color","primary",3,"click"],[1,"help-block"],["class","error-text",4,"ngIf"],[1,"error-text"]],template:function(e,t){1&e&&(n.TgZ(0,"div",0),n.TgZ(1,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"mat-form-field",3),n.TgZ(4,"mat-select",4,5),n.NdJ("selectionChange",function(e){return t.paymentTypeChanged(e)}),n.YNc(6,q,2,2,"mat-option",6),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.YNc(7,A,7,0,"div",7),n.YNc(8,y,8,2,"div",7),n.YNc(9,C,16,3,"div",7),n.qZA()),2&e&&(n.Q6J("formGroup",t.recieptForm),n.xp6(6),n.Q6J("ngForOf",t.paymentType),n.xp6(1),n.Q6J("ngIf","Opening balance"==t.recieptForm.get("operation").value),n.xp6(1),n.Q6J("ngIf",t.recieptForm.get("operation").value),n.xp6(1),n.Q6J("ngIf",t.recieptForm.get("accountid").value&&t.recieptForm.get("operation").value))},directives:[s.JL,s.sg,u.KE,g.gD,s.JJ,s.u,i.sg,i.O5,h.ey,f.VQ,f.U0,Z.nu,s.oH,b.Nt,s.Fj,v.hl,v.nW,u.R9,v.Mq,s.wV,S.lW],styles:[".border[_ngcontent-%COMP%]{border-radius:5px}.error-text[_ngcontent-%COMP%]{color:coral}.text-center[_ngcontent-%COMP%]{text-align:center}"]}),e})();const N=[{path:"",component:(()=>{class e{constructor(e,t){this.homeService=e,this.route=t,t.data.subscribe(t=>{e.headerSubject$.next(t.header)})}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(a.Y),n.Y36(o.gz))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-reciept"]],decls:4,vars:0,consts:[[1,"card-container","p-0","m-0"],[1,"row","p-0","m-0","justify-content-center"],[1,"col-lg-6","col-md-12","col-sm-12"],[1,""]],template:function(e,t){1&e&&(n.TgZ(0,"div",0),n.TgZ(1,"div",1),n.TgZ(2,"div",2),n._UZ(3,"app-reciept-member",3),n.qZA(),n.qZA(),n.qZA())},directives:[w],styles:[""]}),e})(),data:{header:"Transaction"}}];let k=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[o.Bz.forChild(N)],o.Bz]}),e})();var J=r(1986);let _=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[i.ez,k,J.m]]}),e})()}}]);