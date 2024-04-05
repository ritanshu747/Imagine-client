import { useState, useEffect } from "react";
import { Loader, FormField, Card } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data?.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#4634a9] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8000/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const result = await response.json();
        setPosts(result.data.reverse());
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    const searchResults = posts.filter(
      (post) =>
        post.name.toLowerCase().includes(searchText) ||
        post.prompt.toLowerCase().includes(searchText)
    );
    setSearchResults(searchResults);
  };

  return (
    <section>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          IMAGIN-AI is a new AI system that can create realistic images and art
          from a description in natural language.
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search Posts by name or prompt"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
              <RenderCards data={searchText ? searchResults : posts} title="No posts found" />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
