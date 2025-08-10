import React from "react";

const reviewsData = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    date: "2024-07-21",
    comment:
      "Amazing food and fantastic service! The flavors were outstanding and the delivery was super quick.",
  },
  {
    id: 2,
    name: "Mark Thompson",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 4,
    date: "2024-06-30",
    comment:
      "Great ambiance and the dishes were fresh. Will definitely order again. Highly recommended!",
  },
  {
    id: 3,
    name: "Sofia Lee",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "2024-05-15",
    comment:
      "I loved the variety on the menu and the friendly staff. The best dining experience I've had in a while.",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex space-x-1 text-red-600">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 fill-current ${
            i < rating ? "text-red-600" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.955L10 0l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

const Reviews = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-3 text-center">
        What Our Customers Say
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Hear from some of our happy customers who enjoy our delicious food and
        excellent service.
      </p>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviewsData.map(({ id, name, avatar, rating, date, comment }) => (
          <div
            key={id}
            className="bg-white rounded-3xl shadow-lg p-6 flex flex-col"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={avatar}
                alt={`${name}'s avatar`}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-gray-500 text-sm">{new Date(date).toLocaleDateString()}</p>
              </div>
            </div>

            <StarRating rating={rating} />

            <p className="mt-4 text-gray-700 text-base flex-grow">{comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
