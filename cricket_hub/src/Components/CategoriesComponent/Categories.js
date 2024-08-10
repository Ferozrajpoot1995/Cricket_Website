import React from 'react';

const Categories = () => {
  const categories = ['Football', 'Basketball', 'Baseball', 'Hockey', 'Soccer'];

  return (
    <section>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
