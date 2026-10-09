-- Seed data for Mohammed Quiz - Phase 2
-- 5 quizzes with 10 questions each

-- Insert admin user
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoE5B7smX4C9cA2vNCCEw2Pq8ncW', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert teacher user
INSERT INTO users (username, password_hash, role) 
VALUES ('teacher', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoE5B7smX4C9cA2vNCCEw2Pq8ncW', 'teacher')
ON CONFLICT (username) DO NOTHING;

-- Insert sample player
INSERT INTO users (username, password_hash, role) 
VALUES ('player1', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoE5B7smX4C9cA2vNCCEw2Pq8ncW', 'player')
ON CONFLICT (username) DO NOTHING;

-- Quiz 1: General Knowledge
INSERT INTO quizzes (title, description, subject, created_by) 
VALUES ('General Knowledge', 'A mix of questions from various categories', 'General', 1)
ON CONFLICT (title) DO NOTHING;

-- Questions for General Knowledge
INSERT INTO questions (quiz_id, text, choices, correct_index, explanation, points) 
VALUES 
  (1, 'What planet is known as the Red Planet?', ARRAY['Venus', 'Mars', 'Jupiter', 'Mercury'], 1, 'Mars looks red because of iron oxide (rust) on its surface.', 1),
  (1, 'What is the longest river in the world?', ARRAY['Amazon', 'Nile', 'Yangtze', 'Mississippi'], 1, 'The Nile is traditionally considered the longest river.', 1),
  (1, 'What is the chemical symbol for gold?', ARRAY['Go', 'Gd', 'Au', 'Ag'], 2, 'Au comes from the Latin word aurum.', 1),
  (1, 'Who was the first person to walk on the Moon?', ARRAY['Buzz Aldrin', 'Yuri Gagarin', 'John Glenn', 'Neil Armstrong'], 3, 'Neil Armstrong stepped onto the Moon on July 20, 1969.', 1),
  (1, 'What is the only even prime number?', ARRAY['0', '1', '2', '4'], 2, 'Every other even number is divisible by 2.', 1),
  (1, 'What does HTTP stand for?', ARRAY['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'HyperTool Transfer Path', 'Hyperlink Text Type Protocol'], 0, 'HTTP is the protocol browsers use to communicate with web servers.', 1),
  (1, 'How many hearts does an octopus have?', ARRAY['1', '2', '3', '8'], 2, 'Two hearts pump blood to the gills; one pumps it to the rest of the body.', 1),
  (1, 'Which country has the most time zones?', ARRAY['Russia', 'USA', 'China', 'France'], 3, 'With its overseas territories, France spans 12 time zones.', 1),
  (1, 'What gas do plants absorb for photosynthesis?', ARRAY['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], 2, 'Plants take in CO2 and release oxygen.', 1),
  (1, 'The Great Pyramid of Giza was built for which pharaoh?', ARRAY['Khufu', 'Tutankhamun', 'Ramses II', 'Cleopatra'], 0, 'The Great Pyramid was built around 2560 BC for Pharaoh Khufu.', 1)
ON CONFLICT (id) DO NOTHING;

-- Quiz 2: Science
INSERT INTO quizzes (title, description, subject, created_by) 
VALUES ('Science', 'Questions about physics, chemistry, and biology', 'Science', 1)
ON CONFLICT (title) DO NOTHING;

-- Questions for Science
INSERT INTO questions (quiz_id, text, choices, correct_index, explanation, points) 
VALUES 
  (2, 'What is the chemical symbol for water?', ARRAY['W', 'H2O', 'O2', 'H'], 1, 'H2O is the chemical formula for water.', 1),
  (2, 'Which planet is the largest in our solar system?', ARRAY['Earth', 'Saturn', 'Jupiter', 'Mars'], 2, 'Jupiter is the largest planet.', 1),
  (2, 'What is the freezing point of water in Celsius?', ARRAY['0', '100', '-10', '50'], 0, 'Water freezes at 0°C.', 1),
  (2, 'What gas do humans breathe out?', ARRAY['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], 2, 'Humans exhale carbon dioxide.', 1),
  (2, 'What is the hardest natural substance?', ARRAY['Gold', 'Iron', 'Diamond', 'Quartz'], 2, 'Diamond is the hardest natural substance.', 1),
  (2, 'What causes tides on Earth?', ARRAY['Wind', 'The Moon', 'The Sun', 'Earth rotation'], 1, 'The Moon''s gravity causes tides.', 1),
  (2, 'What is the pH of pure water?', ARRAY['0', '7', '14', '1'], 1, 'Pure water has a neutral pH of 7.', 1),
  (2, 'Which element has the atomic number 1?', ARRAY['Helium', 'Hydrogen', 'Oxygen', 'Carbon'], 1, 'Hydrogen is the first element.', 1),
  (2, 'What is the speed of light approximately?', ARRAY['300,000 km/s', '150,000 km/s', '500,000 km/s', '1,000,000 km/s'], 0, 'Light travels at approximately 300,000 km/s.', 1),
  (2, 'What is the study of living organisms?', ARRAY['Geology', 'Biology', 'Chemistry', 'Physics'], 1, 'Biology is the study of living organisms.', 1)
ON CONFLICT (id) DO NOTHING;

-- Quiz 3: History
INSERT INTO quizzes (title, description, subject, created_by) 
VALUES ('History', 'Historical events and figures', 'History', 1)
ON CONFLICT (title) DO NOTHING;

-- Questions for History
INSERT INTO questions (quiz_id, text, choices, correct_index, explanation, points) 
VALUES 
  (3, 'In which year did World War II end?', ARRAY['1943', '1944', '1945', '1946'], 2, 'World War II ended in 1945.', 1),
  (3, 'Who painted the Mona Lisa?', ARRAY['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'], 2, 'Leonardo da Vinci painted the Mona Lisa.', 1),
  (3, 'Which civilization built the pyramids?', ARRAY['Greeks', 'Romans', 'Egyptians', 'Mayans'], 2, 'The ancient Egyptians built the pyramids.', 1),
  (3, 'Who was the first US President?', ARRAY['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'], 1, 'George Washington was the first US President.', 1),
  (3, 'The Renaissance began in which country?', ARRAY['France', 'Italy', 'Spain', 'Germany'], 1, 'The Renaissance began in Italy.', 1),
  (3, 'Who discovered America in 1492?', ARRAY['Christopher Columbus', 'Amerigo Vespucci', 'Ferdinand Magellan', 'Marco Polo'], 0, 'Christopher Columbus reached the Americas in 1492.', 1),
  (3, 'Which empire was ruled by Julius Caesar?', ARRAY['Greek', 'Roman', 'Egyptian', 'Persian'], 1, 'Julius Caesar ruled the Roman Empire.', 1),
  (3, 'The Industrial Revolution began in which century?', ARRAY['16th', '17th', '18th', '19th'], 2, 'The Industrial Revolution began in the 18th century.', 1),
  (3, 'Who wrote the Declaration of Independence?', ARRAY['George Washington', 'Thomas Jefferson', 'John Adams', 'Benjamin Franklin'], 1, 'Thomas Jefferson wrote the Declaration of Independence.', 1),
  (3, 'The first Olympic Games were held in which country?', ARRAY['Greece', 'Rome', 'Egypt', 'China'], 0, 'The first Olympic Games were held in Greece.', 1)
ON CONFLICT (id) DO NOTHING;

-- Quiz 4: Mathematics
INSERT INTO quizzes (title, description, subject, created_by) 
VALUES ('Mathematics', 'Math problems and concepts', 'Math', 1)
ON CONFLICT (title) DO NOTHING;

-- Questions for Mathematics
INSERT INTO questions (quiz_id, text, choices, correct_index, explanation, points) 
VALUES 
  (4, 'What is 7 × 8?', ARRAY['48', '56', '64', '42'], 1, '7 × 8 = 56.', 1),
  (4, 'What is the square root of 64?', ARRAY['4', '6', '8', '10'], 2, 'The square root of 64 is 8.', 1),
  (4, 'What is 15% of 100?', ARRAY['10', '15', '20', '25'], 1, '15% of 100 is 15.', 1),
  (4, 'What is the value of π (pi) approximately?', ARRAY['2.14', '3.14', '4.14', '5.14'], 1, 'Pi is approximately 3.14.', 1),
  (4, 'What is 100 ÷ 4?', ARRAY['20', '25', '30', '40'], 0, '100 ÷ 4 = 25.', 1),
  (4, 'What is the largest prime number below 20?', ARRAY['17', '18', '19', '20'], 2, '19 is the largest prime number below 20.', 1),
  (4, 'What is 2 to the power of 5?', ARRAY['10', '16', '25', '32'], 3, '2^5 = 32.', 1),
  (4, 'What is the perimeter of a square with side 5?', ARRAY['10', '15', '20', '25'], 3, 'Perimeter = 4 × side = 20.', 1),
  (4, 'What is 0! (0 factorial)?', ARRAY['0', '1', '2', 'Undefined'], 1, '0! is defined as 1.', 1),
  (4, 'What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, ...?', ARRAY['7', '8', '9', '10'], 1, 'The next Fibonacci number is 8.', 1)
ON CONFLICT (id) DO NOTHING;

-- Quiz 5: Geography
INSERT INTO quizzes (title, description, subject, created_by) 
VALUES ('Geography', 'Questions about countries, cities, and landmarks', 'Geography', 1)
ON CONFLICT (title) DO NOTHING;

-- Questions for Geography
INSERT INTO questions (quiz_id, text, choices, correct_index, explanation, points) 
VALUES 
  (5, 'What is the capital of France?', ARRAY['London', 'Berlin', 'Paris', 'Madrid'], 2, 'Paris is the capital of France.', 1),
  (5, 'Which is the largest ocean?', ARRAY['Atlantic', 'Indian', 'Arctic', 'Pacific'], 3, 'The Pacific Ocean is the largest.', 1),
  (5, 'What is the capital of Japan?', ARRAY['Beijing', 'Seoul', 'Tokyo', 'Bangkok'], 2, 'Tokyo is the capital of Japan.', 1),
  (5, 'Which country has the largest land area?', ARRAY['China', 'USA', 'Russia', 'Canada'], 2, 'Russia has the largest land area.', 1),
  (5, 'What is the longest river in Africa?', ARRAY['Nile', 'Congo', 'Niger', 'Zambezi'], 0, 'The Nile is the longest river in Africa.', 1),
  (5, 'Which desert is the largest?', ARRAY['Sahara', 'Gobi', 'Kalahari', 'Arabian'], 0, 'The Sahara is the largest desert.', 1),
  (5, 'What is the capital of Australia?', ARRAY['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], 2, 'Canberra is the capital of Australia.', 1),
  (5, 'Which mountain range includes Mount Everest?', ARRAY['Andes', 'Rockies', 'Himalayas', 'Alps'], 2, 'Mount Everest is in the Himalayas.', 1),
  (5, 'What is the capital of Brazil?', ARRAY['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], 2, 'Brasília is the capital of Brazil.', 1),
  (5, 'Which European country has the most Nobel Prize winners?', ARRAY['France', 'Germany', 'UK', 'Sweden'], 1, 'Germany has the most Nobel Prize winners.', 1)
ON CONFLICT (id) DO NOTHING;
