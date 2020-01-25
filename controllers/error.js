exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
  /*
  <!-- <div class="card__content">
                                    <h2 class="product__price">$
                                        <%= ngo.city %>
                                    </h2>
                                    <p class="product__description">
                                        <%= ngo.address %>
                                    </p>
                                    <p class="product__description">
                                        <%= ngo.sectors %>
                                    </p>
                                </div> -->
                                <!-- <div class="card__actions">
                                    <a href="/admin/edit-product/<%= product._id %>?edit=true" class="btn">Edit</a>
                                    <input type="hidden" value="<%= product._id %>" name="productId">
                                    <input type="hidden" name="_csrf" value="<%= csrfToken %>">
                                    <button class="btn" type="button" onclick="deleteProduct(this)">Delete</button>
                                </div> -->
  */
};

