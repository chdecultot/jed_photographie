var keystone = require('keystone');
var Gallery = keystone.list('Gallery');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

    // Init locals
    locals.section = 'gallery';
    locals.filters = {
        gallery: req.params.gallery,

    };

    // Load the current post
    view.on('init', function (next) {

        var q = Gallery.model.findOne({
            key: locals.filters.gallery,

        }).populate('heroImage images').sort('sortOrder');

        q.exec(function (err, result) {
            locals.gallery = result;
            console.log(locals.gallery.images);
            next(err);

        });


    });

	// Render the view
	view.render('gallery');

};
