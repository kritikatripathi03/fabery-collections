import { useState, useEffect } from "react";
import axios from "../../api/axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "men",
    sizes: "",
    stock: "",
    image: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/admin/products");
      setProducts(data);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      sizes: product.sizes.join(", "),
      stock: product.stock,
      image: null
    });
    setImagePreview(product.images[0] || "");
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/admin/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch {
      setError("Failed to delete product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("sizes", form.sizes);
      formData.append("stock", form.stock);
      if (form.image) formData.append("image", form.image);

      if (editProduct) {
        const { data } = await axios.put(`/admin/products/${editProduct._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setProducts(products.map(p => p._id === editProduct._id ? data : p));
      } else {
        const { data } = await axios.post("/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setProducts([...products, data]);
      }

      handleCloseForm();
    } catch {
      setError("Failed to save product");
    } finally {
      setFormLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditProduct(null);
    setImagePreview("");
    setForm({
      name: "",
      description: "",
      price: "",
      category: "men",
      sizes: "",
      stock: "",
      image: null
    });
  };

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center text-stone-500">
      Loading products...
    </div>
  );

  return (
    <div className="py-6 lg:py-10">
      <div className="surface-card rounded-[2rem] px-6 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Admin Products</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">Products</h1>
          <p className="mt-2 text-sm text-stone-500">{products.length} products total</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary px-6 py-3 text-sm"
        >
          + Add Product
        </button>
      </div>
      </div>

      {error && (
        <div className="mb-6 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="surface-card-strong max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                {editProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-2xl text-stone-400 transition hover:text-stone-950"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Classic White T-Shirt"
                  className="input-modern"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  placeholder="Product description..."
                  rows={3}
                  className="input-modern resize-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-stone-700">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    placeholder="999"
                    className="input-modern"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-stone-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    placeholder="50"
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-stone-700">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="select-modern"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-stone-700">Sizes (comma separated)</label>
                  <input
                    type="text"
                    name="sizes"
                    value={form.sizes}
                    onChange={handleChange}
                    placeholder="S, M, L, XL"
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-700">
                  Product Image {editProduct && "(leave empty to keep current)"}
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="input-modern"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-32 w-32 rounded-xl object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="btn-primary mt-2 w-full py-3 text-sm disabled:opacity-50"
              >
                {formLoading
                  ? editProduct ? "Updating..." : "Adding..."
                  : editProduct ? "Update Product" : "Add Product"
                }
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="surface-card mt-6 overflow-hidden rounded-[2rem]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-white/60 text-stone-500">
              <th className="py-4 px-4 text-left font-medium">Product</th>
              <th className="py-4 px-4 text-left font-medium">Category</th>
              <th className="py-4 px-4 text-left font-medium">Price</th>
              <th className="py-4 px-4 text-left font-medium">Stock</th>
              <th className="py-4 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-stone-100 transition hover:bg-stone-50/80">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-stone-950">{product.name}</p>
                      <p className="text-xs text-stone-500">
                        {product.sizes.length > 0 ? product.sizes.join(", ") : "One size"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 capitalize text-stone-500">{product.category}</td>
                <td className="py-4 px-4 font-semibold text-stone-950">₹{product.price}</td>
                <td className="py-4 px-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    product.stock > 10
                      ? "bg-green-100 text-green-700"
                      : product.stock > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-sm font-medium text-stone-950 underline underline-offset-4 transition hover:text-stone-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-sm font-medium text-red-600 underline underline-offset-4 transition hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}