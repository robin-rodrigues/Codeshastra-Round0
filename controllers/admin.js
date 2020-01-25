const mongoose = require('mongoose');

const fileHelper = require('../util/file');

const { validationResult } = require('express-validator/check');

const Profile = require('../models/profile');
const Ngo = require('../models/ngo');

exports.getAddProfile = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-profile',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProfile = (req, res, next) => {
  const name = req.body.name;
  const image = req.file;
  const amount =  req.body.amount;
  const reason = req.body.reason;
  const number = req.body.number;
  const address = req.body.address;

  
  if (!image) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      hasError: true,
     profile: {
        name: name,
        amount: amount,
        reason: reason,
        number: number,
        address: address
      },
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors.array());
  //   return res.status(422).render('admin/edit-product', {
  //     pageTitle: 'Add Product',
  //     path: '/admin/add-product',
  //     editing: false,
  //     hasError: true,
  //     product: {
  //       title: title,
  //       price: price,
  //       description: description
  //     },
  //     errorMessage: errors.array()[0].msg,
  //     validationErrors: errors.array()
  //   });
  // }

  const imageUrl = image.path;

  const profile = new Profile({
    name: name,
    amount: amount,
    reason: reason,
    number: number,
    address: address,
    imageUrl: imageUrl,
    userId: req.user
  });
  profile
    .save()
    .then(result => {
      console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      // return res.status(500).render('admin/edit-product', {
      //   pageTitle: 'Add Product',
      //   path: '/admin/add-product',
      //   editing: false,
      //   hasError: true,
      //   product: {
      //     title: title,
      //     imageUrl: imageUrl,
      //     price: price,
      //     description: description
      //   },
      //   errorMessage: 'Database operation failed, please try again.',
      //   validationErrors: []
      // });
      // res.redirect('/500');
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDesc,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      return product.save().then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getNgos = (req, res, next) => {
  Ngo.find({})
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(ngos => {
       console.log(ngos);
      res.render('/admin/ngos', {
        ngos: ngos,
        pageTitle: 'Ngos',
        path: '/admin/ngos'
      })
    })
    .catch(err => {
      const error = new Error(err);
      console.log(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return next(new Error('Product not found.'));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.status(200).json({ message: 'Success!' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Deleting product failed.' });
    });
};
