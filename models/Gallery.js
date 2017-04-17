var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
        map: { name: 'title' },
    autokey: { from: 'title',  path: 'key', unique: true },
});

Gallery.add({
        title: { type: String, required: true },
        description: {type: Types.Textarea, height: 50 },
        published: {type: Types.Select, options: 'Yes, No', default: 'No', index: true, emptyOption: false},
        publishedDate: { type: Date, index: true, dependsOn: {published: 'Yes'} },
        heroImage: { type: Types.Relationship, ref:'Image' },
    images: { type: Types.Relationship, ref:'Image', many: true },
});


Gallery.track = true;
Gallery.defaultColumns = 'title, published|20%, publishedDate|20%';
Gallery.register();
