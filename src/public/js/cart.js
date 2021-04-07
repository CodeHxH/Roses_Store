function addNewProduct() {
    // Buscar el producto
    const product = await Products.findById(req.body.product__id);
    // Creando un nuevo producto para el carrito
    const NewProductCart = new Cart({
        user: req.user.id,
        product: product,
    });
    await NewProductCart.save();
}