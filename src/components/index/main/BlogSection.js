import React from "react";

const BlogSection = () => {
  const blogs = [
    {
      img: "assets/img/blog-1.jpg",
      dateNumber: "15",
      dateTxt: "Dec",
      title: "Cuticle Pushers & Trimmers",
      descr:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      link: "blog-details.html",
    },
    {
      img: "assets/img/blog-2.jpg",
      dateNumber: "15",
      dateTxt: "Dec",
      title: "Cuticle Pushers & Trimmers",
      descr:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      link: "blog-details.html",
    },
    {
      img: "assets/img/blog-3.jpg",
      dateNumber: "15",
      dateTxt: "Dec",
      title: "Cuticle Pushers & Trimmers",
      descr:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      link: "blog-details.html",
    },
  ];

  return (
    <div className="ul-container">
      <section className="ul-blogs">
        <div className="ul-inner-container">
          {/* heading */}
          <div className="ul-section-heading">
            <div className="left">
              <span className="ul-section-sub-title">News & Blog</span>
              <h2 className="ul-section-title">Latest News & Blog</h2>
            </div>

            <div>
              <a href="blog.html" className="ul-blogs-heading-btn">
                View All Blog <i className="flaticon-up-right-arrow"></i>
              </a>
            </div>
          </div>

          {/* blog grid */}
          <div className="row ul-bs-row row-cols-md-3 row-cols-2 row-cols-xxs-1">
            {blogs.map((blog, index) => (
              <div className="col" key={index}>
                <div className="ul-blog">
                  <div className="ul-blog-img">
                    <img src={blog.img} alt="Article Image" />
                    <div className="date">
                      <span className="number">{blog.dateNumber}</span>
                      <span className="txt">{blog.dateTxt}</span>
                    </div>
                  </div>

                  <div className="ul-blog-txt">
                    <div className="ul-blog-infos flex gap-x-[30px] mb-[16px]">
                      <div className="ul-blog-info">
                        <span className="icon">
                          <i className="flaticon-user-2"></i>
                        </span>
                        <span className="text font-normal text-[14px] text-etGray">
                          By Admin
                        </span>
                      </div>
                    </div>

                    <h3 className="ul-blog-title">
                      <a href={blog.link}>{blog.title}</a>
                    </h3>
                    <p className="ul-blog-descr">{blog.descr}</p>

                    <a href={blog.link} className="ul-blog-btn">
                      Read More{" "}
                      <span className="icon">
                        <i className="flaticon-up-right-arrow"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
