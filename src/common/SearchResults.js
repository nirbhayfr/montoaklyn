import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products } from "../data/Data";
import { Header } from "../components/index/Header";

const useQuery = () => new URLSearchParams(useLocation().search);

const normalize = (s) => s.toLowerCase().trim();

const filterProducts = (list, q, cat) => {
  const query = normalize(q || "");
  const category = normalize(cat || "all");
  return list.filter((p) => {
    const inCat =
      category === "all"
        ? true
        : normalize(p.category || "") === category ||
          normalize(p.title).includes(category);
    const matchesQ = !query
      ? true
      : normalize(p.title).includes(query) ||
        normalize(p.category || "").includes(query);
    return inCat && matchesQ;
  });
};

const SearchResults = () => {
  const query = useQuery();
  const q = query.get("q") || "";
  const cat = query.get("cat") || "all";
  const navigate = useNavigate();

  const results = useMemo(() => filterProducts(products, q, cat), [q, cat]);

  return (
    <div>
      <Header />

      <div className="ul-container py-10">
        <div className="ul-section-heading flex items-center justify-between">
          <div>
            <span className="ul-section-sub-title">search</span>
            <h2 className="ul-section-title">
              Results {q ? <>for “{q}”</> : null}{" "}
              {cat && cat !== "all" ? <>in “{cat}”</> : null}
            </h2>
          </div>
          <button className="btn" onClick={() => navigate("/shop")}>
            Go to Shop
          </button>
        </div>

        {results.length === 0 ? (
            <p className="text-sm opacity-70">
              No products found. Try different keywords or category.
            </p>
        ) : (
          <div className="ul-bs-row row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 gap-y-6">
            {results.map((p, idx) => {
              // ✅ pick first image safely
              const imgSrc = Array.isArray(p.images)
                ? p.images[0]
                : p.images || "/placeholder.jpg";

              return (
                <div
                  key={p.id}
                  className="mix col fade-in-up cursor-pointer"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  onClick={() => navigate(`/shopdetails/${p.id}`)}
                >
                  <div className="ul-product-horizontal">
                    <div className="ul-product-horizontal-img">
                      <img src={imgSrc} alt={p.title} loading="lazy" />
                    </div>
                    <div className="ul-product-horizontal-txt">
                      <span className="ul-product-price">{p.price}</span>
                      <h4 className="ul-product-title">
                        <a
                          href={`/shopdetails/${p.id}`}
                          onClick={(e) => e.preventDefault()}
                        >
                          {p.title}
                        </a>
                      </h4>
                      <h5 className="ul-product-category">
                        <a href="/shop" onClick={(e) => e.preventDefault()}>
                          {p.category}
                        </a>
                      </h5>
                      <div className="ul-product-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="star">
                            <i className="flaticon-star"></i>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
