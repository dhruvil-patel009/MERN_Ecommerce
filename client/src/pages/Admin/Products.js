import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [expandedDescription, setExpandedDescription] = useState({});

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    // Lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    // Toggle description expansion
    const toggleDescription = (id) => {
        setExpandedDescription((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <Layout>
            <div className="row     me-0">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center mb-4">All Products</h1>
                    <div className="row g-4 me-0">
                        {products?.map((p) => (
                            <div key={p._id} className="col-lg-4 col-md-6">
                                <div className="card h-100 shadow-sm border-0">
                                    <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top p-3"
                                            alt={p.name}
                                            style={{ height: "250px", objectFit: "contain" }}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <Link to={`/dashboard/admin/product/${p.slug}`} className="text-decoration-none">
                                            <h5 className="card-title text-dark">{p.name}</h5>
                                        </Link>
                                        <p className="card-text text-muted">
                                            {expandedDescription[p._id]
                                                ? p.description
                                                : `${p.description.slice(0, 50)}...`}
                                            <button
                                                className="btn btn-link p-0 text-primary"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent navigation
                                                    toggleDescription(p._id);
                                                }}
                                            >
                                                {expandedDescription[p._id] ? "Show Less" : "Show More"}
                                            </button>
                                        </p>
                                        <p className="card-text fw-bold text-success">   {p.price || "0.00"}&#8377;</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link
                                                to={`/dashboard/admin/product/${p.slug}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                View Details
                                            </Link>
                                            <button className="btn btn-sm btn-warning">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
