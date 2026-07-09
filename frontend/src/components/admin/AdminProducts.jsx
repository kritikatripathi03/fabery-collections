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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
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
    <div className="flex justify-center items-center min-h-screen text-gray-500">
      Loading products...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold">Products</h1>
          <p className="text-gray-500 mt-1">{products.length} products total</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition"
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-black text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Classic White T-Shirt"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  placeholder="Product description..."
                  rows={3}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition resize-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-700">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    placeholder="999"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    placeholder="50"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-700">Sizes (comma separated)</label>
                  <input
                    type="text"
                    name="sizes"
                    value={form.sizes}
                    onChange={handleChange}
                    placeholder="S, M, L, XL"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Product Image {editProduct && "(leave empty to keep current)"}
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-xl border border-gray-200"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50 mt-2"
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
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Product</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Category</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Price</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Stock</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-400">
                        {product.sizes.length > 0 ? product.sizes.join(", ") : "One size"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 capitalize text-gray-500">{product.category}</td>
                <td className="py-4 px-4 font-semibold">₹{product.price}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                      className="text-sm text-black underline hover:text-gray-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-sm text-red-400 underline hover:text-red-600 transition"
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