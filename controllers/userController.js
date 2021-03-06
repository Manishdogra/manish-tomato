const mongoose = require('mongoose');
const User = mongoose.model("User");
const promsify = require('es6-promisify');


exports.loginForm = (req,res) => {
    res.render('login', {
        title: 'Login'
    });
}

exports.homePage = (req,res) => {
    res.render('homePage', {
        title: 'Register'
    });
}
exports.registerForm = (req,res)=> {
    res.render('register', {title: 'Register'})
}

exports.userList = async (req,res) => {
    const allUser = await User.find()
    res.render('userList', {allUser})
}
exports.validateRegister = (req,res,next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must Supply a name!').notEmpty();
    req.checkBody('email', "That email is not valid").isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress:false
    });

    req.checkBody('password', "Passowd cannot be Blank").notEmpty();
    req.checkBody('password-confirm', "Passwordd cannot be Blank").notEmpty();
    req.checkBody('password-confirm', "Opps! Password did't match").equals(req.body.password); 

    const errors = req.validationErrors();

    if(errors) {
        req.flash('error', errors.map(err=> err.msg));
        res.render('register', {
            title:'Register',
            body:req.body,
            flashes: req.flash()});
            return;
        
    }
    next();

}

exports.register = async (req,res,next) => {
    const user = new User({
        email:req.body.email,
        name: req.body.name    
    });

    const registerWithPromise = promsify(User.register, User);
    await registerWithPromise(user, req.body.password);

    // res.send("itWorks");
    next();
}

exports.account = (req,res)=>{
    res.render('account', {title:"edit Account"})
}


exports.updateAccount = async (req,res) => {
    const updates = {
        name: req.body.name,
        email:req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id},
        { $set: updates},
        {new: true, runValidators:true, context: 'query'}
    );
    req.flash('success', 'Updated the Profile!!');
    res.redirect('/account');

};