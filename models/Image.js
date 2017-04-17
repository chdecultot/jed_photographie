var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * Image Model
 * =============
 */

var Image = new keystone.List('Image', {
    map: { name: 'name' },
    autokey: { from: 'name', path: 'key', unique: true },
});

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./public/uploads/images'), // required; path where the files should be stored
        publicPath: '/public/uploads/images', // path where files will be served
    }
});

Image.add({
    name: { type: String, required: true },
    image: { type: Types.File, storage: myStorage, initial: true },
    description: { type: Types.Textarea, height: 150 },
    homePage: { type: Boolean, initial: false },
});

Image.relationship({ ref: 'Gallery', refPath: 'heroImage' });
Image.relationship({ ref: 'Gallery', refPath: 'images' });
Image.defaultColumns = 'name, image|60%, homePage|10%';
Image.register();
