DROP DATABASE IF EXISTS hugemanatee;
CREATE DATABASE hugemanatee;

\c hugemanatee;

DROP TABLE IF EXISTS tasklist;
CREATE TABLE tasklist (
  id SERIAL PRIMARY KEY,
  task VARCHAR(150) NOT NULL,
  completed BOOLEAN DEFAULT false,
  priority SERIAL,
  label VARCHAR(20)
);

INSERT INTO tasklist (task, label)
  VALUES ('This is the first thing to do', 'Misc'),
  ('Item 2', 'Misc'),
  ('Item 3', 'Misc'),
  ('Item 4', 'Misc')
