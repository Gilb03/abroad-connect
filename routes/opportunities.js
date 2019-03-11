var express = require('express');
var router  = express.Router();
var Opportunity = require('../models/opportunity');

// INDEX Route - Show all opportunities
router.get('/', function(req, res){
    // get all opportunities from the DB
    Opportunity.find({}, function(err, allOpportunities){
        if(err){
            console.log(err);
        } else {
            res.render('opportunities/index',{opportunities: allOpportunities, currentUser: req.user});
        }
    });
});
// CREATE ROUTE - Add new opportunity to dB
router.post('/', function(req, res){
    //get data from form and add to array
    var name= req.body.name;
    var image= req.body.image;
    var link= req.body.link;
    var description= req.body.description;
    var newOpportunity= {name: name, image: image, link: link, description: description}
    // create new opportunity and save to database
    Opportunity.create(newOpportunity, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to opportunity page
            res.redirect('/opportunities');
        }

    });
});
//NEW ROUTE - Show form to create new opportunity
router.get('/new', function(req, res){
    res.render('opportunities/new');
});

//SHOW ROUTE 
router.get('/:id', function(req, res){
    // find opportunity with provided ID
    Opportunity.findById(req.params.id).populate('comments').exec( function(err, foundOpportunity){
        if(err){
            console.log(err);
        } else{
            console.log(foundOpportunity);
              // render show template with that singular opportunity
    res.render('opportunities/show', {opportunity: foundOpportunity}); 
        }
    });
 
});

/*function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}*/

module.exports = router;