var keystone = require('keystone'),
    Gallery = keystone.list('Gallery'),
    Image = keystone.list('Image'),
    Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
        locals.section = 'home';
        locals.galleries = [];

        //Loading the galleries
        view.on('init', function(next){

            var q = Gallery.model.find()
               .populate('heroImage images')
               .sort('sortOrder');

               q.exec(function(err, results) {
                   locals.galleries = results;
                   next(err);
               });
           });

        //Query to retrieve the home page carousel images
        locals.homeImages = [];

        view.on('init', function(next){

            var q = Image.model.find().where('homePage', true);

            q.exec(function (err, imagesFound) {
                console.log(imagesFound);
                locals.homeImages = imagesFound;
                next(err);
            });

        });

        //locals.section = 'contact';
        locals.formData = req.body || {};
        locals.validationErrors = {};
        locals.enquirySubmitted = false;

        view.on('post', { action: 'contact' }, function (next) {

            var application = new Enquiry.model();
            var updater = application.getUpdateHandler(req);

            updater.process(req.body, {
                flashErrors: true

            }, function (err) {
                if (err) {
                    locals.validationErrors = err.errors;

                } else {
                    locals.enquirySubmitted = true;

                }
                next();

            });


        });

    view.render('index');
}
