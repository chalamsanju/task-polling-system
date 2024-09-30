import React, { useState } from "react";
import styles from './SearchComponent.module.css';  // Create CSS for styling

const AdvancedSearchPage = ({ polls }) => {
  const [filters, setFilters] = useState({
    keyword: "",
    dateFrom: "",
    dateTo: "",
    category: "",
    status: "",
    creator: "",
  });

  // Function to apply filters
  const applyFilters = () => {
    let filteredPolls = polls;

    if (filters.keyword) {
      filteredPolls = filteredPolls.filter(poll =>
        poll.title.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    if (filters.dateFrom || filters.dateTo) {
      filteredPolls = filteredPolls.filter(poll => {
        const pollDate = new Date(poll.date);
        return (
          (!filters.dateFrom || pollDate >= new Date(filters.dateFrom)) &&
          (!filters.dateTo || pollDate <= new Date(filters.dateTo))
        );
      });
    }

    if (filters.category) {
      filteredPolls = filteredPolls.filter(poll => poll.category === filters.category);
    }

    if (filters.status) {
      filteredPolls = filteredPolls.filter(poll => poll.status === filters.status);
    }

    if (filters.creator) {
      filteredPolls = filteredPolls.filter(poll => poll.creator.toLowerCase().includes(filters.creator.toLowerCase()));
    }

    return filteredPolls;
  };

  const filteredPolls = applyFilters();

  return (
    <div className={styles["advanced-search-page"]}>
      <h2>Search</h2>
      <div className={styles["filters-container"]}>
        <input
          type="text"
          placeholder="Keyword"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          className={styles["filter-input"]}
        />
        <input
          type="date"
          placeholder="From"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          className={styles["filter-input"]}
        />
        <input
          type="date"
          placeholder="To"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          className={styles["filter-input"]}
        />
        <input
          type="text"
          placeholder="Creator"
          value={filters.creator}
          onChange={(e) => setFilters({ ...filters, creator: e.target.value })}
          className={styles["filter-input"]}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className={styles["filter-select"]}
        >
          <option value="">Poll Status</option>
          <option value="active">Active</option>
          <option value="ended">Ended</option>
          <option value="draft">Draft</option>
        </select>
        <button className={styles["apply-filter-btn"]}>Apply Filters</button>
      </div>

      {/* Displaying search results */}
      <div className={styles["results-container"]}>
        {filteredPolls.length > 0 ? (
          filteredPolls.map((poll, index) => (
            <div key={index} className={styles["poll-item"]}>
              <h3>{poll.title}</h3>
              <p>Created by: {poll.creator}</p>
              <p>Status: {poll.status}</p>
              <p>Date: {poll.date}</p>
            </div>
          ))
        ) : (
          <p>No polls found.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearchPage;
