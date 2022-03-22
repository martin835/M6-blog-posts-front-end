import React from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { useState, useEffect } from "react";

const BlogList = (props) => {
  const [postInfo, setPostInfo] = useState([]);

  useEffect(() => {
    loadPostInfo();
  }, []);

  const loadPostInfo = async () => {
    console.log("i am mounted");

    try {
      let response = await fetch("http://localhost:3001/blogPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);

        setPostInfo(data);
        //setIsLoading(false);
      } else {
        alert("something went wrong :(");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      {postInfo.map((post) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post._id} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
