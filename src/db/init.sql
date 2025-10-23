CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  total_seats INT NOT NULL
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id),
  user_id VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);