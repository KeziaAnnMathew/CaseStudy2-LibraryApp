let regexp  = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
let regpwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
let email= document.getElementById("email");
let username = document.getElementById("username");
let confirmpassword = document.getElementById("confirmpassword");
let card=document.querySelector(".mymar");
let form=document.querySelector("#form-main");
let password = document.getElementById("password");
// signup registration
function register(){
	let errDiv=document.createElement("div");
	errDiv.className="alert alert-danger";
	if(username.value=="admin"){
		errDiv.appendChild(document.createTextNode("Username cannot be admin"));
		card.insertBefore(errDiv,form);
		setTimeout(clearError,3000);
		return false;
	}
	else if(!regexp.test(email.value)){
		errDiv.appendChild(document.createTextNode("Email Invalid"));
		card.insertBefore(errDiv,form);
		setTimeout(clearError,3000);
		return false;
	}
	else if(!regpwd.test(password.value)){
		errDiv.appendChild(document.createTextNode("Password not strong"));
		card.insertBefore(errDiv,form);
		setTimeout(clearError,3000);
		return false;
	}
	else if(confirmpassword.value!=password.value){
		errDiv.appendChild(document.createTextNode("Passwords does not match"));
		card.insertBefore(errDiv,form);
		setTimeout(clearError,2000);
		return false;
	} 
	else {
	  return true;
	}
	
   
}
function clearError(){
    document.querySelector(".alert").remove();
}
function showpsw(el){
	if(password.type === "password"){
		password.type ="text";
		el.className="fa fa-eye-slash";
	}
	else{
		password.type= "password";
		el.className="fa fa-eye";
	}
}
function showpswc(el){
	if(confirmpassword.type === "password"){
		confirmpassword.type ="text";
		el.className="fa fa-eye-slash";
	}
	else{
		confirmpassword.type= "password";
		el.className="fa fa-eye";
	}
}
let txt1 = document.querySelector(".txt1");
let txt = document.querySelector(".txt");
let regweak = /[a-z]/;
let regwk = /[A-Z]/;
let regmed = /\d+/;
let regstr = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
function strength(){
	if(password.value!= ""){
		txt1.style.display = "block";
		txt1.textContent= "Password Strength: ";
		if(password.value.length<=3){
			no=0
		}
		if(password.value.length >=4 && (password.value.match(regweak) || password.value.match(regwk) || password.value.match(regmed) || password.value.match(regstr))){
				no=1;
		}
		if(password.value.length >=6 && ((password.value.match(regweak) && password.value.match(regmed)) || (password.value.match(regmed) && password.value.match(regstr)) || (password.value.match(regweak) && password.value.match(regstr)))){
			no=2;
		}
		if(password.value.length >=6 && ((password.value.match(regwk) && password.value.match(regmed)) || (password.value.match(regweak) && password.value.match(regwk)) || (password.value.match(regwk) && password.value.match(regstr)))){
			no=2;
		}
		if(password.value.length >=8 && password.value.match(regweak) && password.value.match(regwk)  && password.value.match(regmed) && password.value.match(regstr)){
			no=3;
		}
		if (no == 0){

			txt.style.display = "block";
			txt.textContent= "Weak";
			txt.classList.add("vweak");
		}
		if (no == 1){
			txt.style.display = "block";
			txt.textContent= "Medium";
			txt.classList.add("weak");
		}else{
			txt.classList.remove("weak");
		}
		if (no == 2){
			txt.style.display = "block";
			txt.textContent= "Fair";
			txt.classList.add("med");
		}else{
			txt.classList.remove("med");
		}
		if (no == 3){
			txt.textContent= "Strong";
			txt.classList.add("str");
		}else{
			txt.classList.remove("str");
		}
	}
	else{
		txt.style.display="none";
		txt1.style.display="none";
	}
}