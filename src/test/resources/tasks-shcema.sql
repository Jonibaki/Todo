DROP TABLE tasks IF EXISTS;
CREATE TABLE IF NOT EXISTS tasks (task_id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(200), start_date DATE, due_date DATE, body VARCHAR(500));